# 外部リンク・埋め込みとページ内アンカーの確認

2026-10-14、現行の静的出力296 HTMLページを対象に確認しました。対象URL・掲載ページ・編集元ファイル・修正候補・次の操作は [EXTERNAL_LINK_AUDIT.csv](EXTERNAL_LINK_AUDIT.csv) に記録しています。CSVはURLごとに1行で、全1,377件を含みます。

## 確認範囲と結果

- サイト内HTMLのフラグメント付き `href` は2,206箇所。`id` または `a[name]` の存在を転送先HTMLと照合しました。
- 履歴書の2種類のリンク（`/resume.html` と `/resume/` で計4箇所）を修正。`#pldi2013-alive` → `#pldi2013-kato-alive`、`#uist2012-dejavu` → `#uist2012-kato-dejavu`。再ビルド後の欠落アンカーは **0箇所** です。
- HTMLの `href` / `src` / `data-src` / `data-url` から、388ホスト・1,377種類の外部URLを抽出し、読み取りGETで検査しました。一次失敗327件は再検査し、HTTPの失敗先では同一パスのHTTPSも確認しました。
- 最終応答はHTTP 200が1,165件、404が54件、DNS名前解決失敗（ENOTFOUND）が19件。その他139件は認証要求、検査制限、サーバーエラー、通信エラーです。HTTP 200はページや資産の応答確認であり、全ページの本文・操作の正常性を意味しません。
- 外部埋め込み49 URLをブラウザーで表示し、YouTube 32件中30件で再生状態1と動画時刻の進行を確認しました。プレイリストは先頭で再生された動画を確認し、全収録動画の検査は行っていません。
- HTTPSページとして旧TextAlive APIサンプル7ページを実行し、HTTPスクリプトがMixed Contentで遮断されること、プレイヤーが生成されないことを確認しました。
- 社内CAのある検証環境です。OSの正規CAを用いてTLSを検証し、ChromiumでCAの信頼に失敗した資料は検証済み応答で表示を再確認しました。証明書検証は無効にしていません。

`verify-site.ts` の従来の参照切れ集計はJavaScriptのscript要素を除外します。今回のブラウザー検査で追加発見した `prism.js` 欠落は、旧VPSの `~/www/jk_old/textalive/embed/api/prism.js` から復元し、MITライセンスを同梱しました。API本体のHTTP参照と旧jQuery前提のコードは残作業です。

## 優先する具体的なTODO

### W1. Fungus Cameraの非公開YouTube動画

