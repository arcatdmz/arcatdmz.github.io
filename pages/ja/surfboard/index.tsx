import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/surfboard/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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
      <SiteLayout context={context}>
        <ProjectHeader project={"surfboard"} />
        <div className="ui message">
          {"Surfboardのソースコードは"}
          <a href={"https://github.com/arcatdmz/surfboard"}>{"GitHub"}</a>
          {"で公開されています。"}
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
          <div className="ui basic segment">
            <p>
              {
                "Surfboardは、キーボード上を手で撫でた時に生じる特異な音をキーボードの近くに取り付けたマイクで録音し、機械学習を用いてリアルタイムに検出する手法である。"
              }
            </p>
            <p>
              {
                "キーボード上を打鍵入力に留まらないサーフェースコンピューティングの新たな場として開拓する取り組みで、これまでになく安価かつ簡単なハードウェアセットアップで実現可能な点に新規性がある。"
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
                    "Surfboardは、キーボードを撫でている状態（サーフィン）を検出できる。さらに、それが右向きか左向きか（ジェスチャ）を検出できる。これ以上複雑なジェスチャに関しては、キーボードの形状の特徴から困難と判断し、実装していない。"
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
                    "Surfboardは、マイク入力のついた標準的なパーソナルコンピュータ上で動作する。とくに、ノートPCはキーボードの近くにマイクが元から据え付けてあることが多く、静かなオフィスなどの環境ではハードウェア的に何も細工をしなくてもSurfboardを利用できる。"
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
              <SiteImage src={`${rootPath}surfboard/fig2-microphones.jpg`} />
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

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/surfboard/", {"projects": ["surfboard"], "publications": ["uist2010-kato-surfboard"], "publicationProjects": ["surfboard"]}) }, "/ja/surfboard/") };
}
