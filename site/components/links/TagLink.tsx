import { useEffect, useRef, useState, type ReactElement } from "react";
import { Popup as FomanticPopup, List } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SitePopup } from "@/site/components/widgets/SitePopup";

export interface TagData {
  tags: Record<string, { title: string; label: string; href?: string }>;
  projects: { project: string; title: string; tags: string[] }[];
}

export const tagRequests = new Map<string, Promise<TagData>>();

export function loadTags(lang: string): Promise<TagData> {
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
    <SitePopup
      trigger={trigger}
      portal
      className="project tag"
      hover={false}
      position="bottom center"
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
            <FomanticPopup.Header as="a" href={tag.href} data-site-navigation>
              <HtmlContent html={title} />
            </FomanticPopup.Header>
          ) : (
            <FomanticPopup.Header>
              <HtmlContent html={title} />
            </FomanticPopup.Header>
          )}
          <FomanticPopup.Content>
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
            <List divided>
              {projects.map((p) => (
                <List.Item
                  role="link"
                  as="a"
                  key={p.project}
                  href={`${lang === "ja" ? "/ja/" : "/"}projects/#projects-${
                    p.project
                  }`}
                  data-site-navigation
                >
                  <HtmlContent html={p.title} />
                </List.Item>
              ))}
            </List>
          </FomanticPopup.Content>
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
    </SitePopup>
  );
}
