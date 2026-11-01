---
name: whiteboard-sketch
description: Illustrate (in JSON or in Mermaid, laid out for you) an architecture, a system design, a sequence diagram, a state machine, a data flow, an ER or UML model, C4, a cloud architecture (AWS, Google Cloud, Azure) or a wireframe on the city's whiteboard, written as data (items from a shape library, and edges) that the drawing kit draws. Use when a picture would explain a design, a meeting's decision or a screen better than prose.
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

## The shape library

Besides the shapes above, `shape` can be any name in Meta's shape library (`hq/sketch-shapes.js`), which has about
130 shapes in 11 libraries, plus about 100 cloud service names. City › Tools shows them all as a palette, each with the
name to write.

- **Basic.** `rounded`, `ellipse`, `triangle`, `hexagon`, `parallelogram`, `trapezoid`, `star`, `cross`, `callout`,
  `block-arrow`, `brace`, `cylinder`.
- **Flowchart.** `process`, `decision`, `terminator`, `data`, `document`, `multi-document`, `predefined`,
  `manual-input`, `manual-operation`, `preparation`, `delay`, `display`, `stored-data`, `connector`, `offpage`.
- **Sequence diagram.** One item draws the whole diagram:
  `{ "shape": "sequence", "x": 10, "y": 30, "participants": [{ "id": "u", "text": "user", "kind": "actor" }, …], "messages": […] }`.
  - Participant kinds: `box`, `actor`, `db`, `queue`, `boundary`.
  - A message is `{ "from", "to", "text", "kind": "sync" | "async" | "reply" | "create" }`. A message from a
    participant to itself draws as a loop.
  - A note is `{ "note": "…", "over": ["a", "b"] }`.
  - A frame is `{ "frag": "alt" | "loop" | "opt" | "par" | "break" | "critical", "text": "[guard]" }`, closed with
    `{ "end": true }`. Inside a frame, `{ "else": "[guard]" }` adds a divider.
- **State machine.** `state` (with optional `entry`, `do` and `exit`), `initial`, `final`, `choice`, `fork`,
  `history`, `composite`, `terminate`.
- **Activity and BPMN.**
  - `action`, `merge`, `gateway` (`kind: "parallel"`), `event-start`, `event-end`, `event-timer`, `event-message`.
  - `swimlane`: a pool with `lanes: [...]`, and `vertical: true` for columns.
- **UML.**
  - `class`, `interface`, `enum` and `object`, which take `attributes: [...]` and `methods: [...]`.
  - `package`, `component`, `node`, `artifact`, `usecase`, `system-boundary`.
- **Entity relationship.**
  - `entity` and `weak-entity`, with `fields: ["PK id: text", "FK board: text", "title: text"]`.
  - `relationship`, `attribute`.
- **Data flow.** `external`, `process-dfd` (`n: "1"`), `datastore` (`n: "D1"`), `trust-boundary`.
- **C4.** `c4-person`, `c4-system`, `c4-container` and `c4-component` (with `tech` and `description`), `c4-db`,
  `c4-external`, `c4-boundary`.
- **Cloud architecture.**
  - Icons: `server`, `function`, `container`, `kubernetes`, `bucket`, `database`, `cache`, `message-queue`, `topic`,
    `eventbus`, `stream`, `warehouse`, `cdn`, `dns`, `load-balancer`, `api-gateway`, `auth`, `secrets`, `firewall`,
    `monitor`, and the rest.
  - Groups: `cloud-group`, `region`, `zone`, `vpc`, `subnet-public`, `subnet-private`, `security-group`.
  - Service names: `aws-*` (for example `aws-s3`, `aws-lambda`, `aws-sqs`, `aws-region`, `aws-vpc`), `gcp-*` and
    `azure-*`. An alias draws the matching icon, labelled with the service's name unless the item has `text`.
  - The icons are original, vendor-neutral glyphs, not the vendors' artwork.
- **Wireframes.** `checkbox`, `radio`, `toggle`, `dropdown`, `slider`, `tabs`, `table`, `avatar`, `badge`,
  `progress`, `navbar`, `card`, `modal`, `list`, `video`, `chart`.

Groups and containers (`group`, `swimlane`, `composite`, `package`, the boundaries, the cloud groups) are drawn behind
the other items. List them first and size them to hold their contents.

Edges can carry more than an arrow:
- `route`: `straight` (the default), `orthogonal` (right angles), `curved` (with `bend`; a negative bend curves the
  other way) or `spline` (a smooth S, as trees use).
- `start` and `end`: what each end of the edge looks like.
  - Arrows: `arrow`.
  - UML: `triangle` (generalization; dashed for realization), `diamond` (aggregation), `diamond-filled`
    (composition), `circle`, `dot`.
  - ER crow's feet: `one`, `many`, `one-many`, `zero-many`, `zero-one`.
  - `cross` (Mermaid's `--x`).
  - `none` for no mark.
- `startLabel` and `endLabel`: multiplicities such as `1` and `0..*`.
- `dashed` or `dotted`.
- An edge from an item to itself draws as a loop, which is how a state machine shows a self-transition.
- Edges that join the same two items fan out into separate curves.

There is a worked example of each kind of diagram in `SkyKit.SKETCHES`: `sequence`, `state-machine`, `data-flow`,
`aws`, `er`, `c4`, `class` and `flowchart`. The best way to start a new diagram is to copy the nearest example and
change it.

## Let the board place it: layouts and Mermaid

You rarely need coordinates. There are two ways to skip them.

**Mermaid.** Write the diagram in Mermaid and post it as `{ "mermaid": "…" }`, or as a `.mmd` file:
`crew sketch --board=<id> --file=diagram.mmd`. The board reads these diagram types:
- `flowchart` and `graph`:
  - every node shape, including `id@{ shape: cyl, label: "…" }`;
  - links with labels (`-->|text|` or `-- text -->`), dotted (`-.->`), thick (`==>`), with `o` and `x` heads, and
    `A & B --> C`;
  - `subgraph … end`.
- `sequenceDiagram`: participants and actors; `->>`, `-->>`, `-)` and `-x`; notes; alt, else, opt, loop, par, critical
  and break.
- `stateDiagram-v2`: `[*]`, transitions with labels, composite states, `<<choice>>`, `<<fork>>`, `<<join>>`, notes.
- `erDiagram`: crow's-foot cardinalities, and attributes with PK and FK.
- `classDiagram`: members, `<|--`, `*--`, `o--`, `-->`, `..>` and `..|>` with cardinalities, `<<interface>>`,
  namespaces, notes.
- `mindmap`.
- `architecture-beta`: groups, services and junctions. Icons such as `logos:aws-s3` become the library's AWS icons.

A line the board cannot read comes back as a problem with its line number; nothing is guessed. To try Mermaid before
you post, use City › Tools, which has a live playground.

**`layout` in a JSON sketch.** Add `"layout": "layered"` (or `{ "kind": "layered", "dir": "LR", "gap": 34,
"rank": 54 }`) and leave out `x` and `y`. The kinds:
- `layered`: flows, state machines and architectures. Ranks follow the edges, crossings are kept few, and long edges
  bend around the nodes in their way.
- `tree`: hierarchies.
- `mindmap`: two balanced sides around a root.
- `grid`: a palette or a catalogue.

Also:
- Put an item in a group with `"in": "<group id>"`. Groups fit themselves around their members.
- Boxes grow to fit their labels.
- `SkyKit.sketchLayout(sketch)` returns the placed sketch. Use it to pin a sketch's positions, then adjust them by hand.

Use JSON with coordinates only when the position itself carries meaning, such as a wireframe or a board you lay out on
purpose.

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
