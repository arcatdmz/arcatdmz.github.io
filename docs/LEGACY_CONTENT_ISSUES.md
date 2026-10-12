# 既存コンテンツの不具合・修正待ち一覧

React 移行時に引き継いだ不具合を、後日修正するための一覧です。
2026-10-12 に現行の `dist/` とソースを照合しました。この文書の追加時点では、コンテンツ自体は修正していません。

## 確認範囲と件数

| 分類 | 件数 | 確認したこと |
| --- | --- | --- |
| サイト内の参照切れ | 19ページ・60箇所、宛先23種類 | HTML の `href` / `src` / `data-src` の宛先が静的出力に存在しない。移行前からの60箇所と一致 |
| 埋め込み初期化エラー | 40ページ・60要素 | iframe は存在するが、外側の `.ui.embed` に Fomantic 用の URL 設定がない。移行時の `No URL specified` 60件に対応 |
| 外部への旧リダイレクト | 入口5ルート・最終宛先3種類 | 移行時に到達不能／証明書エラーが報告された。今回は外部の到達性を再検証していない |

「60箇所の参照切れ」と「60件の埋め込みエラー」は別の集計です。
同じ宛先でも、複数ページ・複数リンクから参照されれば別の箇所として数えています。
ページ内アンカーの有効性や、一般の外部リンクすべての到達性を調べた一覧ではありません。

## 1. 現行ページのリンク切れ

### L1. in-the-wild の日本語切り替え先が `/ja/undefined`（3箇所）

- **場所:** `/in-the-wild/` のヘッダー、サイドバー、フッターにある日本語切り替えリンク。
- **症状:** いずれも `/ja/undefined` に進み、該当ページがない。
- **原因:** [ページ本体](../pages/in-the-wild/index.tsx)で `me` を宣言したまま値を設定していない。[共通レイアウト](../site/components/SiteLayout.tsx)の `alternateLanguageHref` が、その値から言語切り替え先を組み立てている。
- **修正の手がかり:** ページ識別子を設定し、日本語版の作成／英語版への案内／切り替えの非表示のどれにするか決める。`me` の設定だけでは、現在存在しない `/ja/in-the-wild/` の問題は解決しない。

### L2. 2010年の活動履歴から存在しない英語版に切り替わる（3箇所）

- **場所:** `/ja/timeline/2010/` のヘッダー、サイドバー、フッターの English リンク。
- **宛先:** `/timeline/2010/`。
- **症状:** 英語版の2010年ページがなく、リンク先を表示できない。
- **原因:** [日本語版の年別ページ](../pages/ja/timeline/[year].tsx)は2010年から生成する一方、[英語版](../pages/timeline/[year].tsx)の `getStaticPaths` は2011年から。共通レイアウトは対応する英語版がある前提でリンクを作る。
- **修正の手がかり:** 英語版の2010年ページを用意するか、対応ページがない年の言語切り替えを調整する。

### L3. ACM CHI 2015 のブログ記事が旧URLのまま（2箇所）

- **場所:** `/ja/timeline/2015/` と `/ja/timeline/` にある、2015年の Japanese HCI Symposium の報告文中の「ブログ記事」。
- **宛先:** `/ja/blog/2015/5/3/acm-chi2015-japan/`。
- **症状:** 静的出力にそのパスのページ／リダイレクトがない。
- **修正元:** [活動履歴データ](../src/data/histories.json)の、この旧URLを含む `text`。
- **修正の手がかり:** 同じデータの別の報告では `https://blog.junkato.jp/ja/posts/2015-5-3-acm-chi2015-japan/` を使用している。移行先候補として到達性を確認し、直接リンクするか旧URLのリダイレクトを追加する。

### L4. f3.js のインタラクション2016発表スライドPDFがない（4箇所）

- **場所:** `/ja/f3js/`、`/ja/publications/`、`/ja/timeline/2016/`、`/ja/timeline/` の該当発表のスライドリンク。
- **宛先:** `https://junkato.jp/publications/interaction2016-kato-f3js-slides.pdf`。
- **症状:** ホスト名付きURLだが、このサイト内のPDFを参照している。該当ファイルが静的出力にない。
- **修正元:** [BibTeX](../src/junkato.bib)の `interaction2016-kato-f3js` エントリの `slides` フィールド。
- **修正の手がかり:** 当該スライドを探して `src/publications/` に追加するか、正しい宛先に変更する。`dis2017-kato-f3js-slides.pdf` は存在するが別の発表なので、代替と決めつけない。生成された `site/generated/publications.json` や `public/data/publications.json` は修正元ではない。

## 2. 保存された旧HTMLの参照切れ

