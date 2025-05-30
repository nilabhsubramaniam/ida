import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHome, faFileAlt, faPalette, faCog, faUserCircle, 
  faChartBar, faFileDownload, faSearch, faSignOutAlt,
  faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnChanges {
  @Input() isExpanded = true;
  @Input() isMobile = false;
  @Input() isVisible = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();
  
  constructor(private authService: AuthService) {}
  
  // Icons
  faHome = faHome;
  faFileAlt = faFileAlt; 
  faPalette = faPalette;
  faCog = faCog;
  faUserCircle = faUserCircle;
  faChartBar = faChartBar;
  faFileDownload = faFileDownload;
  faSearch = faSearch;
  faSignOutAlt = faSignOutAlt;
  faBars = faBars;
  faTimes = faTimes;

  menuItems = [
    { icon: this.faHome, label: 'Dashboard', route: '/dashboard' },
    { icon: this.faFileAlt, label: 'My Resumes', route: '/resume-editor' },
    { icon: this.faPalette, label: 'Templates', route: '/resume-theme' },
    { icon: this.faFileDownload, label: 'Export', route: '/export-resume' },
    { icon: this.faChartBar, label: 'Analytics', route: '/analytics' },
    { icon: this.faUserCircle, label: 'Profile', route: '/profile-settings' },
    { icon: this.faCog, label: 'Settings', route: '/settings' },
  ];

  ngOnChanges() {
    // Monitor sidebar state changes
  }

  toggleMenu(): void {
    this.toggleSidebar.emit(!this.isExpanded);
  }
  
  logout(): void {
    this.authService.logout();
  }
}
