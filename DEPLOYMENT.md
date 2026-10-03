# Deploy both portfolios

The approved landing page is at `/`; the approved fancy portfolio is at `/fancy`. Contact links use shrutiphadwork@gmail.com.

Editable sources remain in `personal-landing-preview/dist` and `comparison-v2`. The root's original app and local backups are preserved. Deploy only `site/`, not the older root app.

To regenerate the published files, run `node scripts/build-portfolio.mjs` with Node.js and npm installed. It copies the approved sources into the ignored `.portfolio-build` directory, installs their locked dependencies, statically exports the fancy site, sets its deployment path to `/fancy`, and replaces only the landing page's localhost button link. Original source assets and approved content remain unchanged.

Vercel: import shrutiphad/shruti-portfolio. Root `vercel.json` uses the Other preset, skips cloud install/build steps, and publishes the committed `site` output with clean URLs. No Next.js server, database, API keys or runtime secrets are needed. JavaScript interactions run in the visitor's browser; the contact form opens the visitor's email application.

Refresh the generated output with the build script before pushing source edits. Roll back to the previous Git commit/deployment if the homepage, fancy page, case studies or their navigation fail. A production URL is recorded only after Vercel reports successful deployment and live checks pass.

2026-10-03: Publishing explicitly authorized by the user, including use of this GitHub repository. Vercel authentication pending at preparation time.

## Production release — 2026-10-03
Published successfully to https://shruti-phad-portfolio.vercel.app/ with the fancy portfolio at /fancy. Vercel deployment dpl_BGqCVkouJmDxtX3FtpwrVD8NGh8W is READY and owns the existing production alias.

Both homepages, project index, all six case studies, both portraits, resumes and landing stylesheet returned HTTP 200. Browser verified landing-button navigation, loaded portraits and completion of all five pipeline stages. Phone-width checks at 390px found no horizontal overflow in either homepage. The previously verified mobile styles are preserved. Every page's email is shrutiphadwork@gmail.com.

Deployed directly from this selected repository checkout; its approved sources were preserved. Generated deployment files and root Vercel configuration are staged locally. No commit or push was executed because automatic approval review required explicit authorization to modify GitHub main. GitHub connection/automatic deployments remain pending this approval.

Rollback: previous production deployment dpl_7JM8ee8Sy2afiHs5BivD3t9REwxi, https://shruti-phad-portfolio-g6udk8b3p-shrutiphadwork-6652s-projects.vercel.app. Full verification state: ../PRODUCTION-STATUS.json.
