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

/** React page migrated from ja/creativity-support-environments/index.pug; edit this TSX source directly. */
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

  p = projectsTable["creativity-support-environments"];
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
  function renderExamples(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {plainText(en ? "Example projects" : "プロジェクト")}
        </h2>
        <div className="ui basic segment">
          <p>
            {plainText(
              en
                ? "I have worked on the following projects collaborating with creators and companies in the creative industries."
                : "私はこれまで、クリエータの方々やクリエイティブ産業の企業のみなさまの協力をいただきながら、以下のプロジェクトに取り組んできました。",
            )}
          </p>
          <div className="ui segment">
            <div className="ui divided items projects">
              {(() => {
                const children194: ReactNode[] = [];
                const exampleProjects = [
                  "griffith",
                  "textalive",
                  "lyric-app-framework",
                ].map((key) => projectsTable[key]);
                for (const p of exampleProjects) {
                  if (
                    p.category === "concept" ||
                    p.category === "committee" ||
                    p.category === "private"
                  )
                    continue;
                  children194.push(<>{content.renderProjectItem(p)}</>);
                }
                return keyed(children194);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderAnimesig(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {richText(
            "Anime SIG: Researching Japanese Animation From Technical, Cultural, and Industrial Perspectives",
          )}
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "ACM CHI 2025 でアニメに関する Special Interest Group （カジュアルな研究会合）を主催しました。詳細はイベントページをご覧ください。",
            )}
          </p>
          {renderAnimesigAbstract()}
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={href("http://chci.pages.dev/chi2025anime")}
          >
            {plainText(en ? "Event page" : "イベントページ")}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
      </>
    );
  }
  function renderAnimesigAbstract(): ReactNode {
    return (
      <>
        <div className="ui message">
          <p>
            {richText(
              "Japanese animation, or anime for short, has attracted global attention with its immense international growth. Despite its popularity, academic research has been limited to media studies, with grand questions like &quot;what is anime,&quot; i.e., observational and analytical perspectives, and more recently in computer science from the perspective of &quot;how to generate the anime look,&quot; focusing on representing visual characteristics with computer vision and machine learning methods.",
            )}
          </p>
          <p>
            {richText(
              "This Special Interest Group (SIG) aims to deepen this multifaceted cultural phenomenon from multidisciplinary perspectives, including &quot;who&quot; makes anime, &quot;how&quot; creativity support tools can aid the process, and &quot;what&quot; about non-visual aspects like anime voices.",
            )}
          </p>
          <p>
            {richText(
              "Organized by experts from industry and academia, this SIG invites participants to the emerging area of anime research and aims to open up a new alley for human-computer interaction (HCI) research through collective discussion on potential directions and community fostering of anime-interested researchers.",
            )}
          </p>
        </div>
      </>
    );
  }
  function renderPostgrowth(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {richText(
            "Power, Culture, and Sustainability in Creativity Support Tools: A Post-growth Perspective",
          )}
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "ACM CHI 2025 で Post-growth HCI に関するワークショップが開催され、",
            )}
            <a href={href("/publications/chi2025-kato-postgrowth-cst.pdf")}>
              {richText("ポジションペーパー")}
            </a>
            {richText("を執筆、発表しました。")}
          </p>
          {renderPostgrowthAbstract()}
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={href(
              "https://pointed-waterlily-f95.notion.site/Advancing-Post-growth-HCI-15dec6ab184b809b8692ec6a3d578089",
            )}
          >
            {plainText(en ? "Event page" : "イベントページ")}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
      </>
    );
  }
  function renderPostgrowthAbstract(): ReactNode {
    return (
      <>
        <p>
          <img
            className="ui bordered image"
            src={`${rootPath}creativity-support-environments/postgrowth-cst.jpg`}
          />
        </p>
        <div className="ui message">
          {richText(" ")}
          <p>
            {richText(
              "In contemporary capitalism, particularly in computer-science-related fields, capital-driven innovation tends to dominate discourse and decision-making. This model aligns with technosolutionism, the belief that technology alone can provide universal solutions. However, creative industries with deep cultural traditions, such as Japanese animation (anime), require a fundamentally different approach. These industries function as communities of practitioners united by a shared goal of producing high-quality creative work, yet they encompass a wide range of technical backgrounds. As a result, they need diverse socio-technical solutions, including tools that facilitate collaboration between different roles (e.g., artists and producers), user interfaces designed for expressivity rather than naïve usability, and support for hybrid analog-digital workflows.",
            )}
          </p>
          <p>
            {richText(
              "Despite their cultural significance, these communities remain small compared to the vast user base of globally distributed products. Consequently, capital-driven efforts rarely prioritize dedicated solutions for them, reinforcing an asymmetrical power structure between toolmakers and users. While a few software engineers have supported practitioners, the community is still seeking a sustainable structure. Notably, because tools are a critical component in shaping culture and its evolution, such sustainable collaboration is also important for maintaining cultural diversity in a form decoupled from economic growth. This is where the academic community of Human-Computer Interaction (HCI) can play a critical role.",
            )}
          </p>
          <p>
            {richText(
              "A notable precedent is the collaboration between the 3D computer graphics (CG) animation industry and SIGGRAPH, where academia and industry jointly tackled computational challenges in CG. However, unlike CG, which lends itself to formalization as a purely technical research problem, the socio-technical complexities of creative industries often resist such reduction. This makes HCI an ideal partner, jointly building and deploying creativity-support tools with collaboration, professional use, and hybrid analog-digital workflows in mind. The resulting toolchain can be considered a new commons to be shared across the industry.",
            )}
          </p>
          <p>
            {richText(
              "As researchers with experience in the animation industry and a deep interest in cultural circulation, we reflect on these challenges from both academic and industry perspectives. Creativity-support tools must be designed with an awareness of the cultural and professional contexts in which they are used, going beyond the Western-centric, economic-growth-driven focus. As a vision for post-growth HCI, we argue that fostering slow but steady collaborations between academia and creative industries has the potential to ensure that technological development supports sustainable, culturally embedded, and community-driven futures.",
            )}
          </p>
        </div>
      </>
    );
  }
  function renderSigccc(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {richText(
            "Special Interest Group on Creativity and Cultures in Computing (SIGCCC)",
          )}
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "ACM CHI 2023 で Special Interest Group を主催しました。詳細はイベントページをご覧ください。",
            )}
          </p>
          {renderSigcccAbstract()}
          <p>
            {richText("また、産業技術総合研究所として ")}
            <a href={href("https://chci.pages.dev/aist-seminar")}>
              {richText("AIST Creative HCI Seminar ")}
            </a>
            {richText(" というセミナーシリーズを開講しています。")}
            {richText("\n")}
            {richText(
              "初回のテーマが「創造性支援」で上記 SIGCCC 提案者ともメンバーが重複しておりますので、ぜひアーカイブ配信をご覧ください。",
            )}
          </p>
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={href("http://chci.pages.dev/chi2023")}
          >
            {plainText(en ? "Event page" : "イベントページ")}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
      </>
    );
  }
  function renderSigcccAbstract(): ReactNode {
    return (
      <>
        <div className="ui message">
          <p>
            {richText(
              "Research on creativity support tools (CSTs) has a long history in Human-Computer Interaction (HCI); however, researchers often focus on developing novel CSTs and verifying them in a controlled lab setting, rather than on capturing the creative process in the wild.",
            )}
          </p>
          <p>
            {richText(
              "In reality, creative activity is exploratory, laborious, and involves multiple CSTs; which together form a creativity support environment or ecology. Creative activity is also social, cultural, and collaborative with people distributing, modifying, and reacting to the creations of others. This process can inspire subsequent iterations. To understand and support open-ended, culturally embedded, collaborative creativity, HCI researchers are seeking new methods to study the sociocultural aspects of creativity support.",
            )}
          </p>
          <p>
            {richText(
              "This Special Interest Group on Creativity and Cultures in Computing (SIGCCC) invites diverse researchers to provide a forum for CST discussions from a wide sociocultural lens. The participants will identify and discuss the state-of-the-art and conceptualize future directions for creativity support research.",
            )}
          </p>
        </div>
      </>
    );
  }
  function renderXrds(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {richText("On the Relationship between HCI Researchers and Creators")}
          <div className="sub header">
            {richText("&mdash; or How I Became a Toolsmith")}
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              'ACM が発行する学生向けの季刊雑誌 <abbr title="Crossroads">XRDS</abbr> において &quot;Exploring the Horizon of Computation for Creativity&quot; と題して特集が組まれ、これまでの創造性支援研究に関して寄稿しました。',
            )}
          </p>
          {renderXrdsAbstract()}
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={href(
              "https://xrds.acm.org/article.cfm?aid=3596927&doi=10.1145%2F3596927",
            )}
          >
            {plainText(en ? "Online article" : "オンライン版の記事ページ")}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
      </>
    );
  }
  function renderXrdsAbstract(): ReactNode {
    return (
      <>
        <div className="ui message">
          <p>
            {richText(
              "Research on creativity support tools in Human-Computer Interaction often focuses on novel interaction design, but that is just the tip of the iceberg.",
            )}
          </p>
          <p>
            {richText(
              "This article discusses the importance of helping creative activities &quot;in the wild&quot; through the author's experience of immersing himself in the creators' environment, talking to them to understand their needs, and revealing the rich history via multidisciplinary studies.",
            )}
          </p>
          <p>
            {richText(
              "It highlights two case studies: TextAlive, developing an AI-enabled creativity support environment for authoring and distributing lyric videos and apps, and Griffith, developing a web-based storyboarding tool.",
            )}
          </p>
          <p>
            {richText(
              "These examples emphasize the need for a slow-paced yet in-depth research process that blends technological innovation with a deep appreciation of the cultural contexts of the creative process. ",
            )}
          </p>
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
                <div className="date">{richText("5/10/2025")}</div>
                <div className="summary">
                  {richText(
                    '<a href="https://programs.sigchi.org/chi/2025/program/content/189764" title="Anime SIG: Researching Japanese Animation From Technical, Cultural, and Industrial Perspectives">Anime SIG</a> と Post-growth HCI におけるポジションペーパーについて追記',
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("9/16/2024")}</div>
                <div className="summary">
                  {richText("プロジェクト一覧を追加")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("6/20/2023")}</div>
                <div className="summary">
                  {richText(
                    '<a href="https://doi.org/10.1145/3596927">ACM XRDS</a> について追記',
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("3/31/2023")}</div>
                <div className="summary">
                  {richText(
                    '<a href="https://programs.sigchi.org/chi/2023/program/session/99391" title="Special Interest Group on Creativity and Cultures in Computing">SIGCCC</a> および <a href="https://chci.pages.dev/aist-seminar">AIST Creative HCI Seminar</a> について追記',
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("10/23/2022")}</div>
                <div className="summary">
                  {richText("プロジェクトページを仮公開")}
                </div>
              </div>
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
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">
                    {plainText(en ? "Top" : "トップ")}
                  </div>
                </a>
                <a className="item" href={href("#animesig")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{richText("Anime SIG")}</div>
                </a>
                <a className="item" href={href("#postgrowth")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{richText("Post-growth HCI")}</div>
                </a>
                <a className="item" href={href("#sigccc")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{richText("SIGCCC")}</div>
                </a>
                <a className="item" href={href("#xrds")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{richText("ACM XRDS")}</div>
                </a>
              </div>
            </div>
          </>
        }
      >
        {content.renderProjectHeader("creativity-support-environments")}
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Summary" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            {richText(p.getDescription(lang))}
            <p>
              <img
                className="ui image"
                src={`${basePath}creativity-support-environments/creativity-support-environments.png`}
              />
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("examples")}>{renderExamples()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("animesig")}>{renderAnimesig()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("postgrowth")}>{renderPostgrowth()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("sigccc")}>{renderSigccc()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("xrds")}>{renderXrds()}</section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(p.project, "chi2023-kato-sigccc")}
        <div className="ui divider"></div>
        <section id={attribute("revision")}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
