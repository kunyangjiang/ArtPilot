# Phase 4.29 · Text Match Cut homepage intro — CANCELED

**Status: CANCELED (2026-10-30), not released.**

The Product Owner canceled the Text Match Cut intro: its rapid cuts and pacing do not fit ArtPilot's browsing experience.
It is not to be revisited with slower cuts, transitions, re-editing or a replacement animation or loading screen.

- **Removed:** `src/components/home/TextMatchCutIntro.astro`, its import and placement in `src/pages/index.astro`, and the
  four generated assets in `public/media/intro/` (`intro-desktop.mp4`, `intro-mobile.mp4`, `intro-desktop-poster.webp`,
  `intro-mobile-poster.webp`). None of it was ever committed.
- **Kept:** the original videos in `_assets/text-match-cut/` (desktop, mobile, square), still excluded by `.gitignore`.
- The homepage opens directly on the study table, with its entrance animations, as before the phase.
