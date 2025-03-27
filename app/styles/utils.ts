import { theme, Theme } from './theme';

// Type-safe way to get nested theme values
export function getThemeValue<
  T extends keyof Theme,
  K extends keyof Theme[T],
  S extends keyof Theme[T][K] = never
>(
  category: T,
  property: K,
  subProperty?: S
): S extends never ? Theme[T][K] : Theme[T][K][S] {
  if (subProperty) {
    return theme[category][property][subProperty as S] as any;
  }
  return theme[category][property] as any;
}

// Utility functions for common theme access patterns
export const getColor = (colorPath: string) => {
  const [category, shade = 'DEFAULT'] = colorPath.split('.');
  return theme.colors[category as keyof typeof theme.colors]?.[shade as 'DEFAULT' | 'light' | 'dark'] || colorPath;
};

export const getFontSize = (size: keyof Theme['typography']['sizes']) => 
  theme.typography.sizes[size];

export const getFontWeight = (weight: keyof Theme['typography']['weights']) =>
  theme.typography.weights[weight];

export const getSpacing = (space: keyof Theme['spacing']) =>
  theme.spacing[space];

export const getBorderRadius = (radius: keyof Theme['borderRadius']) =>
  theme.borderRadius[radius];

export const getShadow = (shadow: keyof Theme['shadows']) =>
  theme.shadows[shadow];

// Component-specific style getters
export const getButtonStyle = (variant: 'primary' | 'secondary' | 'accent') =>
  theme.components.button[variant];

export const getCardStyle = () => theme.components.card;

export const getInputStyle = () => theme.components.input;

// CSS class generator for common patterns
export const generateClasses = {
  text: (size: keyof Theme['typography']['sizes'], weight: keyof Theme['typography']['weights'] = 'normal') => 
    `text-[${getFontSize(size)}] font-[${getFontWeight(weight)}]`,
    
  padding: (space: keyof Theme['spacing']) =>
    `p-[${getSpacing(space)}]`,
    
  margin: (space: keyof Theme['spacing']) =>
    `m-[${getSpacing(space)}]`,
    
  rounded: (radius: keyof Theme['borderRadius'] = 'DEFAULT') =>
    `rounded-[${getBorderRadius(radius)}]`,
    
  shadow: (level: keyof Theme['shadows'] = 'DEFAULT') =>
    `shadow-[${getShadow(level)}]`,
}; 