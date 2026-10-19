# 開発・公開・保守

コンテンツの編集方法は[コンテンツ編集ガイド](CONTENT_AUTHORING.md)、表示やリンクの確認待ちは[コンテンツの確認・修正事項](CONTENT_ISSUES.md)を参照してください。

## ソースと生成物

| 場所          | 内容                                                      |
| ------------- | --------------------------------------------------------- |
| `pages/`      | URLとページごとのデータ指定                               |
| `components/` | 英語・日本語で共有するページ本文                          |
| `site/`       | 共通レイアウト、UI部品、データ読み込み                    |
| `src/`        | 画像、配布資料、JSONデータ、`junkato.bib`、LESS、保存HTML |
| `semantic/`   | Fomantic UIのテーマとビルド設定                           |
| `scripts/`    | アセット生成、静的出力、プレビュー、検証                  |

`site/generated/`、`build/`、`public/`、`.next/`、`out/`、`dist/` は生成物です。直接編集せず、対応するソースを変更して再生成してください。

## 開発サーバー

Node.js 24を使い、ロックファイルに従って依存関係をインストールします。

```sh
npm ci
npm run dev
```

`npm run dev` はアセットを生成してからNext.jsを起動します。Reactの編集は自動反映されます。画像・データ・スタイルなどの変更はアセット生成後にブラウザーを再読み込みしてください。

ホストとポートは次のように指定できます。

```sh
npm run dev -- --hostname 127.0.0.1 --port 3000
```

## ビルドと確認

```sh
npm run prettify
npm test
npm run build
npm run preview
```

`npm test` は型検査、データ・コンポーネント・生成処理のテストを実行します。型検査だけを行う場合は `npm run typecheck` を使います。

`npm run build` はアセット生成、Next.jsの静的出力、公開用ファイルの仕上げを行い、結果を `dist/` に出力します。公開環境にNode.jsサーバーは不要です。

プレビューは `http://127.0.0.1:4174` で `dist/` を配信します。ソースを変更したら再ビルドしてください。ポートは `npm run preview -- --port 8080` で変更できます。

ブラウザーテストはビルド後に実行します。

```sh
npx playwright install chromium
npx playwright test
```

PC・スマートフォンの表示、言語切り替え、履歴操作、メニュー、モーダル、埋め込み、クリップボードなどを確認します。外部サービスの実際の再生・表示は、公開ページを通常のブラウザーで別途確認してください。

全ページの巡回や前の出力との画面比較には次のコマンドを使えます。結果は `site-qa/navigation/` に出力されます。

```sh
node --import tsx scripts/check-browser.ts
SITE_BASELINE=/path/to/previous/dist node --import tsx scripts/check-browser.ts
```

資料や画像を移動・削除した場合は、リンク元のページとブラウザーのNetwork欄で参照切れがないことを確認してください。

## 公開

`main` へのpushで [GitHub Pages公開ワークフロー](../.github/workflows/deploy.yml) がビルドとテストを行い、`dist/` を公開します。カスタムドメイン用の `CNAME` と `.nojekyll` はビルド時に生成されます。

`v` で始まるタグでは[アセット配布ワークフロー](../.github/workflows/publish-assets.yml)がCSS・フォントのZIPをGitHub Releaseに添付します。

公開後は、直接アクセス、英日切り替え、資料ダウンロード、翻訳依頼のソースリンクを確認してください。計測はGA4のリアルタイムレポートで確認します。GA4側の履歴変更による自動ページビューは無効にし、サイトが送るページビューとの重複を防ぎます。

## 画像・スタイル・日付

画像の原本は `src/` に置きます。ビルドでレスポンシブ表示用のWebPを生成し、原本のダウンロードURLも維持します。`SiteImage` の使い方は[コンテンツ編集ガイド](CONTENT_AUTHORING.md#画像と埋め込み)を参照してください。

画像変換キャッシュは `.cache/site-images/` にあります。通常の `npm run clean` では残ります。画像変換を最初から確認したい場合は、このディレクトリを削除してビルドしてください。`npm ci` のオプション依存関係は、画像処理とNext.jsのコンパイラーに必要です。

サイト共通のスタイルは `src/stylesheets/` と `semantic/` で編集します。開閉アニメーションなどのクラスを変えた場合は、本番ビルドでも装飾が残ることを確認してください。CSS削減の設定は [finalize-export.ts](../scripts/finalize-export.ts)、画像変換の設定は [image-derivatives.ts](../scripts/image-derivatives.ts) にあります。

年数や相対日付はビルド時点の値で出力されます。年が変わった後など、表示を更新するには再ビルドしてください。

## 独立ページ

履歴書の `/resume/` と `/resume.html` は独立した印刷用スタイルを使います。UGVの `/user-generated-variables/` も独立したHTML資料です。これらのページや配布ファイルへのリンクは、文書全体を読み込む通常のリンクとして扱われます。

UGV本文・画像・フォント・スクリプトは `src/user-generated-variables/` で編集します。スライドのハッシュURL、コード詳細の開閉、`S` キーの発表者メモを確認するテストは [legacy-presentation.spec.ts](../tests/browser/legacy-presentation.spec.ts) です。

## 旧URLの転送

| 転送元                                   | 転送先                       | 設定場所                         |
| ---------------------------------------- | ---------------------------- | -------------------------------- |
| `/ja/blog/` 以下の旧ブログURL            | `blog.junkato.jp`            | `scripts/blog-redirections.json` |
| `/textalive/embed/` と旧サンプルページ   | `developer.textalive.jp`     | `scripts/legacy-redirects.ts`    |
| `/user-generated-variables.old/`         | `/user-generated-variables/` | `scripts/legacy-redirects.ts`    |
| `/ugv/`、`/ja/user-generated-variables/` | `/user-generated-variables/` | 対応する `pages/` のファイル     |

旧URLの静的な転送HTMLはアセット生成時に作られます。開発サーバーの転送・書き換えは `next.config.ts` でも確認してください。

ブログの転送一覧を更新する場合は次を実行し、JSONの差分を確認してコミットします。

```sh
npm run assets -- --refresh-redirects
```

## 講演ページ

本文は [as-a-code.tsx](../site/talks/as-a-code.tsx) と [people-are-programmers.tsx](../site/talks/people-are-programmers.tsx) で編集します。画像は `src/ja/talks/{slug}.old/` 以下を参照しています。

`slug` は `as-a-code` または `people-are-programmers` です。

| URL                                   | 内容                           |
| ------------------------------------- | ------------------------------ |
| `/ja/talks/{slug}/`、`index.html`     | 第1章                          |
| `/ja/talks/{slug}/p1.html`            | 第1章へ転送                    |
| `/ja/talks/{slug}/p2.html`、`p3.html` | 第2章・第3章                   |
| `/ja/talks/{slug}/?p=2`、`?p=3`       | JavaScript有効時に該当章へ転送 |
| `/ja/talks/{slug}.old/`               | 現行ページへ転送               |
| `/ja/talks/as-a-code/ide/`            | 簡易IDE                        |
| `/ja/talks/as-a-code.old/ide.html`    | 簡易IDEへ転送                  |

章ファイルの静的出力名は `scripts/finalize-export.ts` で調整しています。URLを変える場合は開発サーバーと静的プレビューの両方で確認してください。

描画デモを変更した場合は [talks.spec.ts](../tests/browser/talks.spec.ts) で描画、コードの共有、保存、無限ループの中断を確認してください。
