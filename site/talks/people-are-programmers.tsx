import {
  Button,
  Divider,
  Grid,
  Header,
  Image,
  Message,
} from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

// Restored from the original 2015 PHP lecture; edit this JSX directly.
import { SiteLink } from "@/site/components/SiteLink";
import { SiteImage } from "@/site/components/SiteImage";
import { EmbedYoutube } from "@/site/components/ContentComponents";

export function Chapter1({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <Header as="h2" id="intro">
          自己紹介・はじめに
        </Header>
        <p>
          講演タイトルの「ぼくらのプログラミング」は過去の話、「みんなのプログラミング」はこれからの話です。
        </p>
        <p>
          前者は英語では "programmers are people, too"
          になりますが、これは直訳すれば「プログラマだって人である」という意味です。プログラマってエンドユーザが使いやすいものを作るためには頑張りますが、自分で使う道具は意外なほど無頓着だったりすることがあって、これは「いや人間なんだし」って強調して、もうちょっと人間的なファクターを考慮に入れてこうっていう標語です。
        </p>
        <p>
          後者は英語では "people are programmers"
          で、僕が勝手に作った標語です。プログラマが使いやすい道具を使うだけでなく、その恩恵にみんなが与れるような未来を夢想して作ったものです。
        </p>
        <p className="talk-note">
          ※ "programmers are people, too" 初出はおそらく
          <SiteLink href="https://queue.acm.org/detail.cfm?id=1071731">
            2005年の国際学会ACM学会誌
          </SiteLink>
          で、
          <SiteLink href="http://www.cs.cmu.edu/~NatProg/papers/Myers2012ICSE_Talk.pdf">
            2012年の業界著名人による国際会議での招待講演
          </SiteLink>
          でもほぼ同じ言葉が使われています。 "people are programmers" は
          <SiteLink href="/ja/blog">僕のブログ</SiteLink>
          のタイトルになっています。
        </p>
        <p>
          <SiteImage
            ui
            fluid
            src="/ja/talks/people-are-programmers.old/P9206331-trim.jpg"
            alt="情報科学若手の会での講演"
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 933px, 1127px"
          />
        </p>
        <p>
          未成年の方もいるということで、高校の頃から何をしてきたか簡単にご紹介します。
        </p>
        <p className="talk-note">
          ※詳細は略しますが、どのスライド画像も関連するウェブサイトへのリンクになっています。
        </p>
        <Grid stackable>
          <Grid.Column width={4}>
            <LinkedImage bordered fluid href="http://digitalmuseum.jp">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-01.jpg"
                alt="digitalmuseum 電網美術館"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </LinkedImage>
          </Grid.Column>
          <Grid.Column width={4}>
            <LinkedImage bordered fluid href="http://sci.digitalmuseum.jp">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-02.jpg"
                alt="立花隆ゼミ（SCI/サイ）"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </LinkedImage>
          </Grid.Column>
          <Grid.Column width={4}>
            <LinkedImage bordered fluid href="/ja/homehack">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-03.jpg"
                alt="おうちハック"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </LinkedImage>
          </Grid.Column>
          <Grid.Column width={4}>
            <LinkedImage bordered fluid href="/ja/openpool">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-04.jpg"
                alt="OpenPool"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </LinkedImage>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-05.jpg"
                alt="講演スライド 05"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              今は何をやっているかというと、
              <SiteLink href="http://www.aist.go.jp/">
                産業技術総合研究所
              </SiteLink>
              <SiteLink href="http://itri.aist-go.jp/">
                情報技術研究部門
              </SiteLink>
              <SiteLink href="https://staff.aist.go.jp/masahiro.hamasaki/mig/">
                メディアインタラクション研究グループ
              </SiteLink>{" "}
              研究員として、Human-Computer Interactionの研究をしています。
            </p>
            <p>
              Human-Computer Interaction (HCI)は
              <b>人とコンピュータの関係改善</b>
              を目指す学問ですが、なかでも僕は、統合開発環境（Integrated
              Development Environment, IDE）の研究開発を通して
              <b>プログラミング体験の改善</b>
              に取り組んできました。これは、HCIとプログラミング言語（PL）の境界領域にある学際研究です。
            </p>
            <p>
              一番根っこにあるのは、人々が快適に楽しく過ごすための
              <b>仕組み</b>
              作りをしたいという気持ちです。
            </p>
            <p className="talk-note">
              ※統合開発環境の研究についてご興味のある方はブログ記事
              <SiteLink href="https://blog.junkato.jp/ja/posts/2012-11-21-devenv-research-hci/">
                “開発環境の研究”とは？ / HCI編
              </SiteLink>
              と
              <SiteLink href="https://blog.junkato.jp/ja/posts/2013-09-16-devenv-research-hci-retreat/">
                補遺
              </SiteLink>
              を読んでみてください。さらに深追いしたい場合は
              <SiteLink href="https://blog.junkato.jp/ja/posts/2013-09-27-devenv-research-labs/">
                開発環境研究をしているラボ一覧
              </SiteLink>
              や、
              <SiteLink href="http://ide.digitalmuseum.jp/Integrated_development_environment/ja">
                開発環境これくしょん（環これ）の統合開発環境の歴史に関する記事
              </SiteLink>
              も参考になると思います。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={4}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-06.jpg"
                alt="講演スライド 06"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-07.jpg"
                alt="講演スライド 07"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              突然ですが、僕
              <b>仕組み</b>
              萌えなんですよ。例えばこの写真は取っ手一つが眼筋一つに対応していて、それぞれを引っ張ることで目の動きが分かる模型です。次の写真は計算尺の一種です。
            </p>
            <p>
              一度作ったらずっと機能するのって、素敵じゃないですか。とくに、美しい仕組みを見ると本当に胸が震えます。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={4}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-08.jpg"
                alt="講演スライド 08"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-09.jpg"
                alt="講演スライド 09"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              これまでやってきたことの共通点を考えてみると、僕はずっと、
              <b>仕組み</b>
              を作ってきたんだと思うんです。それも、今すでにある仕組みを疑って、自分なりにどうすればよくなるか考えて、作ってきました。
            </p>
            <p>
              今日の講演の目標は、みなさんにも今現在プログラミングのために使っている
              <b>仕組み</b>
              を疑ってもらい、歴史を知って、この先どうなるか考えていただくことです。さらに、プログラミングに限らず社会がどうなっていくのか、考えてみてほしいです！
            </p>
            <p className="talk-note">
              ※僕がこれまでに作ってきた仕組みの一覧は
              <SiteLink href="/ja">トップページ</SiteLink>
              にあります。
            </p>
          </Grid.Column>
        </Grid>
      </section>
    </>
  );
}

