# CS AUMC Landing Page — Development Log

**Project:** Scroll-driven journey landing page for CS Department, Air University Multan Campus
**Stack:** Vanilla HTML/CSS/JS · Supabase (inquiry form only) · GitHub → Vercel
**Target domain:** cs-aumc.vercel.app
**Owner:** Asad (CS AUMC)

---

## Versioning convention
- `X.Y.0` — major scene/section additions or rebuilds
- `X.Y.Z` — patches, fixes, tweaks
- Every release gets an entry below. Newest on top.

## Core concept
Pinned horizontal journey (Approach A): one male Pakistani student character (SVG, tucked-in shirt, no tie/coat) walks left→right through real campus photo scenes (duotone-treated navy/teal) as the visitor scrolls:

Gate entry → Walkway → Building approach → Corridor → Classroom → Lab → FYP demo → Convocation → Corporate job

After the journey: Programs (BSCS, BSDS, BSAI, BS Cyber Security, BS SE) → Why CS@AUMC → Faculty (horizontal scroll cards) → Inquiry form (Supabase) → Footer.

## Design tokens
- **Navy** `#2A3990` (primary, from AUMC deck template)
- **Teal** `#0FA3A3` (accent)
- **Gold** `#E8B94A` (highlight, sparing)
- **Ink** `#151B33` (dark text/bg), **Paper** `#F7F8FC`
- Type: Poppins (display, geometric ≈ Century Gothic feel) + Inter (body), via Google Fonts
- Character palette: sky-blue shirt, grey trousers, brown belt/shoes, navy backpack

## Asset inventory (received from Asad, Jul 2026)
| Scene | Asset | Status |
|---|---|---|
| Gate | IMG_6721 (AIR UNIVERSITY sign, canopy) | ✅ in use (scene-gate.webp) |
| Gate alt | IMG_6764 wider shot | ✅ have, unused |
| Walkway | IMG_6912_3? / walkway w/ trees + bike shed | ✅ have |
| CS Building | portrait aerial, brick + blue mosaic wall | ✅ have |
| Classroom | teal-chair rooms (exam, seminar w/ girls) | ✅ have |
| Labs | DS Lab, AI Lab, multiple angles | ✅ have |
| FYP demo | corridor demo w/ ESP32 + guests | ✅ have |
| Library | bookshelf browsing (bonus scene) | ✅ have |
| Faculty samples | 2 portraits | ✅ have |
| Logo | CS AUMC seal PNG | ✅ in use |
| Corridor (clean) | — | ❌ pending from Asad or illustrate |
| Convocation | — | ❌ will illustrate |
| Corporate office | — | ❌ will illustrate |

Note: puddle/greenery cleanup on photos = pending (v0.2+); v0.1 uses mild contrast/color enhancement only.

## Supabase (planned, not yet wired — v0.3)
- Table `inquiries`: id, created_at, name, email, phone, city, program (enum of 5), background, message
- RLS: anon INSERT only, no SELECT. Reading via Supabase dashboard (admin page deferred).

## Roadmap
- **v0.1** ✅ Hero + Scene 1 (gate) + character walk cycle + scroll engine + this file
- **v0.2** All journey scenes with photo treatment & scene transitions; character pose variants (sitting in class, typing in lab, gown for convocation)
- **v0.3** Post-journey sections: Programs, Why CS@AUMC, Faculty horizontal scroller, Supabase inquiry form, Footer
- **v0.4** Polish: preloader, mobile tuning, SEO/OG tags, photo retouch (puddles), performance pass
- **v0.5** Deploy to Vercel + Supabase live; admin page later (separate minor)

---

## Changelog

### v0.2.1 — 2026-07-04
- **Fix:** scene photos now use real `<img>` elements (object-fit cover) instead of CSS custom-property backgrounds — the var()-in-shorthand approach rendered as flat color in production
- **Walkthrough feel:** continuous cross-fade between scenes with push-through zoom (scene keeps scaling as it exits, like walking past it) + directional pan per scene
- Constant Ken Burns drift on every photo (14–17s alternating) so scenes are alive even when scroll pauses
- Cinematic vignette + film grain overlay on the journey viewport
- Captions now trigger at scene center (is-focus) instead of binary active state; all images force-warmed after load

### v0.2.0 — 2026-07-04
- **Direction change (Asad):** dropped SVG dummy character; journey is now first-person cinematic — visitor experiences the walk through the student's own eyes. Real character (photoshoot / AI-generated stills, centered, world moving behind) planned once Asad supplies imagery.
- 8 pinned scenes: Gate → Walkway → CS Block → Classroom → Lab → FYP → Convocation → Career
- Six scenes use real photos (corrected mapping: gate=IMG_8523, walkway=IMG_8527, building=IMG_6912_3, classroom=IMG_6721, lab=IMG_6778, FYP=IMG_6764) with camera pan direction per scene (data-pan) + slow push-in (Ken Burns) + crossfades
- Convocation & Career are designed panels (gold light rays + rising particles; teal perspective grid + role chips) — swap for real photos when available
- Programs teaser section with 5 degree chips; scene image preloading; v0.1 asset misidentification fixed (old scene-gate.webp was actually a classroom photo)

### v0.1 — 2026-07-04
- Project scaffold: index.html, css/styles.css, js/main.js, assets/
- Hero: logo, department title, tagline, animated scroll cue
- Scroll engine: pinned 300vh journey section, progress-driven (rAF, no libs)
- Scene 1 (Gate): treated photo bg with navy gradient overlay, parallax
- SVG character v1: Pakistani male student, sky-blue tucked-in shirt, grey trousers, backpack; CSS walk cycle (legs/arms swing) whose play state + speed follow scroll velocity; walks left→right with subtle bob
- Scene caption system (fade/slide per scene)
- Reduced-motion respected; mobile responsive baseline
