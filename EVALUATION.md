# Evaluation

## Applied workflows
- makefun-bounties/SKILL.md and references/hermes-routing.md, competitive-quality.md, game-entries.md: full rules read, upload-mode provenance, per-entry lock, exact output comparison, screenshot constraints, no submission.
- software-development/systematic-debugging/SKILL.md: isolated the server's broad catch and tested normal, missing, malformed and HEAD requests.
- engineering/browser-testing-with-devtools/SKILL.md: actual Chrome input, read-only state observation, resource inspection and viewport measurements.

## Verified results
- Default URL, no shot parameters or game-state overrides: input-only route completed gardens 1–5, collected all 30 fruit, won with 10,000 points and two hearts. Evidence: evaluation/best-game-01-neon-orchard/foreground-play.json outside this repository. Earlier routes lost naturally in garden three; loss/retry verified.
- Screenshots are real browser renders at 1280×720. Cover is actual garden-two play, title is default startup, victory is actual five-garden completion. Existing optional shot hooks are supplemental only and are not deterministic simulation tests.
- Enter starts/restarts, arrow movement and Space dash operate, M changes muted state. Blur clears held movement keys.
- CTA measured widths 367.34, 367.96 and 430.43 pixels fit the corrected 490-pixel button.
- Layouts 1280×720, 1024×768, 800×600 and 390×844 have no page overflow. Mobile is scaled display only; the competition requires keyboard/mouse desktop play.
- All seven game resources returned 200 with no external asset requests. Error-event capture reported none; exhaustive DevTools console-warning collection was not available.
- Fixed preview passed GET /, HEAD /, GET /missing (404), malformed escape (400), JS asset and another GET / without exiting. Prior headers-sent crash did not reproduce; the broad catch that could send a second header response was removed.
- Node 26.12.1 host output runs matched byte-for-byte across all 11 files. This is host validation, not the sealed server grade or Node 22 container run.

## Remaining uncertainty
- Image-analysis service timed out repeatedly, so independent visual review is incomplete; canvas geometry and screenshot bytes were checked instead.
- No submission or ranking exists. Rank 1/top 10 competitiveness is unproven. Current account status: zero entries, can submit yes, daily 3/3; status hard limit reports 20 while RULES says 10, so parent must reconcile latest server rules before signing.
- Harness reports Hermes Agent v0.23.1, model hermes, provider custom. No underlying provider identity is invented. Parent must resolve any run-record metadata warning before submission.
- Bundle/check logs and runtime evidence live in /home/ubuntu/makefun/evaluation/best-game-01-neon-orchard, outside the shipped snapshot.
