# 既存コンテンツの不具合・修正待ち一覧

React 移行時に引き継いだ不具合を、後日修正するための一覧です。
2026-10-12 に現行の `dist/` とソースを照合しました。
2026-10-13 に L1〜L4、2026-10-14 に L5〜L10 を対応しました。
2026-10-14 に E1 と R1〜R5 の解消も確認しました。
各項目の症状・欠落先は初回確認時の記録で、対応内容を併記しています。外部サービスの確認待ちは引き続き残しています。

## 初回確認の範囲と件数（2026-10-12）

| 分類 | 件数 | 確認したこと |
| --- | --- | --- |
| サイト内の参照切れ | 19ページ・60箇所、宛先23種類 | HTML の `href` / `src` / `data-src` の宛先が静的出力に存在しない。移行前からの60箇所と一致 |
| 埋め込み初期化エラー | 40ページ・60要素 | iframe は存在するが、外側の `.ui.embed` に Fomantic 用の URL 設定がない。移行時の `No URL specified` 60件に対応 |
| 外部への旧リダイレクト | 入口5ルート・最終宛先3種類 | 移行時に到達不能／証明書エラーが報告された。今回は外部の到達性を再検証していない |

「60箇所の参照切れ」と「60件の埋め込みエラー」は別の集計です。
同じ宛先でも、複数ページ・複数リンクから参照されれば別の箇所として数えています。
ページ内アンカーの有効性や、一般の外部リンクすべての到達性を調べた一覧ではありません。

### L1〜L4 対応後の確認（2026-10-13）

ビルド後の `dist/` でサイト内参照を再集計し、参照切れは **12ページ・48箇所、宛先19種類** に減少しました。
初回の60箇所から、L1の3箇所、L2の3箇所、L3の2箇所、L4の4箇所が解消しています。
L3の外部URLの誤記修正は、このサイト内参照の集計とは別です。
L4の出力PDFは復旧されたソースとバイト単位で一致します。

### L5〜L10 対応後の確認（2026-10-14）

ビルド後の `dist/` 全体でサイト内参照を再集計し、**参照切れは48箇所から0箇所** になりました。
旧VPSから回収したCSS5ファイル、国旗画像2ファイル、フォント5ファイルは、取得内容・`src/`・`dist/` の間でバイト単位の一致を確認しています。
復元CSS内の `url(...)` が参照するローカルファイルもすべて存在します。
追加の目視確認では、1440×900と390×844のスクリーンショットで、Fun、旧講演2ページ、TextAlive APIテスト（6）、UGVの曲リンクとサムネイルの表示を確認しました。
日本語フォントを備えた確認用ブラウザを使用し、外部ウィジェット通信は停止しています。旧スライドはスマートフォンでは全体を縮小表示するため、文字が小さくなる状態は残っています。
この集計は外部サービスの到達性や、旧UGVデモの操作機能を保証するものではありません。

### 講演全章・UGV復元後の追加確認（2026-10-14）

復元した `/ja/talks/people-are-programmers/p2.html` からの `/publications/spro2014-kato-live-condensed.pdf` が欠落していました。旧VPSの `~/www/jk_old/publications/` に原本が残っていたため、[同PDF](../src/publications/spro2014-kato-live-condensed.pdf)を復旧しました。

静的ビルド後、全296 HTMLページ・23,335箇所のサイト内参照を再集計し、**参照切れは0箇所** です。原本・`src/`・`public/`・`out/`・`dist/` のPDFはSHA-256が一致し、プレビュー配信でも第2章とPDFのHTTP 200、PDFのContent-Typeと内容の一致を確認しました。

## 1. 現行ページのリンク切れ

### L1. 【対応済み】in-the-wild の日本語切り替え先が `/ja/undefined`（3箇所）

