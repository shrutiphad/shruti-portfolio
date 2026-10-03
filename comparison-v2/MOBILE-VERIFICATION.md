# Mobile verification — 2026-10-03

Latest authoritative contact address: shrutiphadwork@gmail.com. Both landing pages display this address and use it in their mailto link. The fancy site's shared profile configuration supplies it to home and case-study contact links and the contact form. Previous verification entries describe historical states only.

## Changes
- Phone navigation, social links and relevant controls have larger tap targets.
- The fancy pipeline's five stages become readable vertical rows on narrow phones; the desktop five-column layout remains intact.
- Phone contact fields use 16px text. The email field and action button occupy separate full-width rows.
- Long links and case-study navigation wrap within the available width.
- Phone social separators are hidden to avoid detached punctuation on wrapped rows.
- Existing copy, portrait assets, colors and desktop design preserved apart from the requested contact correction.

## Evidence
Browser checks on the fancy homepage and both landing pages at widths 320, 390, 430, 768, 844 (landscape) and 1366 pixels found no horizontal document or visible-element overflow. Hiring and writing dropdowns were also checked open on phones. Desktop pipeline retains five columns.

At 320px: all five pipeline stages completed, inspecting the report worked, bypassing the report produced the expected missing-attribution result, all four discipline demonstrations switched correctly, the toolkit replay worked, and contact fields accepted text. Temporary form values were cleared without sending email. Project index and all six case studies had no horizontal overflow. All six case-study routes and the main routes returned HTTP 200 with the correct shared contact address.

The fancy production build passed compilation, lint/type checks and generation of all 12 routes. Landing pages are static. These are browser viewport checks, not physical iOS/Android device tests.

Original Downloads source and saved Portfolio baseline checksum manifests still match. No push or deployment. Local previews: landing http://127.0.0.1:3003/, preserved landing http://127.0.0.1:3002/, fancy http://127.0.0.1:3001/.

Machine-readable measurements and phone screenshots are saved in the chat visualization directory: mobile-verification-results.json, responsive-fancy-phone-390.jpg, responsive-pipeline-phone-390.jpg, responsive-landing-footer-phone-390.jpg.
