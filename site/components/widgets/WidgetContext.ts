import { createContext, type Dispatch, type SetStateAction } from "react";

export type ModalState = { trigger: HTMLElement; title?: string; src?: string };

export type WidgetState = {
  sidebar: boolean;
  setSidebar: (open: boolean) => void;
  popup: string | null;
  setPopup: Dispatch<SetStateAction<string | null>>;
  modal: ModalState | null;
  setModal: (modal: ModalState | null) => void;
};

export const WidgetContext = createContext<WidgetState | null>(null);
