import {
  Divider,
  Embed,
  Grid,
  Header,
  Icon,
  Item,
  Label,
  Segment,
} from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

import { SiteImage } from "@/site/components/SiteImage";
import { TranslateEn } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { href } from "@/site/rendering";
import type { PageDataProps } from "@/site/page-data";

import { HomehackLayout } from "@/components/homehack/HomehackLayout";
import { useSiteContext } from "@/site/components/SiteContext";

export default function Page({ pageData }: PageDataProps) {
  return (
    <HomehackLayout pageData={pageData}>
      <Content />
    </HomehackLayout>
  );
}

function Content() {
  const { rootPath, basePath, en } = useSiteContext();
  function renderProjects(): ReactNode {
    return (
      <>
        <Item>
          <LinkedImage
            ui={false}
            href={href(`${basePath}homehack/fungus-camera/`)}
          >
            <SiteImage src={`${rootPath}homehack/thumbnails/fungus-box.jpg`} />
          </LinkedImage>
          <Item.Content>
            <Item.Header
              as={SiteLink}
              href={href(`${basePath}homehack/fungus-camera/`)}
            >
              {en ? "Fungus Camera" : "なめこカメラ"}
            </Item.Header>
            <Item.Description>
              <p>
                なめこの生育を観察する定点カメラを開発した。冷暗所（玄関）での観察を可能にするため、明かりのON→撮影→OFFを自動で行ってくれるようなデバイスを作成した。
              </p>

              <p>
                ついでに、玄関の明かりのスイッチがドアから遠い問題（明かりをつけようとしている間にドアが閉まって真っ暗になる）を解決するため、このデバイスに近づくと明かりをONにして、遠ざかってしばらくするとOFFにする機能もつけた。
              </p>

              {en ? (
                <>
                  <p>
                    <TranslateEn path="homehack/index.pug" />
                  </p>
                </>
              ) : null}
            </Item.Description>
            <Item.Extra>
              <Label horizontal>
                <Icon name="calendar" />
                '12-13
              </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Divider hidden />
        <Item>
          <LinkedImage
            ui={false}
            href={href(`${basePath}homehack/rhythm-kaden/`)}
          >
            <SiteImage src={`${rootPath}homehack/rhythmkaden.jpg`} />
          </LinkedImage>
          <Item.Content>
            <Item.Header
              as={SiteLink}
              href={href(`${basePath}homehack/rhythm-kaden/`)}
            >
              {en ? "Rhythm-Kaden" : "リズム家電"}
            </Item.Header>
            <Item.Description>
              <p>
                ブラウザゲーム（音楽に合わせて上から降りてくるマーカーのタイミングに合わせてキーを押して得点を稼ぐ音楽ゲーム
                <a href="https://peraichi.com/landing_pages/view/otoge">
                  otoge.net
                </a>
                ）の進行を家電製品が盛り上げてくれるアプリケーションを、お茶の水女子大学
                西村、神奈川工科大学 藤崎とともに提案、開発した。
              </p>

              <p>
                本アプリケーションは、Sony
                CSLとお茶の水女子大学の共催ワークショップ「Home Hacker’s
                Workshop」の半日のセッションで制作された。また、Sony
                CSL、大和ハウス、ヤフーの共催イベント「
                <a href="https://www.daiwahouse.co.jp/lab/HousingAPI/symposium/index.html">
                  住宅をカスタマイズするためのシンポジウム
                </a>
                」で発表され、学生賞を受賞した。
              </p>

              {en ? (
                <>
                  <p>
                    <TranslateEn path="homehack/index.pug" />
                  </p>
                </>
              ) : null}
            </Item.Description>
            <Item.Extra>
              <Label horizontal>
                <Icon name="calendar" />
                '12
              </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Divider hidden />
        <Item>
          <LinkedImage ui={false} href={href(`${basePath}homehack/realmote/`)}>
            <SiteImage src={`${rootPath}homehack/thumbnails/realmote.jpg`} />
          </LinkedImage>
          <Item.Content>
            <Item.Header
              as={SiteLink}
              href={href(`${basePath}homehack/realmote/`)}
            >
              Realmote
            </Item.Header>
            <Item.Description>
              <p>
                スマートフォンやタブレット端末のWebブラウザから、電灯やエアコン、自動掃除機ルンバなどの家電製品を遠隔操作できるようにした。
              </p>

              {en ? (
                <>
                  <p>
                    <TranslateEn path="homehack/index.pug" />
                  </p>
                </>
              ) : null}
            </Item.Description>
            <Item.Extra>
              <Label horizontal>
                <Icon name="calendar" />
                '11-12
              </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      </>
    );
  }
  return (
    <>
      <Header as="h2">
        {en ? (
          <>
            Keynote speech at Home Hack Workshop
            <Header.Subheader>
              Japanese presentation at the domestic workshop
            </Header.Subheader>
          </>
        ) : (
          <>おうちハック発表会キーノートスピーチ</>
        )}
      </Header>
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={6}>
            <Embed active icon={false}>
              <iframe
                src="//www.slideshare.net/slideshow/embed_code/38527331"
                frameBorder="0"
                marginWidth={Number("0")}
                marginHeight={Number("0")}
                scrolling="no"
                allowFullScreen={Boolean(true)}
              ></iframe>
            </Embed>
          </Grid.Column>
          <Grid.Column width={10}>
            <p>
              Sony CSL大和田さんとPhysVis湯村さん主催のイベント「
              <a href="https://web.archive.org/web/20170625152327/http://kadecot.net/ouch-hack/">
                おうちハック発表会
              </a>
              」でキーノートスピーカーを拝命し、「
              <a
                href="https://www.slideshare.net/arcatdmz/home-hack"
                title="もっとおうちハックできるおうち開発環境に向けて─おうちハック事例集─"
                target="_blank"
              >
                もっとおうちハックできるおうち開発環境に向けて─おうちハック事例集─
              </a>
              」と題してこれまでの家ハック事例をまとめてご紹介しました。
            </p>

            <p>
              ご紹介したプロジェクトはほとんど
              <a href="https://github.com/arcatdmz">GitHub</a>
              上でソースコードが公開されています。みんなでHappy home hacking!
            </p>

            {en ? (
              <>
                <p>
                  <TranslateEn path="homehack/index.pug" />
                </p>
              </>
            ) : null}
          </Grid.Column>
        </Grid>
      </Segment>
      <Header as="h2">{en ? "Past projects" : "プロジェクト一覧"}</Header>
      <Segment basic>
        <Item.Group>{renderProjects()}</Item.Group>
      </Segment>
    </>
  );
}
