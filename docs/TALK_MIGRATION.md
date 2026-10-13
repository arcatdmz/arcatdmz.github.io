# 2015年の講演ページの移行

2026-10-14、旧サイトに保存されていた PHP から、2講演の全3章を React / Next.js に移行した。`.old/index.html` には第1章しか保存されていなかったため、第2・第3章は VPS の元ソースから復元した。

| 講演 | 元ソース | 現行の本文 |
| --- | --- | --- |
| * as a Code | 旧版PHP | [as-a-code.tsx](../site/talks/as-a-code.tsx) |
| ぼくらのプログラミングから、みんなのプログラミングへ | 旧版PHP | [people-are-programmers.tsx](../site/talks/people-are-programmers.tsx) |

日本語ルートの PHP は上記の共通ソースを読み込むだけだった。講演当時の文章とリンク付きスライドを残し、固定本文は直接編集できる JSX にした。Bootstrap のナビゲーション・グリッド・ラベル・フォーム・ボタンは Fomantic UI に移行し、共通ヘッダー・サイドバー・フッターを使う。講演専用の小さなCSSは `main.css` に含め、他のページからのクライアント遷移でも初めから適用できるようにした。対応する英語版がないため言語切り替えは表示しない。

## URL

両講演で次の構成を使う。

| URL | 内容 |
| --- | --- |
| `/ja/talks/{slug}/` / `index.html` | 第1章 |
| `/ja/talks/{slug}/p1.html` | 第1章への転送 |
| `/ja/talks/{slug}/p2.html` | 第2章 |
| `/ja/talks/{slug}/p3.html` | 第3章 |
| `/ja/talks/{slug}/?p=2` / `?p=3` | JavaScript有効時に該当章へ転送 |
| `/ja/talks/{slug}.old/` | 移行済みページへの転送 |
| `/ja/talks/as-a-code/ide/` | 復元した簡易IDE |
| `/ja/talks/as-a-code.old/ide.html` | 簡易IDEへの転送 |

`slug` は `as-a-code` または `people-are-programmers`。章リンクは Next Link を使う。開発時の `index.html` は rewrite で対応し、静的ホスティングでは通常のディレクトリインデックスを使う。Next の書き出す `.html` 章ファイル名は `scripts/finalize-export.ts` で上記URLに正規化する。画像は既存の `.old/` 以下の実ファイルを継続利用する。

## コード実行デモ

終了した jsdo.it 埋め込みと RawGit CDN、旧 Ace / EaselJS / jQuery への依存を取り除いた。`CodePlayground` のテキストエディターと Canvas で、第2章の静止画デモ、第3章および独立ページの簡易IDEを実行できる。

- `color(r, g, b)` / `dot(x, y)` / `line(x, y, ex, ey)` / `print(text)`、128×128の描画領域を提供する。
- 編集後に自動実行し、実行ボタンでも再実行できる。
- 毎回新しい Web Worker で実行し、1秒で中断する。ページを離れるとタイマーと Worker を破棄する。
- 静止画は `p2.html?code=...` でコードを共有できる。簡易IDEはブラウザーの localStorage に保存できる。
- 旧講義と同じ固定バージョンの JS-Interpreter をローカル配信して、ES5 の実行環境を維持する。解釈されるコードには DOM やネットワークAPIを公開しない。ライセンスと復元元は `src/talks/as-a-code/vendor/` に同梱する。

第1章に載せたブラウザーコンソール向けコードは講義当時の例として残しており、旧Twitterウィジェットの動作を復元するものではない。

## TextAlive API の残作業

`people-are-programmers/p3.html` の以下3つのAPIデモは保留。動かない入力欄の代わりに説明と TextAlive へのリンクを表示する。既存の YouTube デモ動画は残す。

| 元の要素 | デモ | 元の操作 |
| --- | --- | --- |
| `#tapl1` | 動画を時刻の関数として描画 | 0〜15000 ms を入力し、`v = f(t)` でフレーム描画 |
| `#tapl2` | UIメタデータから演出を調整 | 花びらの枚数を3〜30枚に変更（初期値5） |
| `#tapl3` | 時間・空間解像度の独立性 | 拡大率1〜100（刻み0.001）を指定 |

元の実装は VPS の `talks/people-are-programmers/index.php` の末尾（`if ($page == 3)`）に残る。HTTPの `textalive.jp/javascripts/api/embed-v1.js` と旧 rangeslider に依存している。

## 検証

型チェック、静的ビルド、PC・スマートフォンのブラウザーテスト6件が通過。スクリーンショットでもレイアウトを確認した。ブラウザーテストで、全6章、章リンク・履歴戻り、互換URLの転送、画像の読み込み・縦横比、横スクロールの有無を確認した。コード実行は描画、共有URL、計算結果、エラー、無限ループ中断、保存・再読み込みを検証した。
