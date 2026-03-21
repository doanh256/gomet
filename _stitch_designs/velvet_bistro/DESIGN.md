# Design System Strategy: The Culinary Curator

## 1. Overview & Creative North Star
The "Culinary Curator" is our creative North Star. This design system rejects the "endless scroll" aesthetic of traditional dating apps in favor of a high-end editorial experience. We treat dating like a fine dining reservation: intentional, curated, and premium.

To break the "template" look, we move away from rigid, centered grids. Instead, we utilize **Intentional Asymmetry**. Large-scale typography (`display-lg`) should overlap container edges, and image assets (food, people, venues) should be layered with varying depths using the `surface-container` tiers. The goal is to create a digital space that feels like a modern lifestyle magazine—vibrant and romantic, yet authoritative and organized.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
Our palette uses a base of soft cream (`surface`) and warm coral (`primary`) to evoke appetite and affection, grounded by deep charcoal (`on-background`) for trust.

- **The "No-Line" Rule:** Explicitly prohibit 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. For example, a profile card (`surface-container-lowest`) sits on a discovery feed (`surface-container-low`), which in turn sits on the global background (`surface`).
- **Surface Hierarchy & Nesting:** Use the `surface-container` scale to create physical layers. 
    - **Base:** `surface` (#fdf9f3)
    - **Sections:** `surface-container-low` (#f7f3ed)
    - **Interactive Cards:** `surface-container-lowest` (#ffffff) 
- **The "Glass & Gradient" Rule:** Floating navigation or top bars must use Glassmorphism. Apply `surface` at 80% opacity with a `backdrop-blur` of 12px.
- **Signature Textures:** For primary CTAs, do not use flat colors. Use a subtle linear gradient from `primary` (#ae2f34) to `primary_container` (#ff6b6b) at a 45-degree angle to give the "Warm Coral" a shimmering, organic life.

---

## 3. Typography: Editorial Authority
We pair the expressive **Plus Jakarta Sans** for displays with the functional **Inter** for utility.

- **Display & Headlines (Plus Jakarta Sans):** These are the "voice" of the brand. Use `display-lg` for hero sections, intentionally tightening the letter-spacing (-0.04em) to create a sophisticated, high-fashion look.
- **Body & Labels (Inter):** These are the "service" of the brand. Use `body-md` for user bios and `label-md` for metadata. 
- **The Hierarchy Strategy:** Establish dominance by pairing a `display-sm` title with a `label-md` uppercase tag. This high-contrast scale prevents the UI from looking "default" and ensures a clear reading path.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often a crutch for poor layout. In this system, depth is earned through color and blur.

- **The Layering Principle:** Instead of a shadow, place a `surface-container-high` element inside a `surface-container-low` parent. The 1%–2% shift in value creates a "soft lift" that feels architectural.
- **Ambient Shadows:** When a card must float (e.g., a "Match Found" alert), use an extra-diffused shadow: `box-shadow: 0 24px 48px -12px rgba(174, 47, 52, 0.08)`. Note the tint: we use a fraction of the `primary` color, not black, to keep the "Romantic" feel.
- **The "Ghost Border" Fallback:** If a container lacks contrast against its background, use a "Ghost Border": `outline-variant` (#e0bfbd) at 15% opacity.
- **Glassmorphism:** Use for "floating" elements like floating action buttons (FABs) or date-picker overlays to allow the vibrant food photography to bleed through the UI, maintaining a sense of place.

---

## 5. Components: Intentional Primitives

### Buttons
- **Primary:** Gradient (`primary` to `primary_container`), `DEFAULT` (16px) roundedness, `title-sm` (Inter Bold).
- **Secondary:** Surface-container-highest background, no border, `on-surface` text.
- **Tertiary:** Text-only with `primary` color, used for low-emphasis actions like "Cancel" or "View Less."

### Cards & Lists
- **The Divider Ban:** Never use `<hr>` tags or border-bottoms. Use `16` (4rem) of vertical spacing from the scale or a background shift to `surface-container-low` to separate list items.
- **Roundedness:** All image containers must use the `md` (1.5rem) or `lg` (2rem) corner radius to reinforce the "Friendly" brand pillar.

### Custom Component: The "Dine-Tag" (Chips)
- Used for food preferences (e.g., "Sushi," "Vegan").
- **Style:** `surface-container-high` background, `label-md` typography, `full` roundedness. When selected, transition to `primary` with `on-primary` text.

### Input Fields
- Avoid "box" inputs. Use a soft `surface-container-highest` background with a `none` border and a `sm` (0.5rem) bottom-only radius to create an elegant, "underline-plus" feel.

---

## 6. Do's and Don'ts

### Do
- **Do** use white space as a structural element. If you think you need a line, you probably just need more `spacing-12`.
- **Do** overlap elements. Let a user’s profile picture slightly break the container of their bio to create depth.
- **Do** use the `tertiary` (#894e45) color for "trust" elements, like verified badges or security settings.

### Don't
- **Don't** use 100% black (#000000). Always use `on-background` (#1c1c18) for text to maintain the soft, premium feel.
- **Don't** use `none` roundedness. This system is built on approachable, organic shapes. Every corner must have at least a `sm` radius.
- **Don't** use standard "drop shadows" from software defaults. They feel "dirty" and "cheap." Always tint your shadows with the brand's coral or charcoal.