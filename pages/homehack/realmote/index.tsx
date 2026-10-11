import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from homehack/realmote/index.pug; edit this TSX source directly. */
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
  

  p = projectsTable["homehack"];
  var homehack;
  homehack = "realmote";
  var titles = {
    en: {
      "fungus-camera": "Fungus Camera",
      "rhythm-kaden": "Rhythm-Kaden",
      realmote: "Realmote",
    },
    ja: {
      "fungus-camera": "なめこカメラ",
      "rhythm-kaden": "リズム家電",
      realmote: "Realmote",
    },
  };
  title = p.getTitle(lang) + (homehack ? ` (${titles[lang][homehack]})` : "");
  me = p.project + "/" + (homehack ? homehack + "/" : "");

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
        {content.renderProjectHeader("homehack")}
        <div className="ui secondary pointing menu">
          <a
            className={classNames("item", typeof homehack === "undefined" ? "active" : undefined)}
            href={href(`${basePath}homehack/`)}
          >
            {plainText(en ? "Overview" : "概要")}
          </a>
          <a
            className={classNames("item", homehack === "fungus-camera" ? "active" : undefined)}
            href={href(`${basePath}homehack/fungus-camera/`)}
          >
            {plainText(titles[lang]["fungus-camera"])}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {richText("'12-13")}
            </div>
          </a>
          <a
            className={classNames("item", homehack === "rhythm-kaden" ? "active" : undefined)}
            href={href(`${basePath}homehack/rhythm-kaden/`)}
          >
            {plainText(titles[lang]["rhythm-kaden"])}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {richText("'12")}
            </div>
          </a>
          <a
            className={classNames("item", homehack === "realmote" ? "active" : undefined)}
            href={href(`${basePath}homehack/realmote/`)}
          >
            {plainText(titles[lang]["realmote"])}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {richText("'11-12")}
            </div>
          </a>
        </div>
        <h3 className="ui header">{richText("概要")}</h3>
        <div className="ui stackable two columns grid">
          <div className="column">
            <p>
              {richText(
                "スマートフォンやタブレット端末のWebブラウザから、電灯やエアコン、自動掃除機ルンバなどの家電製品を遠隔操作できるようにした。",
              )}
            </p>
            <h3 className="ui header">{richText("開発環境")}</h3>
            <ul>
              <li>
                {richText("Java + ")}
                <a href={href(`${rootPath}ja/phybots/`)}>{richText("Phybots")}</a>
                {richText(" on Mac OS X")}
              </li>
              <li>
                <a href={href("https://www.buffalo.jp/product/detail/pc-op-rs1.html")}>
                  {richText("パソコン用学習リモコン PC-OP-RS1")}
                </a>
              </li>
              <li>
                <a href={href("https://www.sparkfun.com/products/684")}>
                  {richText("ルンバ用Bluetoothインタフェース RooTooth")}
                </a>
              </li>
            </ul>
            <h3 className="ui header">{richText("資料")}</h3>
            <ul>
              <li>
                {richText("ブログ記事: ")}
                <a
                  href={href(
                    "https://blog.junkato.jp/ja/posts/2012-12-24-realmote-remote-control/",
                  )}
                >
                  {richText("Realmoteで家のリモコンを一つにまとめる")}
                </a>
              </li>
              <li>
                {richText("ソースコード: ")}
                <a href={href("https://github.com/arcatdmz/realmote")}>
                  <i className="icon-download"></i>
                  {richText("GitHub")}
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            {content.renderEmbedYoutube("//www.youtube.com/embed/bhbW39zoxyg")}
          </div>
          <div className="column">
            <a className="ui fluid image" href={href(`${rootPath}homehack/realmote-edit.jpg`)}>
              <img src={`${rootPath}homehack/thumbnails/realmote-edit.jpg`} />
            </a>
          </div>
          <div className="column">
            <a className="ui fluid image" href={href(`${rootPath}homehack/realmote.jpg`)}>
              <img src={`${rootPath}homehack/thumbnails/realmote.jpg`} />
            </a>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}