- **場所:** `/in-the-wild/` のヘッダー、サイドバー、フッターにある日本語切り替えリンク。
- **症状:** いずれも `/ja/undefined` に進み、該当ページがない。
- **原因:** [ページ本体](../pages/in-the-wild/index.tsx)で `me` を宣言したまま値を設定していない。[共通レイアウト](../site/components/SiteLayout.tsx)の `alternateLanguageHref` が、その値から言語切り替え先を組み立てている。
- **対応（2026-10-13）:** [言語切り替え先の判定](../site/navigation.ts)でページ識別子が未定義、または対応するコンテンツページが存在しない場合は切り替えを表示しない。[共通レイアウト](../site/components/SiteLayout.tsx)のヘッダー・サイドバー・フッターすべてに適用。ホームページの識別子 `""` は有効として扱い、英日切り替えを維持する。

### L2. 【対応済み】2010年の活動履歴から存在しない英語版に切り替わる（3箇所）

- **場所:** `/ja/timeline/2010/` のヘッダー、サイドバー、フッターの English リンク。
- **宛先:** `/timeline/2010/`。
- **症状:** 英語版の2010年ページがなく、リンク先を表示できない。
- **原因:** [日本語版の年別ページ](../pages/ja/timeline/[year].tsx)は2010年から生成する一方、[英語版](../pages/timeline/[year].tsx)の `getStaticPaths` は2011年から。共通レイアウトは対応する英語版がある前提でリンクを作る。
- **対応（2026-10-13）:** L1 と共通の判定で、英語版のない2010年ページではヘッダー・サイドバー・フッターの切り替えを表示しない。2011年以降など対応ページがある場合は引き続き表示する。

### L3. 【対応済み】ACM CHI 2015 のブログ記事が旧URLのまま（2箇所）

- **場所:** `/ja/timeline/2015/` と `/ja/timeline/` にある、2015年の Japanese HCI Symposium の報告文中の「ブログ記事」。
- **宛先:** `/ja/blog/2015/5/3/acm-chi2015-japan/`。
- **症状:** 静的出力にそのパスのページ／リダイレクトがない。
- **修正元:** [活動履歴データ](../src/data/histories.json)の、この旧URLを含む `text`。
- **対応（2026-10-13）:** 正しいURL `https://blog.junkato.jp/ja/posts/2015-05-03-acm-chi2015-japan/` に変更。別の報告にあった月日がゼロ埋めされていないURLも修正し、活動履歴データ内の2エントリを統一した。初回の2箇所という集計には、この外部URLの誤記は含まれていなかった。

### L4. 【対応済み】f3.js のインタラクション2016発表スライドPDFがない（4箇所）

- **場所:** `/ja/f3js/`、`/ja/publications/`、`/ja/timeline/2016/`、`/ja/timeline/` の該当発表のスライドリンク。
- **宛先:** `https://junkato.jp/publications/interaction2016-kato-f3js-slides.pdf`。
- **症状:** ホスト名付きURLだが、このサイト内のPDFを参照している。該当ファイルが静的出力にない。
- **修正元:** [BibTeX](../src/junkato.bib)の `interaction2016-kato-f3js` エントリの `slides` フィールド。
- **対応（2026-10-13）:** [interaction2016-kato-f3js-slides.pdf](../src/publications/interaction2016-kato-f3js-slides.pdf) を復旧。既存のBibTeXの宛先を維持し、ビルド時に `public/publications/` → `dist/publications/` へコピーする。

## 2. 保存された旧HTMLの参照切れ

以下は `src/` に保存されたHTMLが、そのまま `public/` → `dist/` にコピーされるページです。
修正する場合は、生成物ではなく表の `src/` のファイルを編集します。

### L5. 【対応済み】旧共通CSSが欠落（22箇所）

次の11ページすべてが、存在しない `/css/bootstrap.min.css` と `/css/main.css` を各1回参照しています。
CSSを取得できず、当時のレイアウトや装飾が再現できない原因になります。

