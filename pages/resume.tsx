import { SiteLink, SitePathContext } from "@/site/components/SiteLink";
import Head from "next/head";
import { Fragment, type ReactNode } from "react";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { HtmlContent } from "@/site/components/RichText";

/** The résumé retains its independent print layout and original inline stylesheet. */
const resumeStyles = `@import url(https://fonts.googleapis.com/css?family=Merriweather:400,700,400italic&amp;subset=latin,latin-ext);

body { margin: 0; padding: 0; font-size: 10pt; font-family: 'Merriweather', serif; line-height: 150%; }
code { font-family: 'Merriweather', serif; font-size: inherit; background: #eee; }
#menu { position: fixed; right: 0; bottom: 0; left: 0; background: #f6f6f6; border: solid #000; border-width: 1px 0 0 0; }
#menu ul { margin: 0 auto; padding: 0 5px 5px 5px; }
#menu li { display: inline-block; margin: 5px 0 0 0; padding: 2px 7px; border: #ccc solid; border-width: 0 0 0 1px; }
#menu li:first-child { border: none; }
#menu ul, #menu li { list-style-type: none; }
#menu a { border: none; }

#container { margin: 0.5cm auto; padding-bottom: 2em; width: 180mm; }
#updated { text-align: right; }
footer { text-align: center; }

h1, hr { border: solid #eee; border-width: 0 0 0.75pt 0; }
h1, h2 { margin: 1em 0 0 0; }
h1 { margin-bottom: 1em; padding: 0 0 0.4em 0; font-size: 18pt; }
h2 { margin-bottom: 0; padding: 0.4em 0; font-size: 10pt; text-transform: uppercase; }
h2:first-letter { font-size: 12pt; }
hr { margin: 1em 0; padding: 0; }

h3 { margin: 0.3em 0 0.2em 0; padding: 0.3em 0 0 0; font-size: 10pt; }
h4 { margin: 0.1em 0; font-size: 11pt; }

h4.wp { margin: 0.3em 0 0 0; }
h4.wp p { margin: 0.3em 0; color: #999; font-size: 10pt; }

p, ul, dl { margin: 0.3em 0 0.8em 0; padding: 0; }
dl { margin: 0; }
ul { margin-left: 2em; }

a { color: #000; text-decoration: none; }
a.link { text-decoration: underline; }
a:hover { color: #c00; text-decoration: underline; }

abbr { text-decoration: none; }

dt, dd, .left, .right { margin: 0; padding: 0; }
dt, .left { float: left; }
dd, .right { margin: 0.3em 0; }

dt { width: 18%; padding-right: 0.3em; text-align: right; font-size: 9pt; }
dd { margin-left: 18%; }
dt::after { content: ":"; }

.row { display: flex; margin-bottom: 0.5em; }
.row > .year { width: calc(18% - 0.5em); margin-right: 0.5em; padding-top: 0.2em; text-align: right; font-size: 9pt; line-height: 120%; color: #999; }
.row > .content { width: 82%; }
.row > .content > p:first-child,
.row > .content > p.small { margin-top: 0; margin-bottom: 0.2em; }

.row.header { margin-bottom: 0.7em; }
.row.header > .content { border-bottom: 0.7mm solid #eee; }
h3.first { margin-top: 0.1em; padding-top: 0; }

.column-host { display: flex; flex-wrap: wrap; }
.column-host > .column { width: calc(50% - 0.25em); }
.column-host > .column:nth-child(odd) { margin-right: 0.25em; }
.column-host > .column:nth-child(even) { margin-left: 0.25em; }

p.small { font-size: 9pt; line-height: 140%; }

strong.addition { color: #c33; }
span.highlight { background: #fee; }

span.year { background: #eee; }
span.grey { color: #999; }

#publications-all .entry { font-size: 9pt; }
#references .column p a { overflow-wrap: break-word; word-break: break-all; }

@media only screen and (max-width: 960px) {
  body { padding: 0 10px; }
  #menu { position: static; margin: 0 -10px; border-width: 0 0 1px 0; }
  #menu li:first-child { padding-left: 0; }
  #menu li:first-child::before { content: "Table of Contents: "; }
  #container { padding-bottom: 0; }
  #updated { clear: left; margin-top: 0; padding-top: 0.3em; }
  dt { width: 25%; }
  dd { margin-left: 25%; }
}
@media only screen and (max-width: 180mm) {
  #container { width: inherit; }
}
@media print {
  #menu { display: none; }
  /*
  body { font-size: 9pt; }
  h2 { font-size: 12pt; }
  h3 { font-size: 10.5pt; }
  h4 { font-size: 10pt; }
  section { break-inside: avoid; }
  */
  .row { break-inside: avoid; }
}`;
const updated = "4/1/2026";

function ResumeMenu() {
  return (
    <>
      <ul>
        <li>
          <a href={"#profile"}>{"Profile"}</a>
        </li>
        <li>
          <a href={"#work"}>{"Work Experience"}</a>
        </li>
        <li>
          <a href={"#grants"}>{"Grants"}</a>
        </li>
        <li>
          <a href={"#innovations"}>{"Innnovations"}</a>
        </li>
        <li>
          <a href={"#education"}>{"Education"}</a>
        </li>
        <li>
          <a href={"#honors"}>{"Honors"}</a>
        </li>
        <li>
          <a href={"#publications"}>{"Publications"}</a>
        </li>
        <li>
          <a href={"#services"}>{"Services"}</a>
        </li>
        <li>
          <a href={"#references"}>{"References"}</a>
        </li>
      </ul>
    </>
  );
}

