import { Popup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { Fragment } from "react";

import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { href, attribute } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from collaborations/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { products, rootPath } = data;
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
        <div className="ui stackable grid">
          <div className="eight wide column">
            <h2 className="ui header" id={"tech-transfer"}>
              <i className="gift icon"></i>
              {"Tech transfer?"}
            </h2>
            <h3 className="ui header">{"Web services"}</h3>
            <p>
              {"My recent projects have been published as web services "}
              <a href={"#services"}>{"as shown below"}</a>
              {
                ". If you want to try using the technologies, please visit their websites, preferably with modern web browsers."
              }
            </p>
            <h3 className="ui header">{"Commercial use"}</h3>
            <p>
              {
                "My past projects of creativity support tools/environments have been used in university lectures and in commercial events. If you are interested in using them for commercial purpose, contact me."
              }
            </p>
            <h3 className="ui header">{"Open source projects"}</h3>
            <p>
              {
                "Some of my technologies have been published as open-source projects at "
              }
              <a href={"https://github.com/arcatdmz"}>
                <i className="github icon"></i>
                {"GitHub"}
              </a>
              {". Did you know that even this website is "}
              <a href={"https://github.com/arcatdmz/arcatdmz.github.io"}>
                {"open-sourced"}
              </a>
              {"?"}
            </p>
            {renderServices()}
          </div>
          <div className="eight wide column">
            <h2 className="ui header" id={"students"}>
              <i className="student icon"></i>
              {"Students?"}
            </h2>
            <p>
              {"My primary affiliation ("}
              <a href={"https://www.aist.go.jp/index_en.html"}>
                <abbr
                  title={
                    "National Institute of Advanced Industrial Science and Technology"
                  }
                >
                  {"AIST"}
                </abbr>
              </a>
              {
                ") is in-between academia and industry; it does not take students but does allow collaborations with them and sometimes hire them as interns. I regularly work with graduate students who are interested in Human-Computer Interaction (HCI) and/or Programming Experience (PX) research."
              }
            </p>
            <p>
              {
                "Also, as of July 2018, I have a secondary affiliation at a Japanese animation production company named "
              }
              <a href={"https://archinc.jp/en"}>{"Arch"}</a>
              {
                " where I serve as a technical advisor. My role there is to help their research and development effort in creativity support for the animation industry (specifically Japanimation)."
              }
            </p>
            <p>
              {
                "Please contact me if you want to work with me with regards to the aforementioned topics. Keep in mind that, generally speaking, the first step toward working with professional researchers is often meeting them at academic conferences and get them know who you are and what you are doing."
              }
            </p>
            <h3 className="ui header">{"Potential ways for collaborations"}</h3>
            <p>
              {
                "If you are living outside Japan, remote collaborations would be the easiest. If you have an appropriate visa, it would be possible for me to invite you to Tsukuba and work with you for a short term (e.g. regular internship programs for domestic students last for a month or so)."
              }
            </p>
            <p>
              {
                "Otherwise, if you are still interested in face-to-face collaborations, we could together find visa and funding support. My primary affiliation currently has a funding from the "
              }
              <a
                href={
                  "https://www.jst.go.jp/kisoken/cronos/en/overview/index.html"
                }
              >
                {"JST CRONOS"}
              </a>
              {"/"}
              <a
                href={"https://www.jst.go.jp/kisoken/crest/en/about/index.html"}
              >
                {"CREST"}
              </a>
              {" programs and there are also public funding support such as  "}
              <a
                href={
                  "https://www.jsps.go.jp/english/e-fellow/e-ippan/index.html"
                }
              >
                <abbr title={"Japan Society for the Promotion of Science"}>
                  {"JSPS"}
                </abbr>
                {" Postdoctoral Fellowships"}
              </a>
              {"/"}
              <a href={"https://www.jsps.go.jp/english/e-fellow/e-summer/"}>
                {" Summer Program"}
              </a>
              {"."}
            </p>
          </div>
        </div>
      </>
    );
  }
  function renderServices(): ReactNode {
    return (
      <>
        <div className="ui divider" id={"services"}></div>

        {products.map((p, itemIndex) => (
          <Fragment key={itemIndex}>
            <div
              className="ui fluid card"
              id={attribute(`projects-${p.project}`)}
            >
              <SiteLink
                className="image"
                href={href(p.getLink(lang, basePath))}
              >
                <SiteImage
                  src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`}
                />
              </SiteLink>
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(p.getLink(lang, basePath))}
                >
                  {p.icon ? (
                    <>
                      <SiteImage
                        className="ui avatar image"
                        src={`${rootPath}images/icons/${p.icon}`}
                      />
                    </>
                  ) : null}
                  <HtmlContent html={p.getTitle(lang)} />
                </SiteLink>
                <div className="description">
                  <HtmlContent html={p.getDescription(lang)} />
                </div>
              </div>
            </div>
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
          <>
            <Popup className="ui hidden popup-menu popup" position="top left" trigger={<a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>}>
              <div className="ui divided list">
                <a className="item" href={"#tech-transfer"}>
                  <i className="gift icon"></i>
                  <div className="content">{"Tech transfer"}</div>
                </a>
                <a className="item" href={"#students"}>
                  <i className="student icon"></i>
                  <div className="content">{"Students"}</div>
                </a>
              </div>
            </Popup>
          </>
        }
      >
        <section id={"collaborations"}>
          <h1 className="ui header">
            <i className="handshake icon"></i>
            <div className="content">{title}</div>
          </h1>
          <div className="ui segment">
            <div className="ui feed">
              <div className="event">
                <div className="label">
                  <SiteImage src={`${rootPath}images/junkato.jpg`} />
                </div>
                <div className="content">
                  {
                    "Hi! I am open for collaborations with either academia or industry. Please do not hesitate to contact me via "
                  }
                  <SiteLink href={href(`${rootPath}#contact`)}>
                    {"email or social networking services"}
                  </SiteLink>
                  {"."}
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

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/collaborations/") }, "/collaborations/") };
}
