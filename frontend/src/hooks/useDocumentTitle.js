import { useEffect } from 'react';

/**
 * Per-page SEO description helper.
 *
 * We intentionally do NOT touch `document.title` here — the browser tab
 * stays on the fixed site-wide title set in `index.html`
 * ("RIEAL H2O — Nature's Purity In Every Drop") across every page.
 *
 * The first argument (`_title`) is kept for backwards compatibility so the
 * existing page calls — `useDocumentTitle('About — RIEAL H2O', '...')` —
 * keep working; it's simply ignored. If you ever want per-page tab titles
 * again, re-enable the block below.
 */
export default function useDocumentTitle(_title, description) {
  useEffect(() => {
    // ── Tab title is fixed site-wide; do not overwrite. ──
    // if (_title) document.title = _title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [description]);
}