function Profile() {
  return (
    <>
      <h1>{"Jun Kato"}</h1>
      <dl>
        <dt>{"E-mail"}</dt>
        <dd>
          <code>{"jun.kato@aist.go.jp"}</code>
          {" (work), "}
          <code>{"i@junkato.jp"}</code>
          {" (personal)"}
        </dd>
        <dt>{"Mail"}</dt>
        <dd>
          {
            "HIIRI, AIST Tsukuba Central 2, 1-1-1 Umezono, Tsukuba, Ibaraki, 305-8568, Japan"
          }
        </dd>
        <dt>{"URL"}</dt>
        <dd>
          <SiteLink className="link" href="/">
            {"https://junkato.jp"}
          </SiteLink>
        </dd>
      </dl>
      <div className="row">
        <div className="year"></div>
        <div className="content">
          <hr />
          <p>
            {"Jun Kato is a chief senior researcher at "}
            <a href={"https://www.aist.go.jp/index_en.html"}>
              <abbr
                title={
                  "National Institute of Advanced Industrial Science and Technology"
                }
              >
                {"AIST"}
              </abbr>
            </a>
            {
              ", where he works on Human-Computer Interaction research, more specifically, designing user interfaces and integrated environments for creativity support. He also serves as a technical advisor at "
            }
            <a href={"https://archinc.jp/en"}>{"Arch Inc."}</a>
            {", a Japanese animation production company, and leads "}
            <a href={"https://research.archinc.jp/en"}>{"Arch Research"}</a>
            {"."}
          </p>
          <p>
            {
              "He received a Ph.D. from The University of Tokyo (2014). Prior to graduation, he worked as a research intern at Microsoft Research and Adobe Research. "
            }
            {"\n"}
            {"He has regularly gained academic recognitions such as "}
            {"\n"}

            {"Honorable Mentions at ACM "}
            <abbr
              title={
                "The SIGCHI conference on Human Factors in Computing Systems"
              }
            >
              {"CHI"}
            </abbr>
            {" (2013, 2015, 2023) and "}

            <a
              href={
                "https://www.ipsj.or.jp/english/organization/aboutipsj/award/ACM-Award-E.html#hdg6"
              }
              title={
                "IPSJ/ACM Award for Early Career Contributions to Global Research"
              }
            >
              {"IPSJ/ACM Award"}
            </a>
            {" (2021)."}
          </p>
        </div>
      </div>
      <div className="row header">
        <div className="year"></div>
        <div className="content">
          <h2 id={"interest"}>{"Research Interests"}</h2>
        </div>
      </div>
      <div className="row">
        <div className="year"></div>
        <div className="content">
          <p>
            {
              "Human-computer interaction, creativity support, physical computing, programming experience, animation studies"
            }
          </p>
        </div>
      </div>
    </>
  );
}

