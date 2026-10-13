import { Popup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  ProjectHero,
  ProjectPublications,
} from "@/site/components/ContentComponents";

import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/tweeq/index.pug; edit this TSX source directly. */
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

  p = projectsTable["tweeq"];
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

  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project={"tweeq"} />
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
                <a className="item" href={"#implementation"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Reference implementation" : "リファレンス実装"}
                  </div>
                </a>
              </div>
            </Popup>
          </>
        }
      >
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "コンテンツ創作の現場で利用される制作ツールは、プリミティブ型のパラメタを調整するために数値スライダーやツマミ型のインタフェース、カラーピッカーなどのGUIウィジェットを数多く備えている。こうしたウィジェットはプロの実践において重要な役割を果たしているにも関わらず、Human-Computer Interaction分野の研究においてそうしたウィジェットの設計は「解決済み」と見なされがちで、クリエータの不満が見過ごされてきた面がある。"
              }
            </p>
            <p>
              {
                "本研究では、市販の一般的な制作ツールに実装されたGUIウィジェットの実例を収集し、インタラクション設計を分析し、プロのクリエータ向けのウィジェット設計に関する3原則を導出した:"
              }
            </p>
            <ul>
              <li>
                {
                  "ユーザの繊細な制御戦略に応えるために、多様な入力モードを併存させること"
                }
              </li>
              <li>
                {
                  "熟達したユーザ向けに、高速で高精度なインタラクション設計を優先すること"
                }
              </li>
              <li>
                {
                  "作業空間を確保するために、ウィジェットの専有面積をできるだけ抑えること"
                }
              </li>
            </ul>
            <p>
              {
                "そして、これらの原則に基づくリファレンス実装としてGUIウィジェット群 "
              }
              <i>{"Tweeq"}</i>
              {" を開発した。 "}
              <i>{"Tweeq"}</i>
              {
                " は第一著者によるアニメーション制作の実践と並行して実装され、少ないクリック回数でのパラメタ調整、オーバーレイ表示による継続的な視覚フィードバック、常時注視を必要としないジェスチャやキーボード入力のサポートといった特徴を備える。"
              }
            </p>
            <p>
              <i>{"Tweeq"}</i>
              {
                " を用いたサンプルアプリケーションを実装し、プロユーザによる簡易評価を行ったところ、おおむね好意的な反応が得られ、提案した3原則が制作ツールのためのGUI開発において有用であることが示唆された。"
              }
            </p>
          </div>
          <div className="ui basic segment">
            <p>
              <SiteImage
                className="ui fluid image"
                src={`${rootPath}tweeq/tweeq.png`}
              />
            </p>
            <p className="caption">
              <i>{"Tweeq"}</i>
              {" は本論文で提案した制作ツール向けGUIウィジェット群である。"}
              <strong>{"(a)"}</strong> <i>{"Tweeq"}</i>
              {" が提供するコンポーネントの一覧。"}
              <strong>{"(b)"}</strong>
              {" カラーピッカーとオーバーレイ表示。"}
              <strong>{"(c)"}</strong>
              {" オーバーレイ表示を備えたタイムコード入力インタフェース。"}
              <strong>{"(d)"}</strong>
              {" 角度入力インタフェースを同時調整する様子。"}
            </p>
            <p>
              {
                "*第一著者の橋本は、産総研の協力研究員（論文メタデータの所属）としてだけでなく、独立したビジュアルアーティストとして本研究に取り組んだ。"
              }
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"implementation"}>
          <h2>
            <i className="github icon"></i>
            {en ? "Reference implementation" : "リファレンス実装"}
          </h2>
          <div className="ui basic segment">
            <p>
              {" "}
              {
                "本論文におけるプロのクリエータ向けのウィジェット設計に関する3原則に基づくリファレンス実装 "
              }
              <i>{"Tweeq"}</i>
              {" は Vue.js と TypeScript で開発され、 "}
              <a href={"//github.com/baku89/tweeq"}>
                <i className="github icon"></i>
                {"GitHub"}
              </a>
              {" でオープンソース公開されている。"}
            </p>
          </div>
          <div className="ui basic center aligned segment">
            <div className="ui huge buttons">
              <a
                className="ui primary button"
                href={"//github.com/baku89/tweeq"}
              >
                {en ? "Code" : "ソースコード"}
              </a>
              <div className="ui divider"></div>
              <a className="ui button" href={"//baku89.github.io/tweeq"}>
                {en ? "Documents" : "デモ"}
              </a>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"revision"}>
          <h2>
            <i className="announcement icon"></i>
            {en ? "Revision history" : "更新履歴"}
          </h2>
          <div className="ui basic segment">
            <div className="ui divided feed">
              <div className="event">
                <div className="content">
                  <div className="date">{"8/1/2025"}</div>
                  <div className="summary">
                    <a href={"https://uist.acm.org/2025/program.html"}>
                      {"UIST採択論文一覧の仮公開"}
                    </a>
                    {"を受けて本ページの初版を掲載"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"tweeq"}
          majorPublication={"uist2025-hashimoto-tweeq"}
        />
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/tweeq/", {"projects": ["tweeq"], "publications": ["uist2025-hashimoto-tweeq"], "publicationProjects": ["tweeq"]}) }, "/ja/tweeq/") };
}
