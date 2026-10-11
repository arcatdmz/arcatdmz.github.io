import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/live-programming/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const {
    histories,
    awards,
    talks,
    lectures,
    projects,
    projectsTable,
    products,
    selectedProjects,
    publications,
    publicationsTable,
    selectedPublications,
    media,
    mediaList,
    misc,
    moment,
    rootPath,
    protocol,
    domain,
    defaultImageUrl,
    defaultDescription,
    defaultJapaneseDescription,
    stripTags,
  } = data;
  const lang: "en" | "ja" = "ja";
  const en: boolean = false;
  const basePath = en ? rootPath : rootPath + "ja/";
  const author = en ? "Jun Kato" : "加藤 淳";
  let me: any,
    p: any,
    title: any,
    description: any,
    imageUrl: any,
    bodyClass: any;

  title = 'ライブプログラミングのためのユーザインタフェース';
description = 'ライブプログラミングはコーディングと実行・デバッグの間の溝をなくす試みです。ライブプログラミングをサポートするシステムを設計するためには、まず何を開発しようとしているのかについての理解が必要です。開発対象のアプリケーションに関するドメイン固有の知識を得たら、次は、実行中のアプリケーションを編集するためのユーザインタフェースを作ります。それは、例えばスライダーだったり、カラーパレットだったり、タイムラインインタフェースだったりするでしょう。ライブプログラミングにおいてなめらかなプログラミング体験を提供する鍵となるのは、開発対象のアプリケーションに関する深い理解と、インタラクティブなユーザインタフェースの採用です。';
 title = title || "User Interfaces for Live Programming";
  description =
    description ||
    "Live programming eliminates the gulf between code and execution. To design live programming systems, we first need to understand what we are developing. Once we gain domain-specific knowledge of the target applications, we create user interfaces to edit the running application, such as scrubbing sliders, color palettes, and timeline interfaces. The key to the fluid programming experience of live programming is the combination of deep understanding of the target applications and adoption of interactive user interfaces.";
  imageUrl = `${protocol}://${domain}${rootPath}images/panels/live-programming.jpg`;
  me = "live-programming/";
  const slideUrl = `${protocol}://${domain}${rootPath}publications/live2017-kato-keynote-slides.pdf`;
  const slideImagePath = `${rootPath}live-programming/live2017/live2017-kato-keynote-slides`;
  moment.locale(lang);
  const context: ReturnType<typeof getSiteData> & SiteContext = {
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
  const content = createContentComponents(context);
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Summary" : "概要")}</h2>
        <div className="ui basic segment">
          <p>{plainText(description)}</p>
          <div className="ui stackable two columns grid">
            <div className="column">
              {(() => {
                const children212: ReactNode[] = [];
                if (en) {
                  children212.push(
                    <>
                      <p>
                        {richText("At ")}
                        <a href={href("https://jssst2023.wordpress.com/tutorial")}>
                          {richText("the tutorial course as part of The 40th ")}
                          <abbr title={"Japan Society for Software Science and Technology"}>
                            {richText("JSSST")}
                          </abbr>
                          {richText(" Annual Conference (Japanese)")}
                        </a>
                        {richText(", me and visual artist ")}
                        <a href={href("https://baku89.com/?lang=en")}>
                          {richText("Baku Hashimoto")}
                        </a>
                        {richText(
                          " served as lecturers, presenting a brief history of Live Programming research and providing a hands-on opportunity to develop a web-based Live Programming system.",
                        )}
                      </p>
                    </>,
                  );
                  children212.push(
                    <>
                      <p>
                        {richText(
                          'Programming environments that focus on "liveness" have been around for a long time, like visual programming and Smalltalk-based systems, but they have recently attracted renewed attention as a key idea to realize a fluid programming experience. We attempted to review the situation from the point of view of both researchers and artists.',
                        )}
                      </p>
                    </>,
                  );
                } else {
                  children212.push(
                    <>
                      <p>
                        {richText(" ")}
                        <a href={href("https://jssst2023.wordpress.com/tutorial")}>
                          {richText("日本ソフトウェア科学会 第40回大会 チュートリアル")}
                        </a>
                        {richText("では、ビジュアルアーティストの")}
                        <a href={href("https://baku89.com")}>{richText("橋本麦")}</a>
                        {richText(
                          "氏と共に講師を務め、ライブプログラミング研究の概略史紹介と、ライブプログラミング環境を開発するハンズオンを行いました。「ライブネス（Liveness）」に着目したプログラミング環境はビジュアルプログラミングやSmalltalk処理系など古くからありましたが、近年、滑らかなプログラミング体験を提供するキーアイデアの一つとして改めて注目されています。研究者とアーティスト双方の観点から状況整理を試みました。",
                        )}
                      </p>
                    </>,
                  );
                }
                return keyed(children212);
              })()}
            </div>
            <div className="column">
              {(() => {
                const children213: ReactNode[] = [];
                if (en) {
                  children213.push(
                    <>
                      <p>
                        {richText(
                          "In the keynote talk at LIVE '17, I discussed the liveness of programming systems in light of user interface design. I introduced user interfaces for programming and discussed the importance of integrating graphical representations into programming environments. I extended the scope of &quot;liveness&quot; by describing two kinds of interactions, physical and developer-user, and provided insights on designing future live programming systems.",
                        )}
                      </p>
                    </>,
                  );
                  children213.push(
                    <>
                      <p>
                        {richText(
                          "In particular, regarding the user interfaces for enhancing developer-user interactions, there are two sub-projects called ",
                        )}
                        <a href={href(`${basePath}live-tuning/`)}>{richText("Live Tuning")}</a>
                        {richText(" and ")}
                        <a href={href(`${basePath}user-generated-variables/`)}>
                          {richText("User-Generated Variables")}
                        </a>
                        {richText(".")}
                      </p>
                    </>,
                  );
                } else {
                  children213.push(
                    <>
                      <p>
                        <a
                          href={href(
                            "https://2017.splashcon.org/details/live-2017/7/Keynote-User-Interfaces-for-Live-Programming",
                          )}
                        >
                          {richText("LIVE 2017 基調講演")}
                        </a>
                        {richText(
                          "では、ユーザインターフェース設計の観点からプログラミング環境の「ライブネス（Liveness）」について議論しました。プログラミングのためのユーザインターフェースを紹介し、画像表現をプログラミング環境に統合することの重要性を論じました。物理的なインタラクションと、開発者・ユーザ間のインタラクションという2種類のインタラクションを具体的な研究事例と共に紹介し、「ライブネス」の定義を拡大して、将来のライブプログラミング・システムの設計に関して示唆を提供しました。",
                        )}
                      </p>
                    </>,
                  );
                }
                return keyed(children213);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderPresentationJssst2023(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {(() => {
            const children214: ReactNode[] = [];
            if (en) {
              children214.push(<>{richText("The 40th ")}</>);
              children214.push(
                <>
                  <abbr title={"Japan Society for Software Science and Technology"}>
                    {richText("JSSST")}
                  </abbr>
                </>,
              );
              children214.push(<>{richText(" Annual Conference Tutorial")}</>);
            } else {
              children214.push(<>{richText("日本ソフトウェア科学会 第40回大会 チュートリアル")}</>);
            }
            return keyed(children214);
          })()}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {plainText(en ? "Presentation Slides (Japanese)" : "発表スライド")}
              </h3>
              <div
                className="ui embed"
                data-url={
                  "https://docs.google.com/presentation/d/e/2PACX-1vSFvd9_lLppM-CnW9Qr2TXxPCETq9WAedQPIvgTebXe328vTvSP3-SUIJNGtimZR7ygSSb4LOHheLYq/embed"
                }
                data-placeholder={`${rootPath}live-programming/jssst2023/jssst-live-programming-tutorial.jpg`}
                data-icon={"video play outline"}
              ></div>
              <div className="caption">
                <h4 className="ui header">
                  {plainText(
                    en
                      ? "Introduction to Live Programming: Try It, Make It, Know It"
                      : "試して作って知る Live Programming入門",
                  )}
                </h4>
                <div className="ui horizontal divided list">
                  <div className="item">
                    <a
                      href={href(
                        "https://docs.google.com/presentation/d/1MIDPeccko-oce83eaWLKuEctzjt2NF_R9b-ouhc_yCI/edit?usp=sharing",
                      )}
                    >
                      <i className="external icon"></i>
                      {richText("Google Slides")}
                    </a>
                  </div>
                  <div className="item">
                    <a href={href("https://jssst2023.wordpress.com/tutorial")}>
                      <i className="external icon"></i>
                      {plainText(en ? "Tutorial official page (Japanese)" : "大会公式ページ")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {plainText(en ? "What is Live Programming?" : "ライブプログラミングとは？")}
              </h3>
              <a
                className="ui fluid bordered image"
                href={href(
                  `${rootPath}live-programming/jssst2023/jssst-live-programming-tutorial-16.jpg`,
                )}
              >
                <img
                  src={`${rootPath}live-programming/jssst2023/jssst-live-programming-tutorial-16.jpg`}
                />
              </a>
              <div className="caption">
                {(() => {
                  const children215: ReactNode[] = [];
                  if (en) {
                    children215.push(
                      <>
                        <p>
                          {richText("Live Programming has the clear advantage of ")}
                          <strong>{richText("not")}</strong>
                          {richText(
                            " forcing programmers to bet on a single shot, a feature captured in ",
                          )}
                          <a href={href("https://dspace.mit.edu/handle/1721.1/61549")}>
                            {richText("Chris Hancook's dissertation")}
                          </a>
                          {richText(" by the metaphor of the bow and the watering hose.")}
                        </p>
                      </>,
                    );
                  } else {
                    children215.push(
                      <>
                        <p>
                          {richText("ライブプログラミングには一発必中をプログラマに")}
                          <strong>{richText("強いない")}</strong>
                          {richText("特長があります。")}
                          <a href={href("https://dspace.mit.edu/handle/1721.1/61549")}>
                            {richText("Chris Hancook氏の博士論文")}
                          </a>
                          {richText("ではこれを弓とホースの比喩で表しました。")}
                        </p>
                      </>,
                    );
                  }
                  return keyed(children215);
                })()}
              </div>
            </div>
          </div>
        </div>
        <div className="ui basic segment">
          {(() => {
            const children216: ReactNode[] = [];
            if (en) {
              children216.push(
                <>
                  <p>
                    {richText(
                      "This tutorial introduced the history of live programming research and examined its significance from different perspectives by reviewing related tools and practices proposed in research and used in visual art.",
                    )}
                  </p>
                </>,
              );
              children216.push(
                <>
                  <p>
                    {richText(
                      "Technically speaking, the pursuit of &quot;liveness&quot; in programming systems reached a milestone in the 1990s, when many visual programming systems employing dataflow languages and environments, including ",
                    )}
                    <a href={href("https://doi.org/10.1016/S1045-926X(05)80012-6")}>
                      {richText("VIVA")}
                    </a>
                    {richText(
                      ", were researched and developed to allow interactive editing of programs, and a framework for user interface development in Smalltalk-based systems, ",
                    )}
                    <a href={href("http://dx.doi.org/10.1145/215585.215636")}>
                      {richText("Morphic")}
                    </a>
                    {richText(
                      ", appeared. However, with the exception of Spreadsheet, visual programming did not become mainstream, and general-purpose object-oriented languages and integrated development environments, which were in some ways degraded from Smalltalk, gained popularity.",
                    )}
                  </p>
                </>,
              );
              children216.push(
                <>
                  <p>
                    {richText(
                      "We had to wait until the 2010s to see a renewed interest in &quot;liveness&quot; in the programming experience, when ",
                    )}
                    <a href={href("https://archive.org/details/vimeo-36579366")}>
                      {richText("Bret Victor's &quot;Inventing on Principle&quot; talk")}
                    </a>
                    {richText(" with many appealing demonstrations took place and ")}
                    <a href={href("https://liveprog.org")}>
                      {richText("the Workshop on Live Programming")}
                    </a>
                    {richText(
                      " was held for the first time. Here I see &quot;liveness&quot; as a kind of user experience that can be achieved by building ",
                    )}
                    <a href={href("http://worrydream.com/LadderOfAbstraction/")}>
                      {richText("a ladder of abstraction")}
                    </a>
                    {richText(
                      " from an abstract programming language to a concrete program execution state, and individual technical components such as a single programming language design or a single tool design do not seem to be sufficient. At the heart of the design of live programming systems is the design of the user interface, which is tailored to the domain-specificity of the applications to be developed in the programming system. From this perspective, visual programming environments for designers and tools for the visual arts have been successful for a long time, and more recently, there have been an increasing number of live programming systems specialized for diverse application domains.",
                    )}
                  </p>
                </>,
              );
              children216.push(
                <>
                  <p>
                    {richText("For this tutorial, please also see ")}
                    <a
                      href={href(
                        "https://scrapbox.io/ProgrammingExperience/JSSST2023_%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB",
                      )}
                    >
                      {richText("the corresponding page on Scrapbox (Wiki site; Japanese)")}
                    </a>
                    {richText(" and ")}
                    <a href={href("https://github.com/baku89/jssst40-tuts#40th-jssst-tutorial")}>
                      {richText("the hands-on documentation on GitHub (Japanese)")}
                    </a>
                    {richText(
                      ". Also, for future perspectives not covered in depth in the tutorial, please refer to ",
                    )}
                    <a href={href("#presentation-live2017")}>
                      {richText("my keynote at LIVE 2017")}
                    </a>
                    {richText(".")}
                  </p>
                </>,
              );
            } else {
              children216.push(
                <>
                  <p>
                    {richText(
                      "本チュートリアルでは、ライブプログラミング（Live Programming）に関する研究の歴史を紹介するとともに、ビジュアルアートの実践において使われてきた関連ツールや表現を振り返ることで、その意義を多角的に検証しました。",
                    )}
                  </p>
                </>,
              );
              children216.push(
                <>
                  <p>
                    {richText(
                      "技術的には、ビジュアルプログラミング（Visual Programming）においてプログラムのインタラクティブな編集が可能なデータフロー言語・環境が ",
                    )}
                    <a href={href("https://doi.org/10.1016/S1045-926X(05)80012-6")}>
                      {richText("VIVA")}
                    </a>
                    {richText(
                      " をはじめ多数研究開発され、Smalltalk処理系においてユーザインタフェース開発用フレームワーク ",
                    )}
                    <a href={href("http://dx.doi.org/10.1145/215585.215636")}>
                      {richText("Morphic")}
                    </a>
                    {richText(
                      " が登場した1990年代で、プログラミングにおけるライブネス（Liveness）を追求する取り組みは、いったんの節目を迎えたと考えてよいでしょう。しかし、ビジュアルプログラミングはSpreadsheetを除いてなかなかメインストリームにならず、Smalltalk処理系よりもある意味でデグレードした汎用オブジェクト指向言語や統合開発環境が人気を博します。",
                    )}
                  </p>
                </>,
              );
              children216.push(
                <>
                  <p>
                    {richText("プログラミング体験におけるライブネスが再度注目を集めるには ")}
                    <a href={href("https://archive.org/details/vimeo-36579366")}>
                      {richText(
                        "Bret Victor氏のデモを交えた講演 &quot;Inventing on Principle&quot;",
                      )}
                    </a>
                    {richText(" や ")}
                    <a href={href("https://liveprog.org")}>
                      {richText("Workshop on Live Programming")}
                    </a>
                    {richText(
                      " が初めて開催される2010年代まで待つ必要があります。ライブネスとは、抽象的なプログラミング言語から具体的なプログラムの実行状態に至るまでの",
                    )}
                    <a href={href("http://worrydream.com/LadderOfAbstraction/")}>
                      {richText("抽象度のはしご（Ladder of abstraction）")}
                    </a>
                    {richText(
                      "を掛けることで実現できるユーザ体験であり、単一の言語設計、単一のツール設計に還元できる要素技術は本質ではなさそうです。その代わり、開発対象のアプリケーションの特性に寄り添ったユーザインタフェース設計こそが鍵なのではないでしょうか。そうした観点で黎明期から成功してきたのがデザイナ向けのビジュアルプログラミング環境やビジュアルアート向けのツール群であり、さらに近年、さまざまなドメインに特化したライブプログラミングのシステムが増えてきているという状況だと思います。",
                    )}
                  </p>
                </>,
              );
              children216.push(
                <>
                  <p>
                    {richText("本チュートリアルに関しては、")}
                    <a
                      href={href(
                        "https://scrapbox.io/ProgrammingExperience/JSSST2023_%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB",
                      )}
                    >
                      {richText("Scrapboxの該当ページ")}
                    </a>
                    {richText("と")}
                    <a href={href("https://github.com/baku89/jssst40-tuts#40th-jssst-tutorial")}>
                      {richText("GitHub のハンズオン資料")}
                    </a>
                    {richText(
                      "もご覧ください。また、チュートリアルでは深く触れなかった将来展望については、",
                    )}
                    <a href={href("#presentation-live2017")}>{richText("LIVE 2017での基調講演")}</a>
                    {richText("をご参照ください。")}
                  </p>
                </>,
              );
            }
            return keyed(children216);
          })()}
        </div>
        <div className="ui basic right aligned segment">
          <a className="ui primary button" href={href("https://jssst2023.wordpress.com/tutorial")}>
            {plainText(en ? "Tutorial official page (Japanese)" : "大会公式ページ")}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderPresentationLive2017(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "LIVE 2017 Keynote" : "LIVE 2017 基調講演")}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">{plainText(en ? "Presentation Slides" : "発表スライド")}</h3>
              <div
                className="ui embed"
                data-url={slideUrl}
                data-placeholder={`${slideImagePath}00.jpg`}
                data-icon={"video play outline"}
              ></div>
              <div className="caption">
                <h4 className="ui header">
                  {plainText(
                    en
                      ? "User Interfaces for Live Programming"
                      : "ライブプログラミングのためのユーザインタフェース",
                  )}
                </h4>
                <div className="ui horizontal divided list">
                  <div className="item">
                    <a href={href(slideUrl)}>
                      <i className="download icon"></i>
                      {plainText(en ? "Download" : "ダウンロード")}
                    </a>
                  </div>
                  <div className="item">
                    <a href={href("https://2017.splashcon.org/event/live-2017-keynote-a")}>
                      <i className="external icon"></i>
                      {plainText(en ? "LIVE 2017 Website" : "LIVE 2017 Webサイト")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {plainText(en ? "What is Live Programming?" : "ライブプログラミングとは？")}
              </h3>
              <a className="ui fluid bordered image" href={href(`${slideImagePath}05.jpg`)}>
                <img src={`${slideImagePath}05.jpg`} />
              </a>
              <div className="caption">
                {(() => {
                  const children217: ReactNode[] = [];
                  if (en) {
                    children217.push(
                      <>
                        <p>
                          {richText(
                            'Live Programming refers to a <abbr title="Programming Experience">PX</abbr> that provides continuous feedback to the programmer about the program being developed.',
                          )}
                        </p>
                      </>,
                    );
                  } else {
                    children217.push(
                      <>
                        <p>
                          {richText(
                            'ライブプログラミングとは、開発中のプログラムについてプログラマに継続的なフィードバックを提供する<abbr title="Programming Experience（プログラミング体験）">PX</abbr>を指します。',
                          )}
                        </p>
                      </>,
                    );
                  }
                  return keyed(children217);
                })()}
              </div>
            </div>
          </div>
        </div>
        <div className="ui basic segment">
          {(() => {
            const children218: ReactNode[] = [];
            if (en) {
              children218.push(
                <>
                  <p>
                    {richText(
                      "Live Programming systems provide concrete information about how the program behaves when it is executed. With help of this concrete information, programmers can easily iterate on editing and testing the program behavior.",
                    )}
                  </p>
                </>,
              );
              children218.push(
                <>
                  <p>
                    {richText(
                      "Please note that the origin of Live Programming is not new as you can see early examples in visual programming and object-oriented programming environments. Then, why is it attracting much attention these days? In short, I consider it is because of its focus on the user experience.",
                    )}
                  </p>
                </>,
              );
            } else {
              children218.push(
                <>
                  <p>
                    {richText(
                      "ライブプログラミングのシステムは、プログラムが実行されたときどう振る舞うかについて、具体的な情報を提供します。この具体的な情報の助けを借りて、プログラマはプログラムの編集やデバッグを簡単に繰り返すことができます。",
                    )}
                  </p>
                </>,
              );
              children218.push(
                <>
                  <p>
                    {richText(
                      "ライブプログラミングの起源は、ビジュアルプログラミングやオブジェクト指向プログラミングのための環境の初期の事例まで辿ることができ、決して新しいものではありません。では、なぜ最近、改めて注目を集めているのでしょうか？一言で言えば、ユーザ体験への注力があるからだと私は考えています。",
                    )}
                  </p>
                </>,
              );
            }
            return keyed(children218);
          })()}
        </div>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <a className="ui fluid bordered image" href={href(`${slideImagePath}13.jpg`)}>
                <img src={`${slideImagePath}13.jpg`} />
              </a>
            </div>
            <div className="column">
              <div className="caption">
                {(() => {
                  const children219: ReactNode[] = [];
                  if (en) {
                    children219.push(
                      <>
                        <p>
                          {richText(
                            "Live Programming requires decent user interfaces for exploring the problem space.",
                          )}
                        </p>
                      </>,
                    );
                    children219.push(
                      <>
                        <p>
                          {richText(
                            "As such, building decent Live Programming systems requires deep understanding on the target application domains; e.g. avoid sudden changes in the program behavior, keep the program and its output relevant, and allow continuously exploring the problem space.",
                          )}
                        </p>
                      </>,
                    );
                  } else {
                    children219.push(
                      <>
                        <p>
                          {richText(
                            "ライブプログラミングを実現するには、問題空間を探索するための適切なユーザインタフェースが必要です。",
                          )}
                        </p>
                      </>,
                    );
                    children219.push(
                      <>
                        <p>
                          {richText(
                            "そのため、適切なライブプログラミングのシステムを構築するには、対象となるアプリケーションのドメインについて深く理解する必要があります。例えば、プログラムの動作がとつぜん大きく変化しないようにしたり、プログラムと出力の間の関連付けが失われないようにしたり、問題空間を継続的に探索できるようにしたりといったことが重要です。",
                          )}
                        </p>
                      </>,
                    );
                  }
                  return keyed(children219);
                })()}
              </div>
            </div>
          </div>
        </div>
        <div className="ui basic segment">
          {(() => {
            const children220: ReactNode[] = [];
            if (en) {
              children220.push(
                <>
                  <p>
                    {richText(
                      "From now on, I will discuss three perspectives on user interface design of Live Programming systems and interesting directions to explore in each.",
                    )}
                  </p>
                </>,
              );
            } else {
              children220.push(
                <>
                  <p>
                    {richText(
                      "ここからは、ライブプログラミングのためのユーザインタフェース設計について考えるための三つの観点を紹介し、それぞれに関する将来展望を議論します。",
                    )}
                  </p>
                </>,
              );
            }
            children220.push(
              <>
                <div className="ui stackable three columns grid">
                  <div className="column">
                    <h4 className="ui header">
                      {plainText(en ? "Programming with End-users" : "エンドユーザとプログラミングする")}
                    </h4>
                    <a className="ui fluid bordered image" href={href(`${slideImagePath}18.jpg`)}>
                      <img src={`${slideImagePath}18.jpg`} />
                    </a>
                    <div className="caption">
                      {(() => {
                        const children221: ReactNode[] = [];
                        if (en) {
                          children221.push(
                            <>
                              <p>
                                {richText(
                                  "As Live Programming systems provide interactive and intuitive user interfaces for debugging and editing programs, some of the user interfaces can be exposed to the end-users so that they can customize the programs as they wish. [",
                                )}
                                <a href={href(`${basePath}live-tuning/`)}>
                                  {richText("Live Tuning")}
                                </a>
                                {richText("]")}
                              </p>
                            </>,
                          );
                          children221.push(
                            <>
                              <p>
                                {richText(
                                  "When the provided user interfaces cannot satisfy their needs, they can still submit requests to programmers with rich contextual information provided by the Live Programming systems. [",
                                )}
                                <a href={href(`${basePath}user-generated-variables/`)}>
                                  {richText("User-Generated Variables")}
                                </a>
                                {richText("]")}
                              </p>
                            </>,
                          );
                          children221.push(
                            <>
                              <p>
                                {richText(
                                  "Live Programming techniques benefit not only programmers, but also end-users, and enable ",
                                )}
                                <a href={href(`${basePath}programming-as-communication/`)}>
                                  {richText("Programming as Communication")}
                                </a>
                                {richText(".")}
                              </p>
                            </>,
                          );
                        } else {
                          children221.push(
                            <>
                              <p>
                                {richText(
                                  "ライブプログラミングのシステムは、プログラムのデバッグや編集のためのインタラクティブで直感的なユーザインタフェースを提供します。こうしたインタフェースの一部をエンドユーザに解放すれば、プログラムの振る舞いを容易にカスタマイズできるようになります。 [",
                                )}
                                <a href={href(`${basePath}live-tuning/`)}>
                                  {richText("Live Tuning")}
                                </a>
                                {richText("]")}
                              </p>
                            </>,
                          );
                          children221.push(
                            <>
                              <p>
                                {richText(
                                  "また、エンドユーザがプログラムの既存のユーザインタフェースで満足できない場合にも、ライブプログラミングのシステムが提供する豊富なコンテクスト情報を用いて、プログラマに機能リクエストを送ることが容易になります。 [",
                                )}
                                <a href={href(`${basePath}user-generated-variables/`)}>
                                  {richText("User-Generated Variables")}
                                </a>
                                {richText("]")}
                              </p>
                            </>,
                          );
                          children221.push(
                            <>
                              <p>
                                {richText(
                                  "ライブプログラミングの技術はプログラマだけでなくエンドユーザにも恩恵のあるもので、「",
                                )}
                                <a href={href(`${basePath}programming-as-communication`)}>
                                  {richText("コミュニケーションとしてのプログラミング")}
                                </a>
                                {richText("」という新しい考え方をもたらします。")}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children221);
                      })()}
                    </div>
                  </div>
                  <div className="column">
                    <h4 className="ui header">
                      {plainText(en ? "Programming this Material World" : "実世界をプログラミングする")}
                    </h4>
                    <a className="ui fluid bordered image" href={href(`${slideImagePath}27.jpg`)}>
                      <img src={`${slideImagePath}27.jpg`} />
                    </a>
                    <div className="caption">
                      {(() => {
                        const children222: ReactNode[] = [];
                        if (en) {
                          children222.push(
                            <>
                              <p>
                                {richText(
                                  "Live Programming often targets simple applications such as drawing graphics. In contrast, &quot;software is eating the world&quot; and there are complex and interesting applications such as physical computing and virtual reality.",
                                )}
                              </p>
                            </>,
                          );
                          children222.push(
                            <>
                              <p>
                                {richText(
                                  "Their actual &quot;framerate&quot; can be very slow; e.g. printing device enclosures and producing scent. Emulating, or sometimes even pretending, is needed to provide the continuous feedback.",
                                )}
                              </p>
                            </>,
                          );
                          children222.push(
                            <>
                              <p>
                                {richText(
                                  "Making full use of five senses in programming environments would be crucial in the near future.",
                                )}
                              </p>
                            </>,
                          );
                        } else {
                          children222.push(
                            <>
                              <p>
                                {richText(
                                  "ライブプログラミングのシステムの事例には、グラフィックを描画する単純なアプリケーションを対象とするものが多く見られます。しかし、それとは対照的に、「Software is eating the world」とも言われる現在、フィジカルコンピューティングやバーチャルリアリティなどの複雑で興味深いアプリケーションが多数現れています。",
                                )}
                              </p>
                            </>,
                          );
                          children222.push(
                            <>
                              <p>
                                {richText(
                                  "そうしたアプリケーションにおける「フレームレート」は、例えばデバイス筐体の印刷や香りの生成などの場合、非常に遅いです。継続的なフィードバックを提供するためには、情報をエミュレートすること、（ないものがあたかもそこにあるかのような）フリをすることが必要になります。",
                                )}
                              </p>
                            </>,
                          );
                          children222.push(
                            <>
                              <p>
                                {richText(
                                  "プログラミング環境において五感をフルに活用することは、近い将来、非常に重要になってくるはずです。",
                                )}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children222);
                      })()}
                    </div>
                  </div>
                  <div className="column">
                    <h4 className="ui header">
                      {plainText(
                        en ? "Programming with Time Travel" : "時間旅行しながらプログラミングする",
                      )}
                    </h4>
                    <a className="ui fluid bordered image" href={href(`${slideImagePath}39.jpg`)}>
                      <img src={`${slideImagePath}39.jpg`} />
                    </a>
                    <div className="caption">
                      {(() => {
                        const children223: ReactNode[] = [];
                        if (en) {
                          children223.push(
                            <>
                              <p>
                                {richText(
                                  "Live Programming puts focus on providing live feedback to the programmer, but it does not always mean providing realtime information of the running program.",
                                )}
                              </p>
                            </>,
                          );
                          children223.push(
                            <>
                              <p>
                                {richText(
                                  "The timeline interface and record and replay features together provide time traveling experience and play an important role to find critical timings in the history. Once the timing of interest is found, editing the code and program input would update the program output, allowing the programmer to explore future&quot;s.&quot;",
                                )}
                              </p>
                            </>,
                          );
                        } else {
                          children223.push(
                            <>
                              <p>
                                {richText(
                                  "ライブプログラミングは、プログラマに「ライブ」なフィードバックを提供することを重視しますが、それは必ずしも、実行中のプログラムに関する情報をリアルタイムに提供することを意味しません。",
                                )}
                              </p>
                            </>,
                          );
                          children223.push(
                            <>
                              <p>
                                {richText(
                                  "プログラムの振る舞いを記録・再生する機能を備えたタイムラインインタフェースは、時間旅行のような体験を通して、プログラムの実行履歴の中から興味深いタイミングを見つけるために重要な役割を果たします。特定のタイミングを見つけたら、コードまたはプログラム入力、あるいはその両方を編集することで、プログラムの出力を更新し、ありえたかもしれない未来を自由に探索することができます。",
                                )}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children223);
                      })()}
                    </div>
                  </div>
                </div>
              </>,
            );
            return keyed(children220);
          })()}
        </div>
        <div className="ui basic segment">
          <a className="ui fluid bordered image" href={href(`${slideImagePath}47.jpg`)}>
            <img src={`${slideImagePath}47.jpg`} />
          </a>
          <div className="caption">
            {(() => {
              const children224: ReactNode[] = [];
              if (en) {
                children224.push(
                  <>
                    <p>
                      {richText(
                        "Designing Live Programming systems is not just about language design, a single user, a single UI, it is about designing the whole experience.",
                      )}
                    </p>
                  </>,
                );
                children224.push(
                  <>
                    <p>
                      {richText(
                        "Live Programming is a very interdisciplinary topic and involves all of Programming Language design, Software Engineering, and designing Human-Computer Interaction. ",
                      )}
                      <a href={href("https://liveprog.org")}>{richText("LIVE")}</a>
                      {richText(", ")}
                      <a href={href("http://programming-experience.org")}>{richText("PX")}</a>
                      {richText(" workshops and ")}
                      <a href={href("https://sigpx.org/en")}>{richText("SIGPX")}</a>
                      {richText(
                        " are such an attempt to attract people from all of these research fields.",
                      )}
                    </p>
                  </>,
                );
              } else {
                children224.push(
                  <>
                    <p>
                      {richText(
                        "ライブプログラミングのシステム設計は、プログラミング言語の設計、一人のユーザのための設計、単一のユーザインタフェースの設計に留まらず、全体としての体験設計に他なりません。",
                      )}
                    </p>
                  </>,
                );
                children224.push(
                  <>
                    <p>
                      {richText(
                        "ライブプログラミングは非常に学際的なトピックであり、プログラミング言語、ソフトウェア工学、Human-Computer Interactionのすべてにまたがる研究分野です。こうした多分野の人々を惹きつける試みとして、",
                      )}
                      <a href={href("https://liveprog.org")}>{richText("LIVE")}</a>
                      {richText("、")}
                      <a href={href("http://programming-experience.org")}>{richText("PX")}</a>
                      {richText("、")}
                      <a href={href("https://sigpx.org")}>{richText("SIGPX")}</a>
                      {richText("といった集まりがあります。")}
                    </p>
                  </>,
                );
              }
              return keyed(children224);
            })()}
          </div>
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={href("https://2017.splashcon.org/event/live-2017-keynote-a")}
          >
            {plainText(en ? "LIVE 2017 Website" : "LIVE 2017 Webサイト")}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="lab icon"></i>
          <div className="content">{plainText(en ? "Relevant projects" : "関連プロジェクト")}</div>
        </h2>
        <div className="ui basic segment">
          {(() => {
            const children225: ReactNode[] = [];
            if (en) {
              children225.push(
                <>
                  <p>
                    {richText(
                      "The following projects implement or discuss Live Programming experiences.",
                    )}
                  </p>
                </>,
              );
            } else {
              children225.push(
                <>
                  <p>
                    {richText(
                      "ライブプログラミング体験を実装したり議論したりしているプロジェクトが表示されています。",
                    )}
                  </p>
                </>,
              );
            }
            children225.push(
              <>
                <div className="ui segment">
                  <div className="ui divided items projects">
                    {(() => {
                      const children226: ReactNode[] = [];
                      for (const p of projects) {
                        if (
                          p.category === "concept" ||
                          p.category === "committee" ||
                          p.category === "private"
                        )
                          continue;
                        if (!Array.isArray(p.tags) || p.tags.indexOf("live-programming") < 0)
                          continue;
                        children226.push(<>{content.renderProjectItem(p)}</>);
                      }
                      return keyed(children226);
                    })()}
                  </div>
                </div>
              </>,
            );
            return keyed(children225);
          })()}
        </div>
      </>
    );
  }
  function renderRevisions(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          {plainText(en ? "Revision history" : "更新履歴")}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            {(() => {
              const children227: ReactNode[] = [];
              if (!en) {
                children227.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("9/28/2023")}</div>
                        <div className="summary">
                          {richText("日本ソフトウェア科学会 第40回大会 チュートリアルの概要を追加")}
                        </div>
                      </div>
                    </div>
                  </>,
                );
                children227.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("9/27/2023")}</div>
                        <div className="summary">{richText("LIVE 2017基調講演の内容を和訳")}</div>
                      </div>
                    </div>
                  </>,
                );
              } else {
                children227.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("9/28/2023")}</div>
                        <div className="summary">
                          {richText("Add introduction to the tutorial course held as part of ")}
                          <a href={href("https://jssst2023.wordpress.com/tutorial")}>
                            {richText("The 40th ")}
                            <abbr title={"Japan Society for Software Science and Technology"}>
                              {richText("JSSST")}
                            </abbr>
                            {richText(" Annual Conference")}
                          </a>
                          {richText(" (content in Japanese).")}
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              children227.push(
                <>
                  <div className="event">
                    <div className="content">
                      <div className="date">{richText("2/15/2018")}</div>
                      <div className="summary">
                        {plainText(
                          en
                            ? 'Replace "Further reading" with the list of relevant projects. Please visit each project page for further readings.'
                            : "関連プロジェクトの一覧を公開",
                        )}
                      </div>
                    </div>
                  </div>
                </>,
              );
              children227.push(
                <>
                  <div className="event">
                    <div className="content">
                      <div className="date">{richText("1/21/2018")}</div>
                      <div className="summary">
                        {plainText(en ? "Upload the initial prototype version." : "初版を公開")}
                      </div>
                    </div>
                  </div>
                </>,
              );
              return keyed(children227);
            })()}
          </div>
        </div>
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
              const children211: ReactNode[] = [];
              let additionalLabels = [
                '<span class="ui tiny red basic label">' +
                  (en
                    ? "Tutorial course at JSSST '23"
                    : "日本ソフトウェア科学会大会 第40回大会 チュートリアル") +
                  "</span>",
              ];
              children211.push(
                <>{content.renderProjectHero("live-programming", additionalLabels)}</>,
              );
              return keyed(children211);
            })()}
          </>
        }
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{plainText(en ? "Top" : "トップ")}</div>
                </a>
                <a className="item" href={href("#abstract")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Summary" : "概要")}</div>
                </a>
                <a className="item" href={href("#presentation-jssst2023")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(
                      en
                        ? "JSSST 2023 Tutorial"
                        : "日本ソフトウェア科学会 第40回大会 チュートリアル",
                    )}
                  </div>
                </a>
                <a className="item" href={href("#presentation-live2017")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "LIVE 2017 Keynote" : "LIVE 2017 基調講演")}
                  </div>
                </a>
                <a className="item" href={href("#further-readings")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Relevant projects" : "関連プロジェクト")}
                  </div>
                </a>
                <a className="item" href={href("#revisions")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Revision history" : "更新履歴")}</div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section id={attribute("abstract")}>{renderAbstract()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("presentation-jssst2023")}>{renderPresentationJssst2023()}</section>
        <section id={attribute("presentation-live2017")}>{renderPresentationLive2017()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("further-readings")}>{renderFurtherReadings()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("revisions")}>{renderRevisions()}</section>
      </SiteLayout>
    </>
  );
}