function WorkExperience() {
  return (
    <>
      <div className="row header">
        <div className="year"></div>
        <div className="content">
          <h2>{"Work Experience"}</h2>
        </div>
      </div>
      <section id={"work-exsitu"}>
        <div className="row">
          <div className="year"></div>
          <div className="content">
            <h3 className="first">
              <a href={"https://www.universite-paris-saclay.fr/en"}>
                {"Université Paris-Saclay"}
              </a>
            </h3>
            <p className="small">
              {
                "Visiting position, in parallel with continuing current positions (AIST and Arch Inc.), to conduct research on human-computer interaction, particularly theories and tools for creativity support."
              }
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"April 2024-"}
            <br />
            {"March 2025"}
          </div>
          <div className="content">
            {"Visiting Scientist, "}
            <a href={"https://ex-situ.lri.fr/about"}>{"ex)situ Group"}</a>
            {", "}
            <a href={"https://www.lisn.upsaclay.fr"}>
              {
                "Laboratoire Interdisciplinaire des Sciences du Numérique (LISN)"
              }
            </a>
          </div>
        </div>
      </section>
      <section id={"work-aist"}>
        <div className="row">
          <div className="year"></div>
          <div className="content">
            <h3 className="first">
              <a href={"https://www.aist.go.jp/index_en.html"}>
                {
                  "National Institute of Advanced Industrial Science and Technology (AIST)"
                }
              </a>
            </h3>
            <p className="small">
              {
                "Tenured position to lead research projects, aimed not only at publishing academic papers but also deploying outcomes as publicly-available software; actively collaborating with companies to drive societal impact."
              }
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year">{"April 2026-"}</div>
          <div className="content">
            {"Chief Senior Researcher, "}
            <a href={"https://unit.aist.go.jp/hiiri/meirg/"}>
              {"Media Interaction Group"}
            </a>
            {", "}
            <a href={"https://unit.aist.go.jp/hiiri/index-en.html"}>
              {"Human Informatics and Interaction Research Institute (HIIRI)"}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="year">{"September 2018-"}</div>
          <div className="content">
            {"Senior Researcher, "}
            <a href={"https://unit.aist.go.jp/hiiri/meirg/"}>
              {"Media Interaction Group"}
            </a>
            {", "}
            <a href={"https://unit.aist.go.jp/hiiri/index-en.html"}>
              {"Human Informatics and Interaction Research Institute (HIIRI)"}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"April 2014-"}
            <br />
            {"August 2018"}
          </div>
          <div className="content">
            {"Researcher, "}
            <a href={"https://unit.aist.go.jp/hiiri/meirg/"}>
              {"Media Interaction Group"}
            </a>
            {", "}
            {"\n"}
            {"Information Technology Research Institute (ITRI)"}
          </div>
        </div>
      </section>
      <section id={"work-arch"}>
        <div className="row">
          <div className="year"></div>
          <div className="content">
            <h3>
              <a href={"https://archinc.jp/en"}>{"Arch Inc."}</a>
            </h3>
            <p className="small">
              {
                "Founder of the research and development division and principal investigator; leading research projects to publish academic papers and deploy outcomes in the Japanese animation industry."
              }
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year">{"July 2018-"}</div>
          <div className="content">
            {"Technical Advisor, "}
            <a href={"https://research.archinc.jp"}>{"Arch Research"}</a>
          </div>
        </div>
      </section>
      <section id={"work-interns"}>
        <div className="row">
          {" "}
          <div className="year"></div>
          <div className="content">
            <h3>{"Research Internships "}</h3>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"August 2013-"}
            <br />
            {"November 2013"}
          </div>
          <div className="content">
            {"Creative Technologies Lab, "}
            <a href={"https://research.adobe.com/"}>
              {"Adobe Research Seattle"}
            </a>
            <p className="small">
              {"Worked with "}
              <a href={"https://www.linkedin.com/in/jovan-cmu/"}>
                {"Jovan Popovic"}
              </a>
              {" and "}
              <a href={"https://joelbrandt.com/cv/"}>{"Joel Brandt"}</a>
              {"; developed a research prototype of a new product."}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"June 2012-"}
            <br />
            {"September 2012"}
          </div>
          <div className="content">
            {"Research in Software Engineering (RiSE) Group, "}
            <a
              href={
                "https://www.microsoft.com/en-us/research/group/research-software-engineering-rise/"
              }
            >
              {"Microsoft Research Redmond"}
            </a>
            <p className="small">
              {"Worked with "}
              <a
                href={
                  "https://www.microsoft.com/en-us/research/people/sburckha/"
                }
              >
                {"Sebastian Burckhardt"}
              </a>
              {" and "}
              <a href={"https://moskal.me/"}>{"Michał Moskal"}</a>
              {"; developed a live programming feature of "}
              <a
                href={
                  "https://www.microsoft.com/en-us/research/project/touchdevelop/"
                }
              >
                {"TouchDevelop"}
              </a>
              {", whose research component was published as an "}
              <a href={"#pldi2013-kato-alive"}>{"ACM PLDI'13"}</a>
              {" full paper."}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"January 2012-"}
            <br />
            {"April 2012"}
          </div>
          <div className="content">
            {"Human-Computer Interaction (HCI) Group, "}
            <a
              href={
                "https://web.archive.org/web/20120408040100/http://research.microsoft.com/en-us/um/beijing/groups/hci/"
              }
            >
              {"Microsoft Research Asia"}
            </a>
            <p className="small">
              {"Worked with "}
              <a href={"https://caoxiang.net/"}>{"Xiang Cao"}</a>
              {" and "}
              <a href={"https://www.linkedin.com/in/sean-mcdirmid-52b0aa90"}>
                {"Sean McDirmid"}
              </a>
              {
                "; developed extensions to an integrated development environment and wrote a full research paper later published at "
              }
              <a href={"#uist2012-kato-dejavu"}>{"ACM UIST'12"}</a>
              {"."}
            </p>
          </div>
        </div>
      </section>
      <section id={"work-misc"}>
        <div className="row">
          <div className="year"></div>
          <div className="content">
            <h3>{"Miscellaneous"}</h3>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"July 2010-"}
            <br />
            {"August 2010"}
          </div>
          <div className="content">
            {"Intern, "}
            <a href={"https://www.ut-ec.co.jp/english/"}>
              {"The University of Tokyo Edge Capital"}
            </a>
            <p className="small">
              {
                "Led a team of 3 students; surveyed previous industrial effort on home automation and proposed a new business plan with a working prototype."
              }
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"August 2009-"}
            <br />
            {"September 2009"}
          </div>
          <div className="content">
            {"Software Development Engineer Intern, "}
            <a href={"https://microsoft.com/"}>{"Microsoft"}</a>
            <p className="small">
              {
                "Developed an online code reviewing tool to improve the team's productivity.       "
              }
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year">
            {"April 2008-"}
            <br />
            {"March 2013"}
          </div>
          <div className="content">
            {"Assistant Researcher, "}
            <a href={"https://www.jst.go.jp/erato/igarashi/en/"}>
              {"JST ERATO Igarashi Design UI Project"}
            </a>
            <p className="small">
              {
                "Developed an interactive and graphical simulator and a software toolkit for controlling mobile robots; built a FTIR multi-touch display and developed its middleware for tracking fingers."
              }
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ResearchGrants() {
  return (
    <>
      <div className="row header">
        <div className="year"></div>
        <div className="content">
          <h2>{"Research Grants"}</h2>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"October 2025-"}
          <br />
          {"March 2031"}
        </div>
        <div className="content">
          <a href={"https://www.jst.go.jp/EN"}>
            <abbr title={"Japan Science and Technology Agency"}>{"JST"}</abbr>
          </a>{" "}
          <a href={"https://www.jst.go.jp/kisoken/cronos/en/index.html"}>
            {"CRONOS"}
          </a>
          {" (Grant Number "}
          <code>{"JPMJCS25K1"}</code>
          {")"}
          <p className="small">
            {
              "Principal investigator; funded 194M Japanese Yen for 5.5 years (expected least amount; additional funding possible) for "
            }
            <a href={"https://anime.pj.aist.go.jp/en"}>
              {
                "foundational techniques for malleable tools for a reciprocal anime co-creation environment"
              }
            </a>
            {". Acceptance rate: 6.8% (6/88)."}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"October 2025-"}
          <br />
          {"March 2026"}
        </div>
        <div className="content">
          <a href={"https://www.jst.go.jp/EN"}>
            <abbr title={"Japan Science and Technology Agency"}>{"JST"}</abbr>
          </a>{" "}
          <a href={"https://www.jst.go.jp/kisoken/presto/en/index.html"}>
            {"PRESTO"}
          </a>
          {" (Grant Number "}
          <code>{"JPMJPR25I1"}</code>
          {")"}
          <p className="small">
            {
              "Principal investigator; funded 35M Japanese Yen for 3.5 years (expected) for "
            }
            {
              "technologies for time-aware sharing orchestration in collaborative content production"
            }
            {"\n"}
            {". Acceptance rate: 8.3% (11/132)."}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"April 2024-"}
          <br />
          {"March 2028"}
        </div>
        <div className="content">
          <a href={"https://www.jsps.go.jp/english"}>
            <abbr title={"Japan Society for the Promotion of Science"}>
              {"JSPS"}
            </abbr>
          </a>{" "}
          <a href={"https://www.jsps.go.jp/english/e-grants/grants01.html"}>
            {"Grant-in-Aid for Scientific Research (B)"}
          </a>
          {" (Grant Number "}
          <code>{"24K02972"}</code>
          {")"}
          <p className="small">
            {
              "Co-investigator; funded 3.1M Japanese Yen for 4 years (expected)."
            }
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"October 2022-"}
          <br />
          {"March 2026"}
        </div>
        <div className="content">
          <a href={"https://www.jst.go.jp/EN"}>
            <abbr title={"Japan Science and Technology Agency"}>{"JST"}</abbr>
          </a>{" "}
          <a href={"https://www.jst.go.jp/kisoken/act-x/en/index.html"}>
            {"ACT-X"}
          </a>
          {" (Grant Number "}
          <code>{"JPMJAX22A3"}</code>
          {")"}
          <p className="small">
            {
              "Principal investigator; funded 11M Japanese Yen for 3.5 years for "
            }
            <SiteLink
              href={"https://junkato.jp/creativity-support-environments"}
            >
              {
                "AI-enabled creativity support environments for a constructive study of creative culture"
              }
            </SiteLink>
            {". Acceptance rate: 20% (23/115)."}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"April 2021-"}
          <br />
          {"March 2024"}
        </div>
        <div className="content">
          <a href={"https://www.jsps.go.jp/english"}>
            <abbr title={"Japan Society for the Promotion of Science"}>
              {"JSPS"}
            </abbr>
          </a>{" "}
          <a href={"https://www.jsps.go.jp/english/e-grants/grants01.html"}>
            {"Grant-in-Aid for Scientific Research (A)"}
          </a>
          {" (Grant Number "}
          <code>
            <a
              href={"https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-21H04917"}
            >
              {"21H04917"}
            </a>
          </code>
          {")"}
          <p className="small">
            {"Co-investigator; funded 2.6M Japanese Yen for 3 years."}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"April 2011-"}
          <br />
          {"March 2014"}
        </div>
        <div className="content">
          <a href={"https://www.jsps.go.jp/english"}>
            <abbr title={"Japan Society for the Promotion of Science"}>
              {"JSPS"}
            </abbr>
          </a>{" "}
          <a href={"https://www.jsps.go.jp/english/e-pd"}>
            {"Research Fellowships for Young Scientists DC1"}
          </a>
          <p className="small">
            {"Funded 1.9M Japanese Yen for 3 years as a research fellow."}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">{"2012"}</div>
        <div className="content">
          <a
            href={
              "https://www.microsoft.com/en-us/research/academic-program/fellowships-microsoft-research-asia"
            }
          >
            {"Microsoft Research Asia Fellowship"}
          </a>
          <p className="small">
            {
              "Awarded among around one hundred Ph.D candidates and funded $10,000 for a year."
            }
          </p>
        </div>
      </div>
      <div className="row">
        {" "}
        <div className="year">
          {"April 2011-"}
          <br />
          {"March 2012"}
        </div>
        <div className="content">
          <a
            href={
              "https://web.archive.org/web/20150921173330/http://research.microsoft.com/en-us/collaboration/global/asia-pacific/regions/japan-ijarc.aspx"
            }
          >
            {"Microsoft "}
            <abbr
              title={"Institute for Japanese Academic Research Collaboration"}
            >
              {"IJARC"}
            </abbr>{" "}
            <abbr title={"Collaborative Research"}>{"CORE"}</abbr>
            {" Program"}
          </a>
          <p className="small">
            {"Principal investigator; funded $15,000 for a year."}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"December 2008-"}
          <br />
          {"August 2009"}
        </div>
        <div className="content">
          <a href={"https://www.ipa.go.jp/index-e.html"}>
            <abbr title={"Information-technology Promotion Agency"}>
              {"IPA"}
            </abbr>{" "}
          </a>
          <a
            href={"https://www.ipa.go.jp/english/humandev/third.html"}
            title={"Exploratory IT Human Resources Project"}
          >
            {"MITOU Program"}
          </a>
          <p className="small">
            {
              "Project leader (principal investigator); funded 7M Japanese yen for half a year."
            }
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year"></div>
        <div className="content">
          <p className="small">
            {
              "*Private fundings for collaborative research are unlisted for their confidential nature."
            }
          </p>
        </div>
      </div>
    </>
  );
}

