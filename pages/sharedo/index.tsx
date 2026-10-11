import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from sharedo/index.pug; edit this TSX source directly. */
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

  return (
    <>
      <SiteLayout context={context}>
        {(() => {
          const children150: ReactNode[] = [];
          children150.push(<>{content.renderProjectHeader("sharedo")}</>);
          children150.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children150.push(
            <>
              <section id={attribute("abstract")}>
                <h2 className="ui header">
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </h2>
                <div className="ui basic segment">
                  <p>
                    {richText(
                      "This paper proposes a to-do list interface for sharing tasks between human and multiple agents including robots and software personal assistants. While much work on software architectures aims to achieve efficient (semi-)autonomous task coordination among human and agents, little work on user interfaces can be found for user-oriented flexible task coordination. Instead, most of the existing human-agent interfaces are designed to command a single agent to handle specific kinds of tasks. Meanwhile, our interface is designed to be a platform to share any kinds of tasks between users and multiple agents. When agents can handle the task, they ask for details and permission to execute it. Otherwise, they try supporting users or just keep silence. New tasks can be registered not only by human but also by agents, when they suffer from errors that can only be recovered by human users.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "We present interaction design and implementation of the interface, Sharedo, with three example agents, followed by brief user feedback collected from a preliminary user study.",
                    )}
                  </p>
                  <p>
                    {richText("The experimental implementation is available at ")}
                    <a href={href("http://www.sharedo.info")}>
                      {richText("http://www.sharedo.info")}
                    </a>
                    {richText(
                      ". You can sign in with your Twitter account and share to-do lists with the shopping agent and the media content agent.",
                    )}
                  </p>
                </div>
              </section>
            </>,
          );
          children150.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children150.push(
            <>
              <section id={attribute("presentations")}>
                <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
                <div className="ui basic segment">
                  <div className="ui stackable two columns grid">
                    <div className="column">
                      <h3 className="ui header">{plainText(en ? "Demo Video" : "デモ動画")}</h3>
                      {content.renderEmbedYoutube("//www.youtube.com/embed/HxEUgOSwTeM")}
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <a href={href("//www.youtube.com/watch?v=HxEUgOSwTeM")}>
                              <i className="youtube icon"></i>
                              {richText("YouTube")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      {(() => {
                        const children151: ReactNode[] = [];
                        children151.push(
                          <>
                            <h3 className="ui header">
                              {richText("HAI 2014 ")}
                              {plainText(en ? "Slides" : "発表スライド")}
                            </h3>
                          </>,
                        );
                        children151.push(
                          <>
                            <div
                              className="ui embed"
                              data-url={publicationsTable[p.publication].entryTags.slides}
                              data-placeholder={`${rootPath}images/background-eee.png`}
                              data-icon={"video play outline"}
                            ></div>
                          </>,
                        );
                        children151.push(
                          <>
                            <div className="caption">
                              <div className="ui horizontal list">
                                <div className="item">
                                  <a href={href(publicationsTable[p.publication].entryTags.slides)}>
                                    <i className="download icon"></i>
                                    {plainText(en ? "Download" : "ダウンロード")}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                        if (!en) {
                          children151.push(
                            <>
                              <p className="caption">
                                {richText("日本語の発表スライドは")}
                                <a href={href("#publications")}>
                                  <i className="book icon"></i>
                                  {richText("発表文献")}
                                </a>
                                {richText("で日本語文献の ")}
                                <i className="sidebar fitted icon"></i>
                                {richText(" をクリックすると閲覧できます。")}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children151);
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            </>,
          );
          if (!en) {
            children150.push(
              <>
                <div className="ui hidden divider"></div>
              </>,
            );
            children150.push(
              <>
                <section id={attribute("vision")}>
                  <h2 className="ui header">{richText("未来ビジョン")}</h2>
                  <div className="ui basic segment"></div>
                </section>
              </>,
            );
          }
          children150.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children150.push(
            <>{content.renderProjectPublications("sharedo", "hai2014-kato-sharedo")}</>,
          );
          return keyed(children150);
        })()}
      </SiteLayout>
    </>
  );
}
