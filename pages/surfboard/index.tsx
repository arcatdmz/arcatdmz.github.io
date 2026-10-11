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

/** React page migrated from surfboard/index.pug; edit this TSX source directly. */
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

  p = projectsTable["surfboard"];
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
        <ProjectHeader project={"surfboard"} />
        <div className="ui message">
          {"Surfboard is open-sourced at "}
          <a href={"https://github.com/arcatdmz/surfboard"}>{"GitHub"}</a>
          {"."}
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
          <div className="ui basic segment">
            <p>
              {
                'We introduce a technique to detect simple gestures of "surfing" (moving a hand horizontally) on a standard keyboard by analyzing recorded sounds in real-time with a microphone attached close to the keyboard. This technique allows the user to maintain a focus on the screen while surfing on the keyboard. Since this technique uses a standard keyboard without any modification, the user can take full advantage of the input functionality and tactile quality of his favorite keyboard supplemented with our interface.'
              }
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <section id={"gestures"}>
              <h2 className="ui header">
                {en ? "Recognizable gestures" : "検出可能なジェスチャ"}
              </h2>
              <div className="ui basic segment">
                <p>
                  {
                    "Surfboard can recognize whether the user is surfing on a keyboard or not. When the user surfs on a keyboard, it can distinguish left to right or right to left surfing directions."
                  }
                </p>
                <p>
                  {
                    "We have not yet tested other motions like drawing circle or more complex shapes because they would be difficult to execute on a keyboard which is generally horizontally long."
                  }
                </p>
              </div>
            </section>
            <div className="ui hidden divider"></div>
            <section id={"hardware"}>
              <h2 className="ui header">
                {en ? "Supported hardware" : "対応ハードウェア"}
              </h2>
              <div className="ui basic segment">
                <p>
                  {
                    "Our prototype implementation uses a monaural microphone attached close to the keyboard of a personal computer. It needs to be attached near the right or left edge of the keyboard to distinguish surfing direction effectively. "
                  }
                </p>
                <p>
                  {
                    "Fortunately at present, many laptop computers are equipped with a microphone, and we confirmed that Surfboard works at a quiet office and a noisy cafeteria with built-in microphones that are located at several different positions."
                  }
                </p>
              </div>
            </section>
            <div className="ui hidden divider"></div>
          </div>
          <div className="column">
            <EmbedYoutube src={"//www.youtube.com/embed/QKtzsOU-sA8"} />
            <div className="caption">
              <div className="ui horizontal list">
                <div className="item">
                  <a href={"//www.youtube.com/watch?v=QKtzsOU-sA8"}>
                    <i className="youtube icon"></i>
                    {"YouTube"}
                  </a>
                </div>
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <SiteLink
              className="ui fluid image"
              href={href(`${rootPath}surfboard/fig2-microphones.jpg`)}
            >
              <img src={`${rootPath}surfboard/fig2-microphones.jpg`} />
            </SiteLink>
            <div className="caption">
              {en
                ? "Microphones attached close to keyboards"
                : "キーボードの近くに設置されたマイク"}
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"surfboard"}
          majorPublication={"uist2010-kato-surfboard"}
        />
      </SiteLayout>
    </>
  );
}
