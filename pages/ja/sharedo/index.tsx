import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/sharedo/index.pug; edit this TSX source directly. */
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

  p = projectsTable["sharedo"];
  title = p.getTitle(lang);
  me = p.project + "/";
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

  return (
    <>
      <SiteLayout context={context}>
        {(() => {
          const children262: ReactNode[] = [];
          children262.push(<>{content.renderProjectHeader("sharedo")}</>);
          children262.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children262.push(
            <>
              <section id={attribute("abstract")}>
                <h2 className="ui header">
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </h2>
                <div className="ui basic segment">
                  <p>
                    {richText(
                      "ユーザ間で To-do 共有が行える Web サービスにおいて、ロボットにユーザと同等の権限を与えて、ユーザとロボットの間でタスクの分業を行えるようにした試作システム Sharedo について報告する。本システムには、リスト単位で共有相手を選べる機能がついている。また、To-do ごとにコメント欄があり、曖昧な点について共有相手と対話できるようになっている。",
                    )}
                  </p>
                  <p>
                    {richText("本研究の詳細については、")}
                    <a href={href("http://sharedo.digitalmuseum.jp/research/wiss2011")}>
                      {richText("WISS 2011で登壇発表したときの資料ページ")}
                    </a>
                    {richText("が充実している。")}
                  </p>
                  <p>
                    {richText("本研究は")}
                    <a
                      href={href(
                        "https://web.archive.org/web/20160722030805/http://rit.rakuten.co.jp/conf/rrds4/index.html",
                      )}
                    >
                      {richText("第4回 楽天研究開発シンポジウム")}
                    </a>
                    {richText("にて最優秀賞を受賞したほか、")}
                    <a href={href("http://hai-conference.net/hai2014/program/")}>
                      <abbr title={"Human-Agent Interaction"}>{richText("HAI")}</abbr>
                      {richText("2014")}
                    </a>
                    {richText("でBest Paper Nomineeに選定された。システムのプロトタイプが ")}
                    <a href={href("http://www.sharedo.info")}>
                      {richText("http://www.sharedo.info")}
                    </a>
                    {richText(" で稼働中である。")}
                  </p>
                </div>
              </section>
            </>,
          );
          children262.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children262.push(
            <>
              <section id={attribute("presentations")}>
                <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
                <div className="ui basic segment">
                  <div className="ui stackable two columns grid">
                    <div className="column">
                      <h3 className="ui header">{plainText(en ? "Demo Video" : "デモ動画")}</h3>
                      {content.renderEmbedYoutube("//www.youtube.com/embed/HxEUgOSwTeM")}
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <a href={href("//www.youtube.com/watch?v=HxEUgOSwTeM")}>
                              <i className="youtube icon"></i>
                              {richText("YouTube")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      {(() => {
                        const children263: ReactNode[] = [];
                        children263.push(
                          <>
                            <h3 className="ui header">
                              {richText("HAI 2014 ")}
                              {plainText(en ? "Slides" : "発表スライド")}
                            </h3>
                          </>,
                        );
                        children263.push(
                          <>
                            <div
                              className="ui embed"
                              data-url={publicationsTable[p.publication].entryTags.slides}
                              data-placeholder={`${rootPath}images/background-eee.png`}
                              data-icon={"video play outline"}
                            ></div>
                          </>,
                        );
                        children263.push(
                          <>
                            <div className="caption">
                              <div className="ui horizontal list">
                                <div className="item">
                                  <a href={href(publicationsTable[p.publication].entryTags.slides)}>
                                    <i className="download icon"></i>
                                    {plainText(en ? "Download" : "ダウンロード")}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                        if (!en) {
                          children263.push(
                            <>
                              <p className="caption">
                                {richText("日本語の発表スライドは")}
                                <a href={href("#publications")}>
                                  <i className="book icon"></i>
                                  {richText("発表文献")}
                                </a>
                                {richText("で日本語文献の ")}
                                <i className="sidebar fitted icon"></i>
                                {richText(" をクリックすると閲覧できます。")}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children263);
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            </>,
          );
          if (!en) {
            children262.push(
              <>
                <div className="ui hidden divider"></div>
              </>,
            );
            children262.push(
              <>
                <section id={attribute("vision")}>
                  <h2 className="ui header">{richText("未来ビジョン")}</h2>
                  <div className="ui basic segment">
                    <p>
                      {richText(
                        "現時点では多くの家庭用ロボットの完成度は人に遠く及ばない。この間を縮める工学的な努力をやめるべきでないというのは論を待たないが、一方で、より至近の未来、実世界において我々が情報技術による恩恵に与るにはどうしたらよいだろうか。以下に、二つの未来ビジョンを提示したい。",
                      )}
                    </p>
                    <p>
                      {richText(
                        "まず、我々は、ロボットに全ての雑務を任せて人は移動式ベッドに寝そべるだけの全自動な未来ではなく、人が得意なことは人が、ロボットが得意なことはロボットが行う「積極的な分業」の未来こそが幸せな解であると考えている。現状でも家電製品がユーザの余暇時間を増やしており、これも分業の一形態ではあるが、人にかかる負担を減らすためだけに機械を用いる「消極的な分業」が多いのではないか。人が楽しんで創造性を発揮できることをロボットにさせない自由があるべきだ。本提案は、そのための第一歩として、タスクの実行主体を選ぶ権利をユーザに提供するシステムである。",
                      )}
                    </p>
                    <p>
                      {richText(
                        "次に、我々は、人が情報システムの指示通りに実世界タスクをこなすことによって、自分でやり方を考えたときより楽にタスクをこなせる場合が多々あることに着目し、ロボットのように「自動的な人間」として動くことをもっと肯定的に捉えたいと考えている。例えば、本システムは掃除ロボットに回復不能なエラーが起きると人にタスクを割り当て、人をフェイルセーフとして利用することで掃除という大目標を確実に遂行できる。実社会ではOperations Researchが組織の意思決定に使われるなどマクロな応用例が目立つが、我々は個人単位のタスクに興味がある。例えば、Human Computationは遠隔地の知的労働力を計算能力に変換する手法だが、この実世界版としてHuman Actuationというものが可能ならどのような形態になるのか考えてみたい。",
                      )}
                    </p>
                  </div>
                </section>
              </>,
            );
          }
          children262.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children262.push(
            <>{content.renderProjectPublications("sharedo", "hai2014-kato-sharedo")}</>,
          );
          return keyed(children262);
        })()}
      </SiteLayout>
    </>
  );
}
