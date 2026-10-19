import { Button, Form, Grid, Header, Icon, Segment } from "react-fomantic-ui";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/router";

const defaultCode = "// My First IDE\n1 + 2";
type Command = { type: "dot" | "line"; color: string; points: number[] };
interface Result {
  output: string;
  commands: Command[];
}

/** Execute each edit in a disposable worker, including programs that never end. */
export function CodePlayground({
  initialCode = defaultCode,
  drawing = false,
  storageKey,
  active = true,
}: {
  initialCode?: string;
  drawing?: boolean;
  storageKey?: string;
  active?: boolean;
}) {
  const id = useId();
  const router = useRouter();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [saved, setSaved] = useState("");
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const sharedCode = drawing ? router.query.code : undefined;
    if (typeof sharedCode === "string") setCode(sharedCode);
    else if (storageKey) {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored !== null) setCode(stored);
      } catch {
        /* The editor also works when storage is unavailable. */
      }
    }
    setReady(true);
  }, [router.isReady, drawing, storageKey]);

  useEffect(() => {
    if (!active || !ready) return;
    let worker: Worker | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    const debounce = setTimeout(() => {
      setOutput("実行中…");
      const context = canvas.current?.getContext("2d");
      context?.clearRect(0, 0, 128, 128);
      try {
        worker = new Worker("/talks/as-a-code/playground-worker.js");
        const finish = (result: Result) => {
          clearTimeout(deadline);
          worker?.terminate();
          if (context) {
            for (const command of result.commands) {
              context.fillStyle = context.strokeStyle = command.color;
              if (command.type === "dot")
                context.fillRect(command.points[0], command.points[1], 1, 1);
              else {
                context.beginPath();
                context.moveTo(command.points[0], command.points[1]);
                context.lineTo(command.points[2], command.points[3]);
                context.stroke();
              }
            }
          }
          setOutput(result.output);
        };
        worker.onmessage = (event) => finish(event.data as Result);
        worker.onerror = () =>
          finish({ output: "実行環境を読み込めませんでした。", commands: [] });
        deadline = setTimeout(
          () =>
            finish({
              output: "実行を中断しました（時間制限）。",
              commands: [],
            }),
          1000,
        );
        worker.postMessage({ code });
      } catch {
        setOutput("このブラウザーではコードを実行できません。 ");
      }
    }, 200);
    return () => {
      clearTimeout(debounce);
      clearTimeout(deadline);
      worker?.terminate();
    };
  }, [code, drawing, active, ready, revision]);

  function save() {
    try {
      localStorage.setItem(storageKey!, code);
      setSaved("このブラウザーに保存しました。");
    } catch {
      setSaved("保存できませんでした。");
    }
  }
  const shareHref = `/ja/talks/as-a-code/p2.html?code=${encodeURIComponent(
    code,
  )}`;
  return (
    <div className="talk-playground">
      <Grid stackable columns={2}>
        <Grid.Column>
          <Form as="div">
            <Form.Field>
              <label htmlFor={id}>JavaScript</label>
              <textarea
                id={id}
                spellCheck={false}
                value={code}
                onChange={(event) => setCode(event.target.value)}
                rows={10}
              />
            </Form.Field>
          </Form>
          <Segment basic className="talk-actions">
            <Button
              primary
              type="button"
              onClick={() => setRevision((value) => value + 1)}
            >
              <Icon name="play" aria-hidden="true" />
              実行
            </Button>
            {storageKey && (
              <Button type="button" onClick={save}>
                <Icon name="save" aria-hidden="true" />
                保存
              </Button>
            )}
            {drawing && (
              <Button role="link" as="a" href={shareHref}>
                コードを共有
              </Button>
            )}
          </Segment>
          <p className="talk-note">
            編集すると実行結果が更新されます。
            {drawing &&
              "color(r, g, b)、dot(x, y)、line(x, y, ex, ey)、print(text) が使えます。"}
          </p>
          <p role="status">{saved}</p>
        </Grid.Column>
        <Grid.Column>
          {drawing && (
            <canvas
              ref={canvas}
              width={128}
              height={128}
              aria-label="プログラムの描画結果"
            />
          )}
          <Header as="h3">実行結果</Header>
          <pre className="talk-code" role="status" aria-live="polite">
            {output}
          </pre>
        </Grid.Column>
      </Grid>
    </div>
  );
}
