import { Embed } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { TranslateEn } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { href } from "@/site/rendering";
import type { PageDataProps } from "@/site/page-data";

import { HomehackLayout } from "@/components/homehack/HomehackLayout";
import { useSiteContext } from "@/site/components/SiteContext";

export default function Page({ pageData }: PageDataProps) {
  return (
    <HomehackLayout pageData={pageData}>
      <Content />
    </HomehackLayout>
  );
}

function Content() {
  const { rootPath, basePath, en } = useSiteContext();
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
            <Embed className="ui embed">
              <iframe
                src={"//www.slideshare.net/slideshow/embed_code/38527331"}
                frameBorder={"0"}
                marginWidth={Number("0")}
                marginHeight={Number("0")}
                scrolling={"no"}
                allowFullScreen={Boolean(true)}
              ></iframe>
            </Embed>
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
                href={"https://www.slideshare.net/arcatdmz/home-hack"}
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
      <h2 className="ui header">{en ? "Past projects" : "プロジェクト一覧"}</h2>
      <div className="ui basic segment">
        <div className="ui items">{renderProjects()}</div>
      </div>
    </>
  );
}
