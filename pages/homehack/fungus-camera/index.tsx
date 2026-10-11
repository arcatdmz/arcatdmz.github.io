import {
  EmbedYoutube,
  ProjectHeader,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { classNames, href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from homehack/fungus-camera/index.pug; edit this TSX source directly. */
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"homehack"} />
        <div className="ui secondary pointing menu">
          <SiteLink
            className={classNames(
              "item",
              typeof homehack === "undefined" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/`)}
          >
            {en ? "Overview" : "概要"}
          </SiteLink>
          <SiteLink
            className={classNames(
              "item",
              homehack === "fungus-camera" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/fungus-camera/`)}
          >
            {titles[lang]["fungus-camera"]}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {"'12-13"}
            </div>
          </SiteLink>
          <SiteLink
            className={classNames(
              "item",
              homehack === "rhythm-kaden" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/rhythm-kaden/`)}
          >
            {titles[lang]["rhythm-kaden"]}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {"'12"}
            </div>
          </SiteLink>
          <SiteLink
            className={classNames(
              "item",
              homehack === "realmote" ? "active" : undefined,
            )}
            href={href(`${basePath}homehack/realmote/`)}
          >
            {titles[lang]["realmote"]}
            <div className="ui horizontal label">
              <i className="calendar icon"></i>
              {"'11-12"}
            </div>
          </SiteLink>
        </div>
        <div className="ui stackable four columns grid">
          <div className="column">
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-prototype.jpg`)}
            >
              <img
                src={`${rootPath}homehack/thumbnails/fungus-prototype.jpg`}
              />
            </SiteLink>
          </div>
          <div className="column">
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-prototype-2.jpg`)}
            >
              <img
                src={`${rootPath}homehack/thumbnails/fungus-prototype-2.jpg`}
              />
            </SiteLink>
          </div>
          <div className="column">
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-camera.jpg`)}
            >
              <img src={`${rootPath}homehack/thumbnails/fungus-camera.jpg`} />
            </SiteLink>
          </div>
          <div className="column">
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-box.jpg`)}
            >
              <img src={`${rootPath}homehack/thumbnails/fungus-box.jpg`} />
            </SiteLink>
          </div>
        </div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <p>
              {
                "なめこの生育を観察する定点カメラを開発した。冷暗所（玄関）での観察を可能にするため、明かりのON→撮影→OFFを自動で行ってくれるようなデバイスを作成した。"
              }
            </p>
            <p>
              {
                "ついでに、玄関の明かりのスイッチがドアから遠い問題（明かりをつけようとしている間にドアが閉まって真っ暗になる）を解決するため、このデバイスに近づくと明かりをONにして、遠ざかってしばらくするとOFFにする機能もつけた。"
              }
            </p>
            <h3 className="ui header">{"開発環境"}</h3>
            <ul>
              <li>{"Arduino, Bash script, Java"}</li>
              <li>{"Mac mini"}</li>
            </ul>
            <h3 className="ui header">{"資料"}</h3>
            <ul>
              <li>
                {"ブログ記事: "}
                <a
                  href={
                    "https://blog.junkato.jp/ja/posts/2012-12-18-mac-os-x-launchd/"
                  }
                >
                  {"Mac OS Xでスクリプトを定期実行する"}
                </a>
              </li>
              <li>
                {"ソースコード: "}
                <a href={"https://github.com/arcatdmz/namekocam-server"}>
                  {"GitHub"}
                </a>
              </li>
              <li>
                {"半年間の全成長記録: "}
                <a href={"//www.youtube.com/watch?v=ggH3Y_goGtM"}>
                  {"YouTube"}
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}homehack/fungus-camera-image.jpg`)}
            >
              <img src={`${rootPath}homehack/fungus-camera-image.jpg`} />
            </SiteLink>
          </div>
        </div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <EmbedYoutube src={"//www.youtube.com/embed/6etDXqnFnSM"} />
          </div>
          <div className="column">
            <EmbedYoutube src={"//www.youtube.com/embed/rFeTAwY_d_Y"} />
          </div>
        </div>
      </SiteLayout>
    </>
  );
}
