# Art direction for the System 3 city

One illustrated world that every company's logo, building and page fits into. It follows the qualities of the
reference the founder chose (an isometric harbour scene): **one metaphor**, **strict isometric geometry**, **three
tones per face from a small palette**, **layered water with reflections**, **small life details** and **real labels
set on surfaces at the same angle**. Each company keeps its own art direction in `company/ART.md`, written from the
template in `skills/art-direction/`. The HQ's illustration of the city follows this file (system3-meta `hq/ART.md`).

## Geometry

- **True isometric.** The x and y axes run at 30° above the horizontal (`x' = (x − y)·cos 30°`, `y' = (x + y)·sin 30°
  − z`); verticals stay vertical. No perspective, no other angle, nothing drawn freehand that should be a box.
- **One unit, one grid.** Everything sits on the world grid (one tile = one unit); heights are in the same unit.
  Objects are composed from boxes, cylinders, roofs and symbols, never as hand-placed polygons.
- **Depth by painter's order:** an object nearer the viewer (greater x + y) is drawn later.

## Light and shading

- **The light comes from the upper left**, the same in every drawing.
- **Three tones per face, from one base colour:** the top is the lightest (base + 10% lightness), the left face (facing
  +y, toward the lower left) is the base, and the right face (facing +x, toward the lower right) is the darkest (base −
  12%). Never more than three tones on one object; no gradients on faces.
- **Shadows** are a single soft, flat ellipse or parallelogram under an object, offset to the lower right.

## Palette

A small palette; every face takes its three tones from one of these bases. The night palette is the day palette with
lightness lowered and a cool tint, computed, not picked.

| Base | Day (light) | Used for |
|---|---|---|
| grass | `#9fcb83` | lawns, parks, islands |
| field | `#d9cf9a` | farmland at the world's edge |
| paving | `#e6e0d4` | plazas, quays, sites |
| road | `#cdd2d8` | roads and runways |
| stone | `#efe9de` | walls of plain buildings |
| roof red | `#e2735b` | pitched roofs |
| slate | `#76839c` | flat roofs, machinery |
| glass | `#a9d2ea` | the Spire, glazing |
| wood | `#c29468` | piers, carts, benches |
| water | `#4f9fd1` (deep `#3a86bd`, shallow `#86c4e6`) | sea, river |
| crane | `#f0b43a` | construction cranes and dock cranes (work in progress) |

**Company accents** (one per company, used on its walls or trim, never as a fourth tone): teal `#4fae9f`, violet
`#8a74d4`, blue `#5b8ad6`, amber `#e0a24a`, rose `#d86d7e`, green `#62ad74`, orange `#f28a1c`, plum `#a868a8`,
sky `#56a9d4`, sand `#c9a46a`.

**Reserved status colours** (never used for decoration): running `#2e9d66`, ended `#8a8f98`, onboarding `#e09f1f`,
blocked or failing `#d64545`. They appear only as status dots and small badges.

**Night** (the dark theme): the sky is deep blue, faces darken, windows light up warm (`#ffd27a`), lamps glow, the
lighthouse beam shows. Day and night follow the viewer's light or dark theme.

## Type on surfaces

- A label sits **on a surface, at that surface's angle**: on a left face it runs along +x (`matrix(cos 30°, sin 30°, 0,
  1)`), on a right face along −y (`matrix(cos 30°, −sin 30°, 0, 1)`), on the ground along +x with the ground's shear.
  No floating labels.
- One typeface (the HQ's system sans), bold for names, 11 to 13 px at scale 1; text contrast at least 4.5:1 against the
  plate it sits on, in light and in dark.
- Names sit on a sign plate in front of the building, with the status dot before the name.

## Line weight

- Faces have no outlines; an edge is the change of tone. A 1 px darker line is allowed only for thin structures
  (crane lattices, railings, masts) and for the water's shimmer.

## Logos

- **Original only.** No trademark, brand mark or existing character, and nothing traced from one (SQLite's feather,
  Clojure's lambda, Docker's whale and film characters included). A company's logo means something about the company,
  written in its `company/ART.md`.
- **Readable at 24 px and at building size** (a 34 px roof sign), in light and dark: bold shapes, a dark ink outline,
  at most four colours, no text under 6 px.
- On a building, the logo is the **roof sign**, on a light board; in lists and the sidebar, it sits on a light tile.

## Motion

- **Subtle and slow:** water shimmer, a lighthouse beam, drifting clouds, a few cars, carts, a bus and planes. Nothing
  flashes, nothing loops faster than every 2 seconds, nothing moves in front of a label.
- **Data-tied where it can be:** a plane takes off for a recent release, carts haul containers while a company is
  built, a crane stands while work is in progress.
- **Reduced motion:** under `prefers-reduced-motion: reduce` nothing animates; every moving object is drawn still at a
  sensible place, and the meaning stays.

## Do and don't

| Do | Don't |
|---|---|
| Build a school from a box, a pitched roof and window cards on the left face | Draw a school as a free polygon or a photo |
| Three tones from one base: `#f4efe5` / `#efe9de` / `#d9d1c2` | Four shades, a gradient, or a different light direction on one face |
| Label a building on a sign plate at the face's angle | Float a horizontal label above the scene |
| A crane while a milestone is active, removed when it is done | A crane as decoration |
| An original cat that is a bus | A traced or recognisable film character |
| Animate the lighthouse beam over 12 s, still under reduced motion | Spin, blink or bounce |
| Night: darker faces, warm windows | Night: an inverted or grey copy of the day |
