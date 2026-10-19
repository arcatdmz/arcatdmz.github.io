import { Divider, Header, Icon } from "react-fomantic-ui";

// Restored from the original 2015 PHP lecture; edit this JSX directly.
import { SiteLink } from "@/site/components/SiteLink";

import { CodePlayground } from "./CodePlayground";
export function Chapter1({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <Header as="h2" id="intro">
          はじめに
        </Header>
        <p>
          講義に使うスライドは{" "}
          <SiteLink href="/publications/151209-ce-slides.pdf">
            <Icon name="file pdf" /> 151209-ce-slides.pdf
          </SiteLink>{" "}
          です。この講義の目標は次の3点です。
        </p>
        <ul>
          <li>プログラミングって何だっけ？を知る</li>
          <li>プログラミングでコンテンツを作ってみる</li>
          <li>プログラミングでプログラミング環境を作ってみる</li>
        </ul>
      </section>
      <Divider section as="hr" />
      <section>
        <Header as="h2" id="programming">
          プログラミングって何だっけ？
        </Header>
        <p>ブラウザのコンソールに入力してみよう:</p>
        <pre className="talk-code">
          <code>{"1+1;"}</code>
        </pre>
        <p>もう少し複雑な例:</p>
        <pre className="talk-code">
          <code>{'window.alert("Hello World!");'}</code>
        </pre>
        <p>こんなこともできる:</p>
        <pre className="talk-code">
          <code>
            {
              'var follow = function (tw) { tw.widgets.createFollowButton("arcatdmz", document.body).then(function (el) { el.style.position = "absolute"; el.style.top = "50%"; el.style.left = "50%"; el.style.transform = "scale(5)"; el.style.zIndex = 1000; }); };\nif (window.twttr) { follow(window.twttr); } else { var src = document.createElement("script"); src.src = "https://platform.twitter.com/widgets.js"; window.twttr = { _e: [ follow ] }; document.body.appendChild(src); }'
            }
          </code>
        </pre>
        <Divider section as="hr" />
        <p className="talk-note">
          ※プログラミング環境の歴史について詳しく知りたい場合は
          <SiteLink href="http://ide.digitalmuseum.jp/Integrated_development_environment/ja">
            環これ(統合開発環境これくしょん / IDE Collections)
          </SiteLink>
          を読んでみてください。リンク先は、
          <SiteLink href="http://hdl.handle.net/2261/58372?locale=en">
            加藤の博士論文
          </SiteLink>
          から関連研究の章の一部を抜粋して和訳したものです。
        </p>
      </section>
    </>
  );
}

export function Chapter2({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <Header as="h2" id="static-image">
          静止画を作る
        </Header>
        <CodePlayground
          active={active}
          drawing
          initialCode="color(200, 0, 0);&#10;for (var x = 0; x &lt; 20; x ++) &#123;&#10;  dot(Math.random() * width, Math.random() * height);&#10;  line(width / 2, height / 2, Math.random() * width, Math.random() * height);&#10;&#125;"
        />
        <ul>
          <li>
            <SiteLink href="/ja/talks/as-a-code/p2.html" className="link">
              静止画を作る
            </SiteLink>{" "}
            (コードつきのURLは上の「コードを共有」ボタンから開けます)
          </li>
          <li>
            <SiteLink href="http://sketchpad.cc/">Sketchpad.cc</SiteLink>
          </li>
          <li>
            <SiteLink href="http://www.openprocessing.org/">
              OpenProcessing.org
            </SiteLink>
          </li>
        </ul>
      </section>
      <Divider section as="hr" />
      <section>
        <Header as="h2" id="video">
          動画を作る
        </Header>
        <ul>
          <li>
            <SiteLink href="https://textalive.jp/">TextAlive</SiteLink> -
            Kinetic Typography for Everyone
          </li>
          <li>
            <SiteLink href="http://gibber.mat.ucsb.edu/">Gibber</SiteLink>
          </li>
        </ul>
      </section>
      <Divider section as="hr" />
      <section>
        <Header as="h2" id="physical-objects">
          実物体を作る
        </Header>
        <ul>
          <li>
            <SiteLink href="http://www.openscad.org/">OpenSCAD</SiteLink> - The
            Programmers Solid 3D CAD Modeller
          </li>
          <li>
            <SiteLink href="http://shapejs.shapeways.com/">Shape.js</SiteLink> -
            Write Code, Generate Products
          </li>
          <li>
            <SiteLink href="http://f3js.org/">f3.js</SiteLink> - Create IoT
            Purely by Code (公開準備中)
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
        <Header as="h2" id="intro">
          プログラミング環境を作る
        </Header>
        <CodePlayground active={active} storageKey="as-a-code-ide" />
        <ul>
          <li>
            <SiteLink href="/ja/talks/as-a-code/ide/">
              10分で作る統合開発環境
            </SiteLink>
          </li>
        </ul>
      </section>
    </>
  );
}
