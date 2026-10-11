import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from dejavu/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, publicationsTable, moment, rootPath } = data;
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

  p = projectsTable["dejavu"];
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"dejavu"} />
        <div className="ui message">
          <strong>{"For those interested in this IDE:"}</strong>
          {
            " Unfortunately, there's no short term plan for the distribution. You can still use "
          }
          <a href={"https://msdn.microsoft.com/en-us/library/hh855389.aspx"}>
            {"Kinect Studio"}
          </a>
          {
            " that partially provides similar features (recording and replaying data stream) though without tight integration with the IDE."
          }
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "The increasing popularity of interactive camera-based programs highlights the inadequacies of conventional IDEs in developing these programs given their distinctive attributes and workflows. We present DejaVu, an IDE enhancement that eases the development of these programs by enabling programmers to visually and continuously monitor program data in consistency with the frame-based pipeline of computer-vision programs; and to easily record, review, and reprocess temporal data to iteratively improve the processing of non-reproducible camera input. DejaVu was positively received by three experienced programmers of interactive camera-based programs in our preliminary user trial."
              }
            </p>
            <p>
              {
                "This research was done during my internship at Microsoft Research Asia "
              }
              <a
                href={
                  "https://web.archive.org/web/20120408040100/http://research.microsoft.com/en-us/um/beijing/groups/hci/"
                }
              >
                {"HCI Group"}
              </a>
              {". My mentors were "}
              <a
                href={
                  "https://scholar.google.com/citations?user=XprSyesAAAAJ&hl=en"
                }
              >
                {"Xiang Cao"}
              </a>
              {" and "}
              <a
                href={
                  "https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en"
                }
              >
                {"Sean McDirmid"}
              </a>
              {"."}
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
                <h3 className="ui header">
                  {"UIST 2012 "}
                  {en ? "Demo Video" : "デモ動画"}
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/k5USoB7ZPPk"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=k5USoB7ZPPk"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {"UIST 2012 "}
                  {en ? "Slides" : "発表スライド"}
                </h3>
                <div
                  className="ui embed"
                  data-url={publicationsTable[p.publication].entryTags.slides}
                  data-placeholder={`${rootPath}images/background-eee.png`}
                  data-icon={"video play outline"}
                ></div>
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
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"overview"}>
          <h2 className="ui header">
            {"DejaVu "}
            <abbr title={"Integrated Development Environment"}>{"IDE"}</abbr>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "We added two interlinked components to a general purpose development environment."
              }
            </p>
            <div className="ui stackable two columns grid">
              <div className="six wide column">
                <p>
                  <SiteLink
                    className="ui fluid image"
                    href={href(`${rootPath}dejavu/fig4-canvas.png`)}
                  >
                    <img
                      src={`${rootPath}dejavu/fig4-canvas.png`}
                      alt={"Canvas"}
                      width={"570"}
                    />
                  </SiteLink>
                </p>
                <p>
                  <SiteLink
                    className="ui fluid image"
                    href={href(`${rootPath}dejavu/fig6-timeline.png`)}
                  >
                    <img
                      src={`${rootPath}dejavu/fig6-timeline.png`}
                      alt={"Timeline"}
                      width={"570"}
                    />
                  </SiteLink>
                </p>
              </div>
              <div className="ten wide column">
                <h3 className="ui header">{"Canvas"}</h3>
                <ul>
                  <li>
                    {"Visualizing various variable contents by drag-and-drop"}
                  </li>
                  <li>
                    {
                      "Continuously showing camera input, variable contents, window output"
                    }
                  </li>
                  <li>{"Sketching capability"}</li>
                </ul>
                <h3 className="ui header">{"Timeline"}</h3>
                <ul>
                  <li>
                    {
                      "Auto-recording, replaying (input streams) & refreshing (variables) to handle non-reproducible input"
                    }
                  </li>
                  <li>{"Contents synchronized with canvas"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"dejavu"}
          majorPublication={"uist2012-kato-dejavu"}
        />
      </SiteLayout>
    </>
  );
}
