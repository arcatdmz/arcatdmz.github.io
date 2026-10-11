import { ProjectHeader } from "@/site/components/ContentComponents";
import type { ReactNode } from "react";

import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from teaparty/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath } = data;
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

  p = projectsTable["teaparty"];
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
  function renderBody(): ReactNode {
    return (
      <>
        <section>
          <h2 className="ui header" id={"summary"}>
            {en ? "Summary" : "概要"}
          </h2>
          <div className="ui basic segment">
            <p>
              {
                '"Indescribable tea party" welcomes people who have full of curiosity in wide range of topics relevant to the future of media content, science, and technology. The media content includes but is not limited to: animations, games, illustrations, music, novels, etc.'
              }
            </p>
            <p>
              {
                "All attendees are expected to provide presentations of varying durations (from 1 min lightning talk to 30 min long presentation) to get to know each other and learn the cutting edge of creating/delivering/enjoying media content."
              }
            </p>
            <p>
              <strong>
                {
                  "(NOTE: This event has nothing to do with the Tea Party movement!)"
                }
              </strong>
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"past-events"}>
          <h2 className="ui header">{en ? "Past Events" : "イベント一覧"}</h2>
          <div className="ui basic segment">
            <h3 className="ui header">
              {"7th Party: 1/28/2018 @ Wantedly, Inc."}
            </h3>
            <p>
              {
                "32 people from industry and academia gathered and presented in the organized sessions including Science, Technology, Telling stories, Playing music, Animating creatures, and Drawing illustrations. Slack chat was used for the backchannel of the presentations."
              }
            </p>
            <h3 className="ui header">
              {"6th Party: 2/12/2017 @ Wantedly, Inc."}
            </h3>
            <p>
              {
                "36 people from industry and academia gathered and presented their work in the following sessions: AI & IA, Media Content and Society, Startups, Design, Interaction, etc. There was also a panel session in which Prof. Inami ("
              }
              <a href={"https://star.rcast.u-tokyo.ac.jp/"}>
                {"The University of Tokyo"}
              </a>
              {"), Mr. Hirasawa ("}
              <a href={"https://uspi.jp/"}>{"USP"}</a>
              {
                "), and Dr. Kato discussed the future of creativity support research and development."
              }
            </p>
            <h3 className="ui header">
              {"5th Party: 2/13/2016 @ Wantedly, Inc."}
            </h3>
            <p>
              {
                ">30 people attended the event. A variety of presentations relevant to science, technology, and media content were provided, forming the following sessions: Music, Video, Food, Game, Ethnography, Business, 2D/3D/Fabrication, and lightning talks."
              }
            </p>
            <h3 className="ui header">
              {"4th Party: 1/24/2015 @ DMM.make AKIBA BASE"}
            </h3>
            <p>
              {
                "Lots of attendees! Organized sessions for the first time: Creators' Showcase #1/#2, Science and Education, Human/Computer/Intelligence, Game, Oversea, Media Content for the Five Senses, Understanding and Creating Content, and the Shotgun Session."
              }
            </p>
            <h3 className="ui header">
              {"1st - 3rd Parties: 2012-2014 @ Lab-Cafe"}
            </h3>
            <p>
              {
                "Researchers, engineers, artists, producers, and fans of media content gathered at a cozy Lab-Cafe and provided presentations, getting to know each other and learn the cutting edge of creating media content."
              }
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderImages(): ReactNode {
    return (
      <>
        <img
          className="ui fluid image"
          src={`${rootPath}teaparty/20160213-5th-teaparty.jpg`}
        />
        <div className="caption">
          {en ? "A photo from the 5th party" : "第5回の模様"}
        </div>
        <div className="ui hidden divider"></div>
        <img
          className="ui fluid image"
          src={`${rootPath}teaparty/20140301-3rd-teaparty.jpg`}
        />
        <div className="caption">
          {en ? "A photo from the 3rd party" : "第3回の模様"}
        </div>
        <div className="ui hidden divider"></div>
        <img
          className="ui fluid image"
          src={`${rootPath}teaparty/20130105-2nd-teaparty.jpg`}
        />
        <div className="caption">
          {en ? "A photo from the 2nd party" : "第2回の模様"}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"teaparty"} />
        <div className="ui hidden divider"></div>
        <div className="ui stackable grid">
          <div className="ten wide column">{renderBody()}</div>
          <div className="six wide column">{renderImages()}</div>
        </div>
      </SiteLayout>
    </>
  );
}
