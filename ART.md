# Art direction for the System 3 city

One illustrated world that every company's logo, building and page fits into. It follows the qualities of the
reference the founder chose (an isometric harbour scene): **one metaphor**, **strict isometric geometry**, **three
tones per face from a small palette**, **layered water with reflections**, **small life details** and **real labels
set on surfaces at the same angle**. Each company keeps its own art direction in `company/ART.md`, written from the
template in `skills/art-direction/`. The HQ's illustration of the city follows this file (system3-meta `hq/ART.md`).

## The world (founder, 2026-10-26)

The founder's words: "floating island cities, on the ground we have a sea and port and containers for loading the right
things to ship, then on the island cranes for in construction and actual building with many elements. There is
connection between islands, probably a train also. In the meta we have studio that design each item in isolation then
together they form the immersive universe of cities. The ship go up to the buildings, we can have fantasy settings";
"We need the ground (sea, port, islands in the sea) to be furnished"; "The zero company have a demo page to see the
components"; "We can add some fake islands for now for visual appeal (say under construction)"; "Keep central iconic
tower in the middle of each city"; "the tower and buildings were good, we wanted more, not change everything"; "No need
for threejs, let's keep it svg". The founder's own concept sketch is the reference (Sky Cities, 2026-10-26).

- **The universe is made of cities, a city is one owner's** (system3-meta `docs/decisions/2026-10-26-founder-universe.md`).
  **A city is one large floating island** (founder, 2026-10-26: "island can be bigger and more spacious, also all mine
  including tower in one island, others are fake with other themes (placeholder for other people later)"). All of an
  owner's companies and their iconic tower stand on that one island, with room between buildings: plazas, parks,
  streets, water. Other floating islands are other people's cities.
- **Every city has one central iconic tower in its middle** (the first city's is the Spire). It is the city's landmark:
  one per city, always at the centre of the city's main island, always the tallest thing there, and different in
  silhouette from every other city's tower.
- **Two levels, one rule.** The ground (sea, port, ground islands) is where things are made and moved; the sky
  (floating islands) is where companies live and run. On a phone the page reads sky first, then down to the sea.
- **Districts are quarters on the city's island**, not separate islands: companies grouped by field, each quarter with
  its own street grid and a name set on the ground. Islands have earth undersides, waterfalls off their edges and clouds
  below them; the sky train loops through the city's quarters, and cables or bridges join the city to the others.
- **Placeholder cities.** Until other owners arrive, the other floating islands are placeholder cities, each in its own
  theme (for example a desert city, a snow city, a garden city, a canal city) with its own iconic-tower silhouette. Like
  open plots they never carry a person's or company's name, logo or numbers: a blank sign reading "Future city". They
  come from data and give way to real cities.
- **The ground is furnished**, as rich as the sky: a port (quay, bollards, container stacks, a gantry crane, warehouses,
  a harbour office, trucks, forklifts, lamps, lane markings, a rail spur), ground islands (beaches, trees, houses,
  jetties, a park), the lighthouse on its rock, buoys, tugs, a ferry, gulls, foam, and the floating islands' reflections
  and shadows on the water. A lift tower or a waterfall links ground and sky.
- **Containers are roles and skills**, labelled from the registry; ships load them at the port and fly up to the islands.
- **The buildings stay** (redeploy 11's towers, floors, rooftop logo badges and labels): rounds add to them, never
  replace them.
- **Every moving thing means something:** a ship lifting off is a company being created, cranes are a company in its
  first milestone, the train carries news, lit windows are today's activity.
- **Plus a few elements for the vibes** (founder, 2026-10-26: "Every moving thing means something yes but for decor I
  will add few elements for the vibes"). Ambient motion is allowed for atmosphere only: gulls, drifting clouds, waves
  and foam, waterfalls, the lighthouse beam, birds, balloons, small boats bobbing. They are listed as `ambient` in the
  Studio, never take a shape the data uses (no ship lifting off, no crane, no lit-window change, no train) so nobody
  reads them as news, stop under reduced motion, and stay a small share of what moves. The founder adds to this list.
- **Open plots** (placeholders) are drawn under construction with a blank sign and never carry a company's name, logo or
  numbers; they come from data and disappear as real companies arrive. A real company under construction carries its
  name and badge on the scaffold.
- **The port's warehouse** is the home of the company lifecycle (saved and frozen companies as crates on its shelves);
  S3 Guild is the passenger harbour where operators arrive; the Academy is a school on a ground island.
- **Fantasy is allowed** (flying ships, floating rocks, waterfalls into the sky) as long as the geometry, palette and
  light rules below hold.
- **The Studio:** Meta (company zero) keeps a demo page that draws every element alone with its controls; the city is
  composed only from those elements. Pure SVG, no 3D library.

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
| Gulls, clouds and waves moving for the vibes | A decorative ship lifting off, which reads as a new company |
| One iconic tower at the centre of each city | Two landmarks competing, or a city with none |
| An open plot with a blank sign | A made-up company name on a placeholder |
| An original cat that is a bus | A traced or recognisable film character |
| Animate the lighthouse beam over 12 s, still under reduced motion | Spin, blink or bounce |
| Night: darker faces, warm windows | Night: an inverted or grey copy of the day |