以下は `src/` に保存されたHTMLが、そのまま `public/` → `dist/` にコピーされるページです。
修正する場合は、生成物ではなく表の `src/` のファイルを編集します。

### L5. 旧共通CSSが欠落（22箇所）

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

**修正の手がかり:** 当時使用していたBootstrapと共通CSSを探して復元する。
現在の `/stylesheets/main.css` は存在するが、旧Bootstrapページと互換とは限らないため、単純な差し替えには表示確認が必要。

### L6. 旧スライダー用CSSが欠落（3箇所）

| 対象ページ | 存在しない宛先 | 箇所数 |
| --- | --- | ---: |
| `/ja/talks/as-a-code.old/` | `/talks/as-a-code/rangeslider.css` | 1 |
| `/ja/talks/people-are-programmers.old/` | `/talks/people-are-programmers/rangeslider.css` | 1 |
| `/textalive/embed/api/embed-6.html` | `/talks/people-are-programmers/rangeslider.css` | 1 |

**症状:** スライダーのCSSを取得できない。修正元は L5 の対応するHTML。
**修正の手がかり:** `src/` 内にも `rangeslider.css` がないので、参照先を変えるだけでは復元できない。当時の依存ファイルの回収が必要。

### L7. TextAlive APIサンプルの構文強調CSSが欠落（7箇所）

- **場所:** `/textalive/embed/api/` と `embed-1.html`〜`embed-6.html`。
- **参照:** 各HTMLの `href="prism.css"`。解決先は `/textalive/embed/api/prism.css`。
- **症状:** サンプルコードの構文強調用CSSを取得できない。
- **修正元:** L5 の TextAlive API 関連7ファイル。
- **修正の手がかり:** 使用していたPrismのテーマを回収し `src/textalive/embed/api/prism.css` に置くか、適切なCSSへの参照に変更する。

### L8. 旧講演ページの英語切り替え先がない（4箇所）

| 対象ページ | 存在しない宛先 | 箇所数・場所 |
| --- | --- | --- |
| `/ja/talks/as-a-code.old/` | `/talks/as-a-code/` | 2：上部メニュー、フッターの English |
| `/ja/talks/people-are-programmers.old/` | `/talks/people-are-programmers/` | 2：上部メニュー、フッターの English |

**修正元:** L5 の対応する講演HTML。
**修正の手がかり:** 英語版の所在を調べるか、日本語の保存版への導線にする。`/ja/talks/…` の現行ルートは外部リダイレクトなので、それを使う場合は後述の R1/R2 も確認する。

### L9. people-are-programmers の画像パスが保存先とずれている（10箇所）

- **場所・修正元:** [src/ja/talks/people-are-programmers.old/index.html](../src/ja/talks/people-are-programmers.old/index.html)。
- **存在しない宛先:** `/talks/people-are-programmers/P9206331-trim.jpg` と、`/talks/people-are-programmers/slides/wakate2015-kato-slides-01.jpg`〜`wakate2015-kato-slides-09.jpg`（01, 02, 03, 04, 05, 06, 07, 08, 09 の9枚）。
- **症状:** 写真1枚とスライド画像9枚を取得できない。
- **修正の手がかり:** これら10ファイルはすべて `src/ja/talks/people-are-programmers.old/` 以下に存在する。保存先に合わせて参照を修正できる候補。

### L10. User-Generated Variables の旧デモ・サムネイルがない（2箇所）

**場所・修正元:** [src/user-generated-variables.old/index.html](../src/user-generated-variables.old/index.html)。

| 要素 | 存在しない宛先 | 症状・修正の手がかり |
| --- | --- | --- |
| 遅延読み込みiframeの `data-src` | `/videos/new?song=staff.aist.go.jp%2Fm.goto%2FRWC-MDB%2FMP3%2FRWC-MDB-P-2001.No.087.mp3&style=pop&skipProposalCommit=true&skipTutorial=true&tutorial=true&ugv=true&fontSize=16` | 旧TextAliveのデモをこのサイトの `/videos/new` で開こうとするが、ページもサーバー側機能もない。デモの現在の所在とクエリ互換性を確認する |
| 画像の `src` | `http://junkato.jp/thumbnails/live-tuning.jpg` | 画像ファイルがない。`src/images/thumbnails/live-tuning.png` は存在するが、同じ画像として差し替えてよいか確認する。HTTP参照も見直す |

## 3. 埋め込みの初期化エラー

### E1. iframeを持つ `.ui.embed` にFomanticのURL設定がない（40ページ・60要素）

移行レポートの「empty-embed console errors」は、正確には次の状態を指しています。

