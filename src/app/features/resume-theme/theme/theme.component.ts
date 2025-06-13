import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ResumeTheme } from '../../../core/models/resume-theme.model';
import { ResumeThemeService } from '../../../core/services/resume-theme.service';
import { ThemeGalleryComponent } from '../theme-gallery/theme-gallery.component';

interface ColorSwatch {
  name: string;
  value: string;
}

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, ThemeGalleryComponent],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent implements OnInit {
  availableThemes: ResumeTheme[] = [];
  selectedTheme: ResumeTheme | null = null;
  previewTheme: ResumeTheme | null = null;
  isUserAuthenticated = false; // This would be set from your AuthService
  
  constructor(private themeService: ResumeThemeService) {}
  
  ngOnInit(): void {
    // Load all available themes
    this.availableThemes = this.themeService.getAllThemes();
    
    // Get the current theme
    this.themeService.currentTheme$.subscribe(theme => {
      this.selectedTheme = theme;
    });
    
    // Monitor preview theme changes
    this.themeService.previewTheme$.subscribe(theme => {
      this.previewTheme = theme;
    });
  }
  
  /**
   * Set a theme as the active one
   */
  applyTheme(theme: ResumeTheme): void {
    this.themeService.setCurrentTheme(theme);
  }
  
  /**
   * Start previewing a theme
   */
  previewThemeStart(theme: ResumeTheme): void {
    this.themeService.previewTheme(theme);
  }
  
  /**
   * Stop previewing a theme and revert to the selected theme
   */
  previewThemeEnd(): void {
    this.themeService.previewTheme(null);
  }
  
  /**
   * Convert the color palette to an array for display
   */
  getColorPalette(): ColorSwatch[] {
    const theme = this.previewTheme || this.selectedTheme;
    if (!theme) return [];
    
    return Object.entries(theme.colorPalette).map(([key, value]) => ({
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value
    }));
  }
}
