import { Divider, Grid, Header, Icon, List, Segment } from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";

import { type ReactNode } from "react";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract, interaction. */
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

  p = projectsTable["multirobot"];
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Abstract" : "概要"}</Header>
        <Segment basic>
          <LocalizedContent
            ja={
              <>
                <p>
                  ロボットに複雑なタスクをさせる場合、ユーザはまずロボットにすべきことを指示する。自律動作してタスクをこなすロボットでも、初めに指示を出すことが求められる。このため、ロボットの操作および教示インタフェースが必要とされている。この目的には、一般的に自然言語、ジョイスティックやその他のポインティングデバイスが用いられている。しかし、これらのインタフェースでは特に複数台のロボットを同時に操作することが困難である。
                </p>
                <p>
                  この不便を解消するため、我々は、複数台の移動型ロボットを操作するマルチタッチインタフェースを開発した。本インタフェースでは、ユーザが手でグローバルなベクトル場を編集すると、全てのロボットがそのベクトル場に従って動く。
                </p>
                <p>
                  本研究は卒業研究の一環として遂行され、CHI 2009
                  <a href="https://src.acm.org/winners/2010">
                    Student Research Competition
                  </a>
                  において一位を獲得した。
                </p>
              </>
            }
          >
            <p>
              Existing user interfaces for controlling mobile robots in
              real-time are generally for only one robot. Controlling multiple
              robots simultaneously is difficult. We developed a multi-touch
              interface with a top-down view from a ceiling-mounted camera for
              simultaneously controlling multiple mobile robots. Users touch and
              move their hands on the screen to specify the vector field, and
              all the robots move along the vector field. The test users in our
              study successfully operated multiple robots simultaneously with
              our interface.
            </p>
            <p>
              This was my graduate thesis work and won 1<sup>st</sup> place at
              CHI 2009{" "}
              <a href="https://src.acm.org/winners/2010">
                Student Research Competition
              </a>
              .
            </p>
          </LocalizedContent>
        </Segment>
        <Divider hidden />
      </>
    );
  }
  function renderInteraction(): ReactNode {
    return (
      <>
        <Header as="h2">
          {en
            ? "Multi-touch Vector Field Operation"
            : "ベクトル場を用いた複数ロボットの同時操作"}
        </Header>
        <Segment basic>
          <LocalizedContent
            ja={
              <>
                <p>
                  天井から見た俯瞰ビュー上で、マルチタッチディスプレイに触れている手の面の動きがベクトル場を生成する。画面内にあるすべてのロボットが、生成されたベクトル場に沿って動く。ユーザは以下の3つの操作モードでロボットの動きを制御できる。これらの操作モードを切り替えるための特別な操作が必要ないことに注意されたい。
                </p>
                <dl>
                  <dt>
                    <strong>Drag</strong>
                  </dt>
                  <dd>
                    ユーザがディスプレイに手を触れて動かすと、ベクトル場上に仮想的な流れができ、ロボットがその流れに沿って動く。
                  </dd>
                  <dt>
                    <strong>Mix</strong>
                  </dt>
                  <dd>
                    ユーザが既存の流れ場の上で手を動かすと、その手の動きによって生成されるベクトルと既存のベクトルが合計され、新しい流れ場ができる。
                  </dd>
                  <dt>
                    <strong>Hold</strong>
                  </dt>
                  <dd>
                    ユーザがディスプレイに手を触れて制止させたままにすると、手の下のベクトル場がリセットされる。これにより、ロボットを停止させることができる。
                  </dd>
                </dl>
              </>
            }
          >
            <p>
              With our multi-touch interface, users can navigate multiple robots
              simultaneously through three operation modes. Please note that the
              users do not need to switch between these modes explicitly.
            </p>
            <dl>
              <dt>
                <strong>Drag</strong>
              </dt>
              <dd>
                When users touch and drag their hands along the panel, a virtual
                stream appears on the vector field and robots move in accordance
                with the stream.
              </dd>
              <dt>
                <strong>Mix</strong>
              </dt>
              <dd>
                When users drag their fingers on existing streams, the vector
                data near the streams are blended in proportion to their
                distances from the streams. Nearer streams affect the vectors
                more strongly.
              </dd>
              <dt>
                <strong>Hold</strong>
              </dt>
              <dd>
                Touching the panel without further motion will reset the vectors
                under that hand. Thus, we can stop a robot by touching and
                holding an area in front of the robot.
              </dd>
            </dl>
          </LocalizedContent>
        </Segment>
        <Divider hidden />
      </>
    );
  }
  function renderVideos(): ReactNode {
    return (
      <>
        <EmbedYoutube src="//www.youtube.com/embed/zGioJvhsoIY" />
        <div className="caption">
          <List horizontal>
            <List.Item>
              <a href="//www.youtube.com/watch?v=QKtzsOU-sA8">
                <Icon name="youtube" />
                YouTube
              </a>
            </List.Item>
          </List>
        </div>
        <Divider hidden />
        <LinkedImage fluid href={href(`${rootPath}multirobot/operations.png`)}>
          <SiteImage src={`${rootPath}multirobot/operations.png`} />
        </LinkedImage>
        <div className="caption">
          {en ? "Three operation modes" : "3つの操作モード"}
        </div>
        <Divider hidden />
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project="multirobot" />
        <Divider hidden />
        <Grid stackable columns={2}>
          <Grid.Column>
            <section id="abstract">{renderAbstract()}</section>
            <section id="interaction">{renderInteraction()}</section>
          </Grid.Column>
          <Grid.Column>
            <section id="videos">{renderVideos()}</section>
          </Grid.Column>
        </Grid>
        <ProjectPublications
          project="multirobot"
          majorPublication="chi2009-kato-multirobot"
        />
      </SiteLayout>
    </>
  );
}
