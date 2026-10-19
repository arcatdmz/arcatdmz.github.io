import {
  Button,
  CardGroup,
  Divider,
  FeedContent,
  FeedDate,
  FeedEvent,
  FeedSummary,
  Grid,
  GridColumn,
  GridRow,
  Header,
  HeaderContent,
  HeaderSubheader,
  Icon,
  List,
  ListContent,
  ListItem,
  ModalContent,
  ModalHeader,
  PopupContent,
  PopupHeader,
  Segment,
  SegmentGroup,
} from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import {
  HomeHistory,
  HistoryFeed,
  HistoryMore,
} from "@/site/components/HomeHistory";
import { SnsLink } from "@/site/components/InteractiveLinks";
import { SitePopup, SiteModal, Avatar } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { Fragment, type ReactNode } from "react";
import { ProjectCard } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href, attribute } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: about, products, projects, contact. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { histories, products, selectedProjects, rootPath } = data;
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

  title = en ? "Portfolio of Jun Kato" : "加藤 淳のポートフォリオ";
  me = "";
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
  function renderAbout(): ReactNode {
    return (
      <>
        <Segment basic id={"about"}>
          <Grid stackable>
            <GridColumn width={8}>
              <Header as="h5">{en ? "Research area" : "研究内容"}</Header>
              <p>
                {en
                  ? "I am interested in the broad area of "
                  : "人とコンピュータの関係を考え、よりよくしていく学問 "}
                <strong>
                  <LocalizedContent
                    ja={
                      <>
                        {'"'}
                        <abbr title={"Human-Computer Interaction"}>
                          {"HCI"}
                        </abbr>
                        {'"'}
                      </>
                    }
                  >
                    {"Human-Computer Interaction (HCI)"}
                  </LocalizedContent>
                </strong>
                {en
                  ? ", and have been particularly passionate about "
                  : " の研究者です。とくに創作文化を支える技術的多様性に興味があり、"}
                <strong>
                  {en
                    ? "how computing can contribute to cultural diversity"
                    : "創作支援"}
                </strong>
                {en
                  ? ". As such, I have focused on the design of "
                  : "のための"}
                <strong>
                  {en
                    ? "user interfaces"
                    : "ユーザインタフェース、ツール、環境設計"}
                </strong>
                {en ? " and " : "を専門としています。"}
                <strong>
                  <LocalizedContent
                    ja={
                      <>
                        {"統合開発環境 ("}
                        <abbr title={"Integrated Development Environment"}>
                          {"IDE"}
                        </abbr>
                        {")"}
                      </>
                    }
                  >
                    {"integrated environments"}
                  </LocalizedContent>
                </strong>
                {en ? " for " : "で"}
                <strong>
                  <LocalizedContent
                    ja={
                      <>
                        {"プログラミング体験 ("}
                        <abbr title={"Programming Experience"}>{"PX"}</abbr>
                        {")"}
                      </>
                    }
                  >
                    {"creativity support"}
                  </LocalizedContent>
                </strong>
                {en
                  ? ". Improving "
                  : "を向上させる研究や、Webベースのツールで"}
                <strong>
                  {en
                    ? "Programming Experience (PX)"
                    : "音楽動画やアニメの制作プロセス"}
                </strong>
                {en
                  ? " is an important sub-goal to support the creativity of people with diverse technical backgrounds."
                  : "を支援する研究など、人々が創造性を発揮できる環境づくりに取り組んできました。"}
              </p>
            </GridColumn>
            <GridColumn width={8}>
              <Header as="h5">{en ? "Bio" : "略歴"}</Header>
              <p>
                <LocalizedContent
                  ja={
                    <>
                      {
                        "2014年 東京大学大学院コンピュータ科学専攻 博士課程を修了。同年より"
                      }
                      <a href={"https://www.aist.go.jp/"}>
                        {"産業技術総合研究所 ("}
                        <abbr
                          title={
                            "National Institute of Advanced Industrial Science and Technology"
                          }
                        >
                          {"AIST"}
                        </abbr>
                        {")"}
                      </a>
                      {
                        "研究員、2018年 主任研究員、2026年 上級主任研究員。2018年より"
                      }
                      <a href={"https://research.archinc.jp/"}>
                        {"アーチ株式会社"}
                      </a>
                      {
                        "技術顧問を兼務。2024年度パリ＝サクレ大学にVisiting Scientistとして滞在。"
                      }
                    </>
                  }
                >
                  {"He is a Chief Senior Researcher at "}
                  <a href={"https://www.aist.go.jp/index_en.html"}>
                    <abbr
                      title={
                        "National Institute of Advanced Industrial Science and Technology"
                      }
                    >
                      {"AIST"}
                    </abbr>
                  </a>
                  {" and the Technical Advisor ("}
                  <abbr title={"Principal Investigator"}>{"PI"}</abbr>
                  {") at "}
                  <a href={"https://research.archinc.jp/en"}>
                    {"Arch Research"}
                  </a>
                  {" with a focus on "}
                  <abbr title={"Programming Experience"}>{"PX"}</abbr>
                  {" and creativity support research. "}
                  {"\n"}
                  {
                    "From April 2024 to March 2025, he was a Visiting Scientist at "
                  }
                  <a href={"https://ex-situ.lri.fr/about"}>{"ex)situ"}</a>
                  {" group, LISN, Université Paris-Saclay. "}
                </LocalizedContent>
                {"\n"}
                <LocalizedContent
                  ja={
                    <>
                      {"Human-Computer Interaction、とくに"}
                      <abbr
                        title={"Programming Experience; プログラミング体験"}
                      >
                        {"PX"}
                      </abbr>
                      {
                        "向上や創造性支援ツールの研究に従事。ACM CHI Honorable Mention (2013, 2015, 2023) や"
                      }
                      <a
                        href={
                          "https://blog.junkato.jp/ja/posts/2025-12-28-nistep-sti-hz-vol11no4/"
                        }
                      >
                        {"ナイスステップな研究者"}
                      </a>
                      {"選定 (2024) など"}
                      <SiteLink href={href(`${basePath}publications/#awards`)}>
                        {"受賞多数"}
                      </SiteLink>
                      {"。"}
                    </>
                  }
                >
                  {"He received a Ph.D. from "}
                  <a
                    href={"https://www-ui.is.s.u-tokyo.ac.jp/en/"}
                    title={"Prof. Takeo Igarashi (User Interface Research Lab)"}
                  >
                    {"The University of Tokyo"}
                  </a>
                  {" (2014) and has regularly gained "}
                  <SiteLink href={href(`${basePath}publications/#awards`)}>
                    {"academic recognitions"}
                  </SiteLink>
                  {" such as Honorable Mentions at ACM "}
                  <abbr
                    title={
                      "The SIGCHI conference on Human Factors in Computing Systems"
                    }
                  >
                    {"CHI"}
                  </abbr>
                  {" (2013, 2015, 2023) and "}
                  <a
                    href={
                      "https://www.ipsj.or.jp/english/organization/aboutipsj/award/ACM-Award-E.html#hdg6"
                    }
                    title={
                      "IPSJ/ACM Award for Early Career Contributions to Global Research"
                    }
                  >
                    {"IPSJ/ACM Award"}
                  </a>
                  {" (2021)."}
                </LocalizedContent>
              </p>
            </GridColumn>
          </Grid>
          <Segment basic id={"sns"}>
            <List horizontal>
              <ListItem>
                <Icon name="address card" />
                <ListContent>
                  <a href={"#contact"}>{en ? "Contact" : "連絡先"}</a>
                </ListContent>
              </ListItem>
              <ListItem>
                <Icon name="file" />
                <ListContent>
                  <SiteLink href={href(`${rootPath}resume.html`)}>
                    <HtmlContent
                      html={
                        en
                          ? 'Resume/<abbr title="Curriculum Vitae">CV</abbr>'
                          : 'レジュメ (<abbr title="Curriculum Vitae">CV</abbr>)'
                      }
                    />
                  </SiteLink>
                </ListContent>
              </ListItem>
              <ListItem>
                <Icon name="google" />
                <ListContent>
                  <SiteLink
                    href={href(
                      "https://scholar.google.co.jp/citations?user=U88aqc8AAAAJ&hl=" +
                        (en ? "en" : "ja"),
                    )}
                  >
                    {"Google Scholar"}
                  </SiteLink>
                </ListContent>
              </ListItem>
              <ListItem>
                <Icon name="linkedin" />
                <ListContent>
                  <a
                    href={"https://jp.linkedin.com/in/jkato"}
                    title={"LinkedIn"}
                  >
                    {"jkato"}
                  </a>
                </ListContent>
              </ListItem>
              <ListItem>
                <Icon name="facebook" />
                <ListContent>
                  <a href={"https://facebook.com/jun.kato"} title={"Facebook"}>
                    {"jun.kato"}
                  </a>
                </ListContent>
              </ListItem>
              <ListItem>
                <Icon name="twitter" />
                <ListContent>
                  <SiteLink
                    href={href(
                      "https://twitter.com/" + (en ? "junkato" : "arcatdmz"),
                    )}
                    title={"Twitter"}
                  >
                    {en ? "junkato" : "arcatdmz"}
                  </SiteLink>
                </ListContent>
              </ListItem>
              <ListItem>
                <Icon className="mastodon" />
                <ListContent>
                  <a rel={"me"} href={"https://hci.social/@junkato"}>
                    {"@junkato@hci.social"}
                  </a>
                </ListContent>
              </ListItem>
              <ListItem>
                <Icon name="github" />
                <ListContent>
                  <a href={"https://github.com/arcatdmz"} title={"GitHub"}>
                    {"arcatdmz"}
                  </a>
                </ListContent>
              </ListItem>
            </List>
          </Segment>
        </Segment>
      </>
    );
  }
  function renderHistory(): ReactNode {
    return (
      <HomeHistory lang={lang}>
        <Header as="h2">
          <Icon name="history" />
          <HeaderContent>{en ? "Recent updates" : "近況"}</HeaderContent>
        </Header>

        <Segment basic>
          <HistoryFeed className="divided">
            {(() => {
              const children: ReactNode[] = [];
              var i = 0;
              for (const entry of histories[lang]) {
                if (++i > 5) break;
                children.push(
                  <>
                    <FeedEvent>
                      <FeedContent>
                        <FeedDate>{entry.getDateString(lang, true)}</FeedDate>
                        <FeedSummary>
                          <HtmlContent html={entry.text} />
                        </FeedSummary>
                      </FeedContent>
                    </FeedEvent>
                  </>,
                );
              }
              return keyed(children);
            })()}
          </HistoryFeed>
        </Segment>

        {data.historyCount > 5 ? (
          <>
            <Segment basic textAlign="right">
              <HistoryMore attached="left" className="more">
                <Icon name="zoom" />
                {en ? "More" : "もっと見る"}
              </HistoryMore>
              <Button
                role="link"
                as={SiteLink}
                href={href(`${basePath}timeline/`)}
                data-content={
                  en
                    ? "Show the timeline of updates and publications"
                    : "時系列で全ての更新履歴と発表文献を見ることができます"
                }
                data-position={"top right"}
                className="right attached all with-popup"
              >
                <Icon name="expand" />
                {en ? "Show all" : "全部見る"}
              </Button>
            </Segment>
          </>
        ) : null}
      </HomeHistory>
    );
  }
  function renderProjects(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="gift" />
          <HeaderContent>{en ? "Projects" : "プロジェクト"}</HeaderContent>
        </Header>
        {renderProducts()}
        {renderTopics()}
      </>
    );
  }
  function renderProducts(): ReactNode {
    return (
      <>
        <Header as="h3" id={"products"}>
          <Icon name="star" />
          <HeaderContent>{en ? "Products" : "プロダクト"}</HeaderContent>
        </Header>
        <Segment basic>
          <p>
            <LocalizedContent
              ja={
                <>
                  {
                    "以下の研究成果はクリエイタ向けのWebサービスやプログラマ向けの"
                  }
                  <abbr title={"Application Programming Interface"}>
                    {"API"}
                  </abbr>
                  {"として一般公開されています。"}
                </>
              }
            >
              {
                "The following services and tools are beyond research prototypes and used in production."
              }
            </LocalizedContent>
          </p>
          <Divider hidden />
          <CardGroup
            stackable
            itemsPerRow={2}
            id="products-list"
            className="projects"
          >
            {products.map((p, itemIndex) => (
              <Fragment key={itemIndex}>
                <ProjectCard p={p} />
              </Fragment>
            ))}
          </CardGroup>
        </Segment>
      </>
    );
  }
  function renderTopics(): ReactNode {
    return (
      <>
        <Header as="h3" id={"topics"}>
          <Icon name="lightbulb" />
          <HeaderContent>
            {en ? "Research topics" : "研究トピック"}
          </HeaderContent>
        </Header>
        <Segment basic>
          {(() => {
            const children: ReactNode[] = [];
            for (const p of selectedProjects) {
              if (p.isPrivateProject(lang)) continue;
              if (!p.getLink(lang, basePath)) continue;
              children.push(
                <>
                  <Grid
                    stackable
                    columns={2}
                    id={attribute(`topics-${p.project}`)}
                  >
                    <GridColumn width={5}>
                      <LinkedImage
                        bordered
                        fluid
                        href={href(p.getLink(lang, basePath))}
                      >
                        <SiteImage
                          sizes="(max-width: 767px) calc(100vw - 2rem), 340px"
                          src={`${rootPath}images/panels/${p.getThumbnail(
                            lang,
                          )}`}
                        />
                      </LinkedImage>
                    </GridColumn>
                    <GridColumn width={11}>
                      <Header
                        as={SiteLink}
                        href={href(p.getLink(lang, basePath))}
                      >
                        <HtmlContent html={p.getTitle(lang)} />
                      </Header>
                      <div className="description">
                        <HtmlContent html={p.getDescription(lang)} />
                      </div>
                    </GridColumn>
                  </Grid>
                </>,
              );
              children.push(
                <>
                  <Divider />
                </>,
              );
            }
            children.push(
              <>
                <LocalizedContent
                  ja={
                    <p>
                      {"すべての研究プロジェクトを見るには「"}
                      <SiteLink href={href(`${rootPath}ja/projects`)}>
                        <Icon name="gift" />
                        {"プロジェクト"}
                      </SiteLink>
                      {"」をご覧ください。"}
                    </p>
                  }
                >
                  <p>
                    {"For the exhaustive list of projects, see "}
                    <SiteLink href={href(`${rootPath}projects`)}>
                      <Icon name="lab" />
                      {"Projects"}
                    </SiteLink>
                    {"."}
                  </p>
                </LocalizedContent>
              </>,
            );
            return keyed(children);
          })()}
        </Segment>
      </>
    );
  }
  function renderContact(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="address card" />
          <HeaderContent>{en ? "Contact" : "連絡先"}</HeaderContent>
        </Header>
        <Segment basic>
          <p>
            {en
              ? "Please contact me via email or "
              : "電話は原則チェックしていないため、メールか"}
            <SnsLink href={"#sns"} className={"sns"}>
              {en
                ? "social networking sites"
                : "ソーシャルネットワークサービス"}
            </SnsLink>
            {en
              ? " rather than telephone if possible. I rarely check these conventional machines."
              : "経由でのご連絡をおすすめします。"}
          </p>
          <SegmentGroup>
            <Segment>
              <List>
                <ListItem>
                  <Icon name="building" />
                  <ListContent>
                    {en ? (
                      <>
                        <a href={"https://unit.aist.go.jp/hiiri/meirg/"}>
                          {"Media Interaction Group"}
                        </a>

                        {", "}

                        <a href={"https://unit.aist.go.jp/hiiri/index-en.html"}>
                          {
                            "Human Informatics and Interaction Research Institute (HIIRI)"
                          }
                        </a>

                        {", "}

                        <a href={"https://www.aist.go.jp/index_en.html"}>
                          {
                            "National Institute of Advanced Industrial Science and Technology (AIST)"
                          }
                        </a>
                      </>
                    ) : (
                      <>
                        <a href={"https://www.aist.go.jp/"}>
                          {"国立研究開発法人 産業技術総合研究所 ("}
                          <abbr
                            title={
                              "National Institute of Advanced Industrial Science and Technology"
                            }
                          >
                            {"AIST"}
                          </abbr>
                          {")"}
                        </a>

                        {", "}

                        <a href={"https://unit.aist.go.jp/hiiri/"}>
                          {"人間情報インタラクション研究部門 ("}
                          <abbr
                            title={
                              "Human Informatics and Interaction Research Institute"
                            }
                          >
                            {"HIIRI"}
                          </abbr>
                          {")"}
                        </a>

                        {", "}

                        <a href={"https://unit.aist.go.jp/hiiri/meirg/"}>
                          {"メディアインタラクション研究グループ"}
                        </a>
                      </>
                    )}
                  </ListContent>
                </ListItem>
                <ListItem>
                  <Icon name="marker" />
                  <ListContent>
                    {en
                      ? "Central 2, 1-1-1 Umezono, Tsukuba, Ibaraki, 305-8568, Japan"
                      : "305-8568 茨城県つくば市梅園1-1-1 中央事業所2群"}
                  </ListContent>
                </ListItem>
              </List>
              <Divider as="hr" />
              <List>
                <ListItem>
                  <Icon name="building" />
                  <ListContent>
                    {en ? (
                      <>
                        <a href={"https://research.archinc.jp/en"}>
                          {"Arch Research"}
                        </a>

                        {", "}

                        <a href={"https://archinc.jp/en"}>{"Arch Inc."}</a>
                      </>
                    ) : (
                      <>
                        <a href={"https://archinc.jp/"}>{"アーチ株式会社"}</a>

                        {", "}

                        <a href={"https://research.archinc.jp/"}>
                          {"Arch Research"}
                        </a>
                      </>
                    )}
                  </ListContent>
                </ListItem>

                {en ? (
                  <>
                    <ListItem>
                      <Icon name="marker" />
                      <ListContent>{"Tokyo, Japan"}</ListContent>
                    </ListItem>
                  </>
                ) : null}
              </List>
              <Divider as="hr" />
              <List horizontal>
                <ListItem>
                  <Icon name="mail" />
                  <ListContent>
                    <a href={"mailto:i@junkato.jp"}>{"i@junkato.jp"}</a>
                  </ListContent>
                </ListItem>
                <ListItem>
                  <Icon name="phone" />
                  <ListContent>
                    {en ? "+81" : "0"}
                    {"50-3522-3432"}
                  </ListContent>
                </ListItem>
              </List>
            </Segment>
            <Segment secondary textAlign="right">
              <SitePopup
                position="top right"
                trigger={
                  <Button
                    role="link"
                    icon
                    primary
                    size="large"
                    labelPosition="left"
                    as={SiteLink}
                    href={href(`${basePath}collaborations`)}
                    data-position={"top right"}
                    className="with-popup"
                  >
                    <Icon name="handshake" />
                    {en ? "Collaborations?" : "共同研究しませんか？"}
                  </Button>
                }
              >
                <PopupHeader>
                  <Icon name="handshake" /> {en ? "Collaborations" : "共同研究"}
                </PopupHeader>
                <PopupContent>
                  {en
                    ? "I am actively seeking collaborators in both academia and industry. Click for more details."
                    : "学生の受け入れや技術提供などを行っています。クリックして詳細をご確認ください。"}
                </PopupContent>
              </SitePopup>
            </Segment>
          </SegmentGroup>
        </Segment>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        head={
          <>
            <link
              rel={"alternate"}
              type={"application/rss+xml"}
              href={href(`${basePath}rss.xml`)}
            />
          </>
        }
        projectsSidebarMenu={
          <>
            <ListItem
              role="link"
              as={SiteLink}
              href={href(`${basePath}projects`)}
            >
              <Icon name="gift" />
              {en ? "Projects" : "プロジェクト"}
            </ListItem>
          </>
        }
        projectsHeaderMenu={
          <>
            <ListItem
              role="link"
              as={SiteLink}
              href={href(`${basePath}projects`)}
              className="print-hidden mobile hidden"
            >
              <Icon name="gift" />
              <span className="tablet or lower hidden">
                {en ? "Projects" : "プロジェクト"}
              </span>
            </ListItem>
          </>
        }
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
                <ListItem role="link" as="a" href={"#body"}>
                  <Icon name="chevron circle up" />
                  <ListContent>{en ? "Top" : "トップ"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#history"}>
                  <Icon name="history" />
                  <ListContent>{en ? "Updates" : "近況"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#products"}>
                  <Icon name="gift" />
                  <ListContent>{en ? "Products" : "プロダクト"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#topics"}>
                  <Icon name="lightbulb" />
                  <ListContent>
                    {en ? "Research topics" : "研究トピック"}
                  </ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#contact"}>
                  <Icon name="address card" />
                  <ListContent>{en ? "Contact" : "連絡先"}</ListContent>
                </ListItem>
              </List>
            </SitePopup>
            <SiteModal size="large">
              <ModalHeader>{en ? "Profile photo" : "著者近影"}</ModalHeader>
              <ModalContent scrolling>
                <Grid stackable>
                  <GridRow columns={5}>
                    <GridColumn>
                      <LinkedImage
                        bordered
                        circular
                        fluid
                        href={href(`${rootPath}images/junkato.highres.jpg`)}
                      >
                        <SiteImage src={`${rootPath}images/junkato.jpg`} />
                      </LinkedImage>
                    </GridColumn>
                    <GridColumn>
                      <LinkedImage
                        bordered
                        circular
                        fluid
                        href={href(
                          `${rootPath}images/junkato.comics.highres.png`,
                        )}
                      >
                        <SiteImage
                          src={`${rootPath}images/junkato.comics.png`}
                        />
                      </LinkedImage>
                    </GridColumn>
                    <GridColumn>
                      <LinkedImage
                        bordered
                        circular
                        fluid
                        href={href(`${rootPath}images/junkato.alt.highres.jpg`)}
                      >
                        <SiteImage src={`${rootPath}images/junkato.alt.jpg`} />
                      </LinkedImage>
                    </GridColumn>
                    <GridColumn>
                      <LinkedImage
                        bordered
                        circular
                        fluid
                        href={href(
                          `${rootPath}images/junkato.alt2.highres.jpg`,
                        )}
                      >
                        <SiteImage src={`${rootPath}images/junkato.alt2.jpg`} />
                      </LinkedImage>
                    </GridColumn>
                    <GridColumn>
                      <LinkedImage
                        bordered
                        circular
                        fluid
                        href={href(
                          `${rootPath}images/junkato.alt3.highres.jpg`,
                        )}
                      >
                        <SiteImage src={`${rootPath}images/junkato.alt3.jpg`} />
                      </LinkedImage>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </ModalContent>
              <ModalContent>
                {en ? (
                  <>
                    <ul>
                      <li>{"Click to download full resolution images."}</li>
                      <li>
                        {
                          "The comic version was drawn by Akira Shinohara as part of the "
                        }
                        <a
                          href={
                            "https://www.aist.go.jp/aist_j/magazine/20240415.html"
                          }
                        >
                          {"AIST magazine"}
                        </a>
                        {"."}
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>{"クリックでフル解像度をダウンロードできます"}</li>
                      <li>
                        {"漫画版は"}
                        <a
                          href={
                            "https://www.aist.go.jp/aist_j/magazine/20240415.html"
                          }
                        >
                          {"産総研マガジン"}
                        </a>
                        {"に掲載された篠原 彬氏の手によるものです"}
                      </li>
                    </ul>
                  </>
                )}
              </ModalContent>
            </SiteModal>
          </>
        }
      >
        <Header as="h1">
          <Avatar
            ui
            circular
            id={"avatar"}
            loading="eager"
            fetchPriority="high"
            src={`${rootPath}images/junkato.jpg`}
            data-alt-src={`${rootPath}images/junkato.comics.png`}
          />
          <HeaderContent>
            {author}
            <HeaderSubheader>
              {en ? (
                <>{"Human-Computer Interaction researcher, Ph.D."}</>
              ) : (
                <>{"博士（情報理工学）"}</>
              )}
            </HeaderSubheader>
          </HeaderContent>
        </Header>
        {renderAbout()}
        <section id={"history"}>{renderHistory()}</section>
        <Divider hidden />
        <section id={"projects"}>{renderProjects()}</section>
        <Divider hidden />
        <section id={"contact"}>{renderContact()}</section>
      </SiteLayout>
    </>
  );
}
