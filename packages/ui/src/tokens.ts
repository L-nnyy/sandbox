/**
 * Design tokens for the Atelier de Travail identity system.
 * These tokens are shared across the component library and design documentation.
 */

export const atelierTokens = {
  identity: {
    name: 'Atelier de Travail',
    narrative:
      'A pedagogical workspace aesthetic that balances warmth, focus, and the crafted imperfection of annotated notebooks.',
  },
  colors: {
    background: {
      paper: '#F9F5ED',
      parchment: '#F1E7D8',
      sand: '#E3D2BA',
      mist: '#F2ECE4',
      night: '#15120F',
      charcoal: '#1F1A16',
    },
    border: {
      subtle: '#E3D2BA',
      medium: '#C98A5B',
      bold: '#B65C38',
      contrast: '#15120F',
    },
    text: {
      primary: '#2C2622',
      secondary: '#473F38',
      muted: '#6F655B',
      onDark: '#F1E7D8',
      accent: '#B65C38',
    },
    brand: {
      primary: '#B65C38',
      primaryStrong: '#9A4726',
      secondary: '#5F7042',
      secondaryStrong: '#46572E',
      highlight: '#F6C85F',
    },
    feedback: {
      info: '#473F38',
      infoSurface: '#F2ECE4',
      success: '#5F7042',
      successSurface: '#EEF4EA',
      warning: '#D38A31',
      warningSurface: '#FBF2DF',
      danger: '#824039',
      dangerSurface: '#F8E9E7',
    },
  },
  typography: {
    families: {
      sans: '"Work Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: '"Fraunces", Georgia, "Times New Roman", serif',
      mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    },
    scale: {
      xs: '0.8125rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.875rem',
      '3xl': '2.25rem',
    },
    lineHeights: {
      tight: 1.25,
      snug: 1.4,
      standard: 1.6,
      relaxed: 1.75,
    },
    letterSpacing: {
      body: '-0.005em',
      caps: '0.08em',
      label: '0.02em',
    },
  },
  spacing: {
    '00': '0rem',
    '01': '0.25rem',
    '02': '0.5rem',
    '03': '0.75rem',
    '04': '1rem',
    '05': '1.5rem',
    '06': '2rem',
    '07': '2.5rem',
    '08': '3rem',
    '09': '4rem',
    '10': '5rem',
  },
  radii: {
    small: '0.5rem',
    medium: '0.75rem',
    large: '1.25rem',
    extra: '1.75rem',
    pill: '999px',
  },
  shadows: {
    soft: '0 4px 12px rgba(44, 38, 34, 0.08)',
    medium: '0 18px 40px -28px rgba(21, 18, 15, 0.45)',
    focus: '0 0 0 3px rgba(182, 92, 56, 0.35)',
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '864px',
    lg: '1080px',
    xl: '1280px',
    '2xl': '1440px',
  },
} as const;

export type AtelierDesignTokens = typeof atelierTokens;