- **場所:** `/homehack/fungus-camera/`、`/ja/homehack/fungus-camera/`。編集元は [英語](../pages/homehack/fungus-camera/index.tsx)・[日本語](../pages/ja/homehack/fungus-camera/index.tsx)。
- **対象:** [6etDXqnFnSM](https://www.youtube.com/watch?v=6etDXqnFnSM)。プレイヤーに「この動画は非公開です」と表示され、再生できません。
- **TODO:** 動画所有者のYouTube Studioで一般閲覧できる公開設定にするか、公開できる代替動画のIDを決めて両ページの埋め込みを置換する。公開しない場合は当該埋め込みを削除する。
- **完了条件:** ログアウトした閲覧者が両ページの埋め込みから再生できる。同じページの `rFeTAwY_d_Y` は今回再生できました。

### W2. people-are-programmers第3章の再生不能プレイリスト

- **場所:** `/ja/talks/people-are-programmers/p3.html`、[編集元](../site/talks/people-are-programmers.tsx)。
- **対象:** [PLb6OjFoBksmvxmoCh_KNaBzu1-RyCeHeW](https://www.youtube.com/playlist?list=PLb6OjFoBksmvxmoCh_KNaBzu1-RyCeHeW)。埋め込みに「この動画は再生できません」と表示されます。
- **TODO:** 所有者側でプレイリストと収録動画を公開するか、紹介したい公開プレイリスト／動画のIDに置換する。
- **完了条件:** ログアウトした状態で第3章から少なくとも先頭動画が再生でき、収録動画も意図したものになっている。

### W3. 英語Funページの地図URLの二重エスケープ

- **場所:** `/fun/`、[編集元](../src/fun/index.html)。
- **症状:** iframeのクエリが `&amp;amp;` になっており、読み込み先は「403. このページへのアクセス権限がありません」。日本語 `/ja/fun/` の同じ地図は表示できます。
- **TODO:** iframeの `src` を [現在の同じTravel mapの埋め込みURL](https://www.google.com/maps/d/embed?mid=1DBSXYXwQgOVT29JJVTur1dulUC4) に置換する。このURLはHTTP 200と地図・ピンの描画を確認済みです。
- **完了条件:** `/fun/` でエラーメッセージが消え、日本語版と同じ地図が表示される。

### W4. 旧TextAlive APIサンプル7ページ

- **場所:** `/textalive/embed/api/` と `embed-1.html`〜`embed-6.html`。編集元は [src/textalive/embed/api](../src/textalive/embed/api)。
- **症状:** `http://textalive.jp/javascripts/api/embed-v1.js` がHTTPSページから遮断され、7ページすべてでプレイヤー数0、`$ is not defined`。スクリプト自体はHTTPS版でHTTP 200です。
- **TODO:** APIの復旧を保留する間は、実行デモが未対応であることをページに明示し、動作しない操作欄を隠す。復旧時はHTTPS版APIの互換性を調べ、jQuery前提の構文強調・プレイヤー初期化も整理する。HTTPSへ変えるだけで全サンプルが復旧するかはまだ確認していません。
- **完了条件:** アーカイブ表示なら未対応説明とコード例を読める。実行デモとして復旧するなら7ページでMixed Content・`$ is not defined` が消え、各ページの操作が動く。

### W5. UI設計ページのAmazon書影

- **場所:** `/ja/user-interface-design/`、[編集元](../pages/ja/user-interface-design/index.tsx)。
- **症状:** `ws-fe.amazon-adsystem.com` の書影4 URLがDNS名前解決失敗。対象ASINは `4621304674`、`013438038X`、`B0029ZBK80`、`4861008212`。追跡用 `ir-jp.amazon-adsystem.com` 2 URLもタイムアウトしました。
- **TODO:** 書影を使用できるローカル画像に替えるか画像を非表示にし、書籍名と通常の商品リンクを残す。追跡用画像は削除する。
- **完了条件:** 書籍紹介で壊れた画像が表示されず、旧広告用ホストへのリクエストがなくなる。

### W6. Sharedo旧公開資料の認証要求

- **場所:** `/ja/sharedo/` と2011・2014年の日本語活動履歴。編集元は [sharedo](../pages/ja/sharedo/index.tsx)・[histories.json](../src/data/histories.json)。
- **対象:** `http://sharedo.digitalmuseum.jp/research/wiss2011`（末尾スラッシュあり／なしともHTTP 401）。
- **TODO:** 公開する資料ならサーバーの認証を外すか、保存版を現行サイトに移してリンクを更新する。公開しない場合は通常の紹介ページ `/ja/sharedo/` など、説明に合う公開先への置換または当該リンクの削除を判断する。
- **完了条件:** ログインなしで発表資料や説明を閲覧できる。

## 追加で見つかったローカルscript参照

- **Funの写真ギャラリー:** `/fun/`・`/ja/fun/` が `/js/jqpgallery/jquery.picasagallery.js` を参照していますが、ファイルがなくHTTP 404です。編集元は [英語](../src/fun/index.html)・[日本語](../src/ja/fun/index.html)。jQueryを読み込むscriptもなく、旧 `picasagallery()`・Bootstrapの `tooltip()` を前提にした初期化が残っています。**TODO:** 掲載を続けるアルバムの現行公開URLを決めて通常リンクに替えるか、公開できる写真をローカル保存して現行UIで表示する。写真を掲載しない場合はギャラリー要素と旧初期化コードを削除する。**完了条件:** 写真または公開アルバムへの案内が表示され、404と初期化エラーがなくなる。
- **UGVの発表者メモ:** [notes.html:175](../src/user-generated-variables.old/js/vendor/notes/notes.html#L175) の `../../plugin/markdown/marked.js` が欠落しています。通常のスライド表示ではこのHTMLを開きませんが、`S` キーで発表者メモを開くと読み込み対象になります。現在のスライドにはMarkdownメモがありません。**TODO:** Markdownメモを使うなら同じ世代のmarked.jsを復元し参照パスを直す。使わないなら不要なscript参照とMarkdown用分岐を整理する。**完了条件:** `S` キーで開くメモ画面から当該404が消える。

上記は外部URLのCSVとは別の、ローカルJavaScript参照の追加発見です。

## 修正先を確認できたURL

以下は未修正です。新URLはHTTP 200を確認しました。HTMLページは記事・資料のタイトルも照合しました。

| ID | 現在のURL | 修正先 | 編集元 |
| --- | --- | --- | --- |
| X0164 | [http://users.comnet.aalto.fi/oulasvir/pubs/hci-research-as-problem-solving-chi2016.pdf](<http://users.comnet.aalto.fi/oulasvir/pubs/hci-research-as-problem-solving-chi2016.pdf>) | [https://users.comnet.aalto.fi/oulasvir/pubs/hci-research-as-problem-solving-chi2016.pdf](<https://users.comnet.aalto.fi/oulasvir/pubs/hci-research-as-problem-solving-chi2016.pdf>) | [pages/ja/science/index.tsx:263](../pages/ja/science/index.tsx#L263) |
| X0193 | [http://www.ieee-gcce.org/2013/](<http://www.ieee-gcce.org/2013/>) | [https://www.ieee-gcce.org/2013/](<https://www.ieee-gcce.org/2013/>) | [src/data/histories.json:381](../src/data/histories.json#L381)<br>[src/data/misc.json:935](../src/data/misc.json#L935)<br>[src/fun/index.html:2](../src/fun/index.html#L2) |
| X0196 | [http://www.interaction-ipsj.org/2016/](<http://www.interaction-ipsj.org/2016/>) | [https://www.interaction-ipsj.org/2016/](<https://www.interaction-ipsj.org/2016/>) | [src/data/awards.json:162](../src/data/awards.json#L162)<br>[src/data/histories.json:895](../src/data/histories.json#L895) |
| X0197 | [http://www.interaction-ipsj.org/2016/award](<http://www.interaction-ipsj.org/2016/award>) | [https://www.interaction-ipsj.org/2016/award](<https://www.interaction-ipsj.org/2016/award>) | [src/data/awards.json:162](../src/data/awards.json#L162) |
| X0198 | [http://www.interaction-ipsj.org/2024/](<http://www.interaction-ipsj.org/2024/>) | [https://www.interaction-ipsj.org/2024/](<https://www.interaction-ipsj.org/2024/>) | [pages/ja/lyric-app-framework/index.tsx:99](../pages/ja/lyric-app-framework/index.tsx#L99)<br>[pages/lyric-app-framework/index.tsx:99](../pages/lyric-app-framework/index.tsx#L99)<br>[src/data/awards.json:93](../src/data/awards.json#L93) |
| X0406 | [https://blog.junkato.jp/ja/posts/2015-6-29-cs-research-internship-abroad/](<https://blog.junkato.jp/ja/posts/2015-6-29-cs-research-internship-abroad/>) | [https://blog.junkato.jp/ja/posts/2015-06-29-cs-research-internship-abroad/](<https://blog.junkato.jp/ja/posts/2015-06-29-cs-research-internship-abroad/>) | [src/data/histories.json:927](../src/data/histories.json#L927) |
| X0407 | [https://blog.junkato.jp/ja/posts/2015-6-30-cs-research-internship-abroad-2/](<https://blog.junkato.jp/ja/posts/2015-6-30-cs-research-internship-abroad-2/>) | [https://blog.junkato.jp/ja/posts/2015-06-30-cs-research-internship-abroad-2/](<https://blog.junkato.jp/ja/posts/2015-06-30-cs-research-internship-abroad-2/>) | [src/data/histories.json:927](../src/data/histories.json#L927) |
| X0418 | [https://blog.junkato.jp/ja/posts/2016-3-16-ipsj-one-px-science-as-a-service/](<https://blog.junkato.jp/ja/posts/2016-3-16-ipsj-one-px-science-as-a-service/>) | [https://blog.junkato.jp/ja/posts/2016-03-16-ipsj-one-px-science-as-a-service/](<https://blog.junkato.jp/ja/posts/2016-03-16-ipsj-one-px-science-as-a-service/>) | [src/data/histories.json:891](../src/data/histories.json#L891) |
| X0425 | [https://blog.junkato.jp/ja/posts/2017-10-8-live-programming/](<https://blog.junkato.jp/ja/posts/2017-10-8-live-programming/>) | [https://blog.junkato.jp/ja/posts/2017-10-08-live-programming/](<https://blog.junkato.jp/ja/posts/2017-10-08-live-programming/>) | [src/data/histories.json:839](../src/data/histories.json#L839) |
| X0428 | [https://blog.junkato.jp/ja/posts/2018-06-09-arch-inc-technical-advisor/](<https://blog.junkato.jp/ja/posts/2018-06-09-arch-inc-technical-advisor/>) | [https://blog.junkato.jp/ja/posts/2018-07-09-arch-inc-technical-advisor/](<https://blog.junkato.jp/ja/posts/2018-07-09-arch-inc-technical-advisor/>) | [src/data/histories.json:803](../src/data/histories.json#L803) |
| X0633 | [https://github.com/arcatdmz/arcatdmz.github.io/blog/main/package.json](<https://github.com/arcatdmz/arcatdmz.github.io/blog/main/package.json>) | [https://github.com/arcatdmz/arcatdmz.github.io/blob/main/package.json](<https://github.com/arcatdmz/arcatdmz.github.io/blob/main/package.json>) | [pages/ja/website/index.tsx:256](../pages/ja/website/index.tsx#L256)<br>[pages/website/index.tsx:253](../pages/website/index.tsx#L253) |
| X1004 | [https://uist.acm.org/2025/program.html](<https://uist.acm.org/2025/program.html>) | [https://uist.acm.org/2025/papers/](<https://uist.acm.org/2025/papers/>) | [pages/ja/tweeq/index.tsx:205](../pages/ja/tweeq/index.tsx#L205) |
| X1025 | [https://uist.acm.org/uist2025/organizers](<https://uist.acm.org/uist2025/organizers>) | [https://uist.acm.org/2025/organizers/](<https://uist.acm.org/2025/organizers/>) | [src/data/misc.json:112](../src/data/misc.json#L112) |

## その他のHTTP 404

各行の編集元で、元の記事・イベント・論文の移転先かWayback保存版に置換してください。見つからない場合は当時の説明文を残してリンクだけ外せます。全掲載ページはCSVに含めています。

`blob/main/pages/...` の5件は、ローカルにはファイルが存在します。React移行がmainに未反映の間のソース参照なので、mainへの反映後に再確認してください。

| ID | URL | 掲載ページ | 編集元 | 対応 |
| --- | --- | --- | --- | --- |
| X0085 | [http://hci.tokyo/seminar/chi2015](<http://hci.tokyo/seminar/chi2015>) | `/ja/timeline/2015/`<br>`/ja/timeline/` | [src/data/histories.json:931](../src/data/histories.json#L931) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0105 | [http://id.nii.ac.jp/1001/182949/](<http://id.nii.ac.jp/1001/182949/>) | `/ja/publications/`<br>`/ja/timeline/2017/`<br>`/ja/timeline/` | [src/junkato.bib:1402](../src/junkato.bib#L1402) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0106 | [http://ide.digitalmuseum.jp/Integrated_development_environment/ja](<http://ide.digitalmuseum.jp/Integrated_development_environment/ja>) | `/ja/talks/as-a-code/`<br>`/ja/talks/people-are-programmers/` | [site/talks/as-a-code.tsx:53](../site/talks/as-a-code.tsx#L53)<br>[site/talks/people-are-programmers.tsx:211](../site/talks/people-are-programmers.tsx#L211) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0110 | [http://kadecot.net/ouch-hack/](<http://kadecot.net/ouch-hack/>) | `/ja/timeline/2014/`<br>`/ja/timeline/` | [pages/homehack/index.tsx:294](../pages/homehack/index.tsx#L294)<br>[pages/ja/homehack/index.tsx:294](../pages/ja/homehack/index.tsx#L294)<br>[src/data/histories.json:967](../src/data/histories.json#L967) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0117 | [http://phybots.com/jp](<http://phybots.com/jp>) | `/ja/phybots/`<br>`/ja/publications/`<br>`/ja/timeline/2010/`<br>ほか1ページ（CSV参照） | [src/junkato.bib:1582](../src/junkato.bib#L1582) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0155 | [http://textalive.jp/paper](<http://textalive.jp/paper>) | `/ja/timeline/2015/`<br>`/ja/timeline/` | [src/data/histories.json:923](../src/data/histories.json#L923) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0163 | [http://up.csail.mit.edu/collabode/](<http://up.csail.mit.edu/collabode/>) | `/user-generated-variables/` | [src/user-generated-variables/index.html:156](../src/user-generated-variables/index.html#L156) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0172 | [http://www-ui.is.s.u-tokyo.ac.jp/~fukahori/capstudio/capstudio_en.html](<http://www-ui.is.s.u-tokyo.ac.jp/~fukahori/capstudio/capstudio_en.html>) | `/live-programming/`<br>`/projects/`<br>`/publications/`<br>ほか3ページ（CSV参照） | [src/data/projects.json:731](../src/data/projects.json#L731) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0173 | [http://www-ui.is.s.u-tokyo.ac.jp/~fukahori/capstudio/capstudio.html](<http://www-ui.is.s.u-tokyo.ac.jp/~fukahori/capstudio/capstudio.html>) | `/ja/live-programming/`<br>`/ja/projects/`<br>`/ja/publications/`<br>ほか3ページ（CSV参照） | [src/data/projects.json:734](../src/data/projects.json#L734) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0199 | [http://www.ipa.go.jp/english/humandev/third.html](<http://www.ipa.go.jp/english/humandev/third.html>) | `/publications/` | [pages/resume.tsx:763](../pages/resume.tsx#L763)<br>[src/data/awards.json:276](../src/data/awards.json#L276) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0209 | [http://www.jsps.go.jp/english/e-pd/pddc.htm](<http://www.jsps.go.jp/english/e-pd/pddc.htm>) | `/publications/` | [src/data/awards.json:244](../src/data/awards.json#L244) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0214 | [http://www.maynoothuniversity.ie/smc15/](<http://www.maynoothuniversity.ie/smc15/>) | `/timeline/2015/`<br>`/timeline/` | [src/data/awards.json:170](../src/data/awards.json#L170)<br>[src/data/histories.json:309](../src/data/histories.json#L309) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0219 | [http://www.s.u-tokyo.ac.jp/ja/map/map06.html](<http://www.s.u-tokyo.ac.jp/ja/map/map06.html>) | `/ja/timeline/2014/`<br>`/ja/timeline/` | [src/data/histories.json:1007](../src/data/histories.json#L1007) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0221 | [http://www.sei.pku.edu.cn/people/zhanglu/my-papers/ICSE13-Tool](<http://www.sei.pku.edu.cn/people/zhanglu/my-papers/ICSE13-Tool>) | `/user-generated-variables/` | [src/user-generated-variables/index.html:460](../src/user-generated-variables/index.html#L460) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0225 | [http://www.sigmodj.org/conf/detail.php?conf_no=72](<http://www.sigmodj.org/conf/detail.php?conf_no=72>) | `/ja/publications/`<br>`/ja/timeline/2019/`<br>`/ja/timeline/` | [src/data/talks.json:140](../src/data/talks.json#L140) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0226 | [http://www.sigmus.jp/?page_id=2780](<http://www.sigmus.jp/?page_id=2780>) | `/ja/publications/`<br>`/ja/timeline/2014/`<br>`/ja/timeline/` | [src/data/awards.json:197](../src/data/awards.json#L197)<br>[src/data/histories.json:971](../src/data/histories.json#L971) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0356 | [https://blog.adobe.com/en/publish/2017/08/28/where-did-the-term-user-experience-come-from.html](<https://blog.adobe.com/en/publish/2017/08/28/where-did-the-term-user-experience-come-from.html>) | `/ja/user-interface-design/` | [pages/ja/user-interface-design/index.tsx:863](../pages/ja/user-interface-design/index.tsx#L863) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0628 | [https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/homehack/index.tsx](<https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/homehack/index.tsx>) | `/homehack/` | [site/components/ContentComponents.tsx:38](../site/components/ContentComponents.tsx#L38) | main反映後に確認 |
| X0629 | [https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/live-tuning/index.tsx](<https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/live-tuning/index.tsx>) | `/ja/live-tuning/` | [site/components/ContentComponents.tsx:38](../site/components/ContentComponents.tsx#L38) | main反映後に確認 |
| X0630 | [https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/openpool/index.tsx](<https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/openpool/index.tsx>) | `/ja/openpool/` | [site/components/ContentComponents.tsx:38](../site/components/ContentComponents.tsx#L38) | main反映後に確認 |
| X0631 | [https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/phybots/index.tsx](<https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/phybots/index.tsx>) | `/ja/phybots/` | [site/components/ContentComponents.tsx:38](../site/components/ContentComponents.tsx#L38) | main反映後に確認 |
| X0632 | [https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/programming-with-examples/index.tsx](<https://github.com/arcatdmz/arcatdmz.github.io/blob/main/pages/programming-with-examples/index.tsx>) | `/ja/programming-with-examples/` | [site/components/ContentComponents.tsx:38](../site/components/ContentComponents.tsx#L38) | main反映後に確認 |
| X0670 | [https://ibakira.tv/movies/view/105398](<https://ibakira.tv/movies/view/105398>) | `/ja/publications/`<br>`/ja/timeline/2025/`<br>`/ja/timeline/` | [src/data/media.json:216](../src/data/media.json#L216) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0791 | [https://prtimes.jp/main/html/rd/p/000000076.000072682.html](<https://prtimes.jp/main/html/rd/p/000000076.000072682.html>) | `/ja/publications/`<br>`/ja/timeline/2024/`<br>`/ja/timeline/` | [src/data/media.json:469](../src/data/media.json#L469) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0833 | [https://ryosuzuki.org/publications/chi-2018-reactile-slide.pdf](<https://ryosuzuki.org/publications/chi-2018-reactile-slide.pdf>) | `/ja/publications/`<br>`/ja/timeline/2018/`<br>`/ja/timeline/`<br>ほか3ページ（CSV参照） | [src/data/histories.json:237](../src/data/histories.json#L237)<br>[src/junkato.bib:498](../src/junkato.bib#L498) | 著者保存版かDOI掲載先に置換 |
| X0834 | [https://ryosuzuki.org/publications/chi-2018-reactile.pdf](<https://ryosuzuki.org/publications/chi-2018-reactile.pdf>) | `/ja/publications/`<br>`/ja/timeline/2018/`<br>`/ja/timeline/`<br>ほか3ページ（CSV参照） | [src/junkato.bib:497](../src/junkato.bib#L497) | 著者保存版かDOI掲載先に置換 |
| X0840 | [https://sa2021.siggraph.org/en/about-us/siggraph-asia-2021-committee/real-time-live-committee](<https://sa2021.siggraph.org/en/about-us/siggraph-asia-2021-committee/real-time-live-committee>) | `/resume.html`<br>`/resume/` | [src/data/misc.json:234](../src/data/misc.json#L234) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0845 | [https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en](<https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en>) | `/dejavu/`<br>`/ja/dejavu/`<br>`/ja/touchdevelop/` | [pages/dejavu/index.tsx:99](../pages/dejavu/index.tsx#L99)<br>[pages/ja/dejavu/index.tsx:94](../pages/ja/dejavu/index.tsx#L94)<br>[pages/ja/touchdevelop/index.tsx:122](../pages/ja/touchdevelop/index.tsx#L122) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0852 | [https://scrapbox.io/otonglass-fabbiotope/%E7%94%A3%E6%A5%AD%E6%8A%80%E8%A1%93%E7%B7%8F%E5%90%88%E7%A0%94%E7%A9%B6%E6%89%80%E3%81%A8%E3%81%AE%E5%85%B1%E5%90%8C%E7%A0%94%E7%A9%B6%E3%82%92%E9%96%8B%E5%A7%8B%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F](<https://scrapbox.io/otonglass-fabbiotope/%E7%94%A3%E6%A5%AD%E6%8A%80%E8%A1%93%E7%B7%8F%E5%90%88%E7%A0%94%E7%A9%B6%E6%89%80%E3%81%A8%E3%81%AE%E5%85%B1%E5%90%8C%E7%A0%94%E7%A9%B6%E3%82%92%E9%96%8B%E5%A7%8B%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F>) | `/ja/programming-as-communication/` | [pages/ja/programming-as-communication/index.tsx:277](../pages/ja/programming-as-communication/index.tsx#L277) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0866 | [https://sigchi.org/conferences/conference-history/chi/](<https://sigchi.org/conferences/conference-history/chi/>) | `/ja/user-interface-design/` | [pages/ja/user-interface-design/index.tsx:176](../pages/ja/user-interface-design/index.tsx#L176) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X0905 | [https://textalive.jp/about](<https://textalive.jp/about>) | `/ja/talks/people-are-programmers/p3.html` | [site/talks/people-are-programmers.tsx:1215](../site/talks/people-are-programmers.tsx#L1215) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1034 | [https://uxpajournal.org/sus-a-retrospective/](<https://uxpajournal.org/sus-a-retrospective/>) | `/ja/user-interface-design/` | [pages/ja/user-interface-design/index.tsx:1156](../pages/ja/user-interface-design/index.tsx#L1156) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1124 | [https://www.connichi.de/en](<https://www.connichi.de/en>) | `/ja/publications/`<br>`/ja/timeline/2021/`<br>`/ja/timeline/`<br>ほか3ページ（CSV参照） | [src/data/histories.json:169](../src/data/histories.json#L169)<br>[src/data/talks.json:116](../src/data/talks.json#L116) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1137 | [https://www.daiwahouse.co.jp/lab/HousingAPI/symposium/index.html](<https://www.daiwahouse.co.jp/lab/HousingAPI/symposium/index.html>) | `/homehack/`<br>`/homehack/rhythm-kaden/`<br>`/ja/homehack/`<br>ほか1ページ（CSV参照） | [pages/homehack/index.tsx:143](../pages/homehack/index.tsx#L143)<br>[pages/homehack/rhythm-kaden/index.tsx:142](../pages/homehack/rhythm-kaden/index.tsx#L142)<br>[pages/ja/homehack/index.tsx:143](../pages/ja/homehack/index.tsx#L143) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1144 | [https://www.elsevier.com/physical-sciences/computer-science/executable-papers-improving-the-article-format-in-computer-science](<https://www.elsevier.com/physical-sciences/computer-science/executable-papers-improving-the-article-format-in-computer-science>) | `/ja/science/` | [pages/ja/science/index.tsx:324](../pages/ja/science/index.tsx#L324) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1163 | [https://www.hokkaido-np.co.jp/article/448189](<https://www.hokkaido-np.co.jp/article/448189>) | `/ja/publications/`<br>`/ja/timeline/2020/`<br>`/ja/timeline/` | [src/data/media.json:843](../src/data/media.json#L843) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1165 | [https://www.ieice.org/ken/program/index.php?tgs_regid=5b2aa0a18db7b1e9f6a813e5286dbfad37882fd3fe9b0d74c9c3087ae91ed2a9&tgid=IEICE-CNR](<https://www.ieice.org/ken/program/index.php?tgs_regid=5b2aa0a18db7b1e9f6a813e5286dbfad37882fd3fe9b0d74c9c3087ae91ed2a9&tgid=IEICE-CNR>) | `/ja/fun/` | `/ja/fun/` | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1166 | [https://www.ieice.org/ken/program/index.php?tgs_regid=abed63bc529af3a3885b0721e912ca90b17fc69c5bec01f73c25fda12290ef49&tgid=IEICE-DE](<https://www.ieice.org/ken/program/index.php?tgs_regid=abed63bc529af3a3885b0721e912ca90b17fc69c5bec01f73c25fda12290ef49&tgid=IEICE-DE>) | `/ja/publications/`<br>`/ja/timeline/2019/`<br>`/ja/timeline/` | [src/data/talks.json:140](../src/data/talks.json#L140) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1176 | [https://www.ipa.go.jp/english/humandev/third.html](<https://www.ipa.go.jp/english/humandev/third.html>) | `/resume.html`<br>`/resume/` | [pages/resume.tsx:763](../pages/resume.tsx#L763)<br>[src/data/awards.json:276](../src/data/awards.json#L276) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1177 | [https://www.ipa.go.jp/index-e.html](<https://www.ipa.go.jp/index-e.html>) | `/resume.html`<br>`/resume/` | [pages/resume.tsx:757](../pages/resume.tsx#L757) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1213 | [https://www.jst.go.jp/kisoken/boshuu/r02/teian/top/ryoiki/ryoiki_a03.html](<https://www.jst.go.jp/kisoken/boshuu/r02/teian/top/ryoiki/ryoiki_a03.html>) | `/ja/timeline/2022/`<br>`/ja/timeline/` | [src/data/histories.json:651](../src/data/histories.json#L651) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1228 | [https://www.meiji.ac.jp/koho/press/2018/6t5h7p00000u2st3.html](<https://www.meiji.ac.jp/koho/press/2018/6t5h7p00000u2st3.html>) | `/ja/publications/`<br>`/ja/timeline/2019/`<br>`/ja/timeline/` | [src/data/talks.json:154](../src/data/talks.json#L154) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1272 | [https://www.sparkfun.com/products/684](<https://www.sparkfun.com/products/684>) | `/homehack/realmote/`<br>`/ja/homehack/realmote/` | [pages/homehack/realmote/index.tsx:142](../pages/homehack/realmote/index.tsx#L142)<br>[pages/ja/homehack/realmote/index.tsx:142](../pages/ja/homehack/realmote/index.tsx#L142) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |
| X1274 | [https://www.taf.or.jp/files/2198/552880864.pdf](<https://www.taf.or.jp/files/2198/552880864.pdf>) | `/ja/timeline/2025/`<br>`/ja/timeline/` | [src/data/histories.json:495](../src/data/histories.json#L495) | 元記事・イベント名で移転先またはWaybackの保存版を探して置換。保存版もなければリンクだけ外し本文を残す |

## DNS・証明書の問題

名前解決失敗をサービスの終了とは断定していません。同じサービス・著者の現行URLか保存版を探す対象です。Amazon書影はW5を参照。

| ID | URL | 結果 | 掲載ページ | 編集元 |
| --- | --- | --- | --- | --- |
| X0027 | [http://designinterface.jp/projects/CRISTAL/cristal-2009.pdf](<http://designinterface.jp/projects/CRISTAL/cristal-2009.pdf>) | ENOTFOUND | `/ja/publications/`<br>`/ja/timeline/`<br>`/publications/`<br>ほか1ページ（CSV参照） | [src/junkato.bib:989](../src/junkato.bib#L989) |
| X0078 | [http://gibber.mat.ucsb.edu/](<http://gibber.mat.ucsb.edu/>) | ENOTFOUND | `/ja/talks/as-a-code/p2.html` | [site/talks/as-a-code.tsx:111](../site/talks/as-a-code.tsx#L111) |
| X0079 | [http://hackathon.songle.jp/](<http://hackathon.songle.jp/>) | ENOTFOUND | `/ja/timeline/2018/`<br>`/ja/timeline/` | [src/data/histories.json:823](../src/data/histories.json#L823) |
| X0109 | [http://itri.aist-go.jp/](<http://itri.aist-go.jp/>) | ENOTFOUND | `/ja/talks/people-are-programmers/` | [site/talks/people-are-programmers.tsx:157](../site/talks/people-are-programmers.tsx#L157) |
| X0136 | [http://shapejs.shapeways.com/](<http://shapejs.shapeways.com/>) | ENOTFOUND | `/ja/talks/as-a-code/p2.html` | [site/talks/as-a-code.tsx:126](../site/talks/as-a-code.tsx#L126) |
| X0149 | [http://songmash.jp/](<http://songmash.jp/>) | ENOTFOUND | `/design/`<br>`/ja/design/` | [src/data/projects.json:927](../src/data/projects.json#L927) |
| X0161 | [http://tutorons.com/](<http://tutorons.com/>) | ENOTFOUND | `/deployground/`<br>`/ja/deployground/` | [pages/deployground/index.tsx:219](../pages/deployground/index.tsx#L219)<br>[pages/ja/deployground/index.tsx:219](../pages/ja/deployground/index.tsx#L219) |
| X0717 | [https://m.wantedly.com/](<https://m.wantedly.com/>) | ENOTFOUND | `/ja/teaparty/2016/` | [pages/ja/teaparty/2016/index.tsx:131](../pages/ja/teaparty/2016/index.tsx#L131) |
| X0751 | [https://mi-lab.org/portfolio-item/cristal](<https://mi-lab.org/portfolio-item/cristal>) | ENOTFOUND | `/ja/publications/`<br>`/ja/timeline/`<br>`/publications/`<br>ほか3ページ（CSV参照） | [src/data/awards.json:267](../src/data/awards.json#L267) |
| X0831 | [https://runkit.com/](<https://runkit.com/>) | CERT_HAS_EXPIRED | `/deployground/`<br>`/ja/deployground/` | [pages/deployground/index.tsx:312](../pages/deployground/index.tsx#L312)<br>[pages/ja/deployground/index.tsx:312](../pages/ja/deployground/index.tsx#L312) |
| X0901 | [https://tcher.tech/](<https://tcher.tech/>) | ENOTFOUND | `/ja/programming-as-communication/`<br>`/programming-as-communication/` | [pages/ja/programming-as-communication/index.tsx:166](../pages/ja/programming-as-communication/index.tsx#L166)<br>[pages/programming-as-communication/index.tsx:166](../pages/programming-as-communication/index.tsx#L166) |
| X0919 | [https://touchdevelop.com/](<https://touchdevelop.com/>) | ENOTFOUND | `/ja/touchdevelop/` | [pages/ja/touchdevelop/index.tsx:215](../pages/ja/touchdevelop/index.tsx#L215) |
| X1079 | [https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=013438038X&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP](<https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=013438038X&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP>) | ENOTFOUND | `/ja/user-interface-design/` | [pages/ja/user-interface-design/index.tsx:749](../pages/ja/user-interface-design/index.tsx#L749) |
| X1080 | [https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4621304674&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP](<https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4621304674&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP>) | ENOTFOUND | `/ja/user-interface-design/` | [pages/ja/user-interface-design/index.tsx:138](../pages/ja/user-interface-design/index.tsx#L138) |
| X1081 | [https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4861008212&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP](<https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4861008212&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP>) | ENOTFOUND | `/ja/user-interface-design/` | [pages/ja/user-interface-design/index.tsx:1255](../pages/ja/user-interface-design/index.tsx#L1255) |
| X1082 | [https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0029ZBK80&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP](<https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0029ZBK80&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=digitalmuseum-22&language=ja_JP>) | ENOTFOUND | `/ja/user-interface-design/` | [pages/ja/user-interface-design/index.tsx:931](../pages/ja/user-interface-design/index.tsx#L931) |
| X1195 | [https://www.itri.aist.go.jp/](<https://www.itri.aist.go.jp/>) | ENOTFOUND | `/ja/timeline/2014/`<br>`/ja/timeline/` | [src/data/histories.json:991](../src/data/histories.json#L991) |
| X1282 | [https://www.touchdevelop.com/app/](<https://www.touchdevelop.com/app/>) | ENOTFOUND | `/ja/timeline/2013/`<br>`/ja/timeline/` | [src/data/histories.json:1047](../src/data/histories.json#L1047) |
| X1283 | [https://www.touchdevelop.com/docs/pages-and-boxes](<https://www.touchdevelop.com/docs/pages-and-boxes>) | ENOTFOUND | `/ja/touchdevelop/`<br>`/touchdevelop/` | [pages/ja/touchdevelop/index.tsx:198](../pages/ja/touchdevelop/index.tsx#L198)<br>[pages/touchdevelop/index.tsx:59](../pages/touchdevelop/index.tsx#L59) |
| X1284 | [https://www.touchdevelop.com/rthv](<https://www.touchdevelop.com/rthv>) | ENOTFOUND | `/ja/touchdevelop/` | [pages/ja/touchdevelop/index.tsx:194](../pages/ja/touchdevelop/index.tsx#L194) |

## 操作・表示の再確認を具体的に残すもの

| 対象ページ | URL・現状 | 次の確認と完了条件 |
| --- | --- | --- |
| `/openpool/`、`/ja/openpool/` | Facebook動画ID `608850275796418`、`614971478517631`、`615808058433973`。HTTP 200とプレイヤーUI・Cookie案内までは確認。再生試行はログイン先への遷移と検証環境の通信制限があり、未確定 | 通常ブラウザーのログアウト状態で各動画を再生。3件とも時刻が進めば完了。ログイン必須なら動画所有者に公開範囲を確認し、公開動画への置換またはリンク化を判断。編集元は英日 `pages/**/openpool/index.tsx` |
| `/homehack/`、`/ja/homehack/` | SlideShare `38527331`。転送先はHTTP 200、ブラウザーでは「cookies are disabled」のClient Challenge | 通常ブラウザーで当該スライドの1枚目・ページ送りが動くか確認。動くなら維持。制限が残るなら手元のスライドをPDFとして配信して置換、または通常リンク化。編集元は英日 `pages/**/homehack/index.tsx` |
| `/live-programming/`、`/ja/live-programming/` | Google Slides `2PACX-1vSFvd9_lLppM-CnW9Qr2TXxPCETq9WAedQPIvgTebXe328vTvSP3-SUIJNGtimZR7ygSSb4LOHheLYq`。HTTP 200と「JSSST チュートリアル (公開版)」の枠を確認、スライド本文の描画完了は確認できず | 通常ブラウザーで埋め込みを開いて1枚目・次のスライドが描画されることを確認。表示されなければ資料所有者が「ウェブに公開」を再設定し、新しい埋め込みURLに置換 |
| `/ja/teaparty/2016/` | Google Mapsの住所埋め込みはHTTP 200だが検証環境のフレームは空 | 通常ブラウザーで会場のピンが出るか確認。出れば完了。出なければGoogle Mapsから同じ会場の現行埋め込みURLを取り直す。編集元は `pages/ja/teaparty/2016/index.tsx` |

Google Sheetsの2015・2016・2018年のお茶会タイムテーブルは、タイトルと子iframe内の表本文をブラウザーで確認できました。Travel mapの正常URLと締切ページの5カウントダウンも表示確認済みです。

## 自動アクセス制限・一時障害

HTTP 202/403/999やタイムアウトは、URL欠落とは区別しています。CSVの `category` と `next_action` で、対象URL・掲載ページ・編集元を個別に追えます。

出版社へのアクセスで失敗したDOIは68種類を標準の登録メタデータ取得で再検査し、51種類の登録を確認しました。残り17種類は登録情報の応答が429（レート制限）でした。登録を確認したDOIは、本文アクセスが制限されていてもリンク修正対象にしません。残りは時間を置いて通常ブラウザーでDOIの論文タイトルを確認するか、登録情報を再取得してください。

一般の403等は通常ブラウザーで同じURLの本文が見えれば確認完了です。継続して認証・Cookieが必要なら、公開版や保存版への置換を判断してください。通信エラーは一時的な場合があるので、継続して再現した宛先だけを修正します。
