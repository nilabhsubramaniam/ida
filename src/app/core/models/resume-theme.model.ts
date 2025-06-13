export interface ResumeTheme {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface?: string;
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
    divider?: string;
    error?: string;
    success?: string;
  };
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    headings: string;
    borders: string;
    sectionBackground: string;
    highlightBackground: string;
    highlightText: string;
  };
  fonts: {
    headings: {
      fontFamily: string;
      weight: number;
      size: {
        h1: string;
        h2: string;
        h3: string;
      };
      letterSpacing?: string;
    };
    body: {
      fontFamily: string;
      weight: number;
      size: string;
      lineHeight: string;
    };
    accent: {
      fontFamily: string;
    };
  };
  spacing: {
    sectionGap: string;
    itemGap: string;
    padding: string;
    lineHeight: string;
  };
  layout: {
    type: 'single-column' | 'two-column' | 'modern' | 'compact' | 'creative';
    headerStyle: string;
    sectionStyle: string;
    density: 'compact' | 'normal' | 'spacious';
  };
  styles: {
    borderRadius: string;
    spacing: string;
    headerStyle: string;
    contentDensity: string;
    dividerStyle: string;
    boxShadow?: string;
  };
  sectionStyles?: {
    header?: any;
    experience?: any;
    education?: any;
    skills?: any;
    projects?: any;
    awards?: any;
    certifications?: any;
    [key: string]: any;
  };
}

