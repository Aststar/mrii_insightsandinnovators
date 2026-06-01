# MRII App — WordPress Integration Steps

## What's in this folder

- `assets/index-NfHMCTsn.js` — the full production bundle (upload this to WordPress)
- `wpcode-snippet-1-header.html` — paste into WPCode for the page `<head>`
- `wpcode-snippet-2-body.html` — paste into WPCode as a shortcode for the page body

---

## Step 1 — Upload the JS bundle to WordPress

Using your hosting file manager, FTP, or cPanel:

1. Navigate to: `wp-content/uploads/`
2. Create a new folder called `mrii-app`
3. Inside that, create a folder called `assets`
4. Upload `assets/index-NfHMCTsn.js` into it

Final path on your server should be:
```
/wp-content/uploads/mrii-app/assets/index-NfHMCTsn.js
```

---

## Step 2 — Add WPCode Snippet 1 (Header)

1. Go to **Code Snippets → + Add Snippet → Custom Code**
2. Name it: `MRII App – Header`
3. Code Type: **HTML Snippet**
4. Paste the contents of `wpcode-snippet-1-header.html`
5. Insertion: **Site Wide Header** (or "Page Specific" → select only your podcast page for less global impact)
6. Toggle **Active** → **Save Snippet**

---

## Step 3 — Add WPCode Snippet 2 (Body / Mount Point)

1. Go to **Code Snippets → + Add Snippet → Custom Code**
2. Name it: `MRII App – Body`
3. Code Type: **HTML Snippet**
4. Paste the contents of `wpcode-snippet-2-body.html`
5. Insertion: **Shortcode** (this gives you a shortcode like `[wpcode id="123"]`)
6. Toggle **Active** → **Save Snippet**
7. Copy the generated shortcode (shown at the top of the snippet after saving)

---

## Step 4 — Create / Edit the Podcast Page in Elementor

1. Create a new WordPress page (or edit your existing one)
2. Set the Elementor Template to **Full Width** (removes the WP header/footer — the React app has its own)
3. In Elementor, drag in a **Shortcode widget**
4. Paste the shortcode from Step 3 (e.g. `[wpcode id="123"]`)
5. **Update** the page

---

## Step 5 — Test

1. Clear any caching plugin (LiteSpeed, WP Rocket, etc.)
2. Visit the page in your browser
3. Open DevTools (F12) → Console tab — check for any errors
4. Test navigation within the app — links like "All Episodes" will use `/#/allepisodes` (hash routing, WP-compatible)

---

## Notes

- **Routing**: The app uses hash-based routing (`/#/allepisodes`, `/#/episode/slug`). This is intentional — it means WordPress never intercepts those URLs.
- **Tailwind**: Loaded via CDN. If you notice style conflicts with your WP theme, let your developer know — scoped CSS can be applied.
- **Header conflict**: The React app has its own header. If your Elementor page still shows the WP header, disable it in Elementor's page settings (Page Layout → Canvas, or use the Full Width template).
