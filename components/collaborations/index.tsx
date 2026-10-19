import {
  Button,
  Card,
  Divider,
  Feed,
  Grid,
  Header,
  Icon,
  List,
  Segment,
} from "react-fomantic-ui";
import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SitePopup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { Fragment, type ReactNode } from "react";
import { SiteLink } from "@/site/components/SiteLink";
import { HtmlContent } from "@/site/components/RichText";
import { href, attribute } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: message, popup-menu, collaborations. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { products, rootPath } = data;
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

  title = en ? "Call for collaborations" : "共同研究";
  me = "collaborations/";
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
  function renderCollaborations(): ReactNode {
    return (
      <>
        <Grid stackable>
          <Grid.Column width={8}>
            <LocalizedContent
              ja={
                <>
                  <Header as="h2" id="tech-transfer">
                    <Icon name="gift" />
                    外部連携
                  </Header>
                  <p>
                    これまでに研究開発してきた創造性支援ツール・インタラクティブシステムは、大規模イベントでのライブやプログラミング・コンテスト、アニメ制作の現場、科学館のワークショップや大学院の講義などで活用されてきました。
                  </p>
                  <p>
                    今後もより多くの現場で使われる研究成果を実現していきたいと考えているので、ご協力よろしくお願いいたします。
                  </p>
                  <dl>
                    <dt>
                      <strong>共同研究や招待講演などのお問合せ:</strong>
                    </dt>
                    <dd>
                      <SiteLink href={href(`${rootPath}ja/#contact`)}>
                        連絡先
                      </SiteLink>
                      へメールでご相談ください。
                    </dd>
                    <dt>
                      <strong>学会運営委員などのご依頼:</strong>
                    </dt>
                    <dd>
                      <SiteLink href={href(`${rootPath}ja/#contact`)}>
                        同じ連絡先
                      </SiteLink>
                      で承りますが、
                      <SiteLink href={href(`${rootPath}ja/activities`)}>
                        溢れ気味
                      </SiteLink>
                      でお断りせざるを得ない場合が多いです。
                    </dd>
                    <dt>
                      <strong>技術の利用:</strong>
                    </dt>
                    <dd>
                      <a href="#services">下記のサービス</a>
                      はWeb上でお試しいただけます。教育用途や営利目的で利用されたい場合は、各システムの窓口（
                      <a href="mailto:songle-sync-ml@aist.go.jp">Songle Sync</a>
                      、<a href="mailto:f3js-ml@aist.go.jp">f3.js</a>、
                      <a href="mailto:textalive-ml@aist.go.jp">TextAlive</a>
                      ）へメールでご相談ください。
                    </dd>
                  </dl>
                </>
              }
            >
              <Header as="h2" id="tech-transfer">
                <Icon name="gift" />
                Tech transfer?
              </Header>
              <Header as="h3">Web services</Header>
              <p>
                My recent projects have been published as web services{" "}
                <a href="#services">as shown below</a>. If you want to try using
                the technologies, please visit their websites, preferably with
                modern web browsers.
              </p>
              <Header as="h3">Commercial use</Header>
              <p>
                My past projects of creativity support tools/environments have
                been used in university lectures and in commercial events. If
                you are interested in using them for commercial purpose, contact
                me.
              </p>
              <Header as="h3">Open source projects</Header>
              <p>
                Some of my technologies have been published as open-source
                projects at{" "}
                <a href="https://github.com/arcatdmz">
                  <Icon name="github" />
                  GitHub
                </a>
                . Did you know that even this website is{" "}
                <a href="https://github.com/arcatdmz/arcatdmz.github.io">
                  open-sourced
                </a>
                ?
              </p>
            </LocalizedContent>
            {renderServices()}
          </Grid.Column>
          <Grid.Column width={8}>
            <LocalizedContent
              ja={
                <>
                  <Header as="h2" id="collaborators">
                    <Icon name="users" />
                    リサーチエンジニア・協力研究員
                  </Header>
                  <p>
                    2018年から技術顧問としてアニメの企画開発プロデュース会社である
                    <a href="https://archinc.jp">アーチ株式会社</a>
                    の技術顧問を務めており、小規模ながら研究開発チームがあります。また、主務である
                    <abbr title="産業技術総合研究所">産総研</abbr>
                    でも、協力研究員などのかたちで研究開発に関わってくださる方々を受け入れています。
                  </p>
                  <List>
                    <List.Item>
                      <List.Header>
                        <a href="https://research.archinc.jp/members/">
                          Arch Research
                        </a>
                      </List.Header>
                      <div className="meta">
                        2019/04- アーチ株式会社 研究開発部門
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://baku89.com">橋本 麦</a>
                      </List.Header>
                      <div className="meta">
                        2023/02- <abbr title="産業技術総合研究所">産総研</abbr>{" "}
                        協力研究員
                      </div>
                    </List.Item>
                  </List>
                  <Header as="h2" id="students">
                    <Icon name="student" />
                    学生インターン
                  </Header>
                  <p>
                    主務である
                    <abbr title="産業技術総合研究所">産総研</abbr>
                    では、
                    <abbr title="Human-Computer Interaction">HCI</abbr>
                    分野の研究に興味のある学生を技術研修生として受け入れ、一緒に研究してきました。通常は以下のような内容ですが、期間や場所は応相談です。
                  </p>
                  <dl>
                    <dt>
                      <strong>研究テーマ:</strong>
                    </dt>
                    <dd>
                      自由（一から企画立案して取り組むことを基本とします）
                    </dd>
                    <dt>
                      <strong>立場:</strong>
                    </dt>
                    <dd>技術研修生（履歴書に書くことができます）</dd>
                    <dt>
                      <strong>期間:</strong>
                    </dt>
                    <dd>
                      春休みか夏休みの1-2か月（前後も含め数か月で論文化を目指します）
                    </dd>
                    <dt>
                      <strong>場所:</strong>
                    </dt>
                    <dd>
                      産総研つくば中央第二事業所（他の学生と一緒に泊まり込むことを基本とします）
                    </dd>
                  </dl>
                  <p>
                    モーションキャプチャ、3Dプリンタ、レーザーカッター、切削加工機や電子工作に必要な機材が揃っています。
                  </p>
                  <p>
                    <a href="https://research.archinc.jp">Arch Research</a>
                    で受け入れ可能なこともあるかもしれません。アーチは代々木にオフィスがあります。
                  </p>
                  <Header as="h3">過去の技術研修生</Header>
                  <p>
                    多くの場合、複数の研究員が共同でメンタリングします。加藤が主に担当した学生は名前の前に
                    <Icon name="check circle" />
                    が付いています。
                  </p>
                  <List>
                    <List.Item>
                      <List.Header>山根 壮一、小林 和弘</List.Header>
                      <div className="meta">
                        奈良先端科学技術大学院大学（2014/09-10）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://ryosuzuki.org/">
                          <Icon name="check circle" />
                          鈴木 遼
                        </a>
                      </List.Header>
                      <div className="meta">
                        東京大学大学院 経済学研究科 （2015/02-03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        赤堀 渉、
                        <a href="https://www.komazawa-u.ac.jp/~thirai/">
                          平井 辰典
                        </a>
                      </List.Header>
                      <div className="meta">
                        早稲田大学 先進理工学部（2015/02-03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>吉館 要</List.Header>
                      <div className="meta">
                        筑波大学 情報学群（2015/02-03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://site.kkunihir.com/">加藤 邦拓</a>
                      </List.Header>
                      <div className="meta">
                        明治大学大学院 理工学研究科 （2015/09-10）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <Icon name="check circle" />
                        若林 裕太、
                        <a href="https://github.com/FMS-Cat/">
                          <Icon name="check circle" />
                          小渕 豊
                        </a>
                      </List.Header>
                      <div className="meta">
                        明治大学 総合数理学部（2015/09-10）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="http://pushl.net/">
                          <Icon name="check circle" />
                          今井 朝貴
                        </a>
                      </List.Header>
                      <div className="meta">
                        東京工業大学大学院 情報理工学研究科（2015/09-10）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://scrapbox.io/mactkg-pub/mactkg">
                          <Icon name="check circle" />原 健太
                        </a>
                      </List.Header>
                      <div className="meta">
                        明治大学 総合数理学部（2016/02-03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>若狭 健太</List.Header>
                      <div className="meta">
                        筑波大学 情報学群（2016/08-2016/09）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://iis-lab.org/members/">有賀 竣哉</a>
                      </List.Header>
                      <div className="meta">
                        東京大学 工学系研究科（2016/09-2016/09）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        吉館 要、
                        <a href="https://hiromu.phd">矢倉 大夢</a>
                      </List.Header>
                      <div className="meta">
                        筑波大学 情報学群（2015/04-2017/03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://www.0x0c.me/profile/">
                          <Icon name="check circle" />
                          松田 暁
                        </a>
                      </List.Header>
                      <div className="meta">
                        東京大学大学院 学際情報学府（2017/02-2017/03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://sites.google.com/view/smygw72/home-jp">
                          宮川 翔貴
                        </a>
                      </List.Header>
                      <div className="meta">
                        早稲田大学 先進理工学部（2017/08-2017/09）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://73ch.work/">浪川 洪作</a>
                      </List.Header>
                      <div className="meta">
                        筑波大学 情報学群（2019/10-2021/03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://atarapi.com/">
                          <Icon name="check circle" />新 由衣
                        </a>
                      </List.Header>
                      <div className="meta">
                        筑波大学 情報学群（2020/09-2022/09）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <a href="https://kamiwork.com/">
                          <Icon name="check circle" />
                          村上 貴人
                        </a>
                      </List.Header>
                      <div className="meta">
                        筑波大学 情報学群（2021/05-2025/03）
                      </div>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        <Icon name="check circle" />
                        上村 宙
                      </List.Header>
                      <div className="meta">
                        北海道情報大学 情報メディア学部（2025/08-2025/09）
                      </div>
                    </List.Item>
                  </List>
                  <Header as="h3">その他の学生向け情報</Header>
                  <p>
                    <a href="https://blog.junkato.jp/ja/">ブログ</a>
                    で定期的に情報発信しています。サイドバーに学生向けのおすすめ記事をまとめてあります。
                  </p>
                </>
              }
            >
              <Header as="h2" id="students">
                <Icon name="student" />
                Students?
              </Header>
              <p>
                My primary affiliation (
                <a href="https://www.aist.go.jp/index_en.html">
                  <abbr title="National Institute of Advanced Industrial Science and Technology">
                    AIST
                  </abbr>
                </a>
                ) is in-between academia and industry; it does not take students
                but does allow collaborations with them and sometimes hire them
                as interns. I regularly work with graduate students who are
                interested in Human-Computer Interaction (HCI) and/or
                Programming Experience (PX) research.
              </p>
              <p>
                Also, as of July 2018, I have a secondary affiliation at a
                Japanese animation production company named{" "}
                <a href="https://archinc.jp/en">Arch</a> where I serve as a
                technical advisor. My role there is to help their research and
                development effort in creativity support for the animation
                industry (specifically Japanimation).
              </p>
              <p>
                Please contact me if you want to work with me with regards to
                the aforementioned topics. Keep in mind that, generally
                speaking, the first step toward working with professional
                researchers is often meeting them at academic conferences and
                get them know who you are and what you are doing.
              </p>
              <Header as="h3">Potential ways for collaborations</Header>
              <p>
                If you are living outside Japan, remote collaborations would be
                the easiest. If you have an appropriate visa, it would be
                possible for me to invite you to Tsukuba and work with you for a
                short term (e.g. regular internship programs for domestic
                students last for a month or so).
              </p>
              <p>
                Otherwise, if you are still interested in face-to-face
                collaborations, we could together find visa and funding support.
                My primary affiliation currently has a funding from the{" "}
                <a href="https://www.jst.go.jp/kisoken/cronos/en/overview/index.html">
                  JST CRONOS
                </a>
                /
                <a href="https://www.jst.go.jp/kisoken/crest/en/about/index.html">
                  CREST
                </a>{" "}
                programs and there are also public funding support such as{"  "}
                <a href="https://www.jsps.go.jp/english/e-fellow/e-ippan/index.html">
                  <abbr title="Japan Society for the Promotion of Science">
                    JSPS
                  </abbr>{" "}
                  Postdoctoral Fellowships
                </a>
                /
                <a href="https://www.jsps.go.jp/english/e-fellow/e-summer/">
                  {" "}
                  Summer Program
                </a>
                .
              </p>
            </LocalizedContent>
          </Grid.Column>
        </Grid>
      </>
    );
  }
  function renderServices(): ReactNode {
    return (
      <>
        <Divider id="services" />

        {products.map((p, itemIndex) => (
          <Fragment key={itemIndex}>
            <Card fluid id={attribute(`projects-${p.project}`)}>
              <LinkedImage ui={false} href={href(p.getLink(lang, basePath))}>
                <SiteImage
                  src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`}
                />
              </LinkedImage>
              <Card.Content>
                <Card.Header
                  as={SiteLink}
                  href={href(p.getLink(lang, basePath))}
                >
                  {p.icon ? (
                    <>
                      <SiteImage
                        ui
                        avatar
                        src={`${rootPath}images/icons/${p.icon}`}
                      />
                    </>
                  ) : null}
                  <HtmlContent html={p.getTitle(lang)} />
                </Card.Header>
                <Card.Description>
                  <HtmlContent html={p.getDescription(lang)} />
                </Card.Description>
              </Card.Content>
            </Card>
          </Fragment>
        ))}
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          en ? (
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
                  <List.Item role="link" as="a" href="#tech-transfer">
                    <Icon name="gift" />
                    <List.Content>Tech transfer</List.Content>
                  </List.Item>
                  <List.Item role="link" as="a" href="#students">
                    <Icon name="student" />
                    <List.Content>Students</List.Content>
                  </List.Item>
                </List>
              </SitePopup>
            </>
          ) : (
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
                  <List.Item role="link" as="a" href="#tech-transfer">
                    <Icon name="gift" />
                    <List.Content>外部連携</List.Content>
                  </List.Item>
                  <List.Item role="link" as="a" href="#collaborators">
                    <Icon name="users" />
                    <List.Content>リサーチエンジニア・協力研究員</List.Content>
                  </List.Item>
                  <List.Item role="link" as="a" href="#students">
                    <Icon name="student" />
                    <List.Content>技術研修生</List.Content>
                  </List.Item>
                </List>
              </SitePopup>
            </>
          )
        }
      >
        <section id="collaborations">
          <Header as="h1">
            <Icon name="handshake" />
            <Header.Content>{title}</Header.Content>
          </Header>
          <Segment>
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <SiteImage src={`${rootPath}images/junkato.jpg`} />
                </Feed.Label>
                <Feed.Content>
                  {en
                    ? "Hi! I am open for collaborations with either academia or industry. Please do not hesitate to contact me via "
                    : "外部連携や技術研修生のお問合せは"}
                  <SiteLink
                    href={
                      en
                        ? href(`${rootPath}#contact`)
                        : href(`${rootPath}ja/#contact`)
                    }
                  >
                    {en
                      ? "email or social networking services"
                      : "メールやソーシャルネットワークサービス"}
                  </SiteLink>
                  {en ? "." : "で受け付けています。"}
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
          <Divider clearing hidden />
          {renderCollaborations()}
        </section>
      </SiteLayout>
    </>
  );
}
