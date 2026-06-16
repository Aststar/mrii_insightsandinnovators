# Deploy Runbook — Insights & Innovators (branch `claude/nifty-kapitsa-a7a552`)

_Last updated: 2026-06-16. Written against the actual repo state, not assumptions._

## TL;DR — the two things that will break this deploy if ignored

1. **The branch removed the Vite `base` setting.** On `main`, `vite.config.ts` has
   `base: '/wp-content/uploads/mrii-app/'`. The branch deleted that line. I built the
   branch to confirm: it now emits a **root-absolute** script tag
   `<script src="/assets/index-[hash].js">`. The live site loads the bundle from
   `/wp-content/uploads/mrii-app/assets/...`. **If you deploy the branch as-is, the
   browser will request `https://mrii.org/assets/index-[hash].js`, get a 404, and the
   app will render a blank `#root`.** Fix before deploying (Step 2). Your note that
   "base is NOT set" is correct *for the branch* — but it's a regression from `main`,
   not the intended state.

2. **The branch switched `HashRouter` → `BrowserRouter`.** That is exactly why
   William's server rewrites are now *mandatory*. With the old hash routing
   (`/#/episode/slug`) WordPress never saw the path, so no server config was needed.
   With `BrowserRouter`, a hard load or refresh of `/podcast/[slug]`,
   `/insights-and-innovators-podcast`, or `.../all-episodes` hits WordPress directly —
   and 404s unless those URLs are rewritten to serve the app. William's work is a
   hard blocker, not a nice-to-have.

Everything else is mechanical.

---

## How the bundle actually gets onto mrii.org (your "big unknown", answered)

The repo documents the existing mechanism in `wordpress-deploy/INTEGRATION-STEPS.md`
and the `*.code-snippets.php` files. It is **not** committed into a theme/plugin and
**not** a separate static host. It is:

1. **Manual upload** of the built JS to the WordPress uploads directory:
   `wp-content/uploads/mrii-app/assets/index-[hash].js` (via cPanel / FTP / host file
   manager). `dist/` is gitignored, so the build artifact never goes through git.
2. **A WPCode "Header" snippet** (HTML, site-wide or page-specific) that loads Tailwind
   CDN, the Google Fonts, the scoped `<style>`, and the **importmap** for React /
   react-dom / framer-motion / lucide (these are pulled from `esm.sh` at runtime via the
   importmap, even though the app bundle also references them — keep the header snippet).
3. **A WPCode "Body" snippet** delivered as a **shortcode**, containing
   `<div id="root"></div>` + `<script type="module" crossorigin src="/wp-content/uploads/mrii-app/assets/index-[hash].js">`.
4. **An Elementor page** (Full-Width / Canvas template) with a Shortcode widget holding
   that shortcode.

So "deploy" = build → upload the new hashed JS → update the script `src` hash in the
Body snippet → clear cache. The hash in the filename changes every build, so the snippet
must be edited each time (or you reuse a fixed filename — see Step 2 option B).

> Caveat to confirm with whoever last deployed: the in-repo docs use the folder
> `wp-content/uploads/mrii-app/`, but one older committed PHP snippet
> (`mrii-insights-and-innovators-body.code-snippets.php`) points at
> `wp-content/uploads/mrii-insights-innovators-2026/Assets/...`. **Verify which folder
> production actually serves from before uploading** (check the live page's current
> `<script src>` in DevTools). The runbook below assumes `mrii-app/assets/`.

---

## Step-by-step runbook

### Step 0 — Pre-flight (confirm the unknowns; see "What I need from you")
- Confirm the real upload location by viewing the **current** live `<script src>` on the
  podcast page (DevTools → Elements, or View Source).
- Confirm William's rewrites + the `podcast` CPT template + 301s are deployed (or
  coordinate to deploy together).
- Confirm who has file access to `wp-content/uploads/` (cPanel/FTP/SFTP creds or a person).

### Step 1 — Merge the PR (or build from the branch)
- Review and merge `main...claude/nifty-kapitsa-a7a552`. Note the PR also **deletes the
  `wordpress-deploy/` folder and the PHP snippet files** — i.e., it removes the
  integration docs and old prebuilt bundles. Save a copy of
  `wordpress-deploy/INTEGRATION-STEPS.md` before/after merge so the deploy knowledge
  isn't lost. (This runbook captures the essentials regardless.)
- If you prefer to deploy before merging, just build from the branch tip.

### Step 2 — Fix the asset base path, THEN build  ⚠️ required
Pick one:

- **Option A (recommended): restore the base.** Re-add to `vite.config.ts`:
  ```ts
  base: '/wp-content/uploads/mrii-app/',
  ```
  Then `npm ci && npm run build`. The built `dist/index.html` script tag will read
  `/wp-content/uploads/mrii-app/assets/index-[hash].js`, matching production. This keeps
  the existing hosting model untouched.

- **Option B: keep base unset and change the upload target.** Only if you intend to host
  the bundle at the web root `https://mrii.org/assets/...`. This usually means dropping
  the file outside `wp-content/uploads` and is more fragile on managed WP hosts. Not
  recommended unless William specifically wants root hosting.

Confirm before uploading:
```bash
grep -o 'src="[^"]*assets[^"]*"' dist/index.html
```
The path must match where you will actually upload the file.

Build facts (verified): `npm run build` → `dist/index.html` + one
`dist/assets/index-[hash].js`, ~133 KB gzip, React bundled in.

### Step 3 — Upload the new bundle
- Upload `dist/assets/index-[hash].js` to `wp-content/uploads/mrii-app/assets/`.
- Leave the previous bundle in place until the new one is verified live (instant
  rollback = repoint the snippet back).
