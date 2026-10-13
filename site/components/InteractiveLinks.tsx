import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { Popup } from "./SiteWidgets";
import { useTransition, playAttention } from "./useTransition";

interface TagData {
  tags: Record<string, { title: string; label: string; href?: string }>;
  projects: { project: string; title: string; tags: string[] }[];
}
const tagRequests = new Map<string, Promise<TagData>>();
function loadTags(lang: string): Promise<TagData> {
  let request = tagRequests.get(lang);
  if (!request) {
    request = fetch(`/data/project-tags-${lang}.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load project tags");
        return response.json() as Promise<TagData>;
      })
      .catch((error) => {
        tagRequests.delete(lang);
        throw error;
      });
    tagRequests.set(lang, request);
  }
  return request;
}
export function TagLink({
  trigger,
  lang,
}: {
  trigger: ReactElement<any>;
  lang: "en" | "ja";
}) {
  const [data, setData] = useState<TagData | null>(null);
  const [currentProject, setCurrentProject] = useState("");
  const [error, setError] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const key = trigger.props["data-tag"] as string;
  const tag = data?.tags[key];
  const projects =
    data?.projects.filter(
      (p) =>
        p.tags?.includes(key) &&
        p.project !== key &&
        p.project !== currentProject,
    ) || [];
  const title = tag?.title || key;
  return (
    <Popup
      trigger={trigger}
      portal
      className="ui popup project tag"
      hover={false}
      position={trigger.props["data-position"] || "top center"}
      onOpen={(anchor) => {
        setCurrentProject(
          anchor.closest<HTMLElement>("[data-project]")?.dataset.project || "",
        );
        if (!data) {
          setError(false);
          void loadTags(lang).then(
            (result) => {
              if (mounted.current) setData(result);
            },
            () => {
              if (mounted.current) setError(true);
            },
          );
        }
      }}
    >
      {tag ? (
        <>
          {tag.href ? (
            <a
              className="header"
              href={tag.href}
              data-site-navigation
              dangerouslySetInnerHTML={{ __html: title }}
            />
          ) : (
            <div
              className="header"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          <div className="content">
            <p>
              {lang === "ja" ? (
                <>
                  {projects.length ? "以下のプロジェクトも" : "他に"}
                  <strong dangerouslySetInnerHTML={{ __html: title }} />
                  {projects.length
                    ? "に関するものです。"
                    : "に関するプロジェクトはありません。"}
                </>
              ) : (
                <>
                  {projects.length
                    ? "Following projects are also tagged with "
                    : "No other project is tagged with "}
                  <strong dangerouslySetInnerHTML={{ __html: tag.label }} />.
                </>
              )}
            </p>
            <div className="ui divided list">
              {projects.map((p) => (
                <a
                  key={p.project}
                  className="item"
                  href={`${lang === "ja" ? "/ja/" : "/"}projects/#projects-${
                    p.project
                  }`}
                  data-site-navigation
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div role="status">
          {error
            ? lang === "ja"
              ? "読み込めませんでした。もう一度クリックしてください。"
              : "Could not load projects. Click again to retry."
            : lang === "ja"
              ? "読み込み中…"
              : "Loading…"}
        </div>
      )}
    </Popup>
  );
}
export function TooltipLink({ trigger }: { trigger: ReactElement<any> }) {
  return (
    <Popup
      portal
      trigger={trigger}
      position={trigger.props["data-position"] || "top center"}
    >
      <div className="content">{trigger.props["data-content"]}</div>
    </Popup>
  );
}

/** Clipboard feedback follows the real operation, including a selectable fallback. */
export function CopyButton({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  "data-clipboard-text"?: string;
  lang?: "en" | "ja";
}) {
  const [status, setStatus] = useState<"copied" | "failed" | null>(null);
  const motion = useTransition(!!status, "scale", 200);
  const lastStatus = useRef(status);
  if (status) lastStatus.current = status;
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  const copy = async (anchor: HTMLAnchorElement) => {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(props["data-clipboard-text"] || "");
        copied = true;
      }
    } catch {
      /* Browsers may deny the async API; retain the synchronous fallback. */
    }
    if (!copied) {
      const textarea = document.createElement("textarea");
      textarea.value = props["data-clipboard-text"] || "";
      textarea.style.cssText = "position:fixed;left:-9999px;top:0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        /* Leave truthful feedback. */
      }
      textarea.remove();
      anchor.focus();
    }
    if (!mounted.current) return;
    const rect = anchor.getBoundingClientRect();
    setPosition({
      top: Math.max(8, rect.top - 8),
      left: Math.max(8, rect.left - Math.min(320, window.innerWidth * 0.6) - 8),
    });
    setStatus(copied ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), copied ? 1000 : 4000);
  };
  const { lang, ...anchorProps } = props;
  const ja = lang === "ja";
  return (
    <>
      <a
        {...anchorProps}
        role="button"
        tabIndex={0}
        onClick={(event) => {
          event.preventDefault();
          void copy(event.currentTarget);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
      >
        {children}
      </a>
      {motion.present &&
        createPortal(
          <div
            role="status"
            className={`ui popup left center ${motion.className}`}
            style={{ position: "fixed", ...position, ...motion.style }}
            onAnimationEnd={motion.onAnimationEnd}
          >
            {lastStatus.current === "copied"
              ? ja
                ? "BibTeXをクリップボードにコピーしました！"
                : "Copied the BibTeX entry to your clipboard!"
              : ja
                ? "コピーできませんでした。BibTeXを選択してコピーしてください。"
                : "Copy failed. Please select and copy the BibTeX text."}
          </div>,
          document.body,
        )}
    </>
  );
}
export function SnsLink({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const animation = useRef<(() => void) | undefined>(undefined);
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      animation.current?.();
    },
    [],
  );
  return (
    <a
      {...props}
      onClick={() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          animation.current?.();
          animation.current = playAttention(
            document.getElementById("sns"),
            "jiggle",
          );
        }, 700);
      }}
    >
      {children}
    </a>
  );
}
