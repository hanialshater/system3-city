---
name: art-direction
description: Design a logo, a building or an illustration that fits the System 3 city (ART.md - true isometric, light from the upper left, three tones per face from a small palette, labels on surfaces, original logos readable at 24 px, subtle reduced-motion-safe motion), and keep a company's own art direction in company/ART.md. Use when a company needs a logo, a building in the city, an illustration or its art direction, and for every visual change, with a screenshot-critique loop.
---

# Art direction

The city has one style, in `ART.md` at the root of the city repository. Each company keeps its own art direction in
`company/ART.md` (the template is `TEMPLATE.md` beside this skill; onboarding writes it). Read both before drawing.

## Steps

1. **Find the metaphor first.** One sentence: what the company is, as a place or an object in the city (a school whose
   windows are lesson cards, a forge, an observatory). Write it in `company/ART.md` before any drawing. If two metaphors
   compete, pick the one a stranger would understand without a caption.
2. **Say what it means and what data it shows.** Each object in the drawing has a meaning; anything that moves or
   changes is tied to a record (a crane while a milestone is active, a queue sized by the pipeline). No decoration that
   claims data it does not have.
3. **Compose from shapes, not freehand.** Boxes, cylinders, roofs and symbols on the isometric grid (system3-meta
   `hq/city-scene.js` has the kit). Three tones per face from one base of the palette; light from the upper left.
4. **A logo:** original (no trademark, brand mark or existing character), bold shapes, a dark ink outline, at most four
   colours. Check it at 24 px and at building size (a 34 px sign), on a light tile, in light and dark.
5. **Labels on surfaces,** at the surface's angle, 4.5:1 contrast against their plate in both themes.
6. **Motion:** slow and tied to data; under `prefers-reduced-motion` draw it still, at a sensible place.

## The screenshot-critique loop

Run at least three rounds before calling it done:

1. Draw.
2. Take screenshots at 1280 and at 390 px, in light and in dark. In the HQ, the company's building is on the City view
   (Playwright: `chromium.launch()`, `colorScheme: "dark"`).
3. **Critique against ART.md before reading your own notes** (artifact before account). Check:
   - Are the angles true isometric?
   - Is the light from the upper left?
   - Do the faces use three tones?
   - Is the label readable?
   - Is the logo legible at 24 px?
   - Does night look like night, rather than a grey copy of the day?
   - Does anything move without a reason?
   - Is anything copied?
4. Adjust and repeat. Keep the first and the last screenshots, so the owner can compare.

## Do and don't

- Do: a school as a box, a pitched roof and window cards. Don't: a free polygon, a photo, a gradient.
- Do: an original cat that is a bus. Don't: a character from a film, or a trademark.
- Do: a crane while work is in progress. Don't: a crane as decoration.
