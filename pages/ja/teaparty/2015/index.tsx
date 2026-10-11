import { DeferredScript } from "@/site/components/DeferredScript";
import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import {
  classNames,
  style,
  text as plainText,
  keyed,
  href,
  attribute,
} from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/teaparty/2015/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const {
    histories,
    awards,
    talks,
    lectures,
    projects,
    projectsTable,
    products,
    selectedProjects,
    publications,
    publicationsTable,
    selectedPublications,
    media,
    mediaList,
    misc,
    moment,
    rootPath,
    protocol,
    domain,
    defaultImageUrl,
    defaultDescription,
    defaultJapaneseDescription,
    stripTags,
  } = data;
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

  p = projectsTable["teaparty"];
  title = "第4回 名状しがたいお茶会";
  me = p.project + "/";
  moment.locale(lang);
  const context: ReturnType<typeof getSiteData> & SiteContext = {
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
  const content = createContentComponents(context);

  return (
    <>
      <SiteLayout context={context}>
        <div className="ui breadcrumb">
          <a className="section" href={href(basePath + me)}>
            {richText("名状しがたいお茶会")}
          </a>
          <i className="right angle icon divider"></i>
          <div className="active section">{richText("第4回 (2015)")}</div>
        </div>
        <div className="ui divider"></div>
        <section>
          <h1 className="ui header">{richText("第4回 名状しがたいお茶会")}</h1>
          <div className="ui horizontal divided list">
            <div className="item">
              <span className="ui tiny basic label">
                <i className="calendar icon"></i>
                {richText("2015/1/24")}
              </span>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("summary")}>
          <div className="ui basic segment">
            <p>
              {richText(
                "アニメ、ゲーム、絵、音楽、小説など、面白いコンテンツを作る・作れる・作りたい人たちと、その活動を応援したい人たちの集まりです。お茶を飲みながらざっくばらんに語ります。カジュアルな勉強会のようなものとお考えください。2012年から、毎年一回程度のペースで開催しています。",
              )}
            </p>
            <p>
              {richText(
                "目的はいろいろありますが、その一つは、コンテンツ制作・鑑賞支援研究者、コンテンツ制作者、鑑賞者の距離を縮めることです。毎回、立場を超えて交流し、立場を超えて活動していきたいメンタリティの持ち主が集まっています。",
              )}
            </p>
            <p>
              {richText(
                "業界横断で濃い人たちの参加をお待ちしてます。初対面同士が多いお茶会なので、知り合いが少なくてちょっとひよりそうな人も、物怖じせずご参加ください。ついでに、濃い友達がいたら、ぜひ連れてきてください。",
              )}
            </p>
            <p>
              {richText(
                "今年の開催内容について、詳しくはFacebookのイベントページをご覧ください。",
              )}
            </p>
            <div className="ui horizontal list">
              <div className="item">
                <a
                  href={href(
                    "https://www.facebook.com/events/873913542653717/",
                  )}
                  title={"Facebook イベントページ"}
                >
                  <i className="facebook icon"></i>
                  {richText("Facebook")}
                </a>
              </div>
              <div className="item">
                <a
                  href={href(
                    "https://docs.google.com/forms/d/1xUDrcGYtj45wCRggYmnZGlljlsemq7DMZbj6oHJdZq8/viewform",
                  )}
                >
                  <i className="google icon"></i>
                  {richText("事後アンケート")}
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("timetable")}>
          <h2 className="ui header">{richText("タイムテーブル")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "例年になく人数が増えたため、話題ごとにセッションとしてまとまりを作りました。クリエータの方々の作品紹介「",
              )}
              <b>{richText("Creators' Showcase #1, #2")}</b>
              {richText("」と、テーマごとの「")}
              <b>{richText("科学・教育")}</b>
              {richText("」「")}
              <b>{richText("人・コンピュータ・知能")}</b>
              {richText("」「")}
              <b>{richText("ゲーム")}</b>
              {richText("」「")}
              <b>{richText("海外動向")}</b>
              {richText("」「")}
              <b>{richText("五感に訴えるコンテンツ")}</b>
              {richText("」「")}
              <b>{richText("コンテンツ理解・生成")}</b>
              {richText("」、そして1分自己紹介「")}
              <b>{richText("Shotgun Session")}</b>
              {richText("」です。")}
            </p>
            <p>
              {richText("計")}
              <b>{richText("9")}</b>
              {richText("セッション、")}
              <b>{richText("7時間")}</b>
              {richText(
                "に及ぶ発表と議論からなる欲張りなタイムテーブルです。頭をフル回転させ、全速力でお楽しみください。",
              )}
            </p>
            <iframe
              src={
                "https://docs.google.com/spreadsheets/d/1FqBKPyTiFDegmcOIcpRNEujx9yga4crkXvjVKMxsf9Y/pubhtml?gid=1689693383&single=true&widget=true&headers=false"
              }
              style={style("width: 100%; height: 400px;")}
            ></iframe>
            <div className="ui hidden divider"></div>
          </div>
        </section>
        <section id={attribute("details")}>
          <h2 className="ui header">{richText("時と場所")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "2015年1月24日 13時より、DMM.make AKIBA BASEで開催されます。",
              )}
            </p>
            <p>
              {richText(
                "DMM.make AKIBA BASEは入り口にセキュリティゲートがあります。開場時間近辺はスタッフの方が開けてくださいますが、もし遅れる場合は",
              )}
              <a href={href("https://twitter.com/arcatdmz")}>
                {richText("@arcatdmz")}
              </a>
              {richText(
                "または #teaparty2015 でツイートするなどして中の人にご連絡ください。",
              )}
            </p>
          </div>
          <div id={attribute("map-canvas")}></div>
          <h2 className="ui header">{richText("設備")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "電源、電源タップ、Wi-Fiがあります。ただ、Wi-Fiは多人数で同時接続すると不安定になることがあるため、インターネット接続が必須の方はご自身で用意していただくようおお願いします。",
              )}
            </p>
            <p>
              {richText(
                "プロジェクタは解像度1280x720ピクセル(16:9)で、HDMI、mini DisplayPort、VGA接続が可能です。",
              )}
            </p>
          </div>
          <h2 className="ui header">{richText("参加費")}</h2>
          <div className="ui basic segment">
            <p>
              {richText("学生")}
              <b>{richText("1000")}</b>
              {richText("円、社会人")}
              <b>{richText("2500")}</b>
              {richText(
                "円を予定しています。13-18時までお菓子とお茶が出るほか、18-20時まで夕飯とドリンクのケータリングが手配されています。",
              )}
            </p>
          </div>
          <h2 className="ui header">
            {richText("Togetter")}
            <div className="ui basic segment togetter">
              <DeferredScript
                src={"//togetter.com/js/parts.js"}
                dangerouslySetInnerHTML={{ __html: "" }}
              />
              <DeferredScript
                dangerouslySetInnerHTML={{
                  __html:
                    "if (typeof tgtr !== 'undefined') tgtr.ExtendWidget({id:'774222',url:'https://togetter.com/'});",
                }}
              />
            </div>
          </h2>
        </section>
        <div className="ui divider"></div>
        <div className="ui breadcrumb">
          <a className="section" href={href(basePath + me)}>
            {richText("名状しがたいお茶会")}
          </a>
          <i className="right angle icon divider"></i>
          <div className="active section">{richText("第4回 (2015)")}</div>
        </div>
      </SiteLayout>
      <DeferredScript
        type={"text/javascript"}
        src={"//maps.googleapis.com/maps/api/js?v=3.exp"}
        dangerouslySetInnerHTML={{ __html: "" }}
      />
      <DeferredScript
        dangerouslySetInnerHTML={{
          __html:
            "function initializeMap(){\n  if (typeof google === 'undefined' || !google.maps) return;\n  var latlng = new google.maps.LatLng(35.700514, 139.774166)\n  var mapOptions = {\n    zoom: 15,\n    center: latlng\n  };\n  map = new google.maps.Map(document.getElementById('map-canvas'),\n  mapOptions);\n  var marker = new google.maps.Marker({\n  position: latlng,\n  map: map,\n  title: 'DMM.make AKIBA'\n  });\n}\nif (document.readyState === 'complete') initializeMap();\nelse window.addEventListener('load', initializeMap, { once: true });",
        }}
      />
    </>
  );
}
