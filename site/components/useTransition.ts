import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  type AnimationEvent,
} from "react";

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Drive Fomantic's existing CSS keyframes, retaining content until exit finishes. */
export function useTransition(
  open: boolean,
  animation: string,
  duration: number,
) {
  const [phase, setPhase] = useState(open ? "visible" : "hidden");
  const initialRender = useRef(true);
  useBrowserLayoutEffect(() => {
    const initiallyClosed = initialRender.current && !open;
    initialRender.current = false;
    if (initiallyClosed) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => setPhase(open ? "visible" : "hidden");
    if (preference.matches) {
      finish();
      return;
    }
    // Avoid playing an exit animation on the initial closed render.
    setPhase((current) =>
      !open && current === "hidden" ? current : open ? "in" : "out",
    );
    const timer = setTimeout(finish, duration + 50);
    const reduceMotion = () => {
      if (preference.matches) finish();
    };
    preference.addEventListener("change", reduceMotion);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", reduceMotion);
    };
  }, [open, animation, duration]);
  const present = phase !== "hidden";
  const animating = phase === "in" || phase === "out";
  return {
    present,
    animating,
    className: `transition ${present ? "visible" : "hidden"}${
      animating ? ` animating ${animation} ${phase}` : ""
    }`,
    style: { animationDuration: `${duration}ms` },
    onAnimationEnd: (event: AnimationEvent<HTMLElement>) => {
      if (event.target === event.currentTarget)
        setPhase(open ? "visible" : "hidden");
    },
  };
}

/** Use the original attention keyframes without loading the jQuery transition plugin. */
export function playAttention(
  element: HTMLElement | null,
  name: "bounce" | "jiggle",
) {
  if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const old = element.style.animation;
  const alreadyAttention = element.classList.contains("site-attention");
  element.classList.add("site-attention");
  element.style.animation = "none";
  void element.offsetWidth;
  element.style.animation = `${name} 750ms ease 1`;
  const finish = () => {
    element.style.animation = old;
    if (!alreadyAttention) element.classList.remove("site-attention");
  };
  const timer = setTimeout(finish, 800);
  return () => {
    clearTimeout(timer);
    finish();
  };
}
