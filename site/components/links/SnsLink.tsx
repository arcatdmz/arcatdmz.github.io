import { useEffect, useRef, type AnchorHTMLAttributes } from "react";

import { playAttention } from "@/site/hooks/useTransition";

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
