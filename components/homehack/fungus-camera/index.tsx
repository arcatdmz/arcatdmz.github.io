import { Grid, Header } from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

import { SiteImage } from "@/site/components/SiteImage";
import { EmbedYoutube } from "@/site/components/ContentComponents";

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
      <Grid stackable columns={3}>
        <Grid.Column>
          <LinkedImage
            fluid
            href={href(`${rootPath}homehack/fungus-prototype.jpg`)}
          >
            <SiteImage
              src={`${rootPath}homehack/thumbnails/fungus-prototype.jpg`}
            />
          </LinkedImage>
        </Grid.Column>
        <Grid.Column>
          <LinkedImage
            fluid
            href={href(`${rootPath}homehack/fungus-prototype-2.jpg`)}
          >
            <SiteImage
              src={`${rootPath}homehack/thumbnails/fungus-prototype-2.jpg`}
            />
          </LinkedImage>
        </Grid.Column>
        <Grid.Column>
          <LinkedImage
            fluid
            href={href(`${rootPath}homehack/fungus-camera.jpg`)}
          >
            <SiteImage
              src={`${rootPath}homehack/thumbnails/fungus-camera.jpg`}
            />
          </LinkedImage>
        </Grid.Column>
      </Grid>
      <Grid stackable columns={2}>
        <Grid.Column>
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
          <Header as="h3">{"開発環境"}</Header>
          <ul>
            <li>{"Arduino, Bash script, Java"}</li>
            <li>{"Mac mini"}</li>
          </ul>
          <Header as="h3">{"資料"}</Header>
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
        </Grid.Column>
        <Grid.Column>
          <LinkedImage fluid href={href(`${rootPath}homehack/fungus-box.jpg`)}>
            <SiteImage src={`${rootPath}homehack/thumbnails/fungus-box.jpg`} />
          </LinkedImage>
        </Grid.Column>
      </Grid>
      <Grid stackable columns={2}>
        <Grid.Column>
          <LinkedImage
            fluid
            href={href(`${rootPath}homehack/fungus-camera-image.jpg`)}
          >
            <SiteImage src={`${rootPath}homehack/fungus-camera-image.jpg`} />
          </LinkedImage>
        </Grid.Column>
        <Grid.Column>
          <EmbedYoutube src={"//www.youtube.com/embed/rFeTAwY_d_Y"} />
        </Grid.Column>
      </Grid>
    </>
  );
}
