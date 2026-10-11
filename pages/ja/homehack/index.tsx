import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/homehack/index.pug; edit this TSX source directly. */
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
  function renderProjects(): ReactNode {
    return (
      <>
        <div className="item">
          <a className="image" href={href(`${basePath}homehack/fungus-camera/`)}>
            <img src={`${rootPath}homehack/thumbnails/fungus-box.jpg`} />
          </a>
          <div className="content">
            <a className="header" href={href(`${basePath}homehack/fungus-camera/`)}>
              {plainText(en ? "Fungus Camera" : "なめこカメラ")}
            </a>
            <div className="description">
              {(() => {
                const children206: ReactNode[] = [];
                children206.push(
                  <>
                    <p>
                      {richText(
                        "なめこの生育を観察する定点カメラを開発した。冷暗所（玄関）での観察を可能にするため、明かりのON→撮影→OFFを自動で行ってくれるようなデバイスを作成した。",
                      )}
                    </p>
                  </>,
                );
                children206.push(
                  <>
                    <p>
                      {richText(
                        "ついでに、玄関の明かりのスイッチがドアから遠い問題（明かりをつけようとしている間にドアが閉まって真っ暗になる）を解決するため、このデバイスに近づくと明かりをONにして、遠ざかってしばらくするとOFFにする機能もつけた。",
                      )}
                    </p>
                  </>,
                );
                if (en) {
                  children206.push(
                    <>
                      <p>{content.renderTranslateEn("homehack/index.pug")}</p>
                    </>,
                  );
                }
                return keyed(children206);
              })()}
            </div>
            <div className="extra">
              <div className="ui horizontal label">
                <i className="calendar icon"></i>
                {richText("'12-13")}
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div className="item">
          <a className="image" href={href(`${basePath}homehack/rhythm-kaden/`)}>
            <img src={`${rootPath}homehack/rhythmkaden.jpg`} />
          </a>
          <div className="content">
            <a className="header" href={href(`${basePath}homehack/rhythm-kaden/`)}>
              {plainText(en ? "Rhythm-Kaden" : "リズム家電")}
            </a>
            <div className="description">
              {(() => {
                const children207: ReactNode[] = [];
                children207.push(
                  <>
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
                  </>,
                );
                children207.push(
                  <>
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
                  </>,
                );
                if (en) {
                  children207.push(
                    <>
                      <p>{content.renderTranslateEn("homehack/index.pug")}</p>
                    </>,
                  );
                }
                return keyed(children207);
              })()}
            </div>
            <div className="extra">
              <div className="ui horizontal label">
                <i className="calendar icon"></i>
                {richText("'12")}
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div className="item">
          <a className="image" href={href(`${basePath}homehack/realmote/`)}>
            <img src={`${rootPath}homehack/thumbnails/realmote.jpg`} />
          </a>
          <div className="content">
            <a className="header" href={href(`${basePath}homehack/realmote/`)}>
              {richText("Realmote")}
            </a>
            <div className="description">
              {(() => {
                const children208: ReactNode[] = [];
                children208.push(
                  <>
                    <p>
                      {richText(
                        "スマートフォンやタブレット端末のWebブラウザから、電灯やエアコン、自動掃除機ルンバなどの家電製品を遠隔操作できるようにした。",
                      )}
                    </p>
                  </>,
                );
                if (en) {
                  children208.push(
                    <>
                      <p>{content.renderTranslateEn("homehack/index.pug")}</p>
                    </>,
                  );
                }
                return keyed(children208);
              })()}
            </div>
            <div className="extra">
              <div className="ui horizontal label">
                <i className="calendar icon"></i>
                {richText("'11-12")}
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
        <h2 className="ui header">
          {(() => {
            const children209: ReactNode[] = [];
            if (en) {
              children209.push(<>{richText("Keynote speech at Home Hack Workshop")}</>);
              children209.push(
                <>
                  <div className="sub header">
                    {richText("Japanese presentation at the domestic workshop")}
                  </div>
                </>,
              );
            } else {
              children209.push(<>{richText("おうちハック発表会キーノートスピーチ")}</>);
            }
            return keyed(children209);
          })()}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable grid">
            <div className="six wide column">
              <div className="ui embed">
                <iframe
                  src={"//www.slideshare.net/slideshow/embed_code/38527331"}
                  frameBorder={"0"}
                  marginWidth={Number("0")}
                  marginHeight={Number("0")}
                  scrolling={"no"}
                  allowFullScreen={Boolean(true)}
                ></iframe>
              </div>
            </div>
            <div className="ten wide column">
              {(() => {
                const children210: ReactNode[] = [];
                children210.push(
                  <>
                    <p>
                      {richText("Sony CSL大和田さんとPhysVis湯村さん主催のイベント「")}
                      <a
                        href={href(
                          "https://web.archive.org/web/20170625152327/http://kadecot.net/ouch-hack/",
                        )}
                      >
                        {richText("おうちハック発表会")}
                      </a>
                      {richText("」でキーノートスピーカーを拝命し、「")}
                      <a
                        href={href("https://www.slideshare.net/arcatdmz/home-hack")}
                        title={"もっとおうちハックできるおうち開発環境に向けて─おうちハック事例集─"}
                        target={"_blank"}
                      >
                        {richText(
                          "もっとおうちハックできるおうち開発環境に向けて─おうちハック事例集─",
                        )}
                      </a>
                      {richText("」と題してこれまでの家ハック事例をまとめてご紹介しました。")}
                    </p>
                  </>,
                );
                children210.push(
                  <>
                    <p>
                      {richText("ご紹介したプロジェクトはほとんど")}
                      <a href={href("https://github.com/arcatdmz")}>{richText("GitHub")}</a>
                      {richText("上でソースコードが公開されています。みんなでHappy home hacking!")}
                    </p>
                  </>,
                );
                if (en) {
                  children210.push(
                    <>
                      <p>{content.renderTranslateEn("homehack/index.pug")}</p>
                    </>,
                  );
                }
                return keyed(children210);
              })()}
            </div>
          </div>
        </div>
        <h2 className="ui header">{plainText(en ? "Past projects" : "プロジェクト一覧")}</h2>
        <div className="ui basic segment">
          <div className="ui items">{renderProjects()}</div>
        </div>
      </SiteLayout>
    </>
  );
}
