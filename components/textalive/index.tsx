import {
  Button,
  Divider,
  Feed,
  Grid,
  Header,
  Icon,
  Item,
  Label,
  List,
  Message,
  Segment,
} from "react-fomantic-ui";

import { DeferredEmbed } from "@/site/components/DeferredEmbed";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SitePopup } from "@/site/components/SiteWidgets";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract, news. */
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

  p = projectsTable["textalive"];
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
  function renderNews(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="announcement" />
          <Header.Content>{en ? "News" : "ニュース"}</Header.Content>
        </Header>
        <Segment basic>
          <LocalizedContent
            ja={
              <Feed size="small" className="divided">
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2021/-/-"}</Feed.Date>
                    <Feed.Summary>
                      {"最新情報は"}
                      <a href={"https://textalive.jp/events"}>
                        {"TextAliveの活用事例を紹介したイベントページ"}
                      </a>
                      {"や"}
                      <a
                        href={
                          "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
                        }
                      >
                        {"更新履歴"}
                      </a>
                      {"、後続研究「"}
                      <SiteLink href={href(`${basePath}lyric-app-framework`)}>
                        {"Lyric App Framework"}
                      </SiteLink>
                      {"」をご覧ください。"}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2020/9/18"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "TextAliveの機能を使って音楽に合わせてタイミングよく歌詞が動くWebアプリケーション（リリックアプリ）を開発できるJavaScript用のライブラリ「"
                      }
                      <a href={"https://developer.textalive.jp/"}>
                        {"TextAlive App "}
                        <abbr title={"Application Programming Interface"}>
                          {"API"}
                        </abbr>
                        {"」"}
                      </a>
                      {"がリリースされました。また、"}
                      <a
                        href={
                          "https://developer.textalive.jp/events/magicalmirai2020"
                        }
                      >
                        {"初音ミク「マジカルミライ 2020」"}
                      </a>
                      {
                        "で、同APIを利用した、イベント史上初のプログラミング・コンテストの実施が発表されました。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2019/11/13"}</Feed.Date>
                    <Feed.Summary>
                      <a href={"https://www.morisawa.co.jp/about/news/4707"}>
                        {"モリサワ株式会社のInter BEE 2019出展ブース"}
                      </a>
                      {"で、TextAliveのデモ映像が展示されました。"}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2019/9/6"}</Feed.Date>
                    <Feed.Summary>
                      <a
                        href={
                          "https://prtimes.jp/main/html/rd/p/000000002.000045795.html"
                        }
                      >
                        {
                          "舞台美術を手がける「シミズオクト」がプロデュースする「ジュリアナの祟り」ライブ"
                        }
                      </a>
                      {
                        "で、アーティスト自身がTextAliveを活用して制作した歌詞アニメーションが紗幕に上映されました。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2019/6/17"}</Feed.Date>
                    <Feed.Summary>
                      <a href={"https://textalive.jp/events/magicalmirai2019"}>
                        {"初音ミク「マジカルミライ 2019」"}
                      </a>
                      {
                        "でTextAliveを活用して制作した歌詞アニメーションが使われ、TextAlive講座が開かれました。企画展ステージでもTextAlive制作映像が使われました。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2019/2/8"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "SNOW MIKU LIVE! 2019でTextAliveを使って制作した歌詞アニメーションが使われました。これにあわせて"
                      }
                      <a href={"https://docs.textalive.jp/history/"}>
                        {"v0.7.0"}
                      </a>
                      {
                        "をリリースし、「カラフルキャンバス」スタイルを追加しました。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2018/8/20"}</Feed.Date>
                    <Feed.Summary>
                      <a href={"https://docs.textalive.jp/magicalmirai2018"}>
                        {"初音ミク「マジカルミライ 2018」"}
                      </a>
                      {
                        "でTextAliveを使って制作した歌詞アニメーションが使われる他、TextAlive講座が開かれます。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2018/2/10"}</Feed.Date>
                    <Feed.Summary>
                      <a href={"https://docs.textalive.jp/snowmiku2018"}>
                        {"SNOW MIKU LIVE! 2018"}
                      </a>
                      {
                        "でTextAliveを使って制作した歌詞アニメーションが使われました。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2016/10/16"}</Feed.Date>
                    <Feed.Summary>
                      <a href={"https://docs.textalive.jp/nomaps2016/"}>
                        {"No Maps 2016"}
                      </a>
                      {
                        "のIDOL DIVERSITYでTextAliveを使って制作した歌詞アニメーションが使われたほか、デモ展示を行い、piaproユーザ向けに動画のダウンロード機能をリリースしました。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2016/2/5"}</Feed.Date>
                    <Feed.Summary>
                      <a href={"http://textalive.jp/snowmiku2016"}>
                        {"SNOW MIKU 2016とのタイアップ企画"}
                      </a>
                      {
                        "でイラストと一緒に歌詞アニメーションを楽しめるようになりました。"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"2015/9/8"}</Feed.Date>
                    <Feed.Summary>
                      {"本研究は"}
                      <a
                        href={
                          "https://www.aist.go.jp/aist_j/press_release/pr2015/pr20150908/pr20150908.html"
                        }
                      >
                        {"プレスリリース"}
                      </a>
                      {"と同時に"}
                      <a href={"https://textalive.jp"}>
                        {"Webサービスとして一般公開"}
                      </a>
                      {"を始めました。ぜひお試しください。"}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            }
          >
            <Feed size="small" className="divided">
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{"2021/-/-"}</Feed.Date>
                  <Feed.Summary>
                    {"Latest information can be found on "}
                    <a href={"https://textalive.jp/events"}>
                      {"the TextAlive event page"}
                    </a>
                    {", "}
                    <a
                      href={
                        "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
                      }
                    >
                      {"its update history"}
                    </a>
                    {", or its follow-up work titled "}
                    <SiteLink href={href(`${basePath}lyric-app-framework`)}>
                      {'"Lyric App Framework."'}
                    </SiteLink>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{"9/18/2020"}</Feed.Date>
                  <Feed.Summary>
                    <a href={"https://developer.textalive.jp/"}>
                      {"TextAlive App "}
                      <abbr title={"Application Programming Interface"}>
                        {"API"}
                      </abbr>
                      {" was released,"}
                    </a>
                    {
                      ' a JavaScript library for developing "lyric apps" (cf. lyric videos) that show lyrics synchronized with the music playback. '
                    }
                    {"\n"}
                    {"The programming contest usng the API in "}
                    <a
                      href={
                        "https://developer.textalive.jp/events/magicalmirai2020"
                      }
                    >
                      {'Hatsune Miku "Magical Mirai 2020"'}
                    </a>
                    {" was also announced."}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{"9/6/2019"}</Feed.Date>
                  <Feed.Summary>
                    {"TextAlive was used to author "}
                    <a
                      href={
                        "https://www.youtube.com/watch?v=1ReP_Z2llig&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                      }
                    >
                      {"videos"}
                    </a>
                    {" for "}
                    <a href={"https://www.crypton.co.jp/miku_eng"}>
                      {"Hatsune Miku"}
                    </a>
                    {"."}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{"8/20/2018"}</Feed.Date>
                  <Feed.Summary>
                    {"Once again, TextAlive was used to author "}
                    <a
                      href={
                        "https://www.youtube.com/watch?v=yCufFSunfLc&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                      }
                    >
                      {"videos"}
                    </a>
                    {" for "}
                    <a href={"https://www.crypton.co.jp/miku_eng"}>
                      {"Hatsune Miku"}
                    </a>
                    {"."}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{"2/10/2018"}</Feed.Date>
                  <Feed.Summary>
                    {
                      "TextAlive was used to author videos for a live performance by a renowned virtual singer, "
                    }
                    <a href={"https://www.crypton.co.jp/miku_eng"}>
                      {"Hatsune Miku"}
                    </a>
                    {". The live performance was recorded and "}
                    <a href={"https://www.youtube.com/watch?v=0USE9AMu8i8"}>
                      {"its exerpt"}
                    </a>
                    {" as well as "}
                    <a
                      href={
                        "https://www.youtube.com/watch?v=0assSnUjkLA&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                      }
                    >
                      {"the rendered full HD 60fps video"}
                    </a>
                    {
                      ' for "Round off the Square Earth" are available on YouTube.'
                    }
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{"10/16/2016"}</Feed.Date>
                  <Feed.Summary>
                    {
                      "TextAlive was used to author videos for a live performance by a Japanese idol group, "
                    }
                    <a
                      href={
                        "https://jpop.fandom.com/wiki/Bellring_Shoujo_Heart"
                      }
                    >
                      {"Bellring Shoujo Heart"}
                    </a>
                    {
                      ". The rendered full HD 60fps videos are available on YouTube ("
                    }
                    <a
                      href={
                        "https://www.youtube.com/watch?v=dE8Lzh0CNSw&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                      }
                    >
                      {"asthma"}
                    </a>
                    {", "}
                    <a
                      href={
                        "https://www.youtube.com/watch?v=5Yb-LBBqxnM&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                      }
                    >
                      {"ROOM 24-7"}
                    </a>
                    {")."}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{"1/25/2016"}</Feed.Date>
                  <Feed.Summary>
                    <a href={"https://textalive.jp"}>
                      {"TextAlive has been publicly available as a web service"}
                    </a>
                    {" after "}
                    <SiteLink
                      href={
                        "httsp://www.aist.go.jp/aist_e/list/latest_research/2015/20160125/en20160125.html"
                      }
                    >
                      {"the press release"}
                    </SiteLink>
                    {". Please have it a try!"}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
            <p>
              {"For more detailed news, please refer to "}
              <a href={"https://textalive.jp/events"}>
                {"the Japanese event page"}
              </a>
              {"."}
            </p>
          </LocalizedContent>
        </Segment>
      </>
    );
  }
  function renderAbstract(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Header.Content>{en ? "Abstract" : "概要"}</Header.Content>
        </Header>
        <Segment basic>
          <LocalizedContent
            ja={
              <>
                <p>
                  {
                    "Kinetic Typographyは、文字を動かして見せることで意味をより深く伝えられる手法として、楽曲のプロモーションなどの動画で頻繁に利用されている。しかし、歌詞を楽曲と同期してアニメーションさせる動画を制作するためには、まず、動画制作ツールの使い方に慣れる必要があった。さらに、歌詞を文字ごとに時刻同期させて動きを手付けするため、多くの手間がかかっていた。"
                  }
                </p>
                <p>
                  {
                    "TextAliveは、ウェブ上に公開されている楽曲と歌詞の時間的対応付けを自動で推定し、Kinetic Typographyを用いた動画を自動生成する。したがって、事前にツールの使い方を学ばなくても、好みの楽曲のKinetic Typography動画を楽しむことができる。また、生成された動画をウェブ上のグラフィカルなインタフェースで編集でき、一から動画を作るより大幅に少ない手間で動画を制作できる。さらに、文字の動きを定めているアルゴリズムをその場でプログラミングでき、プリセットのテンプレートに縛られない自由な表現が可能である。"
                  }
                </p>
                <Message>
                  {"本研究は、 2015/9/8 に"}
                  <a
                    href={
                      "https://www.aist.go.jp/aist_j/press_release/pr2015/pr20150908/pr20150908.html"
                    }
                  >
                    {"プレスリリース"}
                  </a>
                  {"と同時に、リリックビデオの制作支援Webサービス「"}
                  <a href={"https://textalive.jp"}>{"TextAlive"}</a>
                  {"」として一般公開されました。最新情報は"}
                  <a href={"https://textalive.jp/events"}>
                    {"TextAliveの活用事例を紹介したイベントページ"}
                  </a>
                  {"や"}
                  <a
                    href={
                      "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
                    }
                  >
                    {"更新履歴のページ"}
                  </a>
                  {"をご覧ください。"}
                </Message>
                <Message>
                  {"2020/9/18 には、開発者向けに「"}
                  <a href={"https://developer.textalive.jp"}>
                    {"TextAlive App "}
                    <abbr title={"Application Programming Interface"}>
                      {"API"}
                    </abbr>
                  </a>
                  {
                    "」がリリースされました。インタラクティブな歌詞駆動メディア「リリックアプリ」を開発できます。"
                  }
                  {"\n"}
                  {"詳しくは、リリックアプリの開発フレームワーク「"}
                  <SiteLink href={href(`${basePath}lyric-app-framework`)}>
                    {"Lyric App Framework"}
                  </SiteLink>
                  {"」の研究紹介をご覧ください。"}
                </Message>
              </>
            }
          >
            <p>
              {
                "This paper presents TextAlive, a graphical tool that allows interactive editing of kinetic typography videos in which lyrics or transcripts are animated in synchrony with the corresponding music or speech."
              }
            </p>
            <p>
              {
                "While existing systems have allowed the designer and casual user to create animations, most of them do not take into account synchronization with audio signals. They allow predefined motions to be applied to objects and parameters to be tweaked, but it is usually impossible to extend the predefined set of motion algorithms within these systems."
              }
            </p>
            <p>
              {
                "We therefore propose an integrated design environment featuring"
              }
            </p>
            <ul>
              <li>
                {
                  "GUIs that designers can use to create and edit animations synchronized with audio signals,"
                }
              </li>
              <li>
                {
                  "integrated tools that programmers can use to implement animation algorithms, and"
                }
              </li>
              <li>
                {
                  "a framework for bridging the interfaces for designers and programmers."
                }
              </li>
            </ul>
            <p>
              {
                "A preliminary user study with designers, programmers, and casual users demonstrated its capability in authoring various kinetic typography videos."
              }
            </p>
            <Message>
              {"The system was made publicly available as "}
              <a href={"https://textalive.jp"}>{"TextAlive"}</a>
              {", a web service for authoring lyric videos, with "}
              <a
                href={
                  "https://www.aist.go.jp/aist_e/list/latest_research/2015/20160125/en20160125.html"
                }
              >
                {"a press release"}
              </a>
              {" on 9/8/2015. Latest information can be found on "}
              <a href={"https://textalive.jp/events"}>
                {"the TextAlive event page"}
              </a>
              {" or "}
              <a
                href={
                  "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
                }
              >
                {"its update history"}
              </a>
              {"."}
            </Message>
            <Message>
              {"On 9/18/2020, "}
              <a href={"https://developer.textalive.jp"}>
                {"TextAlive App "}
                <abbr title={"Application Programming Interface"}>{"API"}</abbr>
              </a>
              {
                ' was released for developers. It allows the development of interactive lyric-driven visual media that we name "lyric apps."'
              }
              {"\n"}
              {"For more information, please refer to the follow-up page on "}
              <SiteLink href={href(`${basePath}lyric-app-framework`)}>
                {"Lyric App Framework"}
              </SiteLink>
              {"."}
            </Message>
          </LocalizedContent>
        </Segment>
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Presentation materials" : "発表内容"}</Header>
        <Segment basic>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Header as="h3">{"CHI 2015 Fast-forward"}</Header>
              <EmbedYoutube src={"//www.youtube.com/embed/lOdt-pf5U8Q"} />
              <div className="caption">
                <List horizontal>
                  <List.Item>
                    <a href={"//www.youtube.com/watch?v=lOdt-pf5U8Q"}>
                      <Icon name="youtube" />
                      {"Fast-forward"}
                    </a>
                  </List.Item>
                  <List.Item>
                    <a href={"//www.youtube.com/watch?v=ofczPQZaWMk"}>
                      <Icon name="youtube" />
                      {"Full version"}
                    </a>
                  </List.Item>
                </List>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                {"CHI 2015 "}
                {en ? "Slides" : "発表スライド"}
              </Header>

              <DeferredEmbed
                url={publicationsTable[p.publication].entryTags.slides}
                placeholder={`${rootPath}images/background-eee.png`}
                icon={"video play outline"}
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
                    {"日本語の発表スライドは"}
                    <a href={"#publications"}>
                      <Icon name="book" />
                      {"発表文献"}
                    </a>
                    {"で日本語文献の "}
                    <Icon fitted name="sidebar" />
                    {" をクリックすると閲覧できます。"}
                  </p>
                </>
              ) : null}
            </Grid.Column>
          </Grid>
        </Segment>
      </>
    );
  }
  function renderExamples(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Example videos" : "作例"}</Header>
        <Segment basic>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Header as="h3">
                {en ? "TextAlive Online" : "Web版"}
                <Label size="tiny">
                  <Icon name="calendar" />
                  <span>{"2015-"}</span>
                </Label>
              </Header>

              <EmbedYoutube
                src={
                  "https://www.youtube.com/embed/videoseries?list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                }
              />

              {!en ? (
                <>
                  <p className="caption">
                    {
                      "Web版のTextAliveは現在も開発が続けられています。この作例は、初音ミクやアイドルのライブなどで利用されたものです。 "
                    }
                    <a href={"https://textalive.jp"}>{"textalive.jp"}</a>
                    {" にアクセスすれば、誰でも動画を制作できます。"}
                  </p>
                </>
              ) : null}
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                {en ? "TextAlive Desktop" : "デスクトップ版"}
                <Label size="tiny">
                  <Icon name="calendar" />
                  <span>{"2014-2015"}</span>
                </Label>
              </Header>

              <EmbedYoutube src={"https://www.youtube.com/embed/ofczPQZaWMk"} />

              {!en ? (
                <>
                  <p className="caption">
                    {
                      "デスクトップ版のTextAliveは研究用プロトタイプとして開発されました。この作例は、プログラマや音楽動画制作者の方々を対象としたユーザスタディなどで制作されたものです。"
                    }
                  </p>
                </>
              ) : null}
            </Grid.Column>
          </Grid>
        </Segment>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="gift" />
          <Header.Content>
            {en ? "Relevant projects" : "関連プロジェクト"}
          </Header.Content>
        </Header>
        <Segment basic>
          <Segment>
            <Item.Group divided className="projects">
              <ProjectItem p={projectsTable["lyric-app-framework"]} />
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
            </Item.Group>
          </Segment>
        </Segment>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project={"textalive"} />
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
                <List.Item role="link" as="a" href={"#abstract"}>
                  <Icon name="triangle right" />
                  <List.Content>{en ? "Abstract" : "概要"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#presentations"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Presentations" : "発表内容"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#examples"}>
                  <Icon name="triangle right" />
                  <List.Content>{en ? "Example videos" : "作例"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#publications"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Publications" : "発表文献"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#further-readings"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </List.Content>
                </List.Item>
              </List>
            </SitePopup>
          </>
        }
      >
        <div className="with-rail">
          <div className="right-rail">
            <section id={"news"}>{renderNews()}</section>
          </div>
          <div className="left-content">
            <section id={"abstract"}>{renderAbstract()}</section>
            <Segment basic textAlign="right">
              <Button role="link" primary as="a" href={"//textalive.jp"}>
                <Icon name="external" />
                {en ? "Service Website" : "Webサイトへ"}
              </Button>
            </Segment>
            <Divider hidden />
            <section id={"presentations"}>{renderPresentations()}</section>
          </div>
          <Divider hidden />
          <section id={"examples"}>{renderExamples()}</section>
        </div>
        <Divider hidden />
        <ProjectPublications
          project={"textalive"}
          majorPublication={"chi2015-kato-textalive"}
        />
        <Divider hidden />
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
      </SiteLayout>
    </>
  );
}
