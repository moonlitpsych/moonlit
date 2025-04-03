// This file documents the existing styles used in the application
// These styles are defined in tailwind.config.js and globals.css

export const colors = {
  // Primary Colors
  navy: '#091747',
  peach: '#F4B69C',
  gold: '#BF9C73',
  cream: '#FEF8F1',
  
  // Interactive States
  goldHover: '#A88B68',
  navyHover: '#0c1f5e',
  
  // Text Colors
  textPrimary: '#091747', // navy
  textLight: '#FEF8F1',   // cream
  
  // Background Colors
  bgPrimary: '#FEF8F1',   // cream
  bgCard: '#FFFFFF',      // white
} as const;

export const typography = {
  fontFamily: {
    serif: 'var(--font-newsreader), serif',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
} as const;

export const shadows = {
  card: '0 4px 20px rgba(0,0,0,0.05)',
  cardHover: '0 4px 20px rgba(0,0,0,0.1)',
} as const;

export const borderRadius = {
  sm: '0.25rem',  // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem',   // 8px
} as const;

// Common style combinations
export const stylePresets = {
  cardBase: {
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.card,
  },
  buttonPrimary: {
    backgroundColor: colors.navy,
    color: colors.textLight,
    borderRadius: borderRadius.lg,
    '&:hover': {
      backgroundColor: colors.navyHover,
    },
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    color: colors.navy,
    borderRadius: borderRadius.lg,
    border: `2px solid ${colors.navy}`,
    '&:hover': {
      backgroundColor: colors.navy,
      color: colors.textLight,
    },
  },
} as const;

export const theme = {
  colors: {
    // Primary brand colors
    primary: '#BF9C73',  // Tan/brown - primary brand color
    navy: '#091747',     // Navy - text color
    surface: '#FEF8F1',  // Cream - background color
    accent: '#F6B398',   // Salmon - accent color
    // Text colors
    text: {
      DEFAULT: '#2D3748', // Dark gray
      light: '#4A5568',
      muted: '#718096',
      navy: '#091747'     // Navy - main text color
    },
    // Background colors
    background: {
      DEFAULT: '#F7FAFC', // Light gray
      card: '#FFFFFF',
      highlight: '#EDF2F7',
    },
    // UI feedback colors
    feedback: {
      success: '#48BB78',
      error: '#F56565',
      warning: '#ECC94B',
      info: '#4299E1',
    }
  },
  typography: {
    fontFamily: {
      sans: ['var(--font-newsreader)', 'system-ui', 'sans-serif'],
      serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
    '3xl': '3rem',    // 48px
  },
  borderRadius: {
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem',// 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  // Common component styles
  components: {
    button: {
      primary: {
        className: 'btn-primary',
        styles: 'px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors'
      },
      outline: {
        className: 'btn-outline',
        styles: 'px-4 py-2 border-2 border-text text-text rounded hover:bg-text hover:text-white transition-colors'
      },
      secondary: {
        backgroundColor: '#EDF2F7',
        color: '#2D3748',
        hoverBg: '#E2E8F0',
        activeBg: '#CBD5E0',
      },
      accent: {
        backgroundColor: '#48BB78',
        color: '#FFFFFF',
        hoverBg: '#38A169',
        activeBg: '#2F855A',
      }
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      hoverShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
      focusBorderColor: '#4299E1',
      placeholderColor: '#A0AEC0',
      errorBorderColor: '#F56565',
    }
  }
} as const;

// Type for theme-aware development
export type Theme = typeof theme;

// Utility types for accessing theme values
export type ThemeColor = keyof typeof theme.colors;
export type ThemeSpacing = keyof typeof theme.spacing;
export type ThemeFontSize = keyof typeof theme.typography.sizes;
export type ThemeFontWeight = keyof typeof theme.typography.weights;
export type ThemeRadius = keyof typeof theme.borderRadius;
export type ThemeShadow = keyof typeof theme.shadows; 