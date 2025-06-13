import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResumeTheme, RESUME_THEMES } from '../../core/models/resume-theme.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeThemeService {
  private availableThemes: ResumeTheme[] = RESUME_THEMES;
  private currentThemeSubject: BehaviorSubject<ResumeTheme | null> = new BehaviorSubject<ResumeTheme | null>(null);
  private previewThemeSubject: BehaviorSubject<ResumeTheme | null> = new BehaviorSubject<ResumeTheme | null>(null);
  private themePreferenceKey = 'resume-theme-preference';
  
  // Observables
  currentTheme$ = this.currentThemeSubject.asObservable();
  previewTheme$ = this.previewThemeSubject.asObservable();
  
  constructor() {
    // Load user's preferred theme or default to first theme
    this.initializeTheme();
  }
  
  /**
   * Initialize the theme from local storage or default to first theme
   */
  private initializeTheme(): void {
    const savedThemeId = localStorage.getItem(this.themePreferenceKey);
    
    if (savedThemeId) {
      const savedTheme = this.getThemeById(savedThemeId);
      if (savedTheme) {
        this.setCurrentTheme(savedTheme);
        return;
      }
    }
    
    // Default to first theme if no saved theme or saved theme not found
    if (this.availableThemes.length > 0) {
      this.setCurrentTheme(this.availableThemes[0]);
    }
  }
  
  /**
   * Get all available resume themes
   */
  getAllThemes(): ResumeTheme[] {
    return [...this.availableThemes];
  }
  
  /**
   * Find a theme by its ID
   */
  getThemeById(id: string): ResumeTheme | undefined {
    return this.availableThemes.find(theme => theme.id === id);
  }
  
  /**
   * Set the current theme and save preference
   */
  setCurrentTheme(theme: ResumeTheme): void {
    this.currentThemeSubject.next(theme);
    localStorage.setItem(this.themePreferenceKey, theme.id);
    this.applyThemeToDocument(theme);
  }
  
  /**
   * Set a theme for preview without applying it permanently
   */
  previewTheme(theme: ResumeTheme | null): void {
    this.previewThemeSubject.next(theme);
    
    if (theme) {
      this.applyThemeToDocument(theme);
    } else {
      // If preview is cleared, reapply the current theme
      const currentTheme = this.currentThemeSubject.value;
      if (currentTheme) {
        this.applyThemeToDocument(currentTheme);
      }
    }
  }
  
  /**
   * Apply theme to the document by setting CSS variables
   */
  private applyThemeToDocument(theme: ResumeTheme): void {
    const root = document.documentElement;
    
    // Apply color palette
    Object.entries(theme.colorPalette).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Apply fonts
    root.style.setProperty('--theme-font-heading', theme.fonts.headings.fontFamily);
    root.style.setProperty('--theme-font-body', theme.fonts.body.fontFamily);
    root.style.setProperty('--theme-font-accent', theme.fonts.accent.fontFamily);
    
    // Apply spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--theme-spacing-${key}`, value);
    });
    
    // Apply layout classes
    document.body.classList.remove(
      'layout-single-column', 
      'layout-two-column', 
      'layout-modern', 
      'layout-compact', 
      'layout-creative'
    );
    document.body.classList.add(`layout-${theme.layout.type}`);
    
    // Add density class
    document.body.classList.remove('density-compact', 'density-normal', 'density-spacious');
    document.body.classList.add(`density-${theme.layout.density}`);
    
    // Dispatch an event so components know the theme changed
    const themeChangedEvent = new CustomEvent('themeChanged', { detail: theme });
    document.dispatchEvent(themeChangedEvent);
  }
}
