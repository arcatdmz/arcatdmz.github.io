import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { HtmlContent } from "./RichText";
import { playAttention } from "./useTransition";
interface Entry {
  date: string;
  text: string;
}
const HistoryContext = createContext<{
  entries: Entry[];
  more: () => void;
  loading: boolean;
  exhausted: boolean;
  ready: boolean;
  error: boolean;
} | null>(null);
export function HomeHistory({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [all, setAll] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const pending = useRef(false);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    setReady(true);
    return () => controller.current?.abort();
  }, []);
  const more = async () => {
    if (pending.current) return;
    pending.current = true;
    setLoading(true);
    setError(false);
    controller.current = new AbortController();
    try {
      const response = all
        ? null
        : await fetch(`/data/histories-${lang}.json`, {
            signal: controller.current.signal,
          });
      if (response && !response.ok) throw new Error("Unable to load history");
      const data: Entry[] = all || (await response!.json());
      if (controller.current.signal.aborted) return;
      setAll(data);
      setEntries(data.slice(5, entries.length + 10));
    } catch {
      if (!controller.current.signal.aborted) setError(true);
    } finally {
      if (!controller.current.signal.aborted) {
        pending.current = false;
        setLoading(false);
      }
    }
  };
  return (
    <HistoryContext.Provider
      value={{
        entries,
        more,
        loading,
        exhausted: !!all && entries.length + 5 >= all.length,
        ready,
        error,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}
export function HistoryFeed({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const history = useContext(HistoryContext);
  return (
    <div {...props}>
      {children}
      {history?.entries.map((entry, index) => (
        <AddedHistoryEntry key={index} entry={entry} />
      ))}
    </div>
  );
}
function AddedHistoryEntry({ entry }: { entry: Entry }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => playAttention(element.current, "jiggle"), []);
  return (
    <div ref={element} className="event">
      <div className="content">
        <div className="date">{entry.date}</div>
        <div className="header">
          <HtmlContent html={entry.text} />
        </div>
      </div>
    </div>
  );
}
export function HistoryMore({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const history = useContext(HistoryContext);
  const disabled = !history?.ready || history.loading || history.exhausted;
  return (
    <>
      <a
        {...props}
        className={`${className.replace(/\bdisabled\b/g, "")}${
          disabled ? " disabled" : ""
        }${history?.loading ? " loading" : ""}`}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled) history?.more();
        }}
        onKeyDown={(event) => {
          if (!disabled && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            history?.more();
          }
        }}
      >
        {children}
      </a>
      {history?.error && (
        <span role="status">
          {document.documentElement.lang === "ja"
            ? "読み込めませんでした。もう一度お試しください。"
            : "Could not load updates. Please try again."}
        </span>
      )}
    </>
  );
}
