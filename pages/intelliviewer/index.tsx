import { ProjectHeader } from "@/site/components/ContentComponents";

import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from intelliviewer/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath } = data;
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"intelliviewer"} />
        <div className="ui hidden divider"></div>
        <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
        <div className="ui basic segment">
          <p>
            {
              "This is a user interface for helping navigation of source code in the integrated development environment. For each row of the keyboard, available namespaces, classes, member variables and methods are shown on the keytops. The user interface works on the prototype "
            }
            <a
              href={
                "https://www.microsoft.com/appliedsciences/content/projects/AdaptiveHardware.aspx"
              }
            >
              {"adaptive keyboard"}
            </a>
            {" developed by "}
            <a href={"https://www.microsoft.com/appliedsciences/"}>
              {"Microsoft Applied Science Group"}
            </a>
            {"."}
          </p>
          <p>
            {
              "This work was done in collaboration with lab colleagues and presented at UIST 2010 "
            }
            <a href={"https://www.acm.org/uist/uist2010/Student_Contest.html"}>
              {"Student Innovation Contest"}
            </a>
            {"."}
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
