# Requested portfolio refinements

Local comparison: http://127.0.0.1:3001
Baseline: http://127.0.0.1:3000
Original source remains in Downloads/shruti-phad-portfolio-src.

## Current design
- Restored original custom cursor and number/line section rail; original blue gradient and glowing progress indicator follow scrolling.
- Restored baseline tabs, origin map, toolkit, project card surfaces, tag boxes, and navigation.
- Restored falling contact box and slight final tilt, with the existing mail-client draft behavior.
- Removed the unsolicited homepage action buttons and replacement picture-side card.
- Replaced the low-resolution portrait map with a transparent cutout from the user-supplied original photo; upper-body framing retained. Photo frame 510/520px desktop, 340px phone.
- Removed pixel rendering, four profile fact boxes, and the location/year rule below the animated name. Name animation remains; canvas clears its entire backing buffer.
- Restored compact Away from my laptop label and neon green dot. Latest request: square-cornered rectangle without a triangular pointer, beside the cropped portrait.
- Capability label, flow and diagram share blue / lavender / green / orange colors.
- All six project cards and case studies share the same blue accent.
- Added https://x.com/ShrutiPhad to homepage/social and contact links. Resume retained.
- Footer: Crafted by Shruti Phad. / From first signal to useful systems. / Back to top.
- Section and project sequence preserved.

## Homepage update
Original photo supplied and integrated. Restored headline: I build the layer *no-code stops at*.
Simple discipline row: GTM engineering / Software / Applied AI.
Education removed from the homepage. All six social/resume links stay with the introduction. Photo appears directly below the name on phones and beside the introduction on desktop.
Background-edit specification: reference/portrait-cutout-prompt.md.
Source image retained under reference; final cutout is public/shruti-portrait-cutout.png.


## Run
`npm run dev` for editing; `npm run build` then `npm start` for production.
Both default to port 3001. Baseline stays on port 3000.
No deployment or GitHub push performed.

## Verification
Browser checked at 1366x768, 390x844, 320x740. No horizontal page overflow.
All six project diagram and status colors: rgb(111,157,245).
Cursor class and elements restored. Rail markers are lines, not circles.
Contact final tilt is -0.6 degrees; square corners restored.
Footer, X destination, and resume link inspected in rendered DOM.
Final production build passed: compiled, type/lint checks, 12 generated routes.
All homepage/project/index/resume endpoints returned 200; baseline homepage returned 200.
All 35 original non-Git source files and 35 baseline app/component/content/public files match recorded checksums.
Screenshots: restored-desktop.jpg and restored-mobile.jpg in this chat's visualization directory.

## Latest verification
2026-10-02: laptop 1366x768 and phones 390x844 / 320x740 inspected.
No horizontal page overflow. Rendered DOM has no old fact boxes or name-row rule.
Cutout verified RGBA with transparent corner pixels; background visually inspected.
Final photo/homepage production build passed (12 generated routes). All 35 original non-Git files and 35 baseline files match recorded checksums. Homepage, project index, Debrief, resume and cutout returned HTTP 200; baseline homepage also 200. Final production browser console: no captured errors or warnings. Screenshots: homepage-original-photo-desktop.jpg and homepage-original-photo-mobile.jpg in this chat visualization directory.

## Latest requested corrections
- Restored exact original homepage headline and description.
- Removed the homepage education line and its unused CSS.
- Removed the white rail overrides; original blue/glow CSS is active again.
- Added a 4px CSS pixel texture on a duplicate of the existing cutout, above the unchanged sharp photo. Texture strength is lower over the face. No downsampling or new image edit.
- Photo asset is unchanged (SHA256 CC0F7B7DC7C73D98BFFC41306DF8D2F79D4DC8E5AE31160322BE22BC82E73517).
- Future edit constraints are recorded in DESIGN-CONSTRAINTS.md.
- Browser checks: exact copy, no homepage education, rail active color rgb(111,157,245) and original glow; blue progress follows About navigation; 1366px and 390px layouts checked.
- Latest production build passed (12 generated routes). Browser checks at 1366px, 390px and 320px: no page-width overflow, correct exact copy, no homepage education, masked pixel overlay and original blue rail. Final browser console has no captured errors or warnings. Original source and baseline hashes unchanged; photo hash unchanged. Homepage/photo/baseline return 200. Final preview: homepage-requested-pixels-desktop.jpg in the chat visualization directory.

