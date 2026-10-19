import {
  Breadcrumb,
  Divider,
  Header,
  Icon,
  Label,
  List,
  Segment,
} from "react-fomantic-ui";

import { SiteLink } from "@/site/components/SiteLink";

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

/** React page migrated from ja/teaparty/2018/index.pug; edit this TSX source directly. */
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
  title = "第7回 名状しがたいお茶会";
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
          <Breadcrumb.Section as={SiteLink} href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </Breadcrumb.Section>
          <Icon name="angle right" className="divider" />
          <Breadcrumb.Section active>{"第7回 (2018)"}</Breadcrumb.Section>
        </Breadcrumb>
        <Divider />
        <section>
          <Header as="h1">{"第7回 名状しがたいお茶会"}</Header>
          <List divided horizontal>
            <List.Item>
              <Label basic size="tiny" as="span">
                <Icon name="calendar" />
                {"2018/1/28"}
              </Label>
            </List.Item>
          </List>
        </section>
        <Divider hidden />
        <section id={"summary"}>
          <Header as="h2">{"概要"}</Header>
          <Segment basic>
            <p>
              {
                "32名が参加し、「科学」「技術」そして「語る」「奏でる」「動かす」「描く」のセッションで発表しました。おやつのマカロンが好評だったようです。懇親会の時間を長く取ることができました。発表のバックチャネルとしてSlackチャットを活用しました。"
              }
            </p>
            <p>
              {"会場は2年前からWantedlyさんにご提供いただいています。様子は"}
              <SiteLink href={href(`${basePath + me}2016`)}>
                {"こちら"}
              </SiteLink>
              {"からご覧ください。"}
            </p>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"timetable"}>
          <Header as="h2">{"タイムテーブル"}</Header>
          <Segment basic>
            <iframe
              src={
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmYZaNWiUzNorraA1ZsFgUT3hDZyZQZmwrfLdoRwRXJfN4Lur1zaWsCu2lRXrDtStn25x-3gQ6eclr/pubhtml?gid=318679183&amp;single=true&amp;widget=true&amp;headers=false"
              }
              style={{ width: "100%", height: "640px" }}
            ></iframe>
          </Segment>
        </section>
        <Divider />
        <Breadcrumb>
          <Breadcrumb.Section as={SiteLink} href={href(basePath + me)}>
            {"名状しがたいお茶会"}
          </Breadcrumb.Section>
          <Icon name="angle right" className="divider" />
          <Breadcrumb.Section active>{"第7回 (2018)"}</Breadcrumb.Section>
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
        pageData: getPageData("/ja/teaparty/2018/", { projects: ["teaparty"] }),
      },
      "/ja/teaparty/2018/",
    ),
  };
}
