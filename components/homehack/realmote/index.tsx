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
    <HomehackLayout pageData={pageData} active="realmote">
      <Content />
    </HomehackLayout>
  );
}

function Content() {
  const { rootPath } = useSiteContext();

  return (
    <>
      <h3 className="ui header">{"概要"}</h3>
      <Grid stackable columns={2}>
        <GridColumn>
          <p>
            {
              "スマートフォンやタブレット端末のWebブラウザから、電灯やエアコン、自動掃除機ルンバなどの家電製品を遠隔操作できるようにした。"
            }
          </p>
          <h3 className="ui header">{"開発環境"}</h3>
          <ul>
            <li>
              {"Java + "}
              <SiteLink href={href(`${rootPath}ja/phybots/`)}>
                {"Phybots"}
              </SiteLink>
              {" on Mac OS X"}
            </li>
            <li>
              <a href={"https://www.buffalo.jp/product/detail/pc-op-rs1.html"}>
                {"パソコン用学習リモコン PC-OP-RS1"}
              </a>
            </li>
            <li>
              <a href={"https://www.sparkfun.com/products/684"}>
                {"ルンバ用Bluetoothインタフェース RooTooth"}
              </a>
            </li>
          </ul>
          <h3 className="ui header">{"資料"}</h3>
          <ul>
            <li>
              {"ブログ記事: "}
              <a
                href={
                  "https://blog.junkato.jp/ja/posts/2012-12-24-realmote-remote-control/"
                }
              >
                {"Realmoteで家のリモコンを一つにまとめる"}
              </a>
            </li>
            <li>
              {"ソースコード: "}
              <a href={"https://github.com/arcatdmz/realmote"}>
                <i className="icon-download"></i>
                {"GitHub"}
              </a>
            </li>
          </ul>
        </GridColumn>
        <GridColumn>
          <EmbedYoutube src={"//www.youtube.com/embed/bhbW39zoxyg"} />
        </GridColumn>
        <GridColumn>
          <SiteLink
            className="ui fluid image"
            href={href(`${rootPath}homehack/realmote-edit.jpg`)}
          >
            <SiteImage
              src={`${rootPath}homehack/thumbnails/realmote-edit.jpg`}
            />
          </SiteLink>
        </GridColumn>
        <GridColumn>
          <SiteLink
            className="ui fluid image"
            href={href(`${rootPath}homehack/realmote.jpg`)}
          >
            <SiteImage src={`${rootPath}homehack/thumbnails/realmote.jpg`} />
          </SiteLink>
        </GridColumn>
      </Grid>
    </>
  );
}