- HTMLには `<div class="ui embed"><iframe src="…"></iframe></div>` がある。
- [initializeLibrary](../src/javascripts/views/library.ts) が `$("#body .ui.embed").embed()` で一括初期化する。
- 外側の `div` に `data-url` や `data-source` / `data-id` がないため、[Fomanticのembed実装](../semantic/src/definitions/modules/embed.js)は既存iframeとは別に空の `.embed` 要素を追加し、`Embed: No URL specified` を出す。

今回照合した60要素には、すべて `src` のあるiframeが入っていました。
**動画やスライドのURLが空という意味ではなく、初期化方法の不整合です。**
各外部サービスで今も再生・表示できるかは別の確認事項で、このエラーだけでは判断できません。

**修正の手がかり:** 既存iframeを持つ要素をFomanticの自動生成対象から外すか、Fomanticの設定を使って生成する形に揃える。
通常のYouTubeは [EmbedYoutube](../site/components/ContentComponents.tsx)、FacebookとSlideShareは各ページに直接書かれたiframeを確認する。
`data-url` を指定したPDFの埋め込みはこの60要素に含まれないので、初期化対象を変える際にはそれらの動作も確認する。

次の表で **英語版は `/<パス>/`、日本語版は `/ja/<パス>/`** です。
「英／日」はそれぞれのページの対象要素数。リンク先は各ページの修正元で、合わせて40ページ・60要素を網羅します。

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

## 4. 外部リダイレクトの確認待ち

移行時のブラウザ検証（2026-10-11）では、次の5入口が外部の到達不能／証明書エラーにつながると報告されています。
残っている記録は全体の要約で、宛先ごとのHTTPステータスや証明書エラー名は記録されていません。
**以下はソースから特定した導線であり、2026-10-12 時点の外部障害を再確認した結果ではありません。**

| ID | 入口 | ソースに書かれた遷移先 | 修正元 |
| --- | --- | --- | --- |
| R1 | `/ja/talks/as-a-code/` | `http://junkato.digitalmuseum.jp/ja/talks/as-a-code` | [pages/ja/talks/as-a-code/index.tsx](../pages/ja/talks/as-a-code/index.tsx) |
| R2 | `/ja/talks/people-are-programmers/` | `http://junkato.digitalmuseum.jp/ja/talks/people-are-programmers` | [pages/ja/talks/people-are-programmers/index.tsx](../pages/ja/talks/people-are-programmers/index.tsx) |
| R3 | `/user-generated-variables/` | `http://junkato.digitalmuseum.jp/user-generated-variables` | [pages/user-generated-variables/index.tsx](../pages/user-generated-variables/index.tsx) |
| R4 | `/ja/user-generated-variables/` | `https://junkato.jp/user-generated-variables` → R3の外部宛先 | [pages/ja/user-generated-variables/index.tsx](../pages/ja/user-generated-variables/index.tsx) |
| R5 | `/ugv/` | `https://junkato.jp/user-generated-variables` → R3の外部宛先 | [pages/ugv/index.tsx](../pages/ugv/index.tsx) |

**修正の手がかり:** 最終宛先3種類をブラウザで確認し、現在の障害の種類と移転先の有無を記録する。
旧アプリはHTTPでのみ動作する旨の説明があるので、HTTPSへの書き換えだけで直るとは限らない。
保存版は `/ja/talks/as-a-code.old/`、`/ja/talks/people-are-programmers.old/`、`/user-generated-variables.old/` にあるが、L5〜L10 の参照切れも確認してから代替導線を決める。

`/science/` → `/ja/science` と `/user-interface-design/` → `/ja/user-interface-design` はサイト内の案内で、上の外部障害5入口には含めていません。

## 修正時の再確認

- **参照切れ:** ビルド後の `dist/` を [verify-site.ts](../scripts/verify-site.ts) の `localReferences` / `targetExists` で調べる。比較検証の `existingBrokenUrls` に記録される項目でも、この一覧にある不具合として修正対象にする。欠落を実際に解消した場合、既存の壊れた参照数が減ることを確認する。
- **表示:** `npm run preview` で各対象ページを開く。旧HTMLはCSS・画像の取得とレイアウト、現行ページは言語切り替えと資料リンクを確認する。
- **埋め込み:** E1 の対象ページを開き、コンソールの `Embed: No URL specified`、余分な `.ui.embed > .embed`、動画・スライドの表示を確認する。修正後は英日両方とPDF埋め込みを確認する。
- **外部サービス:** リンク先の欠落、初期化エラー、第三者サービスの到達性を別々に判定する。証明書警告の回避で正常扱いにしない。

移行全体の検証条件は [REACT_MIGRATION.md](REACT_MIGRATION.md)、比較コマンドは [README.md](../README.md) を参照。
