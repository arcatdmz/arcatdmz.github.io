import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Menu,
  Modal,
  Segment,
} from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import {
  ModalImage,
  SitePopup,
  SiteModal,
} from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { Fragment, type ReactNode } from "react";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href, attribute } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: skillset. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, projectsTable, rootPath } = data;
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

  p = projectsTable["design"];
  title = p.getTitle(lang);
  me = p.project + "/";
  bodyClass = "without-header-menu design";
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
  function renderPortfolio(): ReactNode {
    return (
      <>
        {(() => {
          const children: ReactNode[] = [];
          children.push(
            <>
              <Header dividing as="h2">
                {en ? "Portfolio" : "ポートフォリオ"}
              </Header>
            </>,
          );
          const sortedProjects = [];
          for (const p of projects) {
            if (!p.isDesignProject()) continue;
            sortedProjects.push(p);
          }
          sortedProjects.sort(function (a, b) {
            return b.year.from - a.year.from;
          });
          for (const p of sortedProjects) {
            children.push(<>{renderDesignSegment(p)}</>);
          }
          return keyed(children);
        })()}
      </>
    );
  }
  function renderSkillset(): ReactNode {
    return (
      <>
        <Header dividing as="h2">
          {en ? "Skillset" : "スキルセット"}
        </Header>
        <p>
          <LocalizedContent
            ja={
              "以下のリストは職域に必要となる要素技術にフォーカスしたリストです。プロトタイピング手法やユーザ調査手法といったスキルについては掲載していません。"
            }
          >
            {
              "The following list focuses on concrete technical tools appearing in common job descriptions. High-level skills such as methods for rapid prototyping and user studies are omitted. See "
            }
            <SiteLink href={href(`${rootPath}resume.html`)}>
              {"my resume"}
            </SiteLink>
            {" for more general information."}
          </LocalizedContent>
        </p>
        <Divider hidden />
        <Grid stackable columns={2}>
          <Grid.Column>
            <Header as="h3">
              {en ? "As a graphic designer" : "グラフィックデザイン"}
            </Header>
            <List divided>{renderSkillsetGraphic()}</List>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">
              {en ? "As an interaction designer" : "インタラクションデザイン"}
            </Header>
            <List divided>{renderSkillsetIxd()}</List>
          </Grid.Column>
        </Grid>
      </>
    );
  }
  function renderSkillsetGraphic(): ReactNode {
    return (
      <>
        <List.Item>
          <Icon size="large" className="devicon-photoshop-plain colored" />
          <List.Content>
            <List.Header>{"Photoshop"}</List.Header>
            <List.Description>{data.durations["2002,9,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-illustrator-plain colored" />
          <List.Content>
            <List.Header>{"Illustrator"}</List.Header>
            <List.Description>{data.durations["2002,9,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" name="ellipsis horizontal" />
          <List.Content>
            {en ? (
              <>
                <List.Header>{"Other Adobe products"}</List.Header>

                <List.Description>
                  {"Premier for producing demo videos and InDesign for basic "}
                  <abbr title={"Desktop Publishing"}>{"DTP"}</abbr>
                  {" tasks"}
                </List.Description>
              </>
            ) : (
              <>
                <List.Header>{"その他のAdobe製品"}</List.Header>

                <List.Description>
                  {"Premier (デモ動画制作), InDesign ("}
                  <abbr title={"Desktop Publishing"}>{"DTP"}</abbr>
                  {")"}
                </List.Description>
              </>
            )}
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-html5-plain colored" />
          <List.Content>
            <List.Header>{"HTML"}</List.Header>
            <List.Description>{data.durations["2000,10,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" name="ellipsis horizontal" />
          <List.Content>
            <List.Header>{"Pug (Jade)"}</List.Header>
            <List.Description>{data.durations["2015,0,5"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-css3-plain colored" />
          <List.Content>
            <List.Header>{"CSS"}</List.Header>
            <List.Description>{data.durations["2000,10,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-less-plain-wordmark colored" />
          <List.Content>
            <List.Header>{"Stylus and LESS"}</List.Header>
            <List.Description>{data.durations["2015,0,5"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-bootstrap-plain colored" />
          <List.Content>
            <List.Header>{"Bootstrap (< 4)"}</List.Header>
            <List.Description>{data.durations["2012,2,19"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" name="ellipsis horizontal" />
          <List.Content>
            <List.Header>{"Semantic UI"}</List.Header>
            <List.Description>{data.durations["2016,1,22"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-grunt-line colored" />
          <List.Content>
            <List.Header>{"Grunt"}</List.Header>
            <List.Description>{data.durations["2015,0,5"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-gulp-plain colored" />
          <List.Content>
            <List.Header>{"Gulp"}</List.Header>
            <List.Description>{data.durations["2017,11,5"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-vim-plain colored" />
          <List.Content>
            <List.Header>{"Vim"}</List.Header>
            <List.Description>{data.durations["2005,5,1"]}</List.Description>
          </List.Content>
        </List.Item>
      </>
    );
  }
  function renderSkillsetIxd(): ReactNode {
    return (
      <>
        <List.Item>
          <Icon size="large" className="devicon-javascript-plain colored" />
          <List.Content>
            <List.Header>{"JavaScript"}</List.Header>
            <List.Description>{data.durations["2000,10,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-typescript-plain colored" />
          <List.Content>
            <List.Header>{"TypeScript"}</List.Header>
            <List.Description>
              {"since it was called "}
              <a
                href={
                  "https://www.zdnet.com/article/who-built-microsoft-typescript-and-why/"
                }
              >
                {'"Strada"'}
              </a>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-jquery-plain colored" />
          <List.Content>
            <List.Header>{"jQuery"}</List.Header>
            <List.Description>{data.durations["2012,2,19"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-d3js-plain colored" />
          <List.Content>
            <List.Header>{"D3.js"}</List.Header>
            <List.Description>{data.durations["2017,11,7"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-webpack-plain colored" />
          <List.Content>
            <List.Header>{"Webpack"}</List.Header>
            <List.Description>{data.durations["2017,11,5"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-babel-plain colored" />
          <List.Content>
            <List.Header>{"Babel"}</List.Header>
            <List.Description>{data.durations["2017,11,5"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-nodejs-plain colored" />
          <List.Content>
            <List.Header>{"Node.js"}</List.Header>
            <List.Description>{data.durations["2015,0,5"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-php-plain colored" />
          <List.Content>
            <List.Header>{"PHP (< 7)"}</List.Header>
            <List.Description>{data.durations["2005,5,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-wordpress-plain colored" />
          <List.Content>
            <List.Header>{"WordPress"}</List.Header>
            <List.Description>{data.durations["2005,5,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-csharp-plain colored" />
          <List.Content>
            <List.Header>{"C#"}</List.Header>
            <List.Description>
              {"for desktop apps and ASP.NET apps"}
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-java-plain colored" />
          <List.Content>
            <List.Header>{"Java (< 8)"}</List.Header>
            <List.Description>
              {data.durations["2008,5,1"]}
              {", for robot and desktop apps and browser applets"}
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-java-plain colored" />
          <List.Content>
            <List.Header>{"Processing"}</List.Header>
            <List.Description>
              {data.durations["2008,5,1"]}
              {", mostly for robot apps using "}
              <SiteLink href={href(`${rootPath}phybots`)}>{"Phybots"}</SiteLink>
              {" and "}
              <SiteLink href={href(`${rootPath}picode`)}>{"Picode"}</SiteLink>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-visualstudio-plain colored" />
          <List.Content>
            <List.Header>{"Visual Studio, Visual Studio Code"}</List.Header>
            <List.Description>
              {data.durations["2008,5,1"]}
              {" and since it was born, respectively"}
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-mysql-plain colored" />
          <List.Content>
            <List.Header>{"MySQL"}</List.Header>
            <List.Description>{data.durations["2005,9,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" name="ellipsis horizontal" />
          <List.Content>
            <List.Header>{"Eclipse"}</List.Header>
            <List.Description>{data.durations["2008,5,1"]}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size="large" className="devicon-github-plain colored" />
          <List.Content>
            <List.Header>{"GitHub"}</List.Header>
            <List.Description>
              {"see "}
              <a href={"https://github.com/arcatdmz"}>{"my repos"}</a>
            </List.Description>
          </List.Content>
        </List.Item>
      </>
    );
  }
  function renderDesignSegment(p: any = undefined): ReactNode {
    return (
      <>
        {(() => {
          const children: ReactNode[] = [];
          const link = p.getLink(lang, basePath);
          children.push(
            <>
              <Segment basic id={attribute(p.project)}>
                {link === false ? (
                  <>
                    <SiteImage
                      ui
                      size="small"
                      floated="left"
                      sizes="150px"
                      src={`${rootPath}images/icons/${p.icon}`}
                    />
                  </>
                ) : (
                  <>
                    <LinkedImage size="small" floated="left" href={href(link)}>
                      <SiteImage
                        sizes="150px"
                        src={`${rootPath}images/icons/${p.icon}`}
                      />
                    </LinkedImage>
                  </>
                )}

                <Header as="h3">
                  <HtmlContent html={p.getDesignTitle(lang)} />
                </Header>

                <HtmlContent html={p.getDesignDescription(lang)} paragraph />

                {p.images ? (
                  <>
                    <Image.Group className="tiny">
                      {p.images.map((image, itemIndex) => (
                        <Fragment key={itemIndex}>
                          <ModalImage className="for-modal">
                            <SiteImage src={image} displayHeight={70} />
                          </ModalImage>
                        </Fragment>
                      ))}
                    </Image.Group>
                  </>
                ) : null}

                <List horizontal>
                  {(() => {
                    const children: ReactNode[] = [];
                    children.push(
                      <>
                        <List.Item>
                          <Label basic>
                            <Icon name="calendar" />
                            {p.getYearString(lang, buildYear)}
                          </Label>
                        </List.Item>
                      </>,
                    );
                    const tags = p.getDesignTags(lang);
                    if (tags.length > 0) {
                      for (const tag of tags) {
                        children.push(
                          <>
                            <List.Item>
                              <HtmlContent html={tag} />
                            </List.Item>
                          </>,
                        );
                      }
                    }
                    return keyed(children);
                  })()}
                </List>

                <Divider clearing />
              </Segment>
            </>,
          );
          return keyed(children);
        })()}
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        header={
          <>
            <Menu text fixed="top">
              <Menu.Menu id={"research-menu"}>
                <Menu.Item as={SiteLink} href={href(basePath)}>
                  <Icon name="lab" />

                  {en ? (
                    <>{"Back to research"}</>
                  ) : (
                    <>
                      {"研究"}

                      <span className="mobile hidden">{"に戻る"}</span>
                    </>
                  )}
                </Menu.Item>
              </Menu.Menu>
              <Menu.Menu position="right" id={"design-menu"}>
                <SiteRightHeaderMenu context={context} />
              </Menu.Menu>
            </Menu>
          </>
        }
        mainHero={
          <>
            <div className="hero-unit">
              <Header icon textAlign="center" as="h1">
                <Icon circular name="paint brush" />
                {title}
              </Header>
              <Container>
                <HtmlContent html={p.getDescription(lang)} />
              </Container>
            </div>
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
                <List.Item role="link" as="a" href={"#portfolio"}>
                  <Icon name="history" />
                  <List.Content>
                    {en ? "Portfolio" : "ポートフォリオ"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#skillset"}>
                  <Icon name="user" />
                  <List.Content>
                    {en ? "Skillset" : "スキルセット"}
                  </List.Content>
                </List.Item>
              </List>
            </SitePopup>
            <SiteModal size="large">
              <Modal.Header>{"Header"}</Modal.Header>
              <Modal.Content image>
                <SiteImage className="image" />
              </Modal.Content>
            </SiteModal>
          </>
        }
      >
        <section id={"portfolio"}>{renderPortfolio()}</section>
        <Divider hidden />
        <section id={"skillset"}>{renderSkillset()}</section>
      </SiteLayout>
    </>
  );
}
