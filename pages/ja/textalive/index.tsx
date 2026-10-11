import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/textalive/index.pug; edit this TSX source directly. */
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

  p = projectsTable["textalive"];
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
  function renderNews(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          <div className="content">{plainText(en ? "News" : "ニュース")}</div>
        </h2>
        <div className="ui basic segment">
          <div className="ui divided small feed">
            <div className="event">
              <div className="content">
                <div className="date">{richText("2021/-/-")}</div>
                <div className="summary">
                  {richText("最新情報は")}
                  <a href={href("https://textalive.jp/events")}>
                    {richText("TextAliveの活用事例を紹介したイベントページ")}
                  </a>
                  {richText("や")}
                  <a
                    href={href(
                      "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4",
                    )}
                  >
                    {richText("更新履歴")}
                  </a>
                  {richText("、後続研究「")}
                  <a href={href(`${basePath}lyric-app-framework`)}>
                    {richText("Lyric App Framework")}
                  </a>
                  {richText("」をご覧ください。")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2020/9/18")}</div>
                <div className="summary">
                  {richText(
                    "TextAliveの機能を使って音楽に合わせてタイミングよく歌詞が動くWebアプリケーション（リリックアプリ）を開発できるJavaScript用のライブラリ「",
                  )}
                  <a href={href("https://developer.textalive.jp/")}>
                    {richText(
                      'TextAlive App <abbr title="Application Programming Interface">API</abbr>」',
                    )}
                  </a>
                  {richText("がリリースされました。また、")}
                  <a href={href("https://developer.textalive.jp/events/magicalmirai2020")}>
                    {richText("初音ミク「マジカルミライ 2020」")}
                  </a>
                  {richText(
                    "で、同APIを利用した、イベント史上初のプログラミング・コンテストの実施が発表されました。",
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2019/11/13")}</div>
                <div className="summary">
                  <a href={href("https://www.morisawa.co.jp/about/news/4707")}>
                    {richText("モリサワ株式会社のInter BEE 2019出展ブース")}
                  </a>
                  {richText("で、TextAliveのデモ映像が展示されました。")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2019/9/6")}</div>
                <div className="summary">
                  <a href={href("https://prtimes.jp/main/html/rd/p/000000002.000045795.html")}>
                    {richText(
                      "舞台美術を手がける「シミズオクト」がプロデュースする「ジュリアナの祟り」ライブ",
                    )}
                  </a>
                  {richText(
                    "で、アーティスト自身がTextAliveを活用して制作した歌詞アニメーションが紗幕に上映されました。",
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2019/6/17")}</div>
                <div className="summary">
                  <a href={href("https://textalive.jp/events/magicalmirai2019")}>
                    {richText("初音ミク「マジカルミライ 2019」")}
                  </a>
                  {richText(
                    "でTextAliveを活用して制作した歌詞アニメーションが使われ、TextAlive講座が開かれました。企画展ステージでもTextAlive制作映像が使われました。",
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2019/2/8")}</div>
                <div className="summary">
                  {richText(
                    "SNOW MIKU LIVE! 2019でTextAliveを使って制作した歌詞アニメーションが使われました。これにあわせて",
                  )}
                  <a href={href("https://docs.textalive.jp/history/")}>{richText("v0.7.0")}</a>
                  {richText("をリリースし、「カラフルキャンバス」スタイルを追加しました。")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2018/8/20")}</div>
                <div className="summary">
                  <a href={href("https://docs.textalive.jp/magicalmirai2018")}>
                    {richText("初音ミク「マジカルミライ 2018」")}
                  </a>
                  {richText(
                    "でTextAliveを使って制作した歌詞アニメーションが使われる他、TextAlive講座が開かれます。",
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2018/2/10")}</div>
                <div className="summary">
                  <a href={href("https://docs.textalive.jp/snowmiku2018")}>
                    {richText("SNOW MIKU LIVE! 2018")}
                  </a>
                  {richText("でTextAliveを使って制作した歌詞アニメーションが使われました。")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2016/10/16")}</div>
                <div className="summary">
                  <a href={href("https://docs.textalive.jp/nomaps2016/")}>
                    {richText("No Maps 2016")}
                  </a>
                  {richText(
                    "のIDOL DIVERSITYでTextAliveを使って制作した歌詞アニメーションが使われたほか、デモ展示を行い、piaproユーザ向けに動画のダウンロード機能をリリースしました。",
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2016/2/5")}</div>
                <div className="summary">
                  <a href={href("http://textalive.jp/snowmiku2016")}>
                    {richText("SNOW MIKU 2016とのタイアップ企画")}
                  </a>
                  {richText("でイラストと一緒に歌詞アニメーションを楽しめるようになりました。")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2015/9/8")}</div>
                <div className="summary">
                  {richText("本研究は")}
                  <a
                    href={href(
                      "https://www.aist.go.jp/aist_j/press_release/pr2015/pr20150908/pr20150908.html",
                    )}
                  >
                    {richText("プレスリリース")}
                  </a>
                  {richText("と同時に")}
                  <a href={href("https://textalive.jp")}>{richText("Webサービスとして一般公開")}</a>
                  {richText("を始めました。ぜひお試しください。")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "Kinetic Typographyは、文字を動かして見せることで意味をより深く伝えられる手法として、楽曲のプロモーションなどの動画で頻繁に利用されている。しかし、歌詞を楽曲と同期してアニメーションさせる動画を制作するためには、まず、動画制作ツールの使い方に慣れる必要があった。さらに、歌詞を文字ごとに時刻同期させて動きを手付けするため、多くの手間がかかっていた。",
            )}
          </p>
          <p>
            {richText(
              "TextAliveは、ウェブ上に公開されている楽曲と歌詞の時間的対応付けを自動で推定し、Kinetic Typographyを用いた動画を自動生成する。したがって、事前にツールの使い方を学ばなくても、好みの楽曲のKinetic Typography動画を楽しむことができる。また、生成された動画をウェブ上のグラフィカルなインタフェースで編集でき、一から動画を作るより大幅に少ない手間で動画を制作できる。さらに、文字の動きを定めているアルゴリズムをその場でプログラミングでき、プリセットのテンプレートに縛られない自由な表現が可能である。",
            )}
          </p>
          <div className="ui message">
            {richText("本研究は、 2015/9/8 に")}
            <a
              href={href(
                "https://www.aist.go.jp/aist_j/press_release/pr2015/pr20150908/pr20150908.html",
              )}
            >
              {richText("プレスリリース")}
            </a>
            {richText("と同時に、リリックビデオの制作支援Webサービス「")}
            <a href={href("https://textalive.jp")}>{richText("TextAlive")}</a>
            {richText("」として一般公開されました。最新情報は")}
            <a href={href("https://textalive.jp/events")}>
              {richText("TextAliveの活用事例を紹介したイベントページ")}
            </a>
            {richText("や")}
            <a
              href={href(
                "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4",
              )}
            >
              {richText("更新履歴のページ")}
            </a>
            {richText("をご覧ください。")}
          </div>
          <div className="ui message">
            {richText("2020/9/18 には、開発者向けに「")}
            <a href={href("https://developer.textalive.jp")}>
              {richText('TextAlive App <abbr title="Application Programming Interface">API</abbr>')}
            </a>
            {richText(
              "」がリリースされました。インタラクティブな歌詞駆動メディア「リリックアプリ」を開発できます。",
            )}
            {richText("\n")}
            {richText("詳しくは、リリックアプリの開発フレームワーク「")}
            <a href={href(`${basePath}lyric-app-framework`)}>{richText("Lyric App Framework")}</a>
            {richText("」の研究紹介をご覧ください。")}
          </div>
        </div>
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">{richText("CHI 2015 Fast-forward")}</h3>
              {content.renderEmbedYoutube("//www.youtube.com/embed/lOdt-pf5U8Q")}
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={href("//www.youtube.com/watch?v=lOdt-pf5U8Q")}>
                      <i className="youtube icon"></i>
                      {richText("Fast-forward")}
                    </a>
                  </div>
                  <div className="item">
                    <a href={href("//www.youtube.com/watch?v=ofczPQZaWMk")}>
                      <i className="youtube icon"></i>
                      {richText("Full version")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              {(() => {
                const children265: ReactNode[] = [];
                children265.push(
                  <>
                    <h3 className="ui header">
                      {richText("CHI 2015 ")}
                      {plainText(en ? "Slides" : "発表スライド")}
                    </h3>
                  </>,
                );
                children265.push(
                  <>
                    <div
                      className="ui embed"
                      data-url={publicationsTable[p.publication].entryTags.slides}
                      data-placeholder={`${rootPath}images/background-eee.png`}
                      data-icon={"video play outline"}
                    ></div>
                  </>,
                );
                children265.push(
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
                  children265.push(
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
                return keyed(children265);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderExamples(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Example videos" : "作例")}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              {(() => {
                const children266: ReactNode[] = [];
                children266.push(
                  <>
                    <h3 className="ui header">
                      {plainText(en ? "TextAlive Online" : "Web版")}
                      <div className="ui tiny label">
                        <i className="calendar icon"></i>
                        <span>{richText("2015-")}</span>
                      </div>
                    </h3>
                  </>,
                );
                children266.push(
                  <>
                    {content.renderEmbedYoutube(
                      "https://www.youtube.com/embed/videoseries?list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo",
                    )}
                  </>,
                );
                if (!en) {
                  children266.push(
                    <>
                      <p className="caption">
                        {richText(
                          "Web版のTextAliveは現在も開発が続けられています。この作例は、初音ミクやアイドルのライブなどで利用されたものです。 ",
                        )}
                        <a href={href("https://textalive.jp")}>{richText("textalive.jp")}</a>
                        {richText(" にアクセスすれば、誰でも動画を制作できます。")}
                      </p>
                    </>,
                  );
                }
                return keyed(children266);
              })()}
            </div>
            <div className="column">
              {(() => {
                const children267: ReactNode[] = [];
                children267.push(
                  <>
                    <h3 className="ui header">
                      {plainText(en ? "TextAlive Desktop" : "デスクトップ版")}
                      <div className="ui tiny label">
                        <i className="calendar icon"></i>
                        <span>{richText("2014-2015")}</span>
                      </div>
                    </h3>
                  </>,
                );
                children267.push(
                  <>{content.renderEmbedYoutube("https://www.youtube.com/embed/ofczPQZaWMk")}</>,
                );
                if (!en) {
                  children267.push(
                    <>
                      <p className="caption">
                        {richText(
                          "デスクトップ版のTextAliveは研究用プロトタイプとして開発されました。この作例は、プログラマや音楽動画制作者の方々を対象としたユーザスタディなどで制作されたものです。",
                        )}
                      </p>
                    </>,
                  );
                }
                return keyed(children267);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="gift icon"></i>
          <div className="content">{plainText(en ? "Relevant projects" : "関連プロジェクト")}</div>
        </h2>
        <div className="ui basic segment">
          <div className="ui segment">
            <div className="ui divided items projects">
              {content.renderProjectItem(projectsTable["lyric-app-framework"])}
              {content.renderProjectItem(projectsTable["creativity-support-environments"])}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={<>{content.renderProjectHero("textalive")}</>}
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
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </a>
                <a className="item" href={href("#presentations")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Presentations" : "発表内容")}</div>
                </a>
                <a className="item" href={href("#examples")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Example videos" : "作例")}</div>
                </a>
                <a className="item" href={href("#publications")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Publications" : "発表文献")}</div>
                </a>
                <a className="item" href={href("#further-readings")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Relevant projects" : "関連プロジェクト")}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <div className="with-rail">
          <div className="right-rail">
            <section id={attribute("news")}>{renderNews()}</section>
          </div>
          <div className="left-content">
            <section id={attribute("abstract")}>{renderAbstract()}</section>
            <div className="ui basic right aligned segment">
              <a className="ui primary button" href={href("//textalive.jp")}>
                <i className="external icon"></i>
                {plainText(en ? "Service Website" : "Webサイトへ")}
              </a>
            </div>
            <div className="ui hidden divider"></div>
            <section id={attribute("presentations")}>{renderPresentations()}</section>
          </div>
          <div className="ui hidden divider"></div>
          <section id={attribute("examples")}>{renderExamples()}</section>
        </div>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("textalive", "chi2015-kato-textalive")}
        <div className="ui hidden divider"></div>
        <section id={attribute("further-readings")}>{renderFurtherReadings()}</section>
      </SiteLayout>
    </>
  );
}
