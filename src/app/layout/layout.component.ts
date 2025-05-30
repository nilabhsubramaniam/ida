import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './../core/services/theme.service';
import { AuthService } from './../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidebarExpanded = false; // Start with collapsed sidebar
  isMobile = false;
  sidebarVisible = false;
  isLoggedIn = false;
  currentRoute = '';
  isProtectedRoute = false;
  private subscriptions: Subscription[] = [];
  
  // Public routes that don't need sidebar
  publicRoutes = ['/login', '/signup', '/', '/welcome'];
  
  // Normalize path for comparison
  normalizeRoute(path: string): string {
    // Remove query parameters
    return path.split('?')[0];
  }

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {
    // Track route changes to determine if sidebar should be shown
    const routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = this.normalizeRoute(event.url);
      this.checkIfSidebarShouldBeVisible();
    });
    
    this.subscriptions.push(routeSub);
    
    // Check auth state
    const authSub = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.checkIfSidebarShouldBeVisible();
    });
    
    this.subscriptions.push(authSub);
  }

  ngOnInit() {
    this.themeService.enableDarkTheme();
    this.checkScreenSize();
    this.checkIfSidebarShouldBeVisible();
  }
  
  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  isOnPublicRoute(): boolean {
    const normalizedRoute = this.normalizeRoute(this.currentRoute);
    const isPublic = this.publicRoutes.includes(normalizedRoute);
    return isPublic;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 992;
    if (this.isMobile) {
      this.sidebarExpanded = false;
      this.sidebarVisible = false;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarVisible = !this.sidebarVisible;
    } else {
      this.sidebarExpanded = !this.sidebarExpanded;
    }
    
    // Force update sidebar visibility in the DOM
    setTimeout(() => {
      // Apply body class to prevent scrolling when mobile sidebar is open
      if (this.isMobile) {
        document.body.style.overflow = this.sidebarVisible ? 'hidden' : '';
      }
    }, 10);
  }

  checkIfSidebarShouldBeVisible() {
    // Check if current route is a protected route (not in publicRoutes)
    const normalizedRoute = this.normalizeRoute(this.currentRoute);
    const isPublicRoute = this.publicRoutes.includes(normalizedRoute);
    
    this.isProtectedRoute = !isPublicRoute;
    
    // Determine if sidebar should be visible
    const shouldShowSidebar = this.isLoggedIn && this.isProtectedRoute;
    
    // For desktop, determine if sidebar should be expanded or collapsed
    // By default, keep it collapsed (sidebarExpanded is initialized as false)
    // Don't force it to expand - let the user toggle it via the button
    
    // For mobile, only show if the user has toggled it
    if (shouldShowSidebar && this.isMobile) {
      // Preserve current visibility state for mobile
    } else {
      // Hide sidebar on mobile if not on a protected route or not logged in
      this.sidebarVisible = false;
    }
  }
}
