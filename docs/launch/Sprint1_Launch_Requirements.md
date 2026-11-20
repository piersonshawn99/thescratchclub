# The Scratch Club — Sprint 1 Launch Foundation
Status: READ-ONLY ASSESSMENT COMPLETE; IMPLEMENTATION PENDING
Branch: feature/launch-foundation
Production changes: prohibited without explicit owner approval

## Objective
Position The Scratch Club as a private golf improvement club: **The Pursuit of Better Golf.** Primary tagline: **Practice With Purpose. Play With Confidence.** Prioritize membership conversion and a reliable Trackman handoff.

## Verified source findings (main branch, November 2026)
- Next.js 14.2.5, React 18.3.1, Tailwind 3.4.10, pnpm 10.20.0.
- `components/memberships/MembershipsClient.tsx` contains legacy Off-Peak/Standard/VIP presentation, quiz and savings calculator.
- `app/api/checkout/route.ts` creates Stripe subscriptions for legacy plan IDs; it must not be used for new Trackman membership CTAs. Preserve it until separately approved for retirement.
- `components/links.ts` points bookNow to a general Trackman portal URL, not a verified club-specific purchase URL.
- `app/layout.tsx` defaults to thescratchclub.com and legacy metadata.
- `components/Header.tsx` and `components/Footer.tsx` reference an older golfer-logo image; footer includes walk-in/member hours and legacy indoor-golf positioning.
- `styles/globals.css` includes emerald pulse/header animation; `tailwind.config.ts` has no central brand palette.
- `package.json` contains Playwright e2e test script and `next lint` script; test/build success not yet verified.
- `docs/brand/Brand_Guide.md` and `docs/brand/README.md` were not found on main at inspection time. Confirm approved logo assets and documentation on the implementation branch before replacing imagery.

## Locked commercial information
| Plan | Positioning | Commitment monthly | Flexible monthly |
| --- | --- | ---: | ---: |
| Player | Play More. Stay Sharp. | $129 | $139 |
| Performance | Practice With Purpose. | $239 | $249 |
| Pursuit | For Those Who Live the Game. | $369 | $379 |

Commitment choices: 3, 6, 12 months. Performance is Most Popular. Do not invent included hours, privileges, commitment incentives, or automatic billing terms.

## Implementation requirements
1. Create centralized typed membership configuration for approved plan names, prices, commitment options, and future Trackman destinations. Ensure displayed terms are accurate and do not imply an unverified discount.
2. Redesign /memberships for a clear decision path: plan identity → monthly price → join/inquire; put detailed comparison after primary choices. Remove quiz and savings calculator from the rendered experience. Keep undecided Founders Club offer out of new public presentation; preserve existing code until owner decision.
3. Implement a brand token system (initial green #143029, gold #DBB158; cream and typography pending final approval). Use approved vertical logos; do not recreate logo artwork. Remove gratuitous emerald animation and respect reduced motion.
4. Update homepage value proposition, navigation, footer and metadata with private-club language. Canonical site domain: https://scratchclubgolf.com. Verify current hours and address before publication.
5. Create /gift-cards with the headline 'Give the Gift of Better Golf.' Separate monetary gift cards from experience vouchers. Trackman is the intended commerce/redemption platform. Do not claim Trackman capabilities until verified; no custom checkout or invented links.
6. Centralize Trackman links, distinguishing booking, membership purchases and gift-card purchases. Where unverified, provide a clearly labeled contact/inquiry action; never point a 'Buy' or 'Join Now' CTA at an unverified checkout.
7. Preserve unrelated routes, lead forms, analytics and existing production integrations. Avoid destructive migrations.

## Blocking owner/provider confirmations
- Exact Trackman club-specific booking, membership purchase and gift-card/voucher links; verify actual supported workflows.
- Membership included benefits, usage allowances and guest privileges.
- Six- and twelve-month commitment incentives.
- Whether Founders Club offer remains available.
- Confirm opening date, hours, address and contact information.
- Confirm approved vertical logo asset paths and master brand guide.

## QA and acceptance
- Changes occur only on feature/launch-foundation; no main merge or production deployment.
- Build and applicable lint/typecheck/tests pass; report any pre-existing failures separately.
- Mobile/tablet/desktop and keyboard/accessibility review.
- No public-facing Off-Peak/Standard/VIP membership names or old prices.
- All CTA destinations are verified; no broken internal routes or fake Trackman links.
- Stripe legacy checkout is not linked from new memberships.
- Provide changed-file list, preview link if available, test output and remaining blockers for approval.

## Execution sequence
A. Confirm brand assets and provider URLs; audit existing page dependencies and route references.
B. Implement membership configuration and page on feature branch.
C. Implement brand tokens and homepage/header/footer updates.
D. Implement gift-card landing page with safe handoff states.
E. Run tests and open a **draft** pull request for owner review. Do not merge.
