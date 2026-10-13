import { Embed } from "@/site/components/SiteWidgets";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from sharedo/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
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

  p = projectsTable["sharedo"];
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"sharedo"} />

        <div className="ui hidden divider"></div>

        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "This paper proposes a to-do list interface for sharing tasks between human and multiple agents including robots and software personal assistants. While much work on software architectures aims to achieve efficient (semi-)autonomous task coordination among human and agents, little work on user interfaces can be found for user-oriented flexible task coordination. Instead, most of the existing human-agent interfaces are designed to command a single agent to handle specific kinds of tasks. Meanwhile, our interface is designed to be a platform to share any kinds of tasks between users and multiple agents. When agents can handle the task, they ask for details and permission to execute it. Otherwise, they try supporting users or just keep silence. New tasks can be registered not only by human but also by agents, when they suffer from errors that can only be recovered by human users."
              }
            </p>
            <p>
              {
                "We present interaction design and implementation of the interface, Sharedo, with three example agents, followed by brief user feedback collected from a preliminary user study."
              }
            </p>
            <p>
              {"The experimental implementation is available at "}
              <a href={"http://www.sharedo.info"}>
                {"http://www.sharedo.info"}
              </a>
              {
                ". You can sign in with your Twitter account and share to-do lists with the shopping agent and the media content agent."
              }
            </p>
          </div>
        </section>

        <div className="ui hidden divider"></div>

        <section id={"presentations"}>
          <h2 className="ui header">
            {en ? "Presentation materials" : "発表内容"}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">{en ? "Demo Video" : "デモ動画"}</h3>
                <EmbedYoutube src={"//www.youtube.com/embed/HxEUgOSwTeM"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=HxEUgOSwTeM"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {"HAI 2014 "}
                  {en ? "Slides" : "発表スライド"}
                </h3>

                <Embed
                  className="ui embed"
                  data-url={publicationsTable[p.publication].entryTags.slides}
                  data-placeholder={`${rootPath}images/background-eee.png`}
                  data-icon={"video play outline"}
                ></Embed>

                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <SiteLink
                        href={href(
                          publicationsTable[p.publication].entryTags.slides,
                        )}
                      >
                        <i className="download icon"></i>
                        {en ? "Download" : "ダウンロード"}
                      </SiteLink>
                    </div>
                  </div>
                </div>

                {!en ? (
                  <>
                    <p className="caption">
                      {"日本語の発表スライドは"}
                      <a href={"#publications"}>
                        <i className="book icon"></i>
                        {"発表文献"}
                      </a>
                      {"で日本語文献の "}
                      <i className="sidebar fitted icon"></i>
                      {" をクリックすると閲覧できます。"}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {!en ? (
          <>
            <div className="ui hidden divider"></div>

            <section id={"vision"}>
              <h2 className="ui header">{"未来ビジョン"}</h2>
              <div className="ui basic segment"></div>
            </section>
          </>
        ) : null}

        <div className="ui hidden divider"></div>

        <ProjectPublications
          project={"sharedo"}
          majorPublication={"hai2014-kato-sharedo"}
        />
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/sharedo/", {"projects": ["sharedo"], "publications": ["hai2014-kato-sharedo"], "publicationProjects": ["sharedo"]}) }, "/sharedo/") };
}