// Sample themes - these would eventually come from a database or API
export const RESUME_THEMES: ResumeTheme[] = [
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: 'assets/themes/professional-thumbnail.jpg',
    description: 'A clean, modern professional design suitable for corporate and business settings.',
    colors: {
      primary: '#2c3e50',
      secondary: '#3498db',
      accent: '#1abc9c',
      background: '#ffffff',
      surface: '#f9f9f9',
      text: {
        primary: '#333333',
        secondary: '#555555',
        accent: '#2980b9'
      },
      divider: '#e0e0e0',
      error: '#e74c3c',
      success: '#27ae60'
    },
    colorPalette: {
      primary: '#2c3e50',
      secondary: '#3498db',
      accent: '#1abc9c',
      background: '#ffffff',
      text: '#333333',
      headings: '#2c3e50',
      borders: '#e0e0e0',
      sectionBackground: '#f9f9f9',
      highlightBackground: '#edf7ff',
      highlightText: '#2980b9'
    },
    fonts: {
      headings: {
        fontFamily: 'Montserrat, sans-serif',
        weight: 600,
        size: {
          h1: '2.5rem',
          h2: '2rem',
          h3: '1.5rem'
        },
        letterSpacing: '-0.02em'
      },
      body: {
        fontFamily: 'Open Sans, sans-serif',
        weight: 400,
        size: '1rem',
        lineHeight: '1.6'
      },
      accent: {
        fontFamily: 'Montserrat, sans-serif'
      }
    },
    spacing: {
      sectionGap: '1.5rem',
      itemGap: '1rem',
      padding: '2rem',
      lineHeight: '1.6'
    },
    layout: {
      type: 'single-column',
      headerStyle: 'centered',
      sectionStyle: 'card',
      density: 'normal'
    },
    styles: {
      borderRadius: '8px',
      spacing: '16px',
      headerStyle: 'centered',
      contentDensity: 'normal',
      dividerStyle: 'solid',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: 'assets/themes/minimal-thumbnail.jpg',
    description: 'A minimalist design focused on clarity and readability with subtle styling.',
    colors: {
      primary: '#202020',
      secondary: '#505050',
      accent: '#707070',
      background: '#ffffff',
      surface: '#ffffff',
      text: {
        primary: '#404040',
        secondary: '#606060',
        accent: '#202020'
      },
      divider: '#e0e0e0',
      error: '#d32f2f',
      success: '#388e3c'
    },
    colorPalette: {
      primary: '#202020',
      secondary: '#505050',
      accent: '#707070',
      background: '#ffffff',
      text: '#404040',
      headings: '#202020',
      borders: '#e0e0e0',
      sectionBackground: '#ffffff',
      highlightBackground: '#f5f5f5',
      highlightText: '#202020'
    },
    fonts: {
      headings: {
        fontFamily: 'Inter, sans-serif',
        weight: 600,
        size: {
          h1: '2rem',
          h2: '1.5rem',
          h3: '1.2rem'
        },
        letterSpacing: '-0.01em'
      },
      body: {
        fontFamily: 'Inter, sans-serif',
        weight: 400,
        size: '0.95rem',
        lineHeight: '1.5'
      },
      accent: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    spacing: {
      sectionGap: '1.2rem',
      itemGap: '0.8rem',
      padding: '1.5rem',
      lineHeight: '1.5'
    },
    layout: {
      type: 'single-column',
      headerStyle: 'simple',
      sectionStyle: 'borderless',
      density: 'compact'
    },
    styles: {
      borderRadius: '4px',
      spacing: '12px',
      headerStyle: 'simple',
      contentDensity: 'compact',
      dividerStyle: 'thin',
      boxShadow: 'none'
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: 'assets/themes/creative-thumbnail.jpg',
    description: 'A vibrant design for creative professionals with bold colors and visual elements.',
    colors: {
      primary: '#6200ea',
      secondary: '#03dac6',
      accent: '#ff4081',
      background: '#ffffff',
      surface: '#f8f6ff',
      text: {
        primary: '#333333',
        secondary: '#666666',
        accent: '#6200ea'
      },
      divider: '#e0e0e0',
      error: '#f44336',
      success: '#4caf50'
    },
    colorPalette: {
      primary: '#6200ea',
      secondary: '#03dac6',
      accent: '#ff4081',
      background: '#ffffff',
      text: '#333333',
      headings: '#6200ea',
      borders: '#e0e0e0',
      sectionBackground: '#f3f0ff',
      highlightBackground: '#e8f5e9',
      highlightText: '#00695c'
    },
    fonts: {
      headings: {
        fontFamily: 'Poppins, sans-serif',
        weight: 700,
        size: {
          h1: '2.75rem',
          h2: '2.25rem',
          h3: '1.75rem'
        },
        letterSpacing: '0'
      },
      body: {
        fontFamily: 'Roboto, sans-serif',
        weight: 400,
        size: '1.05rem',
        lineHeight: '1.6'
      },
      accent: {
        fontFamily: 'Poppins, sans-serif'
      }
    },
    spacing: {
      sectionGap: '2rem',
      itemGap: '1.2rem',
      padding: '2rem',
      lineHeight: '1.6'
    },
    layout: {
      type: 'modern',
      headerStyle: 'creative',
      sectionStyle: 'colorful',
      density: 'spacious'
    },
    styles: {
      borderRadius: '12px',
      spacing: '20px',
      headerStyle: 'creative',
      contentDensity: 'spacious',
      dividerStyle: 'gradient',
      boxShadow: '0 8px 20px rgba(98, 0, 234, 0.15)'
    }
  },
  {
    id: 'executive',
    name: 'Executive',
    thumbnail: 'assets/themes/executive-thumbnail.jpg',
    description: 'A sophisticated, premium theme suitable for executive-level professionals.',
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#967d69',
      background: '#ffffff',
      surface: '#f9f9f9',
      text: {
        primary: '#333333',
        secondary: '#555555',
        accent: '#967d69'
      },
      divider: '#d4d4d4',
      error: '#d32f2f',
      success: '#2e7d32'
    },
    colorPalette: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#967d69',
      background: '#ffffff',
      text: '#333333',
      headings: '#1a1a2e',
      borders: '#d4d4d4',
      sectionBackground: '#f9f9f9',
      highlightBackground: '#f0f0f0',
      highlightText: '#967d69'
    },
    fonts: {
      headings: {
        fontFamily: 'Playfair Display, serif',
        weight: 700,
        size: {
          h1: '2.8rem',
          h2: '2.2rem',
          h3: '1.6rem'
        },
        letterSpacing: '-0.01em'
      },
      body: {
        fontFamily: 'Source Sans Pro, sans-serif',
        weight: 400,
        size: '1rem',
        lineHeight: '1.7'
      },
      accent: {
        fontFamily: 'Playfair Display, serif'
      }
    },
    spacing: {
      sectionGap: '1.8rem',
      itemGap: '1.2rem',
      padding: '2.5rem',
      lineHeight: '1.7'
    },
    layout: {
      type: 'two-column',
      headerStyle: 'elegant',
      sectionStyle: 'bordered',
      density: 'normal'
    },
    styles: {
      borderRadius: '6px',
      spacing: '18px',
      headerStyle: 'elegant',
      contentDensity: 'normal',
      dividerStyle: 'double',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }
  },
  {
    id: 'technical',
    name: 'Technical',
    thumbnail: 'assets/themes/technical-thumbnail.jpg',
    description: 'A streamlined theme optimized for technical roles with a focus on skills and projects.',
    colors: {
      primary: '#373e98',
      secondary: '#f16775',
      accent: '#4fc3dc',
      background: '#ffffff',
      surface: '#f5f7fa',
      text: {
        primary: '#2d2e32',
        secondary: '#4a4b50',
        accent: '#373e98'
      },
      divider: '#e6e6e6',
      error: '#f44336',
      success: '#4caf50'
    },
    colorPalette: {
      primary: '#373e98',
      secondary: '#f16775',
      accent: '#4fc3dc',
      background: '#ffffff',
      text: '#2d2e32',
      headings: '#373e98',
      borders: '#e6e6e6',
      sectionBackground: '#f5f7fa',
      highlightBackground: '#eff6ff',
      highlightText: '#373e98'
    },
    fonts: {
      headings: {
        fontFamily: 'JetBrains Mono, monospace',
        weight: 600,
        size: {
          h1: '2rem',
          h2: '1.6rem',
          h3: '1.3rem'
        },
        letterSpacing: '0'
      },
      body: {
        fontFamily: 'Roboto, sans-serif',
        weight: 400,
        size: '0.95rem',
        lineHeight: '1.6'
      },
      accent: {
        fontFamily: 'JetBrains Mono, monospace'
      }
    },
    spacing: {
      sectionGap: '1.5rem',
      itemGap: '1rem',
      padding: '2rem',
      lineHeight: '1.6'
    },
    layout: {
      type: 'two-column',
      headerStyle: 'compact',
      sectionStyle: 'technical',
      density: 'compact'
    },
    styles: {
      borderRadius: '5px',
      spacing: '16px',
      headerStyle: 'compact',
      contentDensity: 'compact',
      dividerStyle: 'dashed',
      boxShadow: '0 3px 8px rgba(0,0,0,0.05)'
    }
  }
];