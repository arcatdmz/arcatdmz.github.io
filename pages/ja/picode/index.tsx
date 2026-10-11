import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/picode/index.pug; edit this TSX source directly. */
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

  p = projectsTable["picode"];
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
          const children241: ReactNode[] = [];
          children241.push(<>{content.renderProjectHeader("picode")}</>);
          children241.push(
            <>
              <div className="ui message">
                {richText("Picodeは")}
                <a
                  href={href(
                    "https://web.archive.org/web/20160617171039/https://www.microsoft.com/ja-jp/ijarc/core/ifp_07_j_result.aspx",
                  )}
                >
                  {richText("Microsoft Research CORE 7 プログラム")}
                </a>
                {richText("の支援を受けて始まり、")}
                <a href={href(`${basePath}phybots`)}>{richText("Phybots")}</a>
                {richText("を利用して開発され、現在は")}
                <a href={href("https://github.com/arcatdmz/picode")}>{richText("GitHub")}</a>
                {richText("でソースコードが公開されているオープンソースプロジェクトです。")}
              </div>
            </>,
          );
          children241.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children241.push(
            <>
              <section id={attribute("abstract")}>
                <h2 className="ui header">
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </h2>
                <div className="ui basic segment">
                  <p>
                    {richText(
                      "プログラムのソースコードは、大抵の場合、文字や記号表現を用いて記述するものである。このような表現は、論理的な処理の精確な記述に適している一方で、画像や多関節ロボットの姿勢情報など、具体的なデータセットを分かりやすく見せることができない。この問題は、実世界の人やロボットの姿勢情報を扱うプログラミングで顕著である。",
                    )}
                  </p>
                  <p>
                    {richText(
                      "そこで我々は、人やロボットの姿勢データを写真と紐づけ、ソースコード中に写真を貼り込める統合開発環境Picode (旧名Roboko)を試作した。まず、写真と紐づけられた姿勢データを第一級オブジェクトとして扱う拡張を既存の文字言語に施した。次に、姿勢データを引数に取るAPIライブラリを提供した。そして、エディタに写真を貼り付けられるような開発環境を実装した。",
                    )}
                  </p>
                </div>
              </section>
            </>,
          );
          children241.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children241.push(
            <>
              <section id={attribute("presentations")}>
                <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
                <div className="ui basic segment">
                  <div className="ui stackable two columns grid">
                    <div className="column">
                      <h3 className="ui header">{richText("CHI 2013 Fast-forward")}</h3>
                      {content.renderEmbedYoutube("//www.youtube.com/embed/NCou4Q1STE8")}
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <a href={href("//www.youtube.com/watch?v=NCou4Q1STE8")}>
                              <i className="youtube icon"></i>
                              {richText("Fast-forward")}
                            </a>
                          </div>
                          <div className="item">
                            <a href={href("//www.youtube.com/watch?v=cQv0-4f8LEA")}>
                              <i className="youtube icon"></i>
                              {richText("Full version")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      {(() => {
                        const children242: ReactNode[] = [];
                        children242.push(
                          <>
                            <h3 className="ui header">
                              {richText("CHI 2013 ")}
                              {plainText(en ? "Slides" : "発表スライド")}
                            </h3>
                          </>,
                        );
                        children242.push(
                          <>
                            <div
                              className="ui embed"
                              data-url={publicationsTable[p.publication].entryTags.slides}
                              data-placeholder={`${rootPath}images/background-eee.png`}
                              data-icon={"video play outline"}
                            ></div>
                          </>,
                        );
                        children242.push(
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
                          children242.push(
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
                        return keyed(children242);
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            </>,
          );
          children241.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children241.push(
            <>
              <section>
                <h2 className="ui header">{richText("Picode IDE")}</h2>
                <div className="ui basic segment">
                  <p>
                    {richText(
                      '本研究では、姿勢情報を用いるプログラミングのワークフローを支援するため、写真を貼りこめるよう拡張したエディタを含む文字ベースの統合開発環境(IDE)に、姿勢情報と写真の記録および紐づけを自然に行える例示インタフェースと、記録した写真を閲覧できる"Pose library"を追加した。このIDEを用いたプログラミングは、人やロボットの姿勢情報を写真とともにキャプチャする例示から始まる。そして、写真をエディタにドラッグ＆ドロップしたり文字を入力したりすることでソースコードを書き上げ、プログラムを実行する。ソースコードはキャプチャした写真と姿勢情報のデータセットと共に再配布できる。',
                    )}
                  </p>
                  <p>
                    {richText(
                      "例えば、Picodeを用いると以下のようなプログラムを書ける。サポートされている主なAPIについては後述する。(",
                    )}
                    <a
                      href={href(
                        `${rootPath}picode/docs/?com/phybots/picode/api/package-summary.html`,
                      )}
                    >
                      {richText("Javadoc")}
                    </a>
                    {richText(")")}
                  </p>
                  <dl>
                    <dt>
                      <a href={href(`${rootPath}picode/xylophone/`)}>{richText("鉄琴演奏ロボ")}</a>
                    </dt>
                    <dd>{richText("かえるの歌を演奏する。")}</dd>
                    <dt>
                      <a href={href(`${rootPath}picode/hello/`)}>
                        {richText("挙手でスライド送り")}
                      </a>
                    </dt>
                    <dd>
                      {richText("右手を挙げるとスライドを次に送り、左手を挙げると一つ前に戻す。")}
                    </dd>
                    <dt>
                      <a href={href(`${rootPath}picode/flag/`)}>{richText("旗揚げゲーム")}</a>
                    </dt>
                    <dd>
                      {richText("画面に出てくるキャラクターと同じほうの手を素早く挙げると高得点。")}
                    </dd>
                  </dl>
                </div>
                <div className="ui stackable two columns grid">
                  <div className="column">
                    <a className="ui fluid image" href={href(`${rootPath}picode/picode-ide.jpg`)}>
                      <img src={`${rootPath}picode/picode-ide.jpg`} alt={"Overview"} />
                    </a>
                    <div className="caption">
                      {plainText(en ? "Overview of the Picode IDE" : "Picode IDEの概観")}
                    </div>
                  </div>
                  <div className="column">
                    <dl>
                      <dt>{richText("<strong>Pose</strong> Robot.getPose()")}</dt>
                      <dd>{richText("現在の姿勢を返す")}</dd>
                      <dt>{richText("<strong>float</strong> Pose.distance(Pose pose)")}</dt>
                      <dd>{richText("二つの姿勢間の差異を返す [0.0-1.0]")}</dd>
                      <dt>
                        {richText("<strong>boolean</strong> Pose.eq(Pose pose, float threshold)")}
                      </dt>
                      <dd>
                        {richText(
                          "二つの姿勢が同じとみなせるかどうか返す (二つの姿勢間の差異がthresholdより小さいかどうか返す)",
                        )}
                      </dd>
                      <dt>{richText("<strong>boolean</strong> Robot.setPose(Pose pose)")}</dt>
                      <dd>{richText("ロボットの姿勢を指定する")}</dd>
                      <dt>{richText("<strong>Action</strong> Robot.action()")}</dt>
                      <dd>{richText("ロボットの姿勢の推移を表すActionオブジェクトを返す")}</dd>
                      <dt>{richText("<strong>Action</strong> Action.pose(Pose pose)")}</dt>
                      <dd>{richText("このActionの最後に指定した姿勢への推移を追加する")}</dd>
                      <dt>{richText("<strong>Action</strong> Action.stay(int ms)")}</dt>
                      <dd>{richText("このActionの最後に指定した時間のまま静止するようにする")}</dd>
                      <dt>{richText("<strong>ActionResult</strong> Action.play()")}</dt>
                      <dd>{richText("Actionを再生する")}</dd>
                    </dl>
                  </div>
                </div>
              </section>
            </>,
          );
          if (!en) {
            children241.push(
              <>
                <div className="ui hidden divider"></div>
              </>,
            );
            children241.push(
              <>
                <section id={attribute("vision")}>
                  <h2 className="ui header">{richText("未来ビジョン")}</h2>
                  <div className="ui basic segment">
                    <p>
                      {richText(
                        "&quot;Programmers are people, too.&quot; という言葉がある。この、プログラマだって人である、という言葉には、プログラマがいかに分かりづらい言語を理解し、使いづらい開発環境と格闘してきたか、プログラマと一般人の溝がいかに深いか、という現状認識が現れているように思われる。",
                      )}
                    </p>
                    <p>
                      {richText(
                        "しかし私は、プログラマと一般人の溝が近年急速に埋まりつつあるように感じている。まず、開発環境を整えるのが簡単になった。以前なら必要なファイルを揃えてパスを通して、と大変な手間だったものが、今はブラウザを開くだけでよい。プログラミングの学習も",
                      )}
                      <a href={href("https://www.khanacademy.org/computing/computer-programming")}>
                        {richText("Kahn Academy")}
                      </a>
                      {richText(
                        "などでインタラクティブに進められる。また、プログラミングできる対象が身近になってきた。",
                      )}
                      <a href={href("https://en.wikipedia.org/wiki/Lego_Mindstorms_NXT")}>
                        {richText("LEGO Mindstorms NXT")}
                      </a>
                      {richText(
                        "のように実世界で動くものはもちろん、例えばスマートフォン上でスマートフォン用のプログラムを書いたり(",
                      )}
                      <a href={href(`${basePath}touchdevelop/`)}>{richText("TouchDevelop")}</a>
                      {richText(")、Webサービス同士をif-thenルールで連携させたり(")}
                      <a href={href("https://ifttt.com")}>{richText("IFTTT")}</a>
                      {richText(
                        ")できる。家電製品がネットワークに繋がるようになってきたから、これらを遠隔制御する実用的なプログラムも簡単に書けるようになるだろう。",
                      )}
                    </p>
                    <p>
                      {richText(
                        "また、プログラミング言語の研究者コミュニティでは、言語だけでなく開発環境まで含めたプログラマの体験を重視する研究が増えてきている。我々のコミュニティで道具としてのUIから体験としてのHCIに研究の主流がシフトしたように、言語、ライブラリ、開発環境を個々に評価するのではなく、全体のワークフローを重視する流れが生まれている。",
                      )}
                    </p>
                    <p>
                      {richText(
                        "我々は、このような追い風を受けながら &quot;People are programmers.&quot; の世界を実現していきたいと考えている。",
                      )}
                    </p>
                  </div>
                </section>
              </>,
            );
          }
          children241.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children241.push(
            <>{content.renderProjectPublications("picode", "chi2013-kato-picode")}</>,
          );
          return keyed(children241);
        })()}
      </SiteLayout>
    </>
  );
}
