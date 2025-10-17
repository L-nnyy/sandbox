# Atelier de Travail – Identity & Component System

A warm, pedagogical design language that borrows from annotated notebooks, studio tables, and the calm rigor of a workshop. This document summarises the identity decisions, design tokens, and component usage guidelines that accompany the React/Tailwind implementation.

## Visual identity

- **Narrative**: tactile paper surfaces, pencilled annotations, and a focus on thoughtful iteration rather than glossy automation.
- **Aesthetic keywords**: warm minimalism, scholastic, grounded, annotated, collaborative.

### Colour palette

| Token | Hex | Usage |
| --- | --- | --- |
| `colors.background.paper` | `#F9F5ED` | Primary canvas and viewport background |
| `colors.background.parchment` | `#F1E7D8` | Raised surfaces, tonal cards |
| `colors.brand.primary` (Terracotta) | `#B65C38` | Primary buttons, focus states, key accents |
| `colors.brand.secondary` (Moss) | `#5F7042` | Secondary actions, affirmative feedback |
| `colors.brand.highlight` | `#F6C85F` | Annotations, inline highlights |
| `colors.background.night` | `#15120F` | Dark mode canvas |
| `colors.feedback.warning` | `#D38A31` | Non-blocking cautions |
| `colors.feedback.danger` | `#824039` | Blocking errors |

No glassmorphism, neon gradients, or blue/purple SaaS tropes were used. Light and dark contrasts meet WCAG AA (minimum 4.5:1 for text on background).

### Typography

- **Display / headlines**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (opsz axis enabled), used for H1–H3.
- **Body copy**: [Work Sans](https://fonts.google.com/specimen/Work+Sans) 16 / 1.6 for paragraphs, 18 / 1.55 for dense form text.
- **Labels / metadata**: Work Sans 12px uppercase with 0.18em tracking, mirroring notebook section headers.
- **Mono**: IBM Plex Mono for code and data readouts.

## System tokens

Design tokens are shared for engineering & design parity:

- TypeScript source: [`packages/ui/src/tokens.ts`](../../packages/ui/src/tokens.ts)
- JSON export: [`docs/atelier/design-tokens.json`](./design-tokens.json)

Key values:

- **Spacing scale**: 4pt increments (`00` → 0, `04` → 1rem, `08` → 3rem, `10` → 5rem) curated for workbook rhythm.
- **Radii**: Small `0.5rem`, medium `0.75rem`, large `1.25rem`, pill `999px`.
- **Shadows**: soft (`0 4px 12px rgba(44, 38, 34, 0.08)`), medium (`0 18px 40px -28px rgba(21, 18, 15, 0.45)`), focus (`0 0 0 3px rgba(182, 92, 56, 0.35)`).

### Breakpoints

| Token | Min width | Intent |
| --- | --- | --- |
| `xs` | 480px | One-column handheld view |
| `sm` | 640px | Comfort mobile / phablet |
| `md` | 864px | Tablet & docked single column |
| `lg` | 1080px | Dual-column workspace |
| `xl` | 1280px | Desktop studio layout |
| `2xl` | 1440px | Wide, multi-pane compositions |

## Components & usage

Components live in `packages/ui` and are styled with the shared Tailwind configuration (`apps/web/tailwind.config.js`).

### Buttons

- Variants: `primary`, `secondary`, `tonal`, `ghost`, `destructive` + `isLoading` state.
- Focus rings use terracotta with a parchment ring-offset for both light/dark.
- Secondary buttons adopt Moss hues to keep secondary emphasis grounded.

### InputField

- Uppercase labels with optional “Optional” indicator (hideable).
- Error state switches border & focus ring to berry while preserving text legibility.
- Dark mode swaps to charcoal surfaces with parchment text.

### Card primitives

- `Card`, `CardHeader`, `CardTitle`, `CardEyebrow`, `CardDescription`, `CardContent`, `CardFooter` for composable surfaces.
- Variants: `elevated`, `outline`, `tonal`.

### Alert

- Tones: `info`, `success`, `warning`, `danger` with built-in icons.
- Backgrounds use tonal overlays rather than high-saturation fills, ensuring AA contrast.

### Layout helpers

- `Stack` (vertical flex helper with consistent spacing), `NotebookSection` (dashed border sections inspired by open notebooks), `ResponsiveGrid` (1 → 4 column responsive helper).

## Accessibility & dark mode

- `darkMode` uses the class strategy, toggled via the `ThemeToggle` component (persisted in `localStorage`).
- All colours, including alerts, have AA contrast against their surfaces.
- Focus styles are keyboard-visible with `:focus-visible` rings.
- Typography sizes and line-height respect WCAG guidance for readability.

## Implementation notes

- Tailwind theme extensions live in `apps/web/tailwind.config.js` (colours, fonts, spacing, shadows, screens).
- Global styles (`apps/web/app/globals.css`) import Fraunces & Work Sans, define base heading styles, and configure selection colours.
- Components are exported via `@acme/ui` for reuse across applications.
- The sample page (`apps/web/app/page.tsx`) demonstrates light/dark states, component variants, and layout recipes with live tokens.

## Figma documentation

A companion Figma file (`Atelier de Travail.fig`) mirrors this structure:

1. **Identity Overview** – moodboard, tone words, colour palette, typography specimens.
2. **Foundations** – design tokens, spacing grid overlays, breakpoints, elevation.
3. **Components** – button set, input patterns, cards, alert states, layout primitives with responsive annotations.
4. **Templates** – mobile-first layout examples and dark mode application.

Each component frame includes usage notes, redlines for padding, and accessibility callouts. Exported design tokens (JSON) align with the `atelierTokens` object for hand-off.

---

This documentation should be shared with both design and engineering teams to ensure the Atelier de Travail identity remains consistent across product surfaces.