function Innovations() {
  return (
    <>
      <div className="row header">
        <div className="year"></div>
        <div className="content">
          <h2>{"Research-driven Innovations"}</h2>
        </div>
      </div>
      <section id={"innovations-products"}>
        <div className="row">
          <div className="year"></div>
          <div className="content">
            <h3>{"Products and Services"}</h3>
          </div>
        </div>
        <div className="row" id={"griffith"}>
          <div className="year">{"2018-"}</div>
          <div className="content">
            <SiteLink href={"https://junkato.jp/griffith"}>
              {"Griffith"}
            </SiteLink>
            {" (Arch Inc.)"}
            <p className="small">
              {
                "Griffith is a web-based tool for authoring and sharing Japanese animation storyboards (e-conte). As the principal investigator at Arch Research, I have been responsible for its research and development. To design the tool appropriately, it was necessary to deeply explore the historical and cultural aspects of the animation production process, which we reported at the Society for Animation Studies annual conferences and published as an ACM CHI '14 paper."
              }
            </p>
          </div>
        </div>
        <div className="row" id={"songlesync"}>
          <div className="year">{"2017-"}</div>
          <div className="content">
            <SiteLink href={"https://junkato.jp/songle-sync"}>
              {"Songle Sync"}
            </SiteLink>
            {" (AIST)"}
            <p className="small">
              {
                "Songle Sync is a large-scale web-based platform for synchronizing various devices to music playback. It has been used in commercial events to synchronize city lights, fireworks, and thousands of smartphones. I was involved in the discussion of core algorithm development, developed it as a toolkit, wrote an ACM Multimedia '18 paper, and have continuously served as the producer of commercial events."
              }
            </p>
          </div>
        </div>
        <div className="row" id={"textalive"}>
          <div className="year">{"2014-"}</div>
          <div className="content">
            <SiteLink href={"https://junkato.jp/textalive"}>
              {"TextAlive"}
            </SiteLink>
            {" (AIST)"}
            <p className="small">
              {
                "TextAlive is a web-based authoring tool for lyric videos, used by both professional and amateur artists (>23k video revisions), recently featured in professional VR live performances (4 events and 61 songs in 2023). As its project leader, I have been responsible for its research, development, and service operation. Relevant topics have been covered in several academic articles including ACM CHI '15 and '23 award-winning papers."
              }
            </p>
          </div>
        </div>
        <div className="row" id={"touchdevelop"}>
          <div className="year">{"2012"}</div>
          <div className="content">
            <SiteLink href={"https://junkato.jp/touchdevelop"}>
              {"TouchDevelop"}
            </SiteLink>
            {" ("}
            <a
              href={
                "https://www.microsoft.com/en-us/research/project/touchdevelop"
              }
            >
              {"Microsoft"}
            </a>
            {")"}
            <p className="small">
              {
                "TouchDevelop is a programming environment optimized for touch-enabled devices, which was retired in 2018. Thanks to the team's open and creative culture, as a research intern, I could take an essential role in developing its novel live programming feature, which displays interactive user interfaces for editing a running program. The core technologies we developed were published at ACM PLDI '13 and filed as a patent US9286038B2."
              }
            </p>
          </div>
        </div>
        <div className="row">
          <div className="year"></div>
          <div className="content">
            <p className="small">
              {"*The complete list of projects can be found at "}
              <SiteLink className="link" href={"https://junkato.jp/projects"}>
                {"https://junkato.jp/projects"}
              </SiteLink>
              {"."}
            </p>
          </div>
        </div>
      </section>
      <section id={"innovations-patents"}>
        <div className="row">
          <div className="year"></div>
          <div className="content">
            <h3>{"Patents"}</h3>
          </div>
        </div>
        <div className="row patent" id={"US9639330B2"}>
          <div className="year">
            {"2013 (applied)"}
            <br />
            {"2016 (granted)"}
          </div>
          <div className="content">
            {
              "Sebastian Burckhardt, Manuel Fahndrich, Peli de Halleux, Sean McDirmid, Michal Moskal, Nikolai Tillmann, "
            }
            <u>{"Jun Kato"}</u>
            {" (Microsoft). Interface development and operation. "}

            <a href={"https://patents.google.com/patent/US9286038B2/en"}>
              {"US9286038B2"}
            </a>
            {"."}
          </div>
        </div>
        <div className="row patent" id={"US9286038B2"}>
          <div className="year">
            {"2013 (applied)"}
            <br />
            {"2017 (granted)"}
          </div>
          <div className="content">
            {"Xiang Cao, "}
            <u>{"Jun Kato"}</u>
            {", Sean McDirmid (Microsoft). Programming interface. "}

            <a href={"https://patents.google.com/patent/US9639330B2/en"}>
              {"US9639330B2"}
            </a>
            {"."}
          </div>
        </div>
      </section>
    </>
  );
}

