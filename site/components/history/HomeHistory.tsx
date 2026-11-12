import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  Entry,
  HistoryContext,
} from "@/site/components/history/HistoryContext";

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
