import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeKey = 'dark-theme-enabled';
  private darkThemeEnabledSubject = new BehaviorSubject<boolean>(this.isDarkThemeEnabled());
  
  darkThemeEnabled$ = this.darkThemeEnabledSubject.asObservable();
  
  constructor() {
    // Initialize theme based on stored preference
    this.applyStoredThemePreference();
  }
  
  private isDarkThemeEnabled(): boolean {
    return localStorage.getItem(this.darkThemeKey) === 'true';
  }
  
  private applyStoredThemePreference(): void {
    if (this.isDarkThemeEnabled()) {
      this.enableDarkTheme();
    } else {
      this.disableDarkTheme();
    }
  }
  
  enableDarkTheme(): void {
    document.body.classList.add('dark-theme');
    localStorage.setItem(this.darkThemeKey, 'true');
    this.darkThemeEnabledSubject.next(true);
  }

  disableDarkTheme(): void {
    document.body.classList.remove('dark-theme');
    localStorage.setItem(this.darkThemeKey, 'false');
    this.darkThemeEnabledSubject.next(false);
  }
  
  toggleDarkTheme(): void {
    if (this.isDarkThemeEnabled()) {
      this.disableDarkTheme();
    } else {
      this.enableDarkTheme();
    }
  }
}