| 対象ページ | 修正元 |
| --- | --- |
| `/fun/` | [src/fun/index.html](../src/fun/index.html) |
| `/ja/fun/` | [src/ja/fun/index.html](../src/ja/fun/index.html) |
| `/ja/talks/as-a-code.old/` | [src/ja/talks/as-a-code.old/index.html](../src/ja/talks/as-a-code.old/index.html) |
| `/ja/talks/people-are-programmers.old/` | [src/ja/talks/people-are-programmers.old/index.html](../src/ja/talks/people-are-programmers.old/index.html) |
| `/textalive/embed/api/` | [src/textalive/embed/api/index.html](../src/textalive/embed/api/index.html) |
| `/textalive/embed/api/embed-1.html` | [embed-1.html](../src/textalive/embed/api/embed-1.html) |
| `/textalive/embed/api/embed-2.html` | [embed-2.html](../src/textalive/embed/api/embed-2.html) |
| `/textalive/embed/api/embed-3.html` | [embed-3.html](../src/textalive/embed/api/embed-3.html) |
| `/textalive/embed/api/embed-4.html` | [embed-4.html](../src/textalive/embed/api/embed-4.html) |
| `/textalive/embed/api/embed-5.html` | [embed-5.html](../src/textalive/embed/api/embed-5.html) |
| `/textalive/embed/api/embed-6.html` | [embed-6.html](../src/textalive/embed/api/embed-6.html) |

**対応（2026-10-14）:** `ssh dm` で参照できる旧サイトルート `~/www/jk_old` から `css/bootstrap.min.css` と `css/main.css` を回収し、同じパスの `src/css/` に復元。旧共通CSSが参照する `css/jp.png`・`css/us.png` と、Bootstrapが参照する `fonts/glyphicons-halflings-regular.{eot,woff2,woff,ttf,svg}` も復元した。現行React版の `/stylesheets/main.css` とは独立した、当時の個別CSSを使用する。

### L6. 【対応済み】旧スライダー用CSSが欠落（3箇所）

| 対象ページ | 存在しない宛先 | 箇所数 |
| --- | --- | ---: |
| `/ja/talks/as-a-code.old/` | `/talks/as-a-code/rangeslider.css` | 1 |
| `/ja/talks/people-are-programmers.old/` | `/talks/people-are-programmers/rangeslider.css` | 1 |
| `/textalive/embed/api/embed-6.html` | `/talks/people-are-programmers/rangeslider.css` | 1 |

**症状:** スライダーのCSSを取得できない。修正元は L5 の対応するHTML。
**対応（2026-10-14）:** 旧VPSの `talks/as-a-code/rangeslider.css` と `talks/people-are-programmers/rangeslider.css` を、それぞれ同じパスの `src/` 以下に復元。TextAliveの `embed-6.html` も既存の参照先で読み込める。

### L7. 【対応済み】TextAlive APIサンプルの構文強調CSSが欠落（7箇所）

- **場所:** `/textalive/embed/api/` と `embed-1.html`〜`embed-6.html`。
- **参照:** 各HTMLの `href="prism.css"`。解決先は `/textalive/embed/api/prism.css`。
- **症状:** サンプルコードの構文強調用CSSを取得できない。
- **修正元:** L5 の TextAlive API 関連7ファイル。
- **対応（2026-10-14）:** 旧VPSの `textalive/embed/api/prism.css` を `src/textalive/embed/api/prism.css` に復元。各HTMLの相対参照は維持した。

### L8. 【対応済み】旧講演ページの英語切り替え先がない（4箇所）

| 対象ページ | 存在しない宛先 | 箇所数・場所 |
| --- | --- | --- |
| `/ja/talks/as-a-code.old/` | `/talks/as-a-code/` | 2：上部メニュー、フッターの English |
| `/ja/talks/people-are-programmers.old/` | `/talks/people-are-programmers/` | 2：上部メニュー、フッターの English |

**修正元:** L5 の対応する講演HTML。
**対応（2026-10-14）:** 英語版がない両ページで、上部メニューとフッターの English リンクを削除。リンク削除後の空のメニュー項目も除去した。

### L9. 【対応済み】people-are-programmers の画像パスが保存先とずれている（10箇所）

