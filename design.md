# Design System Inspired by MEGAMA

## 1. Visual Theme & Atmosphere

MEGAMA's design system embodies industrial precision and technological excellence through a sophisticated ultra-dark aesthetic. The visual language combines deep, pitch-black backgrounds with striking Apple Blue accents, evoking trust, safety, and professional competence in engineering and NDT services. Bright, minimal UI elements float against expansive black canvases, creating a sense of clarity and focus amid technical complexity. The atmosphere is aspirational yet grounded—emphasizing safety certifications, quality assurance, and international standards through deliberately placed typography and elevated, floating interface components. This is a design system for industries where precision matters and failure is not an option.

**Key Characteristics**

- Pitch black backgrounds (`#000000`, `#050505`) with high contrast light text
- Vibrant, trusted primary accent (`#0071e3`) commanding attention and trust
- Floating, elevated UI components suggesting precision and separation from the background
- Generous whitespace and breathing room around content clusters
- Technical typography (Inter + JetBrains Mono) reinforcing engineering credibility
- Soft, rounded button forms contrasting sharp, industrial subject matter
- Certification badges and status indicators as visual credibility markers

## 2. Color Palette & Roles

### Primary
- **Primary CTA** (`#0071e3`): Main call-to-action elements, links, interactive states, and focus indicators. Used for maximum visibility and action prompting.
- **Primary Hover** (`#0077ED`): Secondary emphasis color for highlights, badges, and supporting interactive states. Lighter blue variant for depth.

### Interactive
- **Gold/Warning** (`#F2C94C`): Alert states, warnings, and cautionary indicators. Used for language selector and warning-level notifications.
- **Success** (`#22C55E`): Positive confirmation states, validated inputs, and success messages.

### Neutral Scale
- **Text Primary** (`#FFFFFF`): Primary body text on dark backgrounds. Maximum contrast for readability.
- **Text Secondary** (`#f5f5f7`): Secondary text, reduced-emphasis content, and labels. Consistent with Apple typography palette.
- **Text Tertiary** (`#86868b`): Disabled states, hints, and minimal-emphasis text.
- **Text Muted** (`#1d1d1f`): Dark gray for borders or text on light surfaces.

### Surface & Borders
- **Surface Dark** (`#000000`): Primary background for hero sections and full-page contexts.
- **Surface Darker** (`#050505`): Alternative dark surface (Industrial Black) for nested containers and layered sections.
- **Surface Darkest** (`#121212`): Industrial Gray background layer for maximum depth and contrast on inputs or cards.
- **Surface Light** (`#f5f5f7`): Light container backgrounds for contrast sections.
- **Surface Lighter** (`#FFFFFF`): Pure white backgrounds for cards, modals, and inverted sections.
- **Border Subtle** (`rgba(255, 255, 255, 0.1)`): Borders on dark backgrounds with minimal contrast.

## 3. Typography Rules

### Font Family

**Primary**: Inter (sans-serif)
Fallback stack: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`

**Secondary/Code**: JetBrains Mono (monospace)
Fallback stack: `'JetBrains Mono', 'Courier New', monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display (H1) | Inter | 72px | 600 | 75.6px | -0.02em | Hero headlines, page titles |
| Heading Large (H3) | Inter | 56px | 600 | 56px | -0.01em | Section headers, intro text |
| Heading Medium (H4) | Inter | 24px | 500 | 32px | 0em | Subsection titles, card headers |
| Body Large | Inter | 24px | 300 | 32px | 0em | Main descriptive content, rich text |
| Body Default | Inter | 16px | 400 | 24px | 0em | Form inputs, standard paragraphs |
| Button/Link | Inter | 16px | 400 | 24px | 0em | CTA buttons, interactive elements |
| Label/Small | Inter | 12px | 700 | 16px | 0.05em | Link pills, nav items, badges |
| Caption/Tiny | Inter | 11px | 800 | 16.5px | 0.08em | Certification labels, overlines |
| Code/Input Label | JetBrains Mono | 14px | 500 | 20px | 0em | Form labels, code blocks |

### Principles

- **Hierarchy through weight and size**: Use Inter's 300/400/500/600/700/800 weights to establish clear visual hierarchy without excessive size changes.
- **Monospace for specificity**: JetBrains Mono exclusively for form labels and code contexts to signal technical precision.
- **Dark background contrast**: All text on dark surfaces uses `#FFFFFF` or `#f5f5f7`.

## 4. Component Stylings

### Buttons

#### Primary Button (CTA/Hero)
- **Background**: `#0071e3` (or Black `rgba(0,0,0,0.8)` with hover glow)
- **Text Color**: `#FFFFFF`
- **Font Size**: `16px` weight `400`
- **Padding**: `16px 32px`
- **Border Radius**: `9999px` or `16px` (pill or rounded rect)
- **Focus State**: Shadow `rgba(0, 113, 227, 0.3) 0px 8px 32px 0px`

#### Secondary Button (Ghost/Outlined)
- **Background**: `rgba(255, 255, 255, 0.05)`
- **Border**: `1px solid rgba(255, 255, 255, 0.2)`

### Cards & Containers

#### Standard Card
- **Background**: `rgba(255, 255, 255, 0.02)`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Border Radius**: `16px`
- **Padding**: `32px`

### Inputs & Forms

#### Text Input (Default)
- **Background**: `rgba(255, 255, 255, 0.02)`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Focus State**: Border `1px solid #0071e3`, box shadow `rgba(0, 113, 227, 0.2) 0px 0px 12px 0px`

## 5. Layout Principles

**Spacing System**: Base Unit `8px`.
`16px` form gaps, `32px` card padding, `64px` hero padding, `80px` section margins.

**Border Radius Scale**:
- `12px` or `16px` for generic cards
- `9999px` or `2.5rem` for organic soft containers.

## 6. Iteration Guide

1. **Always use `#000000` or `#050505` for backgrounds.** Light surfaces are rare; assume dark by default.
2. **Text color on dark backgrounds is always `#FFFFFF` (headings) or `#f5f5f7` (body).**
3. **Primary blue (`#0071e3`) is used for links, focus states, and hover indicators.** If an element needs "attention," use this blue.
4. **Spacing between sections is `48px–80px` minimum.** 
5. **Form labels use JetBrains Mono `14px/500wt`.** Inputs are `16px/400wt` Inter. This monospace distinction signals "technical" and improves scanning.
