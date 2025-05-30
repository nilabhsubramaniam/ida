import { Component, HostListener, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NavbarComponent, MatIconModule, FontAwesomeModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnChanges, OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Input() isLoggedIn = false;
  @Input() sidebarExpanded = false;
  @Input() isMobile = false;
  @Input() isProtectedRoute = false;
  
  isDarkMode = false;
  isMobileMenuOpen = false;
  isAtTop = true;
  isUserAuthenticated = false;
  
  // FontAwesome icons
  faBars = faBars;
  faTimes = faTimes;

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {
    // Get initial authentication state
    this.isUserAuthenticated = this.authService.isAuthenticated();
    
    // Listen to authentication state from the service directly
    this.authService.isLoggedIn$.subscribe(status => {
      this.isUserAuthenticated = status;
    });
  }
  
  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.darkThemeEnabled$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }
  
  ngOnChanges() {
    // Sync the input property with the internal state when changed
    this.isUserAuthenticated = this.isLoggedIn || this.authService.isAuthenticated();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isAtTop = window.scrollY < 10;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent scrolling when menu is open
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }
  
  toggleSidebar() {
    this.toggleSideNav.emit();
  }
  
  logout() {
    this.authService.logout();
  }
  
  // For demo purposes - simulate login
  simulateLogin() {
    this.authService.simulateLogin();
    // Add a small delay to ensure the auth state is updated before navigation
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 100);
  }
  
  // Method to check authentication status
  checkAuthentication() {
    return this.isUserAuthenticated;
  }
}