export function Chapter2({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <Header as="h2" id="for-us">
          ぼくらのプログラミング
        </Header>
        <p>
          まず、プログラミングのための環境（統合開発環境）の歴史を簡単に振り返ってみます。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-11.jpg"
                alt="講演スライド 11"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-12.jpg"
                alt="講演スライド 12"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          プログラミング行為がコンピュータの中で閉じてインタラクティブにできるようになったのが1960年代のことです。それ以来50年が経ちましたが、インタフェースの大部分が文字列ベースという点は変わっていません。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-13.jpg"
                alt="講演スライド 13"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-14.jpg"
                alt="講演スライド 14"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-15.jpg"
                alt="講演スライド 15"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              統合開発環境が文字ベースのインタフェース主体のままである一方、開発されるアプリケーションの種類はだいぶ変わって、増えてきました。
            </p>
            <p>
              最近だと、実世界のデータを利用するプログラムが増えてきています。カメラからの入力を受け取ったり、ロボットに出力を返したりするものです。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          こういうプログラムを開発するとき、従来のGraphical User
          Interface（GUI）を利用するプログラムと違うのは、実行環境がコンピュータの外にあるということです。
        </p>
        <p>
          GUIのプログラムではマウス入力やキーボード入力は断続的で、値もだいたい定数で表せるので、文字ベースのインタフェースでも情報の提示が容易にできます。一方、実世界のデータはもっと連続的で、値は時系列に変化します。ブレークポイントでプログラムを止めたりすると、データの流れが途切れます。このように、文字ベースのインタフェースをそのまま使っていては、デバッグが非常に難しいという問題があります。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-16.jpg"
                alt="講演スライド 16"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-17.jpg"
                alt="講演スライド 17"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          実世界データを伴うプログラム開発の難しさを解決するためには、いろいろな方法が考えられます。なかでも、僕が提案してきた画像表現を統合する3つの方法（Integrated
          Graphical Representations, 博士論文の内容）を簡単に紹介します。
        </p>
        <p className="talk-note">
          ※博士論文の内容に興味を持ってくださった方には、まず日本語で書かれた
          <SiteLink href="http://www.ipsj.or.jp/magazine/hakase/HCI02.html">
            2013年度 研究会推薦博士論文
          </SiteLink>
          をお薦めしています。ライブプログラミング（Live
          Programming）の観点で博論をまとめ直した文章は、
          <SiteLink href="/publications/spro2014-kato-live-condensed.pdf">
            実世界Live Programmingの実現に向けて
          </SiteLink>
          にまとまっています。次に、博士論文を構成する3プロジェクトの個別の紹介ページでデモ動画をご覧ください。論文そのものも、
          <SiteLink href="http://hdl.handle.net/2261/58372">
            東京大学学術機関リポジトリ: Integrated Graphical Representations for
            Development of Programs with Real-world Input and Output（邦題:
            実世界入出力を伴うプログラムの画像表現を用いた開発支援手法）
          </SiteLink>
          で閲覧できます。
        </p>
        <Divider section as="hr" />
        <p>
          一つ目が、名前のつけられない情報を文字列の代わりに
          <b>写真</b>
          で表すというものです。
        </p>
        <p>
          統合開発環境Picodeでは、人やロボットの姿勢情報を表すのに写真を使います。写真をソースコードの中にドラッグ＆ドロップできて、それをそのままコンパイル＆実行できます。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-18.jpg"
                alt="講演スライド 18"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <EmbedYoutube src="https://www.youtube.com/embed/cQv0-4f8LEA" />
            <p className="talk-note">
              ※詳細は
              <SiteLink href="/ja/picode">Picode</SiteLink>
              の紹介ページを見てみてください。写真入りのサンプルコードも掲載されています。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          二つ目が、プログラムが実行された時系列の内容を
          <b>動画</b>
          で表すというものです。
        </p>
        <p>
          統合開発環境DejaVuは、プログラムが実行されているときカメラから受け取った入力、ユーザが指定した変数の内容、ウィンドウへの出力をすべて録画します。（これはMicrosoft
          Researchインターン時の成果です。）
        </p>
        <p>
          録画内容は、好きな速度で再生することができます。また、プログラムの内容を変えて録画入力を流し込むことで、一度カメラの前で行った動作をテストケースとして何度も活用できます。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-19.jpg"
                alt="講演スライド 19"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <EmbedYoutube src="https://www.youtube.com/embed/k5USoB7ZPPk" />
            <p className="talk-note">
              ※詳細は
              <SiteLink href="/ja/dejavu">DejaVu</SiteLink>
              の紹介ページを見てみてください。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          三つめは、
          <b>プログラムを書く前に入力データを用意</b>
          して、その具体例をグラフィカルに操作することでプログラムを書いていくというものです。
        </p>
        <p>
          統合開発環境VisionSketchは、動画に対して画像処理を行うプログラムを開発するためのビジュアルプログラミング環境です。
        </p>
        <p>
          ユーザは、まず動画ファイルやカメラ入力などの入力ソースを選択します。そして、入力ソースの動画像に対して矩形や円を描いてアノテーションを行い、画像処理のメソッドをその範囲に対して適用できるものに絞り込むことができます。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-20.jpg"
                alt="講演スライド 20"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <EmbedYoutube src="https://www.youtube.com/embed/I6FTOVygHxc" />
            <p className="talk-note">
              ※詳細は
              <SiteLink href="/ja/visionsketch">VisionSketch</SiteLink>
              の紹介ページを見てみてください。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-21.jpg"
                alt="講演スライド 21"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              これまで見てきたように、最近のプログラムはさまざまな種類のデータを取り扱う必要があります。そのようなプログラムを開発するためには、ロジックだけを文字で開発するような統合開発環境では不十分です。
            </p>
            <p>
              具体例として、視覚的な情報を扱うプログラムを主に紹介してきましたが、データが重要なプログラムとしては、最近流行りの機械学習などもあります。
            </p>
            <p>
              データがないと意味がないということで、プログラムよりもデータのほうが大事な時代に差し掛かってきているとも考えられます。
            </p>
            <p>
              「開発」には、プログラム開発だけでなくデータの「制作」も必須となり、プログラム開発のプロセスの中でその間の境界が消失する時代がくると思います。そんな時代の開発環境では、プログラムを開発する機能と同等、あるいはそれ以上に、データを編集、制作できる機能が重要視されるでしょう。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-22.jpg"
                alt="講演スライド 22"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              これからの開発環境は、プログラムで利用されるデータを直感的に扱えるようなインタフェースが必要になります。その際は、データを制作・編集できるツールの知見を活かせるはずです。（例えば写真を使うなら写真編集ツール、動画を使うなら動画編集ツールのインタフェースを援用できるでしょう。）
            </p>
            <p>
              また、今日の講演では触れませんが、視覚以外の、五感をフルに活用することも必要となってくるはずです。例えば、触覚フィードバックを伴うプログラムを開発するときには、文字では触覚は正確に表せないし、視覚でも不十分でしょう。
            </p>
            <p>
              こうして考えてみると、音楽や動画といったメディアコンテンツを特別扱いやすくした統合開発環境が、近々ウェブ上に現れるのではないか、という予想が立ちます。
            </p>
            <p>
              お気づきの方もいらっしゃるかと思いますが、そんな統合デザイン環境を実際に作ってみました、というのがこれからお話しする「みんなのプログラミング」です。
            </p>
          </Grid.Column>
        </Grid>
      </section>
    </>
  );
}

