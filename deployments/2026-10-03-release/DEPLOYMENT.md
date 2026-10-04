# Portfolio deployment — 2026-10-03

Status: prepared; not yet published.

Approved working sources: comparison-v2 and personal-landing-preview/dist. Only publishing configuration changes: static export of the fancy site, unoptimized source portrait for static hosting, and replacing the landing button localhost URL with the production fancy URL. The interaction code and approved content are unchanged.

Contact: shrutiphadwork@gmail.com.

Target provider: Vercel. Preserve the existing fancy deployment as the rollback target before production publishing. Keep the two local previews and protected source untouched. No GitHub push.

## Verified release state
Fresh isolated static build passed for 12 routes. Initial dependency-junction build had duplicated module contexts and was discarded; clean installation and rebuild fixed the loading exception. Exported browser preview now loads the portrait, completes all five pipeline stages, and follows client navigation to /projects. Main route, project index, all six case studies, resume and portrait returned HTTP 200 locally. Landing button points to the intended existing fancy production alias; actual alias ownership must be verified after sign-in. All working-source checksums still match the pre-release snapshot.

Status: NOT DEPLOYED. Vercel account authorization is required. Device login was started; user must complete it. After authorization, inspect account/projects, link the fancy output to the existing project that owns shruti-phad-portfolio.vercel.app, record the current production deployment for rollback, publish the fancy output, then create/publish the landing project and verify both live URLs. If the device code expires, restart Vercel login. No GitHub push is required.

## Production release — 2026-10-03
Published successfully to https://shruti-phad-portfolio.vercel.app/ with the fancy portfolio at /fancy. Vercel deployment dpl_BGqCVkouJmDxtX3FtpwrVD8NGh8W is READY and owns the existing production alias.

Both homepages, project index, all six case studies, both portraits, resumes and landing stylesheet returned HTTP 200. Browser verified landing-button navigation, loaded portraits and completion of all five pipeline stages. Phone-width checks at 390px found no horizontal overflow in either homepage. The previously verified mobile styles are preserved. Every page's email is shrutiphadwork@gmail.com.

Deployed directly from this selected repository checkout; its approved sources were preserved. Generated deployment files and root Vercel configuration are staged locally. No commit or push was executed because automatic approval review required explicit authorization to modify GitHub main. GitHub connection/automatic deployments remain pending this approval.

Rollback: previous production deployment dpl_7JM8ee8Sy2afiHs5BivD3t9REwxi, https://shruti-phad-portfolio-g6udk8b3p-shrutiphadwork-6652s-projects.vercel.app. Full verification state: ../PRODUCTION-STATUS.json.

The final combined release supersedes the earlier two-project preparation. Final publishing checkout: ../shruti-portfolio; output: ../shruti-portfolio/site.
