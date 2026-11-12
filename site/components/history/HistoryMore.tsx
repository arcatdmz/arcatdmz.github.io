import { useContext } from "react";
import { Button, type ButtonProps } from "react-fomantic-ui";

import { HistoryContext } from "@/site/components/history/HistoryContext";

export function HistoryMore({
  children,
  className = "",
  ...props
}: ButtonProps) {
  const history = useContext(HistoryContext);
  const disabled = !history?.ready || history.loading || history.exhausted;
  return (
    <>
      <Button
        as="a"
        {...props}
        className={className.replace(/\bdisabled\b/g, "")}
        disabled={disabled}
        loading={history?.loading}
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
      </Button>
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
