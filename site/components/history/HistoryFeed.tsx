import { useContext, type HTMLAttributes } from "react";
import { Feed } from "react-fomantic-ui";

import { AddedHistoryEntry } from "@/site/components/history/AddedHistoryEntry";
import { HistoryContext } from "@/site/components/history/HistoryContext";

export function HistoryFeed({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const history = useContext(HistoryContext);
  return (
    <Feed {...props}>
      {children}
      {history?.entries.map((entry, index) => (
        <AddedHistoryEntry key={index} entry={entry} />
      ))}
    </Feed>
  );
}
