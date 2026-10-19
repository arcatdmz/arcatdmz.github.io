# junkato.jp

[![Publish](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/deploy.yml)
[![Publish assets](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/publish-assets.yml/badge.svg?branch=main)](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/publish-assets.yml)

[junkato.jp](https://junkato.jp/) のソースです。Next.js・React・TypeScriptで静的サイトを生成します。開発にはNode.js 24を使っています。

画像・動画・文章・論文PDFなどのコンテンツについて、特筆ない限り、すべての権利を留保します。

## 開発

```sh
npm ci
npm run dev
```

## ビルドと確認

```sh
npm test
npm run build
npm run preview
```

公開用ファイルは `dist/` に出力されます。

## ドキュメント

- [開発・公開・保守](docs/MAINTENANCE.md)
- [コンテンツの追加・翻訳](docs/CONTENT_AUTHORING.md)
- [コンテンツの確認・修正事項](docs/CONTENT_ISSUES.md)

ブログのソースは [arcatdmz/blog](https://github.com/arcatdmz/blog) にあります。
