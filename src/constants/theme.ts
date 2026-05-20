/**
 * Zero-Paper Theme Constants
 * Color palette derived from Stitch-generated layouts
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Primary colors from Stitch design system
    primaryContainer: '#0d1c32',
    secondary: '#0051d5',
    secondaryContainer: '#316bf3',
    secondaryFixed: '#316bf3',
    secondaryFixedDim: '#0051d5',
    tertiaryFixed: '#acedff',
    onTertiaryFixed: '#002e65',
    
    // Surface colors
    background: '#f7f9fb',
    surface: '#f7f9fb',
    surfaceContainerLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    surfaceContainerHigh: '#e6e8ea',
    surfaceContainerLowest: '#ffffff',
    
    // Text colors
    onSurface: '#191c1e',
    onSurfaceVariant: '#44474d',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#fefcff',
    onSecondaryFixed: '#ffffff',
    onPrimaryContainer: '#76849f',
    onSecondaryFixedVariant: '#003ea8',
    
    // Utility colors
    outlineVariant: '#c5c6cd',
    outline: '#75777e',
    error: '#ba1a1a',
    onError: '#ffffff',
    onErrorContainer: '#93000a',
    
    // Legacy colors for compatibility
    text: '#000000',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    // Primary colors from Stitch design system
    primaryContainer: '#0d1c32',
    secondary: '#0051d5',
    secondaryContainer: '#316bf3',
    tertiaryFixed: '#acedff',
    onTertiaryFixed: '#002e65',
    
    // Surface colors
    background: '#0d1c32',
    surface: '#0d1c32',
    surfaceContainerLow: '#1a2d45',
    surfaceContainer: '#243a55',
    surfaceContainerHigh: '#2e4765',
    surfaceContainerLowest: '#0a1525',
    
    // Text colors
    onSurface: '#f7f9fb',
    onSurfaceVariant: '#b9c7e4',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#fefcff',
    onPrimaryContainer: '#76849f',
    onSecondaryFixedVariant: '#003ea8',
    
    // Utility colors
    outlineVariant: '#515f78',
    outline: '#75777e',
    error: '#ba1a1a',
    onError: '#ffffff',
    onErrorContainer: '#93000a',
    
    // Legacy colors for compatibility
    text: '#ffffff',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
