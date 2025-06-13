import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ResumeTheme } from '../../../core/models/resume-theme.model';

@Component({
  selector: 'app-theme-gallery',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './theme-gallery.component.html',
  styleUrl: './theme-gallery.component.scss'
})
export class ThemeGalleryComponent {
  @Input() themes: ResumeTheme[] = [];
  @Input() selectedTheme: ResumeTheme | null = null;
  @Input() previewTheme: ResumeTheme | null = null;
  @Input() isUserAuthenticated = false;
  
  @Output() themeSelected = new EventEmitter<ResumeTheme>();
  @Output() themePreviewStart = new EventEmitter<ResumeTheme>();
  @Output() themePreviewEnd = new EventEmitter<void>();
  
  /**
   * Selects a theme and emits the selected theme
   */
  selectTheme(theme: ResumeTheme): void {
    this.themeSelected.emit(theme);
  }
  
  /**
   * Starts previewing a theme
   */
  startPreview(event: Event, theme: ResumeTheme): void {
    event.stopPropagation(); // Prevent triggering selectTheme
    this.themePreviewStart.emit(theme);
  }
  
  /**
   * Stops previewing a theme
   */
  endPreview(event: Event): void {
    event.stopPropagation(); // Prevent triggering selectTheme
    this.themePreviewEnd.emit();
  }
  
  /**
   * Checks if a theme is the currently selected theme
   */
  isSelected(theme: ResumeTheme): boolean {
    return this.selectedTheme?.id === theme.id;
  }
  
  /**
   * Checks if a theme is currently being previewed
   */
  isPreviewing(theme: ResumeTheme): boolean {
    return this.previewTheme?.id === theme.id;
  }
  
  /**
   * Get the main colors from a theme's color palette for the color strip
   */
  getMainColors(theme: ResumeTheme): string[] {
    // Return only the main colors we want to display in the strip
    return ['primary', 'secondary', 'accent', 'background', 'text'];
  }
  
  /**
   * Get color from theme's color palette safely with type assertion
   */
  getColorValue(theme: ResumeTheme, key: string): string {
    return (theme.colorPalette as {[key: string]: string})[key];
  }
}