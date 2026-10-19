import {
  Button,
  Card,
  Divider,
  Feed,
  Grid,
  Header,
  Icon,
  List,
  Modal,
  Popup,
  Segment,
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
            <Grid.Column width={8}>
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
            </Grid.Column>
            <Grid.Column width={8}>
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
            </Grid.Column>
          </Grid>
          <Segment basic id={"sns"}>
            <List horizontal>
              <List.Item>
                <Icon name="address card" />
                <List.Content>
                  <a href={"#contact"}>{en ? "Contact" : "連絡先"}</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="file" />
                <List.Content>
                  <SiteLink href={href(`${rootPath}resume.html`)}>
                    <HtmlContent
                      html={
                        en
                          ? 'Resume/<abbr title="Curriculum Vitae">CV</abbr>'
                          : 'レジュメ (<abbr title="Curriculum Vitae">CV</abbr>)'
                      }
                    />
                  </SiteLink>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="google" />
                <List.Content>
                  <SiteLink
                    href={href(
                      "https://scholar.google.co.jp/citations?user=U88aqc8AAAAJ&hl=" +
                        (en ? "en" : "ja"),
                    )}
                  >
                    {"Google Scholar"}
                  </SiteLink>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="linkedin" />
                <List.Content>
                  <a
                    href={"https://jp.linkedin.com/in/jkato"}
                    title={"LinkedIn"}
                  >
                    {"jkato"}
                  </a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="facebook" />
                <List.Content>
                  <a href={"https://facebook.com/jun.kato"} title={"Facebook"}>
                    {"jun.kato"}
                  </a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="twitter" />
                <List.Content>
                  <SiteLink
                    href={href(
                      "https://twitter.com/" + (en ? "junkato" : "arcatdmz"),
                    )}
                    title={"Twitter"}
                  >
                    {en ? "junkato" : "arcatdmz"}
                  </SiteLink>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon className="mastodon" />
                <List.Content>
                  <a rel={"me"} href={"https://hci.social/@junkato"}>
                    {"@junkato@hci.social"}
                  </a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="github" />
                <List.Content>
                  <a href={"https://github.com/arcatdmz"} title={"GitHub"}>
                    {"arcatdmz"}
                  </a>
                </List.Content>
              </List.Item>
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
          <Header.Content>{en ? "Recent updates" : "近況"}</Header.Content>
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
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date>{entry.getDateString(lang, true)}</Feed.Date>
                        <Feed.Summary>
                          <HtmlContent html={entry.text} />
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
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
          <Header.Content>{en ? "Projects" : "プロジェクト"}</Header.Content>
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
          <Header.Content>{en ? "Products" : "プロダクト"}</Header.Content>
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
          <Card.Group
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
          </Card.Group>
        </Segment>
      </>
    );
  }
  function renderTopics(): ReactNode {
    return (
      <>
        <Header as="h3" id={"topics"}>
          <Icon name="lightbulb" />
          <Header.Content>
            {en ? "Research topics" : "研究トピック"}
          </Header.Content>
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
                    <Grid.Column width={5}>
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
                    </Grid.Column>
                    <Grid.Column width={11}>
                      <Header
                        as={SiteLink}
                        href={href(p.getLink(lang, basePath))}
                      >
                        <HtmlContent html={p.getTitle(lang)} />
                      </Header>
                      <div className="description">
                        <HtmlContent html={p.getDescription(lang)} />
                      </div>
                    </Grid.Column>
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
          <Header.Content>{en ? "Contact" : "連絡先"}</Header.Content>
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
          <Segment.Group>
            <Segment>
              <List>
                <List.Item>
                  <Icon name="building" />
                  <List.Content>
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
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="marker" />
                  <List.Content>
                    {en
                      ? "Central 2, 1-1-1 Umezono, Tsukuba, Ibaraki, 305-8568, Japan"
                      : "305-8568 茨城県つくば市梅園1-1-1 中央事業所2群"}
                  </List.Content>
                </List.Item>
              </List>
              <Divider as="hr" />
              <List>
                <List.Item>
                  <Icon name="building" />
                  <List.Content>
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
                  </List.Content>
                </List.Item>

                {en ? (
                  <>
                    <List.Item>
                      <Icon name="marker" />
                      <List.Content>{"Tokyo, Japan"}</List.Content>
                    </List.Item>
                  </>
                ) : null}
              </List>
              <Divider as="hr" />
              <List horizontal>
                <List.Item>
                  <Icon name="mail" />
                  <List.Content>
                    <a href={"mailto:i@junkato.jp"}>{"i@junkato.jp"}</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="phone" />
                  <List.Content>
                    {en ? "+81" : "0"}
                    {"50-3522-3432"}
                  </List.Content>
                </List.Item>
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
                <Popup.Header>
                  <Icon name="handshake" /> {en ? "Collaborations" : "共同研究"}
                </Popup.Header>
                <Popup.Content>
                  {en
                    ? "I am actively seeking collaborators in both academia and industry. Click for more details."
                    : "学生の受け入れや技術提供などを行っています。クリックして詳細をご確認ください。"}
                </Popup.Content>
              </SitePopup>
            </Segment>
          </Segment.Group>
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
            <List.Item
              role="link"
              as={SiteLink}
              href={href(`${basePath}projects`)}
            >
              <Icon name="gift" />
              {en ? "Projects" : "プロジェクト"}
            </List.Item>
          </>
        }
        projectsHeaderMenu={
          <>
            <List.Item
              role="link"
              as={SiteLink}
              href={href(`${basePath}projects`)}
              className="print-hidden mobile hidden"
            >
              <Icon name="gift" />
              <span className="tablet or lower hidden">
                {en ? "Projects" : "プロジェクト"}
              </span>
            </List.Item>
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
                <List.Item role="link" as="a" href={"#body"}>
                  <Icon name="chevron circle up" />
                  <List.Content>{en ? "Top" : "トップ"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#history"}>
                  <Icon name="history" />
                  <List.Content>{en ? "Updates" : "近況"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#products"}>
                  <Icon name="gift" />
                  <List.Content>{en ? "Products" : "プロダクト"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#topics"}>
                  <Icon name="lightbulb" />
                  <List.Content>
                    {en ? "Research topics" : "研究トピック"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#contact"}>
                  <Icon name="address card" />
                  <List.Content>{en ? "Contact" : "連絡先"}</List.Content>
                </List.Item>
              </List>
            </SitePopup>
            <SiteModal size="large">
              <Modal.Header>{en ? "Profile photo" : "著者近影"}</Modal.Header>
              <Modal.Content scrolling>
                <Grid stackable>
                  <Grid.Row columns={5}>
                    <Grid.Column>
                      <LinkedImage
                        bordered
                        circular
                        fluid
                        href={href(`${rootPath}images/junkato.highres.jpg`)}
                      >
                        <SiteImage src={`${rootPath}images/junkato.jpg`} />
                      </LinkedImage>
                    </Grid.Column>
                    <Grid.Column>
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
                    </Grid.Column>
                    <Grid.Column>
                      <LinkedImage
                        bordered
                        circular
                        fluid
                        href={href(`${rootPath}images/junkato.alt.highres.jpg`)}
                      >
                        <SiteImage src={`${rootPath}images/junkato.alt.jpg`} />
                      </LinkedImage>
                    </Grid.Column>
                    <Grid.Column>
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
                    </Grid.Column>
                    <Grid.Column>
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
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
              <Modal.Content>
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
              </Modal.Content>
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
          <Header.Content>
            {author}
            <Header.Subheader>
              {en ? (
                <>{"Human-Computer Interaction researcher, Ph.D."}</>
              ) : (
                <>{"博士（情報理工学）"}</>
              )}
            </Header.Subheader>
          </Header.Content>
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
