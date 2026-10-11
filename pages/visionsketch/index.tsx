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

/** React page migrated from visionsketch/index.pug; edit this TSX source directly. */
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

  p = projectsTable["visionsketch"];
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
        <ProjectHeader project={"visionsketch"} />
        <div className="ui message">
          {"Source code is available on "}
          <a href={"https://github.com/arcatdmz/visionsketch/"}>{"GitHub"}</a>
          {"! It works on both Windows and Mac OS X."}
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                'We propose an integrated development environment (IDE) called "VisionSketch", which supports example-centric programming for easily building image processing pipelines.'
              }
            </p>
            <p>
              {
                "With VisionSketch, a programmer is first asked to select the input video. Then, he can start building the pipeline with a visual programming language that provides immediate graphical feedback for algorithms applied to the video. He can also use a text-based editor to create or edit the implementation of each algorithm."
              }
            </p>
            <p>
              {
                "During the development, the pipeline is always ready for execution with a video player-like interface enabling rapid iterative prototyping. In a preliminary user study, VisionSketch was positively received by five programmers, who had prior experience of writing text-based image processing programs and could successfully build interesting applications."
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
                <h3 className="ui header">
                  {"GI 2014 "}
                  {en ? "Demo Video" : "デモ動画"}
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/I6FTOVygHxc"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=I6FTOVygHxc"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {"GI 2014 "}
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
        <section>
          <h2 className="ui header">{"VisionSketch IDE"}</h2>
          <div className="ui stackable two columns grid">
            <div className="column">
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/fig1-overview.jpg`)}
              >
                <img
                  src={`${rootPath}visionsketch/fig1-overview.jpg`}
                  alt={"Overview"}
                />
              </SiteLink>
              <div className="caption">
                {en
                  ? "Overview of the VisionSketch IDE (GI '14)"
                  : "VisionSketch IDEの概観"}
              </div>
              <div className="ui hidden divider"></div>
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/visionsketch-overview.jpg`)}
              >
                <img
                  src={`${rootPath}visionsketch/visionsketch-overview.jpg`}
                  alt={"Overview (original version)"}
                />
              </SiteLink>
              <div className="caption">
                {en
                  ? "Prototype of the VisionSketch IDE (PLDI '13)"
                  : "PLDI '13発表時の初版の概観"}
              </div>
            </div>
            <div className="column">
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/visionsketch-example.jpg`)}
              >
                <img
                  src={`${rootPath}visionsketch/visionsketch-example.jpg`}
                  alt={"Example use case #1: counting grinds"}
                  width={"560"}
                />
              </SiteLink>
              <div className="caption">
                {en
                  ? "An example image processing pipeline"
                  : "構築した画像処理パイプラインの例"}
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"visionsketch"}
          majorPublication={"gi2014-kato-visionsketch"}
        />
      </SiteLayout>
    </>
  );
}