export function Chapter3({ active }: { active: boolean }) {
  return (
    <>
      <section>
        <Header as="h2" id="for-all">
          みんなのプログラミング
        </Header>
        <p>
          先ほどまでお話ししていた実世界系のプログラム開発から離れて、歌詞アニメーションについて少し紹介します。歌詞アニメーションは、歌詞の発声に合わせて文字が動いたりいろいろな演出があって楽しめる動画表現です。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-25.jpg"
                alt="講演スライド 25"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <EmbedYoutube src="https://www.youtube.com/embed/videoseries?list=PLb6OjFoBksmvxmoCh_KNaBzu1-RyCeHeW" />
            <p className="talk-note">
              ※これ以外の演出例については
              <SiteLink href="https://textalive.jp/templates">
                TextAliveのテンプレート一覧
              </SiteLink>
              を見てみてください。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          このように楽しい歌詞アニメーションを容易に作成できるのが、
          <SiteLink href="https://textalive.jp">TextAlive</SiteLink>
          というウェブサービスです。楽曲と歌詞のURLを指定するだけで、産総研の謎技術が歌詞の発声タイミングを自動推定し、ブラウザ上で動画を自動的に合成してくれます。1クリックで動画全体の演出を切り替えられます。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-26.jpg"
                alt="講演スライド 26"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <EmbedYoutube src="https://www.youtube.com/embed/LFA9eLvuHxo" />
            <p className="talk-note">
              ※講演ではTextAliveのウェブサイトを表示してデモしました。この動画と同じように、
              <SiteLink href="https://textalive.jp/songs/staff.aist.go.jp%2Ft.nakano%2Fmusic%2FVocaWatcher.Packaged.Megpoid.mp3">
                Packagedという楽曲の情報ページで自動的に合成された歌詞アニメーションを表示
              </SiteLink>
              しました。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          さらに、内容を詳しく自分好みに編集するための直感的なインタフェースも備えています。歌詞アニメーションを自動的に合成する機能はあくまで最初の一歩で、その先の高度な編集までサポートする制作支援ツールです。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-27.jpg"
                alt="講演スライド 27"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <EmbedYoutube src="https://www.youtube.com/embed/n88NsJvkLBM" />
            <p className="talk-note">
              ※講演ではTextAliveのウェブサイトを表示してデモしました。
              <SiteLink href="https://textalive.jp/videos/new?song=staff.aist.go.jp%2Ft.nakano%2Fmusic%2FVocaWatcher.Packaged.Megpoid.mp3&amp;style=pop">
                Packagedという楽曲から自動的に合成された歌詞アニメーションを編集
              </SiteLink>
              しました。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <p>
              …ちょっと待てよ、と。この講演、タイトルに「プログラミング」って入ってます。単なる歌詞アニメーション制作ツールの紹介をして何なんだろう、とお思いの方もいるかもしれません。どこが「プログラミング」なのかと。
            </p>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-28.jpg"
                alt="講演スライド 28"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid>
        <Divider section as="hr" />
        <p>
          TextAliveは、制作ツールの皮をかぶった統合開発環境になっています。通常の動画共有サービスでは、ラスタ画像で表されるフレームを高速に切り替えて動画を表示していますが、TextAliveの動画はすべて時間の関数で定義されています。動画＝時刻tを与えるとフレームの内容を描画して返す関数です。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-29.jpg"
                alt="講演スライド 29"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <Message>
              <p>この講演のTextAlive APIデモは移行準備中です。</p>
              <Button
                role="link"
                primary
                as={SiteLink}
                href="https://textalive.jp/"
              >
                TextAliveで歌詞アニメーションを見る
              </Button>
            </Message>
            <p className="talk-note">
              ※講演当時のデモでは、時刻tを指定して、その時刻の文字アニメーションを描画できました。APIを使った実演の復元は今後行います。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          通常の動画制作ツールでは演出の種類を増やそうと思ったら、別途開発環境を用意する必要などがあって、何かと手間がかかるものです。しかし、TextAliveは開発環境がビルトインされているので、時刻tを与えるとその時刻における動画演出を返す関数を直接開発できます。このように、明示的にプログラムを終了させたり起動させ直す必要がなく、プログラミングした結果がすぐに見えるインタラクションは
          <b>ライブプログラミング</b>
          と呼ばれています。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-30.jpg"
                alt="講演スライド 30"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <EmbedYoutube src="https://www.youtube.com/embed/5XdhGCTJEXA" />
            <p className="talk-note">
              ※講演ではTextAliveのウェブサイトを表示してデモしました。
              <SiteLink href="https://textalive.jp/templates/DrawFlower/346">
                花びらを描くDrawFlowerテンプレートの内容を書き換えて動画にすぐ反映するライブプログラミング
              </SiteLink>
              をお見せしました。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <p>
              また重大な疑問が浮かんできますね。この講演、タイトルに「みんなの」って入ってます。今のままでは、プログラミングが初めからできる人しか嬉しくなくて、「みんなの」プログラミングではありません。
            </p>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-31.jpg"
                alt="講演スライド 31"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid>
        <Divider section as="hr" />
        <p>
          実は、先ほどプログラミングして新しく作った演出は、コミットすればみんなが使えるようになります。さらに、ソースコード中に特別なコメントを書き入れれば、みんなが好きに調節できるようになります。
        </p>
        <p>
          このように、
          <b>誰かがプログラミングするとみんなが幸せになる</b>
          のがTextAliveです。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-32.jpg"
                alt="講演スライド 32"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <pre className="talk-code">
              {"// "}
              <b>{"@ui"}</b>
              {" Slider(3, 30)\n// "}
              <b>{"@title"}</b>
              {" 花びらの枚数\nthis.leaves = 5;"}
            </pre>
            <Message>
              <p>この講演のTextAlive APIデモは移行準備中です。</p>
              <Button
                role="link"
                primary
                as={SiteLink}
                href="https://textalive.jp/"
              >
                TextAliveで歌詞アニメーションを見る
              </Button>
            </Message>
            <p className="talk-note">
              ※講演当時のデモでは、スライダーで花びらの枚数を3〜30枚に変更できました。APIを使った実演の復元は今後行います。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-33.jpg"
                alt="講演スライド 33"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              TextAliveには、プログラマが普段から利用しているさまざまな
              <b>仕組み</b>
              も組み込まれています。
            </p>
            <p>
              例えば
              <SiteLink href="https://textalive.jp/videos/166#history">
                歌詞アニメーションの作成履歴はすべて保存されています
              </SiteLink>
              し、
              <SiteLink href="https://textalive.jp/videos/179#contributors">
                歌詞アニメーションの作成に貢献した人たちの名前が一覧表示されます
              </SiteLink>
              。
            </p>
            <p>
              このように、動画制作支援サービスでありながら、随所にプログラマ的思想が反映されているのが、TextAliveです。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <p>
          さらに、TextAliveでは動画が関数で表されているので、フレームレートや画面解像度はパラメタを調整するだけでいくらでも細かくできます。
        </p>
        <p>
          例えばDVD画質のアニメをBlu-ray画質にするには大変な手間がかかりますが、TextAliveでは計算資源さえあれば動画をどんな解像度にもできます。
        </p>
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-34.jpg"
                alt="講演スライド 34"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <Message>
              <p>この講演のTextAlive APIデモは移行準備中です。</p>
              <Button
                role="link"
                primary
                as={SiteLink}
                href="https://textalive.jp/"
              >
                TextAliveで歌詞アニメーションを見る
              </Button>
            </Message>
            <p className="talk-note">
              ※講演当時のデモでは、スライダーで動画を100倍まで拡大できました。APIを使った実演の復元は今後行います。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <p>
              そんなTextAliveですが、先日
              <SiteLink href="https://www.aist.go.jp/aist_j/press_release/pr2015/pr20150908/pr20150908.html">
                産総研からプレスリリース
              </SiteLink>
              を行い、一般公開されています。
            </p>
            <Image bordered fluid as="div">
              <SiteLink href="https://textalive.jp">
                <SiteImage
                  ui
                  fluid
                  src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-35.jpg"
                  alt="講演スライド 35"
                  sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
                />
              </SiteLink>
            </Image>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-36.jpg"
                alt="講演スライド 36"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              ここで、講演前半「ぼくらのプログラミング」の最後にお見せしたスライドを再掲します。
            </p>
            <blockquote>
              これからの開発環境は、プログラムで利用されるデータを直感的に扱えるようなインタフェースが必要になります。その際は、データを制作・編集できるツールの知見を活かせるはずです。
            </blockquote>
            <blockquote>
              こうして考えてみると、音楽や動画といったメディアコンテンツを特別扱いやすくした統合開発環境が、近々ウェブ上に現れるのではないか、という予想が立ちます。
            </blockquote>
            <p>
              そんな
              <b>統合デザイン環境</b>
              とでも呼ぶべき、未来の統合開発環境の実例の一つとして、
              <SiteLink href="https://textalive.jp">TextAlive</SiteLink>
              を紹介しました。どのあたりが未来なのか、改めてその特徴を振り返ってみましょう。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-37.jpg"
                alt="講演スライド 37"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              統合デザイン環境は、データの編集機能が非常に直感的なためプログラマ以外でも利用できます。しかしながら、基本的には統合開発環境の延長上にあり、当然ですがプログラミングできなくてはいけません。それも、環境そのものをユーザがプログラミングして強化していけることが必要だと、僕は考えています。そうして機能を強化・拡張した結果は、みんなで活用できるべきです。
            </p>
            <p className="talk-note">
              ※何でもかんでもプログラミングできればいいというふうにSmalltalk的な世界観を採用してしまうと、機能が壊れることがあります。必須機能は壊せないように守りつつ、強化できる部分は積極的にプログラマへ晒していくことが重要です。この点は
              <SiteLink href="/publications/wiss2014-kato-textalive.pdf#page=6">
                WISS 2014投稿論文の「未来ビジョン」
              </SiteLink>
              で議論しました。
            </p>
            <p>
              次に、統合デザイン環境はプログラマ的な方法で運用されます。バージョン管理や貢献の可視化のような、プログラマの間では当たり前の文化を積極的に取り込んでいくべきだと思います。
            </p>
            <p>
              最後に、プログラミングならではの利点を最大限活かせるように設計されるべきです。メリットにはいろいろあります。例えば時間解像度と空間解像度が無限大の動画かもしれません。転送サイズがコンパクトなことかもしれません。（少なくとも、個々の動画が数十MB以上もあるようだと、転送量や処理能力の都合上、一般公開は難しかったと思います。実質テキストデータしか送っていないからこそ、そこまでコストをかけずに運営できています。）
            </p>
            <p>
              これらは、すべて
              <b>
                「プログラミング＝
                <span className="talk-emoji">🆒</span>」
              </b>
              という設計思想に基づいて作られています。今回TextAliveでは歌詞アニメーションというアプリケーションを実現しましたが、他の応用ももちろん可能だと考えていて、今後も研究開発を続けていくつもりです。
            </p>
            <p className="talk-note">
              ※この技術などの商用利用にご興味がありましたら、
              <SiteLink href="https://textalive.jp/about#team">
                産総研 TextAliveチーム
              </SiteLink>
              までご連絡ください。
            </p>
          </Grid.Column>
        </Grid>
        <Divider section as="hr" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Image bordered fluid as="div">
              <SiteImage
                ui
                fluid
                src="/ja/talks/people-are-programmers.old/slides/wakate2015-kato-slides-38.jpg"
                alt="講演スライド 38"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 450px, 550px"
              />
            </Image>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              以上、駆け足でしたが、プログラミングの過去を振り返り、未来について考えてきました。
            </p>
            <blockquote>
              今日の講演の目標は、みなさんにも今現在プログラミングのために使っている
              <b>仕組み</b>
              を疑ってもらい、歴史を知って、この先どうなるか考えていただくことです。さらに、プログラミングに限らず社会がどうなっていくのか、考えてみてほしいです！
            </blockquote>
            <p>
              改めて講演冒頭のスライドを再掲しました。いかがだったでしょうか？ご清聴ありがとうございました！
            </p>
          </Grid.Column>
        </Grid>
      </section>
    </>
  );
}
