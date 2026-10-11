import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import {
  classNames,
  style,
  text as plainText,
  keyed,
  href,
  attribute,
} from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/surfboard/index.pug; edit this TSX source directly. */
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
  const content = createContentComponents(context);

  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("surfboard")}
        <div className="ui message">
          {richText("Surfboardのソースコードは")}
          <a href={href("https://github.com/arcatdmz/surfboard")}>
            {richText("GitHub")}
          </a>
          {richText("で公開されています。")}
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>
          <h2 className="ui header">{plainText(en ? "Abstract" : "概要")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "Surfboardは、キーボード上を手で撫でた時に生じる特異な音をキーボードの近くに取り付けたマイクで録音し、機械学習を用いてリアルタイムに検出する手法である。",
              )}
            </p>
            <p>
              {richText(
                "キーボード上を打鍵入力に留まらないサーフェースコンピューティングの新たな場として開拓する取り組みで、これまでになく安価かつ簡単なハードウェアセットアップで実現可能な点に新規性がある。",
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <section id={attribute("gestures")}>
              <h2 className="ui header">
                {plainText(
                  en ? "Recognizable gestures" : "検出可能なジェスチャ",
                )}
              </h2>
              <div className="ui basic segment">
                <p>
                  {richText(
                    "Surfboardは、キーボードを撫でている状態（サーフィン）を検出できる。さらに、それが右向きか左向きか（ジェスチャ）を検出できる。これ以上複雑なジェスチャに関しては、キーボードの形状の特徴から困難と判断し、実装していない。",
                  )}
                </p>
              </div>
            </section>
            <div className="ui hidden divider"></div>
            <section id={attribute("hardware")}>
              <h2 className="ui header">
                {plainText(en ? "Supported hardware" : "対応ハードウェア")}
              </h2>
              <div className="ui basic segment">
                <p>
                  {richText(
                    "Surfboardは、マイク入力のついた標準的なパーソナルコンピュータ上で動作する。とくに、ノートPCはキーボードの近くにマイクが元から据え付けてあることが多く、静かなオフィスなどの環境ではハードウェア的に何も細工をしなくてもSurfboardを利用できる。",
                  )}
                </p>
              </div>
            </section>
            <div className="ui hidden divider"></div>
          </div>
          <div className="column">
            {content.renderEmbedYoutube("//www.youtube.com/embed/QKtzsOU-sA8")}
            <div className="caption">
              <div className="ui horizontal list">
                <div className="item">
                  <a href={href("//www.youtube.com/watch?v=QKtzsOU-sA8")}>
                    <i className="youtube icon"></i>
                    {richText("YouTube")}
                  </a>
                </div>
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <a
              className="ui fluid image"
              href={href(`${rootPath}surfboard/fig2-microphones.jpg`)}
            >
              <img src={`${rootPath}surfboard/fig2-microphones.jpg`} />
            </a>
            <div className="caption">
              {plainText(
                en
                  ? "Microphones attached close to keyboards"
                  : "キーボードの近くに設置されたマイク",
              )}
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(
          "surfboard",
          "uist2010-kato-surfboard",
        )}
      </SiteLayout>
    </>
  );
}
