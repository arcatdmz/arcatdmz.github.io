// Restored from the original 2015 PHP lecture; edit this JSX directly.
import { SiteLink } from "@/site/components/SiteLink";
import { SiteImage } from "@/site/components/SiteImage";
import { EmbedYoutube } from "@/site/components/ContentComponents";
import { CodePlayground } from "./CodePlayground";
export function Chapter1({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <h2 id={"intro"} className={"ui header"}>
          {"はじめに"}
        </h2>
        <p>
          {"講義に使うスライドは "}
          <SiteLink href={"/publications/151209-ce-slides.pdf"}>
            <i className={"file pdf icon"}></i>
            {" 151209-ce-slides.pdf"}
          </SiteLink>
          {" です。この講義の目標は次の3点です。"}
        </p>
        <ul>
          <li>{"プログラミングって何だっけ？を知る"}</li>
          <li>{"プログラミングでコンテンツを作ってみる"}</li>
          <li>{"プログラミングでプログラミング環境を作ってみる"}</li>
        </ul>
      </section>
      <hr className={"ui section divider"} />
      <section>
        <h2 id={"programming"} className={"ui header"}>
          {"プログラミングって何だっけ？"}
        </h2>
        <p>{"ブラウザのコンソールに入力してみよう:"}</p>
        <pre className="talk-code">
          <code>{"1+1;"}</code>
        </pre>
        <p>{"もう少し複雑な例:"}</p>
        <pre className="talk-code">
          <code>{'window.alert("Hello World!");'}</code>
        </pre>
        <p>{"こんなこともできる:"}</p>
        <pre className="talk-code">
          <code>
            {
              'var follow = function (tw) { tw.widgets.createFollowButton("arcatdmz", document.body).then(function (el) { el.style.position = "absolute"; el.style.top = "50%"; el.style.left = "50%"; el.style.transform = "scale(5)"; el.style.zIndex = 1000; }); };\nif (window.twttr) { follow(window.twttr); } else { var src = document.createElement("script"); src.src = "https://platform.twitter.com/widgets.js"; window.twttr = { _e: [ follow ] }; document.body.appendChild(src); }'
            }
          </code>
        </pre>
        <hr className={"ui section divider"} />
        <p className={"talk-note"}>
          {"※プログラミング環境の歴史について詳しく知りたい場合は"}
          <SiteLink
            href={
              "http://ide.digitalmuseum.jp/Integrated_development_environment/ja"
            }
          >
            {"環これ(統合開発環境これくしょん / IDE Collections)"}
          </SiteLink>
          {"を読んでみてください。リンク先は、"}
          <SiteLink href={"http://hdl.handle.net/2261/58372?locale=en"}>
            {"加藤の博士論文"}
          </SiteLink>
          {"から関連研究の章の一部を抜粋して和訳したものです。"}
        </p>
      </section>
    </>
  );
}

export function Chapter2({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <h2 id={"static-image"} className={"ui header"}>
          {"静止画を作る"}
        </h2>
        <CodePlayground
          active={active}
          drawing
          initialCode={
            "color(200, 0, 0);\nfor (var x = 0; x < 20; x ++) {\n  dot(Math.random() * width, Math.random() * height);\n  line(width / 2, height / 2, Math.random() * width, Math.random() * height);\n}"
          }
        />
        <ul>
          <li>
            <SiteLink href={"/ja/talks/as-a-code/p2.html"} className={"link"}>
              {"静止画を作る"}
            </SiteLink>
            {" (コードつきのURLは上の「コードを共有」ボタンから開けます)"}
          </li>
          <li>
            <SiteLink href={"http://sketchpad.cc/"}>{"Sketchpad.cc"}</SiteLink>
          </li>
          <li>
            <SiteLink href={"http://www.openprocessing.org/"}>
              {"OpenProcessing.org"}
            </SiteLink>
          </li>
        </ul>
      </section>
      <hr className={"ui section divider"} />
      <section>
        <h2 id={"video"} className={"ui header"}>
          {"動画を作る"}
        </h2>
        <ul>
          <li>
            <SiteLink href={"https://textalive.jp/"}>{"TextAlive"}</SiteLink>
            {" - Kinetic Typography for Everyone"}
          </li>
          <li>
            <SiteLink href={"http://gibber.mat.ucsb.edu/"}>{"Gibber"}</SiteLink>
          </li>
        </ul>
      </section>
      <hr className={"ui section divider"} />
      <section>
        <h2 id={"physical-objects"} className={"ui header"}>
          {"実物体を作る"}
        </h2>
        <ul>
          <li>
            <SiteLink href={"http://www.openscad.org/"}>{"OpenSCAD"}</SiteLink>
            {" - The Programmers Solid 3D CAD Modeller"}
          </li>
          <li>
            <SiteLink href={"http://shapejs.shapeways.com/"}>
              {"Shape.js"}
            </SiteLink>
            {" - Write Code, Generate Products"}
          </li>
          <li>
            <SiteLink href={"http://f3js.org/"}>{"f3.js"}</SiteLink>
            {" - Create IoT Purely by Code (公開準備中)"}
          </li>
        </ul>
      </section>
    </>
  );
}

export function Chapter3({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <h2 id={"intro"} className={"ui header"}>
          {"プログラミング環境を作る"}
        </h2>
        <CodePlayground active={active} storageKey="as-a-code-ide" />
        <ul>
          <li>
            <SiteLink href={"/ja/talks/as-a-code/ide/"}>
              {"10分で作る統合開発環境"}
            </SiteLink>
          </li>
        </ul>
      </section>
    </>
  );
}
