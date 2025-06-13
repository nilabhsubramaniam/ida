import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResumeTheme } from '../models/resume-theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeKey = 'dark-theme-enabled';
  private resumeThemeKey = 'selected-resume-theme';
  
  private darkThemeEnabledSubject = new BehaviorSubject<boolean>(this.isDarkThemeEnabled());
  private availableThemesSubject = new BehaviorSubject<ResumeTheme[]>([]);
  private selectedThemeSubject = new BehaviorSubject<ResumeTheme | null>(null);
  
  // Observables for components to subscribe to
  darkThemeEnabled$ = this.darkThemeEnabledSubject.asObservable();
  availableThemes$ = this.availableThemesSubject.asObservable();
  selectedTheme$ = this.selectedThemeSubject.asObservable();
  
  constructor() {
    // Initialize theme based on stored preference
    this.applyStoredThemePreference();
    this.loadAvailableThemes();
    this.loadStoredResumeTheme();
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
  
  /**
   * Resume Theme Management
   */
   
  // Load available themes
  private loadAvailableThemes(): void {
    // In a real app, this might come from an API
    const themes = this.getDefaultThemes();
    this.availableThemesSubject.next(themes);
  }
  
  // Get stored theme or fallback to default
  private loadStoredResumeTheme(): void {
    const storedThemeId = localStorage.getItem(this.resumeThemeKey);
    if (storedThemeId) {
      const themes = this.availableThemesSubject.getValue();
      const theme = themes.find(t => t.id === storedThemeId);
      if (theme) {
        this.selectedThemeSubject.next(theme);
        this.applyTheme(theme);
      } else {
        // If theme not found (may be deleted or renamed), load default
        this.loadDefaultTheme();
      }
    } else {
      this.loadDefaultTheme();
    }
  }
  
  // Apply the default theme (first one)
  private loadDefaultTheme(): void {
    const themes = this.availableThemesSubject.getValue();
    if (themes.length > 0) {
      this.setSelectedTheme(themes[0]);
    }
  }
  
  // Set selected theme
  setSelectedTheme(theme: ResumeTheme): void {
    this.selectedThemeSubject.next(theme);
    localStorage.setItem(this.resumeThemeKey, theme.id);
    this.applyTheme(theme);
  }
  
  // Get currently selected theme
  getSelectedTheme(): ResumeTheme | null {
    return this.selectedThemeSubject.getValue();
  }
  
  // Apply theme to DOM
  private applyTheme(theme: ResumeTheme): void {
    // Remove any previous theme classes
    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !cls.startsWith('theme-'))
      .join(' ');
    
    // Add new theme class
    document.body.classList.add(`theme-${theme.id}`);
    
    // Apply CSS variables
    this.applyThemeVariables(theme);
  }
  
  // Apply theme as CSS variables
  private applyThemeVariables(theme: ResumeTheme): void {
    // Root element to apply CSS variables
    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-background', theme.colors.background);
    if (theme.colors.surface) {
      root.style.setProperty('--theme-surface', theme.colors.surface);
    }
    root.style.setProperty('--theme-text-primary', theme.colors.text.primary);
    root.style.setProperty('--theme-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--theme-text-accent', theme.colors.text.accent);
    if (theme.colors.divider) {
      root.style.setProperty('--theme-divider', theme.colors.divider);
    }
    
    if (theme.colors.error) {
      root.style.setProperty('--theme-error', theme.colors.error);
    }
    if (theme.colors.success) {
      root.style.setProperty('--theme-success', theme.colors.success);
    }
    
    // Apply fonts
    root.style.setProperty('--theme-font-headings', theme.fonts.headings.fontFamily);
    root.style.setProperty('--theme-font-body', theme.fonts.body.fontFamily);
    if (theme.fonts.accent) {
      root.style.setProperty('--theme-font-accent', theme.fonts.accent.fontFamily);
    }
    
    root.style.setProperty('--theme-heading-weight', theme.fonts.headings.weight.toString());
    root.style.setProperty('--theme-heading-h1', theme.fonts.headings.size.h1);
    root.style.setProperty('--theme-heading-h2', theme.fonts.headings.size.h2);
    root.style.setProperty('--theme-heading-h3', theme.fonts.headings.size.h3);
    
    root.style.setProperty('--theme-body-weight', theme.fonts.body.weight.toString());
    root.style.setProperty('--theme-body-size', theme.fonts.body.size);
    root.style.setProperty('--theme-body-line-height', theme.fonts.body.lineHeight);
    
    if (theme.fonts.headings.letterSpacing) {
      root.style.setProperty('--theme-heading-letter-spacing', theme.fonts.headings.letterSpacing);
    }
    
    // Apply styles
    root.style.setProperty('--theme-border-radius', theme.styles.borderRadius);
    root.style.setProperty('--theme-spacing', theme.styles.spacing);
    root.style.setProperty('--theme-header-style', theme.styles.headerStyle);
    root.style.setProperty('--theme-content-density', theme.styles.contentDensity);
    root.style.setProperty('--theme-divider-style', theme.styles.dividerStyle);
    
    if (theme.styles.boxShadow) {
      root.style.setProperty('--theme-box-shadow', theme.styles.boxShadow);
    }
  }
  
  // Get default set of themes
  private getDefaultThemes(): ResumeTheme[] {
    return [
      // Modern Professional Theme
      {
        id: 'modern-professional',
        name: 'Modern Professional',
        description: 'A clean, professional theme with a modern touch. Perfect for corporate roles.',
        thumbnail: 'assets/themes/modern-professional-thumb.jpg',
        styles: {
          borderRadius: '4px',
          spacing: '16px',
          headerStyle: 'left-aligned' as any,
          contentDensity: 'normal' as any,
          dividerStyle: 'solid' as any,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        colorPalette: {
          primary: '#2c3e50',
          secondary: '#34495e',
          accent: '#3498db',
          background: '#ffffff',
          text: '#2c3e50',
          headings: '#2c3e50',
          borders: '#ecf0f1',
          sectionBackground: '#f8f9fa',
          highlightBackground: '#edf7ff',
          highlightText: '#3498db'
        },
        spacing: {
          sectionGap: '1.5rem',
          itemGap: '1rem',
          padding: '1.5rem',
          lineHeight: '1.6'
        },
        layout: {
          type: 'single-column',
          headerStyle: 'left-aligned',
          sectionStyle: 'card',
          density: 'normal'
        },
        colors: {
          primary: '#2c3e50',
          secondary: '#34495e',
          accent: '#3498db',
          background: '#ffffff',
          surface: '#f8f9fa',
          text: {
            primary: '#2c3e50',
            secondary: '#7f8c8d',
            accent: '#3498db'
          },
          divider: '#ecf0f1'
        },
        fonts: {
          headings: {
            fontFamily: "'Raleway', sans-serif",
            weight: 600,
            size: {
              h1: '28px',
              h2: '22px',
              h3: '18px'
            },
            letterSpacing: '0.5px'
          },
          body: {
            fontFamily: "'Open Sans', sans-serif",
            weight: 400,
            size: '14px',
            lineHeight: '1.6'
          },
          accent: {
            fontFamily: "'Raleway', sans-serif"
          }
        }
      },
      
      // Minimalist Theme
      {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Less is more. A clean, spacious design with perfect typography.',
        thumbnail: 'assets/themes/minimalist-thumb.jpg',
        styles: {
          borderRadius: '0px',
          spacing: '24px',
          headerStyle: 'centered' as any,
          contentDensity: 'spacious' as any,
          dividerStyle: 'none' as any
        },
        colorPalette: {
          primary: '#212529',
          secondary: '#495057',
          accent: '#868e96',
          background: '#ffffff',
          text: '#212529',
          headings: '#212529',
          borders: '#e9ecef',
          sectionBackground: '#ffffff',
          highlightBackground: '#f8f9fa',
          highlightText: '#212529'
        },
        spacing: {
          sectionGap: '2rem',
          itemGap: '1.5rem',
          padding: '2rem',
          lineHeight: '1.8'
        },
        layout: {
          type: 'single-column',
          headerStyle: 'centered',
          sectionStyle: 'borderless',
          density: 'spacious'
        },
        colors: {
          primary: '#212529',
          secondary: '#495057',
          accent: '#868e96',
          background: '#ffffff',
          surface: '#ffffff',
          text: {
            primary: '#212529',
            secondary: '#6c757d',
            accent: '#212529'
          },
          divider: '#e9ecef'
        },
        fonts: {
          headings: {
            fontFamily: "'Playfair Display', serif",
            weight: 700,
            size: {
              h1: '32px',
              h2: '24px',
              h3: '18px'
            },
            letterSpacing: '1px'
          },
          body: {
            fontFamily: "'Lato', sans-serif",
            weight: 300,
            size: '16px',
            lineHeight: '1.8'
          },
          accent: {
            fontFamily: "'Playfair Display', serif"
          }
        }
      },
      
      // Creative Bold Theme
      {
        id: 'creative-bold',
        name: 'Creative Bold',
        description: 'Stand out with this bold, creative design. Perfect for design and creative roles.',
        thumbnail: 'assets/themes/creative-bold-thumb.jpg',
        styles: {
          borderRadius: '8px',
          spacing: '20px',
          headerStyle: 'expanded' as any,
          contentDensity: 'normal' as any,
          dividerStyle: 'gradient' as any,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        colorPalette: {
          primary: '#fc5c65',
          secondary: '#eb3b5a',
          accent: '#fed330',
          background: '#ffffff',
          text: '#222f3e',
          headings: '#fc5c65',
          borders: '#f7f7f7',
          sectionBackground: '#f7f7f7',
          highlightBackground: '#fff5e6',
          highlightText: '#fc5c65'
        },
        spacing: {
          sectionGap: '2rem',
          itemGap: '1.2rem',
          padding: '2rem',
          lineHeight: '1.7'
        },
        layout: {
          type: 'modern',
          headerStyle: 'creative',
          sectionStyle: 'colorful',
          density: 'normal'
        },
        colors: {
          primary: '#fc5c65',
          secondary: '#eb3b5a',
          accent: '#fed330',
          background: '#ffffff',
          surface: '#f7f7f7',
          text: {
            primary: '#222f3e',
            secondary: '#576574',
            accent: '#fc5c65'
          },
          divider: '#f7f7f7'
        },
        fonts: {
          headings: {
            fontFamily: "'Montserrat', sans-serif",
            weight: 800,
            size: {
              h1: '36px',
              h2: '28px',
              h3: '22px'
            }
          },
          body: {
            fontFamily: "'Roboto', sans-serif",
            weight: 400,
            size: '15px',
            lineHeight: '1.7'
          },
          accent: {
            fontFamily: "'Caveat', cursive"
          }
        }
      },
      
      // Technical Theme
      {
        id: 'technical',
        name: 'Technical',
        description: 'A structured theme with monospaced fonts perfect for technical roles.',
        thumbnail: 'assets/themes/technical-thumb.jpg',
        styles: {
          borderRadius: '2px',
          spacing: '16px',
          headerStyle: 'compact' as any,
          contentDensity: 'compact' as any,
          dividerStyle: 'dashed' as any
        },
        colorPalette: {
          primary: '#263238',
          secondary: '#455a64',
          accent: '#4db6ac',
          background: '#ffffff',
          text: '#263238',
          headings: '#263238',
          borders: '#eceff1',
          sectionBackground: '#f5f5f5',
          highlightBackground: '#e0f2f1',
          highlightText: '#009688'
        },
        spacing: {
          sectionGap: '1.2rem',
          itemGap: '0.8rem',
          padding: '1.5rem',
          lineHeight: '1.6'
        },
        layout: {
          type: 'two-column',
          headerStyle: 'compact',
          sectionStyle: 'card',
          density: 'compact'
        },
        colors: {
          primary: '#263238',
          secondary: '#455a64',
          accent: '#4db6ac',
          background: '#ffffff',
          surface: '#f5f5f5',
          text: {
            primary: '#263238',
            secondary: '#607d8b',
            accent: '#009688'
          },
          divider: '#eceff1'
        },
        fonts: {
          headings: {
            fontFamily: "'Source Code Pro', monospace",
            weight: 600,
            size: {
              h1: '24px',
              h2: '20px',
              h3: '16px'
            },
            letterSpacing: '-0.5px'
          },
          body: {
            fontFamily: "'Source Sans Pro', sans-serif",
            weight: 400,
            size: '14px',
            lineHeight: '1.6'
          },
          accent: {
            fontFamily: "'Source Code Pro', monospace"
          }
        }
      },
      
      // Classic Academic
      {
        id: 'academic',
        name: 'Academic Classic',
        description: 'A traditional academic theme with serif fonts and formal spacing.',
        thumbnail: 'assets/themes/academic-thumb.jpg',
        styles: {
          borderRadius: '0px',
          spacing: '20px',
          headerStyle: 'centered' as any,
          contentDensity: 'normal' as any,
          dividerStyle: 'solid' as any
        },
        colorPalette: {
          primary: '#1a237e',
          secondary: '#283593',
          accent: '#5c6bc0',
          background: '#ffffff',
          text: '#212121',
          headings: '#1a237e',
          borders: '#e0e0e0',
          sectionBackground: '#ffffff',
          highlightBackground: '#ede7f6',
          highlightText: '#1a237e'
        },
        spacing: {
          sectionGap: '1.8rem',
          itemGap: '1.2rem',
          padding: '1.8rem',
          lineHeight: '1.8'
        },
        layout: {
          type: 'single-column',
          headerStyle: 'centered',
          sectionStyle: 'bordered',
          density: 'normal'
        },
        colors: {
          primary: '#1a237e',
          secondary: '#283593',
          accent: '#5c6bc0',
          background: '#ffffff',
          surface: '#ffffff',
          text: {
            primary: '#212121',
            secondary: '#616161',
            accent: '#1a237e'
          },
          divider: '#e0e0e0'
        },
        fonts: {
          headings: {
            fontFamily: "'Merriweather', serif",
            weight: 700,
            size: {
              h1: '26px',
              h2: '22px',
              h3: '18px'
            }
          },
          body: {
            fontFamily: "'Merriweather', serif",
            weight: 400,
            size: '14px',
            lineHeight: '1.8'
          },
          accent: {
            fontFamily: "'Merriweather', serif"
          }
        }
      },
      
      // Modern Dark
      {
        id: 'modern-dark',
        name: 'Modern Dark',
        description: 'A sleek dark theme with vibrant accents. Modern and eye-catching.',
        thumbnail: 'assets/themes/modern-dark-thumb.jpg',
        styles: {
          borderRadius: '8px',
          spacing: '18px',
          headerStyle: 'left-aligned' as any,
          contentDensity: 'normal' as any,
          dividerStyle: 'solid' as any,
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        },
        colorPalette: {
          primary: '#bb86fc',
          secondary: '#03dac6',
          accent: '#bb86fc',
          background: '#121212',
          text: '#ffffff',
          headings: '#bb86fc',
          borders: '#333333',
          sectionBackground: '#1e1e1e',
          highlightBackground: '#2d2d2d',
          highlightText: '#bb86fc'
        },
        spacing: {
          sectionGap: '1.5rem',
          itemGap: '1rem',
          padding: '1.8rem',
          lineHeight: '1.6'
        },
        layout: {
          type: 'single-column',
          headerStyle: 'modern',
          sectionStyle: 'card',
          density: 'normal'
        },
        colors: {
          primary: '#121212',
          secondary: '#1f1f1f',
          accent: '#bb86fc',
          background: '#121212',
          surface: '#1e1e1e',
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
            accent: '#bb86fc'
          },
          divider: '#333333'
        },
        fonts: {
          headings: {
            fontFamily: "'Work Sans', sans-serif",
            weight: 600,
            size: {
              h1: '30px',
              h2: '24px',
              h3: '20px'
            }
          },
          body: {
            fontFamily: "'Inter', sans-serif",
            weight: 400,
            size: '15px',
            lineHeight: '1.6'
          },
          accent: {
            fontFamily: "'Work Sans', sans-serif"
          }
        }
      }
    ];
  }
}
