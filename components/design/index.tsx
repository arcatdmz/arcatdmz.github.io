import {
  Button,
  Container,
  Divider,
  Grid,
  GridColumn,
  Header,
  Icon,
  ImageGroup,
  Label,
  List,
  ListContent,
  ListDescription,
  ListHeader,
  ListItem,
  Menu,
  MenuItem,
  MenuMenu,
  ModalContent,
  ModalHeader,
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
          <GridColumn>
            <Header as="h3">
              {en ? "As a graphic designer" : "グラフィックデザイン"}
            </Header>
            <List divided>{renderSkillsetGraphic()}</List>
          </GridColumn>
          <GridColumn>
            <Header as="h3">
              {en ? "As an interaction designer" : "インタラクションデザイン"}
            </Header>
            <List divided>{renderSkillsetIxd()}</List>
          </GridColumn>
        </Grid>
      </>
    );
  }
  function renderSkillsetGraphic(): ReactNode {
    return (
      <>
        <ListItem>
          <Icon size="large" className="devicon-photoshop-plain colored" />
          <ListContent>
            <ListHeader>{"Photoshop"}</ListHeader>
            <ListDescription>{data.durations["2002,9,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-illustrator-plain colored" />
          <ListContent>
            <ListHeader>{"Illustrator"}</ListHeader>
            <ListDescription>{data.durations["2002,9,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" name="ellipsis horizontal" />
          <ListContent>
            {en ? (
              <>
                <ListHeader>{"Other Adobe products"}</ListHeader>

                <ListDescription>
                  {"Premier for producing demo videos and InDesign for basic "}
                  <abbr title={"Desktop Publishing"}>{"DTP"}</abbr>
                  {" tasks"}
                </ListDescription>
              </>
            ) : (
              <>
                <ListHeader>{"その他のAdobe製品"}</ListHeader>

                <ListDescription>
                  {"Premier (デモ動画制作), InDesign ("}
                  <abbr title={"Desktop Publishing"}>{"DTP"}</abbr>
                  {")"}
                </ListDescription>
              </>
            )}
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-html5-plain colored" />
          <ListContent>
            <ListHeader>{"HTML"}</ListHeader>
            <ListDescription>{data.durations["2000,10,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" name="ellipsis horizontal" />
          <ListContent>
            <ListHeader>{"Pug (Jade)"}</ListHeader>
            <ListDescription>{data.durations["2015,0,5"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-css3-plain colored" />
          <ListContent>
            <ListHeader>{"CSS"}</ListHeader>
            <ListDescription>{data.durations["2000,10,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-less-plain-wordmark colored" />
          <ListContent>
            <ListHeader>{"Stylus and LESS"}</ListHeader>
            <ListDescription>{data.durations["2015,0,5"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-bootstrap-plain colored" />
          <ListContent>
            <ListHeader>{"Bootstrap (< 4)"}</ListHeader>
            <ListDescription>{data.durations["2012,2,19"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" name="ellipsis horizontal" />
          <ListContent>
            <ListHeader>{"Semantic UI"}</ListHeader>
            <ListDescription>{data.durations["2016,1,22"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-grunt-line colored" />
          <ListContent>
            <ListHeader>{"Grunt"}</ListHeader>
            <ListDescription>{data.durations["2015,0,5"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-gulp-plain colored" />
          <ListContent>
            <ListHeader>{"Gulp"}</ListHeader>
            <ListDescription>{data.durations["2017,11,5"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-vim-plain colored" />
          <ListContent>
            <ListHeader>{"Vim"}</ListHeader>
            <ListDescription>{data.durations["2005,5,1"]}</ListDescription>
          </ListContent>
        </ListItem>
      </>
    );
  }
  function renderSkillsetIxd(): ReactNode {
    return (
      <>
        <ListItem>
          <Icon size="large" className="devicon-javascript-plain colored" />
          <ListContent>
            <ListHeader>{"JavaScript"}</ListHeader>
            <ListDescription>{data.durations["2000,10,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-typescript-plain colored" />
          <ListContent>
            <ListHeader>{"TypeScript"}</ListHeader>
            <ListDescription>
              {"since it was called "}
              <a
                href={
                  "https://www.zdnet.com/article/who-built-microsoft-typescript-and-why/"
                }
              >
                {'"Strada"'}
              </a>
            </ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-jquery-plain colored" />
          <ListContent>
            <ListHeader>{"jQuery"}</ListHeader>
            <ListDescription>{data.durations["2012,2,19"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-d3js-plain colored" />
          <ListContent>
            <ListHeader>{"D3.js"}</ListHeader>
            <ListDescription>{data.durations["2017,11,7"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-webpack-plain colored" />
          <ListContent>
            <ListHeader>{"Webpack"}</ListHeader>
            <ListDescription>{data.durations["2017,11,5"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-babel-plain colored" />
          <ListContent>
            <ListHeader>{"Babel"}</ListHeader>
            <ListDescription>{data.durations["2017,11,5"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-nodejs-plain colored" />
          <ListContent>
            <ListHeader>{"Node.js"}</ListHeader>
            <ListDescription>{data.durations["2015,0,5"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-php-plain colored" />
          <ListContent>
            <ListHeader>{"PHP (< 7)"}</ListHeader>
            <ListDescription>{data.durations["2005,5,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-wordpress-plain colored" />
          <ListContent>
            <ListHeader>{"WordPress"}</ListHeader>
            <ListDescription>{data.durations["2005,5,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-csharp-plain colored" />
          <ListContent>
            <ListHeader>{"C#"}</ListHeader>
            <ListDescription>
              {"for desktop apps and ASP.NET apps"}
            </ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-java-plain colored" />
          <ListContent>
            <ListHeader>{"Java (< 8)"}</ListHeader>
            <ListDescription>
              {data.durations["2008,5,1"]}
              {", for robot and desktop apps and browser applets"}
            </ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-java-plain colored" />
          <ListContent>
            <ListHeader>{"Processing"}</ListHeader>
            <ListDescription>
              {data.durations["2008,5,1"]}
              {", mostly for robot apps using "}
              <SiteLink href={href(`${rootPath}phybots`)}>{"Phybots"}</SiteLink>
              {" and "}
              <SiteLink href={href(`${rootPath}picode`)}>{"Picode"}</SiteLink>
            </ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-visualstudio-plain colored" />
          <ListContent>
            <ListHeader>{"Visual Studio, Visual Studio Code"}</ListHeader>
            <ListDescription>
              {data.durations["2008,5,1"]}
              {" and since it was born, respectively"}
            </ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-mysql-plain colored" />
          <ListContent>
            <ListHeader>{"MySQL"}</ListHeader>
            <ListDescription>{data.durations["2005,9,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" name="ellipsis horizontal" />
          <ListContent>
            <ListHeader>{"Eclipse"}</ListHeader>
            <ListDescription>{data.durations["2008,5,1"]}</ListDescription>
          </ListContent>
        </ListItem>
        <ListItem>
          <Icon size="large" className="devicon-github-plain colored" />
          <ListContent>
            <ListHeader>{"GitHub"}</ListHeader>
            <ListDescription>
              {"see "}
              <a href={"https://github.com/arcatdmz"}>{"my repos"}</a>
            </ListDescription>
          </ListContent>
        </ListItem>
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
                    <ImageGroup className="tiny">
                      {p.images.map((image, itemIndex) => (
                        <Fragment key={itemIndex}>
                          <ModalImage className="for-modal">
                            <SiteImage src={image} displayHeight={70} />
                          </ModalImage>
                        </Fragment>
                      ))}
                    </ImageGroup>
                  </>
                ) : null}

                <List horizontal>
                  {(() => {
                    const children: ReactNode[] = [];
                    children.push(
                      <>
                        <ListItem>
                          <Label basic>
                            <Icon name="calendar" />
                            {p.getYearString(lang, buildYear)}
                          </Label>
                        </ListItem>
                      </>,
                    );
                    const tags = p.getDesignTags(lang);
                    if (tags.length > 0) {
                      for (const tag of tags) {
                        children.push(
                          <>
                            <ListItem>
                              <HtmlContent html={tag} />
                            </ListItem>
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
              <MenuMenu id={"research-menu"}>
                <MenuItem as={SiteLink} href={href(basePath)}>
                  <Icon name="lab" />

                  {en ? (
                    <>{"Back to research"}</>
                  ) : (
                    <>
                      {"研究"}

                      <span className="mobile hidden">{"に戻る"}</span>
                    </>
                  )}
                </MenuItem>
              </MenuMenu>
              <MenuMenu position="right" id={"design-menu"}>
                <SiteRightHeaderMenu context={context} />
              </MenuMenu>
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
                <ListItem role="link" as="a" href={"#body"}>
                  <Icon name="chevron circle up" />
                  <ListContent>{en ? "Top" : "トップ"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#portfolio"}>
                  <Icon name="history" />
                  <ListContent>
                    {en ? "Portfolio" : "ポートフォリオ"}
                  </ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#skillset"}>
                  <Icon name="user" />
                  <ListContent>{en ? "Skillset" : "スキルセット"}</ListContent>
                </ListItem>
              </List>
            </SitePopup>
            <SiteModal size="large">
              <ModalHeader>{"Header"}</ModalHeader>
              <ModalContent image>
                <SiteImage className="image" />
              </ModalContent>
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
