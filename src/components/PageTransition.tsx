"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";

const TransitionContext = createContext({
  contentVisible: true,
  transitionKey: 0,
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<
    "idle" | "cover" | "hold" | "reveal" | "done"
  >("idle");
  const [contentVisible, setContentVisible] = useState(true);
  const [transitionKey, setTransitionKey] = useState(0);
  const [prevPath, setPrevPath] = useState(pathname);
  const [transitioning, setTransitioning] = useState(false);

  const runTransition = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setContentVisible(false);
    setPhase("cover");
    setTimeout(() => setPhase("hold"), 350);
    setTimeout(() => {
      setPhase("reveal");
    }, 1000);
    setTimeout(() => {
      // Bump key to force re-mount page content (resets framer-motion animations)
      setTransitionKey((k) => k + 1);
      setContentVisible(true);
      setPhase("done");
      setTransitioning(false);
      setTimeout(() => setPhase("idle"), 500);
    }, 1350);
  }, [transitioning]);

  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);
      if (!transitioning) {
        runTransition();
      }
    }
  }, [pathname, prevPath, runTransition, transitioning]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (transitioning) return;
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/my/") &&
        href !== pathname &&
        !anchor.hasAttribute("download") &&
        anchor.target !== "_blank"
      ) {
        runTransition();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, runTransition, transitioning]);

  return (
    <TransitionContext.Provider value={{ contentVisible, transitionKey }}>
      {children}
      {phase !== "idle" && <TransitionOverlay phase={phase} />}
    </TransitionContext.Provider>
  );
}

function TransitionOverlay({
  phase,
}: {
  phase: "cover" | "hold" | "reveal" | "done";
}) {
  const isRevealing = phase === "reveal" || phase === "done";

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{
        pointerEvents: isRevealing ? "none" : "auto",
        opacity: isRevealing ? 0 : 1,
        transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #0d0d1a 0%, #050508 100%)",
        }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: 0.06 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "ptGridShift 2s linear infinite",
          }}
        />
      </div>

      {/* Glow orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "ptPulseGlow 1.5s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "ptPulseGlow 2s ease-in-out infinite reverse",
        }}
      />

      {/* Branding content */}
      <div
        className="relative flex flex-col items-center gap-4"
        style={{
          transform:
            phase === "cover"
              ? "translateY(6px) scale(0.97)"
              : "translateY(0) scale(1)",
          opacity: phase === "cover" ? 0.7 : 1,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* HADEUL SOFT — single line */}
        <h1
          className="text-4xl md:text-5xl font-black tracking-[-0.03em] select-none whitespace-nowrap"
          style={{
            color: "#fff",
            textShadow:
              "0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.15)",
            animation: "ptNeonPulse 1.5s ease-in-out infinite alternate",
          }}
        >
          HADEUL SOFT
        </h1>

        {/* Decorative lines only (no subtitle text) */}
        <div className="flex items-center gap-0">
          <span
            className="block h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
            style={{
              width:
                phase === "hold" || phase === "reveal" || phase === "done"
                  ? 100
                  : 0,
              transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
            }}
          />
        </div>

        {/* Progress bar */}
        <div
          className="mt-1 h-[2px] rounded-full overflow-hidden"
          style={{ width: 140, background: "rgba(255,255,255,0.04)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #6366f1, #8b5cf6)",
              width:
                phase === "cover"
                  ? "20%"
                  : phase === "hold"
                  ? "70%"
                  : "100%",
              transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 0 10px rgba(139,92,246,0.5)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes ptGridShift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
        @keyframes ptPulseGlow {
          0%,
          100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        @keyframes ptNeonPulse {
          0% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.6),
              0 0 40px rgba(139, 92, 246, 0.3),
              0 0 80px rgba(139, 92, 246, 0.15);
          }
          100% {
            text-shadow: 0 0 30px rgba(139, 92, 246, 0.8),
              0 0 60px rgba(139, 92, 246, 0.4),
              0 0 100px rgba(139, 92, 246, 0.2);
          }
        }
      `}</style>
    </div>
  );
}

// Wrapper — uses key to force re-mount so framer-motion animations replay fresh
export function PageContent({ children }: { children: React.ReactNode }) {
  const { contentVisible, transitionKey } = useTransition();

  return (
    <div
      key={transitionKey}
      style={{
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}
