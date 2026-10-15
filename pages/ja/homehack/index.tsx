import { SiteImage } from "@/site/components/SiteImage";
import {
  ProjectHeader,
  TranslateEn,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { classNames, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/homehack/index.pug; edit this TSX source directly. */
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

  p = projectsTable["homehack"];
  var homehack;
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
  function renderProjects(): ReactNode {
    return (
      <>
        <div className="item">
          <SiteLink
            className="image"
            href={href(`${basePath}homehack/fungus-camera/`)}
          >
            <SiteImage src={`${rootPath}homehack/thumbnails/fungus-box.jpg`} />
          </SiteLink>
          <div className="content">
            <SiteLink
              className="header"
              href={href(`${basePath}homehack/fungus-camera/`)}
            >
              {en ? "Fungus Camera" : "なめこカメラ"}
            </SiteLink>
            <div className="description">
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

              {en ? (
                <>
                  <p>
                    <TranslateEn path={"homehack/index.pug"} />
                  </p>
                </>
              ) : null}
            </div>
            <div className="extra">
              <div className="ui horizontal label">
                <i className="calendar icon"></i>
                {"'12-13"}
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div className="item">
          <SiteLink
            className="image"
            href={href(`${basePath}homehack/rhythm-kaden/`)}
          >
            <SiteImage src={`${rootPath}homehack/rhythmkaden.jpg`} />
          </SiteLink>
          <div className="content">
            <SiteLink
              className="header"
              href={href(`${basePath}homehack/rhythm-kaden/`)}
            >
              {en ? "Rhythm-Kaden" : "リズム家電"}
            </SiteLink>
            <div className="description">
              <p>
                {
                  "ブラウザゲーム（音楽に合わせて上から降りてくるマーカーのタイミングに合わせてキーを押して得点を稼ぐ音楽ゲーム"
                }
                <a href={"https://peraichi.com/landing_pages/view/otoge"}>
                  {"otoge.net"}
                </a>
                {
                  "）の進行を家電製品が盛り上げてくれるアプリケーションを、お茶の水女子大学 西村、神奈川工科大学 藤崎とともに提案、開発した。"
                }
              </p>

              <p>
                {
                  "本アプリケーションは、Sony CSLとお茶の水女子大学の共催ワークショップ「Home Hacker’s Workshop」の半日のセッションで制作された。また、Sony CSL、大和ハウス、ヤフーの共催イベント「"
                }
                <a
                  href={
                    "https://www.daiwahouse.co.jp/lab/HousingAPI/symposium/index.html"
                  }
                >
                  {"住宅をカスタマイズするためのシンポジウム"}
                </a>
                {"」で発表され、学生賞を受賞した。"}
              </p>

              {en ? (
                <>
                  <p>
                    <TranslateEn path={"homehack/index.pug"} />
                  </p>
                </>
              ) : null}
            </div>
            <div className="extra">
              <div className="ui horizontal label">
                <i className="calendar icon"></i>
                {"'12"}
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div className="item">
          <SiteLink
            className="image"
            href={href(`${basePath}homehack/realmote/`)}
          >
            <SiteImage src={`${rootPath}homehack/thumbnails/realmote.jpg`} />
          </SiteLink>
          <div className="content">
            <SiteLink
              className="header"
              href={href(`${basePath}homehack/realmote/`)}
            >
              {"Realmote"}
            </SiteLink>
            <div className="description">
              <p>
                {
                  "スマートフォンやタブレット端末のWebブラウザから、電灯やエアコン、自動掃除機ルンバなどの家電製品を遠隔操作できるようにした。"
                }
              </p>

              {en ? (
                <>
                  <p>
                    <TranslateEn path={"homehack/index.pug"} />
                  </p>
                </>
              ) : null}
            </div>
            <div className="extra">
              <div className="ui horizontal label">
                <i className="calendar icon"></i>
                {"'11-12"}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
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
        <h2 className="ui header">
          {en ? (
            <>
              {"Keynote speech at Home Hack Workshop"}

              <div className="sub header">
                {"Japanese presentation at the domestic workshop"}
              </div>
            </>
          ) : (
            <>{"おうちハック発表会キーノートスピーチ"}</>
          )}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable grid">
            <div className="six wide column">
              <a href={rootPath + "slides/home-hack.pdf"}>
                <SiteImage
                  src={rootPath + "slides/home-hack.png"}
                  alt="もっとおうちハックできるおうち開発環境に向けて"
                  className="ui fluid image"
                />
                {en ? "Open presentation (PDF)" : "発表スライドを開く (PDF)"}
              </a>
            </div>
            <div className="ten wide column">
              <p>
                {"Sony CSL大和田さんとPhysVis湯村さん主催のイベント「"}
                <a
                  href={
                    "https://web.archive.org/web/20170625152327/http://kadecot.net/ouch-hack/"
                  }
                >
                  {"おうちハック発表会"}
                </a>
                {"」でキーノートスピーカーを拝命し、「"}
                <a
                  href={rootPath + "slides/home-hack.pdf"}
                  title={
                    "もっとおうちハックできるおうち開発環境に向けて─おうちハック事例集─"
                  }
                  target={"_blank"}
                >
                  {
                    "もっとおうちハックできるおうち開発環境に向けて─おうちハック事例集─"
                  }
                </a>
                {"」と題してこれまでの家ハック事例をまとめてご紹介しました。"}
              </p>

              <p>
                {"ご紹介したプロジェクトはほとんど"}
                <a href={"https://github.com/arcatdmz"}>{"GitHub"}</a>
                {
                  "上でソースコードが公開されています。みんなでHappy home hacking!"
                }
              </p>

              {en ? (
                <>
                  <p>
                    <TranslateEn path={"homehack/index.pug"} />
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <h2 className="ui header">
          {en ? "Past projects" : "プロジェクト一覧"}
        </h2>
        <div className="ui basic segment">
          <div className="ui items">{renderProjects()}</div>
        </div>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/homehack/", {
          projects: ["homehack"],
          publicationProjects: ["homehack"],
        }),
      },
      "/ja/homehack/",
    ),
  };
}
