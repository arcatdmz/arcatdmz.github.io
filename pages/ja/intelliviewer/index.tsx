import { ProjectHeader } from "@/site/components/ContentComponents";

import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/intelliviewer/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
  const lang: "en" | "ja" = "ja";
  const en: boolean = false;
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
        <ProjectHeader project={"intelliviewer"} />
        <div className="ui hidden divider"></div>
        <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
        <div className="ui basic segment">
          <p>
            {
              "キートップの最下列から順に、列ごとにネームスペース、クラス、メンバ変数とメソッドの一覧を表示し、統合開発環境においてソースコード内のナビゲーションを高速化するユーザインタフェースです。"
            }
            <a href={"https://www.microsoft.com/appliedsciences/"}>
              {"Microsoft Applied Science Group"}
            </a>
            {"が"}
            <a
              href={
                "https://www.microsoft.com/appliedsciences/content/projects/AdaptiveHardware.aspx"
              }
            >
              {"Adaptive Hardware"}
            </a>
            {
              "プロジェクトで開発したAdaptive Keyboardのプロトタイプ上で動作します。"
            }
          </p>
          <p>
            {"研究室の有志による共同プロジェクトで、UIST 2010の"}
            <a href={"https://www.acm.org/uist/uist2010/Student_Contest.html"}>
              {"Student Innovation Contest"}
            </a>
            {"に参加しました。"}
          </p>
          <p>
            <a
              href={
                "https://channel9.msdn.com/posts/Microsofts-Adaptive-Keyboard-at-UIST"
              }
            >
              <i className="video icon"></i>
              {"Microsoft Channel9 (UIST '10 interview, 5:55-)"}
            </a>
          </p>
        </div>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/intelliviewer/", {"projects": ["intelliviewer"], "publicationProjects": ["intelliviewer"]}) }, "/ja/intelliviewer/") };
}
