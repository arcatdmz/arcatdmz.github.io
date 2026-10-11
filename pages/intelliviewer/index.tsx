import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from intelliviewer/index.pug; edit this TSX source directly. */
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
  const lang: "en" | "ja" = "en";
  const en: boolean = true;
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
              "This is a user interface for helping navigation of source code in the integrated development environment. For each row of the keyboard, available namespaces, classes, member variables and methods are shown on the keytops. The user interface works on the prototype ",
            )}
            <a
              href={href(
                "https://www.microsoft.com/appliedsciences/content/projects/AdaptiveHardware.aspx",
              )}
            >
              {richText("adaptive keyboard")}
            </a>
            {richText(" developed by ")}
            <a href={href("https://www.microsoft.com/appliedsciences/")}>
              {richText("Microsoft Applied Science Group")}
            </a>
            {richText(".")}
          </p>
          <p>
            {richText(
              "This work was done in collaboration with lab colleagues and presented at UIST 2010 ",
            )}
            <a href={href("https://www.acm.org/uist/uist2010/Student_Contest.html")}>
              {richText("Student Innovation Contest")}
            </a>
            {richText(".")}
          </p>
          <p>
            <a href={href("https://channel9.msdn.com/posts/Microsofts-Adaptive-Keyboard-at-UIST")}>
              <i className="video icon"></i>
              {richText("Microsoft Channel9 (UIST '10 interview, 5:55-)")}
            </a>
          </p>
        </div>
      </SiteLayout>
    </>
  );
}
