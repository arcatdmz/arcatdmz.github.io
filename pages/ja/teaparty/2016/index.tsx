import {
  Breadcrumb,
  BreadcrumbSection,
  Divider,
  Grid,
  GridColumn,
  Header,
  Icon,
  Label,
  List,
  ListItem,
  Segment,
} from "react-fomantic-ui";

import { SiteImage } from "@/site/components/SiteImage";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

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

/** React page migrated from ja/teaparty/2016/index.pug; edit this TSX source directly. */
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
  title = "第5回 名状しがたいお茶会";
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
  function renderDetails(): ReactNode {
    return (
      <>
        <section id={"details"}>
          <Header as="h2">{"時と場所"}</Header>
          <Segment basic>
            <p>
              {"2016年2月13日 10時30分より、Wantedlyオフィスで開催されます。"}
            </p>
            <p>
              {
                "Wantedlyオフィスは休日のため、通常の入り口が閉まっています。開場時間近辺はスタッフがいますが、もし遅れる場合は"
              }
              <a href={"https://twitter.com/arcatdmz"}>{"@arcatdmz"}</a>
              {"宛てにツイートするなどして中の人にご連絡ください。"}
            </p>
            <iframe
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.5143207781284!2d139.71998831621383!3d35.63969798020414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35441d89d7421c9f%3A0xd7cd585ac9104934!2z44Km44Kp44Oz44OG44OD44OJ44Oq44O85qCq5byP5Lya56S-!5e0!3m2!1sen!2sjp!4v1482565394883"
              }
              width={"100%"}
              height={"450"}
              frameBorder={"0"}
              style={{ border: "0" }}
              allowFullScreen={true}
            ></iframe>
          </Segment>
          <Header as="h2">{"参加費"}</Header>
          <Segment basic>
            <p>
              {"学生"}
              <strong>{"1000"}</strong>
              {"円、社会人"}
              <strong>{"2500"}</strong>
              {
                "円を予定しています。17時半までお菓子とお茶が出るほか、18-19時半まで夕飯とアルコールを含む飲み物が手配されています。"
              }
            </p>
          </Segment>
          <Header as="h2">{"その他"}</Header>
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
        </section>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <Breadcrumb>
          <BreadcrumbSection as={SiteLink} href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </BreadcrumbSection>
          <Icon name="angle right" className="divider" />
          <BreadcrumbSection active>{"第5回 (2016)"}</BreadcrumbSection>
        </Breadcrumb>
        <Divider />
        <section>
          <Header as="h1">{"第5回 名状しがたいお茶会"}</Header>
          <List divided horizontal>
            <ListItem>
              <Label basic size="tiny" as="span">
                <Icon name="calendar" />
                {"2016/2/13"}
              </Label>
            </ListItem>
          </List>
        </section>
        <Divider hidden />
        <section id={"summary"}>
          <Segment basic>
            <p>
              {
                "名状しがたいお茶会へようこそ！一年に一度のお茶会も、早いものでもう5回目です。今年から複数名で運営タスクにあたっています。お茶会らしく温かい飲み物も出ます。会場は"
              }
              <a href={"https://www.wantedly.com/"}>{"Wantedly"}</a>
              {"さんにご提供いただき、"}
              <a href={"https://m.wantedly.com/"}>{"Wantedlyチャット"}</a>
              {
                "を使ってお茶会関連の議論を深める試みも始めました。濃ゆい一日をぜひ楽しんでいただければと思います。"
              }
            </p>
          </Segment>
        </section>
        <Divider hidden />
        <Grid stackable columns={2}>
          <GridColumn>
            <section id={"timetable"}>
              <Header as="h2">{"タイムテーブル"}</Header>
              <Segment basic>
                <iframe
                  src={
                    "https://docs.google.com/spreadsheets/d/1We0tN3pxXJ1Wbh30mpEPgec5GD8fDA5WC-De8OsAsqU/pubhtml?gid=1669616252&single=true&widget=true&headers=false"
                  }
                  style={{ width: "100%", height: "640px" }}
                ></iframe>
              </Segment>
            </section>
            <Divider hidden />
            {renderDetails()}
          </GridColumn>
          <GridColumn>
            <section id={"photos"}>
              <Header as="h2">{"当日の様子"}</Header>
              <Segment basic>
                <SiteImage ui fluid src={"DSC09983.jpg"} />
                <div className="caption">{"開場前"}</div>
                <Divider hidden />
                <SiteImage ui fluid src={"DSC09990.jpg"} />
                <div className="caption">{"質疑"}</div>
                <Divider hidden />
                <SiteImage
                  ui
                  fluid
                  src={"73dfe990-b51f-4517-b0ef-78715e98b2fd.jpg"}
                />
                <div className="caption">{"名札"}</div>
                <Divider hidden />
                <SiteImage ui fluid src={"DSC09993.jpg"} />
                <div className="caption">{"突発ゲーム会"}</div>
                <Divider hidden />
              </Segment>
            </section>
          </GridColumn>
        </Grid>
        <Divider />
        <Breadcrumb>
          <BreadcrumbSection as={SiteLink} href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </BreadcrumbSection>
          <Icon name="angle right" className="divider" />
          <BreadcrumbSection active>{"第5回 (2016)"}</BreadcrumbSection>
        </Breadcrumb>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/teaparty/2016/", { projects: ["teaparty"] }),
      },
      "/ja/teaparty/2016/",
    ),
  };
}
