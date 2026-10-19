import { Grid, GridColumn } from "react-fomantic-ui";
import { SiteImage } from "@/site/components/SiteImage";
import { EmbedYoutube } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { href } from "@/site/rendering";
import type { PageDataProps } from "@/site/page-data";

import { HomehackLayout } from "@/components/homehack/HomehackLayout";
import { useSiteContext } from "@/site/components/SiteContext";

export default function Page({ pageData }: PageDataProps) {
  return (
    <HomehackLayout pageData={pageData} active="rhythm-kaden">
      <Content />
    </HomehackLayout>
  );
}

function Content() {
  const { rootPath } = useSiteContext();

  return (
    <>
      <Grid stackable>
        <GridColumn width={4}>
          <SiteImage
            className="ui fluid image"
            src={`${rootPath}homehack/rhythmkaden.jpg`}
          />
        </GridColumn>
        <GridColumn width={12}>
          <p>
            {
              "ブラウザゲーム（音楽に合わせて上から降りてくるマーカーのタイミングに合わせてキーを押して得点を稼ぐ音楽ゲーム"
            }
            <a href={"https://peraichi.com/landing_pages/view/otoge"}>
              {"otoge.net"}
            </a>
            {
              "）の進行を家電製品が盛り上げてくれるアプリケーションを、お茶の水女子大学 西村、神奈川工科大学 藤崎とともに提案、開発した。"
            }
          </p>
          <p>
            {
              "本アプリケーションは、Sony CSLとお茶の水女子大学の共催ワークショップ「Home Hacker’s Workshop」の半日のセッションで制作された。また、Sony CSL、大和ハウス、ヤフーの共催イベント「"
            }
            <a
              href={
                "https://www.daiwahouse.co.jp/lab/HousingAPI/symposium/index.html"
              }
            >
              {"住宅をカスタマイズするためのシンポジウム"}
            </a>
            {"」で発表され、学生賞を受賞した。"}
          </p>
        </GridColumn>
      </Grid>
      <Grid stackable columns={2}>
        <GridColumn>
          <h3 className="ui header">{"開発環境"}</h3>
          <ul>
            <li>{"Java (プロキシサーバ), JavaScript (Webサービスの改造)"}</li>
            <li>
              <a href={"https://www.sonycsl.co.jp/tokyo/347/"}>
                {"Kadecot Server"}
              </a>
              {" Web API + PC or Mac"}
            </li>
          </ul>
          <h3 className="ui header">{"資料"}</h3>
          <ul>
            <li>
              {"紹介記事: "}
              <a
                href={
                  "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1185/"
                }
              >
                {"Home Hacker's Workshop"}
              </a>
              {", "}
              <a
                href={
                  "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1189/"
                }
              >
                {"Customize YOUR House! シンポジウム"}
              </a>
            </li>
            <li>
              {"資料: "}
              <SiteLink
                href={href(`${rootPath}homehack/rhythmkaden-poster.pdf`)}
              >
                <i className="icon-file"></i>
                {"ポスター"}
              </SiteLink>
              <SiteLink
                href={href(`${rootPath}homehack/rhythmkaden-slides.pdf`)}
              >
                <i className="icon-play-circle"></i>
                {"スライド"}
              </SiteLink>
            </li>
            <li>
              {"ソースコード: "}
              <a href={"https://github.com/arcatdmz/rhythmkaden-proxy"}>
                <i className="icon-download"></i>
                {"GitHub"}
              </a>
            </li>
          </ul>
          <h3 className="ui header">{"学生賞 選出コメント"}</h3>
          <p>
            {
              "私が選出したので受賞理由を説明しますと、このシステムの真意は音ゲーで遊ばないと動作しない家電、というアプリのアイデアではなく、既存のWebアプリを特殊なプロキシサーバを介して書き換えることにより、いかなるWebアプリにも家電機能を追加できるという「家電マッシュアップ」の方式を提案したことにあります。"
            }
          </p>
          <p>
            {
              "家電を、温度や照明などの環境を変化させる演出機器だと捉えると、それは様々な(既存の)ゲームやエンタテインメントの臨場感や演出効果を高めるのに即座に応用できるでしょうし、またそういった応用は、さしたる追加の実装や新しいアイデアを必要とすることなくハイクオリティなエンタテインメントを生み出してくれることでしょう。そのような家電利用法への道を開く具体的な方法を示してくれたという点で、私はこの作品を評価しました。"
            }
          </p>
          <p>
            <a
              href={
                "https://web.archive.org/web/20170625152327/http://kadecot.net/blog/1189/"
              }
              title={"Kadecot > Customize YOUR House! シンポジウム"}
              style={{ display: "inline" }}
            >
              {"Kadecotブログ"}
            </a>
            {"より"}
          </p>
        </GridColumn>
        <GridColumn>
          <EmbedYoutube src={"//www.youtube.com/embed/Wu3OLxEmeww"} />
          <p className="caption">
            {"「既存Webアプリと家電のマッシュアップ」プレゼンテーション動画"}
          </p>
        </GridColumn>
      </Grid>
    </>
  );
}
