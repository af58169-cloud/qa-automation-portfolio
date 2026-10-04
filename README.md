# QA Automation Portfolio -- playwright + TypeScripts 

A Practical QA Automation Framework

## Test Coverage 

### UI Automation
- Login -- positive and negative scenarios 
- product catalog validation
- Shopping cart add/remove functionality
- cart badge and product validation
- Complete checkout flow
- Checkout from validation
- order totals and tax validation
-checkout cancellation and cart presistence

### API Automation
- Product API validation
- Response/status verification
- API data assertions

## Verified Test Results

| Test Suite | Browser | Result |
|---|---|---|
| UI Automation | Chromium | 17/17 Passed |
| UI Automation | Firefox | 17/17 Passed |
| API Automation | API Project | 3/3 Passed |

**37 successful automated test executions verified locally.**

> Firefox UI validation was executed with one worker for stable browser teardown.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- API Testing
- Chromium
- Firefox
- Git / GitHub
- GitHub Actions
- HTML Test Reports
- Screenshots, video, and traces on failure

## Framework Design

The project separates test logic from page interactions using the **Page Object Model**.

```text
pages/          Page objects and reusable UI interactions
tests/ui/       UI and end-to-end tests
tests/api/      API tests
fixtures.ts     Shared Playwright fixtures
.github/        CI workflow
docs/           Portfolio documentation/screenshots