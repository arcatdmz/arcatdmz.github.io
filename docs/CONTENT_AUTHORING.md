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
import { ProjectPage } from "@/site/components/projects/ProjectPage";
import { LocalizedContent } from "@/site/components/content/LocalizedContent";
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
import { SiteLink } from "@/site/components/links/SiteLink";
import { useSiteContext } from "@/site/hooks/useSiteContext";

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

| 用途                             | 使う部品                                                                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| レスポンシブ画像                 | `site/components/media/SiteImage` の `SiteImage`。`alt` と、必要に応じて `fluid`・`bordered`・`sizes` を指定する                    |
| リンク付き画像                   | `site/components/media/LinkedImage` の `LinkedImage` で `SiteImage` を囲む。`href` と外側の装飾は `LinkedImage` に指定する          |
| クリック・キー操作で開く埋め込み | `site/components/media/DeferredEmbed` の `DeferredEmbed` にURLまたは動画情報とプレースホルダーを指定する                            |
| 本文を持つポップアップ           | `site/components/widgets/SitePopup`。`trigger` に操作要素、childrenに内容を指定する                                                 |
| 拡大画像                         | `site/components/widgets/ModalImage` で `SiteImage` を囲み、ページ内に `SiteModal` を一つ置く。`components/design/index.tsx` を参照 |
| ナビゲーションメニュー           | `site/components/widgets/NavigationDropdown`。使用例は `site/components/layout/SiteLayout.tsx` を参照                               |
| コピー操作                       | `site/components/links/CopyButton` に `data-clipboard-text` と `lang` を指定する                                                    |

```tsx
import { LinkedImage } from "@/site/components/media/LinkedImage";
import { SiteImage } from "@/site/components/media/SiteImage";

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

## 代表文献と受賞歴

`src/data/projects.json` の `publication` は文献キーの文字列、または表示順に並べた配列です。`ja.publication` は共通設定を置換し、空配列なら代表文献なしになります。先頭の文献は既存のスライドリンクなどにも使います。文献の所属先（BibTeXの `project`）は別の関係なので、他プロジェクトに所属する文献も代表文献に指定できます。

代表文献が自プロジェクトに所属せず、別の公開プロジェクトでも代表文献になっている場合は、会議名からそのプロジェクトページへリンクします。候補が複数あれば文献の所属プロジェクトを優先し、それ以外はプロジェクト定義順で最初のリンク可能な候補を使います。自プロジェクトの所属文献や候補のない文献は通常の文字表示です。カードの `/` 区切りでも同じリンクを使います。

詳細ページの引用欄だけを絞る場合は、`<ProjectPublications project="textalive" majorPublication="chi2015-kato-textalive" />` のように明示指定します。`majorPublication` は文字列または配列を指定でき、空配列なら強調表示なしです。未指定時はプロジェクトの代表文献を使います。通常一覧はそのプロジェクトの所属文献だけを表示するため、強調から外した別プロジェクトの文献は通常一覧にも追加されません。カード・見出しの代表文献設定には影響しません。受賞集計は代表文献の指定と独立しています。

受賞歴は `src/data/awards.json` で管理します。固定の `id`、`date`、対象文献の `publications` 配列、受賞なら `kind: "award"`、採択・候補などの顕彰なら `kind: "honor"` を指定します。既存の「受賞」「採択」「選定」などの表現を置き換えず、元の意味を維持してください。

説明は `en` / `ja` のオブジェクトに分けます。`label` は名称（既存の `abbr` などのHTMLも使用可）、`url` は名称のリンク先、`before` / `after` はリンクの前後に付く説明のHTMLです。同じ名称・URLは国際受賞なら `en`、国内受賞なら `ja` 側にだけ保存し、もう一方では省略できます。例えば以下のように、名称を繰り返さずに日本語の「受賞」を残せます。

```json
{
  "en": {
    "label": "Example Best Paper Award",
    "url": "https://example.org/awards/"
  },
  "ja": { "after": " 受賞" }
}
```

短縮ラベルが正式な名称と異なる場合だけ `shortLabel` を指定します。表示言語に未指定なら、もう一方の `shortLabel` を使います。両方とも未指定なら名称を使います。`before` / `after` は言語ごとの文章なので、部分的には継承しません。片方の言語オブジェクト自体がない場合は、もう一方の文章全体を使います。

`entryType: "domestic"` は国内賞、未指定は国際賞です。受賞説明をBibTeXの `addition` に重ねて記載せず、招待記事など受賞以外の注記だけを残してください。プロジェクトは所属文献の受賞だけを集計し（他プロジェクト所属の代表文献は対象外）、6件以上では全受賞へのリンクを含む要約ポップアップを表示します。各受賞のリンク先は `/publications/#award-{id}`（日本語では `/ja/publications/#award-{id}`）です。公開したIDは変更しないでください。

## 研究プロジェクトのタグフィルタ

`/projects/?tag=music` や `/ja/projects/?tag=anime` のように、研究一覧のタグをクエリパラメータ `tag` で指定できます。サイドバーで一つ選択し、「すべて」または本文のフィルタ案内の閉じるアイコンで解除します。タグ候補と件数は公開されている研究プロジェクトの `tags` から生成されます。選択したタグと同じIDの公開プロジェクトがある場合はトップページの研究トピックと同じパネル画像・見出しリンク・説明文の特別枠に表示し、通常の研究一覧からは除いて重複を防ぎます。タグ自身が付いていない概念プロジェクトも特別枠の対象です。デザイン・開発一覧は絞り込みません。タグ切り替えは履歴に残り、再読み込みや言語切り替えでも復元できます。未知のタグは全件表示として扱います。

静的HTMLには全件を含め、読み込み後にブラウザーで絞り込みます。クエリごとのページ生成やサーバー処理は不要です。JavaScriptが無効な場合も全件の閲覧は可能です。有効なタグを指定した直アクセス時だけ、Reactの初期化が終わるまで研究一覧を読み込み表示にし、全件状態のちらつきを抑えます。ページ内のタグ切り替えではページを再マウントしません。

## 共通コンポーネントの配置

`site/components/` は機能別フォルダに分け、内部部品も含め1コンポーネント1ファイルとします。ファイル名はコンポーネント名に合わせ、各ファイルから直接importしてください。集約用の `index.ts` は作成しません。共有Context・型・補助関数は機能内の `.ts` ファイルに置きます。

フックは `site/hooks/` に置き、Contextの定義と分けて管理します。
