import {
  Button,
  Divider,
  Feed,
  Grid,
  Header,
  Icon,
  Item,
  List,
  Segment,
} from "react-fomantic-ui";

import { DeferredEmbed } from "@/site/components/DeferredEmbed";
import { LinkedImage } from "@/site/components/LinkedImage";

import { SitePopup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { ProjectHero, ProjectItem } from "@/site/components/ContentComponents";
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

/** Shared page template. Both locales inherit the default content. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, rootPath, protocol, domain } = data;
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

  title = en
    ? title || "User Interfaces for Live Programming"
    : "ライブプログラミングのためのユーザインタフェース";
  description = en
    ? description ||
      "Live programming eliminates the gulf between code and execution. To design live programming systems, we first need to understand what we are developing. Once we gain domain-specific knowledge of the target applications, we create user interfaces to edit the running application, such as scrubbing sliders, color palettes, and timeline interfaces. The key to the fluid programming experience of live programming is the combination of deep understanding of the target applications and adoption of interactive user interfaces."
    : "ライブプログラミングはコーディングと実行・デバッグの間の溝をなくす試みです。ライブプログラミングをサポートするシステムを設計するためには、まず何を開発しようとしているのかについての理解が必要です。開発対象のアプリケーションに関するドメイン固有の知識を得たら、次は、実行中のアプリケーションを編集するためのユーザインタフェースを作ります。それは、例えばスライダーだったり、カラーパレットだったり、タイムラインインタフェースだったりするでしょう。ライブプログラミングにおいてなめらかなプログラミング体験を提供する鍵となるのは、開発対象のアプリケーションに関する深い理解と、インタラクティブなユーザインタフェースの採用です。";
  imageUrl = `${protocol}://${domain}${rootPath}images/panels/live-programming.jpg`;
  me = "live-programming/";
  const slideUrl = `${protocol}://${domain}${rootPath}publications/live2017-kato-keynote-slides.pdf`;
  const slideImagePath = `${rootPath}live-programming/live2017/live2017-kato-keynote-slides`;
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
        <Header as="h2">{en ? "Summary" : "概要"}</Header>
        <Segment basic>
          <p>{description}</p>
          <Grid stackable columns={2}>
            <Grid.Column>
              {en ? (
                <>
                  <p>
                    {"At "}
                    <a href={"https://jssst2023.wordpress.com/tutorial"}>
                      {"the tutorial course as part of The 40th "}
                      <abbr
                        title={
                          "Japan Society for Software Science and Technology"
                        }
                      >
                        {"JSSST"}
                      </abbr>
                      {" Annual Conference (Japanese)"}
                    </a>
                    {", me and visual artist "}
                    <a href={"https://baku89.com/?lang=en"}>
                      {"Baku Hashimoto"}
                    </a>
                    {
                      " served as lecturers, presenting a brief history of Live Programming research and providing a hands-on opportunity to develop a web-based Live Programming system."
                    }
                  </p>

                  <p>
                    {
                      'Programming environments that focus on "liveness" have been around for a long time, like visual programming and Smalltalk-based systems, but they have recently attracted renewed attention as a key idea to realize a fluid programming experience. We attempted to review the situation from the point of view of both researchers and artists.'
                    }
                  </p>
                </>
              ) : (
                <>
                  <p>
                    {" "}
                    <a href={"https://jssst2023.wordpress.com/tutorial"}>
                      {"日本ソフトウェア科学会 第40回大会 チュートリアル"}
                    </a>
                    {"では、ビジュアルアーティストの"}
                    <a href={"https://baku89.com"}>{"橋本麦"}</a>
                    {
                      "氏と共に講師を務め、ライブプログラミング研究の概略史紹介と、ライブプログラミング環境を開発するハンズオンを行いました。「ライブネス（Liveness）」に着目したプログラミング環境はビジュアルプログラミングやSmalltalk処理系など古くからありましたが、近年、滑らかなプログラミング体験を提供するキーアイデアの一つとして改めて注目されています。研究者とアーティスト双方の観点から状況整理を試みました。"
                    }
                  </p>
                </>
              )}
            </Grid.Column>
            <Grid.Column>
              {en ? (
                <>
                  <p>
                    {
                      'In the keynote talk at LIVE \'17, I discussed the liveness of programming systems in light of user interface design. I introduced user interfaces for programming and discussed the importance of integrating graphical representations into programming environments. I extended the scope of "liveness" by describing two kinds of interactions, physical and developer-user, and provided insights on designing future live programming systems.'
                    }
                  </p>

                  <p>
                    {
                      "In particular, regarding the user interfaces for enhancing developer-user interactions, there are two sub-projects called "
                    }
                    <SiteLink href={href(`${basePath}live-tuning/`)}>
                      {"Live Tuning"}
                    </SiteLink>
                    {" and "}
                    <SiteLink
                      href={href(`${basePath}user-generated-variables/`)}
                    >
                      {"User-Generated Variables"}
                    </SiteLink>
                    {"."}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <a
                      href={
                        "https://2017.splashcon.org/details/live-2017/7/Keynote-User-Interfaces-for-Live-Programming"
                      }
                    >
                      {"LIVE 2017 基調講演"}
                    </a>
                    {
                      "では、ユーザインターフェース設計の観点からプログラミング環境の「ライブネス（Liveness）」について議論しました。プログラミングのためのユーザインターフェースを紹介し、画像表現をプログラミング環境に統合することの重要性を論じました。物理的なインタラクションと、開発者・ユーザ間のインタラクションという2種類のインタラクションを具体的な研究事例と共に紹介し、「ライブネス」の定義を拡大して、将来のライブプログラミング・システムの設計に関して示唆を提供しました。"
                    }
                  </p>
                </>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
      </>
    );
  }
  function renderPresentationJssst2023(): ReactNode {
    return (
      <>
        <Header as="h2">
          {en ? (
            <>
              {"The 40th "}

              <abbr title={"Japan Society for Software Science and Technology"}>
                {"JSSST"}
              </abbr>

              {" Annual Conference Tutorial"}
            </>
          ) : (
            <>{"日本ソフトウェア科学会 第40回大会 チュートリアル"}</>
          )}
        </Header>
        <Segment basic>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Header as="h3">
                {en ? "Presentation Slides (Japanese)" : "発表スライド"}
              </Header>
              <DeferredEmbed
                url={
                  "https://docs.google.com/presentation/d/e/2PACX-1vSFvd9_lLppM-CnW9Qr2TXxPCETq9WAedQPIvgTebXe328vTvSP3-SUIJNGtimZR7ygSSb4LOHheLYq/embed"
                }
                placeholder={`${rootPath}live-programming/jssst2023/jssst-live-programming-tutorial.jpg`}
                icon={"video play outline"}
              ></DeferredEmbed>
              <div className="caption">
                <Header as="h4">
                  {en
                    ? "Introduction to Live Programming: Try It, Make It, Know It"
                    : "試して作って知る Live Programming入門"}
                </Header>
                <List divided horizontal>
                  <List.Item>
                    <a
                      href={
                        "https://docs.google.com/presentation/d/1MIDPeccko-oce83eaWLKuEctzjt2NF_R9b-ouhc_yCI/edit?usp=sharing"
                      }
                    >
                      <Icon name="external" />
                      {"Google Slides"}
                    </a>
                  </List.Item>
                  <List.Item>
                    <a href={"https://jssst2023.wordpress.com/tutorial"}>
                      <Icon name="external" />
                      {en
                        ? "Tutorial official page (Japanese)"
                        : "大会公式ページ"}
                    </a>
                  </List.Item>
                </List>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                {en
                  ? "What is Live Programming?"
                  : "ライブプログラミングとは？"}
              </Header>
              <LinkedImage
                bordered
                fluid
                href={href(
                  `${rootPath}live-programming/jssst2023/jssst-live-programming-tutorial-16.jpg`,
                )}
              >
                <SiteImage
                  src={`${rootPath}live-programming/jssst2023/jssst-live-programming-tutorial-16.jpg`}
                />
              </LinkedImage>
              <div className="caption">
                {en ? (
                  <>
                    <p>
                      {"Live Programming has the clear advantage of "}
                      <strong>{"not"}</strong>
                      {
                        " forcing programmers to bet on a single shot, a feature captured in "
                      }
                      <a href={"https://dspace.mit.edu/handle/1721.1/61549"}>
                        {"Chris Hancook's dissertation"}
                      </a>
                      {" by the metaphor of the bow and the watering hose."}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {"ライブプログラミングには一発必中をプログラマに"}
                      <strong>{"強いない"}</strong>
                      {"特長があります。"}
                      <a href={"https://dspace.mit.edu/handle/1721.1/61549"}>
                        {"Chris Hancook氏の博士論文"}
                      </a>
                      {"ではこれを弓とホースの比喩で表しました。"}
                    </p>
                  </>
                )}
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment basic>
          {en ? (
            <>
              <p>
                {
                  "This tutorial introduced the history of live programming research and examined its significance from different perspectives by reviewing related tools and practices proposed in research and used in visual art."
                }
              </p>

              <p>
                {
                  'Technically speaking, the pursuit of "liveness" in programming systems reached a milestone in the 1990s, when many visual programming systems employing dataflow languages and environments, including '
                }
                <a href={"https://doi.org/10.1016/S1045-926X(05)80012-6"}>
                  {"VIVA"}
                </a>
                {
                  ", were researched and developed to allow interactive editing of programs, and a framework for user interface development in Smalltalk-based systems, "
                }
                <a href={"http://dx.doi.org/10.1145/215585.215636"}>
                  {"Morphic"}
                </a>
                {
                  ", appeared. However, with the exception of Spreadsheet, visual programming did not become mainstream, and general-purpose object-oriented languages and integrated development environments, which were in some ways degraded from Smalltalk, gained popularity."
                }
              </p>

              <p>
                {
                  'We had to wait until the 2010s to see a renewed interest in "liveness" in the programming experience, when '
                }
                <a href={"https://archive.org/details/vimeo-36579366"}>
                  {'Bret Victor\'s "Inventing on Principle" talk'}
                </a>
                {" with many appealing demonstrations took place and "}
                <a href={"https://liveprog.org"}>
                  {"the Workshop on Live Programming"}
                </a>
                {
                  ' was held for the first time. Here I see "liveness" as a kind of user experience that can be achieved by building '
                }
                <a href={"http://worrydream.com/LadderOfAbstraction/"}>
                  {"a ladder of abstraction"}
                </a>
                {
                  " from an abstract programming language to a concrete program execution state, and individual technical components such as a single programming language design or a single tool design do not seem to be sufficient. At the heart of the design of live programming systems is the design of the user interface, which is tailored to the domain-specificity of the applications to be developed in the programming system. From this perspective, visual programming environments for designers and tools for the visual arts have been successful for a long time, and more recently, there have been an increasing number of live programming systems specialized for diverse application domains."
                }
              </p>

              <p>
                {"For this tutorial, please also see "}
                <a
                  href={
                    "https://scrapbox.io/ProgrammingExperience/JSSST2023_%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB"
                  }
                >
                  {"the corresponding page on Scrapbox (Wiki site; Japanese)"}
                </a>
                {" and "}
                <a
                  href={
                    "https://github.com/baku89/jssst40-tuts#40th-jssst-tutorial"
                  }
                >
                  {"the hands-on documentation on GitHub (Japanese)"}
                </a>
                {
                  ". Also, for future perspectives not covered in depth in the tutorial, please refer to "
                }
                <a href={"#presentation-live2017"}>
                  {"my keynote at LIVE 2017"}
                </a>
                {"."}
              </p>
            </>
          ) : (
            <>
              <p>
                {
                  "本チュートリアルでは、ライブプログラミング（Live Programming）に関する研究の歴史を紹介するとともに、ビジュアルアートの実践において使われてきた関連ツールや表現を振り返ることで、その意義を多角的に検証しました。"
                }
              </p>

              <p>
                {
                  "技術的には、ビジュアルプログラミング（Visual Programming）においてプログラムのインタラクティブな編集が可能なデータフロー言語・環境が "
                }
                <a href={"https://doi.org/10.1016/S1045-926X(05)80012-6"}>
                  {"VIVA"}
                </a>
                {
                  " をはじめ多数研究開発され、Smalltalk処理系においてユーザインタフェース開発用フレームワーク "
                }
                <a href={"http://dx.doi.org/10.1145/215585.215636"}>
                  {"Morphic"}
                </a>
                {
                  " が登場した1990年代で、プログラミングにおけるライブネス（Liveness）を追求する取り組みは、いったんの節目を迎えたと考えてよいでしょう。しかし、ビジュアルプログラミングはSpreadsheetを除いてなかなかメインストリームにならず、Smalltalk処理系よりもある意味でデグレードした汎用オブジェクト指向言語や統合開発環境が人気を博します。"
                }
              </p>

              <p>
                {"プログラミング体験におけるライブネスが再度注目を集めるには "}
                <a href={"https://archive.org/details/vimeo-36579366"}>
                  {'Bret Victor氏のデモを交えた講演 "Inventing on Principle"'}
                </a>
                {" や "}
                <a href={"https://liveprog.org"}>
                  {"Workshop on Live Programming"}
                </a>
                {
                  " が初めて開催される2010年代まで待つ必要があります。ライブネスとは、抽象的なプログラミング言語から具体的なプログラムの実行状態に至るまでの"
                }
                <a href={"http://worrydream.com/LadderOfAbstraction/"}>
                  {"抽象度のはしご（Ladder of abstraction）"}
                </a>
                {
                  "を掛けることで実現できるユーザ体験であり、単一の言語設計、単一のツール設計に還元できる要素技術は本質ではなさそうです。その代わり、開発対象のアプリケーションの特性に寄り添ったユーザインタフェース設計こそが鍵なのではないでしょうか。そうした観点で黎明期から成功してきたのがデザイナ向けのビジュアルプログラミング環境やビジュアルアート向けのツール群であり、さらに近年、さまざまなドメインに特化したライブプログラミングのシステムが増えてきているという状況だと思います。"
                }
              </p>

              <p>
                {"本チュートリアルに関しては、"}
                <a
                  href={
                    "https://scrapbox.io/ProgrammingExperience/JSSST2023_%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB"
                  }
                >
                  {"Scrapboxの該当ページ"}
                </a>
                {"と"}
                <a
                  href={
                    "https://github.com/baku89/jssst40-tuts#40th-jssst-tutorial"
                  }
                >
                  {"GitHub のハンズオン資料"}
                </a>
                {
                  "もご覧ください。また、チュートリアルでは深く触れなかった将来展望については、"
                }
                <a href={"#presentation-live2017"}>{"LIVE 2017での基調講演"}</a>
                {"をご参照ください。"}
              </p>
            </>
          )}
        </Segment>
        <Segment basic textAlign="right">
          <Button
            role="link"
            primary
            as="a"
            href={"https://jssst2023.wordpress.com/tutorial"}
          >
            {en ? "Tutorial official page (Japanese)" : "大会公式ページ"}
            <Icon name="chevron circle right" />
          </Button>
        </Segment>
        <Divider hidden />
      </>
    );
  }
  function renderPresentationLive2017(): ReactNode {
    return (
      <>
        <Header as="h2">
          {en ? "LIVE 2017 Keynote" : "LIVE 2017 基調講演"}
        </Header>
        <Segment basic>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Header as="h3">
                {en ? "Presentation Slides" : "発表スライド"}
              </Header>
              <DeferredEmbed
                url={slideUrl}
                placeholder={`${slideImagePath}00.jpg`}
                icon={"video play outline"}
              ></DeferredEmbed>
              <div className="caption">
                <Header as="h4">
                  {en
                    ? "User Interfaces for Live Programming"
                    : "ライブプログラミングのためのユーザインタフェース"}
                </Header>
                <List divided horizontal>
                  <List.Item>
                    <SiteLink href={href(slideUrl)}>
                      <Icon name="download" />
                      {en ? "Download" : "ダウンロード"}
                    </SiteLink>
                  </List.Item>
                  <List.Item>
                    <a
                      href={
                        "https://2017.splashcon.org/event/live-2017-keynote-a"
                      }
                    >
                      <Icon name="external" />
                      {en ? "LIVE 2017 Website" : "LIVE 2017 Webサイト"}
                    </a>
                  </List.Item>
                </List>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                {en
                  ? "What is Live Programming?"
                  : "ライブプログラミングとは？"}
              </Header>
              <LinkedImage
                bordered
                fluid
                href={href(`${slideImagePath}05.jpg`)}
              >
                <SiteImage src={`${slideImagePath}05.jpg`} />
              </LinkedImage>
              <div className="caption">
                {en ? (
                  <>
                    <p>
                      {"Live Programming refers to a "}
                      <abbr title={"Programming Experience"}>{"PX"}</abbr>
                      {
                        " that provides continuous feedback to the programmer about the program being developed."
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {
                        "ライブプログラミングとは、開発中のプログラムについてプログラマに継続的なフィードバックを提供する"
                      }
                      <abbr
                        title={"Programming Experience（プログラミング体験）"}
                      >
                        {"PX"}
                      </abbr>
                      {"を指します。"}
                    </p>
                  </>
                )}
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment basic>
          {en ? (
            <>
              <p>
                {
                  "Live Programming systems provide concrete information about how the program behaves when it is executed. With help of this concrete information, programmers can easily iterate on editing and testing the program behavior."
                }
              </p>

              <p>
                {
                  "Please note that the origin of Live Programming is not new as you can see early examples in visual programming and object-oriented programming environments. Then, why is it attracting much attention these days? In short, I consider it is because of its focus on the user experience."
                }
              </p>
            </>
          ) : (
            <>
              <p>
                {
                  "ライブプログラミングのシステムは、プログラムが実行されたときどう振る舞うかについて、具体的な情報を提供します。この具体的な情報の助けを借りて、プログラマはプログラムの編集やデバッグを簡単に繰り返すことができます。"
                }
              </p>

              <p>
                {
                  "ライブプログラミングの起源は、ビジュアルプログラミングやオブジェクト指向プログラミングのための環境の初期の事例まで辿ることができ、決して新しいものではありません。では、なぜ最近、改めて注目を集めているのでしょうか？一言で言えば、ユーザ体験への注力があるからだと私は考えています。"
                }
              </p>
            </>
          )}
        </Segment>
        <Segment basic>
          <Grid stackable columns={2}>
            <Grid.Column>
              <LinkedImage
                bordered
                fluid
                href={href(`${slideImagePath}13.jpg`)}
              >
                <SiteImage src={`${slideImagePath}13.jpg`} />
              </LinkedImage>
            </Grid.Column>
            <Grid.Column>
              <div className="caption">
                {en ? (
                  <>
                    <p>
                      {
                        "Live Programming requires decent user interfaces for exploring the problem space."
                      }
                    </p>

                    <p>
                      {
                        "As such, building decent Live Programming systems requires deep understanding on the target application domains; e.g. avoid sudden changes in the program behavior, keep the program and its output relevant, and allow continuously exploring the problem space."
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {
                        "ライブプログラミングを実現するには、問題空間を探索するための適切なユーザインタフェースが必要です。"
                      }
                    </p>

                    <p>
                      {
                        "そのため、適切なライブプログラミングのシステムを構築するには、対象となるアプリケーションのドメインについて深く理解する必要があります。例えば、プログラムの動作がとつぜん大きく変化しないようにしたり、プログラムと出力の間の関連付けが失われないようにしたり、問題空間を継続的に探索できるようにしたりといったことが重要です。"
                      }
                    </p>
                  </>
                )}
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment basic>
          {en ? (
            <>
              <p>
                {
                  "From now on, I will discuss three perspectives on user interface design of Live Programming systems and interesting directions to explore in each."
                }
              </p>
            </>
          ) : (
            <>
              <p>
                {
                  "ここからは、ライブプログラミングのためのユーザインタフェース設計について考えるための三つの観点を紹介し、それぞれに関する将来展望を議論します。"
                }
              </p>
            </>
          )}

          <Grid stackable columns={3}>
            <Grid.Column>
              <Header as="h4">
                {en
                  ? "Programming with End-users"
                  : "エンドユーザとプログラミングする"}
              </Header>
              <LinkedImage
                bordered
                fluid
                href={href(`${slideImagePath}18.jpg`)}
              >
                <SiteImage src={`${slideImagePath}18.jpg`} />
              </LinkedImage>
              <div className="caption">
                {en ? (
                  <>
                    <p>
                      {
                        "As Live Programming systems provide interactive and intuitive user interfaces for debugging and editing programs, some of the user interfaces can be exposed to the end-users so that they can customize the programs as they wish. ["
                      }
                      <SiteLink href={href(`${basePath}live-tuning/`)}>
                        {"Live Tuning"}
                      </SiteLink>
                      {"]"}
                    </p>

                    <p>
                      {
                        "When the provided user interfaces cannot satisfy their needs, they can still submit requests to programmers with rich contextual information provided by the Live Programming systems. ["
                      }
                      <SiteLink
                        href={href(`${basePath}user-generated-variables/`)}
                      >
                        {"User-Generated Variables"}
                      </SiteLink>
                      {"]"}
                    </p>

                    <p>
                      {
                        "Live Programming techniques benefit not only programmers, but also end-users, and enable "
                      }
                      <SiteLink
                        href={href(`${basePath}programming-as-communication/`)}
                      >
                        {"Programming as Communication"}
                      </SiteLink>
                      {"."}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {
                        "ライブプログラミングのシステムは、プログラムのデバッグや編集のためのインタラクティブで直感的なユーザインタフェースを提供します。こうしたインタフェースの一部をエンドユーザに解放すれば、プログラムの振る舞いを容易にカスタマイズできるようになります。 ["
                      }
                      <SiteLink href={href(`${basePath}live-tuning/`)}>
                        {"Live Tuning"}
                      </SiteLink>
                      {"]"}
                    </p>

                    <p>
                      {
                        "また、エンドユーザがプログラムの既存のユーザインタフェースで満足できない場合にも、ライブプログラミングのシステムが提供する豊富なコンテクスト情報を用いて、プログラマに機能リクエストを送ることが容易になります。 ["
                      }
                      <SiteLink
                        href={href(`${basePath}user-generated-variables/`)}
                      >
                        {"User-Generated Variables"}
                      </SiteLink>
                      {"]"}
                    </p>

                    <p>
                      {
                        "ライブプログラミングの技術はプログラマだけでなくエンドユーザにも恩恵のあるもので、「"
                      }
                      <SiteLink
                        href={href(`${basePath}programming-as-communication`)}
                      >
                        {"コミュニケーションとしてのプログラミング"}
                      </SiteLink>
                      {"」という新しい考え方をもたらします。"}
                    </p>
                  </>
                )}
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">
                {en
                  ? "Programming this Material World"
                  : "実世界をプログラミングする"}
              </Header>
              <LinkedImage
                bordered
                fluid
                href={href(`${slideImagePath}27.jpg`)}
              >
                <SiteImage src={`${slideImagePath}27.jpg`} />
              </LinkedImage>
              <div className="caption">
                {en ? (
                  <>
                    <p>
                      {
                        'Live Programming often targets simple applications such as drawing graphics. In contrast, "software is eating the world" and there are complex and interesting applications such as physical computing and virtual reality.'
                      }
                    </p>

                    <p>
                      {
                        'Their actual "framerate" can be very slow; e.g. printing device enclosures and producing scent. Emulating, or sometimes even pretending, is needed to provide the continuous feedback.'
                      }
                    </p>

                    <p>
                      {
                        "Making full use of five senses in programming environments would be crucial in the near future."
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {
                        "ライブプログラミングのシステムの事例には、グラフィックを描画する単純なアプリケーションを対象とするものが多く見られます。しかし、それとは対照的に、「Software is eating the world」とも言われる現在、フィジカルコンピューティングやバーチャルリアリティなどの複雑で興味深いアプリケーションが多数現れています。"
                      }
                    </p>

                    <p>
                      {
                        "そうしたアプリケーションにおける「フレームレート」は、例えばデバイス筐体の印刷や香りの生成などの場合、非常に遅いです。継続的なフィードバックを提供するためには、情報をエミュレートすること、（ないものがあたかもそこにあるかのような）フリをすることが必要になります。"
                      }
                    </p>

                    <p>
                      {
                        "プログラミング環境において五感をフルに活用することは、近い将来、非常に重要になってくるはずです。"
                      }
                    </p>
                  </>
                )}
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">
                {en
                  ? "Programming with Time Travel"
                  : "時間旅行しながらプログラミングする"}
              </Header>
              <LinkedImage
                bordered
                fluid
                href={href(`${slideImagePath}39.jpg`)}
              >
                <SiteImage src={`${slideImagePath}39.jpg`} />
              </LinkedImage>
              <div className="caption">
                {en ? (
                  <>
                    <p>
                      {
                        "Live Programming puts focus on providing live feedback to the programmer, but it does not always mean providing realtime information of the running program."
                      }
                    </p>

                    <p>
                      {
                        'The timeline interface and record and replay features together provide time traveling experience and play an important role to find critical timings in the history. Once the timing of interest is found, editing the code and program input would update the program output, allowing the programmer to explore future"s."'
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {
                        "ライブプログラミングは、プログラマに「ライブ」なフィードバックを提供することを重視しますが、それは必ずしも、実行中のプログラムに関する情報をリアルタイムに提供することを意味しません。"
                      }
                    </p>

                    <p>
                      {
                        "プログラムの振る舞いを記録・再生する機能を備えたタイムラインインタフェースは、時間旅行のような体験を通して、プログラムの実行履歴の中から興味深いタイミングを見つけるために重要な役割を果たします。特定のタイミングを見つけたら、コードまたはプログラム入力、あるいはその両方を編集することで、プログラムの出力を更新し、ありえたかもしれない未来を自由に探索することができます。"
                      }
                    </p>
                  </>
                )}
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment basic>
          <LinkedImage bordered fluid href={href(`${slideImagePath}47.jpg`)}>
            <SiteImage src={`${slideImagePath}47.jpg`} />
          </LinkedImage>
          <div className="caption">
            {en ? (
              <>
                <p>
                  {
                    "Designing Live Programming systems is not just about language design, a single user, a single UI, it is about designing the whole experience."
                  }
                </p>

                <p>
                  {
                    "Live Programming is a very interdisciplinary topic and involves all of Programming Language design, Software Engineering, and designing Human-Computer Interaction. "
                  }
                  <a href={"https://liveprog.org"}>{"LIVE"}</a>
                  {", "}
                  <a href={"http://programming-experience.org"}>{"PX"}</a>
                  {" workshops and "}
                  <a href={"https://sigpx.org/en"}>{"SIGPX"}</a>
                  {
                    " are such an attempt to attract people from all of these research fields."
                  }
                </p>
              </>
            ) : (
              <>
                <p>
                  {
                    "ライブプログラミングのシステム設計は、プログラミング言語の設計、一人のユーザのための設計、単一のユーザインタフェースの設計に留まらず、全体としての体験設計に他なりません。"
                  }
                </p>

                <p>
                  {
                    "ライブプログラミングは非常に学際的なトピックであり、プログラミング言語、ソフトウェア工学、Human-Computer Interactionのすべてにまたがる研究分野です。こうした多分野の人々を惹きつける試みとして、"
                  }
                  <a href={"https://liveprog.org"}>{"LIVE"}</a>
                  {"、"}
                  <a href={"http://programming-experience.org"}>{"PX"}</a>
                  {"、"}
                  <a href={"https://sigpx.org"}>{"SIGPX"}</a>
                  {"といった集まりがあります。"}
                </p>
              </>
            )}
          </div>
        </Segment>
        <Segment basic textAlign="right">
          <Button
            role="link"
            primary
            as="a"
            href={"https://2017.splashcon.org/event/live-2017-keynote-a"}
          >
            {en ? "LIVE 2017 Website" : "LIVE 2017 Webサイト"}
            <Icon name="chevron circle right" />
          </Button>
        </Segment>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="lab" />
          <Header.Content>
            {en ? "Relevant projects" : "関連プロジェクト"}
          </Header.Content>
        </Header>
        <Segment basic>
          {en ? (
            <>
              <p>
                {
                  "The following projects implement or discuss Live Programming experiences."
                }
              </p>
            </>
          ) : (
            <>
              <p>
                {
                  "ライブプログラミング体験を実装したり議論したりしているプロジェクトが表示されています。"
                }
              </p>
            </>
          )}

          <Segment>
            <Item.Group divided className="projects">
              {(() => {
                const children: ReactNode[] = [];
                for (const p of projects) {
                  if (
                    p.category === "concept" ||
                    p.category === "committee" ||
                    p.category === "private"
                  )
                    continue;
                  if (
                    !Array.isArray(p.tags) ||
                    p.tags.indexOf("live-programming") < 0
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
  function renderRevisions(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="announcement" />
          {en ? "Revision history" : "更新履歴"}
        </Header>
        <Segment basic>
          <Feed className="divided">
            {!en ? (
              <>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"9/28/2023"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "日本ソフトウェア科学会 第40回大会 チュートリアルの概要を追加"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"9/27/2023"}</Feed.Date>
                    <Feed.Summary>
                      {"LIVE 2017基調講演の内容を和訳"}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </>
            ) : (
              <>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"9/28/2023"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "Add introduction to the tutorial course held as part of "
                      }
                      <a href={"https://jssst2023.wordpress.com/tutorial"}>
                        {"The 40th "}
                        <abbr
                          title={
                            "Japan Society for Software Science and Technology"
                          }
                        >
                          {"JSSST"}
                        </abbr>
                        {" Annual Conference"}
                      </a>
                      {" (content in Japanese)."}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </>
            )}

            <Feed.Event>
              <Feed.Content>
                <Feed.Date>{"2/15/2018"}</Feed.Date>
                <Feed.Summary>
                  {en
                    ? 'Replace "Further reading" with the list of relevant projects. Please visit each project page for further readings.'
                    : "関連プロジェクトの一覧を公開"}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Content>
                <Feed.Date>{"1/21/2018"}</Feed.Date>
                <Feed.Summary>
                  {en ? "Upload the initial prototype version." : "初版を公開"}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
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
            {(() => {
              const children: ReactNode[] = [];
              let additionalLabels = [
                '<span class="ui tiny red basic label">' +
                  (en
                    ? "Tutorial course at JSSST '23"
                    : "日本ソフトウェア科学会大会 第40回大会 チュートリアル") +
                  "</span>",
              ];
              children.push(
                <>
                  <ProjectHero
                    project={"live-programming"}
                    additionalLabels={additionalLabels}
                  />
                </>,
              );
              return keyed(children);
            })()}
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
                  <List.Content>{en ? "Summary" : "概要"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#presentation-jssst2023"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en
                      ? "JSSST 2023 Tutorial"
                      : "日本ソフトウェア科学会 第40回大会 チュートリアル"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#presentation-live2017"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "LIVE 2017 Keynote" : "LIVE 2017 基調講演"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#further-readings"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#revisions"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Revision history" : "更新履歴"}
                  </List.Content>
                </List.Item>
              </List>
            </SitePopup>
          </>
        }
      >
        <section id={"abstract"}>{renderAbstract()}</section>
        <Divider hidden />
        <section id={"presentation-jssst2023"}>
          {renderPresentationJssst2023()}
        </section>
        <section id={"presentation-live2017"}>
          {renderPresentationLive2017()}
        </section>
        <Divider hidden />
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
        <Divider hidden />
        <section id={"revisions"}>{renderRevisions()}</section>
      </SiteLayout>
    </>
  );
}
