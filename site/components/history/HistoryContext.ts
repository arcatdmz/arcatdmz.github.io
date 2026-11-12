import { createContext } from "react";

export interface Entry {
  date: string;
  text: string;
}

export const HistoryContext = createContext<{
  entries: Entry[];
  more: () => void;
  loading: boolean;
  exhausted: boolean;
  ready: boolean;
  error: boolean;
} | null>(null);
