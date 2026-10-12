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

/** React page migrated from ja/homehack/rhythm-kaden/index.pug; edit this TSX source directly. */
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
  homehack = "rhythm-kaden";
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
        <div className="ui stackable grid">
          <div className="four wide column">
            <SiteImage
              className="ui fluid image"
              src={`${rootPath}homehack/rhythmkaden.jpg`}
            />
          </div>
          <div className="twelve wide column">
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
          </div>
        </div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <h3 className="ui header">{"開発環境"}</h3>
            <ul>
              <li>{"Java (プロキシサーバ), JavaScript (Webサービスの改造)"}</li>
              <li>
                <a href={"https://www.sonycsl.co.jp/tokyo/347/"}>
                  {"Kadecot Server"}
                </a>
                {" Web API + PC or Mac"}
              </li>
            </ul>
            <h3 className="ui header">{"資料"}</h3>
            <ul>
              <li>
                {"紹介記事: "}
                <a
                  href={
                    "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1185/"
                  }
                >
                  {"Home Hacker's Workshop"}
                </a>
                {", "}
                <a
                  href={
                    "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1189/"
                  }
                >
                  {"Customize YOUR House! シンポジウム"}
                </a>
              </li>
              <li>
                {"資料: "}
                <SiteLink
                  href={href(`${rootPath}homehack/rhythmkaden-poster.pdf`)}
                >
                  <i className="icon-file"></i>
                  {"ポスター"}
                </SiteLink>
                <SiteLink
                  href={href(`${rootPath}homehack/rhythmkaden-slides.pdf`)}
                >
                  <i className="icon-play-circle"></i>
                  {"スライド"}
                </SiteLink>
              </li>
              <li>
                {"ソースコード: "}
                <a href={"https://github.com/arcatdmz/rhythmkaden-proxy"}>
                  <i className="icon-download"></i>
                  {"GitHub"}
                </a>
              </li>
            </ul>
            <h3 className="ui header">{"学生賞 選出コメント"}</h3>
            <p>
              {
                "私が選出したので受賞理由を説明しますと、このシステムの真意は音ゲーで遊ばないと動作しない家電、というアプリのアイデアではなく、既存のWebアプリを特殊なプロキシサーバを介して書き換えることにより、いかなるWebアプリにも家電機能を追加できるという「家電マッシュアップ」の方式を提案したことにあります。"
              }
            </p>
            <p>
              {
                "家電を、温度や照明などの環境を変化させる演出機器だと捉えると、それは様々な(既存の)ゲームやエンタテインメントの臨場感や演出効果を高めるのに即座に応用できるでしょうし、またそういった応用は、さしたる追加の実装や新しいアイデアを必要とすることなくハイクオリティなエンタテインメントを生み出してくれることでしょう。そのような家電利用法への道を開く具体的な方法を示してくれたという点で、私はこの作品を評価しました。"
              }
            </p>
            <p>
              <a
                href={
                  "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1189/"
                }
                title={"Kadecot > Customize YOUR House! シンポジウム"}
                style={{ display: "inline" }}
              >
                {"Kadecotブログ"}
              </a>
              {"より"}
            </p>
          </div>
          <div className="column">
            <EmbedYoutube src={"//www.youtube.com/embed/Wu3OLxEmeww"} />
            <p className="caption">
              {"「既存Webアプリと家電のマッシュアップ」プレゼンテーション動画"}
            </p>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/homehack/rhythm-kaden/", {"projects": ["homehack"], "publicationProjects": ["homehack"]}) }, "/ja/homehack/rhythm-kaden/") };
}
