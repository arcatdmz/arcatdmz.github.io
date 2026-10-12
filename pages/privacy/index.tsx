import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from privacy/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { rootPath } = data;
  const lang: "en" | "ja" = "en";
  const en: boolean = true;
  const basePath = en ? rootPath : rootPath + "ja/";
  const author = en ? "Jun Kato" : "加藤 淳";
  let me: any,
    p: any,
    title: any,
    description: any,
    imageUrl: any,
    bodyClass: any;

  title = en ? "Privacy Policy" : "プライバシーポリシー";
  me = "privacy/";
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
          <h1 className="ui header">
            <i className="envelope open outline icon"></i>
            <div className="content">{title}</div>
          </h1>
          <div className="ui basic segment">
            <h2 className="ui header">{"Google Analytics"}</h2>

            {en ? (
              <>
                <p>
                  {"We use a tool called "}
                  <a href={"//analytics.google.com/analytics/web/"}>
                    {'"Google Analytics"'}
                  </a>
                  {
                    " to collect information about use of this site. Google Analytics collects information such as how often users visit this site, what pages they visit when they do so, and what other sites they used prior to coming to this site. We use the information we get from Google Analytics only to improve this site."
                  }
                </p>

                <p>
                  {
                    "Google Analytics collects only the IP address assigned to you on the date you visit this site, rather than your name or other identifying information. We do not combine the information collected through the use of Google Analytics with personally identifiable information. Although Google Analytics plants a permanent cookie on your web browser to identify you as a unique user the next time you visit this site, the cookie cannot be used by anyone but Google."
                  }
                </p>

                <p>
                  {
                    "Google's ability to use and share information collected by Google Analytics about your visits to this site is restricted by the "
                  }
                  <a href={"//www.google.com/analytics/terms/"}>
                    {"Google Analytics Terms of Use"}
                  </a>
                  {" and the "}
                  <a href={"//www.google.com/privacypolicy.html"}>
                    {"Google Privacy Policy"}
                  </a>
                  {
                    ". You can prevent Google Analytics from recognizing you on return visits to this site by disabling cookies on your browser."
                  }
                </p>
              </>
            ) : (
              <>
                <p>
                  {"このWebサイトの利用方法は "}
                  <a href={"//analytics.google.com/analytics/web/"}>
                    {'"Google Analytics"'}
                  </a>
                  {
                    " というツールによって収集されています。 Google Analytics は、ユーザのWebサイトへの訪問頻度、どのページを訪問したか、どのWebサイトからこのサイトに訪問したか、といった情報を収集しています。このような情報は、このWebサイトをよりよいものにするためにのみ、利用されます。"
                  }
                </p>

                <p>
                  {
                    "Google Analytics はあなたのIPアドレスと訪問日時のみを収集し、名前やその他の個人の特定につながるような情報は収集しません。また、このWebサイトの運営者はそうした情報を他の個人を特定可能な情報と照合しません。 Google Analytics はあなたが次回このWebサイトを訪問したときに同一人物であることを特定できるCookieをWebブラウザに残しますが、このCookieはGoogle以外に利用されることはありません。"
                  }
                </p>

                <p>
                  {
                    "Google が Google Analytics によって収集したあなたについての情報をどう利用し、共有するかは"
                  }
                  <a href={"//www.google.com/analytics/terms/"}>
                    {"Google Analytics の利用規約"}
                  </a>
                  {"と"}
                  <a href={"//www.google.com/privacypolicy.html"}>
                    {"Google のプライバシーポリシー"}
                  </a>
                  {
                    "によって定められています。WebブラウザのCookieをオフにすると、あなたが次回このWebサイトを訪問したときに、Google Analytics によって同一人物として特定されないようにできます。"
                  }
                </p>
              </>
            )}
          </div>
        </section>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/privacy/") }, "/privacy/") };
}
