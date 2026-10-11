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

/** React page migrated from ja/homehack/fungus-camera/index.pug; edit this TSX source directly. */
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

  p = projectsTable["homehack"];
  var homehack;
  homehack = "fungus-camera";
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
            className={classNames(
              "item",
              typeof homehack === "undefined" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/`)}
          >
            {plainText(en ? "Overview" : "概要")}
          </a>
          <a
            className={classNames(
              "item",
              homehack === "fungus-camera" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/fungus-camera/`)}
          >
            {plainText(titles[lang]["fungus-camera"])}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {richText("'12-13")}
            </div>
          </a>
          <a
            className={classNames(
              "item",
              homehack === "rhythm-kaden" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/rhythm-kaden/`)}
          >
            {plainText(titles[lang]["rhythm-kaden"])}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {richText("'12")}
            </div>
          </a>
          <a
            className={classNames(
              "item",
              homehack === "realmote" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/realmote/`)}
          >
            {plainText(titles[lang]["realmote"])}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {richText("'11-12")}
            </div>
          </a>
        </div>
        <div className="ui stackable four columns grid">
          <div className="column">
            <a
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-prototype.jpg`)}
            >
              <img
                src={`${rootPath}homehack/thumbnails/fungus-prototype.jpg`}
              />
            </a>
          </div>
          <div className="column">
            <a
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-prototype-2.jpg`)}
            >
              <img
                src={`${rootPath}homehack/thumbnails/fungus-prototype-2.jpg`}
              />
            </a>
          </div>
          <div className="column">
            <a
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-camera.jpg`)}
            >
              <img src={`${rootPath}homehack/thumbnails/fungus-camera.jpg`} />
            </a>
          </div>
          <div className="column">
            <a
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-box.jpg`)}
            >
              <img src={`${rootPath}homehack/thumbnails/fungus-box.jpg`} />
            </a>
          </div>
        </div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <p>
              {richText(
                "なめこの生育を観察する定点カメラを開発した。冷暗所（玄関）での観察を可能にするため、明かりのON→撮影→OFFを自動で行ってくれるようなデバイスを作成した。",
              )}
            </p>
            <p>
              {richText(
                "ついでに、玄関の明かりのスイッチがドアから遠い問題（明かりをつけようとしている間にドアが閉まって真っ暗になる）を解決するため、このデバイスに近づくと明かりをONにして、遠ざかってしばらくするとOFFにする機能もつけた。",
              )}
            </p>
            <h3 className="ui header">{richText("開発環境")}</h3>
            <ul>
              <li>{richText("Arduino, Bash script, Java")}</li>
              <li>{richText("Mac mini")}</li>
            </ul>
            <h3 className="ui header">{richText("資料")}</h3>
            <ul>
              <li>
                {richText("ブログ記事: ")}
                <a
                  href={href(
                    "https://blog.junkato.jp/ja/posts/2012-12-18-mac-os-x-launchd/",
                  )}
                >
                  {richText("Mac OS Xでスクリプトを定期実行する")}
                </a>
              </li>
              <li>
                {richText("ソースコード: ")}
                <a href={href("https://github.com/arcatdmz/namekocam-server")}>
                  {richText("GitHub")}
                </a>
              </li>
              <li>
                {richText("半年間の全成長記録: ")}
                <a href={href("//www.youtube.com/watch?v=ggH3Y_goGtM")}>
                  {richText("YouTube")}
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            <a
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-camera-image.jpg`)}
            >
              <img src={`${rootPath}homehack/fungus-camera-image.jpg`} />
            </a>
          </div>
        </div>
        <div className="ui stackable two columns grid">
          <div className="column">
            {content.renderEmbedYoutube("//www.youtube.com/embed/6etDXqnFnSM")}
          </div>
          <div className="column">
            {content.renderEmbedYoutube("//www.youtube.com/embed/rFeTAwY_d_Y")}
          </div>
        </div>
      </SiteLayout>
    </>
  );
}
