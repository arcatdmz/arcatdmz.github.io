import { useEffect, useRef } from "react";
import { Feed } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { Entry } from "@/site/components/history/HistoryContext";
import { playAttention } from "@/site/hooks/useTransition";

export function AddedHistoryEntry({ entry }: { entry: Entry }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => playAttention(element.current, "jiggle"), []);
  return (
    <Feed.Event ref={element}>
      <Feed.Content>
        <Feed.Date>{entry.date}</Feed.Date>
        <div className="header">
          <HtmlContent html={entry.text} />
        </div>
      </Feed.Content>
    </Feed.Event>
  );
}
