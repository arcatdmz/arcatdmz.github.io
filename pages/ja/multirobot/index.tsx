import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/multirobot/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath } = data;
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

  p = projectsTable["multirobot"];
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
        <div className="ui basic segment">
          <p>
            {
              "ロボットに複雑なタスクをさせる場合、ユーザはまずロボットにすべきことを指示する。自律動作してタスクをこなすロボットでも、初めに指示を出すことが求められる。このため、ロボットの操作および教示インタフェースが必要とされている。この目的には、一般的に自然言語、ジョイスティックやその他のポインティングデバイスが用いられている。しかし、これらのインタフェースでは特に複数台のロボットを同時に操作することが困難である。"
            }
          </p>
          <p>
            {
              "この不便を解消するため、我々は、複数台の移動型ロボットを操作するマルチタッチインタフェースを開発した。本インタフェースでは、ユーザが手でグローバルなベクトル場を編集すると、全てのロボットがそのベクトル場に従って動く。"
            }
          </p>
          <p>
            {"本研究は卒業研究の一環として遂行され、CHI 2009"}
            <a href={"https://src.acm.org/winners/2010"}>
              {"Student Research Competition"}
            </a>
            {"において一位を獲得した。"}
          </p>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderInteraction(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {en
            ? "Multi-touch Vector Field Operation"
            : "ベクトル場を用いた複数ロボットの同時操作"}
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "天井から見た俯瞰ビュー上で、マルチタッチディスプレイに触れている手の面の動きがベクトル場を生成する。画面内にあるすべてのロボットが、生成されたベクトル場に沿って動く。ユーザは以下の3つの操作モードでロボットの動きを制御できる。これらの操作モードを切り替えるための特別な操作が必要ないことに注意されたい。"
            }
          </p>
          <dl>
            <dt>
              <strong>{"Drag"}</strong>
            </dt>
            <dd>
              {
                "ユーザがディスプレイに手を触れて動かすと、ベクトル場上に仮想的な流れができ、ロボットがその流れに沿って動く。"
              }
            </dd>
            <dt>
              <strong>{"Mix"}</strong>
            </dt>
            <dd>
              {
                "ユーザが既存の流れ場の上で手を動かすと、その手の動きによって生成されるベクトルと既存のベクトルが合計され、新しい流れ場ができる。"
              }
            </dd>
            <dt>
              <strong>{"Hold"}</strong>
            </dt>
            <dd>
              {
                "ユーザがディスプレイに手を触れて制止させたままにすると、手の下のベクトル場がリセットされる。これにより、ロボットを停止させることができる。"
              }
            </dd>
          </dl>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderVideos(): ReactNode {
    return (
      <>
        <EmbedYoutube src={"//www.youtube.com/embed/zGioJvhsoIY"} />
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
          href={href(`${rootPath}multirobot/operations.png`)}
        >
          <img src={`${rootPath}multirobot/operations.png`} />
        </SiteLink>
        <div className="caption">
          {en ? "Three operation modes" : "3つの操作モード"}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"multirobot"} />
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <section id={"abstract"}>{renderAbstract()}</section>
            <section id={"interaction"}>{renderInteraction()}</section>
          </div>
          <div className="column">
            <section id={"videos"}>{renderVideos()}</section>
          </div>
        </div>
        <ProjectPublications
          project={"multirobot"}
          majorPublication={"chi2009-kato-multirobot"}
        />
      </SiteLayout>
    </>
  );
}
