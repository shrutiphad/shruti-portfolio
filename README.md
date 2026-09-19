# Shruti Phad — Portfolio

GTM-engineer portfolio. Next.js 14 App Router, JavaScript (no TypeScript),
deployed on Vercel at https://shruti-phad-portfolio.vercel.app

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Node 18+ is enough. There are no environment variables and no backend —
the contact box opens a mailto: to shrutiphadwork@gmail.com.

## Layout

```
app/
  layout.js              fonts, metadata, the always-on chrome
                         (cursor, smooth scroll, nav, command palette)
  page.js                the homepage deck — all eight panels, in order
  globals.css            every style in the project, one file
  template.js            route-change wipe
  not-found.js           404
  icon.svg               favicon
  projects/page.js       the case-study index
  projects/[slug]/page.js  one case study, generated per project

components/
  Panel.js               one section of the deck (sticky, numbered, glass)
  Shatter.js             the 84 glass panes + specular sheen on every panel
  StackMotion.js         the scroll maths: writes --cover, blur, opacity
  ScrollRail.js          right-edge circuit spine + progress bar
  PipelineGame.js        the playable five-stage pipeline (section 03)
  PipelineDiagram.js     all 16 SVG schematics, one per `variant`
  CapabilityDeck.js      the tabbed capability panels in About
  ProjectCards.js        the Selected work grid
  TagPile.js             matter.js physics toolkit
  DotName.js             canvas dot-matrix name with pointer repulsion
  DropBox.js             the falling contact box
  Cursor.js              custom cursor
  CommandPalette.js      ⌘K
  Nav.js, Reveal.js, MaskUp.js, RouteWipe.js, SmoothScroll.js, TraceRoute.js

lib/
  content.js             ALL copy, projects, skills, metrics — edit here first
```

## The two things worth knowing

**The deck.** Every `<section class="slide">` is `position: sticky; top: 0`,
so the next one scrolls up over the last. `StackMotion` measures each panel
and, for any panel taller than the viewport, sets a negative `top` so its
lower half stays reachable. On every frame it writes `--cover` (0 → 1) onto
the panel being covered; CSS turns that one number into the blur, the glass
panes breaking apart, and the sheen crossing the screen. Nothing runs on a
timer — it all tracks the scrollbar.

**The diagrams.** `PipelineDiagram` takes a `variant` name and looks it up in
`VARIANTS` at the bottom of the file. Each variant is a function returning
raw SVG children; lines draw themselves with framer-motion `pathLength` when
the figure enters view, and `<Packet>` sends a dot along any path by id. To
add a diagram: write the function, add it to `VARIANTS` with its viewBox,
then use `<PipelineDiagram variant="yourname" caption="..." />`.

## Editing copy

Almost everything readable lives in `lib/content.js` — the hero line, the
About stops, the capability chips, the jobs, the leadership section, the six
projects (with their live and GitHub links) and the toolkit groups. The
components read from it; they hold no copy of their own.

One standing rule in this design: no paragraphs. Anything that would be a
paragraph is a diagram instead.

## Known gaps

- `public/shruti-phad-resume.pdf` is missing, so the Résumé links 404.
  Drop the PDF at that path and it works.
- The site is deployed by direct upload, not from a git remote.
