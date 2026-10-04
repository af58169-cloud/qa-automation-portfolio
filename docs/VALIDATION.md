# Initial verification

Verified against the live public demo sites on **October 4, 2026**.

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm test` | 37 passed in 53.4 seconds, no retries |
| Chromium browser scenarios | 17 passed |
| Firefox browser scenarios | 17 passed |
| Automation Exercise API scenarios | 3 passed |
| `npm run screenshots` | Catalog and simulated order confirmation captured and visually inspected |
| Dependency audit at installation | 0 vulnerabilities reported |

Environment: Windows, Node.js 24.11.1, Playwright 1.63.0, TypeScript 5.9.3, Chromium 153.0.8010.12, Firefox 155.0. The committed lockfile records exact dependency versions.

The initial attempt started before Firefox finished downloading and could not launch Firefox. After installation completed, the complete suite was rerun and all 37 executions passed. The final HTML report reflects that successful run.

The local HTML report is available in `playwright-report/` via `npm run report`. Generated reports are excluded from source control. This record captures one run, not a guarantee of future availability or a historical pass rate. Failure attachments are configured but the final passing run does not retain screenshots/videos/traces. GitHub-hosted CI has not run yet; it will run after the repository is published.