function Education() {
  return (
    <>
      <div className="row header">
        <div className="year"></div>
        <div className="content">
          <h2>{"Education"}</h2>
        </div>
      </div>
      <div className="row">
        <div className="year"></div>
        <div className="content">
          <h3 className="first">{"The University of Tokyo, Tokyo, Japan"}</h3>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"April 2011-"}
          <br />
          {"March 2014"}
        </div>
        <div className="content">
          <p>
            {
              "Doctor of Philosophy / Information Science and Technology (Computer Science), Thesis: "
            }
            <a href={"https://doi.org/10.15083/00007163"}>
              <i>
                {
                  "Integrated development environment with graphical representations for development of programs with real-world input and output"
                }
              </i>
            </a>
            {"."}
          </p>
          <p className="small">
            {
              "Supervisor: Takeo Igarashi; thesis committee: Masami Hagiya, Shigeru Chiba, Shinichi Honiden, Toshiyuki Masui"
            }
          </p>
        </div>
      </div>
      <div className="row">
        <div className="year">
          {"April 2009-"}
          <br />
          {"March 2011"}
        </div>
        <div className="content">
          <p>
            {
              "Master of Science / Information Science and Technology (Computer Science), Thesis: "
            }
            <i>{"A Toolkit for Prototyping Interactive Robot Applications"}</i>
          </p>
          <p className="small">{"Supervisor: Takeo Igarashi"}</p>
        </div>
      </div>
      <div className="row">
        {" "}
        <div className="year">
          {"April 2005-"}
          <br />
          {"March 2009"}
        </div>
        <div className="content">
          <p>
            {"Bachelor of Science / Information Science, Thesis: "}
            <i>
              {"Multi-touch Interface for Controlling Multiple Mobile Robots"}
            </i>
          </p>
          <p className="small">{"Supervisor: Takeo Igarashi"}</p>
        </div>
      </div>
    </>
  );
}

