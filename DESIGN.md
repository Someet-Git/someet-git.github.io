# Lexis Antique Design System

### 1. Overview & Creative North Star
**Creative North Star: The Digital Heirlooom**
Lexis Antique is a design system that prioritizes human warmth and editorial sophistication over industrial efficiency. It bridges the gap between traditional print journalism and modern AI technology. The system rejects the "standard" SaaS aesthetic in favor of **Organic Brutalism**—combining heavy, grounded typography with soft, parchment-like surfaces and generous whitespace. It is designed to feel curated, empathetic, and timeless.

### 2. Colors
The palette is rooted in a "Warm Earth" spectrum, utilizing desaturated greens and sun-bleached terracotta.

- **Primary (#D28D77):** An earthen clay tone used for high-impact actions and emotional emphasis.
- **Secondary (#3D4A3E):** A deep forest green that provides grounding and authority, used primarily for text and dark-mode surfaces.
- **Tertiary (#6A7A6B):** A sage mid-tone for supportive elements and secondary highlights.
- **The "No-Line" Rule:** To maintain an editorial feel, 1px solid borders are strictly prohibited for layout sectioning. Content areas must be defined by shifts in background color (e.g., moving from `surface` to `surface-container-low`).
- **Surface Hierarchy:** Use the `surface-container` tiers to create a nested narrative. The background begins at `surface` (#F2F0E9), while interactive cards live on `surface_container_lowest` (#FFFFFF) to pop against the warm base.
- **Glass & Gradient:** Floating UI elements (like navigation or sticky overlays) should utilize a 40% white opacity with a 20px backdrop blur (`glass-card`) to maintain depth without breaking the organic flow.

### 3. Typography
The system uses a high-contrast serif/sans-serif pairing to establish a sophisticated hierarchy.

- **Display & Headlines:** Newsreader (Serif). Used to convey personality, history, and nuance. It features tight tracking and dramatic scale shifts.
- **Body & Labels:** Manrope (Sans-serif). A modern, highly legible geometric sans used for technical details and long-form reading.
- **Typographic Scale (Ground Truth):**
  - **Hero Headlines:** 6rem to 9rem (10px, 1.25rem, 4.5rem, etc.) – Use large-scale serif type with leading as tight as 0.9 for a bold, magazine-style impact.
  - **Sub-Headlines:** 2.25rem to 3.75rem.
  - **Body Copy:** 1.125rem (18px) for readability on warm backgrounds.
  - **Metadata/Labels:** 0.75rem to 0.875rem with high letter-spacing (0.3em) and uppercase styling for "Connection First" markers.

### 4. Elevation & Depth
Lexis Antique moves away from "material" elevation toward **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by placing lighter surfaces on darker ones. A white card (#FFFFFF) on a `surface-container` background creates natural elevation without a shadow.
- **Ambient Shadows:** When shadows are required, they must be ultra-diffused.
  - `shadow-sm`: Soft, barely visible grounding.
  - `shadow-lg` / `shadow-2xl`: Used only for primary CTAs and floating glass elements, often tinted with the primary color (e.g., `shadow-primary/20`).
- **Roundedness:** Corners follow a varied logic—buttons are pill-shaped (full), while content containers use large, generous radii (2.5rem to 4rem) to mimic organic, pebble-like shapes.

### 5. Components
- **Buttons:**
  - **Primary:** Pill-shaped, #D28D77 background, white text, with a 20% opacity primary shadow.
  - **Secondary:** White circle with a subtle icon, emphasizing "The Story" over the "Transaction."
- **Cards:** Defined by `2.5rem` corner radius and `surface_container_lowest` backgrounds. They should feel like physical stationary placed on a desk.
- **Inputs:** Rounded pill-style fields with low-opacity borders (`white/10`) for dark surfaces and `outline-variant` for light surfaces.
- **Chips:** Small, uppercase text on `tertiary/10` backgrounds for categorizing "Guiding Lights."

### 6. Do's and Don'ts
- **Do:** Use `italic` Newsreader for emphasis within headlines to create a "human" signature.
- **Do:** Use asymmetric layouts where text blocks and images are intentionally offset.
- **Don't:** Use pure black (#000000). Always use `secondary` (#3D4A3E) for high-contrast text.
- **Don't:** Use sharp 90-degree corners. Everything in this system should feel weathered and soft.
- **Do:** Lean into "hero-gradients" using radial fades between `surface` and `surface-container` to draw the eye toward the center of the screen.