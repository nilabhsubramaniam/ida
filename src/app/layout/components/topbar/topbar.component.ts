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
  isUserMenuOpen = false;
  showProgressBar = false;
  currentStep = 1;
  
  // Resume building steps
  resumeSteps = ['Personal Info', 'Education', 'Experience', 'Skills', 'Review'];
  
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
    
    // Check if we're on a page that should show the progress bar
    this.router.events.subscribe(() => {
      this.updateProgressBarState();
    });
    
    // Initial check
    this.updateProgressBarState();
  }
  
  ngOnChanges() {
    // Sync the input property with the internal state when changed
    this.isUserAuthenticated = this.isLoggedIn || this.authService.isAuthenticated();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isAtTop = window.scrollY < 10;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close user menu when clicking outside
    const userMenu = document.querySelector('.topbar__user-profile');
    const userMenuDropdown = document.querySelector('.user-menu');
    
    if (this.isUserMenuOpen && 
        userMenu && 
        userMenuDropdown && 
        !userMenu.contains(event.target as Node) && 
        !userMenuDropdown.contains(event.target as Node)) {
      this.isUserMenuOpen = false;
    }
  }

  toggleDarkMode() {
    this.themeService.toggleDarkTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent scrolling when menu is open
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
  
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  
  toggleSidebar() {
    this.toggleSideNav.emit();
  }
  
  logout() {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
  
  // For demo purposes - simulate login
  simulateLogin() {
    this.authService.simulateLogin();
    // Add a small delay to ensure the auth state is updated before navigation
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 100);
  }
  
  // Open help dialog or page
  openHelp() {
    // This could open a help dialog or navigate to a help page
    this.router.navigate(['/help']);
  }
  
  // Method to check authentication status
  checkAuthentication() {
    return this.isUserAuthenticated;
  }
  
  // Update progress bar state based on current route
  private updateProgressBarState() {
    const currentUrl = this.router.url;
    
    // Show progress bar only on resume building pages
    this.showProgressBar = currentUrl.includes('/editor') || 
                          currentUrl.includes('/theme') || 
                          currentUrl.includes('/preview') ||
                          currentUrl.includes('/export');
    
    // Set current step based on route
    if (currentUrl.includes('/editor')) {
      this.currentStep = 1;
    } else if (currentUrl.includes('/theme')) {
      this.currentStep = 2;
    } else if (currentUrl.includes('/preview')) {
      this.currentStep = 3;
    } else if (currentUrl.includes('/export')) {
      this.currentStep = 4;
    }
  }
}
