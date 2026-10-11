import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import {
  classNames,
  style,
  text as plainText,
  keyed,
  href,
  attribute,
} from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/collaborations/index.pug; edit this TSX source directly. */
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

  title = en ? "Call for collaborations" : "共同研究";
  me = "collaborations/";
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
  function renderCollaborations(): ReactNode {
    return (
      <>
        <div className="ui stackable grid">
          <div className="eight wide column">
            <h2 className="ui header" id={attribute("tech-transfer")}>
              <i className="gift icon"></i>
              {richText("外部連携")}
            </h2>
            <p>
              {richText(
                "これまでに研究開発してきた創造性支援ツール・インタラクティブシステムは、大規模イベントでのライブやプログラミング・コンテスト、アニメ制作の現場、科学館のワークショップや大学院の講義などで活用されてきました。",
              )}
            </p>
            <p>
              {richText(
                "今後もより多くの現場で使われる研究成果を実現していきたいと考えているので、ご協力よろしくお願いいたします。",
              )}
            </p>
            <dl>
              <dt>
                <strong>{richText("共同研究や招待講演などのお問合せ:")}</strong>
              </dt>
              <dd>
                <a href={href(`${rootPath}ja/#contact`)}>
                  {richText("連絡先")}
                </a>
                {richText("へメールでご相談ください。")}
              </dd>
              <dt>
                <strong>{richText("学会運営委員などのご依頼:")}</strong>
              </dt>
              <dd>
                <a href={href(`${rootPath}ja/#contact`)}>
                  {richText("同じ連絡先")}
                </a>
                {richText("で承りますが、")}
                <a href={href(`${rootPath}ja/activities`)}>
                  {richText("溢れ気味")}
                </a>
                {richText("でお断りせざるを得ない場合が多いです。")}
              </dd>
              <dt>
                <strong>{richText("技術の利用:")}</strong>
              </dt>
              <dd>
                <a href={href("#services")}>{richText("下記のサービス")}</a>
                {richText(
                  "はWeb上でお試しいただけます。教育用途や営利目的で利用されたい場合は、各システムの窓口（",
                )}
                <a href={href("mailto:songle-sync-ml@aist.go.jp")}>
                  {richText("Songle Sync")}
                </a>
                {richText("、")}
                <a href={href("mailto:f3js-ml@aist.go.jp")}>
                  {richText("f3.js")}
                </a>
                {richText("、")}
                <a href={href("mailto:textalive-ml@aist.go.jp")}>
                  {richText("TextAlive")}
                </a>
                {richText("）へメールでご相談ください。")}
              </dd>
            </dl>
            {renderServices()}
          </div>
          <div className="eight wide column">
            <h2 className="ui header" id={attribute("collaborators")}>
              <i className="users icon"></i>
              {richText("リサーチエンジニア・協力研究員")}
            </h2>
            <p>
              {richText(
                '2018年から技術顧問としてアニメの企画開発プロデュース会社である<a href="https://archinc.jp">アーチ株式会社</a>の技術顧問を務めており、小規模ながら研究開発チームがあります。また、主務である<abbr title="産業技術総合研究所">産総研</abbr>でも、協力研究員などのかたちで研究開発に関わってくださる方々を受け入れています。',
              )}
            </p>
            <div className="ui list">
              <div className="item">
                <div className="header">
                  <a href={href("https://research.archinc.jp/members/")}>
                    {richText("Arch Research")}
                  </a>
                </div>
                <div className="meta">
                  {richText("2019/04- アーチ株式会社 研究開発部門")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://baku89.com")}>{richText("橋本 麦")}</a>
                </div>
                <div className="meta">
                  {richText(
                    '2023/02- <abbr title="産業技術総合研究所">産総研</abbr> 協力研究員',
                  )}
                </div>
              </div>
            </div>
            <h2 className="ui header" id={attribute("students")}>
              <i className="student icon"></i>
              {richText("学生インターン")}
            </h2>
            <p>
              {richText(
                '主務である<abbr title="産業技術総合研究所">産総研</abbr>では、<abbr title="Human-Computer Interaction">HCI</abbr>分野の研究に興味のある学生を技術研修生として受け入れ、一緒に研究してきました。通常は以下のような内容ですが、期間や場所は応相談です。',
              )}
            </p>
            <dl>
              <dt>
                <strong>{richText("研究テーマ:")}</strong>
              </dt>
              <dd>
                {richText(
                  "自由（一から企画立案して取り組むことを基本とします）",
                )}
              </dd>
              <dt>
                <strong>{richText("立場:")}</strong>
              </dt>
              <dd>{richText("技術研修生（履歴書に書くことができます）")}</dd>
              <dt>
                <strong>{richText("期間:")}</strong>
              </dt>
              <dd>
                {richText(
                  "春休みか夏休みの1-2か月（前後も含め数か月で論文化を目指します）",
                )}
              </dd>
              <dt>
                <strong>{richText("場所:")}</strong>
              </dt>
              <dd>
                {richText(
                  "産総研つくば中央第二事業所（他の学生と一緒に泊まり込むことを基本とします）",
                )}
              </dd>
            </dl>
            <p>
              {richText(
                "モーションキャプチャ、3Dプリンタ、レーザーカッター、切削加工機や電子工作に必要な機材が揃っています。",
              )}
            </p>
            <p>
              {richText(
                '<a href="https://research.archinc.jp">Arch Research</a>で受け入れ可能なこともあるかもしれません。アーチは代々木にオフィスがあります。',
              )}
            </p>
            <h3 className="ui header">{richText("過去の技術研修生")}</h3>
            <p>
              {richText(
                "多くの場合、複数の研究員が共同でメンタリングします。加藤が主に担当した学生は名前の前に",
              )}
              <i className="check circle icon"></i>
              {richText("が付いています。")}
            </p>
            <div className="ui list">
              <div className="item">
                <div className="header">{richText("山根 壮一、小林 和弘")}</div>
                <div className="meta">
                  {richText("奈良先端科学技術大学院大学（2014/09-10）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://ryosuzuki.org/")}>
                    <i className="check circle icon"></i>
                    {richText("鈴木 遼")}
                  </a>
                </div>
                <div className="meta">
                  {richText("東京大学大学院 経済学研究科 （2015/02-03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  {richText("赤堀 渉、")}
                  <a href={href("https://www.komazawa-u.ac.jp/~thirai/")}>
                    {richText("平井 辰典")}
                  </a>
                </div>
                <div className="meta">
                  {richText("早稲田大学 先進理工学部（2015/02-03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">{richText("吉館 要")}</div>
                <div className="meta">
                  {richText("筑波大学 情報学群（2015/02-03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://site.kkunihir.com/")}>
                    {richText("加藤 邦拓")}
                  </a>
                </div>
                <div className="meta">
                  {richText("明治大学大学院 理工学研究科 （2015/09-10）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <i className="check circle icon"></i>
                  {richText("若林 裕太、")}
                  <a href={href("https://github.com/FMS-Cat/")}>
                    <i className="check circle icon"></i>
                    {richText("小渕 豊")}
                  </a>
                </div>
                <div className="meta">
                  {richText("明治大学 総合数理学部（2015/09-10）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("http://pushl.net/")}>
                    <i className="check circle icon"></i>
                    {richText("今井 朝貴")}
                  </a>
                </div>
                <div className="meta">
                  {richText(
                    "東京工業大学大学院 情報理工学研究科（2015/09-10）",
                  )}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://scrapbox.io/mactkg-pub/mactkg")}>
                    <i className="check circle icon"></i>
                    {richText("原 健太")}
                  </a>
                </div>
                <div className="meta">
                  {richText("明治大学 総合数理学部（2016/02-03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">{richText("若狭 健太")}</div>
                <div className="meta">
                  {richText("筑波大学 情報学群（2016/08-2016/09）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://iis-lab.org/members/")}>
                    {richText("有賀 竣哉")}
                  </a>
                </div>
                <div className="meta">
                  {richText("東京大学 工学系研究科（2016/09-2016/09）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  {richText("吉館 要、")}
                  <a href={href("https://hiromu.phd")}>
                    {richText("矢倉 大夢")}
                  </a>
                </div>
                <div className="meta">
                  {richText("筑波大学 情報学群（2015/04-2017/03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://www.0x0c.me/profile/")}>
                    <i className="check circle icon"></i>
                    {richText("松田 暁")}
                  </a>
                </div>
                <div className="meta">
                  {richText("東京大学大学院 学際情報学府（2017/02-2017/03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a
                    href={href("https://sites.google.com/view/smygw72/home-jp")}
                  >
                    {richText("宮川 翔貴")}
                  </a>
                </div>
                <div className="meta">
                  {richText("早稲田大学 先進理工学部（2017/08-2017/09）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://73ch.work/")}>
                    {richText("浪川 洪作")}
                  </a>
                </div>
                <div className="meta">
                  {richText("筑波大学 情報学群（2019/10-2021/03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://atarapi.com/")}>
                    <i className="check circle icon"></i>
                    {richText("新 由衣")}
                  </a>
                </div>
                <div className="meta">
                  {richText("筑波大学 情報学群（2020/09-2022/09）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <a href={href("https://kamiwork.com/")}>
                    <i className="check circle icon"></i>
                    {richText("村上 貴人")}
                  </a>
                </div>
                <div className="meta">
                  {richText("筑波大学 情報学群（2021/05-2025/03）")}
                </div>
              </div>
              <div className="item">
                <div className="header">
                  <i className="check circle icon"></i>
                  {richText("上村 宙")}
                </div>
                <div className="meta">
                  {richText(
                    "北海道情報大学 情報メディア学部（2025/08-2025/09）",
                  )}
                </div>
              </div>
            </div>
            <h3 className="ui header">{richText("その他の学生向け情報")}</h3>
            <p>
              <a href={href("https://blog.junkato.jp/ja/")}>
                {richText("ブログ")}
              </a>
              {richText(
                "で定期的に情報発信しています。サイドバーに学生向けのおすすめ記事をまとめてあります。",
              )}
            </p>
          </div>
        </div>
      </>
    );
  }
  function renderServices(): ReactNode {
    return (
      <>
        {(() => {
          const children192: ReactNode[] = [];
          children192.push(
            <>
              <div className="ui divider" id={attribute("services")}></div>
            </>,
          );
          for (const p of products) {
            children192.push(
              <>
                <div
                  className="ui fluid card"
                  id={attribute(`projects-${p.project}`)}
                >
                  <a className="image" href={href(p.getLink(lang, basePath))}>
                    <img
                      src={`${rootPath}images/thumbnails/${p.getThumbnail(
                        lang,
                      )}`}
                    />
                  </a>
                  <div className="content">
                    <a
                      className="header"
                      href={href(p.getLink(lang, basePath))}
                    >
                      {(() => {
                        const children193: ReactNode[] = [];
                        if (p.icon) {
                          children193.push(
                            <>
                              <img
                                className="ui avatar image"
                                src={`${rootPath}images/icons/${p.icon}`}
                              />
                            </>,
                          );
                        }
                        children193.push(<>{richText(p.getTitle(lang))}</>);
                        return keyed(children193);
                      })()}
                    </a>
                    <div className="description">
                      {richText(p.getDescription(lang))}
                    </div>
                  </div>
                </div>
              </>,
            );
          }
          return keyed(children192);
        })()}
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#tech-transfer")}>
                  <i className="gift icon"></i>
                  <div className="content">{richText("外部連携")}</div>
                </a>
                <a className="item" href={href("#collaborators")}>
                  <i className="users icon"></i>
                  <div className="content">
                    {richText("リサーチエンジニア・協力研究員")}
                  </div>
                </a>
                <a className="item" href={href("#students")}>
                  <i className="student icon"></i>
                  <div className="content">{richText("技術研修生")}</div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section id={attribute("collaborations")}>
          <h1 className="ui header">
            <i className="handshake icon"></i>
            <div className="content">{plainText(title)}</div>
          </h1>
          <div className="ui segment">
            <div className="ui feed">
              <div className="event">
                <div className="label">
                  <img src={`${rootPath}images/junkato.jpg`} />
                </div>
                <div className="content">
                  {richText("外部連携や技術研修生のお問合せは")}
                  <a href={href(`${rootPath}ja/#contact`)}>
                    {richText("メールやソーシャルネットワークサービス")}
                  </a>
                  {richText("で受け付けています。")}
                </div>
              </div>
            </div>
          </div>
          <div className="ui hidden clearing divider"></div>
          {renderCollaborations()}
        </section>
      </SiteLayout>
    </>
  );
}
