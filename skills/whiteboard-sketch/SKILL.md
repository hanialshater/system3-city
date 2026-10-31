---
name: whiteboard-sketch
description: Illustrate an architecture, a system design, a conceptual sketch or a wireframe on the city's whiteboard, written as data (items and edges) that the drawing kit draws. Use when a picture would explain a design, a meeting's decision or a screen better than prose.
---

# Whiteboard sketch

A sketch is JSON you write. System 3 Meta's drawing kit (`hq/sky-kit.js`) draws it flat on any page, and also stands it
on an isometric whiteboard in the city, where it composes with every other element.

```json
{ "v": 1, "title": "System design: a land past the referee", "w": 320, "h": 200,
  "items": [
    { "id": "m", "shape": "actor", "x": 14, "y": 80, "text": "member" },
    { "id": "ref", "shape": "diamond", "x": 146, "y": 76, "w": 62, "h": 42, "text": "referee passes?" },
    { "id": "main", "shape": "db", "x": 238, "y": 40, "text": "main", "color": "green" }
  ],
  "edges": [
    { "from": "m", "to": "ref" },
    { "from": "ref", "to": "main", "text": "yes", "color": "green" }
  ] }
```

- **The board.** `w` × `h` board units (default 320 × 200). `x` runs right and `y` runs down, from the top-left corner.
- **Items.** Each has a `shape`, an `x` and a `y`. It may also have `w`, `h`, `text` (up to 240 characters; `\n` breaks
  a line), `color` (`ink`, `blue`, `red`, `green` or `orange`) and an `id` that edges refer to.
  - Diagrams: `box`, `db`, `queue`, `cloud`, `actor`, `circle`, `diamond`, `note` (a sticky note), and `group` (a
    dashed boundary, drawn behind what it holds).
  - Text: `text`, with `size` and `align: "left"`.
  - Wireframes: `frame` (a browser, or `device: "phone"`), `button`, `input` (its text is the placeholder), `image` and
    `lines` (placeholder text; `n` lines).
  - Free arrows: `arrow`, with `points: [[x, y], …]`.
- **Edges.** They join two items by id: `from`, `to`, optional `text`, `dashed` and `color`, and `head` (`end`,
  `both` or `none`).

## Steps

1. Choose the drawing:
   - architecture: components and stores, grouped by boundary;
   - system design: a flow, with its decision points;
   - a concept: a few ideas and how they relate;
   - a wireframe: a screen's layout.
2. Keep it small. A board reads well with 3 to 15 items. Draw two boards rather than one crowded board.
3. Use colour for meaning, not decoration. For example, use green for the happy path and red for a refusal, and say
   what each colour means in a `note`.
4. Check the sketch before you post it: `SkyKit.sketchProblems(sketch)` must return `[]`. It reports unknown shapes,
   edges to missing ids, duplicate ids, bad numbers and text that is too long.
5. Draw it with one of these:
   - `SkyKit.sketchSvg(sketch)`: a standalone `<svg>`, for a page, a document or a meeting's minutes. Put it inside an
     element with class `cs3`, with the kit's css (`SkyKit.css(".cs3")`).
   - `SkyKit.draw("whiteboard", { sketch, w, h, stand: "easel" | "wall" })`: a board in the world.
   - `SkyKit.compose([...])`: the board among other elements.
6. Store it with the record it explains, such as a design doc or a meeting's minutes, so the next session finds both
   together.

## In a meeting: the board

Every meeting has a board, an infinite canvas that its members draw on while they meet. Each sketch is one post.

1. **Name the board** for the meeting: lower-case words joined by dashes, for example `2026-10-31-design-review`.
   Everyone in the meeting uses the same name.
2. **Post each sketch as you draw it**:
   - in a crew: `crew sketch --board=<id> --file=<sketch.json> [--at=x,y] [--caption="what it shows"]`;
   - in a kernel meeting: `meeting board --id=<MTG> --by=<you> --section=<topic> --sketch=<sketch.json>`.

   A post that does not draw as written is refused, and nothing is written. Read the reason, fix the sketch and post
   again.
3. **Let the board lay itself out.** Without `--at`, sketches flow in the order they were posted, which is usually
   right. Use `--at=x,y` only to put a sketch next to the one it answers, for example a v2 beside its v1. Leave a gap
   of about 60 units.
4. **Redraw rather than edit.** A changed design is a new post (title it "…, v2"), so the board keeps how the thinking
   moved.
5. **Name the board in the minutes**: `crew minutes --title=… --text=… --board=<id>`. The minutes then link to the
   board.
6. **To see the boards:** `crew boards` lists them. The HQ shows them under the company's Meetings, each one opening
   as a canvas you drag, scroll and zoom, with replay.

Never put personal data or secrets on a board. A sketch is published wherever its page is.

Examples: `SkyKit.SKETCHES` (`architecture`, `system-design`, `concept`, `wireframe`). The city HQ shows them under
City › Tools, and Meta's Studio has them at `#studio/whiteboard` and in the "design review" scene.
