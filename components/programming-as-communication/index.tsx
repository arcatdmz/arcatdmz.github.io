import { LocalizedContent } from "@/site/components/LocalizedContent";
import { Embed } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { keyed, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract, presentation-description, technical-effort, social-effort, news. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath, protocol, domain } = data;
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

  p = projectsTable["programming-as-communication"];
  title = "Programming as Communication";
  description =
    "Throughout this work, we investigate how to make programming activities more inclusive and collaborative, involving people with diverse technical backgrounds. A programming environment does not need to be only for programmers. We consider that it should instead be designed for users with diverse technical backgrounds.";
  imageUrl = `${protocol}://${domain}${rootPath}images/panels/programming-as-communication.png`;
  me = "programming-as-communication/";
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Summary" : "概要"}</h2>
        <div className="ui basic segment">
          <LocalizedContent
            ja={
              <>
                <p>
                  {
                    "コンピュータが人々の生活にも仕事にも溶け込み、プログラミングはこれまで以上に身近で、複雑な事象を扱うようになった。そこで、"
                  }
                  <SiteLink href={href(`${basePath}programming-with-examples`)}>
                    {"プログラミングの方法を根本的に改善する"}
                  </SiteLink>
                  {
                    "必要がある。既存研究は多くの場合、特定の技術的背景を持った人々（"
                  }
                  <SiteLink href={href(`${basePath}live-programming`)}>
                    {"プログラマ"}
                  </SiteLink>
                  {
                    ", エンドユーザ, データサイエンティストなど）にとってのプログラミング体験を向上することで問題の解決を図ってきた。"
                  }
                </p>
                <p>
                  {
                    "一方、本研究はプログラミングを、多様な技術的背景を持った人々を伴った、よりインクルーシブで協調的な行為にすることを目指す。「プログラミング環境」は必ずしも「プログラマ」のためだけの環境である必要はない。本研究はそうした環境を、多様な人々を受け止められるように設計することを目指す。"
                  }
                </p>
                <p>
                  {
                    "そうしたインクルーシブな環境において、人々はプログラミングを通してコミュニケーションを取り、全ての人々がプログラミングの便益を享受でき、ひいてはエンパワーメントを高められると考えている。"
                  }
                </p>
              </>
            }
          >
            <p>
              {
                "Computers have become ubiquitous in our life and work, and the way they are programmed needs "
              }
              <SiteLink href={href(`${basePath}programming-with-examples`)}>
                {"fundamental improvements"}
              </SiteLink>
              {
                ". The prior effort often aims at improving programming experience for people with specific technical backgrounds (e.g., "
              }
              <SiteLink href={href(`${basePath}live-programming`)}>
                {"programmers"}
              </SiteLink>
              {", end-users, data scientists), respectively."}
            </p>
            <p>
              {
                'In contrast, throughout this work, we investigate how to make programming activities more inclusive and collaborative, involving people with diverse technical backgrounds. "A programming environment" does not need to be only for programmers. We consider that it should instead be designed for users with diverse technical backgrounds.'
              }
            </p>
            <p>
              {
                "Such inclusive design enables the users to communicate with each other through programming-related activities, delivers benefits of programming to all of them, and would give empowerment to them."
              }
            </p>
          </LocalizedContent>
        </div>
      </>
    );
  }
  function renderPresentation(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {en ? "Presentation materials" : "発表資料"}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                <abbr title={"Convivial Computing Salon 2020"}>{"CCS"}</abbr>{" "}
                {en ? "talk" : "講演動画"}
              </h3>
              <EmbedYoutube
                src={
                  "//www.youtube.com/embed/qR2MAfRFBIM?cc_lang_pref=en&cc_load_policy=1"
                }
              />
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a
                      href={
                        "//www.youtube.com/watch?v=qR2MAfRFBIM&cc_lang_pref=en&cc_load_policy=1"
                      }
                    >
                      <i className="youtube icon"></i>
                      {"YouTube"}
                    </a>
                  </div>
                  <div className="item">
                    <a href={"//vimeo.com/416361135"}>
                      <i className="vimeo icon"></i>
                      {"Vimeo"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                <abbr title={"Convivial Computing Salon 2020"}>{"CCS"}</abbr>{" "}
                {en ? "slides" : "発表スライド"}
              </h3>
              <Embed
                className="ui embed"
                data-url={publicationsTable[p.publication].entryTags.slides}
                data-placeholder={`${rootPath}programming-as-communication/ccs2020/ccs2020-kato-slides00.jpg`}
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
            </div>
          </div>
          <div className="ui divider"></div>
          <div className="ui list">
            <div className="item">
              {en
                ? "YouTube version has calibrated volume and subtitles while the Vimeo version is more extended and has a critique by "
                : "YouTube版は音量が調整され、字幕もついています。Vimeo版は加藤の発表に続いて"}
              <a href={"https://tcher.tech/"}>{"Philip Tchernavskij"}</a>
              {en
                ? " and Q&A session."
                : "氏によるクリティークとQ&Aセッションの録画がついています。"}
            </div>
            <div className="item">
              {en
                ? "For more details on the salon, please refer to "
                : "Convivial Computing Salon 2020については"}
              <a
                href={"https://2020.programming-conference.org/home/salon-2020"}
              >
                {en ? "its website" : "サロンの公式サイト"}
              </a>
              {en ? "." : "をご覧ください。"}
            </div>
            <div className="item">
              {en ? "The paper can be downloaded in the " : "論文はページ下部"}
              <a href={"#publications"}>{en ? "Publications" : "発表文献"}</a>
              {en
                ? " section at the bottom of this page."
                : "からダウンロードできます。"}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderTechnicalEffort(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="laptop code icon"></i>
          <div className="content">
            {en ? "Technical environment design" : "技術的環境設計"}
          </div>
        </h2>
        <div className="ui basic segment">
          <SiteImage
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/runtime-env-as-programming-env.png`}
          />
          <div className="caption">
            <LocalizedContent
              ja={
                <p>
                  {
                    "以下のプロジェクトは多様な人々の協調を支援するインタラクションデザインの設計を通して「Programming as Communication」を実現した例です。"
                  }
                </p>
              }
            >
              <p>
                {
                  "We can design a runtime environment that is the same as the programming environment except for its dedicated graphical user interfaces for people who might not have prior knowledge of programming."
                }
              </p>
              <p>
                {
                  'The following projects are concrete examples of such technical programming environment-design that realize "Programming as Communication." To see them in action, '
                }
                <SiteLink href={href(`${basePath}f3js`)}>{"f3.js"}</SiteLink>
                {" implements both of them and is available at "}
                <a href={"https://f3js.org"}>{"https://f3js.org"}</a>
                {"."}
              </p>
            </LocalizedContent>
          </div>
          <div className="ui segment">
            <div className="ui divided items projects">
              {(() => {
                const children: ReactNode[] = [];
                let technicalProjects = [
                  "user-generated-variables",
                  "live-tuning",
                ].map((key) => projectsTable[key]);
                for (const p of technicalProjects) {
                  if (
                    p.category === "concept" ||
                    p.category === "committee" ||
                    p.category === "private"
                  )
                    continue;
                  if (
                    !Array.isArray(p.tags) ||
                    p.tags.indexOf("programming-as-communication") < 0
                  )
                    continue;
                  children.push(
                    <>
                      <ProjectItem p={p} />
                    </>,
                  );
                }
                return keyed(children);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderSocialEffort(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="user friends icon"></i>
          <div className="content">
            {en ? "Social environment design" : "社会的環境設計"}
          </div>
        </h2>
        <div className="ui basic segment">
          <SiteImage
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/evangelist-in-env.png`}
          />
          <LocalizedContent
            ja={
              <>
                <div className="caption">
                  <p>
                    <a href={"https://otonglass.jp/"}>{"OTON GLASS"}</a>

                    {
                      "プロジェクトでは、プログラミング環境を、ハードウェア部品とソフトウェア"
                    }
                    <abbr title={"Application Programming Interfaces"}>
                      {"API"}
                    </abbr>
                    {
                      "からなるツールキットのような人工物だけでなく、ツールキットの利用を手助けしてくれる有機的存在──エヴァンジェリストの存在を前提に設計しています。"
                    }
                  </p>
                </div>
                <h3 className="ui header">{"関連リンク"}</h3>
                <div className="ui divided small list">
                  <div className="item">
                    <i className="right triangle icon"></i>
                    <div className="content">
                      <a
                        href={
                          "https://scrapbox.io/otonglass-fabbiotope/%E7%94%A3%E6%A5%AD%E6%8A%80%E8%A1%93%E7%B7%8F%E5%90%88%E7%A0%94%E7%A9%B6%E6%89%80%E3%81%A8%E3%81%AE%E5%85%B1%E5%90%8C%E7%A0%94%E7%A9%B6%E3%82%92%E9%96%8B%E5%A7%8B%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F"
                        }
                      >
                        {
                          "産業技術総合研究所との共同研究を開始しました - OTON GLASS／FabBiotope"
                        }
                      </a>
                    </div>
                  </div>
                  <div className="item">
                    <i className="right triangle icon"></i>
                    <div className="content">
                      <a
                        href={
                          "https://2020.programming-conference.org/details/salon-2020-papers/6/Rethinking-Programming-Environment-Technical-and-Social-Environment-Design-towar"
                        }
                      >
                        {
                          'Rethinking Programming "Environment" (Convivial Computing Salon 2020) - ‹Programming› 2020'
                        }
                      </a>
                    </div>
                  </div>
                </div>
              </>
            }
          >
            <div className="caption">
              <p>
                {
                  "We can design a programming environment consisting of an evangelist and computational artifacts."
                }
              </p>
              <p>
                {"In the ongoing "}
                <a
                  href={
                    "https://www.jamesdysonaward.org/en-GB/2016/project/oton-glass/"
                  }
                >
                  {"OTON GLASS"}
                </a>

                {
                  ' project, we have been implementing a programming environment centered on a visually impaired person, or a "maker," who wants to build customized smart glasses. The programming environment consists of not only computational artifacts (a toolkit consisting of hardware components and software '
                }
                <abbr title={"Application Programming Interfaces"}>
                  {"APIs"}
                </abbr>
                {
                  ") but also an evangelist who serves as an organic aid to utilize the toolkit."
                }
              </p>
            </div>
          </LocalizedContent>
        </div>
      </>
    );
  }
  function renderRevision(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          {en ? "Revision history" : "更新履歴"}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            <div className="event">
              <div className="content">
                <div className="date">{"5/15/2020"}</div>
                <div className="summary">
                  {en
                    ? "Add preprint of the paper."
                    : "論文のプレプリントを追加しました。"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"5/9/2020"}</div>
                <div className="summary">
                  {en
                    ? "Add presentation recording and slides."
                    : "プレゼンテーションの録画とスライド資料を追加しました。"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"4/1/2020"}</div>
                <div className="summary">
                  {en
                    ? "Upload the initial revision."
                    : "初版をアップロードしました。"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"programming-as-communication"} />
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>{renderAbstract()}</section>
        <div className="ui hidden divider"></div>
        <section id={"presentation"}>{renderPresentation()}</section>
        <div className="ui hidden divider"></div>
        <section id={"technical-effort"}>{renderTechnicalEffort()}</section>
        <div className="ui hidden divider"></div>
        <section id={"social-effort"}>{renderSocialEffort()}</section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={p.project}
          majorPublication={p.publication}
        />
        <div className="ui hidden divider"></div>
        <section id={"revision"}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
