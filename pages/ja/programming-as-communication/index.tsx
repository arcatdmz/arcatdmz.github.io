import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/programming-as-communication/index.pug; edit this TSX source directly. */
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

  p = projectsTable["programming-as-communication"];
  title = "Programming as Communication";
  description =
    "Throughout this work, we investigate how to make programming activities more inclusive and collaborative, involving people with diverse technical backgrounds. A programming environment does not need to be only for programmers. We consider that it should instead be designed for users with diverse technical backgrounds.";
  imageUrl = `${protocol}://${domain}${rootPath}images/panels/programming-as-communication.png`;
  me = "programming-as-communication/";
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Summary" : "概要")}</h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "コンピュータが人々の生活にも仕事にも溶け込み、プログラミングはこれまで以上に身近で、複雑な事象を扱うようになった。そこで、",
            )}
            <a href={href(`${basePath}programming-with-examples`)}>
              {richText("プログラミングの方法を根本的に改善する")}
            </a>
            {richText("必要がある。既存研究は多くの場合、特定の技術的背景を持った人々（")}
            <a href={href(`${basePath}live-programming`)}>{richText("プログラマ")}</a>
            {richText(
              ", エンドユーザ, データサイエンティストなど）にとってのプログラミング体験を向上することで問題の解決を図ってきた。",
            )}
          </p>
          <p>
            {richText(
              "一方、本研究はプログラミングを、多様な技術的背景を持った人々を伴った、よりインクルーシブで協調的な行為にすることを目指す。「プログラミング環境」は必ずしも「プログラマ」のためだけの環境である必要はない。本研究はそうした環境を、多様な人々を受け止められるように設計することを目指す。",
            )}
          </p>
          <p>
            {richText(
              "そうしたインクルーシブな環境において、人々はプログラミングを通してコミュニケーションを取り、全ての人々がプログラミングの便益を享受でき、ひいてはエンパワーメントを高められると考えている。",
            )}
          </p>
        </div>
      </>
    );
  }
  function renderPresentation(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表資料")}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {richText('<abbr title="Convivial Computing Salon 2020">CCS</abbr> ')}
                {plainText(en ? "talk" : "講演動画")}
              </h3>
              {content.renderEmbedYoutube(
                "//www.youtube.com/embed/qR2MAfRFBIM?cc_lang_pref=en&cc_load_policy=1",
              )}
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a
                      href={href(
                        "//www.youtube.com/watch?v=qR2MAfRFBIM&cc_lang_pref=en&cc_load_policy=1",
                      )}
                    >
                      <i className="youtube icon"></i>
                      {richText("YouTube")}
                    </a>
                  </div>
                  <div className="item">
                    <a href={href("//vimeo.com/416361135")}>
                      <i className="vimeo icon"></i>
                      {richText("Vimeo")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {richText('<abbr title="Convivial Computing Salon 2020">CCS</abbr> ')}
                {plainText(en ? "slides" : "発表スライド")}
              </h3>
              <div
                className="ui embed"
                data-url={publicationsTable[p.publication].entryTags.slides}
                data-placeholder={`${rootPath}programming-as-communication/ccs2020/ccs2020-kato-slides00.jpg`}
                data-icon={"video play outline"}
              ></div>
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={href(publicationsTable[p.publication].entryTags.slides)}>
                      <i className="download icon"></i>
                      {plainText(en ? "Download" : "ダウンロード")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui divider"></div>
          <div className="ui list">
            <div className="item">
              {richText(
                'YouTube版は音量が調整され、字幕もついています。Vimeo版は加藤の発表に続いて<a href="https://tcher.tech/">Philip Tchernavskij</a>氏によるクリティークとQ&amp;Aセッションの録画がついています。',
              )}
            </div>
            <div className="item">
              {richText(
                'Convivial Computing Salon 2020については<a href="https://2020.programming-conference.org/home/salon-2020">サロンの公式サイト</a>をご覧ください。',
              )}
            </div>
            <div className="item">
              {richText(
                '論文はページ下部<a href="#publications">発表文献</a>からダウンロードできます。',
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderTechnicalEffort(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="laptop code icon"></i>
          <div className="content">
            {plainText(en ? "Technical environment design" : "技術的環境設計")}
          </div>
        </h2>
        <div className="ui basic segment">
          <img
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/runtime-env-as-programming-env.png`}
          />
          <div className="caption">
            <p>
              {richText(
                "以下のプロジェクトは多様な人々の協調を支援するインタラクションデザインの設計を通して「Programming as Communication」を実現した例です。",
              )}
            </p>
          </div>
          <div className="ui segment">
            <div className="ui divided items projects">
              {(() => {
                const children244: ReactNode[] = [];
                let technicalProjects = ["user-generated-variables", "live-tuning"].map(
                  (key) => projectsTable[key],
                );
                for (const p of technicalProjects) {
                  if (
                    p.category === "concept" ||
                    p.category === "committee" ||
                    p.category === "private"
                  )
                    continue;
                  if (!Array.isArray(p.tags) || p.tags.indexOf("programming-as-communication") < 0)
                    continue;
                  children244.push(<>{content.renderProjectItem(p)}</>);
                }
                return keyed(children244);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderSocialEffort(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="user friends icon"></i>
          <div className="content">{plainText(en ? "Social environment design" : "社会的環境設計")}</div>
        </h2>
        <div className="ui basic segment">
          <img
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/evangelist-in-env.png`}
          />
          <div className="caption">
            <p>
              <a href={href("https://otonglass.jp/")}>{richText("OTON GLASS")}</a>
              {richText(
                'プロジェクトでは、プログラミング環境を、ハードウェア部品とソフトウェア<abbr title="Application Programming Interfaces">API</abbr>からなるツールキットのような人工物だけでなく、ツールキットの利用を手助けしてくれる有機的存在──エヴァンジェリストの存在を前提に設計しています。',
              )}
            </p>
          </div>
          <h3 className="ui header">{richText("関連リンク")}</h3>
          <div className="ui divided small list">
            <div className="item">
              <i className="right triangle icon"></i>
              <div className="content">
                <a
                  href={href(
                    "https://scrapbox.io/otonglass-fabbiotope/%E7%94%A3%E6%A5%AD%E6%8A%80%E8%A1%93%E7%B7%8F%E5%90%88%E7%A0%94%E7%A9%B6%E6%89%80%E3%81%A8%E3%81%AE%E5%85%B1%E5%90%8C%E7%A0%94%E7%A9%B6%E3%82%92%E9%96%8B%E5%A7%8B%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F",
                  )}
                >
                  {richText(
                    "産業技術総合研究所との共同研究を開始しました - OTON GLASS／FabBiotope",
                  )}
                </a>
              </div>
            </div>
            <div className="item">
              <i className="right triangle icon"></i>
              <div className="content">
                <a
                  href={href(
                    "https://2020.programming-conference.org/details/salon-2020-papers/6/Rethinking-Programming-Environment-Technical-and-Social-Environment-Design-towar",
                  )}
                >
                  {richText(
                    "Rethinking Programming &quot;Environment&quot; (Convivial Computing Salon 2020) - ‹Programming› 2020",
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderRevision(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          {plainText(en ? "Revision history" : "更新履歴")}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            <div className="event">
              <div className="content">
                <div className="date">{richText("5/15/2020")}</div>
                <div className="summary">{richText("論文のプレプリントを追加しました。")}</div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("5/9/2020")}</div>
                <div className="summary">
                  {richText("プレゼンテーションの録画とスライド資料を追加しました。")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("4/1/2020")}</div>
                <div className="summary">{richText("初版をアップロードしました。")}</div>
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
        {content.renderProjectHeader("programming-as-communication")}
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>{renderAbstract()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("presentation")}>{renderPresentation()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("technical-effort")}>{renderTechnicalEffort()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("social-effort")}>{renderSocialEffort()}</section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(p.project, p.publication)}
        <div className="ui hidden divider"></div>
        <section id={attribute("revision")}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
