"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(percent);
      setShowButton(scrollTop > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[999] h-1 w-full bg-transparent">
        <div className="h-full bg-neutral-900 transition-all" style={{ width: `${progress}%` }} />
      </div>
      {showButton ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-[999] rounded-full bg-neutral-900 p-3 text-white shadow-lg shadow-neutral-900/30"
          style={{
            background: `conic-gradient(#0f172a ${progress * 3.6}deg, rgba(15,23,42,0.2) ${progress * 3.6}deg)`,
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900">
            <ArrowUp className="h-5 w-5" />
          </span>
        </button>
      ) : null}
    </>
  );
}
