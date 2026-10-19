import {
  Breadcrumb,
  BreadcrumbSection,
  Divider,
  Header,
  Icon,
  Label,
  List,
  ListItem,
  Segment,
} from "react-fomantic-ui";

import { SiteLink } from "@/site/components/SiteLink";
import { DeferredScript } from "@/site/components/DeferredScript";

import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/teaparty/2015/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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

  p = projectsTable["teaparty"];
  title = "第4回 名状しがたいお茶会";
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
        <Breadcrumb>
          <BreadcrumbSection as={SiteLink} href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </BreadcrumbSection>
          <Icon name="angle right" className="divider" />
          <BreadcrumbSection active>{"第4回 (2015)"}</BreadcrumbSection>
        </Breadcrumb>
        <Divider />
        <section>
          <Header as="h1">{"第4回 名状しがたいお茶会"}</Header>
          <List divided horizontal>
            <ListItem>
              <Label basic size="tiny" as="span">
                <Icon name="calendar" />
                {"2015/1/24"}
              </Label>
            </ListItem>
          </List>
        </section>
        <Divider hidden />
        <section id={"summary"}>
          <Segment basic>
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
            <p>
              {
                "今年の開催内容について、詳しくはFacebookのイベントページをご覧ください。"
              }
            </p>
            <List horizontal>
              <ListItem>
                <a
                  href={"https://www.facebook.com/events/873913542653717/"}
                  title={"Facebook イベントページ"}
                >
                  <Icon name="facebook" />
                  {"Facebook"}
                </a>
              </ListItem>
              <ListItem>
                <a
                  href={
                    "https://docs.google.com/forms/d/1xUDrcGYtj45wCRggYmnZGlljlsemq7DMZbj6oHJdZq8/viewform"
                  }
                >
                  <Icon name="google" />
                  {"事後アンケート"}
                </a>
              </ListItem>
            </List>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"timetable"}>
          <Header as="h2">{"タイムテーブル"}</Header>
          <Segment basic>
            <p>
              {
                "例年になく人数が増えたため、話題ごとにセッションとしてまとまりを作りました。クリエータの方々の作品紹介「"
              }
              <b>{"Creators' Showcase #1, #2"}</b>
              {"」と、テーマごとの「"}
              <b>{"科学・教育"}</b>
              {"」「"}
              <b>{"人・コンピュータ・知能"}</b>
              {"」「"}
              <b>{"ゲーム"}</b>
              {"」「"}
              <b>{"海外動向"}</b>
              {"」「"}
              <b>{"五感に訴えるコンテンツ"}</b>
              {"」「"}
              <b>{"コンテンツ理解・生成"}</b>
              {"」、そして1分自己紹介「"}
              <b>{"Shotgun Session"}</b>
              {"」です。"}
            </p>
            <p>
              {"計"}
              <b>{"9"}</b>
              {"セッション、"}
              <b>{"7時間"}</b>
              {
                "に及ぶ発表と議論からなる欲張りなタイムテーブルです。頭をフル回転させ、全速力でお楽しみください。"
              }
            </p>
            <iframe
              src={
                "https://docs.google.com/spreadsheets/d/1FqBKPyTiFDegmcOIcpRNEujx9yga4crkXvjVKMxsf9Y/pubhtml?gid=1689693383&single=true&widget=true&headers=false"
              }
              style={{ width: "100%", height: "400px" }}
            ></iframe>
            <Divider hidden />
          </Segment>
        </section>
        <section id={"details"}>
          <Header as="h2">{"時と場所"}</Header>
          <Segment basic>
            <p>
              {"2015年1月24日 13時より、DMM.make AKIBA BASEで開催されます。"}
            </p>
            <p>
              {
                "DMM.make AKIBA BASEは入り口にセキュリティゲートがあります。開場時間近辺はスタッフの方が開けてくださいますが、もし遅れる場合は"
              }
              <a href={"https://twitter.com/arcatdmz"}>{"@arcatdmz"}</a>
              {
                "または #teaparty2015 でツイートするなどして中の人にご連絡ください。"
              }
            </p>
          </Segment>
          <div id={"map-canvas"}></div>
          <Header as="h2">{"設備"}</Header>
          <Segment basic>
            <p>
              {
                "電源、電源タップ、Wi-Fiがあります。ただ、Wi-Fiは多人数で同時接続すると不安定になることがあるため、インターネット接続が必須の方はご自身で用意していただくようおお願いします。"
              }
            </p>
            <p>
              {
                "プロジェクタは解像度1280x720ピクセル(16:9)で、HDMI、mini DisplayPort、VGA接続が可能です。"
              }
            </p>
          </Segment>
          <Header as="h2">{"参加費"}</Header>
          <Segment basic>
            <p>
              {"学生"}
              <b>{"1000"}</b>
              {"円、社会人"}
              <b>{"2500"}</b>
              {
                "円を予定しています。13-18時までお菓子とお茶が出るほか、18-20時まで夕飯とドリンクのケータリングが手配されています。"
              }
            </p>
          </Segment>
          <Header as="h2">
            {"Togetter"}
            <Segment basic className="togetter">
              <DeferredScript
                src={"//togetter.com/js/parts.js"}
                dangerouslySetInnerHTML={{ __html: "" }}
              />
              <DeferredScript
                dangerouslySetInnerHTML={{
                  __html:
                    "if (typeof tgtr !== 'undefined') tgtr.ExtendWidget({id:'774222',url:'https://togetter.com/'});",
                }}
              />
            </Segment>
          </Header>
        </section>
        <Divider />
        <Breadcrumb>
          <BreadcrumbSection as={SiteLink} href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </BreadcrumbSection>
          <Icon name="angle right" className="divider" />
          <BreadcrumbSection active>{"第4回 (2015)"}</BreadcrumbSection>
        </Breadcrumb>
      </SiteLayout>
      <DeferredScript
        type={"text/javascript"}
        src={"//maps.googleapis.com/maps/api/js?v=3.exp"}
        dangerouslySetInnerHTML={{ __html: "" }}
      />
      <DeferredScript
        dangerouslySetInnerHTML={{
          __html:
            "function initializeMap(){\n  if (typeof google === 'undefined' || !google.maps) return;\n  var latlng = new google.maps.LatLng(35.700514, 139.774166)\n  var mapOptions = {\n    zoom: 15,\n    center: latlng\n  };\n  map = new google.maps.Map(document.getElementById('map-canvas'),\n  mapOptions);\n  var marker = new google.maps.Marker({\n  position: latlng,\n  map: map,\n  title: 'DMM.make AKIBA'\n  });\n}\nif (document.readyState === 'complete') initializeMap();\nelse window.addEventListener('load', initializeMap, { once: true });",
        }}
      />
    </>
  );
}

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/teaparty/2015/", { projects: ["teaparty"] }),
      },
      "/ja/teaparty/2015/",
    ),
  };
}
