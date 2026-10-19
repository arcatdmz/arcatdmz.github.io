import { Divider, Grid, Header, Icon, List, Segment } from "react-fomantic-ui";

import { DeferredEmbed } from "@/site/components/DeferredEmbed";

import { LocalizedContent } from "@/site/components/LocalizedContent";

import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract, vision. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
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

  p = projectsTable["sharedo"];
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project="sharedo" />
        <Divider hidden />
        <section id="abstract">
          <Header as="h2">
            <Header.Content>{en ? "Abstract" : "概要"}</Header.Content>
          </Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <>
                  <p>
                    ユーザ間で To-do 共有が行える Web
                    サービスにおいて、ロボットにユーザと同等の権限を与えて、ユーザとロボットの間でタスクの分業を行えるようにした試作システム
                    Sharedo
                    について報告する。本システムには、リスト単位で共有相手を選べる機能がついている。また、To-do
                    ごとにコメント欄があり、曖昧な点について共有相手と対話できるようになっている。
                  </p>
                  <p>
                    本研究の詳細については、
                    <a href="http://sharedo.digitalmuseum.jp/research/wiss2011">
                      WISS 2011で登壇発表したときの資料ページ
                    </a>
                    が充実している。
                  </p>
                  <p>
                    本研究は
                    <a href="https://web.archive.org/web/20160722030805/http://rit.rakuten.co.jp/conf/rrds4/index.html">
                      第4回 楽天研究開発シンポジウム
                    </a>
                    にて最優秀賞を受賞したほか、
                    <a href="http://hai-conference.net/hai2014/program/">
                      <abbr title="Human-Agent Interaction">HAI</abbr>
                      2014
                    </a>
                    でBest Paper Nomineeに選定された。システムのプロトタイプが{" "}
                    <a href="http://www.sharedo.info">
                      http://www.sharedo.info
                    </a>{" "}
                    で稼働中である。
                  </p>
                </>
              }
            >
              <p>
                This paper proposes a to-do list interface for sharing tasks
                between human and multiple agents including robots and software
                personal assistants. While much work on software architectures
                aims to achieve efficient (semi-)autonomous task coordination
                among human and agents, little work on user interfaces can be
                found for user-oriented flexible task coordination. Instead,
                most of the existing human-agent interfaces are designed to
                command a single agent to handle specific kinds of tasks.
                Meanwhile, our interface is designed to be a platform to share
                any kinds of tasks between users and multiple agents. When
                agents can handle the task, they ask for details and permission
                to execute it. Otherwise, they try supporting users or just keep
                silence. New tasks can be registered not only by human but also
                by agents, when they suffer from errors that can only be
                recovered by human users.
              </p>
              <p>
                We present interaction design and implementation of the
                interface, Sharedo, with three example agents, followed by brief
                user feedback collected from a preliminary user study.
              </p>
              <p>
                The experimental implementation is available at{" "}
                <a href="http://www.sharedo.info">http://www.sharedo.info</a>.
                You can sign in with your Twitter account and share to-do lists
                with the shopping agent and the media content agent.
              </p>
            </LocalizedContent>
          </Segment>
        </section>
        <Divider hidden />
        <section id="presentations">
          <Header as="h2">{en ? "Presentation materials" : "発表内容"}</Header>
          <Segment basic>
            <Grid stackable columns={2}>
              <Grid.Column>
                <Header as="h3">{en ? "Demo Video" : "デモ動画"}</Header>
                <EmbedYoutube src="//www.youtube.com/embed/HxEUgOSwTeM" />
                <div className="caption">
                  <List horizontal>
                    <List.Item>
                      <a href="//www.youtube.com/watch?v=HxEUgOSwTeM">
                        <Icon name="youtube" />
                        YouTube
                      </a>
                    </List.Item>
                  </List>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  HAI 2014 {en ? "Slides" : "発表スライド"}
                </Header>

                <DeferredEmbed
                  url={publicationsTable[p.publication].entryTags.slides}
                  placeholder={`${rootPath}images/background-eee.png`}
                  icon="video play outline"
                ></DeferredEmbed>

                <div className="caption">
                  <List horizontal>
                    <List.Item>
                      <SiteLink
                        href={href(
                          publicationsTable[p.publication].entryTags.slides,
                        )}
                      >
                        <Icon name="download" />
                        {en ? "Download" : "ダウンロード"}
                      </SiteLink>
                    </List.Item>
                  </List>
                </div>

                {!en ? (
                  <>
                    <p className="caption">
                      日本語の発表スライドは
                      <a href="#publications">
                        <Icon name="book" />
                        発表文献
                      </a>
                      で日本語文献の <Icon fitted name="sidebar" />{" "}
                      をクリックすると閲覧できます。
                    </p>
                  </>
                ) : null}
              </Grid.Column>
            </Grid>
          </Segment>
        </section>
        {!en ? (
          <>
            <Divider hidden />
            <section id="vision">
              <Header as="h2">未来ビジョン</Header>
              <Segment basic>
                {en ? null : (
                  <>
                    <p>
                      現時点では多くの家庭用ロボットの完成度は人に遠く及ばない。この間を縮める工学的な努力をやめるべきでないというのは論を待たないが、一方で、より至近の未来、実世界において我々が情報技術による恩恵に与るにはどうしたらよいだろうか。以下に、二つの未来ビジョンを提示したい。
                    </p>
                    <p>
                      まず、我々は、ロボットに全ての雑務を任せて人は移動式ベッドに寝そべるだけの全自動な未来ではなく、人が得意なことは人が、ロボットが得意なことはロボットが行う「積極的な分業」の未来こそが幸せな解であると考えている。現状でも家電製品がユーザの余暇時間を増やしており、これも分業の一形態ではあるが、人にかかる負担を減らすためだけに機械を用いる「消極的な分業」が多いのではないか。人が楽しんで創造性を発揮できることをロボットにさせない自由があるべきだ。本提案は、そのための第一歩として、タスクの実行主体を選ぶ権利をユーザに提供するシステムである。
                    </p>
                    <p>
                      次に、我々は、人が情報システムの指示通りに実世界タスクをこなすことによって、自分でやり方を考えたときより楽にタスクをこなせる場合が多々あることに着目し、ロボットのように「自動的な人間」として動くことをもっと肯定的に捉えたいと考えている。例えば、本システムは掃除ロボットに回復不能なエラーが起きると人にタスクを割り当て、人をフェイルセーフとして利用することで掃除という大目標を確実に遂行できる。実社会ではOperations
                      Researchが組織の意思決定に使われるなどマクロな応用例が目立つが、我々は個人単位のタスクに興味がある。例えば、Human
                      Computationは遠隔地の知的労働力を計算能力に変換する手法だが、この実世界版としてHuman
                      Actuationというものが可能ならどのような形態になるのか考えてみたい。
                    </p>
                  </>
                )}
              </Segment>
            </section>
          </>
        ) : null}
        <Divider hidden />
        <ProjectPublications
          project="sharedo"
          majorPublication="hai2014-kato-sharedo"
        />
      </SiteLayout>
    </>
  );
}
