import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Radar,
  Star,
  GitFork,
  Clock3,
  Layers3,
  Radio,
  CircleDot,
  Cpu,
  User,
  Globe,
  MapPin,
  ExternalLink,
  Github,
  Monitor,
  Terminal,
  Mail,
  Activity,
  Shield,
  Plane,
  Phone,
  Users,
  MessageSquare,
} from "lucide-react";

const radarPositions = [
  { top: "14%", left: "58%" },
  { top: "27%", left: "75%" },
  { top: "42%", left: "64%" },
  { top: "58%", left: "79%" },
  { top: "70%", left: "57%" },
  { top: "62%", left: "27%" },
  { top: "38%", left: "24%" },
  { top: "23%", left: "40%" },
];

const repoDescriptions = {
  ZPTTLink:
    "Cross-platform bridge linking push-to-talk workflows and radio gateway hardware through a unified control layer.",
  "meshmonitor-bridge-homeassistant":
    "Bridge layer for relaying Home Assistant states and events into message-driven automation pipelines.",
  "meshmonitor-skyandsea-alert":
    "Alerting workflow for nearby aircraft and vessels with airspace-and-maritime awareness.",
  "meshmonitor-llm-bridge":
    "Low-bandwidth AI messaging bridge for command-style interactions and automation support.",
  "meshmonitor-carrier-outage":
    "Monitoring logic for carrier, ISP, and cloud outage signals across multiple infrastructure sources.",
  "meshmonitor-watchandreboot":
    "Service watchdog logic to recover unhealthy systems and keep monitoring stacks available.",
  "meshmonitor-radio-id-qth":
    "Auto-response tooling for radio identity lookup and command-driven QTH details.",
  "meshmonitor-mx-weather-alerts":
    "Weather alert broadcaster for timed bulletins and situational monitoring.",
};

const fallbackRepos = [
  {
    name: "ZPTTLink",
    html_url: "https://github.com/maxhayim/ZPTTLink",
    stargazers_count: 0,
    forks_count: 0,
    language: "—",
    updated_at: null,
    description: repoDescriptions.ZPTTLink,
  },
  {
    name: "meshmonitor-bridge-homeassistant",
    html_url: "https://github.com/maxhayim/meshmonitor-bridge-homeassistant",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: null,
    description: repoDescriptions["meshmonitor-bridge-homeassistant"],
  },
  {
    name: "meshmonitor-skyandsea-alert",
    html_url: "https://github.com/maxhayim/meshmonitor-skyandsea-alert",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: null,
    description: repoDescriptions["meshmonitor-skyandsea-alert"],
  },
  {
    name: "meshmonitor-llm-bridge",
    html_url: "https://github.com/maxhayim/meshmonitor-llm-bridge",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: null,
    description: repoDescriptions["meshmonitor-llm-bridge"],
  },
  {
    name: "meshmonitor-carrier-outage",
    html_url: "https://github.com/maxhayim/meshmonitor-carrier-outage",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: null,
    description: repoDescriptions["meshmonitor-carrier-outage"],
  },
  {
    name: "meshmonitor-watchandreboot",
    html_url: "https://github.com/maxhayim/meshmonitor-watchandreboot",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: null,
    description: repoDescriptions["meshmonitor-watchandreboot"],
  },
];

const osBadges = [
  "Windows 95",
  "Windows XP",
  "Windows Vista",
  "Ubuntu 7.04",
  "GNOME",
  "Mac OS X Leopard",
];

const journey = [
  {
    year: "2001",
    title: "First Computer",
    text: "Started with a Packard Bell D160 with a built-in speaker monitor running Windows 95. One of the first things explored was QuickTime 5.0 from a kids CD.",
    icon: Monitor,
  },
  {
    year: "2004",
    title: "Windows XP Era",
    text: "Moved into Windows XP and started experimenting with system themes and interface customization, including Vista-style visual tweaks.",
    icon: Monitor,
  },
  {
    year: "2006",
    title: "First Programming Project",
    text: "Built a small MS-DOS Pong-style program while learning simple game logic, motion, and old-school software thinking.",
    icon: Terminal,
  },
  {
    year: "2007",
    title: "Open Source Discovery",
    text: "Discovered open-source software and got into Linux through Ubuntu 7.04 with GNOME, which shifted the way computers were understood.",
    icon: Cpu,
  },
  {
    year: "2007",
    title: "Mac OS X Interest",
    text: "Got pulled into the Mac world through Unix-like systems, iPod culture, FlyAKiteOSX, and the design language of Leopard-era interfaces.",
    icon: Globe,
  },
  {
    year: "Today",
    title: "Back in Code",
    text: "Now blending design, infrastructure, dashboards, tooling, and practical systems into a public engineering identity centered on GitHub work.",
    icon: Radio,
  },
];

const favoriteSystems = [
  "Microsoft Windows XP",
  "Ubuntu 11.10 Oneiric Ocelot",
  "Mac OS X 10.6 Snow Leopard",
];

const favoriteApps = [
  "Mozilla Firefox",
  "Skype",
  "Trillian",
  "Gizmo5",
  "Adobe Photoshop",
  "Google Desktop",
];

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Linux",
  "macOS",
  "Windows",
  "Git",
  "Adobe Photoshop",
];

function useHashRoute() {
  const getRoute = () => {
    const hash = window.location.hash || "#/";
    if (hash === "#/about") return "about";
    if (hash === "#/contact") return "contact";
    return "home";
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function usePageMeta() {
  useEffect(() => {
    document.title = "maxhayim.com — Public Command Center Homepage";

    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.setAttribute("rel", "icon");
      document.head.appendChild(favicon);
    }
    favicon.setAttribute("type", "image/x-icon");
    favicon.setAttribute("href", "/logo_fullclear_favicon.ico");

    let appleIcon = document.querySelector("link[rel='apple-touch-icon']");
    if (!appleIcon) {
      appleIcon = document.createElement("link");
      appleIcon.setAttribute("rel", "apple-touch-icon");
      document.head.appendChild(appleIcon);
    }
    appleIcon.setAttribute("href", "/logo_fullclear.png");

    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Public command center homepage for maxhayim with live repo radar, telemetry, traffic, about timeline, and contact console.",
    );
  }, []);
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildFlightCode(repo) {
  const words = repo.name.split(/[-_]/g).filter(Boolean);
  const letters = words.map((word) => word[0]?.toUpperCase() || "").join("");
  const stars = String(repo.stargazers_count || 0).padStart(2, "0");
  return `${letters}${stars}`;
}

/* ---------- Ubuntu terminal shell ---------- */

const MOTD_BANNER = "                         __                _\n   ____ ___  ____ __  __/ /_  ____ ___  __(_)___ ___\n  / __ `__ \\/ __ `/ |/_/ __ \\/ __ `/ / / / / __ `__ \\\n / / / / / / /_/ />  </ / / / /_/ / /_/ / / / / / / /\n/_/ /_/ /_/\\__,_/_/|_/_/ /_/\\__,_/\\__, /_/_/ /_/ /_/\n                                 /____/";

const TERM_TABS = [
  { page: "home", label: "~", href: "#/", command: "cat /etc/motd" },
  { page: "about", label: "~/about", href: "#/about", command: "cat ~/about.txt" },
  { page: "contact", label: "~/contact", href: "#/contact", command: "./contact.sh" },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useCrtMode() {
  const [mode, setMode] = useState(() => document.documentElement.dataset.crt || "off");
  useEffect(() => {
    const cycle = () => {
      const current = document.documentElement.dataset.crt || "off";
      const index = CRT_MODES.findIndex((m) => m.id === current);
      const next = CRT_MODES[(index + 1) % CRT_MODES.length].id;
      applyCrt(next);
      writeStore("localStorage", "mh-crt", next);
      setMode(next);
    };
    window.addEventListener("mh-crt-cycle", cycle);
    return () => window.removeEventListener("mh-crt-cycle", cycle);
  }, []);
  return mode;
}

// Panels print in top-to-bottom like terminal output, once per page per session.
function useOutputReveal(currentPage, rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const key = `mh-reveal-${currentPage}`;
    if (readStore("sessionStorage", key)) return;

    const panels = Array.from(root.querySelectorAll("main .rounded-3xl"));
    panels.forEach((panel) => panel.classList.add("term-reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          writeStore("sessionStorage", key, "1");
          entry.target.classList.add("term-shown");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05 }
    );
    panels.forEach((panel) => observer.observe(panel));
    return () => {
      observer.disconnect();
      panels.forEach((panel) => panel.classList.remove("term-reveal", "term-shown"));
    };
  }, [currentPage, rootRef]);
}

