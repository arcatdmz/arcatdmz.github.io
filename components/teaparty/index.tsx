import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "react-fomantic-ui";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SiteImage } from "@/site/components/SiteImage";
import { ProjectHeader } from "@/site/components/ContentComponents";
import { type ReactNode } from "react";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";
import { SiteLink } from "@/site/components/SiteLink";
import { href } from "@/site/rendering";

/** Shared page template. Japanese overrides: summary, past-events. */
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

  p = projectsTable["teaparty"];
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
  function renderBody(): ReactNode {
    return (
      <>
        <section>
          <Header as="h2" id={"summary"}>
            {en ? "Summary" : "概要"}
          </Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <>
                  <p>
                    {
                      "アニメ、ゲーム、絵、音楽、小説など、面白いコンテンツを作る・作れる・作りたい人たちと、その活動を応援したい人たちの集まりです。お茶を飲みながらざっくばらんに語ります。カジュアルな勉強会のようなものとお考えください。2012年から、毎年一回程度のペースで開催しています。"
                    }
                  </p>
                  <p>
                    {
                      "目的はいろいろありますが、その一つは、コンテンツ制作・鑑賞支援研究者、コンテンツ制作者、鑑賞者の距離を縮めることです。毎回、立場を超えて交流し、立場を超えて活動していきたいメンタリティの持ち主が集まっています。"
                    }
                  </p>
                  <p>
                    {
                      "業界横断で濃い人たちの参加をお待ちしてます。初対面同士が多いお茶会なので、知り合いが少なくてちょっとひよりそうな人も、物怖じせずご参加ください。ついでに、濃い友達がいたら、ぜひ連れてきてください。"
                    }
                  </p>
                </>
              }
            >
              <p>
                {
                  '"Indescribable tea party" welcomes people who have full of curiosity in wide range of topics relevant to the future of media content, science, and technology. The media content includes but is not limited to: animations, games, illustrations, music, novels, etc.'
                }
              </p>
              <p>
                {
                  "All attendees are expected to provide presentations of varying durations (from 1 min lightning talk to 30 min long presentation) to get to know each other and learn the cutting edge of creating/delivering/enjoying media content."
                }
              </p>
              <p>
                <strong>
                  {
                    "(NOTE: This event has nothing to do with the Tea Party movement!)"
                  }
                </strong>
              </p>
            </LocalizedContent>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"past-events"}>
          <Header as="h2">{en ? "Past Events" : "イベント一覧"}</Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <>
                  <Header as="h3" id={"9"}>
                    {"第9回 2020年2月16日 Wantedly, Inc."}
                  </Header>
                  <p>
                    {
                      "27名が参加し、「創作支援」「DX/PX」「体験設計」「組織」「小噺」「越境」「デザイン」のセッションで発表しました。いつもどおり、おいしいコーヒー、おやつ、ワイン、チーズなどがふるまわれました。"
                    }
                  </p>
                  <Header as="h3" id={"8"}>
                    {"第8回 2019年2月17日 Wantedly, Inc."}
                  </Header>
                  <p>
                    {
                      "29名が参加し、「支える」「作る」「描く」「設計する」「読む・書く」「受肉する」「奏でる」のセッションで発表しました。おいしいコーヒー、紅茶、サブレ、チーズなどがふるまわれました。"
                    }
                  </p>
                  <Header as="h3" id={"7"}>
                    <SiteLink href={href(`${basePath}teaparty/2018`)}>
                      {"第7回 2018年1月18日 Wantedly, Inc."}
                    </SiteLink>
                  </Header>
                  <p>
                    {
                      "32名が参加し、「科学」「技術」そして「語る」「奏でる」「動かす」「描く」のセッションで発表しました。おやつのマカロンが好評だったようです。懇親会の時間を長く取ることができました。発表のバックチャネルとしてSlackチャットを活用しました。"
                    }
                  </p>
                  <Header as="h3" id={"6"}>
                    {"第6回 2017年2月12日 Wantedly, Inc."}
                  </Header>
                  <p>
                    {
                      "36名が参加し、発表セッション「AI & IA」「コンテンツと社会」「スタートアップ」「デザイン」「インタラクション」「やってみた」の他にパネルセッションが開かれました。東大 稲見教授、USP 平澤さん、加藤でコンテンツ創作の未来について議論しました。"
                    }
                  </p>
                  <Header as="h3" id={"5"}>
                    <SiteLink href={href(`${basePath}teaparty/2016`)}>
                      {"第5回 2016年2月13日 Wantedly, Inc."}
                    </SiteLink>
                  </Header>
                  <p>
                    {
                      "30名強の方々にご参加いただきました。「音楽」「動画」「食」「ゲーム」「人文・民俗」「お仕事」「2D・3D・実物体」と、さまざまな科学・技術・コンテンツに関する発表が集まりました。"
                    }
                  </p>
                  <p>
                    <a href={"https://www.wantedly.com/chat"}>
                      {"Wantedlyチャット"}
                    </a>
                    {
                      "を利用して、オフラインの発表と同時並行でオンラインの議論を行いました。また、運営を複数名で行ったおかげで、温かいお茶やコーヒーをサーブでき、懇親会の時間もしっかり取れました。"
                    }
                  </p>
                  <Header as="h3" id={"4"}>
                    <SiteLink href={href(`${basePath}teaparty/2015`)}>
                      {"第4回 2015年1月24日 DMM.make AKIBA BASE"}
                    </SiteLink>
                  </Header>
                  <p>
                    {
                      "例年になく人数が増えたため、話題ごとにセッションとしてまとまりを作りました。クリエータの方々の作品紹介「Creators' Showcase #1, #2」と、テーマごとの「科学・教育」「人・コンピュータ・知能」「ゲーム」「海外動向」「五感に訴えるコンテンツ」「コンテンツ理解・生成」、そして1分自己紹介「Shotgun Session」です。"
                    }
                  </p>
                  <Header as="h3" id={"3"}>
                    {"第3回 2014年3月1日 Lab-Cafe"}
                  </Header>
                  <p>
                    {
                      "2月の開催予定が雪で3月に延期されました。新しい楽器や音楽情報処理の最前線についての講演、携帯端末向けニコニコ動画アプリ、ビリヤードをプロジェクションマッピングで楽しくするプロジェクト、結婚式二次会を盛り上げる余興アプリなど、さまざまな話題で盛り上がりました。"
                    }
                  </p>
                  <p>
                    <Button
                      role="link"
                      as="a"
                      href={"https://www.facebook.com/events/1450857968478857/"}
                      title={"Facebook イベントページ"}
                    >
                      <Icon name="facebook" />
                      {"Facebook"}
                    </Button>
                    {" (参加者とその友達限定公開)"}
                  </p>
                  <Header as="h3" id={"2"}>
                    {"第2回 2013年1月5日 Lab-Cafe"}
                  </Header>
                  <p>
                    {
                      "前線で活躍しているアーティスト色の濃い人だけでなく、それを支援するプログラムの開発技術を持つ人や、制作フロー全体を見るマネジメント寄りの人まで幅広く集まりました。議論だけでなく、新作コンテンツを鑑賞したり、Lab-Cafeに新たに開設された工房を見学したりしました。"
                    }
                  </p>
                  <p>
                    <Button
                      role="link"
                      as="a"
                      href={"https://www.facebook.com/events/452322271501825/"}
                      title={"Facebook イベントページ"}
                    >
                      <Icon name="facebook" />
                      {"Facebook"}
                    </Button>
                    {" (参加者とその友達限定公開)"}
                  </p>
                  <Header as="h3" id={"1"}>
                    {"第1回 2012年1月8日 Lab-Cafe"}
                  </Header>
                  <p>
                    {
                      "初回です。アニメ、ゲーム、Web、Maker、ユーザインタフェース研究辺りの人たちが集まりました。学生が多かったこと、また、アニメ会社の人の要望もあって、オタク文化やユーザインタフェース研究の最近の動向などについて幅広く議論しました。"
                    }
                  </p>
                  <p>
                    <Button
                      role="link"
                      as="a"
                      href={"https://www.facebook.com/events/370600659666614/"}
                      title={"Facebook イベントページ"}
                    >
                      <Icon name="facebook" />
                      {"Facebook"}
                    </Button>
                  </p>
                </>
              }
            >
              <Header as="h3">{"7th Party: 1/28/2018 @ Wantedly, Inc."}</Header>
              <p>
                {
                  "32 people from industry and academia gathered and presented in the organized sessions including Science, Technology, Telling stories, Playing music, Animating creatures, and Drawing illustrations. Slack chat was used for the backchannel of the presentations."
                }
              </p>
              <Header as="h3">{"6th Party: 2/12/2017 @ Wantedly, Inc."}</Header>
              <p>
                {
                  "36 people from industry and academia gathered and presented their work in the following sessions: AI & IA, Media Content and Society, Startups, Design, Interaction, etc. There was also a panel session in which Prof. Inami ("
                }
                <a href={"https://star.rcast.u-tokyo.ac.jp/"}>
                  {"The University of Tokyo"}
                </a>
                {"), Mr. Hirasawa ("}
                <a href={"https://uspi.jp/"}>{"USP"}</a>
                {
                  "), and Dr. Kato discussed the future of creativity support research and development."
                }
              </p>
              <Header as="h3">{"5th Party: 2/13/2016 @ Wantedly, Inc."}</Header>
              <p>
                {
                  ">30 people attended the event. A variety of presentations relevant to science, technology, and media content were provided, forming the following sessions: Music, Video, Food, Game, Ethnography, Business, 2D/3D/Fabrication, and lightning talks."
                }
              </p>
              <Header as="h3">
                {"4th Party: 1/24/2015 @ DMM.make AKIBA BASE"}
              </Header>
              <p>
                {
                  "Lots of attendees! Organized sessions for the first time: Creators' Showcase #1/#2, Science and Education, Human/Computer/Intelligence, Game, Oversea, Media Content for the Five Senses, Understanding and Creating Content, and the Shotgun Session."
                }
              </p>
              <Header as="h3">
                {"1st - 3rd Parties: 2012-2014 @ Lab-Cafe"}
              </Header>
              <p>
                {
                  "Researchers, engineers, artists, producers, and fans of media content gathered at a cozy Lab-Cafe and provided presentations, getting to know each other and learn the cutting edge of creating media content."
                }
              </p>
            </LocalizedContent>
          </Segment>
        </section>
        <Divider hidden />
      </>
    );
  }
  function renderImages(): ReactNode {
    return (
      <>
        <SiteImage
          ui
          fluid
          src={`${rootPath}teaparty/20160213-5th-teaparty.jpg`}
        />
        <div className="caption">
          {en ? "A photo from the 5th party" : "第5回の模様"}
        </div>
        <Divider hidden />
        <SiteImage
          ui
          fluid
          src={`${rootPath}teaparty/20140301-3rd-teaparty.jpg`}
        />
        <div className="caption">
          {en ? "A photo from the 3rd party" : "第3回の模様"}
        </div>
        <Divider hidden />
        <SiteImage
          ui
          fluid
          src={`${rootPath}teaparty/20130105-2nd-teaparty.jpg`}
        />
        <div className="caption">
          {en ? "A photo from the 2nd party" : "第2回の模様"}
        </div>
        <Divider hidden />
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"teaparty"} />
        <Divider hidden />
        <Grid stackable>
          <Grid.Column width={10}>{renderBody()}</Grid.Column>
          <Grid.Column width={6}>{renderImages()}</Grid.Column>
        </Grid>
      </SiteLayout>
    </>
  );
}