- **場所・修正元:** [src/ja/talks/people-are-programmers.old/index.html](../src/ja/talks/people-are-programmers.old/index.html)。
- **存在しない宛先:** `/talks/people-are-programmers/P9206331-trim.jpg` と、`/talks/people-are-programmers/slides/wakate2015-kato-slides-01.jpg`〜`wakate2015-kato-slides-09.jpg`（01, 02, 03, 04, 05, 06, 07, 08, 09 の9枚）。
- **症状:** 写真1枚とスライド画像9枚を取得できない。
- **対応（2026-10-14）:** 10枚すべての `src` を `/ja/talks/people-are-programmers.old/` 以下の実際の保存先に変更した。

### L10. 【対応済み】User-Generated Variables の旧デモ・サムネイルがない（2箇所）

**場所・修正元:** [src/user-generated-variables.old/index.html](../src/user-generated-variables.old/index.html)。

| 要素 | 存在しない宛先 | 症状・修正の手がかり |
| --- | --- | --- |
| 遅延読み込みiframeの `data-src` | `/videos/new?song=staff.aist.go.jp%2Fm.goto%2FRWC-MDB%2FMP3%2FRWC-MDB-P-2001.No.087.mp3&style=pop&skipProposalCommit=true&skipTutorial=true&tutorial=true&ugv=true&fontSize=16` | 旧TextAliveのデモをこのサイトの `/videos/new` で開こうとするが、ページもサーバー側機能もない。デモの現在の所在とクエリ互換性を確認する |
| 画像の `src` | `http://junkato.jp/thumbnails/live-tuning.jpg` | 画像ファイルがない。`src/images/thumbnails/live-tuning.png` は存在するが、同じ画像として差し替えてよいか確認する。HTTP参照も見直す |

