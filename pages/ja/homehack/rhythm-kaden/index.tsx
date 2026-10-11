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

/** React page migrated from ja/homehack/rhythm-kaden/index.pug; edit this TSX source directly. */
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
        <div className="ui stackable grid">
          <div className="four wide column">
            <img
              className="ui fluid image"
              src={`${rootPath}homehack/rhythmkaden.jpg`}
            />
          </div>
          <div className="twelve wide column">
            <p>
              {richText(
                "ブラウザゲーム（音楽に合わせて上から降りてくるマーカーのタイミングに合わせてキーを押して得点を稼ぐ音楽ゲーム",
              )}
              <a href={href("https://peraichi.com/landing_pages/view/otoge")}>
                {richText("otoge.net")}
              </a>
              {richText(
                "）の進行を家電製品が盛り上げてくれるアプリケーションを、お茶の水女子大学 西村、神奈川工科大学 藤崎とともに提案、開発した。",
              )}
            </p>
            <p>
              {richText(
                "本アプリケーションは、Sony CSLとお茶の水女子大学の共催ワークショップ「Home Hacker’s Workshop」の半日のセッションで制作された。また、Sony CSL、大和ハウス、ヤフーの共催イベント「",
              )}
              <a
                href={href(
                  "https://www.daiwahouse.co.jp/lab/HousingAPI/symposium/index.html",
                )}
              >
                {richText("住宅をカスタマイズするためのシンポジウム")}
              </a>
              {richText("」で発表され、学生賞を受賞した。")}
            </p>
          </div>
        </div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <h3 className="ui header">{richText("開発環境")}</h3>
            <ul>
              <li>
                {richText(
                  "Java (プロキシサーバ), JavaScript (Webサービスの改造)",
                )}
              </li>
              <li>
                <a href={href("https://www.sonycsl.co.jp/tokyo/347/")}>
                  {richText("Kadecot Server")}
                </a>
                {richText(" Web API + PC or Mac")}
              </li>
            </ul>
            <h3 className="ui header">{richText("資料")}</h3>
            <ul>
              <li>
                {richText("紹介記事: ")}
                <a
                  href={href(
                    "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1185/",
                  )}
                >
                  {richText("Home Hacker's Workshop")}
                </a>
                {richText(", ")}
                <a
                  href={href(
                    "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1189/",
                  )}
                >
                  {richText("Customize YOUR House! シンポジウム")}
                </a>
              </li>
              <li>
                {richText("資料: ")}
                <a href={href(`${rootPath}homehack/rhythmkaden-poster.pdf`)}>
                  <i className="icon-file"></i>
                  {richText("ポスター")}
                </a>
                <a href={href(`${rootPath}homehack/rhythmkaden-slides.pdf`)}>
                  <i className="icon-play-circle"></i>
                  {richText("スライド")}
                </a>
              </li>
              <li>
                {richText("ソースコード: ")}
                <a href={href("https://github.com/arcatdmz/rhythmkaden-proxy")}>
                  <i className="icon-download"></i>
                  {richText("GitHub")}
                </a>
              </li>
            </ul>
            <h3 className="ui header">{richText("学生賞 選出コメント")}</h3>
            <p>
              {richText(
                "私が選出したので受賞理由を説明しますと、このシステムの真意は音ゲーで遊ばないと動作しない家電、というアプリのアイデアではなく、既存のWebアプリを特殊なプロキシサーバを介して書き換えることにより、いかなるWebアプリにも家電機能を追加できるという「家電マッシュアップ」の方式を提案したことにあります。",
              )}
            </p>
            <p>
              {richText(
                "家電を、温度や照明などの環境を変化させる演出機器だと捉えると、それは様々な(既存の)ゲームやエンタテインメントの臨場感や演出効果を高めるのに即座に応用できるでしょうし、またそういった応用は、さしたる追加の実装や新しいアイデアを必要とすることなくハイクオリティなエンタテインメントを生み出してくれることでしょう。そのような家電利用法への道を開く具体的な方法を示してくれたという点で、私はこの作品を評価しました。",
              )}
            </p>
            <p>
              <a
                href={href(
                  "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1189/",
                )}
                title={"Kadecot > Customize YOUR House! シンポジウム"}
                style={style("display: inline;")}
              >
                {richText("Kadecotブログ")}
              </a>
              {richText("より")}
            </p>
          </div>
          <div className="column">
            {content.renderEmbedYoutube("//www.youtube.com/embed/Wu3OLxEmeww")}
            <p className="caption">
              {richText(
                "「既存Webアプリと家電のマッシュアップ」プレゼンテーション動画",
              )}
            </p>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}
