import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/tweeq/index.pug; edit this TSX source directly. */
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

  p = projectsTable["tweeq"];
  title = p.getTitle(lang);
  me = p.project + "/";
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
      <SiteLayout
        context={context}
        mainHero={<>{content.renderProjectHero("tweeq")}</>}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{plainText(en ? "Top" : "トップ")}</div>
                </a>
                <a className="item" href={href("#abstract")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </a>
                <a className="item" href={href("#implementation")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Reference implementation" : "リファレンス実装")}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "コンテンツ創作の現場で利用される制作ツールは、プリミティブ型のパラメタを調整するために数値スライダーやツマミ型のインタフェース、カラーピッカーなどのGUIウィジェットを数多く備えている。こうしたウィジェットはプロの実践において重要な役割を果たしているにも関わらず、Human-Computer Interaction分野の研究においてそうしたウィジェットの設計は「解決済み」と見なされがちで、クリエータの不満が見過ごされてきた面がある。",
              )}
            </p>
            <p>
              {richText(
                "本研究では、市販の一般的な制作ツールに実装されたGUIウィジェットの実例を収集し、インタラクション設計を分析し、プロのクリエータ向けのウィジェット設計に関する3原則を導出した:",
              )}
            </p>
            <ul>
              <li>
                {richText("ユーザの繊細な制御戦略に応えるために、多様な入力モードを併存させること")}
              </li>
              <li>
                {richText("熟達したユーザ向けに、高速で高精度なインタラクション設計を優先すること")}
              </li>
              <li>
                {richText("作業空間を確保するために、ウィジェットの専有面積をできるだけ抑えること")}
              </li>
            </ul>
            <p>
              {richText(
                "そして、これらの原則に基づくリファレンス実装としてGUIウィジェット群 <i>Tweeq</i> を開発した。 <i>Tweeq</i> は第一著者によるアニメーション制作の実践と並行して実装され、少ないクリック回数でのパラメタ調整、オーバーレイ表示による継続的な視覚フィードバック、常時注視を必要としないジェスチャやキーボード入力のサポートといった特徴を備える。",
              )}
            </p>
            <p>
              {richText(
                "<i>Tweeq</i> を用いたサンプルアプリケーションを実装し、プロユーザによる簡易評価を行ったところ、おおむね好意的な反応が得られ、提案した3原則が制作ツールのためのGUI開発において有用であることが示唆された。",
              )}
            </p>
          </div>
          <div className="ui basic segment">
            <p>
              <img className="ui fluid image" src={`${rootPath}tweeq/tweeq.png`} />
            </p>
            <p className="caption">
              <i>{richText("Tweeq")}</i>
              {richText(" は本論文で提案した制作ツール向けGUIウィジェット群である。")}
              <strong>{richText("(a)")}</strong>
              {richText(" <i>Tweeq</i> が提供するコンポーネントの一覧。")}
              <strong>{richText("(b)")}</strong>
              {richText(" カラーピッカーとオーバーレイ表示。")}
              <strong>{richText("(c)")}</strong>
              {richText(" オーバーレイ表示を備えたタイムコード入力インタフェース。")}
              <strong>{richText("(d)")}</strong>
              {richText(" 角度入力インタフェースを同時調整する様子。")}
            </p>
            <p>
              {richText(
                "*第一著者の橋本は、産総研の協力研究員（論文メタデータの所属）としてだけでなく、独立したビジュアルアーティストとして本研究に取り組んだ。",
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("implementation")}>
          <h2>
            <i className="github icon"></i>
            {plainText(en ? "Reference implementation" : "リファレンス実装")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(" ")}
              {richText(
                "本論文におけるプロのクリエータ向けのウィジェット設計に関する3原則に基づくリファレンス実装 <i>Tweeq</i> は Vue.js と TypeScript で開発され、 ",
              )}
              <a href={href("//github.com/baku89/tweeq")}>
                <i className="github icon"></i>
                {richText("GitHub")}
              </a>
              {richText(" でオープンソース公開されている。")}
            </p>
          </div>
          <div className="ui basic center aligned segment">
            <div className="ui huge buttons">
              <a className="ui primary button" href={href("//github.com/baku89/tweeq")}>
                {plainText(en ? "Code" : "ソースコード")}
              </a>
              <div className="ui divider"></div>
              <a className="ui button" href={href("//baku89.github.io/tweeq")}>
                {plainText(en ? "Documents" : "デモ")}
              </a>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("revision")}>
          <h2>
            <i className="announcement icon"></i>
            {plainText(en ? "Revision history" : "更新履歴")}
          </h2>
          <div className="ui basic segment">
            <div className="ui divided feed">
              <div className="event">
                <div className="content">
                  <div className="date">{richText("8/1/2025")}</div>
                  <div className="summary">
                    {richText(
                      '<a href="https://uist.acm.org/2025/program.html">UIST採択論文一覧の仮公開</a>を受けて本ページの初版を掲載',
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("tweeq", "uist2025-hashimoto-tweeq")}
      </SiteLayout>
    </>
  );
}
