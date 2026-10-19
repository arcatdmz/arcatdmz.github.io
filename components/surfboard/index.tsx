import {
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Message,
  Segment,
} from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";

import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: message, abstract, gestures, hardware. */
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
        <ProjectHeader project="surfboard" />
        <Message>
          {en ? "Surfboard is open-sourced at " : "Surfboardのソースコードは"}
          <a href="https://github.com/arcatdmz/surfboard">GitHub</a>
          {en ? "." : "で公開されています。"}
        </Message>
        <Divider hidden />
        <section id="abstract">
          <Header as="h2">{en ? "Abstract" : "概要"}</Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <>
                  <p>
                    Surfboardは、キーボード上を手で撫でた時に生じる特異な音をキーボードの近くに取り付けたマイクで録音し、機械学習を用いてリアルタイムに検出する手法である。
                  </p>
                  <p>
                    キーボード上を打鍵入力に留まらないサーフェースコンピューティングの新たな場として開拓する取り組みで、これまでになく安価かつ簡単なハードウェアセットアップで実現可能な点に新規性がある。
                  </p>
                </>
              }
            >
              <p>
                We introduce a technique to detect simple gestures of "surfing"
                (moving a hand horizontally) on a standard keyboard by analyzing
                recorded sounds in real-time with a microphone attached close to
                the keyboard. This technique allows the user to maintain a focus
                on the screen while surfing on the keyboard. Since this
                technique uses a standard keyboard without any modification, the
                user can take full advantage of the input functionality and
                tactile quality of his favorite keyboard supplemented with our
                interface.
              </p>
            </LocalizedContent>
          </Segment>
        </section>
        <Divider hidden />
        <Grid stackable columns={2}>
          <Grid.Column>
            <section id="gestures">
              <Header as="h2">
                {en ? "Recognizable gestures" : "検出可能なジェスチャ"}
              </Header>
              <Segment basic>
                <LocalizedContent
                  ja={
                    <p>
                      Surfboardは、キーボードを撫でている状態（サーフィン）を検出できる。さらに、それが右向きか左向きか（ジェスチャ）を検出できる。これ以上複雑なジェスチャに関しては、キーボードの形状の特徴から困難と判断し、実装していない。
                    </p>
                  }
                >
                  <p>
                    Surfboard can recognize whether the user is surfing on a
                    keyboard or not. When the user surfs on a keyboard, it can
                    distinguish left to right or right to left surfing
                    directions.
                  </p>
                  <p>
                    We have not yet tested other motions like drawing circle or
                    more complex shapes because they would be difficult to
                    execute on a keyboard which is generally horizontally long.
                  </p>
                </LocalizedContent>
              </Segment>
            </section>
            <Divider hidden />
            <section id="hardware">
              <Header as="h2">
                {en ? "Supported hardware" : "対応ハードウェア"}
              </Header>
              <Segment basic>
                <LocalizedContent
                  ja={
                    <p>
                      Surfboardは、マイク入力のついた標準的なパーソナルコンピュータ上で動作する。とくに、ノートPCはキーボードの近くにマイクが元から据え付けてあることが多く、静かなオフィスなどの環境ではハードウェア的に何も細工をしなくてもSurfboardを利用できる。
                    </p>
                  }
                >
                  <p>
                    Our prototype implementation uses a monaural microphone
                    attached close to the keyboard of a personal computer. It
                    needs to be attached near the right or left edge of the
                    keyboard to distinguish surfing direction effectively.{" "}
                  </p>
                  <p>
                    Fortunately at present, many laptop computers are equipped
                    with a microphone, and we confirmed that Surfboard works at
                    a quiet office and a noisy cafeteria with built-in
                    microphones that are located at several different positions.
                  </p>
                </LocalizedContent>
              </Segment>
            </section>
            <Divider hidden />
          </Grid.Column>
          <Grid.Column>
            <EmbedYoutube src="//www.youtube.com/embed/QKtzsOU-sA8" />
            <div className="caption">
              <List horizontal>
                <List.Item>
                  <a href="//www.youtube.com/watch?v=QKtzsOU-sA8">
                    <Icon name="youtube" />
                    YouTube
                  </a>
                </List.Item>
              </List>
            </div>
            <Divider hidden />
            <LinkedImage
              fluid
              href={href(`${rootPath}surfboard/fig2-microphones.jpg`)}
            >
              <SiteImage src={`${rootPath}surfboard/fig2-microphones.jpg`} />
            </LinkedImage>
            <div className="caption">
              {en
                ? "Microphones attached close to keyboards"
                : "キーボードの近くに設置されたマイク"}
            </div>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <ProjectPublications
          project="surfboard"
          majorPublication="uist2010-kato-surfboard"
        />
      </SiteLayout>
    </>
  );
}
