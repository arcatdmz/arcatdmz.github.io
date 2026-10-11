import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { keyed, href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/songle-sync/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath, protocol, domain } = data;
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

  let dg: any;
  p = projectsTable["songle-sync"];
  title = p.getTitle(lang);
  me = p.project + "/";
  const slideUrl = `${protocol}://${domain}${rootPath}publications/mm2018-kato-songlesync-slides.pdf`;
  const slideImagePath = `${rootPath}songle-sync/mm2018-kato-songlesync-slides.jpg`;
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
        <div className="ui basic segment">
          <p>
            <img
              className="ui image"
              src={"/songle-sync/songlesync-platform-ja.png"}
            />
          </p>
          <p>
            {
              "Songle Syncは、ウェブ上の音楽の再生に合わせて、インターネット接続された多種多様な機器（スマートフォン、PC、フィジカルコンピューティングデバイス）を数百台以上同時制御可能な大規模音楽連動制御プラットフォームである。音楽理解技術を利用することで、好みの音楽でマルチメディア演出を駆動できる。"
            }
          </p>
          <p>
            {
              "数百台の機器を同時に駆動するために、既存手法では通常、機器同士を常時接続するアーキテクチャを採用してきた。しかし、常時接続による負荷にともなうスケーラビリティの問題と、多様なデバイスとの不安定な接続にともなうレイテンシとジッタの問題があった。これらの問題を解決するため、我々は音楽地図に基づく自律駆動アーキテクチャを提案する。本アーキテクチャでは、個々のデバイスがビートやサビなどのタイミング情報を保持し、自律的にマルチメディア演出を駆動する。"
            }
          </p>
          <p>
            {
              "Songle Sync API はこうしたマルチメディア演出をイベントドリブンのAPIで開発できるフレームワークであり、サンプルコードやインタラクティブなチュートリアルとともに開発者向けのキットとして公開されている。"
            }
          </p>
          <p>
            {
              "本プラットフォームの評価実験として、既存手法と提案するアーキテクチャ間でレイテンシ、ジッタ、ネットワーク通信量の定量比較を行った。また、100台以上の多様なデバイスを駆動する実験を行った。さらに、数百名の観客が自身のスマートフォンで演出に参加する"
            }
            <abbr title={"Bring-Your-Own-Device"}>{"BYOD"}</abbr>
            {
              '体験を提供する音楽再生に連動するWebアプリケーションを開発した。さらに、開発キットを2日間のハッカソンで実用した。これらの実験から得られた教訓を報告し、 "The Internet of Musical Things (IoMT)" の未来について議論した。'
            }
          </p>
        </div>
        <div className="ui basic center aligned segment">
          <p>
            <a
              className="ui labeled icon massive green button"
              href={"https://tutorial.songle.jp/sync"}
            >
              <i className="external icon"></i>
              {" Songle Syncを試す"}
            </a>
          </p>
        </div>
        <div className="ui divider"></div>
        <div className="ui basic segment">
          <p>
            {
              "上記は ACM Multimedia 2018 向けの論文概要を翻訳したものです。その後、 "
            }
            <a href={"https://ongaaccel.jp/"}>{"OngaACCEL"}</a>
            {
              " プロジェクトでは Songle Sync を活用した様々な実証実験を行ってきました。詳しくは "
            }
            <a href={"https://ongaaccel.jp/symposium2020/"}>
              {"OngaACCELシンポジウム2020"}
            </a>
            {" 予稿集PDFをご覧ください。"}
          </p>
          <p>
            <a
              href={
                "https://ongaaccel.jp/wp-content/uploads/2020/09/OngaACCEL20200912proceedings.pdf"
              }
            >
              <img
                className="ui image"
                src={"/songle-sync/songlesync-poster-extract.jpg"}
              />
            </a>
          </p>
          <div className="caption">
            <div className="ui horizontal list">
              <div className="item">
                <a href={"https://ongaaccel.jp/symposium2020/"}>
                  <i className="pdf file icon"></i>
                  {"OngaACCELシンポジウム2020予稿集"}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
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
              <h3 className="ui header">
                {"ACM Multimedia 2018 "}
                {en ? "Demo Video" : "デモ動画"}
              </h3>
              <EmbedYoutube src={"//www.youtube.com/embed/dErV9oZw_uQ"} />
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={"//www.youtube.com/watch?v=dErV9oZw_uQ"}>
                      <i className="youtube icon"></i>
                      {"YouTube"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {"ACM Multimedia 2018 "}
                {en ? "Slides" : "発表スライド"}
              </h3>
              <div
                className="ui embed"
                data-url={slideUrl}
                data-placeholder={slideImagePath}
                data-icon={"video play outline"}
              ></div>
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <SiteLink href={href(slideUrl)}>
                      <i className="download icon"></i>
                      {en ? "Download" : "ダウンロード"}
                    </SiteLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderRelatedProjects(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="lab icon"></i>
          <div className="content">
            {en ? "Related projects" : "関連プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          {(() => {
            const children264: ReactNode[] = [];
            children264.push(
              <>
                <ul>
                  <li>
                    {"Songle Syncの音楽理解技術は"}
                    <a href={"https://songle.jp"}>{"Songle"}</a>
                    {
                      "由来のもので、さまざまな学術論文で発表されてきた研究成果に基づいています。詳細は"
                    }
                    <a
                      href={"https://staff.aist.go.jp/m.goto/publications.html"}
                    >
                      {
                        '"Songle" キーワードで後藤真孝氏の発表文献リストから検索'
                      }
                    </a>
                    {"してみてください。"}
                  </li>
                  <li>
                    {"Songle Sync は"}
                    <a href={"https://api.songle.jp/sync"}>{"Songle API"}</a>
                    {" の一部としてリリースされています。"}
                  </li>
                  <li>
                    <a href={"https://tutorial.songle.jp/sync"}>
                      {"Songle Sync のインタラクティブチュートリアル"}
                    </a>
                    {" は DeployGround フレームワークで実装されています。"}
                  </li>
                </ul>
              </>,
            );
            dg = projectsTable["deployground"];
            children264.push(
              <>
                <div className="ui divided items projects">
                  <ProjectItem p={dg} />
                </div>
              </>,
            );
            return keyed(children264);
          })()}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero
              project={"songle-sync"}
              additionalLabels={null}
              heroImage={"https://tutorial.songle.jp/images/background.jpg"}
            />
          </>
        }
      >
        <div className="ui positive message">
          <strong>{"共同研究の成果:"}</strong>
          {" 本研究は"}
          <a href={"//staff.aist.go.jp/m.goto/MIG/index-j.html"}>
            {"メディアインタラクション研究グループ"}
          </a>
          {"における共同プロジェクトです。"}
          <a href={"//api.songle.jp/sync"}>{"Songle Syncの公式サイト"}</a>
          {"に関係者のクレジットが掲載されています。"}
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>{renderAbstract()}</section>
        <section id={"presentations"}>{renderPresentations()}</section>
        <section id={"related-projects"}>{renderRelatedProjects()}</section>
        <ProjectPublications
          project={"songle-sync"}
          majorPublication={"mm2018-kato-songlesync"}
        />
      </SiteLayout>
    </>
  );
}
