import Link from "next/link";
import { useRouter } from "next/router";
import { type ReactNode, useState } from "react";
import {
  Button,
  Divider,
  Header,
  Icon,
  Item,
  List,
  Message,
  Segment,
} from "react-fomantic-ui";

import { useBrowserLayoutEffect } from "@/site/hooks/useBrowserLayoutEffect";
import { HtmlContent } from "@/site/components/content/HtmlContent";
import { LocalizedContent } from "@/site/components/content/LocalizedContent";
import { SiteLayout } from "@/site/components/layout/SiteLayout";
import { SiteLink } from "@/site/components/links/SiteLink";
import { ProjectItem } from "@/site/components/projects/ProjectItem";
import { ResearchTopic } from "@/site/components/projects/ResearchTopic";
import { SitePopup } from "@/site/components/widgets/SitePopup";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import {
  isResearchProject,
  partitionProjectFilter,
  projectFilterHref,
  projectFilterTag,
  type ProjectFilterTag,
} from "@/site/project-filter";
import { href, keyed } from "@/site/rendering";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: projects, research, design-and-engineering. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, rootPath } = data;
  const router = useRouter();
  const [initialPath, setInitialPath] = useState<string | null>(null);
  useBrowserLayoutEffect(() => {
    setInitialPath(
      window.location.pathname + window.location.search + window.location.hash,
    );
  }, []);
  const hydrated = initialPath !== null;
  const currentPath = hydrated && !router.isReady ? initialPath : router.asPath;
  const filterTags: ProjectFilterTag[] = data.misc.projectFilterTags || [];
  const activeTag = hydrated ? projectFilterTag(currentPath, filterTags) : "";
  useBrowserLayoutEffect(() => {
    if (hydrated)
      document.documentElement.removeAttribute("data-project-filter-pending");
  }, [hydrated, activeTag]);
  const research = projects.filter(isResearchProject);
  const topic = data.projectsTable[activeTag];
  const eligibleTopic = topic?.getLink(
    pageData.language,
    rootPath + (pageData.language === "ja" ? "ja/" : ""),
  )
    ? topic
    : undefined;
  const { featured: featuredResearch, projects: visibleResearch } =
    partitionProjectFilter(research, activeTag, eligibleTopic);
  const filteredCount = visibleResearch.length + (featuredResearch ? 1 : 0);
  const selectedTag = filterTags.find((t) => t.key === activeTag);
  const filterHref = (tag: string) => projectFilterHref(currentPath, tag);
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
    languageSearch: hydrated
      ? new URL(currentPath, "https://site.invalid").search
      : "",
    p,
    title,
    description,
    imageUrl,
    bodyClass,
  };
  function renderPublicationsMenu(): ReactNode {
    return (
      <>
        <List divided className="project-navigation">
          <List.Item role="link" as="a" href="#research">
            <Icon name="lab" />
            <List.Content>{en ? "Research" : "研究"}</List.Content>
          </List.Item>
          <List.Item>
            <List.List
              className="project-tag-filters"
              aria-label={
                en
                  ? "Filter research projects by tag"
                  : "研究プロジェクトをタグで絞り込み"
              }
            >
              {[
                {
                  key: "",
                  label: en ? "All" : "すべて",
                  title: en
                    ? "All research projects"
                    : "すべての研究プロジェクト",
                  count: research.length,
                },
                ...filterTags,
              ].map((tag) => (
                <List.Item
                  as={Link}
                  href={filterHref(tag.key)}
                  shallow
                  scroll={false}
                  prefetch={false}
                  key={tag.key}
                  active={activeTag === tag.key}
                  aria-current={activeTag === tag.key ? "true" : undefined}
                  data-project-filter={tag.key}
                  title={tag.title}
                >
                  <List.Content>
                    <HtmlContent html={tag.label} />
                  </List.Content>
                </List.Item>
              ))}
            </List.List>
          </List.Item>
          <List.Item role="link" as="a" href="#design-and-engineering">
            <Icon name="paint brush" />
            <List.Content>
              {en ? "Design and Engineering" : "デザイン・開発"}
            </List.Content>
          </List.Item>
        </List>
      </>
    );
  }
  function renderAbout(): ReactNode {
    return (
      <>
        <Segment basic id="about">
          <LocalizedContent
            ja={
              <p>
                このページでは加藤が関わってきた研究・開発・デザインに関するプロジェクトの一覧を見ることができます。グラフィックデザインとインタラクションデザインに絞った一覧は
                <SiteLink href={href(`${rootPath}ja/design`)}>
                  <Icon name="paint brush" />
                  デザイン
                </SiteLink>
                のページでも確認できます。
              </p>
            }
          >
            <p>
              This page shows the list of research projects. See{" "}
              <SiteLink href={href(`${rootPath}design`)}>
                <Icon name="paint brush" />
                Design
              </SiteLink>{" "}
              for the design-oriented list of my projects.
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
          <Header.Content>
            {en ? "Research projects" : "研究プロジェクト"}
          </Header.Content>
        </Header>
        <Segment basic>
          <p>
            {en
              ? "The following research-oriented projects have been conducted under a certain scientific context and most of them have been published at archival venues."
              : "研究者として、所属先の東京大学、Microsoft Research、産業技術総合研究所、アーチで取り組んできた研究プロジェクトの一覧です。"}
          </p>
          <p className="project-filter-pending" role="status">
            {en ? "Loading…" : "読み込み中…"}
          </p>
          <div className="project-filter-results">
            {selectedTag ? (
              <Message
                onDismiss={() => {
                  void router.push(filterHref(""), undefined, {
                    shallow: true,
                    scroll: false,
                  });
                }}
                role="status"
                aria-live="polite"
                data-research-filter-status
              >
                <HtmlContent html={selectedTag.title} />：{" "}
                {en
                  ? `${filteredCount} of ${research.length} projects`
                  : `${filteredCount}件 / 全${research.length}件`}
              </Message>
            ) : null}
            <noscript>
              {en
                ? "Enable JavaScript to filter research projects by tag."
                : "タグで絞り込むにはJavaScriptを有効にしてください。"}
            </noscript>
            {featuredResearch ? (
              <>
                <Segment basic data-featured-tag-project={activeTag}>
                  <ResearchTopic p={featuredResearch} />
                </Segment>
                <Divider />
              </>
            ) : null}
            <Item.Group divided id="other-projects-list" className="projects">
              {visibleResearch.map((p) => (
                <ProjectItem key={p.project} p={p} />
              ))}
            </Item.Group>
          </div>
        </Segment>
      </>
    );
  }
  function renderDesignAndEngineering(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="paint brush" />
          <Header.Content>
            {en
              ? "Design and/or engineering projects"
              : "デザイン・開発プロジェクト"}
          </Header.Content>
        </Header>
        <Segment basic>
          <p>
            {en
              ? "The following design and engineering projects have been conducted as part of my hobby or probono activities."
              : "デザインや開発に主眼が置かれたプロジェクトです。趣味またはプロボノ的活動として取り組んできました。"}
          </p>
          <Item.Group
            divided
            id="design-and-engineering-projects-list"
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
          </Item.Group>
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
            <Header.Content>{en ? "Projects" : "プロジェクト"}</Header.Content>
          </Header>
          {renderAbout()}
          <Divider hidden />
          <section id="research">{renderResearch()}</section>
          <Divider hidden />
          <section id="design-and-engineering">
            {renderDesignAndEngineering()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
