import { Embed, Popup } from "@/site/components/SiteWidgets";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/textalive/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
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

  p = projectsTable["textalive"];
  title = p.getTitle(lang);
  me = p.project + "/";
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
  function renderNews(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          <div className="content">{en ? "News" : "ニュース"}</div>
        </h2>
        <div className="ui basic segment">
          <div className="ui divided small feed">
            <div className="event">
              <div className="content">
                <div className="date">{"2021/-/-"}</div>
                <div className="summary">
                  {"最新情報は"}
                  <a href={"https://textalive.jp/events"}>
                    {"TextAliveの活用事例を紹介したイベントページ"}
                  </a>
                  {"や"}
                  <a
                    href={
                      "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
                    }
                  >
                    {"更新履歴"}
                  </a>
                  {"、後続研究「"}
                  <SiteLink href={href(`${basePath}lyric-app-framework`)}>
                    {"Lyric App Framework"}
                  </SiteLink>
                  {"」をご覧ください。"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2020/9/18"}</div>
                <div className="summary">
                  {
                    "TextAliveの機能を使って音楽に合わせてタイミングよく歌詞が動くWebアプリケーション（リリックアプリ）を開発できるJavaScript用のライブラリ「"
                  }
                  <a href={"https://developer.textalive.jp/"}>
                    {"TextAlive App "}
                    <abbr title={"Application Programming Interface"}>
                      {"API"}
                    </abbr>
                    {"」"}
                  </a>
                  {"がリリースされました。また、"}
                  <a
                    href={
                      "https://developer.textalive.jp/events/magicalmirai2020"
                    }
                  >
                    {"初音ミク「マジカルミライ 2020」"}
                  </a>
                  {
                    "で、同APIを利用した、イベント史上初のプログラミング・コンテストの実施が発表されました。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2019/11/13"}</div>
                <div className="summary">
                  <a href={"https://www.morisawa.co.jp/about/news/4707"}>
                    {"モリサワ株式会社のInter BEE 2019出展ブース"}
                  </a>
                  {"で、TextAliveのデモ映像が展示されました。"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2019/9/6"}</div>
                <div className="summary">
                  <a
                    href={
                      "https://prtimes.jp/main/html/rd/p/000000002.000045795.html"
                    }
                  >
                    {
                      "舞台美術を手がける「シミズオクト」がプロデュースする「ジュリアナの祟り」ライブ"
                    }
                  </a>
                  {
                    "で、アーティスト自身がTextAliveを活用して制作した歌詞アニメーションが紗幕に上映されました。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2019/6/17"}</div>
                <div className="summary">
                  <a href={"https://textalive.jp/events/magicalmirai2019"}>
                    {"初音ミク「マジカルミライ 2019」"}
                  </a>
                  {
                    "でTextAliveを活用して制作した歌詞アニメーションが使われ、TextAlive講座が開かれました。企画展ステージでもTextAlive制作映像が使われました。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2019/2/8"}</div>
                <div className="summary">
                  {
                    "SNOW MIKU LIVE! 2019でTextAliveを使って制作した歌詞アニメーションが使われました。これにあわせて"
                  }
                  <a href={"https://docs.textalive.jp/history/"}>{"v0.7.0"}</a>
                  {
                    "をリリースし、「カラフルキャンバス」スタイルを追加しました。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2018/8/20"}</div>
                <div className="summary">
                  <a href={"https://docs.textalive.jp/magicalmirai2018"}>
                    {"初音ミク「マジカルミライ 2018」"}
                  </a>
                  {
                    "でTextAliveを使って制作した歌詞アニメーションが使われる他、TextAlive講座が開かれます。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2018/2/10"}</div>
                <div className="summary">
                  <a href={"https://docs.textalive.jp/snowmiku2018"}>
                    {"SNOW MIKU LIVE! 2018"}
                  </a>
                  {
                    "でTextAliveを使って制作した歌詞アニメーションが使われました。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2016/10/16"}</div>
                <div className="summary">
                  <a href={"https://docs.textalive.jp/nomaps2016/"}>
                    {"No Maps 2016"}
                  </a>
                  {
                    "のIDOL DIVERSITYでTextAliveを使って制作した歌詞アニメーションが使われたほか、デモ展示を行い、piaproユーザ向けに動画のダウンロード機能をリリースしました。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2016/2/5"}</div>
                <div className="summary">
                  <a href={"http://textalive.jp/snowmiku2016"}>
                    {"SNOW MIKU 2016とのタイアップ企画"}
                  </a>
                  {
                    "でイラストと一緒に歌詞アニメーションを楽しめるようになりました。"
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2015/9/8"}</div>
                <div className="summary">
                  {"本研究は"}
                  <a
                    href={
                      "https://www.aist.go.jp/aist_j/press_release/pr2015/pr20150908/pr20150908.html"
                    }
                  >
                    {"プレスリリース"}
                  </a>
                  {"と同時に"}
                  <a href={"https://textalive.jp"}>
                    {"Webサービスとして一般公開"}
                  </a>
                  {"を始めました。ぜひお試しください。"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">{en ? "Abstract" : "概要"}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "Kinetic Typographyは、文字を動かして見せることで意味をより深く伝えられる手法として、楽曲のプロモーションなどの動画で頻繁に利用されている。しかし、歌詞を楽曲と同期してアニメーションさせる動画を制作するためには、まず、動画制作ツールの使い方に慣れる必要があった。さらに、歌詞を文字ごとに時刻同期させて動きを手付けするため、多くの手間がかかっていた。"
            }
          </p>
          <p>
            {
              "TextAliveは、ウェブ上に公開されている楽曲と歌詞の時間的対応付けを自動で推定し、Kinetic Typographyを用いた動画を自動生成する。したがって、事前にツールの使い方を学ばなくても、好みの楽曲のKinetic Typography動画を楽しむことができる。また、生成された動画をウェブ上のグラフィカルなインタフェースで編集でき、一から動画を作るより大幅に少ない手間で動画を制作できる。さらに、文字の動きを定めているアルゴリズムをその場でプログラミングでき、プリセットのテンプレートに縛られない自由な表現が可能である。"
            }
          </p>
          <div className="ui message">
            {"本研究は、 2015/9/8 に"}
            <a
              href={
                "https://www.aist.go.jp/aist_j/press_release/pr2015/pr20150908/pr20150908.html"
              }
            >
              {"プレスリリース"}
            </a>
            {"と同時に、リリックビデオの制作支援Webサービス「"}
            <a href={"https://textalive.jp"}>{"TextAlive"}</a>
            {"」として一般公開されました。最新情報は"}
            <a href={"https://textalive.jp/events"}>
              {"TextAliveの活用事例を紹介したイベントページ"}
            </a>
            {"や"}
            <a
              href={
                "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
              }
            >
              {"更新履歴のページ"}
            </a>
            {"をご覧ください。"}
          </div>
          <div className="ui message">
            {"2020/9/18 には、開発者向けに「"}
            <a href={"https://developer.textalive.jp"}>
              {"TextAlive App "}
              <abbr title={"Application Programming Interface"}>{"API"}</abbr>
            </a>
            {
              "」がリリースされました。インタラクティブな歌詞駆動メディア「リリックアプリ」を開発できます。"
            }
            {"\n"}
            {"詳しくは、リリックアプリの開発フレームワーク「"}
            <SiteLink href={href(`${basePath}lyric-app-framework`)}>
              {"Lyric App Framework"}
            </SiteLink>
            {"」の研究紹介をご覧ください。"}
          </div>
        </div>
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {en ? "Presentation materials" : "発表内容"}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">{"CHI 2015 Fast-forward"}</h3>
              <EmbedYoutube src={"//www.youtube.com/embed/lOdt-pf5U8Q"} />
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={"//www.youtube.com/watch?v=lOdt-pf5U8Q"}>
                      <i className="youtube icon"></i>
                      {"Fast-forward"}
                    </a>
                  </div>
                  <div className="item">
                    <a href={"//www.youtube.com/watch?v=ofczPQZaWMk"}>
                      <i className="youtube icon"></i>
                      {"Full version"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {"CHI 2015 "}
                {en ? "Slides" : "発表スライド"}
              </h3>

              <Embed
                className="ui embed"
                data-url={publicationsTable[p.publication].entryTags.slides}
                data-placeholder={`${rootPath}images/background-eee.png`}
                data-icon={"video play outline"}
              ></Embed>

              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <SiteLink
                      href={href(
                        publicationsTable[p.publication].entryTags.slides,
                      )}
                    >
                      <i className="download icon"></i>
                      {en ? "Download" : "ダウンロード"}
                    </SiteLink>
                  </div>
                </div>
              </div>

              {!en ? (
                <>
                  <p className="caption">
                    {"日本語の発表スライドは"}
                    <a href={"#publications"}>
                      <i className="book icon"></i>
                      {"発表文献"}
                    </a>
                    {"で日本語文献の "}
                    <i className="sidebar fitted icon"></i>
                    {" をクリックすると閲覧できます。"}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderExamples(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Example videos" : "作例"}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {en ? "TextAlive Online" : "Web版"}
                <div className="ui tiny label">
                  <i className="calendar icon"></i>
                  <span>{"2015-"}</span>
                </div>
              </h3>

              <EmbedYoutube
                src={
                  "https://www.youtube.com/embed/videoseries?list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                }
              />

              {!en ? (
                <>
                  <p className="caption">
                    {
                      "Web版のTextAliveは現在も開発が続けられています。この作例は、初音ミクやアイドルのライブなどで利用されたものです。 "
                    }
                    <a href={"https://textalive.jp"}>{"textalive.jp"}</a>
                    {" にアクセスすれば、誰でも動画を制作できます。"}
                  </p>
                </>
              ) : null}
            </div>
            <div className="column">
              <h3 className="ui header">
                {en ? "TextAlive Desktop" : "デスクトップ版"}
                <div className="ui tiny label">
                  <i className="calendar icon"></i>
                  <span>{"2014-2015"}</span>
                </div>
              </h3>

              <EmbedYoutube src={"https://www.youtube.com/embed/ofczPQZaWMk"} />

              {!en ? (
                <>
                  <p className="caption">
                    {
                      "デスクトップ版のTextAliveは研究用プロトタイプとして開発されました。この作例は、プログラマや音楽動画制作者の方々を対象としたユーザスタディなどで制作されたものです。"
                    }
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="gift icon"></i>
          <div className="content">
            {en ? "Relevant projects" : "関連プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          <div className="ui segment">
            <div className="ui divided items projects">
              <ProjectItem p={projectsTable["lyric-app-framework"]} />
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project={"textalive"} />
          </>
        }
        postFooter={
          <>
            <Popup className="ui hidden popup-menu popup" position="top left" trigger={<a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>}>
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#abstract"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{en ? "Abstract" : "概要"}</div>
                </a>
                <a className="item" href={"#presentations"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Presentations" : "発表内容"}
                  </div>
                </a>
                <a className="item" href={"#examples"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Example videos" : "作例"}
                  </div>
                </a>
                <a className="item" href={"#publications"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Publications" : "発表文献"}
                  </div>
                </a>
                <a className="item" href={"#further-readings"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </div>
                </a>
              </div>
            </Popup>
          </>
        }
      >
        <div className="with-rail">
          <div className="right-rail">
            <section id={"news"}>{renderNews()}</section>
          </div>
          <div className="left-content">
            <section id={"abstract"}>{renderAbstract()}</section>
            <div className="ui basic right aligned segment">
              <a className="ui primary button" href={"//textalive.jp"}>
                <i className="external icon"></i>
                {en ? "Service Website" : "Webサイトへ"}
              </a>
            </div>
            <div className="ui hidden divider"></div>
            <section id={"presentations"}>{renderPresentations()}</section>
          </div>
          <div className="ui hidden divider"></div>
          <section id={"examples"}>{renderExamples()}</section>
        </div>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"textalive"}
          majorPublication={"chi2015-kato-textalive"}
        />
        <div className="ui hidden divider"></div>
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/textalive/", {"projects": ["creativity-support-environments", "lyric-app-framework", "textalive"], "publications": ["chi2015-kato-textalive"], "publicationProjects": ["textalive"]}) }, "/ja/textalive/") };
}
