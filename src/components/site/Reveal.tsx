import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Variant = "up" | "left" | "right" | "fade" | "zoom";

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  as?: React.ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  return (
    <Tag
      ref={ref as never}
      data-reveal={variant}
      data-visible={visible ? "true" : "false"}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}
