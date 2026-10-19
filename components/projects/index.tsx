import {
  Button,
  Divider,
  Header,
  HeaderContent,
  Icon,
  ItemGroup,
  List,
  ListContent,
  ListItem,
  Segment,
} from "react-fomantic-ui";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SitePopup } from "@/site/components/SiteWidgets";
import { ProjectItem } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { keyed, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: projects, research, design-and-engineering. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, rootPath } = data;
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

  title = en ? "Projects" : "プロジェクト";
  me = "projects/";
  bodyClass = "with-rail";
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
  function renderPublicationsMenu(): ReactNode {
    return (
      <>
        <List divided>
          <ListItem role="link" as="a" href={"#research"}>
            <Icon name="lab" />
            <ListContent>{en ? "Research" : "研究"}</ListContent>
          </ListItem>
          <ListItem role="link" as="a" href={"#design-and-engineering"}>
            <Icon name="paint brush" />
            <ListContent>
              {en ? "Design and Engineering" : "デザイン・開発"}
            </ListContent>
          </ListItem>
        </List>
      </>
    );
  }
  function renderAbout(): ReactNode {
    return (
      <>
        <Segment basic id={"about"}>
          <LocalizedContent
            ja={
              <p>
                {
                  "このページでは加藤が関わってきた研究・開発・デザインに関するプロジェクトの一覧を見ることができます。グラフィックデザインとインタラクションデザインに絞った一覧は"
                }
                <SiteLink href={href(`${rootPath}ja/design`)}>
                  <Icon name="paint brush" />
                  {"デザイン"}
                </SiteLink>
                {"のページでも確認できます。"}
              </p>
            }
          >
            <p>
              {"This page shows the list of research projects. See "}
              <SiteLink href={href(`${rootPath}design`)}>
                <Icon name="paint brush" />
                {"Design"}
              </SiteLink>
              {" for the design-oriented list of my projects."}
            </p>
          </LocalizedContent>
        </Segment>
      </>
    );
  }
  function renderResearch(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="lab" />
          <HeaderContent>
            {en ? "Research projects" : "研究プロジェクト"}
          </HeaderContent>
        </Header>
        <Segment basic>
          <p>
            {en
              ? "The following research-oriented projects have been conducted under a certain scientific context and most of them have been published at archival venues."
              : "研究者として、所属先の東京大学、Microsoft Research、産業技術総合研究所、アーチで取り組んできた研究プロジェクトの一覧です。"}
          </p>
          <ItemGroup divided id={"other-projects-list"} className="projects">
            {(() => {
              const children: ReactNode[] = [];
              for (const p of projects) {
                if (
                  p.isPrivateProject(lang) ||
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
          </ItemGroup>
        </Segment>
      </>
    );
  }
  function renderDesignAndEngineering(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="paint brush" />
          <HeaderContent>
            {en
              ? "Design and/or engineering projects"
              : "デザイン・開発プロジェクト"}
          </HeaderContent>
        </Header>
        <Segment basic>
          <p>
            {en
              ? "The following design and engineering projects have been conducted as part of my hobby or probono activities."
              : "デザインや開発に主眼が置かれたプロジェクトです。趣味またはプロボノ的活動として取り組んできました。"}
          </p>
          <ItemGroup
            divided
            id={"design-and-engineering-projects-list"}
            className="projects"
          >
            {(() => {
              const children: ReactNode[] = [];
              for (const p of projects) {
                if (p.isPrivateProject(lang) || p.category !== "private")
                  continue;
                children.push(
                  <>
                    <ProjectItem p={p} />
                  </>,
                );
              }
              return keyed(children);
            })()}
          </ItemGroup>
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
                  className="popup-menu hidden mobile-only"
                >
                  <Icon name="sidebar" />
                </Button>
              }
            >
              {renderPublicationsMenu()}
            </SitePopup>
          </>
        }
      >
        <div className="left-rail">{renderPublicationsMenu()}</div>
        <div className="right-content">
          <Header as="h1">
            <Icon name="gift" />
            <HeaderContent>{en ? "Projects" : "プロジェクト"}</HeaderContent>
          </Header>
          {renderAbout()}
          <Divider hidden />
          <section id={"research"}>{renderResearch()}</section>
          <Divider hidden />
          <section id={"design-and-engineering"}>
            {renderDesignAndEngineering()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
