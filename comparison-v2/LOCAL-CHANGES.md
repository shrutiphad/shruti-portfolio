# Local portfolio revision

Working copy: `C:\Users\ADMIN\Documents\Portfolio`.
Original source: `C:\Users\ADMIN\Downloads\shruti-phad-portfolio-src` (read only).
No push or deployment is part of this work.

## Implemented
- Interactive pipeline moved to 01, About to 02, experience to 03.
- Restored hero portrait from deployed site's existing 220 x 169 pixel map; high-DPI canvas, no mobile subsampling, full image bounds, flat baseline.
- Four personal facts, all five social/resume links on one row, leadership shortcut.
- Compact six-branch About diagram; centered, click-controlled capability menu.
- Brighter text, captions and metrics; spaced project cards and three level toolkit bins.
- Native scroll; removed per-frame panel blur/tilt and physics loop. Toolkit uses finite spring drops.
- Debrief pharma CRM live URL sourced from GitHub repository homepage metadata.
- Hugg labelled previous role, without inventing an end date.
- Removed footer slogan and keyboard prompts; contact action clearly opens an email draft.

## Asset limitation
The source and Portfolio references contain no original portrait photo. The deployed bitmap cannot recover cropped shoulder/hair or higher-resolution facial detail. The Portrait component keeps the complete existing bitmap within its bounds. Replace with the original photo when supplied.

## Run
`npm install` then `npm run dev -- --hostname 127.0.0.1`.
Production check: `npm run build`.

## Verification
- Final production build passed, generating all 12 routes.
- Laptop browser at 1366 x 768: all five pipeline stages, out-of-order stage rejection, all four capability controls and toolkit replay passed.
- Phone browser at 390 x 844: portrait visible, capability control and toolkit replay passed; no horizontal overflow. A legacy mobile hide rule and zero-size canvas exception were found and fixed.
- Three toolkit bins contain all 41 chips with no out-of-bounds labels on laptop.
- Home, project index, all six case studies and resume PDF returned HTTP 200.
- Debrief live destination opened the expected HCP Interaction Module.
- Original source comparison: all 104 file checksums unchanged.

## Maintenance
New visual rules live in `app/refinements.css`, imported after the original stylesheet.
The portrait stays in `lib/portrait.json`; rendering is in `components/Portrait.js`.
The local reference bundle and baseline checksums are retained for traceability.
The installed framework is the original Next.js 14.2.15 from the supplied project; dependency modernization was outside this local visual revision.


## Final preview
Production server: http://127.0.0.1:3000 (local only).
Final production browser checks: 1366 x 768, 390 x 844 and 320 x 740. No horizontal overflow at either phone width; email and resume stay together on small screens. All five pipeline stages complete; capability switching, toolkit replay, leadership shortcut and return-to-top work. No console errors in the final production browser session.

