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

/** React page migrated from ja/teaparty/2016/index.pug; edit this TSX source directly. */
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

  p = projectsTable["teaparty"];
  title = "第5回 名状しがたいお茶会";
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
  function renderDetails(): ReactNode {
    return (
      <>
        <section id={attribute("details")}>
          <h2 className="ui header">{richText("時と場所")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "2016年2月13日 10時30分より、Wantedlyオフィスで開催されます。",
              )}
            </p>
            <p>
              {richText(
                "Wantedlyオフィスは休日のため、通常の入り口が閉まっています。開場時間近辺はスタッフがいますが、もし遅れる場合は",
              )}
              <a href={href("https://twitter.com/arcatdmz")}>
                {richText("@arcatdmz")}
              </a>
              {richText("宛てにツイートするなどして中の人にご連絡ください。")}
            </p>
            <iframe
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.5143207781284!2d139.71998831621383!3d35.63969798020414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35441d89d7421c9f%3A0xd7cd585ac9104934!2z44Km44Kp44Oz44OG44OD44OJ44Oq44O85qCq5byP5Lya56S-!5e0!3m2!1sen!2sjp!4v1482565394883"
              }
              width={"100%"}
              height={"450"}
              frameBorder={"0"}
              style={style("border:0")}
              allowFullScreen={true}
            ></iframe>
          </div>
          <h2 className="ui header">{richText("参加費")}</h2>
          <div className="ui basic segment">
            <p>
              {richText("学生")}
              <strong>{richText("1000")}</strong>
              {richText("円、社会人")}
              <strong>{richText("2500")}</strong>
              {richText(
                "円を予定しています。17時半までお菓子とお茶が出るほか、18-19時半まで夕飯とアルコールを含む飲み物が手配されています。",
              )}
            </p>
          </div>
          <h2 className="ui header">{richText("その他")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "電源、電源タップ、Wi-Fiがあります。ただ、Wi-Fiは多人数で同時接続すると不安定になることがあるため、インターネット接続が必須の方はご自身で用意していただくようおお願いします。",
              )}
            </p>
            <p>
              {richText(
                "プロジェクタは解像度1280x720ピクセル(16:9)で、HDMI、mini DisplayPort、VGA接続が可能です。",
              )}
            </p>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <div className="ui breadcrumb">
          <a className="section" href={href(basePath + me)}>
            {richText("名状しがたいお茶会")}
          </a>
          <i className="right angle icon divider"></i>
          <div className="active section">{richText("第5回 (2016)")}</div>
        </div>
        <div className="ui divider"></div>
        <section>
          <h1 className="ui header">{richText("第5回 名状しがたいお茶会")}</h1>
          <div className="ui horizontal divided list">
            <div className="item">
              <span className="ui tiny basic label">
                <i className="calendar icon"></i>
                {richText("2016/2/13")}
              </span>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("summary")}>
          <div className="ui basic segment">
            <p>
              {richText(
                "名状しがたいお茶会へようこそ！一年に一度のお茶会も、早いものでもう5回目です。今年から複数名で運営タスクにあたっています。お茶会らしく温かい飲み物も出ます。会場は",
              )}
              <a href={href("https://www.wantedly.com/")}>
                {richText("Wantedly")}
              </a>
              {richText("さんにご提供いただき、")}
              <a href={href("https://m.wantedly.com/")}>
                {richText("Wantedlyチャット")}
              </a>
              {richText(
                "を使ってお茶会関連の議論を深める試みも始めました。濃ゆい一日をぜひ楽しんでいただければと思います。",
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <section id={attribute("timetable")}>
              <h2 className="ui header">{richText("タイムテーブル")}</h2>
              <div className="ui basic segment">
                <iframe
                  src={
                    "https://docs.google.com/spreadsheets/d/1We0tN3pxXJ1Wbh30mpEPgec5GD8fDA5WC-De8OsAsqU/pubhtml?gid=1669616252&single=true&widget=true&headers=false"
                  }
                  style={style("width: 100%; height: 640px;")}
                ></iframe>
              </div>
            </section>
            <div className="ui hidden divider"></div>
            {renderDetails()}
          </div>
          <div className="column">
            <section id={attribute("photos")}>
              <h2 className="ui header">{richText("当日の様子")}</h2>
              <div className="ui basic segment">
                <img className="ui fluid image" src={"DSC09983.jpg"} />
                <div className="caption">{richText("開場前")}</div>
                <div className="ui hidden divider"></div>
                <img className="ui fluid image" src={"DSC09990.jpg"} />
                <div className="caption">{richText("質疑")}</div>
                <div className="ui hidden divider"></div>
                <img
                  className="ui fluid image"
                  src={"73dfe990-b51f-4517-b0ef-78715e98b2fd.jpg"}
                />
                <div className="caption">{richText("名札")}</div>
                <div className="ui hidden divider"></div>
                <img className="ui fluid image" src={"DSC09993.jpg"} />
                <div className="caption">{richText("突発ゲーム会")}</div>
                <div className="ui hidden divider"></div>
              </div>
            </section>
          </div>
        </div>
        <div className="ui divider"></div>
        <div className="ui breadcrumb">
          <a className="section" href={href(basePath + me)}>
            {richText("名状しがたいお茶会")}
          </a>
          <i className="right angle icon divider"></i>
          <div className="active section">{richText("第5回 (2016)")}</div>
        </div>
      </SiteLayout>
    </>
  );
}
