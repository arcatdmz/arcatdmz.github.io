import {
  Button,
  Divider,
  Feed,
  Header,
  Icon,
  List,
  Segment,
} from "react-fomantic-ui";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SitePopup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  ProjectHero,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract, teaser, implementation, revision. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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

  p = projectsTable["tweeq"];
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
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project="tweeq" />
          </>
        }
        postFooter={
          <>
            <SitePopup
              className="popup-menu"
              position="top left"
              trigger={
                <Button
                  circular
                  icon
                  size="large"
                  color="grey"
                  as="a"
                  className="popup-menu hidden"
                >
                  <Icon name="sidebar" />
                </Button>
              }
            >
              <List divided>
                <List.Item role="link" as="a" href="#body">
                  <Icon name="chevron circle up" />
                  <List.Content>{en ? "Top" : "トップ"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href="#abstract">
                  <Icon name="triangle right" />
                  <List.Content>{en ? "Abstract" : "概要"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href="#implementation">
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Reference implementation" : "リファレンス実装"}
                  </List.Content>
                </List.Item>
              </List>
            </SitePopup>
          </>
        }
      >
        <section id="abstract">
          <Header as="h2">
            <Header.Content>{en ? "Abstract" : "概要"}</Header.Content>
          </Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <>
                  <p>
                    コンテンツ創作の現場で利用される制作ツールは、プリミティブ型のパラメタを調整するために数値スライダーやツマミ型のインタフェース、カラーピッカーなどのGUIウィジェットを数多く備えている。こうしたウィジェットはプロの実践において重要な役割を果たしているにも関わらず、Human-Computer
                    Interaction分野の研究においてそうしたウィジェットの設計は「解決済み」と見なされがちで、クリエータの不満が見過ごされてきた面がある。
                  </p>
                  <p>
                    本研究では、市販の一般的な制作ツールに実装されたGUIウィジェットの実例を収集し、インタラクション設計を分析し、プロのクリエータ向けのウィジェット設計に関する3原則を導出した:
                  </p>
                  <ul>
                    <li>
                      ユーザの繊細な制御戦略に応えるために、多様な入力モードを併存させること
                    </li>
                    <li>
                      熟達したユーザ向けに、高速で高精度なインタラクション設計を優先すること
                    </li>
                    <li>
                      作業空間を確保するために、ウィジェットの専有面積をできるだけ抑えること
                    </li>
                  </ul>
                  <p>
                    そして、これらの原則に基づくリファレンス実装としてGUIウィジェット群{" "}
                    <Icon>Tweeq</Icon> を開発した。 <Icon>Tweeq</Icon>{" "}
                    は第一著者によるアニメーション制作の実践と並行して実装され、少ないクリック回数でのパラメタ調整、オーバーレイ表示による継続的な視覚フィードバック、常時注視を必要としないジェスチャやキーボード入力のサポートといった特徴を備える。
                  </p>
                  <p>
                    <Icon>Tweeq</Icon>{" "}
                    を用いたサンプルアプリケーションを実装し、プロユーザによる簡易評価を行ったところ、おおむね好意的な反応が得られ、提案した3原則が制作ツールのためのGUI開発において有用であることが示唆された。
                  </p>
                </>
              }
            >
              <p>
                Professionals in the creative industry rely on digital content
                authoring tools that provide graphical user interface (GUI)
                widgets for tuning primitive values, such as numeric sliders,
                rotary knobs, and color pickers. Despite their prevalence, GUI
                studies have sometimes been considered "done" in the context of
                HCI, and users' frustrations with these widgets might have gone
                unheard.
              </p>
              <p>
                We sampled such widgets from popular production software and
                analyzed their interaction design, identifying three core design
                principles:
              </p>
              <ul>
                <li>
                  support diverse input modalities to match users' nuanced
                  control strategies,
                </li>
                <li>
                  prioritize high-speed and accurate interaction for skilled
                  users, and
                </li>
                <li>
                  minimize visual footprint to preserve the creative workspace.
                </li>
              </ul>
              <p>
                We then provide reference implementations of GUI widgets that
                follow these guidelines, named <Icon>Tweeq</Icon>. Developed in
                parallel with the first author's animation projects, these
                widgets allow parameter tuning with fewer clicks, provide
                continuous visual feedback through overlays, and facilitate
                gestural and keyboard inputs that do not require constant visual
                attention.
              </p>
              <p>
                To evaluate <Icon>Tweeq</Icon>, we implemented example
                applications and conducted an informal expert user study, which
                revealed generally positive reactions and indicated that the
                proposed design principles may offer a useful direction for GUI
                development in creative software.
              </p>
            </LocalizedContent>
          </Segment>
          <Segment basic>
            <p>
              <SiteImage ui fluid src={`${rootPath}tweeq/tweeq.png`} />
            </p>
            <p className="caption">
              <Icon>Tweeq</Icon>
              {en
                ? ", a set of GUI widgets proposed in this paper for creative software. "
                : " は本論文で提案した制作ツール向けGUIウィジェット群である。"}
              <strong>(a)</strong>
              {en ? " Components of " : " "}
              <Icon>Tweeq</Icon>
              {en ? ". " : " が提供するコンポーネントの一覧。"}
              <strong>(b)</strong>
              {en
                ? " Color input and its overlay UI. "
                : " カラーピッカーとオーバーレイ表示。"}
              <strong>(c)</strong>
              {en
                ? " Timecode input with overlay UI. "
                : " オーバーレイ表示を備えたタイムコード入力インタフェース。"}
              <strong>(d)</strong>
              {en
                ? " Simultaneous parameter tuning on angle inputs."
                : " 角度入力インタフェースを同時調整する様子。"}
            </p>
            <p>
              {en
                ? "*Note that Baku Hashimoto carried out this work partly in the capacity of a collaborative researcher at AIST, as reflected in the paper author's affiliation, and partly as an independent visual artist."
                : "*第一著者の橋本は、産総研の協力研究員（論文メタデータの所属）としてだけでなく、独立したビジュアルアーティストとして本研究に取り組んだ。"}
            </p>
          </Segment>
        </section>
        <Divider hidden />
        <section id="implementation">
          <h2>
            <Icon name="github" />
            {en ? "Reference implementation" : "リファレンス実装"}
          </h2>
          <Segment basic>
            <LocalizedContent
              ja={
                <p>
                  {" "}
                  本論文におけるプロのクリエータ向けのウィジェット設計に関する3原則に基づくリファレンス実装{" "}
                  <Icon>Tweeq</Icon> は Vue.js と TypeScript で開発され、{" "}
                  <a href="//github.com/baku89/tweeq">
                    <Icon name="github" />
                    GitHub
                  </a>{" "}
                  でオープンソース公開されている。
                </p>
              }
            >
              <p>
                {" "}
                The reference implementation of the design principles,{" "}
                <Icon>Tweeq</Icon>, developed with Vue.js and TypeScript, is
                available as an open-source project on{" "}
                <a href="//github.com/baku89/tweeq">
                  <Icon name="github" />
                  GitHub
                </a>
                .
              </p>
            </LocalizedContent>
          </Segment>
          <Segment basic textAlign="center">
            <Button.Group size="huge">
              <Button
                role="link"
                primary
                as="a"
                href="//github.com/baku89/tweeq"
              >
                {en ? "Code" : "ソースコード"}
              </Button>
              <Divider />
              <Button role="link" as="a" href="//baku89.github.io/tweeq">
                {en ? "Documents" : "デモ"}
              </Button>
            </Button.Group>
          </Segment>
        </section>
        <Divider hidden />
        <section id="revision">
          <h2>
            <Icon name="announcement" />
            {en ? "Revision history" : "更新履歴"}
          </h2>
          <Segment basic>
            <Feed className="divided">
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>8/1/2025</Feed.Date>
                  <Feed.Summary>
                    <LocalizedContent
                      ja={
                        <>
                          <a href="https://uist.acm.org/2025/program.html">
                            UIST採択論文一覧の仮公開
                          </a>
                          を受けて本ページの初版を掲載
                        </>
                      }
                    >
                      Upload the initial revision.
                    </LocalizedContent>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
        </section>
        <Divider hidden />
        <ProjectPublications
          project="tweeq"
          majorPublication="uist2025-hashimoto-tweeq"
        />
      </SiteLayout>
    </>
  );
}
