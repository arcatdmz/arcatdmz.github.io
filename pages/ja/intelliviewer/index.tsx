import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import {
  classNames,
  style,
  text as plainText,
  keyed,
  href,
  attribute,
} from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/intelliviewer/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const {
    histories,
    awards,
    talks,
    lectures,
    projects,
    projectsTable,
    products,
    selectedProjects,
    publications,
    publicationsTable,
    selectedPublications,
    media,
    mediaList,
    misc,
    moment,
    rootPath,
    protocol,
    domain,
    defaultImageUrl,
    defaultDescription,
    defaultJapaneseDescription,
    stripTags,
  } = data;
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
  moment.locale(lang);
  const context: ReturnType<typeof getSiteData> & SiteContext = {
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
  const content = createContentComponents(context);

  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("intelliviewer")}
        <div className="ui hidden divider"></div>
        <h2 className="ui header">{plainText(en ? "Abstract" : "概要")}</h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "キートップの最下列から順に、列ごとにネームスペース、クラス、メンバ変数とメソッドの一覧を表示し、統合開発環境においてソースコード内のナビゲーションを高速化するユーザインタフェースです。",
            )}
            <a href={href("https://www.microsoft.com/appliedsciences/")}>
              {richText("Microsoft Applied Science Group")}
            </a>
            {richText("が")}
            <a
              href={href(
                "https://www.microsoft.com/appliedsciences/content/projects/AdaptiveHardware.aspx",
              )}
            >
              {richText("Adaptive Hardware")}
            </a>
            {richText(
              "プロジェクトで開発したAdaptive Keyboardのプロトタイプ上で動作します。",
            )}
          </p>
          <p>
            {richText("研究室の有志による共同プロジェクトで、UIST 2010の")}
            <a
              href={href(
                "https://www.acm.org/uist/uist2010/Student_Contest.html",
              )}
            >
              {richText("Student Innovation Contest")}
            </a>
            {richText("に参加しました。")}
          </p>
          <p>
            <a
              href={href(
                "https://channel9.msdn.com/posts/Microsofts-Adaptive-Keyboard-at-UIST",
              )}
            >
              <i className="video icon"></i>
              {richText("Microsoft Channel9 (UIST '10 interview, 5:55-)")}
            </a>
          </p>
        </div>
      </SiteLayout>
    </>
  );
}