## Requested crop and wrapping update (2026-10-02)
- Display-only portrait crop excludes the hands at every width (1040/1391 of the original image height). The cutout asset is unchanged.
- Floating Away from my laptop label has square corners and no triangular pointer.
- Headline text remains verbatim; no-code stops at. is kept together, including its final full stop.
- User-invited hover addition: pixel overlay opacity increases from .32 to .48 while the full-resolution base photo stays intact. Reduced-motion preference disables the transition.
- No other content, section order, cursor, or numbered rail changes.

Verification for the crop/wrapping update: production build passed (12 generated routes). Browser checked at 1366x768, 1280x800, 390x844 and 320x740: no horizontal overflow and no orphaned headline ending. Visible image height stays at 1040/1391 of the source height at every checked width. Hover overlay reached .48 opacity and brightness(1.8); floating rectangle has 0px corner radius and its pointer is hidden. The cutout SHA256 is unchanged. All 35 original non-Git source files and 35 baseline app files still match their saved manifests. Local comparison homepage/photo and baseline homepage returned HTTP 200. Production screenshot: homepage-cropped-rectangle-laptop.jpg in this chat visualization directory.

## Pipeline lab and homepage colors (2026-10-02)
- All three homepage discipline labels now use the existing blue. Away from my laptop is a yellow rectangle; placement, green dot and link preserved.
- Only the machine/pipeline section was rebuilt: two demo leads, automated five-stage execution, a bypass selector, live lead record, stage input/rule/output inspector, payment/attribution comparison and execution trace.
- Demo runs locally with fictional data. No external connectors, provider calls or payment transactions. Qualified leads route to sales; low-fit leads route to nurture. Attribution is credited only for a complete trace.
- Section label: Run a revenue pipeline. Existing Five stages headline and section position preserved.
- Photo asset, crop and effects preserved. All other website sections unchanged.
- Repeatable logic checks: node tests/pipeline-demo.test.mjs. Verified qualified routing, all five bypasses, dependency blocking, low-fit nurture and truthful zero revenue.
- Browser interaction/visual verification could not be completed: the in-app browser repeatedly timed out, including after connection recovery. Do not claim responsive or visual checks for this update.

Final pipeline-lab verification: production build passed, including type/lint checks and all 12 generated routes. Repeatable logic tests passed. Production homepage returned 200 and contained the new label, Run demo control, demo-data disclosure and execution trace. Portrait and baseline homepage returned 200. Compared with the pre-change manifest, only app/page.js, app/comparison.css, components/PipelineGame.js and the two state documents changed; lib/pipeline-demo.js and its test were added. Photo and all other components/content/assets are unchanged. All 35 original non-Git source files and 35 baseline files match their saved checksums. Production server is running locally on port 3001. No push or deployment. The pipeline section alone uses normal scrolling so its taller controls/results remain reachable.

