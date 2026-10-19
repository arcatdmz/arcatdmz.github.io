import { Divider, Header, Icon, Segment } from "react-fomantic-ui";

import { ProjectHeader } from "@/site/components/ContentComponents";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
  const lang = pageData.language;
  const en = lang === "en";
  const basePath = en ? rootPath : rootPath + "ja/";
  const author = en ? "Jun Kato" : "加藤 淳";
  let me: any,
    p: any,
    title: any,
    description: any,
    imageUrl: any,
    bodyClass: any;

  p = projectsTable["intelliviewer"];
  title = p.getTitle(lang);
  me = p.project + "/";
  const context: SiteData & SiteContext = {
    ...data,
    lang,
    en,
    basePath,
    author,
    me,
    p,
    title,
    description,
    imageUrl,
    bodyClass,
  };

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project="intelliviewer" />
        <Divider hidden />
        <Header as="h2">{en ? "Abstract" : "概要"}</Header>
        <Segment basic>
          <p>
            {en
              ? "This is a user interface for helping navigation of source code in the integrated development environment. For each row of the keyboard, available namespaces, classes, member variables and methods are shown on the keytops. The user interface works on the prototype "
              : "キートップの最下列から順に、列ごとにネームスペース、クラス、メンバ変数とメソッドの一覧を表示し、統合開発環境においてソースコード内のナビゲーションを高速化するユーザインタフェースです。"}
            <a
              href={
                en
                  ? "https://www.microsoft.com/appliedsciences/content/projects/AdaptiveHardware.aspx"
                  : "https://www.microsoft.com/appliedsciences/"
              }
            >
              {en ? "adaptive keyboard" : "Microsoft Applied Science Group"}
            </a>
            {en ? " developed by " : "が"}
            <a
              href={
                en
                  ? "https://www.microsoft.com/appliedsciences/"
                  : "https://www.microsoft.com/appliedsciences/content/projects/AdaptiveHardware.aspx"
              }
            >
              {en ? "Microsoft Applied Science Group" : "Adaptive Hardware"}
            </a>
            {en
              ? "."
              : "プロジェクトで開発したAdaptive Keyboardのプロトタイプ上で動作します。"}
          </p>
          <p>
            {en
              ? "This work was done in collaboration with lab colleagues and presented at UIST 2010 "
              : "研究室の有志による共同プロジェクトで、UIST 2010の"}
            <a href="https://www.acm.org/uist/uist2010/Student_Contest.html">
              Student Innovation Contest
            </a>
            {en ? "." : "に参加しました。"}
          </p>
          <p>
            <a href="https://channel9.msdn.com/posts/Microsofts-Adaptive-Keyboard-at-UIST">
              <Icon name="video" />
              Microsoft Channel9 (UIST '10 interview, 5:55-)
            </a>
          </p>
        </Segment>
      </SiteLayout>
    </>
  );
}
