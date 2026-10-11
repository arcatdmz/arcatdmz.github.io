import { SiteLink } from "@/site/components/SiteLink";

import { href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/teaparty/2018/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath } = data;
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

  p = projectsTable["teaparty"];
  title = "第7回 名状しがたいお茶会";
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
        <div className="ui breadcrumb">
          <SiteLink className="section" href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </SiteLink>
          <i className="right angle icon divider"></i>
          <div className="active section">{"第7回 (2018)"}</div>
        </div>
        <div className="ui divider"></div>
        <section>
          <h1 className="ui header">{"第7回 名状しがたいお茶会"}</h1>
          <div className="ui horizontal divided list">
            <div className="item">
              <span className="ui tiny basic label">
                <i className="calendar icon"></i>
                {"2018/1/28"}
              </span>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"summary"}>
          <h2 className="ui header">{"概要"}</h2>
          <div className="ui basic segment">
            <p>
              {
                "32名が参加し、「科学」「技術」そして「語る」「奏でる」「動かす」「描く」のセッションで発表しました。おやつのマカロンが好評だったようです。懇親会の時間を長く取ることができました。発表のバックチャネルとしてSlackチャットを活用しました。"
              }
            </p>
            <p>
              {"会場は2年前からWantedlyさんにご提供いただいています。様子は"}
              <SiteLink href={href(`${basePath + me}2016`)}>
                {"こちら"}
              </SiteLink>
              {"からご覧ください。"}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"timetable"}>
          <h2 className="ui header">{"タイムテーブル"}</h2>
          <div className="ui basic segment">
            <iframe
              src={
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmYZaNWiUzNorraA1ZsFgUT3hDZyZQZmwrfLdoRwRXJfN4Lur1zaWsCu2lRXrDtStn25x-3gQ6eclr/pubhtml?gid=318679183&amp;single=true&amp;widget=true&amp;headers=false"
              }
              style={{ width: "100%", height: "640px" }}
            ></iframe>
          </div>
        </section>
        <div className="ui divider"></div>
        <div className="ui breadcrumb">
          <SiteLink className="section" href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </SiteLink>
          <i className="right angle icon divider"></i>
          <div className="active section">{"第7回 (2018)"}</div>
        </div>
      </SiteLayout>
    </>
  );
}
