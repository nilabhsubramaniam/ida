import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  enableDarkTheme(): void {
    document.body.classList.add('dark-theme');
  }

  disableDarkTheme(): void {
    document.body.classList.remove('dark-theme');
  }
}
