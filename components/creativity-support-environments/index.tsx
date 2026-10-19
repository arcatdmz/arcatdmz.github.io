import {
  Button,
  Divider,
  Feed,
  Header,
  Icon,
  Item,
  List,
  Message,
  Segment,
} from "react-fomantic-ui";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SitePopup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  ProjectHeader,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { type ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { keyed } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";
import { SiteLink } from "@/site/components/SiteLink";

const contentImageSizes =
  "(max-width: 767px) calc(100vw - 4rem), (max-width: 991px) 691px, (max-width: 1199px) 900px, 1093px";

/** Shared page template. Japanese overrides: animesig-content, postgrowth-content, sigccc-content, xrds-content, news. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
  const lang = pageData.language;
  const en = lang === "en";
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
        <Header as="h2">{en ? "Example projects" : "プロジェクト"}</Header>
        <Segment basic>
          <p>
            {en
              ? "I have worked on the following projects collaborating with creators and companies in the creative industries."
              : "私はこれまで、クリエータの方々やクリエイティブ産業の企業のみなさまの協力をいただきながら、以下のプロジェクトに取り組んできました。"}
          </p>
          <Segment>
            <Item.Group divided className="projects">
              {(() => {
                const children: ReactNode[] = [];
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
                  children.push(
                    <>
                      <ProjectItem p={p} />
                    </>,
                  );
                }
                return keyed(children);
              })()}
            </Item.Group>
          </Segment>
        </Segment>
      </>
    );
  }
  function renderAnimesig(): ReactNode {
    return (
      <>
        <Header as="h2">
          Anime SIG: Researching Japanese Animation From Technical, Cultural,
          and Industrial Perspectives
        </Header>
        <Segment basic>
          <p>
            {en
              ? "Organized by experts from industry and academia, this CHI 2025 Special Interest Group invited participants to the emerging area of anime research and aims to open up a new alley for human-computer interaction (HCI) research. Please refer to the event page for more details."
              : "ACM CHI 2025 でアニメに関する Special Interest Group （カジュアルな研究会合）を主催しました。詳細はイベントページをご覧ください。"}
          </p>
          {renderAnimesigAbstract()}
        </Segment>
        <Segment basic textAlign="right">
          <Button
            role="link"
            primary
            as="a"
            href="http://chci.pages.dev/chi2025anime"
          >
            {en ? "Event page" : "イベントページ"}
            <Icon name="chevron circle right" />
          </Button>
        </Segment>
      </>
    );
  }
  function renderAnimesigAbstract(): ReactNode {
    return (
      <>
        <Message>
          <p>
            Japanese animation, or anime for short, has attracted global
            attention with its immense international growth. Despite its
            popularity, academic research has been limited to media studies,
            with grand questions like "what is anime," i.e., observational and
            analytical perspectives, and more recently in computer science from
            the perspective of "how to generate the anime look," focusing on
            representing visual characteristics with computer vision and machine
            learning methods.
          </p>
          <p>
            This Special Interest Group (SIG) aims to deepen this multifaceted
            cultural phenomenon from multidisciplinary perspectives, including
            "who" makes anime, "how" creativity support tools can aid the
            process, and "what" about non-visual aspects like anime voices.
          </p>
          <p>
            Organized by experts from industry and academia, this SIG invites
            participants to the emerging area of anime research and aims to open
            up a new alley for human-computer interaction (HCI) research through
            collective discussion on potential directions and community
            fostering of anime-interested researchers.
          </p>
        </Message>
      </>
    );
  }
  function renderPostgrowth(): ReactNode {
    return (
      <>
        <Header as="h2">
          Power, Culture, and Sustainability in Creativity Support Tools: A
          Post-growth Perspective
        </Header>
        <Segment basic>
          <p>
            <LocalizedContent
              ja={
                <>
                  ACM CHI 2025 で Post-growth HCI
                  に関するワークショップが開催され、
                  <SiteLink href="/publications/chi2025-kato-postgrowth-cst.pdf">
                    ポジションペーパー
                  </SiteLink>
                  を執筆、発表しました。
                </>
              }
            >
              A workshop with focus on post-growth HCI was held as part of the
              CHI 2025 conference. I presented a position paper on the topic of
              how creativity support tools should be designed and maintained in
              the post-growth era.
            </LocalizedContent>
          </p>
          {renderPostgrowthAbstract()}
        </Segment>
        <Segment basic textAlign="right">
          <Button
            role="link"
            primary
            as="a"
            href="https://pointed-waterlily-f95.notion.site/Advancing-Post-growth-HCI-15dec6ab184b809b8692ec6a3d578089"
          >
            {en ? "Event page" : "イベントページ"}
            <Icon name="chevron circle right" />
          </Button>
        </Segment>
      </>
    );
  }
  function renderPostgrowthAbstract(): ReactNode {
    return (
      <>
        <p>
          <SiteImage
            ui
            bordered
            sizes={contentImageSizes}
            src={`${rootPath}creativity-support-environments/postgrowth-cst.jpg`}
          />
        </p>
        <Message>
          {" "}
          <p>
            In contemporary capitalism, particularly in computer-science-related
            fields, capital-driven innovation tends to dominate discourse and
            decision-making. This model aligns with technosolutionism, the
            belief that technology alone can provide universal solutions.
            However, creative industries with deep cultural traditions, such as
            Japanese animation (anime), require a fundamentally different
            approach. These industries function as communities of practitioners
            united by a shared goal of producing high-quality creative work, yet
            they encompass a wide range of technical backgrounds. As a result,
            they need diverse socio-technical solutions, including tools that
            facilitate collaboration between different roles (e.g., artists and
            producers), user interfaces designed for expressivity rather than
            naïve usability, and support for hybrid analog-digital workflows.
          </p>
          <p>
            Despite their cultural significance, these communities remain small
            compared to the vast user base of globally distributed products.
            Consequently, capital-driven efforts rarely prioritize dedicated
            solutions for them, reinforcing an asymmetrical power structure
            between toolmakers and users. While a few software engineers have
            supported practitioners, the community is still seeking a
            sustainable structure. Notably, because tools are a critical
            component in shaping culture and its evolution, such sustainable
            collaboration is also important for maintaining cultural diversity
            in a form decoupled from economic growth. This is where the academic
            community of Human-Computer Interaction (HCI) can play a critical
            role.
          </p>
          <p>
            A notable precedent is the collaboration between the 3D computer
            graphics (CG) animation industry and SIGGRAPH, where academia and
            industry jointly tackled computational challenges in CG. However,
            unlike CG, which lends itself to formalization as a purely technical
            research problem, the socio-technical complexities of creative
            industries often resist such reduction. This makes HCI an ideal
            partner, jointly building and deploying creativity-support tools
            with collaboration, professional use, and hybrid analog-digital
            workflows in mind. The resulting toolchain can be considered a new
            commons to be shared across the industry.
          </p>
          <p>
            As researchers with experience in the animation industry and a deep
            interest in cultural circulation, we reflect on these challenges
            from both academic and industry perspectives. Creativity-support
            tools must be designed with an awareness of the cultural and
            professional contexts in which they are used, going beyond the
            Western-centric, economic-growth-driven focus. As a vision for
            post-growth HCI, we argue that fostering slow but steady
            collaborations between academia and creative industries has the
            potential to ensure that technological development supports
            sustainable, culturally embedded, and community-driven futures.
          </p>
        </Message>
      </>
    );
  }
  function renderSigccc(): ReactNode {
    return (
      <>
        <Header as="h2">
          Special Interest Group on Creativity and Cultures in Computing
          (SIGCCC)
        </Header>
        <Segment basic>
          <p>
            {en
              ? "With the help of the researchers working on creativity support whom I respect and admire, a Special Interest Group meeting was held at ACM CHI 2023. Please refer to the event page for more details."
              : "ACM CHI 2023 で Special Interest Group を主催しました。詳細はイベントページをご覧ください。"}
          </p>
          {renderSigcccAbstract()}
          {en ? null : (
            <p>
              また、産業技術総合研究所として{" "}
              <a href="https://chci.pages.dev/aist-seminar">
                AIST Creative HCI Seminar{" "}
              </a>{" "}
              というセミナーシリーズを開講しています。
              {"\n"}
              初回のテーマが「創造性支援」で上記 SIGCCC
              提案者ともメンバーが重複しておりますので、ぜひアーカイブ配信をご覧ください。
            </p>
          )}
        </Segment>
        <Segment basic textAlign="right">
          <Button
            role="link"
            primary
            as="a"
            href="http://chci.pages.dev/chi2023"
          >
            {en ? "Event page" : "イベントページ"}
            <Icon name="chevron circle right" />
          </Button>
        </Segment>
      </>
    );
  }
  function renderSigcccAbstract(): ReactNode {
    return (
      <>
        <Message>
          <p>
            Research on creativity support tools (CSTs) has a long history in
            Human-Computer Interaction (HCI); however, researchers often focus
            on developing novel CSTs and verifying them in a controlled lab
            setting, rather than on capturing the creative process in the wild.
          </p>
          <p>
            In reality, creative activity is exploratory, laborious, and
            involves multiple CSTs; which together form a creativity support
            environment or ecology. Creative activity is also social, cultural,
            and collaborative with people distributing, modifying, and reacting
            to the creations of others. This process can inspire subsequent
            iterations. To understand and support open-ended, culturally
            embedded, collaborative creativity, HCI researchers are seeking new
            methods to study the sociocultural aspects of creativity support.
          </p>
          <p>
            This Special Interest Group on Creativity and Cultures in Computing
            (SIGCCC) invites diverse researchers to provide a forum for CST
            discussions from a wide sociocultural lens. The participants will
            identify and discuss the state-of-the-art and conceptualize future
            directions for creativity support research.
          </p>
        </Message>
      </>
    );
  }
  function renderXrds(): ReactNode {
    return (
      <>
        <Header as="h2">
          On the Relationship between HCI Researchers and Creators
          <Header.Subheader>— or How I Became a Toolsmith</Header.Subheader>
        </Header>
        <Segment basic>
          <p>
            <LocalizedContent
              ja={
                <>
                  ACM が発行する学生向けの季刊雑誌{" "}
                  <abbr title="Crossroads">XRDS</abbr> において "Exploring the
                  Horizon of Computation for Creativity"
                  と題して特集が組まれ、これまでの創造性支援研究に関して寄稿しました。
                </>
              }
            >
              <Icon>XRDS</Icon> is the ACM's quarterly magazine for students. As
              part of its featured edition exploring the horizon of computation
              for creativity, I contributed an article that discusses the
              importance of helping creative activities "in the wild,"
              reflecting my research experience.
            </LocalizedContent>
          </p>
          {renderXrdsAbstract()}
        </Segment>
        <Segment basic textAlign="right">
          <Button
            role="link"
            primary
            as="a"
            href="https://xrds.acm.org/article.cfm?aid=3596927&amp;doi=10.1145%2F3596927"
          >
            {en ? "Online article" : "オンライン版の記事ページ"}
            <Icon name="chevron circle right" />
          </Button>
        </Segment>
      </>
    );
  }
  function renderXrdsAbstract(): ReactNode {
    return (
      <>
        <Message>
          <p>
            Research on creativity support tools in Human-Computer Interaction
            often focuses on novel interaction design, but that is just the tip
            of the iceberg.
          </p>
          <p>
            This article discusses the importance of helping creative activities
            "in the wild" through the author's experience of immersing himself
            in the creators' environment, talking to them to understand their
            needs, and revealing the rich history via multidisciplinary studies.
          </p>
          <p>
            It highlights two case studies: TextAlive, developing an AI-enabled
            creativity support environment for authoring and distributing lyric
            videos and apps, and Griffith, developing a web-based storyboarding
            tool.
          </p>
          <p>
            These examples emphasize the need for a slow-paced yet in-depth
            research process that blends technological innovation with a deep
            appreciation of the cultural contexts of the creative process.{" "}
          </p>
        </Message>
      </>
    );
  }
  function renderRevision(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="announcement" />
          {en ? "Revision history" : "更新履歴"}
        </Header>
        <Segment basic>
          <Feed className="divided">
            <LocalizedContent
              ja={
                <>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>5/10/2025</Feed.Date>
                      <Feed.Summary>
                        <a
                          href="https://programs.sigchi.org/chi/2025/program/content/189764"
                          title="Anime SIG: Researching Japanese Animation From Technical, Cultural, and Industrial Perspectives"
                        >
                          Anime SIG
                        </a>{" "}
                        と Post-growth HCI
                        におけるポジションペーパーについて追記
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>9/16/2024</Feed.Date>
                      <Feed.Summary>プロジェクト一覧を追加</Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>6/20/2023</Feed.Date>
                      <Feed.Summary>
                        <a href="https://doi.org/10.1145/3596927">ACM XRDS</a>{" "}
                        について追記
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>3/31/2023</Feed.Date>
                      <Feed.Summary>
                        <a
                          href="https://programs.sigchi.org/chi/2023/program/session/99391"
                          title="Special Interest Group on Creativity and Cultures in Computing"
                        >
                          SIGCCC
                        </a>{" "}
                        および{" "}
                        <a href="https://chci.pages.dev/aist-seminar">
                          AIST Creative HCI Seminar
                        </a>{" "}
                        について追記
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>10/23/2022</Feed.Date>
                      <Feed.Summary>プロジェクトページを仮公開</Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </>
              }
            >
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>5/10/2025</Feed.Date>
                  <Feed.Summary>
                    Add information on the Anime SIG event and the post-growth{" "}
                    <abbr title="Creativity Support Tools">CST</abbr> position
                    paper at CHI 2025.
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>9/16/2024</Feed.Date>
                  <Feed.Summary>Add a list of projects.</Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>3/31/2023</Feed.Date>
                  <Feed.Summary>Upload the initial revision.</Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </LocalizedContent>
          </Feed>
        </Segment>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          <>
            <SitePopup
              className="popup-menu"
              position="top left"
              trigger={
                <Button
                  circular
                  icon
                  size="large"
                  color="grey"
                  as="a"
                  className="popup-menu hidden"
                >
                  <Icon name="sidebar" />
                </Button>
              }
            >
              <List divided>
                <List.Item role="link" as="a" href="#body">
                  <Icon name="chevron circle up" />
                  <List.Content>{en ? "Top" : "トップ"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href="#animesig">
                  <Icon name="triangle right" />
                  <List.Content>Anime SIG</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href="#postgrowth">
                  <Icon name="triangle right" />
                  <List.Content>Post-growth HCI</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href="#sigccc">
                  <Icon name="triangle right" />
                  <List.Content>SIGCCC</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href="#xrds">
                  <Icon name="triangle right" />
                  <List.Content>ACM XRDS</List.Content>
                </List.Item>
              </List>
            </SitePopup>
          </>
        }
      >
        <ProjectHeader project="creativity-support-environments" />
        <Divider hidden />
        <section id="abstract">
          <Header as="h2">
            <Header.Content>{en ? "Summary" : "概要"}</Header.Content>
          </Header>
          <Segment basic>
            <HtmlContent html={p.getDescription(lang)} />
            <p>
              <SiteImage
                ui
                sizes={contentImageSizes}
                src={`${basePath}creativity-support-environments/creativity-support-environments.png`}
              />
            </p>
          </Segment>
        </section>
        <Divider hidden />
        <section id="examples">{renderExamples()}</section>
        <Divider hidden />
        <section id="animesig">{renderAnimesig()}</section>
        <Divider hidden />
        <section id="postgrowth">{renderPostgrowth()}</section>
        <Divider hidden />
        <section id="sigccc">{renderSigccc()}</section>
        <Divider hidden />
        <section id="xrds">{renderXrds()}</section>
        <Divider hidden />
        <ProjectPublications
          project={p.project}
          majorPublication="chi2023-kato-sigccc"
        />
        <Divider />
        <section id="revision">{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