function References() {
  return (
    <>
      <div className="row header">
        <div className="year"></div>
        <div className="content">
          <h2>{"References"}</h2>
        </div>
      </div>
      <div className="row">
        <div className="year"></div>
        <div className="content column-host">
          <div className="column">
            <h3>{"Dr. Masataka Goto"}</h3>
            <p className="small">
              {"Relationship: research director and colleague "}
              <span className="year">{"2014-"}</span>
              {
                "; National Institute of Advanced Industrial Science and Technology (AIST), Ibaraki, Japan"
              }
              <br />
              <a
                className="link"
                href={"https://staff.aist.go.jp/m.goto/index-e.html"}
              >
                {"https://staff.aist.go.jp/m.goto/index-e.html"}
              </a>
            </p>
          </div>
          <div className="column">
            <h3>{"Dr. Takeo Igarashi"}</h3>
            <p className="small">
              {"Relationship: academic supervisor "}
              <span className="year">{"2008-2014"}</span>
              {"; The University of Tokyo, Tokyo, Japan"}
              <br />
              <a
                className="link"
                href={"https://www-ui.is.s.u-tokyo.ac.jp/~takeo"}
              >
                {"https://www-ui.is.s.u-tokyo.ac.jp/~takeo"}
              </a>
            </p>
          </div>
          <div className="column">
            <h3>{"Dr. Jovan Popovic"}</h3>
            <p className="small">
              {"Relationship: research intern supervisor "}
              <span className="year">{"2013"}</span>
              {"; Adobe Research Seattle, WA, US"}
              <br />
              <a
                className="link"
                href={"https://www.linkedin.com/in/jovan-cmu/"}
              >
                {"https://www.linkedin.com/in/jovan-cmu/"}
              </a>
            </p>
          </div>
          <div className="column">
            <h3>{"Dr. Sebastian Burckhardt"}</h3>
            <p className="small">
              {"Relationship: research intern supervisor "}
              <span className="year">{"2012"}</span>
              {"; Microsoft Research Redmond, WA, US"}
              <br />
              <a
                className="link"
                href={
                  "https://www.microsoft.com/en-us/research/people/sburckha/"
                }
              >
                {"https://www.microsoft.com/en-us/research/people/sburckha/"}
              </a>
            </p>
          </div>
          <div className="column">
            <h3>{"Dr. Xiang Cao"}</h3>
            <p className="small">
              {"Relationship: research intern supervisor "}
              <span className="year">{"2012"}</span>
              {"; Microsoft Research Asia, Beijing, China"}
              <br />
              <a className="link" href={"https://caoxiang.net"}>
                {"https://caoxiang.net"}
              </a>
            </p>
          </div>
          <div className="column">
            <h3>{"Dr. Sean McDirmid"}</h3>
            <p className="small">
              {"Relationship: research intern supervisor "}
              <span className="year">{"2012"}</span>
              {"; Microsoft Research Asia, Beijing, China"}
              <br />
              <a
                className="link"
                href={"https://www.linkedin.com/in/sean-mcdirmid-52b0aa90"}
              >
                {"https://www.linkedin.com/in/sean-mcdirmid-52b0aa90"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="row header">
      <div className="year" />
      <div className="content">
        <h2>{children}</h2>
      </div>
    </div>
  );
}

const honorDescriptions: Record<string, string> = {
  "Japan ACM SIGCHI Chapter Distinguished Young Researcher Award":
    'Awarded for substantial academic contributions in HCI, pioneering the "programming experience" domain, organizing major international conferences in HCI, and turning academic achievements into multiple practical services to contribute to the industry.',
  "IPSJ/ACM Award for Early Career Contributions to Global Research":
    "Awarded for pioneering work in programming experience research for creativity support of both programmers and non-programmers.",
};

function Honors({ awards }: { awards: SiteData["awards"] }) {
  return (
    <>
      <SectionHeading>Awards and Honors</SectionHeading>
      {awards
        .filter(
          (entry) => entry.entryType !== "domestic" && !entry.data?.funding,
        )
        .map((entry, index) => {
          let text = entry.getText("en");
          const coauthorNote = text.indexOf(" for the co-authored ");
          if (coauthorNote >= 0) text = text.substring(0, coauthorNote);
          const description = Object.keys(honorDescriptions).find((title) =>
            text.includes(title),
          );
          return (
            <div className="row" key={index}>
              <div className="year">{entry.getDateString("en", true)}</div>
              <div className="content">
                <HtmlContent html={text} />
                {description && (
                  <p className="small">{honorDescriptions[description]}</p>
                )}
              </div>
            </div>
          );
        })}
      <div className="row">
        <div className="year" />
        <div className="content">
          <p className="small">
            {"*Domestic (Japanese) awards are unlisted and can be found at "}
            <SiteLink className="link" href="https://junkato.jp/publications">
              https://junkato.jp/publications
            </SiteLink>
            {"."}
          </p>
        </div>
      </div>
    </>
  );
}

type Publication = SiteData["publications"][number];

function PublicationCitation({
  entry,
  notes,
}: {
  entry: Publication;
  notes: SiteData["misc"]["publications"];
}) {
  const book = entry.getBook();
  const series = entry.getSeries();
  const pages = entry.getPages();
  const memo = notes[series];
  return (
    <>
      <HtmlContent html={entry.getAuthorsTags().join(", ")} />
      {entry.entryTags.editor && (
        <>
          {" (Eds. "}
          <HtmlContent html={entry.getEditorsTags().join(", ")} />
          {")"}
        </>
      )}
      {". "}
      {entry.entryTags.year}
      {".\n"}
      {entry.entryTags.title}
      {". "}
      {book.includes("Proceedings of") && "In "}
      <i>{book}</i>
      {series && (
        <>
          {" "}
          <i>
            {"("}
            {series}
            {memo && (
              <>
                {"; "}
                <span className="highlight">{memo}</span>
              </>
            )}
            {")"}
          </i>
        </>
      )}
      {pages ? (
        <>
          {", "}
          {pages}
          {"."}
        </>
      ) : (
        "."
      )}
      {entry.hasDOIUrl() && (
        <>
          {" "}
          <SiteLink className="item" href={entry.getDOIUrl()}>
            {"DOI: "}
            {entry.entryTags.doi}
          </SiteLink>
          {"."}
        </>
      )}
      {entry.entryTags.addition && (
        <>
          {" "}
          <strong className="addition">
            {"🌟"}
            {entry.entryTags.addition}
          </strong>
        </>
      )}
    </>
  );
}

function Publications({ data }: { data: SiteData }) {
  const selected = new Set(data.selectedPublications);
  const otherPublications = data.publications.filter(
    (entry) =>
      !["comment", "phdthesis"].includes(entry.entryType.toLowerCase()) &&
      !selected.has(entry) &&
      entry.entryTags.language !== "japanese" &&
      entry.entryTags.numpages,
  );
  return (
    <>
      <SectionHeading>Publications</SectionHeading>
      <section id="publications-selected">
        <div className="row">
          <div className="year" />
          <div className="content">
            <h3 className="first">Selected Full Papers and Journal Articles</h3>
          </div>
        </div>
        {data.selectedPublications.map((entry) => (
          <div
            className={`row entry ${entry.entryType}`}
            id={entry.citationKey}
            key={entry.citationKey}
          >
            <div className="year" />
            <div className="content">
              <PublicationCitation
                entry={entry}
                notes={data.misc.publications}
              />
            </div>
          </div>
        ))}
      </section>
      <section id="publications-all">
        <div className="row">
          <div className="year" />
          <div className="content">
            <h3>Other Publications</h3>
          </div>
        </div>
        {otherPublications.map((entry, index) => (
          <div
            className={`row entry ${entry.entryType}`}
            id={entry.citationKey}
            key={entry.citationKey}
          >
            <div className="year">
              {entry.entryTags.year !==
              otherPublications[index - 1]?.entryTags.year
                ? entry.entryTags.year
                : null}
            </div>
            <div className="content">
              <PublicationCitation
                entry={entry}
                notes={data.misc.publications}
              />
            </div>
          </div>
        ))}
        <div className="row">
          <div className="year" />
          <div className="content">
            <p className="small">
              {
                "*Non-archival publications and domestic (Japanese) publications are unlisted and can be found at "
              }
              <SiteLink className="link" href="https://junkato.jp/publications">
                https://junkato.jp/publications
              </SiteLink>
              {" and "}
              <SiteLink
                className="link"
                href="https://junkato.jp/ja/publications"
              >
                /ja/publications
              </SiteLink>
              {"."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

type Services = SiteData["misc"]["services"];
type Organizer = Services["organizers"][number];

function OrganizerTitle({ organizer }: { organizer: Organizer }) {
  return (
    <>
      {organizer.track && (
        <>{organizer.track.fullname || organizer.track.name} </>
      )}
      {organizer.title}
      {organizer.subtitle && (
        <>
          {" ("}
          {organizer.subtitle}
          {")"}
        </>
      )}
    </>
  );
}

function OrganizerRows({ organizers }: { organizers: Organizer[] }) {
  return (
    <>
      {organizers.map((organizer, index) => (
        <div
          className="row"
          key={`${organizer.year}-${organizer.event.name}-${index}`}
        >
          <div className="year">
            {index === 0 || organizers[index - 1].year !== organizer.year
              ? organizer.year
              : null}
          </div>
          <div className="content">
            <SiteLink href={organizer.event.url || organizer.url}>
              <abbr title={organizer.event.fullname}>
                {organizer.event.name}
              </abbr>
            </SiteLink>
            <p className="small">
              {organizer.event.url ? (
                <SiteLink href={organizer.url}>
                  <OrganizerTitle organizer={organizer} />
                </SiteLink>
              ) : (
                <OrganizerTitle organizer={organizer} />
              )}
              {organizer.conference && (
                <>
                  {"; held as part of  "}
                  <SiteLink href={organizer.conference.url}>
                    {organizer.conference.name}
                  </SiteLink>
                </>
              )}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

function AcademicServices({ services }: { services: Services }) {
  return (
    <>
      <SectionHeading>Academic Services</SectionHeading>
      <section id="services-members">
        <div className="row">
          <div className="year" />
          <div className="content">
            <h3>Memberships</h3>
          </div>
        </div>
        {services.members.map((member) => (
          <div className="row" key={member.name}>
            <div className="year" />
            <div className="content">
              <SiteLink href={member.url}>{member.name}</SiteLink>
              {member.role?.length ? (
                <p className="small">
                  {member.role.map((role, index) => (
                    <Fragment key={`${role.title}-${role.from}`}>
                      {role.title}
                      {"\n "}
                      <span className="year">
                        {role.from}
                        {"-"}
                        {role.to}
                      </span>
                      {index < member.role.length - 1 && ", "}
                    </Fragment>
                  ))}
                </p>
              ) : member.from ? (
                <p className="small">
                  <span className="year">
                    {" "}
                    {member.from}
                    {"-"}
                    {member.to}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </section>
      <section id="services-oc">
        <div className="row">
          <div className="year" />
          <div className="content">
            <h3>Conference/Workshop Organizers</h3>
          </div>
        </div>
        <OrganizerRows
          organizers={services.organizers.filter(
            (organizer) =>
              organizer.class === "chair" || organizer.class === "oc",
          )}
        />
      </section>
      <section id="services-pc">
        <div className="row">
          <div className="year" />
          <div className="content">
            <h3>Conference/Workshop Program Committee Members</h3>
          </div>
        </div>
        <OrganizerRows
          organizers={services.organizers.filter(
            (organizer) =>
              organizer.class !== "chair" && organizer.class !== "oc",
          )}
        />
        <div className="row">
          <div className="year" />
          <div className="content">
            <p className="small">
              {"*Minor reviewing activities are omitted and can be found at "}
              <SiteLink className="link" href="https://junkato.jp/activities">
                https://junkato.jp/activities
              </SiteLink>
              {"."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/** Standalone résumé, migrated from the original resume Pug templates. */
export default function ResumePage({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  return (
    <SitePathContext.Provider value="/resume/">
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="Jun Kato" />
        <meta name="viewport" content="width=device-width,user-scalable=yes" />
        <link rev="made" href="mailto:i@junkato.jp" />
        <title>Resume of Dr. Jun Kato</title>
        <style dangerouslySetInnerHTML={{ __html: resumeStyles }} />
      </Head>
      <div id="menu">
        <ResumeMenu />
      </div>
      <div id="container">
        <p id="updated">Updated: {updated}</p>
        <div id="profile">
          <Profile />
        </div>
        <div id="work">
          <WorkExperience />
        </div>
        <div id="grants">
          <ResearchGrants />
        </div>
        <div id="innovations">
          <Innovations />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="honors">
          <Honors awards={data.awards} />
        </div>
        <div id="publications">
          <Publications data={data} />
        </div>
        <div id="services">
          <AcademicServices services={data.misc.services} />
        </div>
        <div id="references">
          <References />
        </div>
        <footer>
          <hr />
          <p>© Jun Kato {/[0-9]+$/.exec(updated)?.[0]}</p>
        </footer>
      </div>
    </SitePathContext.Provider>
  );
}

export function getStaticProps() {
  return { props: withPageImages(ResumePage, { pageData: getPageData("/resume/", {"projects": ["griffith", "textalive", "touchdevelop"]}) }, "/resume/") };
}
