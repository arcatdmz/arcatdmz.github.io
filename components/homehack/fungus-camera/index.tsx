import { SiteImage } from "@/site/components/SiteImage";
import { EmbedYoutube } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { href } from "@/site/rendering";
import type { PageDataProps } from "@/site/page-data";

import { HomehackLayout } from "@/components/homehack/HomehackLayout";
import { useSiteContext } from "@/site/components/SiteContext";

export default function Page({ pageData }: PageDataProps) {
  return (
    <HomehackLayout pageData={pageData} active="fungus-camera">
      <Content />
    </HomehackLayout>
  );
}

function Content() {
  const { rootPath } = useSiteContext();

  return (
    <>
      <div className="ui stackable three columns grid">
        <div className="column">
          <SiteLink
            className="ui fluid image"
            href={href(`${rootPath}homehack/fungus-prototype.jpg`)}
          >
            <SiteImage
              src={`${rootPath}homehack/thumbnails/fungus-prototype.jpg`}
            />
          </SiteLink>
        </div>
        <div className="column">
          <SiteLink
            className="ui fluid image"
            href={href(`${rootPath}homehack/fungus-prototype-2.jpg`)}
          >
            <SiteImage
              src={`${rootPath}homehack/thumbnails/fungus-prototype-2.jpg`}
            />
          </SiteLink>
        </div>
        <div className="column">
          <SiteLink
            className="ui fluid image"
            href={href(`${rootPath}homehack/fungus-camera.jpg`)}
          >
            <SiteImage
              src={`${rootPath}homehack/thumbnails/fungus-camera.jpg`}
            />
          </SiteLink>
        </div>
      </div>
      <div className="ui stackable two columns grid">
        <div className="column">
          <p>
            {
              "なめこの生育を観察する定点カメラを開発した。冷暗所（玄関）での観察を可能にするため、明かりのON→撮影→OFFを自動で行ってくれるようなデバイスを作成した。"
            }
          </p>
          <p>
            {
              "ついでに、玄関の明かりのスイッチがドアから遠い問題（明かりをつけようとしている間にドアが閉まって真っ暗になる）を解決するため、このデバイスに近づくと明かりをONにして、遠ざかってしばらくするとOFFにする機能もつけた。"
            }
          </p>
          <h3 className="ui header">{"開発環境"}</h3>
          <ul>
            <li>{"Arduino, Bash script, Java"}</li>
            <li>{"Mac mini"}</li>
          </ul>
          <h3 className="ui header">{"資料"}</h3>
          <ul>
            <li>
              {"ブログ記事: "}
              <a
                href={
                  "https://blog.junkato.jp/ja/posts/2012-12-18-mac-os-x-launchd/"
                }
              >
                {"Mac OS Xでスクリプトを定期実行する"}
              </a>
            </li>
            <li>
              {"ソースコード: "}
              <a href={"https://github.com/arcatdmz/namekocam-server"}>
                {"GitHub"}
              </a>
            </li>
            <li>
              {"半年間の全成長記録: "}
              <a href={"//www.youtube.com/watch?v=ggH3Y_goGtM"}>{"YouTube"}</a>
            </li>
          </ul>
        </div>
        <div className="column">
          <SiteLink
            className="ui fluid image"
            href={href(`${rootPath}homehack/fungus-box.jpg`)}
          >
            <SiteImage src={`${rootPath}homehack/thumbnails/fungus-box.jpg`} />
          </SiteLink>
        </div>
      </div>
      <div className="ui stackable two columns grid">
        <div className="column">
          <SiteLink
            className="ui fluid image"
            href={href(`${rootPath}homehack/fungus-camera-image.jpg`)}
          >
            <SiteImage src={`${rootPath}homehack/fungus-camera-image.jpg`} />
          </SiteLink>
        </div>
        <div className="column">
          <EmbedYoutube src={"//www.youtube.com/embed/rFeTAwY_d_Y"} />
        </div>
      </div>
    </>
  );
}