function Prompt({ path = "~", children }) {
  return (
    <div className="break-all">
      <span className="font-bold text-[#8AE234]">max@hxmbook</span>
      <span className="text-white">:</span>
      <span className="font-bold text-[#729FCF]">{path}</span>
      <span className="text-white">$ </span>
      <span className="text-white">{children}</span>
    </div>
  );
}

function Cursor() {
  return <span className="term-cursor ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-white" aria-hidden="true" />;
}

function PowerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = "block w-full px-4 py-1.5 text-left hover:bg-[#E95420] hover:text-white";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Session"
        className={`flex h-7 items-center px-2.5 hover:bg-white/10 ${open ? "bg-white/10" : ""}`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M7 6.5a8 8 0 1 0 10 0" />
          <line x1="12" y1="2.5" x2="12" y2="11" />
        </svg>
      </button>
      {open && (
        <div role="menu" className="absolute right-1 top-7 z-50 min-w-[170px] rounded-[3px] border border-black/40 bg-[#3C3B37] py-1 text-[13px] text-[#DFDBD2] shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
          <button
            role="menuitem"
            type="button"
            className={item}
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event("mh-reboot"));
            }}
          >
            Restart…
          </button>
          <div className="my-1 border-t border-white/10" />
          <button
            role="menuitem"
            type="button"
            className={item}
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event("mh-power-off"));
            }}
          >
            Shut Down…
          </button>
        </div>
      )}
    </div>
  );
}

