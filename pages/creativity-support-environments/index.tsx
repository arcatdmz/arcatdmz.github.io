import { Popup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  ProjectHeader,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { keyed } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from creativity-support-environments/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
  const lang: "en" | "ja" = "en";
  const en: boolean = true;
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
  function renderExamples(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {en ? "Example projects" : "プロジェクト"}
        </h2>
        <div className="ui basic segment">
          <p>
            {en
              ? "I have worked on the following projects collaborating with creators and companies in the creative industries."
              : "私はこれまで、クリエータの方々やクリエイティブ産業の企業のみなさまの協力をいただきながら、以下のプロジェクトに取り組んできました。"}
          </p>
          <div className="ui segment">
            <div className="ui divided items projects">
              {(() => {
                const children72: ReactNode[] = [];
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
                  children72.push(
                    <>
                      <ProjectItem p={p} />
                    </>,
                  );
                }
                return keyed(children72);
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
          {
            "Anime SIG: Researching Japanese Animation From Technical, Cultural, and Industrial Perspectives"
          }
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "Organized by experts from industry and academia, this CHI 2025 Special Interest Group invited participants to the emerging area of anime research and aims to open up a new alley for human-computer interaction (HCI) research. Please refer to the event page for more details."
            }
          </p>
          {renderAnimesigAbstract()}
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={"http://chci.pages.dev/chi2025anime"}
          >
            {en ? "Event page" : "イベントページ"}
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
            {
              'Japanese animation, or anime for short, has attracted global attention with its immense international growth. Despite its popularity, academic research has been limited to media studies, with grand questions like "what is anime," i.e., observational and analytical perspectives, and more recently in computer science from the perspective of "how to generate the anime look," focusing on representing visual characteristics with computer vision and machine learning methods.'
            }
          </p>
          <p>
            {
              'This Special Interest Group (SIG) aims to deepen this multifaceted cultural phenomenon from multidisciplinary perspectives, including "who" makes anime, "how" creativity support tools can aid the process, and "what" about non-visual aspects like anime voices.'
            }
          </p>
          <p>
            {
              "Organized by experts from industry and academia, this SIG invites participants to the emerging area of anime research and aims to open up a new alley for human-computer interaction (HCI) research through collective discussion on potential directions and community fostering of anime-interested researchers."
            }
          </p>
        </div>
      </>
    );
  }
  function renderPostgrowth(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {
            "Power, Culture, and Sustainability in Creativity Support Tools: A Post-growth Perspective"
          }
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "A workshop with focus on post-growth HCI was held as part of the CHI 2025 conference. I presented a position paper on the topic of how creativity support tools should be designed and maintained in the post-growth era."
            }
          </p>
          {renderPostgrowthAbstract()}
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={
              "https://pointed-waterlily-f95.notion.site/Advancing-Post-growth-HCI-15dec6ab184b809b8692ec6a3d578089"
            }
          >
            {en ? "Event page" : "イベントページ"}
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
          <SiteImage
            className="ui bordered image"
            src={`${rootPath}creativity-support-environments/postgrowth-cst.jpg`}
          />
        </p>
        <div className="ui message">
          {" "}
          <p>
            {
              "In contemporary capitalism, particularly in computer-science-related fields, capital-driven innovation tends to dominate discourse and decision-making. This model aligns with technosolutionism, the belief that technology alone can provide universal solutions. However, creative industries with deep cultural traditions, such as Japanese animation (anime), require a fundamentally different approach. These industries function as communities of practitioners united by a shared goal of producing high-quality creative work, yet they encompass a wide range of technical backgrounds. As a result, they need diverse socio-technical solutions, including tools that facilitate collaboration between different roles (e.g., artists and producers), user interfaces designed for expressivity rather than naïve usability, and support for hybrid analog-digital workflows."
            }
          </p>
          <p>
            {
              "Despite their cultural significance, these communities remain small compared to the vast user base of globally distributed products. Consequently, capital-driven efforts rarely prioritize dedicated solutions for them, reinforcing an asymmetrical power structure between toolmakers and users. While a few software engineers have supported practitioners, the community is still seeking a sustainable structure. Notably, because tools are a critical component in shaping culture and its evolution, such sustainable collaboration is also important for maintaining cultural diversity in a form decoupled from economic growth. This is where the academic community of Human-Computer Interaction (HCI) can play a critical role."
            }
          </p>
          <p>
            {
              "A notable precedent is the collaboration between the 3D computer graphics (CG) animation industry and SIGGRAPH, where academia and industry jointly tackled computational challenges in CG. However, unlike CG, which lends itself to formalization as a purely technical research problem, the socio-technical complexities of creative industries often resist such reduction. This makes HCI an ideal partner, jointly building and deploying creativity-support tools with collaboration, professional use, and hybrid analog-digital workflows in mind. The resulting toolchain can be considered a new commons to be shared across the industry."
            }
          </p>
          <p>
            {
              "As researchers with experience in the animation industry and a deep interest in cultural circulation, we reflect on these challenges from both academic and industry perspectives. Creativity-support tools must be designed with an awareness of the cultural and professional contexts in which they are used, going beyond the Western-centric, economic-growth-driven focus. As a vision for post-growth HCI, we argue that fostering slow but steady collaborations between academia and creative industries has the potential to ensure that technological development supports sustainable, culturally embedded, and community-driven futures."
            }
          </p>
        </div>
      </>
    );
  }
  function renderSigccc(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {
            "Special Interest Group on Creativity and Cultures in Computing (SIGCCC)"
          }
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "With the help of the researchers working on creativity support whom I respect and admire, a Special Interest Group meeting was held at ACM CHI 2023. Please refer to the event page for more details."
            }
          </p>
          {renderSigcccAbstract()}
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={"http://chci.pages.dev/chi2023"}
          >
            {en ? "Event page" : "イベントページ"}
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
            {
              "Research on creativity support tools (CSTs) has a long history in Human-Computer Interaction (HCI); however, researchers often focus on developing novel CSTs and verifying them in a controlled lab setting, rather than on capturing the creative process in the wild."
            }
          </p>
          <p>
            {
              "In reality, creative activity is exploratory, laborious, and involves multiple CSTs; which together form a creativity support environment or ecology. Creative activity is also social, cultural, and collaborative with people distributing, modifying, and reacting to the creations of others. This process can inspire subsequent iterations. To understand and support open-ended, culturally embedded, collaborative creativity, HCI researchers are seeking new methods to study the sociocultural aspects of creativity support."
            }
          </p>
          <p>
            {
              "This Special Interest Group on Creativity and Cultures in Computing (SIGCCC) invites diverse researchers to provide a forum for CST discussions from a wide sociocultural lens. The participants will identify and discuss the state-of-the-art and conceptualize future directions for creativity support research."
            }
          </p>
        </div>
      </>
    );
  }
  function renderXrds(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {"On the Relationship between HCI Researchers and Creators"}
          <div className="sub header">{"— or How I Became a Toolsmith"}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            <i>{"XRDS"}</i>
            {
              ' is the ACM\'s quarterly magazine for students. As part of its featured edition exploring the horizon of computation for creativity, I contributed an article that discusses the importance of helping creative activities "in the wild," reflecting my research experience.'
            }
          </p>
          {renderXrdsAbstract()}
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={
              "https://xrds.acm.org/article.cfm?aid=3596927&doi=10.1145%2F3596927"
            }
          >
            {en ? "Online article" : "オンライン版の記事ページ"}
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
            {
              "Research on creativity support tools in Human-Computer Interaction often focuses on novel interaction design, but that is just the tip of the iceberg."
            }
          </p>
          <p>
            {
              "This article discusses the importance of helping creative activities \"in the wild\" through the author's experience of immersing himself in the creators' environment, talking to them to understand their needs, and revealing the rich history via multidisciplinary studies."
            }
          </p>
          <p>
            {
              "It highlights two case studies: TextAlive, developing an AI-enabled creativity support environment for authoring and distributing lyric videos and apps, and Griffith, developing a web-based storyboarding tool."
            }
          </p>
          <p>
            {
              "These examples emphasize the need for a slow-paced yet in-depth research process that blends technological innovation with a deep appreciation of the cultural contexts of the creative process. "
            }
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
          {en ? "Revision history" : "更新履歴"}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            <div className="event">
              <div className="content">
                <div className="date">{"5/10/2025"}</div>
                <div className="summary">
                  {
                    "Add information on the Anime SIG event and the post-growth "
                  }
                  <abbr title={"Creativity Support Tools"}>{"CST"}</abbr>
                  {" position paper at CHI 2025."}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"9/16/2024"}</div>
                <div className="summary">{"Add a list of projects."}</div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"3/31/2023"}</div>
                <div className="summary">{"Upload the initial revision."}</div>
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
            <Popup className="ui hidden popup-menu popup" position="top left" trigger={<a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>}>
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#animesig"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"Anime SIG"}</div>
                </a>
                <a className="item" href={"#postgrowth"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"Post-growth HCI"}</div>
                </a>
                <a className="item" href={"#sigccc"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"SIGCCC"}</div>
                </a>
                <a className="item" href={"#xrds"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"ACM XRDS"}</div>
                </a>
              </div>
            </Popup>
          </>
        }
      >
        <ProjectHeader project={"creativity-support-environments"} />
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Summary" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <HtmlContent html={p.getDescription(lang)} />
            <p>
              <SiteImage
                className="ui image"
                src={`${basePath}creativity-support-environments/creativity-support-environments.png`}
              />
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"examples"}>{renderExamples()}</section>
        <div className="ui hidden divider"></div>
        <section id={"animesig"}>{renderAnimesig()}</section>
        <div className="ui hidden divider"></div>
        <section id={"postgrowth"}>{renderPostgrowth()}</section>
        <div className="ui hidden divider"></div>
        <section id={"sigccc"}>{renderSigccc()}</section>
        <div className="ui hidden divider"></div>
        <section id={"xrds"}>{renderXrds()}</section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={p.project}
          majorPublication={"chi2023-kato-sigccc"}
        />
        <div className="ui divider"></div>
        <section id={"revision"}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/creativity-support-environments/", {"projects": ["creativity-support-environments", "griffith", "lyric-app-framework", "textalive"], "publications": ["chi2023-kato-sigccc"], "publicationProjects": ["creativity-support-environments"]}) }, "/creativity-support-environments/") };
}
