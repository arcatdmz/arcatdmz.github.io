import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { classNames, href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from homehack/realmote/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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
        <h3 className="ui header">{"概要"}</h3>
        <div className="ui stackable two columns grid">
          <div className="column">
            <p>
              {
                "スマートフォンやタブレット端末のWebブラウザから、電灯やエアコン、自動掃除機ルンバなどの家電製品を遠隔操作できるようにした。"
              }
            </p>
            <h3 className="ui header">{"開発環境"}</h3>
            <ul>
              <li>
                {"Java + "}
                <SiteLink href={href(`${rootPath}ja/phybots/`)}>
                  {"Phybots"}
                </SiteLink>
                {" on Mac OS X"}
              </li>
              <li>
                <a
                  href={"https://www.buffalo.jp/product/detail/pc-op-rs1.html"}
                >
                  {"パソコン用学習リモコン PC-OP-RS1"}
                </a>
              </li>
              <li>
                <a href={"https://www.sparkfun.com/products/684"}>
                  {"ルンバ用Bluetoothインタフェース RooTooth"}
                </a>
              </li>
            </ul>
            <h3 className="ui header">{"資料"}</h3>
            <ul>
              <li>
                {"ブログ記事: "}
                <a
                  href={
                    "https://blog.junkato.jp/ja/posts/2012-12-24-realmote-remote-control/"
                  }
                >
                  {"Realmoteで家のリモコンを一つにまとめる"}
                </a>
              </li>
              <li>
                {"ソースコード: "}
                <a href={"https://github.com/arcatdmz/realmote"}>
                  <i className="icon-download"></i>
                  {"GitHub"}
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            <EmbedYoutube src={"//www.youtube.com/embed/bhbW39zoxyg"} />
          </div>
          <div className="column">
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}homehack/realmote-edit.jpg`)}
            >
              <SiteImage src={`${rootPath}homehack/thumbnails/realmote-edit.jpg`} />
            </SiteLink>
          </div>
          <div className="column">
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}homehack/realmote.jpg`)}
            >
              <SiteImage src={`${rootPath}homehack/thumbnails/realmote.jpg`} />
            </SiteLink>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/homehack/realmote/", {"projects": ["homehack"], "publicationProjects": ["homehack"]}) }, "/homehack/realmote/") };
}
