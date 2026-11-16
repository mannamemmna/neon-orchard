# Evaluation

## Chosen skills

- `makefun-bounties` and `references/competitive-quality.md`: applied the current best-game-01 rules, upload transcript mode, dossier limits, screenshot evidence requirements, and no-submit boundary.
- `makefun-bounties` and `references/game-entries.md`: applied offline static delivery, visible complete loop, readable spawn framing, deterministic shot hooks, and hidden-tab-safe timing.
- `browser-testing-with-devtools`: applied real browser checks for gameplay state, input, console cleanliness, and screenshots.

## Design target

Neon Orchard is an original browser arcade game built for the judge's visible criteria: a clear five-harvest progression, an active risk/reward choice between quick fruit and safe banking, escalating sentry vines, a win screen with restart, a loss screen with retry, a readable HUD, procedural sound with mute, and a distinct dusk orchard palette.

## Evidence plan

- `?shot=start`, `?shot=play`, and `?shot=win` render deterministic screenshot scenes from the game's own code.
- Normal browser play verifies start → movement/dash → collecting → banking → level progression → win or loss → restart.
- `main.ts` is exercised twice with byte comparison of output trees, then kit `check` validates the dossier and references.
