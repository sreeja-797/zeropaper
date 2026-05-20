---
name: Zero-Paper Campus Recruitment
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001f26'
  on-tertiary-container: '#0090a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  margin-mobile: 20px
  margin-desktop: 40px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is engineered for a high-stakes, fast-paced recruitment environment where efficiency meets professional prestige. It targets a dual audience: ambitious students seeking seamless entry into the workforce and enterprise recruiters requiring high-density data management.

The style is **Modern Corporate SaaS** with a **Minimalist** foundation. It prioritizes clarity and trust through heavy whitespace and a disciplined color application, while introducing **Glassmorphism** specifically for high-tech interactions like QR scanning and digital ID verification. The emotional response should be one of "effortless authority"—the platform feels robust enough for enterprise use but fluid enough for mobile-first student interaction.

## Colors

This design system utilizes a tiered blue palette to establish hierarchy and professional depth. 

- **Primary (Deep Navy):** Reserved for core branding, navigation backgrounds, and high-level headings. It provides the "Enterprise" weight.
- **Secondary (Royal Blue):** The functional action color. Used for primary buttons, active states, and progress indicators.
- **Accent (Cyan):** Used sparingly for interactive highlights, data visualizations, and glassmorphic glow effects to inject a "Tech-forward" energy.
- **Backgrounds:** A tiered system starting with pure White (#FFFFFF) for cards and Soft Gray (#F8FAFC) for the canvas to maintain separation.

## Typography

The typography is built on **Inter**, chosen for its exceptional legibility on mobile screens and its neutral, systematic character. 

Hierarchy is established through weight rather than just size. **Headlines** utilize a Bold (700) weight with slight negative letter-spacing to feel compact and authoritative. **Labels** use Medium (500) or Semi-Bold (600) weights to ensure they remain legible at small sizes on data-heavy recruiter dashboards. Body text maintains a generous line-height to ensure readability during long reading sessions of resumes or job descriptions.

## Layout & Spacing

The design system employs a **Fluid Grid** model optimized for mobile-first delivery. 

- **Mobile:** A single-column layout with 20px side margins. Elements are stacked using a 4px base-8 scale.
- **Desktop:** A 12-column grid with a max-width of 1440px. Gutters are fixed at 16px to maintain high information density suitable for recruitment dashboards.
- **Vertical Rhythm:** Components are spaced using the `stack` variables. Use `stack-md` (16px) for related elements within a card, and `stack-lg` (24px) to separate distinct sections or cards.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**. 

1.  **Canvas (Level 0):** The soft gray background (#F8FAFC).
2.  **Surface (Level 1):** Pure white cards with a subtle 1px border (#E2E8F0) and a very soft, diffused shadow (0px 4px 20px rgba(10, 25, 47, 0.05)).
3.  **Floating (Level 2):** Sticky action buttons and Modals. These feature a more pronounced shadow to indicate interactivity.
4.  **Glass (Special):** QR scan overlays and utility "drawers" use a backdrop-filter (blur: 12px) with a semi-transparent white tint (rgba(255, 255, 255, 0.7)) to provide depth without losing context of the camera or background data.

## Shapes

The shape language is friendly yet structured. The system uses a **Rounded** (0.5rem / 8px) base for standard components like inputs and small buttons. 

However, **Cards** and **Main Containers** utilize a `rounded-xl` (1.5rem / 24px) corner radius to create a soft, modern "app-like" feel that distinguishes the product from legacy enterprise software. All interactive elements should maintain consistent corner radii to ensure the interface feels cohesive.

## Components

- **Buttons:** Primary buttons are Solid Royal Blue with white text. Secondary buttons use a subtle Cyan tint background with Royal Blue text. Sticky "Floating Action Buttons" (FABs) on mobile must have a 24px bottom margin and a high-contrast shadow.
- **Cards:** White background, 24px corner radius. Use 16px internal padding for mobile and 24px for desktop. Cards should have a subtle hover state (increase shadow depth) on desktop.
- **Inputs:** Use a soft gray fill (#F1F5F9) and an 8px radius. On focus, the border transitions to Royal Blue with a 2px outer glow.
- **Chips/Badges:** Used for "Job Tags" or "Application Status." These should be pill-shaped (32px radius) with low-saturation backgrounds (e.g., Soft Emerald for "Accepted") to prevent visual clutter.
- **Sticky Actions:** For mobile recruitment flows, the "Apply" or "Scan QR" button should be pinned to the bottom of the viewport using a glassmorphic blur container to allow content to scroll underneath.
- **Modern Line Icons:** Use 2pt stroke weight icons. Avoid filled icons unless indicating an "active" bottom navigation state.