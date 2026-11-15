# YUIUNI Accounting Fee Compare

無料の法人会計費用比較ツール。月額×請求月数＋決算料＋必要な追加業務を計算します。
A free local calculator for comparing bookkeeping and closing quotes over the same period.

- Japanese and English interface; no sign-up, backend, telemetry or browser permissions.
- Figures are neither stored nor sent. External links do not contain input amounts.
- Only presents a difference when the user confirms comparable scope and the billed periods match.
- Not a tax calculator, formal quote, independent provider ranking or claim of market-lowest pricing.
- Made by YUIUNI (operated by 株式会社 AIRAX). The connection is disclosed, not an independent recommendation.

## Run the web version

Serve this directory using a local HTTP server and open `index.html`. No build or dependencies.

```sh
python3 -m http.server 8190 --bind 127.0.0.1
node --test compare.test.mjs
```

## Load as an unpacked Chrome extension

Open `chrome://extensions`, enable Developer mode, choose Load unpacked, and select this directory.
The toolbar popup runs the same calculator. No page reading, host permissions, service worker or remote code.
This repository is not a claim that Chrome Web Store review or listing has been completed.

## Data and formulas

This calculator contains no copied competitor quotes or automatically selected YUIUNI prices. Users enter their own estimates. The sample numbers in tests are arithmetic fixtures, not estimates for a customer. `quote-comparison-template.csv` is a blank reusable spreadsheet template with formulas.

For the actual current service scope and prices, visit [YUIUNI pricing](https://yuiuni.co.jp/ja/pricing/). Corporate annual-only closing includes the covered year's bookkeeping preparation; ongoing advisory is a different scope. Confirm each quote before comparing it.

## Privacy and support

Read [privacy.html](privacy.html). Questions: [YUIUNI contact](https://yuiuni.co.jp/ja/consultation/).

Licensed under MIT. No customer information is included.