## Final requested corrections and verification (2026-10-02)
- Removed the homepage description's em dash. Existing headline and section order preserved.
- Away from my laptop is transparent with a neon yellow outline and yellow dot.
- Full-resolution portrait now has cursor-reactive six-pixel tiles that repel and spring back. Original above-hands crop and PNG asset are unchanged. Touch scrolling is not intercepted; canvas motion stops offscreen and honors reduced motion.
- Added click/tap guidance above capability choices, a pulsing next option's font, and a demonstration label. On phones the demonstration is underneath; on tablet/laptop it is beside the menu.
- InLighnX Global is blue, leadership code is yellow, General Secretary is purple.
- Toolkit retains its drop, then tiny staggered bob/rotation. Phone testing found transformed offscreen chips could remain hidden; observing the bin instead fixes this. Verified all 18 Full stack chips landed with opacity 1, with independent idle transforms; all 41 labels remain present. Drop again works.
- Contact box header wraps on narrow screens. Its original tilt/form behavior is preserved.
- Browser inspected both sites at 320, 390, 768 and 1366 pixels. No horizontal document overflow. Photo stays left with all personal footer content beside it, within the photo height, including at 320px.
- All six case studies and project index checked at 390px; Debrief additionally checked at 320px.
- Browser exercised all four capability choices and observed the pulsing next option. Mobile stage is below menu; laptop stage beside it.
- Browser ran complete Northwind ($12,000 payment/credit), bypass Route ($12,000 payment/$0 credit), and low-fit Lumen (nurture/$0). Final production demo and inspector also checked. Pure pipeline tests passed all five bypasses and dependency cases.
- Production build passed: compile, type/lint checks, all 12 routes. Homepage/index/photo/resume returned 200. Separate landing page, CSS/photo/resume returned 200; its server syntax check passed. The personal Click here button was clicked and opened the fancy homepage.
- Both protected manifests match: 35 original non-Git source files and 35 baseline files. Original cutout SHA256 unchanged: CC0F7B7DC7C73D98BFFC41306DF8D2F79D4DC8E5AE31160322BE22BC82E73517.
- Screenshots in chat visualization directory: final-fancy-laptop.jpg, final-personal-phone.jpg, final-pipeline-phone.jpg, final-personal-laptop.jpg.
- Current servers: fancy http://127.0.0.1:3001/ and personal http://127.0.0.1:3002/. No push or deployment.

## Cooler theme and tool research (2026-10-02)

- Inter official typeface documentation: https://rsms.me/inter/. A Latin variable WOFF2 already installed in the fancy site's dependencies is served locally with its SIL Open Font License. No font CDN or additional install.
- Make visual business/workflow automation: https://www.make.com/en/product
- Zapier app workflows: https://help.zapier.com/hc/en-us/articles/22234847450893-Zap-workflows-quick-start-guide
- Instantly outreach sequences: https://instantly.ai/outreach
- Sales Navigator prospecting: https://business.linkedin.com/sell/sales-navigator/how-to-use
- These four tools replace toolkit labels at Shruti's request. Research verifies product purpose, not personal proficiency or certification. No new experience/project claims were added.
- Original reference HTML identifies the author as Vyom Bhatia and its URL as https://vyom.work/. The linked credit uses that spelling and URL.
- The role's no tools wording is interpreted as established no-code tools. Existing banger-conversations wording is preserved. The supplied hiring paragraph is lightly punctuated and completed with code.
# Local verification: cooler landing update, 2026-10-02

Both websites inspected in browser viewports 320px, 390px, 768px and 1366px. No horizontal document overflow.

Landing page: Inter is locally served, body background rgb(14,20,32), credit aligns left. Opening no longer repeats I am. Career paragraph is one sentence; untapped corners ending and supplied production-systems hiring paragraph are present. Original mirror photo matches the supplied file checksum and preserves its 761/1277 ratio (148x248.35 at laptop width, 92.8x155.71 at 320px). Photo is not cropped. Conversation and five links are beside it; fancy portfolio sentence/button follow below. Credit links Vyom Bhatia to https://vyom.work/. Button was clicked and reached the fancy homepage. Local font endpoint returned 200 with font/woff2 MIME; server syntax check passed.

Fancy: status font 13px on phones / 15px on laptop. Away from my laptop text and number-lies text both rgb(210,171,92). Dark original-style label fill rgba(16,20,30,.933). Desktop position bottom 10px / right 12px; phone bottom 8px / right 0. Toolkit has 41 entries; all 12 GTM chips observed at opacity 1 after drop, including Make, Zapier, Instantly and Sales Navigator. Only toolkit labels changed; project/experience mentions were preserved. Production build passed compilation, type/lint checks and all 12 routes.

Protected manifests: all 35 original Downloads files and 35 Portfolio baseline files match saved checksums. Current copies remain personal-landing on 3002 and comparison-v2 on 3001. No push or deployment. These checks use browser viewports, not physical devices.

Screenshots saved in this chat visualization directory: cool-landing-laptop-top.jpg, cool-landing-laptop-footer.jpg, cool-landing-phone-320.jpg, cool-fancy-laptop.jpg.