- Optional stability tip: copy the file to a **fixed** name too (e.g.
  `index.js`) and reference that in the snippet, so you don't edit the hash every deploy.
  Trade-off: you then rely on cache-busting (Step 5) since the URL no longer changes.

### Step 4 — Update the WPCode Body snippet
- In WPCode, edit the **Body** snippet's script `src` to the new hashed filename
  (or the fixed name from Step 3). Keep `type="module" crossorigin`.
- Leave the **Header** snippet as-is (Tailwind/fonts/importmap) unless dependency
  versions changed.
- Save. Confirm the snippet is **Active** and the shortcode is still on the Elementor
  page.

### Step 5 — Bust caches
- Purge the WP caching plugin (LiteSpeed / WP Rocket / etc.) and any CDN (Cloudflare,
  host-level). Stale HTML or a stale JS URL is the most common "I deployed but nothing
  changed" cause.

### Step 6 — Verify (see checklist below). If broken, roll back by repointing the Body
snippet `src` to the previous bundle and re-purging cache.

---

## What I need from you (Astrid) and from William

**From you / whoever last deployed (to fill the hosting gaps):**
- The **real upload path** production serves the bundle from (`mrii-app/assets` vs
  `mrii-insights-innovators-2026/Assets` vs root). One look at the live page's
  `<script src>` settles it.
- **File access** to `wp-content/uploads/` — cPanel/FTP/SFTP credentials, or confirmation
  that William (or you) will do the upload.
- **WPCode access** to edit the Body snippet, and confirmation of the Elementor page URL
  that hosts the shortcode.
- Decision on **Option A vs B** for the base path (default to A).

**From William (WordPress server side — hard blockers for `BrowserRouter`):**
- SPA fallback **rewrites** so these serve the app's HTML shell:
  `/insights-and-innovators-podcast`, `/insights-and-innovators-podcast/all-episodes`,
  `/podcast/[slug]`.
- The `podcast` CPT **template** mounts `<div id="root">` + the bundle at
  `/podcast/[slug]` (so single-episode URLs render the app, not the default WP single).
- **301 redirects** from the old structure to the new. Note: old links were
  `/new#/episode/[slug]` — the slug lives in the URL `#fragment`, which **never reaches
  the server**, so those exact deep links can't be 301'd server-side. Mitigations to
  discuss: (a) a tiny client-side shim on the old landing page that reads
  `location.hash` and `history.replaceState`s to `/podcast/[slug]`; (b) accept that old
  hash-deep-links land on the listing page. Non-fragment old paths (e.g. `/new`) *can*
  be 301'd normally.
- Confirm whether the Header snippet (Tailwind/importmap) is loaded **site-wide** or only
  on these pages, so the new server-rendered `/podcast/[slug]` template also gets it.

**Sequencing:** William's rewrites + CPT template should go live **at or before** the
bundle swap. If the new `BrowserRouter` bundle goes live before the rewrites exist,
direct hits/refreshes of `/podcast/[slug]` and `/all-episodes` will 404.

---

## Risks & how to verify on the live site

**Risk 1 — Asset 404 / blank page (highest).** Caused by the removed `base` (Step 2) or
an upload-path mismatch. _Verify:_ open the page, DevTools → Network, confirm the
`index-[hash].js` request is **200** and from the expected path; `#root` is populated;
Console is clean.

**Risk 2 — Routing 404 on deep links/refresh.** Caused by missing/incomplete server
rewrites. _Verify:_ directly load (not in-app navigation) each of:
`https://mrii.org/insights-and-innovators-podcast`,
`.../insights-and-innovators-podcast/all-episodes`,
`https://mrii.org/podcast/<a-real-slug>`, then **hard-refresh** each. All must render the
app, not a WP 404.

**Risk 3 — Caching.** Old HTML or old JS served after deploy. _Verify:_ hard-reload
(Cmd/Ctrl-Shift-R), confirm the JS filename hash matches what you uploaded; check in an
incognito window and on mobile.

**Risk 4 — Old-URL redirects (partial by design).** Hash-fragment deep links can't be
redirected server-side. _Verify:_ test a representative old link; confirm it at least
lands somewhere sane (listing page) and decide if the client-side shim is worth it.

**Risk 5 — Data/feature regressions.** The episode page now uses the per-episode
Captivate player (`episode_player`), `episode_description`, and lazy-fetched
`episode_transcript`; All-Episodes has `?q=` search + topic filter. These fields are
already live in the WP REST API. _Verify on a real episode:_ player loads and plays,
description shows, transcript expands and fetches, "More Episodes" shows square cover
art; on All-Episodes, type a query → URL gains `?q=...`, results filter, and search +
topic filter stack. Spot-check the WP REST endpoint returns the fields:
`https://mrii.org/wp-json/wp/v2/podcast?per_page=1`.

**Risk 6 — Runtime CDN dependencies.** Tailwind and (via importmap) React/framer/lucide
load from CDNs at runtime. _Verify:_ no Console errors about failed module/CDN loads;
styling renders (brand red `#eb2d3f`, Montserrat headings).

**Risk 7 — Lost deploy docs.** The PR deletes `wordpress-deploy/`. _Mitigation:_ keep
this runbook (and a copy of the old `INTEGRATION-STEPS.md`) in the repo or your wiki.

---

## Quick verification checklist (post-deploy)
- [ ] `index-[hash].js` → 200 from the expected path; `#root` populated; Console clean
- [ ] Direct-load + hard-refresh of listing, all-episodes, and a `/podcast/<slug>` page all render
- [ ] Episode player plays; description + transcript work; square art in "More Episodes"
- [ ] All-Episodes search updates `?q=` and stacks with topic filter
- [ ] Caches purged; correct hash served in incognito + mobile
- [ ] At least one old-URL link tested
