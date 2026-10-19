import { Divider, Grid, Header, Icon, Segment } from "react-fomantic-ui";

import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Both locales inherit the default content. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { rootPath } = data;
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

  title = en ? "Deadlines" : "〆切";
  me = "deadlines/";
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
        <section>
          <Header as="h1">
            <Icon name="hourglass half" />
            {title}
          </Header>
        </section>
        <Divider clearing hidden />
        <section>
          <Header as="h2">{en ? "Active Deadlines" : "現在の〆切"}</Header>
          <Segment>
            <Grid stackable divided columns={3}>
              <Grid.Column>
                <Header as="h3">{"ACM CHI 2019"}</Header>
                <Segment basic>
                  <iframe
                    src={
                      "//free.timeanddate.com/countdown/i6begvps/n137/cf12/cm0/cu4/ct0/cs0/ca0/co0/cr0/ss0/cac000/cpc000/pcfff/tcfff/fs120/szw320/szh135/iso2018-09-14T11:59:59/pa10"
                    }
                    {...{ allowtransparency: "true" }}
                    frameBorder={"0"}
                    width={"155"}
                    height={"55"}
                  ></iframe>
                </Segment>
                <Segment basic textAlign="right">
                  <a
                    href={
                      "//www.timeanddate.com/countdown/generic?iso=20180914T115959&p0=234&msg=ACM+CHI+submission+deadline&font=cursive"
                    }
                  >
                    {"Show the countdown timer"}
                  </a>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">{"LIVE 2018"}</Header>
                <Segment basic>
                  <iframe
                    src={
                      "//free.timeanddate.com/countdown/i66i8uke/n3399/cf12/cm0/cu4/ct0/cs0/ca0/co0/cr0/ss0/cac000/cpcf00/pct/tcf1d8e7/fs120/szw320/szh135/iso2018-08-17T23:59:59/pa10"
                    }
                    {...{ allowtransparency: "true" }}
                    frameBorder={"0"}
                    width={"155"}
                    height={"55"}
                  ></iframe>
                </Segment>
                <Segment basic textAlign="right">
                  <a
                    href={
                      "//www.timeanddate.com/countdown/generic?iso=20180817T235959&p0=3399&msg=LIVE+submission+deadline&font=cursive"
                    }
                  >
                    {"Show the countdown timer"}
                  </a>
                </Segment>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
          </Segment>
        </section>
        <Divider hidden />
        <section>
          <Header as="h2">{en ? "Past Deadlines" : "過去の〆切"}</Header>
          <Segment>
            <Grid stackable divided columns={3}>
              <Grid.Column>
                <Header as="h3">{"ACM UIST 2018"}</Header>
                <Segment basic>
                  <iframe
                    src={
                      "//free.timeanddate.com/countdown/i66i8uke/n234/cf12/cm0/cu4/ct0/cs0/ca0/co0/cr0/ss0/cac000/cpcf00/pct/tcf1d8e7/fs120/szw320/szh135/iso2018-04-05T17:00:00/pa10"
                    }
                    {...{ allowtransparency: "true" }}
                    frameBorder={"0"}
                    width={"155"}
                    height={"55"}
                  ></iframe>
                </Segment>
                <Segment basic textAlign="right">
                  <a
                    href={
                      "//www.timeanddate.com/countdown/generic?iso=20180405T17&p0=234&msg=ACM+UIST+submission+deadline&font=cursive"
                    }
                  >
                    {"Show the countdown timer"}
                  </a>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">{"ACM MM 2018"}</Header>
                <Segment basic>
                  <iframe
                    src={
                      "//free.timeanddate.com/countdown/i66i8uke/n234/cf12/cm0/cu4/ct0/cs0/ca0/co0/cr0/ss0/cac000/cpcf00/pct/tcf1d8e7/fs120/szw320/szh135/iso2018-04-08T23:59:59/pa10"
                    }
                    {...{ allowtransparency: "true" }}
                    frameBorder={"0"}
                    width={"155"}
                    height={"55"}
                  ></iframe>
                </Segment>
                <Segment basic textAlign="right">
                  <a
                    href={
                      "//www.timeanddate.com/countdown/generic?iso=20180408T235959&p0=234&msg=ACM+Multimedia+submission+deadline&font=cursive"
                    }
                  >
                    {"Show the countdown timer"}
                  </a>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">{"IEEE VL/HCC 2018"}</Header>
                <Segment basic>
                  <iframe
                    src={
                      "//free.timeanddate.com/countdown/i66i8uke/n3399/cf12/cm0/cu4/ct0/cs0/ca0/co0/cr0/ss0/cac000/cpcf00/pct/tcf1d8e7/fs120/szw320/szh135/iso2018-04-27T23:59:59/pa10"
                    }
                    {...{ allowtransparency: "true" }}
                    frameBorder={"0"}
                    width={"155"}
                    height={"55"}
                  ></iframe>
                </Segment>
                <Segment basic textAlign="right">
                  <a
                    href={
                      "//www.timeanddate.com/countdown/generic?iso=20180427T235959&p0=3399&msg=IEEE+VL/HCC+submission+deadline&font=cursive"
                    }
                  >
                    {"Show the countdown timer"}
                  </a>
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
        </section>
      </SiteLayout>
    </>
  );
}