**対応（2026-10-14）:** 旧TextAliveデモの遅延iframe用要素を、[当該曲をTextAliveで開くリンク](https://textalive.jp/songs/staff.aist.go.jp%2Fm.goto%2FRWC-MDB%2FMP3%2FRWC-MDB-P-2001.No.087.mp3)に置き換えた。現行の `/songs/{songPath}` の実装はローカルの `~/Source/textalive-client-app/pages/songs/[songPath].tsx` を参照し、公開ページのHTTP 200と曲名「I think of you」のデータを確認した。

初回一覧では `data-src` をサイト内相対参照として集計したが、実際の旧スクリプト `js/vendor/px17.js` は既定で `http://textalive.jp` を前置していた。今回、その旧 `/videos/new` 導線を現行の曲ページへの通常リンクに更新した。

旧デモにあったUGVの変数提案・コード更新の操作は再実装していない。再現する場合は `textalive-api` 等を使う別の実装作業が必要で、private registryの認証情報を `TEXTALIVE_NPM_TOKEN` のようなGitHub Actions secretとして用意し、ビルド工程の認証設定を追加する。今回のリンク化にはprivateパッケージを使用せず、認証情報やActions設定を追加していない。

サムネイルは `/images/thumbnails/live-tuning.png` に変更し、このサイトに保存されている画像を使用する。

## 3. 【対応済み】埋め込みの初期化エラー

### E1. 【対応済み】iframeを持つ `.ui.embed` にFomanticのURL設定がない（40ページ・60要素）

移行レポートの「empty-embed console errors」は、初回確認時の次の状態を指しています。

- HTMLには `<div class="ui embed"><iframe src="…"></iframe></div>` があった。
- [initializeLibrary](../src/javascripts/views/library.ts) が `$("#body .ui.embed").embed()` で一括初期化していた。
- 外側の `div` に `data-url` や `data-source` / `data-id` がないため、[Fomanticのembed実装](../semantic/src/definitions/modules/embed.js)は既存iframeとは別に空の `.embed` 要素を追加し、`Embed: No URL specified` を出していた。

初回に照合した60要素には、すべて `src` のあるiframeが入っていました。
**動画やスライドのURLが空という意味ではなく、初期化方法の不整合です。**
各外部サービスで今も再生・表示できるかは別の確認事項で、このエラーだけでは判断できません。

**対応:** `02405a0`（`perf: render scoped page data and native React widgets`）で、[Embed](../site/components/SiteWidgets.tsx) をReactコンポーネントに置き換えた。既存iframeはそのまま表示し、`data-url` のあるPDF等だけをクリック時に生成する。[SiteRuntime](../site/components/SiteRuntime.tsx) は旧 `initializeLibrary` を呼ばないため、現行ReactページではFomanticの一括初期化による不整合が発生しない。

**検証（2026-10-14）:** 表にある全40ページ・60要素を静的出力のブラウザーで再確認。`No URL specified` は0件、既存iframeの横に追加される空の `.embed` 要素も0件。英日両方のVisionSketchページでは、PDFのクリック前にiframeがないこと、クリック後に正しいURLのiframeが1つ生成されることも確認した。外部サービスへの通信は遮断しており、各サービス側の再生・表示の可否はこの確認に含めない。

次の表で **英語版は `/<パス>/`、日本語版は `/ja/<パス>/`** です。
「英／日」はそれぞれのページの初回確認時の対象要素数。リンク先は各ページの編集元で、合わせて40ページ・60要素を網羅します。

| パス | 英／日 | 該当する埋め込み（動画ID等） | 修正元 |
| --- | --- | --- | --- |
| `dejavu` | 1/1 | `k5USoB7ZPPk` | [英](../pages/dejavu/index.tsx)・[日](../pages/ja/dejavu/index.tsx) |
| `deployground` | 1/1 | `dE6mCZVWIms` | [英](../pages/deployground/index.tsx)・[日](../pages/ja/deployground/index.tsx) |
| `f3js` | 2/2 | `BwPXXjfUUVw`、`YouTube再生リスト: PLb6OjFoBksmvYwbJqt8Z30LS72LkPrPJb` | [英](../pages/f3js/index.tsx)・[日](../pages/ja/f3js/index.tsx) |
| `griffith` | 2/2 | `rlJ1Fe53Lw8`、`RWdw9rDRf7A` | [英](../pages/griffith/index.tsx)・[日](../pages/ja/griffith/index.tsx) |
| `homehack/fungus-camera` | 2/2 | `6etDXqnFnSM`、`rFeTAwY_d_Y` | [英](../pages/homehack/fungus-camera/index.tsx)・[日](../pages/ja/homehack/fungus-camera/index.tsx) |
| `homehack` | 1/1 | `SlideShare: 38527331` | [英](../pages/homehack/index.tsx)・[日](../pages/ja/homehack/index.tsx) |
| `homehack/realmote` | 1/1 | `bhbW39zoxyg` | [英](../pages/homehack/realmote/index.tsx)・[日](../pages/ja/homehack/realmote/index.tsx) |
| `homehack/rhythm-kaden` | 1/1 | `Wu3OLxEmeww` | [英](../pages/homehack/rhythm-kaden/index.tsx)・[日](../pages/ja/homehack/rhythm-kaden/index.tsx) |
| `lyric-app-framework` | 2/4 | `7XpDPghxdCE`、`sX4Cdcljqd0`。日本語版のみ追加: `tBBcweuGdrc (start=2061)`、`yTS5600B4pg` | [英](../pages/lyric-app-framework/index.tsx)・[日](../pages/ja/lyric-app-framework/index.tsx) |
| `multirobot` | 1/1 | `zGioJvhsoIY` | [英](../pages/multirobot/index.tsx)・[日](../pages/ja/multirobot/index.tsx) |
| `openpool` | 3/3 | `Facebook: 608850275796418`、`Facebook: 614971478517631`、`Facebook: 615808058433973` | [英](../pages/openpool/index.tsx)・[日](../pages/ja/openpool/index.tsx) |
| `phybots` | 1/1 | `YouTube再生リスト: PL5EC9CECDDBEA183A` | [英](../pages/phybots/index.tsx)・[日](../pages/ja/phybots/index.tsx) |
| `picode` | 1/1 | `NCou4Q1STE8` | [英](../pages/picode/index.tsx)・[日](../pages/ja/picode/index.tsx) |
| `programming-as-communication` | 1/1 | `qR2MAfRFBIM (cc_lang_pref=en&cc_load_policy=1)` | [英](../pages/programming-as-communication/index.tsx)・[日](../pages/ja/programming-as-communication/index.tsx) |
| `sharedo` | 1/1 | `HxEUgOSwTeM` | [英](../pages/sharedo/index.tsx)・[日](../pages/ja/sharedo/index.tsx) |
| `songle-sync` | 1/1 | `dErV9oZw_uQ` | [英](../pages/songle-sync/index.tsx)・[日](../pages/ja/songle-sync/index.tsx) |
| `surfboard` | 1/1 | `QKtzsOU-sA8` | [英](../pages/surfboard/index.tsx)・[日](../pages/ja/surfboard/index.tsx) |
| `textalive` | 3/3 | `lOdt-pf5U8Q`、`YouTube再生リスト: PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo`、`ofczPQZaWMk` | [英](../pages/textalive/index.tsx)・[日](../pages/ja/textalive/index.tsx) |
| `touchdevelop` | 2/2 | `GaVbYx-NN0o`、`D1UB73y4GGo` | [英](../pages/touchdevelop/index.tsx)・[日](../pages/ja/touchdevelop/index.tsx) |
| `visionsketch` | 1/1 | `I6FTOVygHxc` | [英](../pages/visionsketch/index.tsx)・[日](../pages/ja/visionsketch/index.tsx) |

## 4. 【対応済み】外部サーバーへのリダイレクト（5入口）

移行時のブラウザ検証（2026-10-11）では、以下の5入口が外部の到達不能／証明書エラーにつながると報告されていた。2026-10-14、保存されていたコンテンツを復旧し、すべて現行サイト内で表示または案内できるようにした。

| ID | 入口 | 現在の動作 | 編集元 |
| --- | --- | --- | --- |
| R1 | `/ja/talks/as-a-code/` | 旧VPSのPHPから復元した全3章のReactページを表示 | [pages/ja/talks/as-a-code/index.tsx](../pages/ja/talks/as-a-code/index.tsx) |
| R2 | `/ja/talks/people-are-programmers/` | 旧VPSのPHPから復元した全3章のReactページを表示 | [pages/ja/talks/people-are-programmers/index.tsx](../pages/ja/talks/people-are-programmers/index.tsx) |
| R3 | `/user-generated-variables/` | 保存済みのPX/17発表スライドを元のReveal.js形式で直接表示 | [src/user-generated-variables/index.html](../src/user-generated-variables/index.html) |
| R4 | `/ja/user-generated-variables/` | 英語資料 `/user-generated-variables/` へサイト内転送 | [pages/ja/user-generated-variables/index.tsx](../pages/ja/user-generated-variables/index.tsx) |
| R5 | `/ugv/` | 省略URLから `/user-generated-variables/` へサイト内転送 | [pages/ugv/index.tsx](../pages/ugv/index.tsx) |

R1・R2のBootstrapはFomantic UIに置き換えた。章URL、旧 `.old/` 入口、コード実行デモ、TextAlive APIデモの残作業は [TALK_MIGRATION.md](TALK_MIGRATION.md) を参照。

R3は独立したスライド資料として、元の表示・キーボード操作・コード例の詳細表示を保つ。スタイル・フォント・スクリプトは保存済みの `/user-generated-variables.old/` 以下の資産を利用する。依存スクリプトのパスを絶対パスにし、WebフォントのHTTP参照をHTTPSへ変更した。f3.jsの旧HTTP iframeは通常リンクに替え、L10で更新したTextAliveの曲リンクも引き継ぐ。これらの外部デモの操作は再実装していない。

プロジェクト一覧のUGVリンクも外部サーバーから `/user-generated-variables/` に変更した。`/user-generated-variables.old/` の旧入口は現行資料へ転送する。開発サーバーには静的HTMLへのrewriteを設け、静的ホスティングと同じURLで表示する。

**検証:** 静的ビルドと `npm test` が通過。PC・スマートフォンの [UGVブラウザーテスト6件](../tests/browser/legacy-presentation.spec.ts) で、全入口、プロジェクト一覧からの文書遷移、スライド送り、ハッシュURL、コード詳細、PDFリンクを確認した。スクリーンショットでも表示を確認し、開発サーバーでも現行URLと旧URLの応答を確認した。

以前の外部遷移先はR1・R2が `http://junkato.digitalmuseum.jp/ja/talks/{slug}`、R3が `http://junkato.digitalmuseum.jp/user-generated-variables`、R4・R5がR3経由の同じ宛先だった。今回の復旧は、その外部サービスの到達性や証明書を修正したものではない。

`/science/` → `/ja/science` と `/user-interface-design/` → `/ja/user-interface-design` は以前からサイト内の案内で、この5入口には含めていない。

## 5. 残っている対応・確認事項

L1〜L10、E1、R1〜R5 は対応済み。以下は保留した操作機能や、これまでの検証に含めていない確認事項です。

| 対象 | 残っていること | 現在の状態 |
| --- | --- | --- |
| [people-are-programmers 第3章](../site/talks/people-are-programmers.tsx) | TextAlive APIデモ3件の時刻指定・花びら枚数・拡大率の操作 | 説明とTextAliveへのリンクを表示。APIの復旧は保留。詳細は [TALK_MIGRATION.md](TALK_MIGRATION.md#textalive-api-の残作業) |
| [UGV発表資料](../src/user-generated-variables/index.html) | TextAliveの変数提案・コード更新と、f3.jsデモのスライド内操作 | TextAliveの曲ページとf3.jsのプロジェクトへのリンクに置換済み。操作機能の再実装は保留 |
| 外部サービス | 1,377 URLの到達性、49 URLの埋め込み表示、旧TextAlive APIサンプル7ページを確認 | 問題のあるURL・掲載ページ・編集元・次の対応を [EXTERNAL_CONTENT_AUDIT.md](EXTERNAL_CONTENT_AUDIT.md) と [CSV](EXTERNAL_LINK_AUDIT.csv) に整理。動画の公開設定、地図URL、旧APIのHTTPS対応など具体的なTODOを記録 |
| ページ内アンカー | 全296 HTMLページのフラグメント付き `href` 2,206箇所を照合 | **対応済み。** 履歴書の論文リンク2種類（2入口・計4箇所）を実在するIDに修正し、再ビルド後の欠落は0箇所。詳細は [EXTERNAL_CONTENT_AUDIT.md](EXTERNAL_CONTENT_AUDIT.md#確認範囲と結果) |

任意の表示改善として、UGVの旧Reveal.jsスライドはスマートフォンでも文字を読みやすくする余地があります。現在は元のレイアウト全体を縮小して表示しています。

## 修正時の再確認

- **参照切れ:** ビルド後の `dist/` を [verify-site.ts](../scripts/verify-site.ts) の `localReferences` / `targetExists` で調べる。比較検証の `existingBrokenUrls` に記録される項目でも、この一覧にある不具合として修正対象にする。欠落を実際に解消した場合、既存の壊れた参照数が減ることを確認する。
- **表示:** `npm run preview` で各対象ページを開く。旧HTMLはCSS・画像の取得とレイアウト、現行ページは言語切り替えと資料リンクを確認する。
- **埋め込み:** E1 の対象ページを開き、コンソールの `Embed: No URL specified`、余分な `.ui.embed > .embed`、動画・スライドの表示を確認する。修正後は英日両方とPDF埋め込みを確認する。
- **外部サービス:** リンク先の欠落、初期化エラー、第三者サービスの到達性を別々に判定する。証明書警告の回避で正常扱いにしない。

移行全体の検証条件は [REACT_MIGRATION.md](REACT_MIGRATION.md)、比較コマンドは [README.md](../README.md) を参照。
