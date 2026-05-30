import { useEffect, useRef } from "react";

export function StarField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    for (let i = 0; i < 150; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2;
      const duration = 2 + Math.random() * 5;
      star.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background-color: #fff;
        border-radius: 50%;
        opacity: ${Math.random()};
        box-shadow: 0 0 ${size * 2}px #fff;
        animation: pulse-star ${duration}s infinite alternate;
      `;
      container.appendChild(star);
    }

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: -1 }}
    />
  );
}
