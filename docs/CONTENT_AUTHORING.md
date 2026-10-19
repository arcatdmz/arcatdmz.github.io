# コンテンツの追加・翻訳

## 編集するファイル

| 内容                           | 編集先                                                                 |
| ------------------------------ | ---------------------------------------------------------------------- |
| ページの本文・画像・レイアウト | 対応する `components/` のファイル。例: `components/homehack/index.tsx` |
| URL・ページで参照するデータ    | 対応する `pages/` のファイル                                           |
| プロジェクト名・説明・期間     | `src/data/projects.json`                                               |
| 論文・発表資料                 | `src/junkato.bib` と `src/publications/`                               |
| 活動履歴・受賞・報道など       | `src/data/` の対応するJSON                                             |
| 画像・配布ファイル             | `src/` 以下。公開時は `src/` を除いたパスになる                        |

英日で本文を共有するページは、共通の本文を一度だけ定義します。翻訳を指定しない部分には共通本文が表示されます。英語URLにあるページでも、共通本文が日本語の場合があります。

講演・UGV・履歴書など、独立した構成のページの編集先は[保守ガイド](MAINTENANCE.md)を参照してください。

## プロジェクトページの追加

最初に `src/data/projects.json` にプロジェクトの情報を追加します。次に、ルートと共通本文の2ファイルを作成します。

```tsx
// pages/example/index.tsx
import Page from "@/components/example";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;
export const getStaticProps = localizedPageProps(Page, "/example/", {
  projects: ["example"],
  publicationProjects: ["example"],
});
```

```tsx
// components/example/index.tsx
import { Header, Segment } from "react-fomantic-ui";
import { ProjectPage } from "@/site/components/ProjectPage";
import { LocalizedContent } from "@/site/components/LocalizedContent";
import type { PageDataProps } from "@/site/page-data";

export default function Page({ pageData }: PageDataProps) {
  return (
    <ProjectPage pageData={pageData} project="example">
      <Header as="h2">Overview</Header>
      <Segment basic>
        <LocalizedContent ja={<p>日本語の紹介。</p>}>
          <p>The default project description.</p>
        </LocalizedContent>
      </Segment>
    </ProjectPage>
  );
}
```

これで `/example/` と `/ja/example/` が生成されます。`ProjectPage` はプロジェクトの見出し・共通レイアウト・関連文献を表示します。

`localizedPageProps` を使うと、開発・ビルド・型検査の際にもう一方の言語の `*.localized.tsx` が自動生成されます。生成ファイルは編集・コミットしません。日本語側を元のルートにすることもできます。片方に明示的なルートがあれば、そのファイルが使われます。

ルートだけを再生成する場合は `npm run routes` を実行します。年別履歴などの動的ルートは、言語ごとに `getStaticPaths` を定義します。

言語別に参照データを変える場合は、第4引数に `{ ja: { projects: [...] } }` のように指定します。その言語では、指定した参照一覧が第3引数の代わりに使われます。

## 本文と翻訳

短いラベルは `en ? "English" : "日本語"` のように書けます。段落などのまとまった内容には `LocalizedContent` を使います。

```tsx
<LocalizedContent ja={<p>日本語の概要。</p>}>
  <p>The default English abstract.</p>
</LocalizedContent>
```

`ja` を省略すると共通本文を表示します。日本語を共通本文にし、`en` だけ指定することもできます。`undefined` は共通本文の使用、`null` と `false` はその部分の非表示を表します。

ラベル・リンク・ページデータは `useSiteContext` から取得します。`ProjectPage` または `SiteLayout` の内側にある子コンポーネントで使ってください。

```tsx
import { Button } from "react-fomantic-ui";
import { SiteLink } from "@/site/components/SiteLink";
import { useSiteContext } from "@/site/components/SiteContext";

function ProjectLink() {
  const { basePath, en } = useSiteContext();
  return (
    <Button as={SiteLink} href={`${basePath}projects/`} role="link">
      {en ? "Projects" : "プロジェクト"}
    </Button>
  );
}
```

`basePath` は表示言語に応じたリンク先、`rootPath` は共通画像などのパスに使います。本文は `<p>説明文</p>` のような通常のJSXで書きます。

## UI部品

標準的なUIには `react-fomantic-ui` のコンポーネントを使います。

```tsx
import { Grid } from "react-fomantic-ui";

<Grid stackable columns={2}>
  <Grid.Column>...</Grid.Column>
  <Grid.Column>...</Grid.Column>
</Grid>;
```

装飾は `<Label horizontal>`、`<Divider hidden />` のようにpropsで指定します。サブコンポーネントは親だけをインポートし、`Item.Content`、`Item.Header`、`Grid.Column`、`List.Item` として参照してください。

見出しには `<Header as="h2">` など適切なHTML要素を指定します。リンクには `SiteLink` を使い、UI部品に組み込む場合は `as={SiteLink}` とします。移動用の `Button` や `List.Item` は `role="link"`、操作ボタンはボタンとして扱います。

サイト独自の装飾、表示幅による出し分け、Devicon、ライブラリに対応するpropsがない表現にはクラスを使えます。共通レイアウトがスタイルを読み込むので、本文で追加のCSS読み込みやjQueryの初期化は不要です。

## 画像と埋め込み

| 用途                             | 使う部品                                                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| レスポンシブ画像                 | `site/components/SiteImage` の `SiteImage`。`alt` と、必要に応じて `fluid`・`bordered`・`sizes` を指定する                   |
| リンク付き画像                   | `site/components/LinkedImage` の `LinkedImage` で `SiteImage` を囲む。`href` と外側の装飾は `LinkedImage` に指定する         |
| クリック・キー操作で開く埋め込み | `site/components/DeferredEmbed` の `DeferredEmbed` にURLまたは動画情報とプレースホルダーを指定する                           |
| 本文を持つポップアップ           | `site/components/SiteWidgets` の `SitePopup`。`trigger` に操作要素、childrenに内容を指定する                                 |
| 拡大画像                         | `SiteWidgets` の `ModalImage` で `SiteImage` を囲み、ページ内に `SiteModal` を一つ置く。`components/design/index.tsx` を参照 |
| ナビゲーションメニュー           | `SiteWidgets` の `NavigationDropdown`。使用例は `site/components/SiteLayout.tsx` を参照                                      |
| コピー操作                       | `site/components/InteractiveLinks` の `CopyButton` に `data-clipboard-text` と `lang` を指定する                             |

```tsx
import { LinkedImage } from "@/site/components/LinkedImage";
import { SiteImage } from "@/site/components/SiteImage";

<LinkedImage fluid href="/example/detail.jpg">
  <SiteImage src="/example/detail-thumbnail.jpg" alt="試作品の拡大写真" />
</LinkedImage>;
```

画像は説明に合う `alt` を付けます。装飾だけの画像は `alt=""` とします。画像の原本は残し、ビルドで表示用の縮小画像を生成します。

ポップアップやモーダルは `ProjectPage`・`SiteLayout` の内側で使います。内容は通常のJSXのchildrenとして渡し、`SiteModal` 内の見出しと本文には `Modal.Header`、`Modal.Content` を使います。

## 編集後の確認

```sh
npm run prettify
npm test
npm run build
npm run preview
```

英日両方のページを開き、本文・翻訳・言語切り替え・画像・資料リンクを確認してください。埋め込みは実際に開いて再生やページ送りを試します。詳しい検証コマンドは[保守ガイド](MAINTENANCE.md#ビルドと確認)にあります。
