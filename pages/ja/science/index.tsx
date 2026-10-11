import {
  ProjectHeader,
  ProjectItem,
  Publication,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";

import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/science/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projects, projectsTable, publicationsTable, moment, rootPath } = data;
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

  p = projectsTable["science"];
  title = p.getTitle(lang);
  me = p.project + "/";
  var chippie;
  for (var p_ of projects) if (p_.title === "Chippie") chippie = p_;
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
  function renderScienceFuture(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">
            {"科学と未来"}
            <span className="ui tiny basic label">
              <i className="calendar icon"></i>
              {"2018-2019"}
            </span>
          </div>
        </h2>
        <p>{"科学技術が切り拓く未来についての論考などを書いています。"}</p>
        <div className="ui basic segment" id={"canna"}>
          <h3 className="ui header">
            <div className="content">{"カンナたちの研究"}</div>
          </h3>
          <p>
            {
              "情報処理学会学会誌「情報処理」2020年1月号の特集「『AIの遺電子』に学ぶ未来構想術」に短編小説「カンナたちの研究」を寄稿しました。"
            }
          </p>
          <blockquote>
            <p>
              {
                "現役の研究者が、自身がかかわる科学技術が発展し社会に浸透した未来像をScience Fiction (SF)として描いた特集。"
              }
            </p>
          </blockquote>
          <p>{"寄稿したSF小説のあらすじは以下のとおりです。"}</p>
          <blockquote>
            <p>
              {
                "Virtual Reality特区の高校に通うカンナとキリは，ふだん誰も立ち入れない旧校舎への侵入を計画する．夜半過ぎ，工事用ロボットの開錠プロセスをハックして校舎内に入り込んだ二人の眼前に，見たことのない光景が広がる．さらに予期せぬイベントが発生し，二人の侵入劇は国家プロジェクトの命運を左右する大ニュースへ発展する．プログラムを実行したまま編集するライブプログラミングが当たり前となり，ソフトウェアのみならず物理デバイスや建物までもプログラミング可能となった未来で起きる事件の顛末を描く．"
              }
            </p>
          </blockquote>
          <div className="ui segment">
            <div className="ui divided list">
              <Publication entry={publicationsTable["ipsj-v61n1-kato-canna"]} />
            </div>
          </div>
        </div>
        <div className="ui basic segment" id={"cs-in-100years"}>
          <h3 className="ui header">
            <div className="content">{"100年後のコンピュータ科学"}</div>
          </h3>
          <p>
            {
              "情報処理学会学会誌「情報処理」2019年1月号のコーナー「先生、質問です！」に回答を寄稿しました。本号の質問は以下のとおりです。"
            }
          </p>
          <blockquote>
            <p>{"100年後のコンピュータ科学はどんなことを研究しているの？"}</p>
          </blockquote>
          <p>
            {"全回答は"}
            <a href={"https://www.ipsj.or.jp/magazine/sensei-q/6001.html"}>
              {"学会の公式Webサイト"}
            </a>
            {"に掲載されています。"}
          </p>
          <p>
            {
              "自分の回答は「仮想」をキーワードに未来を読み解きました。詳細は以下の補足ブログ記事をご参照ください。"
            }
          </p>
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={
              "https://blog.junkato.jp/ja/posts/2018-12-22-computer-science-in-the-future/"
            }
          >
            {"補足記事"}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
      </>
    );
  }
  function renderNonAcademic(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">
            {"非アカデミア駆動型研究"}
            <span className="ui tiny basic label">
              <i className="calendar icon"></i>
              {"2019"}
            </span>
          </div>
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <p>
                {"2019年5月27日、Japan Open Science Summitのパネルセッション「"}
                <a
                  href={
                    "https://joss.rcos.nii.ac.jp/2019/session/0527/?id=se_93"
                  }
                >
                  {"非アカデミア駆動型研究の潮流と可能性"}
                </a>
                {"」にパネリストとして登壇しました。"}
              </p>
              <p>
                {
                  "私がこれまでに関わってきた非アカデミア駆動型研究を以下の2類型として紹介しました。"
                }
              </p>
              <ul className="ui list">
                <li className="item">
                  {"在野の人々による自発的活動（"}
                  <a href={"#tsemi"}>{"立花隆ゼミ"}</a>
                  {"）"}
                </li>
                <li className="item">
                  {"企業における放課後R&D（"}
                  <a href={"https://research.archinc.jp/"}>{"Arch Research"}</a>
                  {"）"}
                </li>
              </ul>
              <p>
                {
                  "なお、この内容に関連する私自身の発表としては、2016年「第 2 回つくば横の会」で登壇した際の「分野/職種/国境を超える科学技術のために」があります。"
                }
              </p>
              <p>
                {"詳しくは"}
                <a
                  href={
                    "https://blog.junkato.jp/ja/posts/2016-06-20-tsukuba-inter-science"
                  }
                >
                  {"当時のブログ記事"}
                </a>
                {"をご覧ください。"}
              </p>
            </div>
            <div className="column">
              <div
                className="ui embed"
                data-url={publicationsTable["joss2019-kato"].entryTags.slides}
                data-placeholder={`${rootPath}science/joss2019-kato.png`}
                data-icon={"video play outline"}
              ></div>
            </div>
          </div>
          <div className="ui segment">
            <div className="ui divided list">
              <Publication entry={publicationsTable["joss2019-kato"]} />
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderReproducibility(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">
            <abbr title={"Human-Computer Interaction"}>{"HCI"}</abbr>
            {"と研究再現性問題"}

            <span className="ui tiny basic label">
              <i className="calendar icon"></i>
              {"2018"}
            </span>
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            <a
              href={
                "https://blog.junkato.jp/ja/posts/2017-07-05-artifact-review-for-replicability/"
              }
            >
              {"ブログ記事"}
            </a>
            {
              "をきっかけにご縁をいただき、ヒューマンインタフェース学会誌の第20巻1号「特集: 研究再現性問題」に寄稿しました。ヒューマンインタフェース・Human-Computer Interaction分野の研究者が研究再現性問題とどう向き合うべきか、自分なりに調べ、人に相談し、書いてみた原稿です。"
            }
          </p>
          <p>
            {"研究再現性問題について縦糸で語るなかで、"}
            <strong>{"(1)"}</strong>
            {" そもそもHuman-Computer Interaction分野の研究とは何であるのか "}
            <strong>{"(2)"}</strong>
            {" どう進めるべきなのか、さらには "}
            <strong>{"(3)"}</strong>
            {
              " 科学技術全体のなかでどんな役割が果たせるのか という問いに対する自分なりの回答を横糸で編み込んだつもりです。"
            }
            <SiteLink href={"/publications/hi20-kato-reproducibility.pdf"}>
              {"ヒューマンインタフェース学会に許諾を得て全文を公開"}
            </SiteLink>
            {
              "しているのでぜひご一読いただければと思うのですが、とくに3点目で私が伝えたかったポイントを本文26ページ目から抜粋します。"
            }
          </p>
          <blockquote>
            <p>
              {
                "HI／HCI分野における再現性向上のための取り組みは多層的で、こうすればよい、というはっきりした道筋が見えにくいことが多い。その根幹には「そもそもHI／HCIは一体どんな学問なのか？」という問いが横たわっている。これに答えるために、コミュニティ内ではメタ科学的な取り組みが行われてきた。例えば、HCI研究を類型化して研究上の貢献の種類に応じて評価手法を別々に論じる研究 "
              }
              <a
                href={
                  "http://users.comnet.aalto.fi/oulasvir/pubs/hci-research-as-problem-solving-chi2016.pdf"
                }
                title={"HCI Research as Problem-Solving"}
              >
                {"[a,"}
              </a>
              <a
                href={
                  "https://interactions.acm.org/archive/view/may-june-2016/research-contribution-in-human-computer-interaction"
                }
                title={"Research contributions in human-computer interaction"}
              >
                {" b]"}
              </a>
              {"や、中でも"}
              <a
                href={
                  "https://web.archive.org/web/20180711105900/http://hci.tools/"
                }
                title={"#HCI.Tools 2017"}
              >
                {
                  "ツールキット研究に限定して進め方や評価手法について議論するワークショップ [c]"
                }
              </a>
              {"、"}
              <a
                href={"https://prism.ucalgary.ca/handle/1880/52215"}
                title={"Evaluation strategies for HCI toolkit research"}
              >
                {"既存のツールキット研究を詳しく分析したサーベイ [d]"}
              </a>
              {
                "などが行われてきている。こうした自己分析をメタ科学的なレイヤーで行うことは、学問分野の重要性を広く科学者コミュニティに伝えるための論点整理として非常に重要である。"
              }
            </p>
            <p>
              {
                "一方で、我々HI／HCI研究者は人と人工物／コンピュータのより良い関係を築く専門家である。自己分析から一歩進んで、コンピュータありきの現代における科学のあり方を建設的に提案することもできるはずである。コンピュータ科学の古典的エッセイ論文に「"
              }
              <a
                href={"https://www.cs.unc.edu/~brooks/Toolsmith-CACM.pdf"}
                title={"The Computer Scientist as Toolsmith II"}
              >
                {"The Computer Scientist as Toolsmith [e]"}
              </a>
              {
                "」というものがある。HI／HCI分野におけるツールキット研究を持ち出すまでもなく、我々は人類の知的生産のための道具を作る応用科学者であり続けてきたのだ。"
              }
              <span style={{ color: "#ccc" }}>{"（略）"}</span>
            </p>
            <p>
              {
                "ただ、研究の再現性を向上し、研究を加速するツールについて正面から取り組んだ研究はHI／HCI分野ではまだ多くない。研究ノートとして開発された"
              }
              <a href={"https://jupyter.org/"}>{"Jupyter Notebook [f]"}</a>
              {
                "は論文を執筆する目的でも使えるようになりつつあり、同様の取り組みは学術出版社Elsevierが"
              }
              <a
                href={
                  "https://www.elsevier.com/physical-sciences/computer-science/executable-papers-improving-the-article-format-in-computer-science"
                }
                title={
                  "Executable Papers - Improving the Article Format in Computer Science"
                }
              >
                {"Executable Papers [g]"}
              </a>
              {"という名の下に進めている。"}
              <a
                href={
                  "https://www.slideshare.net/takaumada/startup-tool-for-research"
                }
                title={"研究を加速するスタートアップ"}
              >
                {
                  "研究用ツール開発に取り組むスタートアップ企業も増えてきている [h]"
                }
              </a>
              {
                "。今後、こうした社会の要請に応えるHI／HCI分野発のメタ科学研究が増えていくことを願っている。"
              }
            </p>
          </blockquote>
          <div className="ui segment">
            <div className="ui divided list">
              <Publication
                entry={publicationsTable["hi20-kato-reproducibility"]}
              />
            </div>
          </div>
        </div>
        <div className="ui basic right aligned segment">
          <SiteLink
            className="ui primary button"
            href={"/publications/hi20-kato-reproducibility.pdf"}
          >
            {"論文PDF"}
            <i className="chevron circle right icon"></i>
          </SiteLink>
        </div>
        <div className="ui basic segment">
          <h3 className="ui header">
            <div className="content">{"特集号掲載論文"}</div>
          </h3>
          <p>
            {
              "本特集には他に以下の記事が掲載されており、すべてWeb上で閲覧できます。"
            }
          </p>
          <table className="ui striped small table">
            <tbody>
              <tr>
                <td className="four wide">{"松田 昌史"}</td>
                <td className="twelve wide">
                  <a
                    href={
                      "https://www.dropbox.com/s/0sme5as2cqupiyq/Matsuda2018HI.pdf?dl=0"
                    }
                  >
                    {"特集によせて: 心理学界を他山の石とする"}
                  </a>
                </td>
              </tr>
              <tr>
                <td>{"三浦 麻子"}</td>
                <td>
                  <a
                    href={
                      "https://www.dropbox.com/s/dzliec1cr9usyds/Miura2018HI.pdf?dl=0"
                    }
                  >
                    {"人を対象とした行動学研究における再現性問題"}
                  </a>
                </td>
              </tr>
              <tr>
                <td>{"樋口 匡貴・藤島 喜嗣"}</td>
                <td>
                  <a href={"https://osf.io/zua7d/"}>
                    {"アスタリスク～真実の意思を求め(すぎ)て"}
                  </a>
                </td>
              </tr>
              <tr>
                <td>{"山田 祐樹"}</td>
                <td>
                  <a href={"https://osf.io/w9u6d"}>
                    {
                      "再現可能性問題をハックする―是非に及ばぬ研究コミュニティからの包囲網―"
                    }
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ui basic segment">
          <h3 className="ui header">
            <div className="content">{"著者Webページ"}</div>
          </h3>
          <div className="ui divided small list">
            <div className="item">
              <a href={"http://team1mile.com/asarinlab/2018/02/26/his2018/"}>
                {"論文が公刊されました – 関西学院大学文学部社会心理学研究室"}
              </a>
              {" (三浦 麻子)"}
            </div>
            <div className="item">
              <a href={"https://note.mu/momentumyy/n/n3b1ee3bcf81a"}>
                {"心理学の再現可能性問題は心理学的問題"}
              </a>
              {" (山田 祐樹)"}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderMitnse(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">
            {"MIT原子力理工学部による原子力発電の解説（翻訳）"}
            <span className="ui tiny basic label">
              <i className="calendar icon"></i>
              {"2011"}
            </span>
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "2011年3月11日の東北地方太平洋沖地震以降、東日本大震災の一部として福島第一原子力発電所事故が起きました。原子力発電の仕組みをある程度知っておかないと解釈に悩むニュースが流れ、分かりやすく基礎知識を得られる情報源に対する需要が高まりました。"
            }
          </p>
          <p>
            {"そんな折、楽観的な見通しを語る"}
            <a
              href={
                "http://blog.livedoor.jp/lunarmodule7/archives/2406950.html"
              }
            >
              {"MIT研究者Dr. Josef Oehmenによる福島第一原発事故解説"}
            </a>
            {
              "がTwitterなど主にインターネット上で拡散しました。しかし、これを執筆したOehmen氏は原子力の専門家でなく、内容が必ずしも正確ではありませんでした。そこで、MITの名前で広がってしまった責任を取るかたちでMIT原子力理工学部（NSE）の学生有志が学部の協力を受けて"
            }
            <a href={"http://mitnse.com/"}>{"mitnse.com"}</a>
            {"を立ち上げ、"}
            <a
              href={
                "http://mitnse.com/2011/03/13/why-i-am-not-worried-about-japans-nuclear-reactors/"
              }
            >
              {"改訂版"}
            </a>
            {
              "を公開しました。また、これに続いて様々な基礎知識を啓蒙する記事を執筆しました。"
            }
          </p>
          <p>
            {
              "これらの記事を、Google Docsを使って複数人で協力して和訳し、さらに注をつけて一連のブログ記事として公開しました。共同作業のハブとなったGoogle Docs「"
            }
            <a
              href={
                "https://docs.google.com/document/d/1JhSpKirAGTcU6wmf8eXgDZkoReRVfXxbRW2dUgJEY5E/edit#heading=h.gjd501ivac1x"
              }
            >
              {"MIT NSE (mitnse.com) 翻訳記事の一覧"}
            </a>
            {
              "」は、下記の立花隆ゼミで目指していた「Q&Aサイトとリンク集」となっています。Web技術の進歩により共同作業が容易になったことを実感した出来事でした。"
            }
          </p>
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={"https://digitalmuseum.jp/sci/mitnse-ja/"}
          >
            {"翻訳記事の一覧"}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
      </>
    );
  }
  function renderTsemi(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">
            {"立花隆ゼミ"}
            <span className="ui tiny basic label">
              <i className="calendar icon"></i>
              {"2005-2007"}
            </span>
            <span className="ui tiny basic label">
              <i className="calendar icon"></i>
              {"2021"}
            </span>
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "ジャーナリストの立花隆氏が開講していた東京大学教養学部 全学自由研究ゼミナール「先端研究現場へ行こう」で幹事などを務めました。このゼミの目的は、"
            }
            <a href={"https://sci.digitalmuseum.jp"}>
              {
                "科学技術総合メディアサイト「SCI(サイ)──サイエンスの、最先端を。──」"
              }
            </a>
            {"を作ることでした。"}
          </p>
          <p>
            {
              "SCI(サイ)は、立花氏の言うところの「巨大Q&Aサイトと巨大リンク集」を目指していました。詳しくは、"
            }
            <a href={"https://sci.digitalmuseum.jp/site/tsemi.php"}>
              {"立花氏の文章"}
            </a>
            {
              "をご一読ください。学生は、それぞれに対応する以下の2つの活動に取り組むことになります。（TogetterはおろかTwitterも存在しない2004年当時からキュレーションに着目していた点は、立花氏の先見の明だと思います。）"
            }
          </p>
          <ol>
            <li>
              {"学部生が「Q」を発し、研究者の方々に「A」を提供していただく、"}
              <strong>{"取材をベースに記事を執筆する活動"}</strong>
            </li>
            <li>
              {"すでに各研究機関やニュースサイトが掲載している"}
              <strong>{"さまざまな情報をキュレーションする活動"}</strong>
            </li>
          </ol>
          <p>
            {
              "私は、このゼミの幹事を務めながら、ゼミ生のアウトプットをなるべく最大化できる仕組み作りに尽力しました。"
            }
          </p>
          <p>
            {"また、立花氏が2021年に逝去されたことを受け、"}
            <a
              href={
                "https://blog.junkato.jp/ja/posts/2021-10-11-chez-tachibana-website/"
              }
            >
              {"立花隆公式サイトを新しく作り直し、オープンソース化"}
            </a>
            {"しました。"}
          </p>
        </div>
        <div className="ui basic right aligned segment">
          <a
            className="ui primary button"
            href={"https://sci.digitalmuseum.jp"}
          >
            {"SCI(サイ) アーカイブ"}
            <i className="chevron circle right icon"></i>
          </a>
          <a className="ui primary button" href={"https://tachibana.rip"}>
            {"立花隆公式サイト"}
            <i className="chevron circle right icon"></i>
          </a>
        </div>
        <div className="ui basic segment">
          <h3 className="ui header" id={"tsemi-cms"}>
            <div className="content">
              {"コンテンツ管理システム（"}
              <abbr title={"Contents Management System"}>{"CMS"}</abbr>
              {"）開発"}
            </div>
          </h3>
          <p>
            {
              "必ずしもコンピュータが得意でないメンバーもいるなかでWebメディアを作るという挑戦は、WordPressなどのコンテンツ管理システム（"
            }
            <abbr title={"Contents Management System"}>{"CMS"}</abbr>
            {
              "）黎明期には容易ではありません。WordPressの初版リリースが2003年5月、ゼミ開始は2005年4月です。とくに、先に挙げたような記事掲載とリンク集のようなキュレーション作業をどちらも行えるシステムは見つかりませんでした。そこで、フルスクラッチでシステムを構築し、ゼミ生に使ってもらいました。"
            }
          </p>
          <p>
            {
              "その際、誰がどこに貢献したか、責任を持っているかを明確にするため、"
            }
            <strong>{"執筆者"}</strong>
            {"（記事を書いた人）"}
            <strong>{"担当者"}</strong>
            {"（記事の企画を立案した人）"}
            <strong>{"制作者"}</strong>
            {
              "（記事のHTML書き起こしとWeb掲載を行った人）を全ページに記名することとし、そのための個人認証の仕組みも実装しました。この個人認証のしくみは、NHKスペシャルなどと連動した掲示板コンテンツでも利用されました。"
            }
          </p>
          <div className="ui segment">
            <div className="ui divided items">
              <ProjectItem p={chippie} />
            </div>
          </div>
        </div>
        <div className="ui basic segment">
          <h3 className="ui header" id={"tsemi-projects"}>
            <div className="content">{"企画立案・冊子刊行"}</div>
          </h3>
          <p>
            {
              "科学技術に関する最先端のニュースを分かりやすく伝えることは、容易ではありません。そこで、SF作品のビジュアルが持つ魅力を借りながら科学技術について論じられないかと考え、「"
            }
            <a href={"https://sci.digitalmuseum.jp/project/gis/"}>
              {"イノセンスに見る最先端科学"}
            </a>
            {
              "」を立案しました。また、学園祭などでイベントを行うにあたり、現地での頒布物として、ゼミのそれまでの活動の一部をまとめた冊子を刊行しました。"
            }
          </p>
          <div className="ui stackable three columns grid">
            <div className="column">
              <a
                className="ui fluid image"
                href={"https://sci.digitalmuseum.jp/project/gis/"}
              >
                <img
                  src={`${rootPath}science/science-innocence.jpg`}
                  alt={"イノセンスに見る最先端科学"}
                />
              </a>
              <div className="caption">{"イノセンスに見る最先端科学"}</div>
            </div>
            <div className="column">
              <a className="ui fluid image" href={"https://bit.ly/scinote-dl"}>
                <img
                  src={`${rootPath}science/060526-scinote.png`}
                  alt={"SCInote"}
                />
              </a>
              <div className="caption">{"SCInote [PDF]"}</div>
            </div>
            <div className="column">
              <a className="ui fluid image" href={"https://bit.ly/scinote2-dl"}>
                <img
                  src={`${rootPath}science/070518-scinote2.png`}
                  alt={"SCInote2"}
                />
              </a>
              <div className="caption">{"SCInote2 [PDF]"}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#science-future"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"科学と未来"}</div>
                </a>
                <a className="item" href={"#non-academic"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"非アカデミア駆動型研究"}</div>
                </a>
                <a className="item" href={"#reproducibility"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"HCIと研究再現性問題"}</div>
                </a>
                <a className="item" href={"#mitnse"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"原子力発電の解説翻訳"}</div>
                </a>
                <a className="item" href={"#tsemi"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{"立花隆ゼミ"}</div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <ProjectHeader project={"science"} />
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <HtmlContent html={p.getDescription(lang)} />
            <p>
              {"また、ブログでも関連する話題を扱ってきました。記事は "}
              <a href={"https://blog.junkato.jp/ja/tags/science/"}>
                {"science"}
              </a>
              {" タグで辿ることができます。"}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"science-future"}>{renderScienceFuture()}</section>
        <div className="ui hidden divider"></div>
        <section id={"non-academic"}>{renderNonAcademic()}</section>
        <div className="ui hidden divider"></div>
        <section id={"reproducibility"}>{renderReproducibility()}</section>
        <div className="ui hidden divider"></div>
        <section id={"mitnse"}>{renderMitnse()}</section>
        <div className="ui hidden divider"></div>
        <section id={"tsemi"}>{renderTsemi()}</section>
      </SiteLayout>
    </>
  );
}