function SharedShell({ currentPage, children }) {
  const currentYear = new Date().getFullYear();
  const now = useClock();
  const crtMode = useCrtMode();
  const rootRef = useRef(null);
  usePageMeta();
  useOutputReveal(currentPage, rootRef);

  const tab = TERM_TABS.find((t) => t.page === currentPage) || TERM_TABS[0];
  const crtLabel = CRT_MODES.find((m) => m.id === crtMode)?.label || "Off";
  const clock = now.toLocaleString([], { weekday: "short", hour: "numeric", minute: "2-digit" });
  const [lastLogin] = useState(() => new Date(Date.now() - 1000 * 60 * 47).toString().split(" GMT")[0]);

  return (
    <>
      {/* Top panel */}
      <div className="mh-fixed ubuntu-ui fixed inset-x-0 top-0 z-40 flex h-7 items-center justify-between bg-gradient-to-b from-[#45443F] to-[#353430] text-[13px] text-[#DFDBD2] shadow-[0_1px_0_rgba(0,0,0,0.6)]">
        <a href="#/" className="flex h-7 items-center gap-2 px-3 font-medium hover:bg-white/10">
          <img src="/logo_fullclear.png" alt="" className="h-4 w-auto" />
          maxhayim.com
        </a>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("mh-crt-cycle"))}
            title="Cycle CRT mode"
            className="flex h-7 items-center px-2.5 hover:bg-white/10"
          >
            CRT: {crtLabel}
          </button>
          <span className="hidden h-7 items-center px-2.5 sm:flex">{clock}</span>
          <PowerMenu />
        </div>
      </div>

      <div
        ref={rootRef}
        className="mh-screen ubuntu-desktop relative min-h-screen overflow-hidden px-2 pb-6 pt-10 sm:px-4 md:px-6 md:pb-10 md:pt-12"
      >
        <div className="term-window mx-auto max-w-7xl overflow-hidden rounded-t-[7px] rounded-b-[3px] border border-black/60 shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
          {/* Title bar */}
          <div className="ubuntu-ui relative flex h-8 items-center bg-gradient-to-b from-[#4F4E49] to-[#3C3B37] text-[#DFDBD2]">
            <div className="z-10 flex items-center gap-1.5 pl-2.5">
              <button
                type="button"
                title="Close (shut down)"
                aria-label="Close and shut down"
                onClick={() => window.dispatchEvent(new Event("mh-power-off"))}
                className="term-btn term-btn-close"
              />
              <span className="term-btn" aria-hidden="true" />
              <span className="term-btn" aria-hidden="true" />
            </div>
            <div className="absolute inset-x-0 truncate px-24 text-center text-[13px] font-bold">
              max@hxmbook: {tab.label}
            </div>
          </div>

          {/* Menu bar */}
          <div className="ubuntu-ui hidden h-7 items-center gap-1 bg-[#3C3B37] px-1.5 text-[13px] text-[#DFDBD2] md:flex">
            {["File", "Edit", "View", "Search", "Terminal", "Help"].map((m) => (
              <span key={m} className="px-2 py-0.5">
                {m}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <nav aria-label="Pages" className="ubuntu-ui flex bg-[#2B2A26] pt-1 text-[13px]">
            {TERM_TABS.map((t) => {
              const active = t.page === currentPage;
              return (
                <a
                  key={t.page}
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-w-0 flex-1 items-center justify-center gap-2 truncate rounded-t-[4px] px-3 py-1.5 sm:max-w-[220px] ${
                    active ? "bg-[#300A24] text-white" : "text-[#9C9A92] hover:bg-white/5 hover:text-[#DFDBD2]"
                  }`}
                >
                  <span className="truncate">
                    <span className="hidden sm:inline">max@hxmbook: </span>
                    {t.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Terminal body */}
          <div className="term relative bg-[#300A24] px-3 py-4 text-white sm:px-5 md:px-6 md:py-5">
            <div className="text-[#D3D7CF]">
              <div>Welcome to Ubuntu 7.04 (GNU/Linux 2.6.20-15-generic i686)</div>
              <div className="mt-3">
                {" "}* Source:{"   "}
                <a href="https://github.com/maxhayim" target="_blank" rel="noreferrer" className="underline decoration-[#729FCF] hover:text-white">
                  https://github.com/maxhayim
                </a>
              </div>
              <div className="mt-3">Last login: {lastLogin} from ttyS0</div>
            </div>

            <div className="mt-3">
              <Prompt>{tab.command}</Prompt>
            </div>

            {currentPage === "home" && (
              <>
                <pre className="mt-3 overflow-hidden font-bold leading-[1.15] text-[#E95420] [font-size:clamp(7px,2.35vw,17px)]">
                  {MOTD_BANNER}
                </pre>
                <div className="mt-2 text-[#D3D7CF]">
                  Public repos, mesh radio tooling, and a working modem. Pick a tab above to look around.
                </div>
              </>
            )}

            <main className="relative z-10 mt-5 flex flex-col gap-5">{children}</main>

            <footer className="mt-6 text-[#D3D7CF]">
              <Prompt>cat ~/COPYRIGHT</Prompt>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <img src="/logo_fullclear.png" alt="maxhayim logo" className="h-4 w-auto" />
                <span>
                  &copy; 2009 - {currentYear} MAXYIM.COM. All Rights Reserved.
                </span>
              </div>
              <div className="mt-3">
                <Prompt>
                  <Cursor />
                </Prompt>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

function PongGame() {
  const fieldRef = useRef(null);
  const animationRef = useRef(null);

  const visitorYRef = useRef(50);
  const botYRef = useRef(50);
  const ballRef = useRef({ x: 50, y: 50, vx: 0.52, vy: 0.34 });

  const [visitorY, setVisitorY] = useState(50);
  const [botY, setBotY] = useState(50);
  const [ball, setBall] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState({ bot: 0, visitor: 0 });

  const setVisitorPosition = (clientY) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relativeY = ((clientY - rect.top) / rect.height) * 100;
    const clamped = Math.max(10, Math.min(90, relativeY));
    visitorYRef.current = clamped;
    setVisitorY(clamped);
  };

  useEffect(() => {
    const node = fieldRef.current;
    if (!node) return;

    const onMouseMove = (event) => setVisitorPosition(event.clientY);
    const onTouchMove = (event) => {
      if (event.touches?.[0]) setVisitorPosition(event.touches[0].clientY);
    };

    const onKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        visitorYRef.current = Math.max(10, visitorYRef.current - 4);
        setVisitorY(visitorYRef.current);
      }
      if (event.key === "ArrowDown") {
        visitorYRef.current = Math.min(90, visitorYRef.current + 4);
        setVisitorY(visitorYRef.current);
      }
    };

    node.addEventListener("mousemove", onMouseMove);
    node.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      node.removeEventListener("mousemove", onMouseMove);
      node.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const resetBall = (direction) => {
      ballRef.current = {
        x: 50,
        y: 50,
        vx: direction === "visitor" ? 0.52 : -0.52,
        vy: Math.random() > 0.5 ? 0.34 : -0.34,
      };
    };

    const tick = () => {
      const next = { ...ballRef.current };

      next.x += next.vx;
      next.y += next.vy;

      if (next.y <= 2 || next.y >= 98) {
        next.vy *= -1;
        next.y = Math.max(2, Math.min(98, next.y));
      }

      const nextBot = Math.max(
        10,
        Math.min(90, botYRef.current + (next.y - botYRef.current) * 0.08),
      );
      botYRef.current = nextBot;
      setBotY(nextBot);

      const visitorMin = visitorYRef.current - 10;
      const visitorMax = visitorYRef.current + 10;
      const botMin = nextBot - 10;
      const botMax = nextBot + 10;

      if (
        next.x >= 93 &&
        next.y >= visitorMin &&
        next.y <= visitorMax &&
        next.vx > 0
      ) {
        next.vx = -Math.abs(next.vx);
        next.vy += (next.y - visitorYRef.current) * 0.012;
        next.x = 93;
      }

      if (next.x <= 7 && next.y >= botMin && next.y <= botMax && next.vx < 0) {
        next.vx = Math.abs(next.vx);
        next.vy += (next.y - nextBot) * 0.012;
        next.x = 7;
      }

      if (next.x > 100) {
        setScore((prev) => ({ ...prev, bot: prev.bot + 1 }));
        resetBall("bot");
      } else if (next.x < 0) {
        setScore((prev) => ({ ...prev, visitor: prev.visitor + 1 }));
        resetBall("visitor");
      } else {
        ballRef.current = next;
      }

      setBall({ x: ballRef.current.x, y: ballRef.current.y });
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-black p-4 shadow-inner">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
        <span>PONG.EXE</span>
        <span>BOT vs VISITOR</span>
      </div>

      <div
        ref={fieldRef}
        className="relative h-64 cursor-none rounded-xl border border-emerald-500/20 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(4,12,8,1))] font-mono text-emerald-300"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(74,222,128,0.12)_1px,transparent_1px)] [background-size:100%_6px]" />
        <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-emerald-500/30" />

        <div
          className="absolute left-4 w-2 -translate-y-1/2 rounded-sm bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.75)]"
          style={{ top: `${botY}%`, height: "52px" }}
        />
        <div
          className="absolute right-4 w-2 -translate-y-1/2 rounded-sm bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.75)]"
          style={{ top: `${visitorY}%`, height: "52px" }}
        />

        <div
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-emerald-200 shadow-[0_0_14px_rgba(167,243,208,0.95)]"
          style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
        />

        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">
          <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-500/80">
            MS-DOS MATCH
          </div>
          <div className="mt-1 text-lg font-bold tracking-[0.3em] text-emerald-200">
            {String(score.bot).padStart(2, "0")}{" "}
            {String(score.visitor).padStart(2, "0")}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-emerald-400/80">
          <span>BOT</span>
          <span>MOUSE / TOUCH / ARROWS</span>
          <span>VISITOR</span>
        </div>
      </div>
    </div>
  );
}

function InteractiveDialup() {
  const audioRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [lines, setLines] = useState([
    "ATDT 305-503-0823",
    "System ready. Awaiting connection command.",
  ]);

  const startDialup = () => {
    if (status === "connecting") return;

    setStatus("connecting");
    setLines([
      "ATDT 305-503-0823",
      "Initializing modem...",
      "Dialing 305-503-0823...",
    ]);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        "Negotiating carrier... 2400 / 9600 / 14400",
      ]);
    }, 1600);

    setTimeout(() => {
      setLines((prev) => [...prev, "CONNECT 2400"]);
      setStatus("connected");
    }, 4200);
  };

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-zinc-950/70 p-4">
      <audio ref={audioRef} src="/audio/dialup-connect.mp3" preload="auto" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
            2001 • Dial-Up Initialization
          </div>
          <div className="mt-2 text-lg font-semibold text-zinc-100">
            PRODIGY ISP
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
            Local access numbers varied by city
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            initial={false}
            animate={{
              opacity:
                status === "connected" ? [0.55, 1, 0.55] : [0.35, 0.8, 0.35],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
              status === "connected"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                : "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
            }`}
          >
            {status === "connected" ? "CONNECTED" : "READY"}
          </motion.div>

          <button
            type="button"
            onClick={startDialup}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Connect
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-800 bg-black/40 p-4 font-mono text-xs text-zinc-300">
        {lines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className={`mt-1 ${
              line.includes("CONNECT")
                ? "text-emerald-300"
                : line.includes("ATDT")
                  ? "text-cyan-300"
                  : "text-zinc-300"
            }`}
          >
            {line}
          </div>
        ))}
        <div className="mt-3 text-zinc-500">
          Prodigy used local POP dial-up access rather than one universal
          nationwide member number.
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [repos, setRepos] = useState(fallbackRepos);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [repoTraffic, setRepoTraffic] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      try {
        const response = await fetch(
          "https://api.github.com/users/maxhayim/repos?per_page=100&sort=updated",
        );
        if (!response.ok) throw new Error("Failed to load repositories");
        const repoList = await response.json();

        const filtered = repoList
          .filter((repo) => !repo.fork)
          .filter(
            (repo) =>
              repo.name !== "maxhayim" && repo.name !== "maxhayim.github.io",
          )
          .sort((a, b) => {
            const aStars = a.stargazers_count || 0;
            const bStars = b.stargazers_count || 0;
            if (bStars !== aStars) return bStars - aStars;
            return (
              new Date(b.updated_at || 0).getTime() -
              new Date(a.updated_at || 0).getTime()
            );
          })
          .map((repo) => ({
            name: repo.name,
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count ?? 0,
            forks_count: repo.forks_count ?? 0,
            language: repo.language || "—",
            updated_at: repo.updated_at || null,
            pushed_at: repo.pushed_at || repo.updated_at || null,
            description:
              repoDescriptions[repo.name] ||
              repo.description ||
              "Public repository in the maxhayim command center.",
          }));

        if (!cancelled) setRepos(filtered.length ? filtered : fallbackRepos);
      } catch {
        if (!cancelled) setRepos(fallbackRepos);
      } finally {
        if (!cancelled) setLoadingRepos(false);
      }
    }

    loadRepos();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!repos.length) return;

    const liveTraffic = repos
      .filter((repo) => !repo.fork)
      .filter(
        (repo) =>
          repo.name !== "maxhayim" && repo.name !== "maxhayim.github.io",
      )
      .sort(
        (a, b) =>
          new Date(b.updated_at || 0).getTime() -
          new Date(a.updated_at || 0).getTime(),
      )
      .slice(0, 6)
      .map((repo, index) => ({
        from: repo.name,
        tag: index % 2 === 0 ? "TX" : "RX",
        time: repo.updated_at
          ? new Date(repo.updated_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }) + "Z"
          : "----",
        message:
          repo.description ||
          `Repository active. ${repo.language || "Unknown language"} workflow updated and tracked.`,
      }));

    setRepoTraffic(liveTraffic);
    setVisibleMessages(1);

    const interval = setInterval(() => {
      setVisibleMessages((current) => {
        if (current >= liveTraffic.length) return 1;
        return current + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [repos]);

  const repoTelemetry = useMemo(() => {
    const totalStars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0,
    );
    const totalForks = repos.reduce(
      (sum, repo) => sum + (repo.forks_count || 0),
      0,
    );
    const languages = Array.from(
      new Set(
        repos
          .map((repo) => repo.language)
          .filter((lang) => lang && lang !== "—"),
      ),
    );
    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      languages,
    };
  }, [repos]);

  const radarTargets = useMemo(() => {
    return repos.slice(0, radarPositions.length).map((repo, index) => ({
      repo,
      position: radarPositions[index],
    }));
  }, [repos]);

  const recentActivity = useMemo(() => {
    return [...repos]
      .filter((repo) => repo.updated_at)
      .sort(
        (a, b) =>
          new Date(b.updated_at || 0).getTime() -
          new Date(a.updated_at || 0).getTime(),
      )
      .slice(0, 4);
  }, [repos]);

  const activeConversationRepo =
    repoTraffic[Math.max(visibleMessages - 1, 0)]?.from;

  const telemetrySwitches = [
    { label: "Repositories", value: repoTelemetry.totalRepos, icon: Layers3 },
    { label: "Stars", value: repoTelemetry.totalStars, icon: Star },
    { label: "Forks", value: repoTelemetry.totalForks, icon: GitFork },
    { label: "Languages", value: repoTelemetry.languages.length, icon: Radio },
  ];

  return (
    <SharedShell currentPage="home">
      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-emerald-300">
                  <User className="h-3.5 w-3.5" />
                  Command Profile
                </div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
                  maxhayim.com
                </h1>
              </div>

              <div className="shrink-0 rounded-2xl border border-emerald-500/20 bg-black/40 p-2 shadow-[0_0_24px_rgba(16,185,129,0.12)]">
                <img
                  src="/avatar.jpg"
                  alt="Max Hayim avatar"
                  className="h-20 w-20 rounded-xl border border-zinc-800 object-cover md:h-24 md:w-24"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-cyan-300" />
                MIA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-emerald-300" />
                Public Command Center Homepage
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-violet-300" />
                Open Repositories Only
              </span>
            </div>

            <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-300 md:text-base">
              Public repos, telemetry, activity logs, and engineering identity
              presented through a radar-inspired interface centered on live
              GitHub work.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-emerald-500/20 bg-black/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo_fullclear.png"
                    alt="maxhayim site logo"
                    className="h-9 w-9"
                  />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300">
                      Site Emblem
                    </div>
                    <div className="text-sm text-zinc-200">
                      MAXHAYIM Command Mark
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] term-title text-cyan-300">
              <Github className="h-3.5 w-3.5" />
              Quick Links
            </div>

            <div className="space-y-3">
              <a
                href="https://github.com/maxhayim"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
              >
                GitHub Profile
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="#/about"
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
              >
                About
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="#/contact"
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
              >
                Contact
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-6 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 term-title">
                Live Repos Radar
              </h2>
              <div className="mt-1 text-sm text-zinc-500">
                Aircraft-style visualization of your live public repositories.
              </div>
            </div>

            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
              {loadingRepos ? "Loading" : "Live"}
            </span>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-emerald-500/20 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),rgba(3,7,18,0.96)_55%)]">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(16,185,129,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_43%,rgba(16,185,129,0.05)_44%,transparent_45%,transparent_100%)]" />

            <motion.div
              className="absolute left-1/2 top-1/2 h-[720px] w-[720px] origin-center -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(16,185,129,0.0) 0deg, rgba(16,185,129,0.0) 322deg, rgba(110,231,183,0.16) 334deg, rgba(167,243,208,0.92) 345deg, rgba(16,185,129,0.14) 355deg, rgba(16,185,129,0.0) 360deg)",
              }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[720px] w-[720px] origin-center -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(16,185,129,0.0) 0deg, rgba(16,185,129,0.0) 328deg, rgba(16,185,129,0.0) 336deg, rgba(167,243,208,0.35) 345deg, rgba(16,185,129,0.0) 354deg, rgba(16,185,129,0.0) 360deg)",
                filter: "blur(12px)",
              }}
            />

            {[560, 430, 300, 170].map((size) => (
              <div
                key={size}
                className="absolute left-1/2 top-1/2 rounded-full border border-emerald-500/20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-emerald-500/15" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-emerald-500/15" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-20 w-20 rounded-full border border-emerald-500/20" />
                <div className="absolute h-36 w-36 rounded-full border border-emerald-500/15" />
                <div className="absolute h-52 w-52 rounded-full border border-emerald-500/10" />
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.12, 0.35] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute h-10 w-10 rounded-full border border-emerald-300/20"
                />
                <div className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.95)]" />
              </div>
            </div>

            {radarTargets.map(({ repo, position }, index) => {
              const isActive = repo.name === activeConversationRepo;

              return (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute"
                  style={{ top: position.top, left: position.left }}
                  animate={{
                    opacity: isActive ? [0.9, 1, 0.9] : [0.65, 1, 0.65],
                    scale: isActive ? [1.05, 1.18, 1.05] : [1, 1.08, 1],
                    y: isActive ? [0, -3, 0] : [0, -2, 0],
                  }}
                  transition={{
                    duration: isActive ? 0.9 : 2.8 + index * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{
                        duration: 2 + index * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Plane
                        className={`h-4 w-4 ${isActive ? "text-cyan-300" : "text-emerald-300"}`}
                      />
                    </motion.div>

                    <div
                      className={`rounded-md border px-2 py-1 ${
                        isActive
                          ? "border-cyan-400/30 bg-cyan-500/10 text-cyan-100"
                          : "border-emerald-500/20 bg-black/55 text-emerald-200"
                      }`}
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                        {buildFlightCode(repo)}
                      </div>
                      <div
                        className={`max-w-[140px] truncate text-[8px] ${
                          isActive ? "text-cyan-200/90" : "text-emerald-300/80"
                        }`}
                      >
                        {repo.name}
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}

            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-zinc-300">
              <Radar className="h-3.5 w-3.5 text-emerald-300" />
              Live aircraft-style repository tracking
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-6 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 term-title">
                Repo Traffic
              </h2>
              <div className="mt-1 text-sm text-zinc-500">
                Live GitHub repository activity presented like message flow.
              </div>
            </div>

            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
              Message Stream Live
            </span>
          </div>

          <div className="h-[360px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
            <div className="flex h-full flex-col gap-3 overflow-hidden">
              {repoTraffic.slice(0, visibleMessages).map((entry, index) => {
                const isTx = entry.tag === "TX";

                return (
                  <motion.div
                    key={`${entry.from}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.28 }}
                    className={`flex ${isTx ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl border px-3 py-3 shadow-lg ${
                        isTx
                          ? "border-emerald-500/25 bg-emerald-500/10"
                          : "border-cyan-500/25 bg-cyan-500/10"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]">
                          <span
                            className={
                              isTx ? "text-emerald-300" : "text-cyan-300"
                            }
                          >
                            {entry.tag}
                          </span>
                          <span className="text-zinc-400">{entry.from}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          {entry.time}
                        </span>
                      </div>
                      <p className="font-mono text-[12px] leading-6 text-zinc-200">
                        {entry.message}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-6 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 term-title">
                Repo Telemetry
              </h2>
              <div className="mt-1 text-sm text-zinc-500">
                Instrument-style metrics for your live public repositories.
              </div>
            </div>

            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-300">
              Instrument Panel
            </span>
          </div>

          <div className="grid h-[360px] gap-4 content-start">
            <div className="grid gap-4 sm:grid-cols-2">
              {telemetrySwitches.map((item, index) => {
                const Icon = item.icon;
                const enabled = item.value > 0;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.35 }}
                    className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-emerald-300" />
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                          {item.label}
                        </div>
                        <div className="text-sm text-zinc-200">
                          {item.value}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: enabled
                          ? "rgb(34 197 94)"
                          : "rgb(63 63 70)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="relative h-6 w-11 rounded-full"
                    >
                      <motion.div
                        initial={false}
                        animate={{ x: enabled ? 18 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] term-title text-violet-300">
                <Activity className="h-3.5 w-3.5" />
                Active Languages
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {repoTelemetry.languages.length ? (
                  repoTelemetry.languages.slice(0, 6).map((lang) => (
                    <div
                      key={lang}
                      className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-300"
                    >
                      {lang}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-zinc-400">
                    No language data available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-6 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 term-title">
                Recent Activity
              </h2>
              <div className="mt-1 text-sm text-zinc-500">
                Recent update log for featured repositories.
              </div>
            </div>

            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-orange-300">
              Flight Log
            </span>
          </div>

          <div className="h-[360px] rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
            <div className="flex h-full flex-col gap-3 overflow-hidden">
              {recentActivity.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.28 }}
                  className="rounded-2xl border border-zinc-800 bg-black/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">
                        {repo.name}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                        {buildFlightCode(repo)}
                      </div>
                    </div>
                    <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                      {repo.language || "—"}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                    <Clock3 className="h-3.5 w-3.5 text-orange-300" />
                    Updated {formatDate(repo.updated_at)}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-12">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] term-title text-orange-300">
            <CircleDot className="h-3.5 w-3.5" />
            Repo Health Lights
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "GitHub API", state: loadingRepos ? "warn" : "ok" },
              { label: "Radar Link", state: repos.length ? "ok" : "down" },
              {
                label: "Traffic Feed",
                state: repoTraffic.length > 0 ? "ok" : "warn",
              },
            ].map((light) => (
              <div
                key={light.label}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-2"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${
                      light.state === "ok"
                        ? "bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                        : light.state === "warn"
                          ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                          : "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"
                    }`}
                  />
                  {light.label}
                </div>
                <div className="text-xs font-medium text-zinc-200">
                  {light.state === "ok"
                    ? "Online"
                    : light.state === "warn"
                      ? "Pending"
                      : "Offline"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BuddyList repos={repos} loading={loadingRepos} />

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-12">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-cyan-300">
            <Github className="h-3.5 w-3.5" />
            GitHub Stats
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Repositories
              </div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">
                {repoTelemetry.totalRepos}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Stars
              </div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">
                {repoTelemetry.totalStars}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Forks
              </div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">
                {repoTelemetry.totalForks}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Languages
              </div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">
                {repoTelemetry.languages.length}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Top Repo
              </div>
              <div className="mt-2 truncate text-base font-semibold text-zinc-100">
                {repos[0]?.name || "—"}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Top Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {repoTelemetry.languages.length ? (
                  repoTelemetry.languages.slice(0, 8).map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-300"
                    >
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">
                    No language data available.
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Recent Repository Updates
              </div>
              <div className="space-y-3">
                {recentActivity.slice(0, 3).map((repo) => (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 px-3 py-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-200">
                        {repo.name}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                        {repo.language || "—"}
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                      {formatDate(repo.updated_at)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SharedShell>
  );
}

function AboutPage() {
  return (
    <SharedShell currentPage="about">
      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-emerald-300">
              <User className="h-3.5 w-3.5" />
              About
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
              About
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-cyan-300" /> MIA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-emerald-300" /> OS Journey /
                Design / Code
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-orange-300" /> Personal Timeline
              </span>
            </div>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-300 md:text-base">
              This page is a command-center style profile of the systems,
              interfaces, software eras, and creative path that brought coding
              back into focus.
            </p>
          </div>

          <div className="md:col-span-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] term-title text-cyan-300">
              <Monitor className="h-3.5 w-3.5" /> System Badges
            </div>
            <div className="flex flex-wrap gap-2">
              {osBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-8">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-emerald-300">
            <Radio className="h-3.5 w-3.5" /> OS Journey Timeline
          </div>

          <div className="space-y-4">
            <InteractiveDialup />

            {journey.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.year}-${item.title}`}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                      <Icon className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                          {item.year}
                        </span>
                        <h3 className="text-base font-semibold text-zinc-100">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-4">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-orange-300">
            <Terminal className="h-3.5 w-3.5" /> Favorites
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="text-sm font-semibold text-zinc-100">
                Favorite Operating Systems
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {favoriteSystems.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="text-sm font-semibold text-zinc-100">
                Favorite Applications Growing Up
              </h3>
              <p className="mt-2 text-xs text-zinc-500">
                Some may no longer be maintained.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {favoriteApps.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-6">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-violet-300">
            <Cpu className="h-3.5 w-3.5" /> Skills & Tools
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-700 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-6">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-orange-300">
            <Terminal className="h-3.5 w-3.5" /> MS-DOS Game Archive
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-sm font-semibold text-zinc-100">
                  Pong-Style MS-DOS Game
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  One of the earliest programming projects was a Pong-style game
                  built during the MS-DOS phase. It represents an early step in
                  logic, motion, and classic software thinking.
                </p>
              </div>
              <PongGame />
            </div>
          </div>
        </div>
      </section>
    </SharedShell>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mailAudioRef = useRef(null);

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const audio = mailAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  return (
    <SharedShell currentPage="contact">
      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-12 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-emerald-300">
              <Phone className="h-3.5 w-3.5" /> Contact
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
              Contact
            </h1>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-300 md:text-base">
              A mail-console style contact page with an embedded relay panel and
              terminal-inspired composition window.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-cyan-300">
          <Terminal className="h-3.5 w-3.5" /> Mail Operations Console
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#061017] shadow-inner">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
              mail-console.sh
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-12">
            <div className="border-b border-zinc-800 p-4 lg:col-span-8 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                    Terminal Contact Form
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">
                    Compose a message and stage it in demonstration mode.
                  </div>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                  relay ready
                </div>
              </div>

              <audio
                ref={mailAudioRef}
                src="/audio/youve-got-mail.mp3"
                preload="auto"
              />

              <form className="space-y-4" onSubmit={handleFakeSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <div className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300">
                      $ name
                    </div>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/40"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300">
                      $ email
                    </div>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/40"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300">
                    $ subject
                  </div>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/40"
                    placeholder="Subject"
                  />
                </label>

                <label className="block">
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300">
                    $ message
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={14}
                    className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition focus:border-emerald-500/40"
                    placeholder="Type your message here..."
                  />
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
                  >
                    ./queue-message
                  </button>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Demonstration only — no live message is sent
                  </span>
                </div>

                {submitted && (
                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                    Message staged in demo mode. Public site relay is
                    intentionally simulated only.
                  </div>
                )}
              </form>
            </div>

            <div className="p-4 lg:col-span-4">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-cyan-300">
                <Mail className="h-3.5 w-3.5" /> Embedded Relay Panel
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                      Server A
                    </div>
                    <div className="mt-2 text-sm font-semibold text-zinc-100">
                      contact-terminal.local
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">
                      Payload staging
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center gap-2 px-1">
                    <div className="h-px w-8 bg-cyan-400/60" />
                    <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                      SMTP
                    </div>
                    <div className="h-px w-8 bg-cyan-400/60" />
                    <motion.div
                      animate={{ y: [0, -10, 0], opacity: [0.35, 1, 0.35] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.95)]"
                    />
                  </div>

                  <div className="flex-1 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                      Server B
                    </div>
                    <div className="mt-2 text-sm font-semibold text-zinc-100">
                      github-mail.gateway
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">
                      Relay online
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4 font-mono text-xs text-zinc-300">
                  <div className="text-emerald-300">
                    [TX] HELO contact-terminal.local
                  </div>
                  <div className="mt-1 text-cyan-300">
                    [RX] 250 github-mail.gateway ready
                  </div>
                  <div className="mt-1">
                    [TX] MAIL FROM: &lt;
                    {formData.email || "demo-user@terminal.local"}&gt;
                  </div>
                  <div className="mt-1">
                    [TX] RCPT TO: &lt;demo-relay@maxhayim.github.io&gt;
                  </div>
                  <div className="mt-1">
                    [TX] SUBJECT: {formData.subject || "Website Contact"}
                  </div>
                  <motion.div
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mt-1 text-cyan-300"
                  >
                    [RX] DATA stream accepted, payload ready...
                  </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs uppercase tracking-[0.18em]">
                  <div className="rounded-xl border border-zinc-800 bg-black/40 px-3 py-3 text-zinc-300">
                    <div className="text-zinc-500">Link</div>
                    <div className="mt-1 text-emerald-300">Encrypted</div>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-black/40 px-3 py-3 text-zinc-300">
                    <div className="text-zinc-500">Queue</div>
                    <div className="mt-1 text-cyan-300">Live</div>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-black/40 px-3 py-3 text-zinc-300">
                    <div className="text-zinc-500">Status</div>
                    <div className="mt-1 text-emerald-300">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SharedShell>
  );
}

/* ---------- storage helpers (private mode / blocked storage safe) ---------- */

function readStore(store, key) {
  try {
    return window[store].getItem(key);
  } catch {
    return null;
  }
}

function writeStore(store, key, value) {
  try {
    window[store].setItem(key, value);
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/* ---------- CRT mode ---------- */

const CRT_MODES = [
  { id: "off", label: "Off" },
  { id: "color", label: "Color" },
  { id: "green", label: "Green" },
  { id: "amber", label: "Amber" },
];

function applyCrt(mode) {
  document.documentElement.dataset.crt = mode;
}

/* ---------- Boot sequence (Award-style POST -> System Configurations -> DOS) ---------- */

const MEMORY_TARGET = 65536;

const IDE_DETECT = [
  { label: "Primary Master  ", result: "MESHNODE-HDD 540MB" },
  { label: "Primary Slave   ", result: "None" },
  { label: "Secondary Master", result: "ATAPI CD-ROM 4X" },
  { label: "Secondary Slave ", result: "None" },
];

const SYS_CONFIG = [
  [
    ["CPU Type", "MaXHyM-486DX2", "Base Memory", "640K"],
    ["Co-Processor", "Installed", "Extended Memory", "64896K"],
    ["CPU Clock", "66MHz", "Cache Memory", "256K"],
  ],
  [
    ["Diskette Drive  A", "1.44M, 3.5 in.", "Display Type", "EGA/VGA"],
    ["Diskette Drive  B", "None", "Serial Port(s)", "3F8 2F8"],
    ["Pri. Master  Disk", "LBA ,Mode 4, 540MB", "Parallel Port(s)", "378"],
    ["Pri. Slave   Disk", "None", "EDO DRAM at Row(s)", "0 1"],
    ["Sec. Master  Disk", "CDROM,Mode 4", "SDRAM at Row(s)", "None"],
    ["Sec. Slave   Disk", "None", "L2 Cache Type", "None"],
  ],
];

const PCI_DEVICES = [
  ["0", "7", "1", "8086", "1230", "IDE Controller", "14"],
  ["0", "11", "0", "10EC", "8029", "Network Controller", "10"],
  ["0", "17", "0", "1274", "1371", "Multimedia Device", "11"],
];

const DOS_LINES = [
  "Starting MaXHyM-DOS...",
  "",
  "C:\\> cd \\MAXHAYIM",
  "C:\\MAXHAYIM> start command-center.exe",
];

/*
 * Boot audio. If /audio/boot.mp3 exists it plays that recording; otherwise it
 * synthesizes the PC sounds: drive spin-up hum, POST beep, floppy grind, disk seeks.
 */
function createBootAudio() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let master = null;
  let recording = null;
  let stopped = false;

  const noiseBuffer = () => {
    const length = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  };

  const synth = {
    hum() {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(40, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 2.5);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 1.5);
      gain.gain.linearRampToValueAtTime(0.05, t + 4);
      osc.connect(gain).connect(master);
      osc.start(t);

      const fan = ctx.createBufferSource();
      fan.buffer = noiseBuffer();
      fan.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 500;
      const fanGain = ctx.createGain();
      fanGain.gain.setValueAtTime(0, t);
      fanGain.gain.linearRampToValueAtTime(0.06, t + 1);
      fan.connect(lp).connect(fanGain).connect(master);
      fan.start(t);
    },
    beep() {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 1000;
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.setValueAtTime(0, t + 0.18);
      osc.connect(gain).connect(master);
      osc.start(t);
      osc.stop(t + 0.2);
    },
    seek() {
      const count = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const t = ctx.currentTime + i * (0.04 + Math.random() * 0.06);
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer();
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = 1800 + Math.random() * 1500;
        bp.Q.value = 2;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
        src.connect(bp).connect(gain).connect(master);
        src.start(t);
        src.stop(t + 0.03);
      }
    },
    floppy() {
      const t0 = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const t = t0 + i * 0.16;
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(55 + i * 12, t);
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = 400;
        bp.Q.value = 1.5;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
        gain.gain.linearRampToValueAtTime(0, t + 0.13);
        osc.connect(bp).connect(gain).connect(master);
        osc.start(t);
        osc.stop(t + 0.14);
      }
    },
  };

  return {
    start() {
      recording = new Audio("/audio/boot.mp3");
      recording.play().catch(() => {
        recording = null;
        if (stopped || !AudioCtx) return;
        ctx = new AudioCtx();
        master = ctx.createGain();
        master.gain.value = 0.7;
        master.connect(ctx.destination);
        synth.hum();
      });
    },
    play(name) {
      if (!ctx || stopped) return;
      synth[name]?.();
    },
    stop() {
      stopped = true;
      if (recording) {
        recording.pause();
        recording = null;
      }
      if (ctx) {
        const c = ctx;
        master.gain.setTargetAtTime(0, c.currentTime, 0.1);
        setTimeout(() => c.close?.(), 400);
        ctx = null;
      }
    },
  };
}

function bootDateCode() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${String(d.getFullYear()).slice(2)}-i486DX2,MXH-MESH-0823-00`;
}

const SHUTDOWN_ORANGE = "#dc7a3c";

// mode: "gate" (first visit, waits for a key), "powered" (reboot, starts immediately), "off" (shut down screen)
function BootScreen({ onDone, mode }) {
  const [phase, setPhase] = useState(mode === "powered" ? "on" : mode);
  const powered = phase === "on";
  const [shutdownVisible, setShutdownVisible] = useState(false);
  const [screen, setScreen] = useState(1);
  const [post, setPost] = useState(0); // how many POST blocks are visible
  const [memory, setMemory] = useState(0);
  const [detect, setDetect] = useState(0); // IDE lines: 2 steps each (probing, resolved)
  const [cfg, setCfg] = useState(0); // 1 = table, 2+ = PCI rows
  const [dmiDots, setDmiDots] = useState(-1);
  const [dos, setDos] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);
  const audioRef = useRef(null);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    audioRef.current?.stop();
    setLeaving(true);
    setTimeout(onDone, 350);
  };

  // Shut down or power-on screen: any key or click powers on. While booting: any key or click skips.
  const handleInput = () => {
    if (phase === "off" && !shutdownVisible) return;
    if (!powered) setPhase("on");
    else finish();
  };

  // Win95-style: screen goes dark for a moment, then the message appears.
  useEffect(() => {
    if (phase !== "off") return;
    const t = setTimeout(() => setShutdownVisible(true), 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
      handleInput();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!powered) return;
    const audio = createBootAudio();
    audioRef.current = audio;
    audio.start();

    const timers = [];
    let t = 0;
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const after = (ms, fn) => {
      t += ms;
      at(t, fn);
    };

    // Screen 1: POST
    after(300, () => setPost(1)); // BIOS header
    after(700, () => setPost(2)); // chipset
    after(600, () => setPost(3)); // CPU + memory test
    for (let i = 1; i <= 36; i++)
      after(70, () => setMemory(Math.round((MEMORY_TARGET * i) / 36)));
    after(150, () => audio.play("beep"));
    after(700, () => setPost(4)); // PnP extension
    IDE_DETECT.forEach((_, i) => {
      after(500, () => {
        setDetect(i * 2 + 1);
        audio.play("seek");
      });
      after(750, () => setDetect(i * 2 + 2));
    });

    // Screen 2: System Configurations
    after(1100, () => {
      setScreen(2);
      setCfg(1);
      audio.play("floppy");
    });
    PCI_DEVICES.forEach((_, i) =>
      after(i === 0 ? 1000 : 350, () => setCfg(i + 2)),
    );
    after(800, () => setDmiDots(0));
    for (let i = 1; i <= 7; i++) after(230, () => setDmiDots(i));
    after(400, () => audio.play("seek"));

    // DOS
    DOS_LINES.forEach((line, i) =>
      after(i === 0 ? 500 : 550, () => {
        setDos(i + 1);
        if (i === 0) audio.play("floppy");
        else if (line) audio.play("seek");
      }),
    );
    after(1100, finish);

    return () => {
      timers.forEach(clearTimeout);
      audio.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [powered]);

  const bright = "text-white";
  const year = new Date().getFullYear();

  return (
    <div
      role="dialog"
      aria-label="Boot sequence"
      onClick={handleInput}
      className={`bios-font fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-black text-[14px] leading-[1.35] text-[#aaaaaa] transition-opacity duration-300 sm:text-[20px] md:text-[24px] ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {phase === "off" ? (
        <div
          className={`flex h-full flex-col items-center justify-center px-6 text-center text-[28px] leading-[1.3] transition-opacity duration-500 sm:text-[40px] md:text-[52px] ${
            shutdownVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ color: SHUTDOWN_ORANGE }}
        >
          <div>
            It&rsquo;s now safe to turn off
            <br />
            your computer.
          </div>
          <div className="absolute inset-x-0 bottom-8 text-[18px] opacity-50 md:text-[22px]">
            Press any key to power on
          </div>
        </div>
      ) : phase === "gate" ? (
        <div
          className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center text-[28px] leading-[1.3] sm:text-[40px] md:text-[52px]"
          style={{ color: SHUTDOWN_ORANGE }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-14 w-14 md:h-16 md:w-16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M7 6.5a8 8 0 1 0 10 0" />
            <line x1="12" y1="2.5" x2="12" y2="11" />
          </svg>
          <div>Press any key to power on</div>
          <div className="text-[18px] opacity-50 md:text-[22px]">
            Sound on for the full experience
          </div>
        </div>
      ) : screen === 1 ? (
        <div className="relative mx-auto flex h-full max-w-6xl flex-col px-5 py-6 md:px-12 md:py-10">
          {post >= 1 && (
            <>
              <img
                src="/bios/energy-star.png"
                alt=""
                className="absolute right-5 top-6 w-[24%] max-w-[260px] md:right-12 md:top-10"
              />
              <div className="flex items-start gap-3 pr-[28%]">
                <img
                  src="/bios/award.png"
                  alt=""
                  className="mt-[0.1em] h-[2.5em] w-auto shrink-0"
                />
                <div>
                  <div>MAXHAYIM Modular BIOS v2.01, An Energy Star Ally</div>
                  <div>
                    Copyright (C) 2009-{String(year).slice(2)}, maxhayim.com
                  </div>
                </div>
              </div>
            </>
          )}
          {post >= 2 && (
            <div className="mt-[1.35em]">
              (MXH0823E) MaXHyM i486 MeshSet(TM)
            </div>
          )}
          {post >= 3 && (
            <div className="mt-[1.35em]">
              <div>MaXHyM-486DX2 CPU at 66MHz</div>
              <div className="whitespace-pre">
                Memory Test : {String(memory).padStart(5, " ")}K
                {memory >= MEMORY_TARGET ? " OK" : ""}
              </div>
            </div>
          )}
          {post >= 4 && (
            <div className="mt-[1.35em]">
              <div className="whitespace-pre-wrap">
                MaXHyM Plug and Play BIOS Extension v1.0A
              </div>
              <div>Copyright (C) {year}, maxhayim.com</div>
              {IDE_DETECT.map((drive, i) => {
                const step = detect - i * 2;
                if (step < 1) return null;
                return (
                  <div key={drive.label} className="whitespace-pre-wrap">
                    {"  Detecting IDE "}
                    {drive.label}
                    {" ... "}
                    {step === 1 ? (
                      <>
                        [Press <span className={bright}>F4</span> to skip]
                        <span className="animate-pulse">_</span>
                      </>
                    ) : (
                      drive.result
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {post >= 1 && (
            <div className="mt-auto">
              <div>
                Press <span className={bright}>DEL</span> to enter SETUP, any
                other key to skip
              </div>
              <div>{bootDateCode()}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto flex h-full max-w-6xl flex-col overflow-x-auto px-3 py-6 text-[12px] sm:text-[16px] md:px-10 md:py-10 md:text-[22px]">
          <div className="sm:min-w-[640px]">
            <div className="text-center">System Configurations</div>
            <div className="mt-1 border-[3px] border-double border-[#aaaaaa]">
              {SYS_CONFIG.map((block, b) => (
                <div
                  key={b}
                  className={`px-3 py-2 sm:px-4 ${b > 0 ? "border-t border-[#aaaaaa]" : ""}`}
                >
                  <div className="sm:hidden">
                    {[
                      ...block.map(([l, v]) => [l, v]),
                      ...block.map(([, , l, v]) => [l, v]),
                    ].map(([l, v]) => (
                      <div
                        key={l}
                        className="grid grid-cols-[1fr_auto_1fr] gap-x-2 whitespace-pre"
                      >
                        <span>{l}</span>
                        <span>:</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                  {block.map(([l1, v1, l2, v2]) => (
                    <div
                      key={l1}
                      className="hidden grid-cols-[1fr_auto_1.1fr_1fr_auto_0.8fr] gap-x-2 whitespace-pre sm:grid"
                    >
                      <span>{l1}</span>
                      <span>:</span>
                      <span>{v1}</span>
                      <span>{l2}</span>
                      <span>:</span>
                      <span className={b === 0 ? "text-right" : ""}>{v2}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {cfg >= 2 && (
              <div className="mt-[2em]">
                <div>PCI device listing.....</div>
                <div className="grid grid-cols-[1fr_1fr_1.8fr_0.5fr] border-b border-[#aaaaaa] pb-1 sm:grid-cols-[0.8fr_1fr_1fr_1fr_1fr_1.7fr_0.4fr]">
                  <span className="hidden sm:block">Bus No.</span>
                  <span className="hidden sm:block">Device No.</span>
                  <span className="hidden sm:block">Func No.</span>
                  <span>Vendor ID</span>
                  <span>Device ID</span>
                  <span>Device Class</span>
                  <span className="text-right">IRQ</span>
                </div>
                {PCI_DEVICES.slice(0, cfg - 1).map((row) => (
                  <div
                    key={row[3]}
                    className="grid grid-cols-[1fr_1fr_1.8fr_0.5fr] pt-1 sm:grid-cols-[0.8fr_1fr_1fr_1fr_1fr_1.7fr_0.4fr]"
                  >
                    {row.map((cell, i) => (
                      <span
                        key={i}
                        className={
                          i === 6
                            ? "text-right"
                            : i < 3
                              ? "hidden pl-[1.5em] sm:block"
                              : i < 5
                                ? "sm:pl-[1.5em]"
                                : ""
                        }
                      >
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-[2em]">
              {dmiDots >= 0 && (
                <div className="whitespace-pre">
                  Verifying DMI Pool Data {".".repeat(dmiDots)}
                  {dmiDots >= 7 ? " Update Success" : ""}
                </div>
              )}
              {DOS_LINES.slice(0, dos).map((line, i) => (
                <div key={i} className={line.startsWith("C:\\") ? bright : ""}>
                  {line || "\u00a0"}
                </div>
              ))}
              {dmiDots >= 0 && <span className="animate-pulse">_</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Buddy List ---------- */

const AWAY_CACHE_KEY = "mh-buddy-away-v1";
const AWAY_CACHE_MS = 30 * 60 * 1000;

function daysSince(value) {
  if (!value) return Infinity;
  return (Date.now() - new Date(value).getTime()) / 86400000;
}

function buddyStatus(repo) {
  const days = daysSince(repo.pushed_at || repo.updated_at);
  if (days <= 7) return "online";
  if (days <= 30) return "away";
  return "offline";
}

function timeAgo(value) {
  const days = daysSince(value);
  if (!Number.isFinite(days)) return "never";
  const minutes = days * 1440;
  if (minutes < 60) return `${Math.max(1, Math.round(minutes))}m`;
  if (days < 1) return `${Math.round(minutes / 60)}h`;
  if (days < 60) return `${Math.round(days)}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${Math.round(days / 365)}y`;
}

const STATUS_STYLE = {
  online: {
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    text: "text-emerald-300",
    label: "Online",
  },
  away: { dot: "bg-amber-400", text: "text-amber-300", label: "Away" },
  offline: { dot: "bg-zinc-600", text: "text-zinc-500", label: "Offline" },
};

function BuddyList({ repos, loading }) {
  const [awayMessages, setAwayMessages] = useState(() => {
    try {
      const cached = JSON.parse(
        readStore("sessionStorage", AWAY_CACHE_KEY) || "null",
      );
      if (cached && Date.now() - cached.ts < AWAY_CACHE_MS) return cached.map;
    } catch {
      /* ignore */
    }
    return {};
  });
  const [collapsed, setCollapsed] = useState({});
  const [selectedName, setSelectedName] = useState(null);

  const buddies = useMemo(
    () =>
      [...repos]
        .map((repo) => ({ ...repo, status: buddyStatus(repo) }))
        .sort(
          (a, b) =>
            new Date(b.pushed_at || b.updated_at || 0).getTime() -
            new Date(a.pushed_at || a.updated_at || 0).getTime(),
        ),
    [repos],
  );

  const groups = ["online", "away", "offline"].map((status) => ({
    status,
    members: buddies.filter((b) => b.status === status),
  }));
  // Offline starts collapsed, unless nobody else is signed on.
  const hasActive = groups[0].members.length + groups[1].members.length > 0;
  const isCollapsed = (status) =>
    collapsed[status] ?? (status === "offline" && hasActive);

  // Latest commit message becomes the away message, for the buddies that were active recently.
  useEffect(() => {
    if (loading) return;
    const targets = buddies
      .filter((b) => b.status !== "offline" && !(b.name in awayMessages))
      .slice(0, 10);
    if (!targets.length) return;
    let cancelled = false;

    Promise.all(
      targets.map(async (buddy) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/maxhayim/${buddy.name}/commits?per_page=1`,
          );
          if (!res.ok) return [buddy.name, null];
          const [latest] = await res.json();
          return [buddy.name, latest?.commit?.message?.split("\n")[0] || null];
        } catch {
          return [buddy.name, null];
        }
      }),
    ).then((entries) => {
      if (cancelled) return;
      setAwayMessages((prev) => {
        const map = { ...prev, ...Object.fromEntries(entries) };
        writeStore(
          "sessionStorage",
          AWAY_CACHE_KEY,
          JSON.stringify({ ts: Date.now(), map }),
        );
        return map;
      });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buddies, loading]);

  const selected = buddies.find((b) => b.name === selectedName) || buddies[0];
  const onlineCount = groups[0].members.length;
  const selectedStyle = selected ? STATUS_STYLE[selected.status] : null;
  const selectedAway = selected
    ? awayMessages[selected.name] || selected.description
    : null;

  return (
    <section className="grid gap-6 md:grid-cols-12">
      <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-5 md:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-amber-300">
            <Users className="h-3.5 w-3.5" /> Buddy List
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {loading ? "Signing on…" : `${onlineCount} online`}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
          <img
            src="/avatar.jpg"
            alt=""
            className="h-10 w-10 rounded-lg border border-zinc-800 object-cover"
          />
          <div className="min-w-0">
            <div className="truncate font-mono text-sm text-zinc-100">
              maxhayim
            </div>
            <div className="text-xs text-emerald-300">Available</div>
          </div>
        </div>

        <div className="mt-3 max-h-[360px] overflow-y-auto rounded-2xl border border-zinc-800 bg-black/40 p-2 font-mono text-sm">
          {groups.map(({ status, members }) => (
            <div key={status} className="mb-1">
              <button
                type="button"
                onClick={() =>
                  setCollapsed((c) => ({
                    ...c,
                    [status]: !isCollapsed(status),
                  }))
                }
                aria-expanded={!isCollapsed(status)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-zinc-400 hover:bg-zinc-900"
              >
                <span
                  className={`inline-block transition-transform ${isCollapsed(status) ? "" : "rotate-90"}`}
                >
                  ▸
                </span>
                <span className="font-semibold text-zinc-300">
                  {STATUS_STYLE[status].label}
                </span>
                <span>
                  ({members.length}/{buddies.length})
                </span>
              </button>

              {!isCollapsed(status) &&
                members.map((buddy) => {
                  const isSelected = selected?.name === buddy.name;
                  return (
                    <button
                      key={buddy.name}
                      type="button"
                      onClick={() => setSelectedName(buddy.name)}
                      className={`flex w-full items-center gap-2 rounded-lg py-1.5 pl-7 pr-2 text-left transition ${
                        isSelected
                          ? "bg-amber-500/10 text-amber-100"
                          : "text-zinc-300 hover:bg-zinc-900"
                      } ${buddy.status === "offline" ? "opacity-60" : ""}`}
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${STATUS_STYLE[buddy.status].dot}`}
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {buddy.name}
                      </span>
                      {buddy.status === "away" && awayMessages[buddy.name] && (
                        <MessageSquare
                          className="h-3 w-3 shrink-0 text-amber-300"
                          aria-label="Has away message"
                        />
                      )}
                      <span className="shrink-0 text-[10px] text-zinc-500">
                        {timeAgo(buddy.pushed_at || buddy.updated_at)}
                      </span>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-7 md:p-5">
        <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-amber-300">
          <User className="h-3.5 w-3.5" /> Buddy Info
        </div>

        {selected ? (
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-mono text-xl text-zinc-100">
                {selected.name}
              </h3>
              <span
                className={`flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${selectedStyle.text}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${selectedStyle.dot}`}
                />
                {selectedStyle.label}
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {awayMessages[selected.name]
                  ? "Away message · latest commit"
                  : "Profile"}
              </div>
              <p className="mt-2 font-mono text-sm italic leading-6 text-zinc-200">
                {selectedAway}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [
                  "Last push",
                  formatDate(selected.pushed_at || selected.updated_at),
                ],
                ["Language", selected.language || "—"],
                ["Stars", selected.stargazers_count ?? 0],
                ["Forks", selected.forks_count ?? 0],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-2"
                >
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    {label}
                  </dt>
                  <dd className="mt-1 truncate text-sm text-zinc-100">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {awayMessages[selected.name] && selected.description && (
              <p className="text-sm leading-6 text-zinc-400">
                {selected.description}
              </p>
            )}

            <a
              href={selected.html_url}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-amber-200 transition hover:bg-amber-500/20"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Open repository
            </a>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No buddies signed on yet.</p>
        )}
      </div>
    </section>
  );
}

/* ---------- App ---------- */

export default function App() {
  const route = useHashRoute();
  const [booting, setBooting] = useState(
    () => !readStore("localStorage", "mh-booted") && !prefersReducedMotion(),
  );
  // First visits wait at the power-on screen (browsers need a key or click before sound can play).
  // Reboot starts straight away; Power shows the shut-down screen.
  const [bootMode, setBootMode] = useState("gate");

  useEffect(() => {
    applyCrt(readStore("localStorage", "mh-crt") || "off");
    const reboot = () => {
      window.scrollTo(0, 0);
      setBootMode("powered");
      setBooting(true);
    };
    const powerOff = () => {
      window.scrollTo(0, 0);
      setBootMode("off");
      setBooting(true);
    };
    window.addEventListener("mh-reboot", reboot);
    window.addEventListener("mh-power-off", powerOff);
    return () => {
      window.removeEventListener("mh-reboot", reboot);
      window.removeEventListener("mh-power-off", powerOff);
    };
  }, []);

  const page =
    route === "about" ? (
      <AboutPage />
    ) : route === "contact" ? (
      <ContactPage />
    ) : (
      <HomePage />
    );

  return (
    <>
      {page}
      {booting && (
        <BootScreen
          key={bootMode}
          mode={bootMode}
          onDone={() => {
            writeStore("localStorage", "mh-booted", "1");
            setBooting(false);
          }}
        />
      )}
    </>
  );
}
