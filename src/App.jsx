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
  RotateCcw,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#/" },
  { label: "About", href: "#/about" },
  { label: "Contact", href: "#/contact" },
];

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
    const onHashChange = () => setRoute(getRoute());
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
      "Public command center homepage for maxhayim with live repo radar, telemetry, traffic, about timeline, and contact console."
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

function SharedShell({ currentPage, children }) {
  const currentYear = new Date().getFullYear();
  usePageMeta();

  return (
    <div className="mh-screen relative min-h-screen overflow-hidden bg-[#04070b] text-zinc-100 selection:bg-emerald-400/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <nav className="relative z-20 rounded-3xl border border-zinc-800 bg-black/60 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo_fullclear.png" alt="maxhayim logo" className="h-10 w-auto" />
            <div className="text-lg font-semibold tracking-[0.2em] text-zinc-100">
              maxhayim.com
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => {
              const isActive =
                (currentPage === "home" && item.href === "#/") ||
                (currentPage === "about" && item.href === "#/about") ||
                (currentPage === "contact" && item.href === "#/contact");

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`rounded-xl border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                    isActive
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                      : "border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <span className="mx-1 hidden h-6 w-px bg-zinc-800 md:block" aria-hidden="true" />
            <CrtToggle />
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("mh-reboot"))}
              title="Replay the boot sequence"
              className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reboot
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col gap-6">
        {children}
      </main>

      <footer className="relative z-10 rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-3 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo_fullclear.png" alt="maxhayim logo" className="h-5 w-auto" />
            <span>© 2009 - {currentYear} MAXYIM.COM. All Rights Reserved.</span>
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            GitHub Command Center
          </div>
        </div>
      </footer>
      </div>
    </div>
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
        Math.min(90, botYRef.current + (next.y - botYRef.current) * 0.08)
      );
      botYRef.current = nextBot;
      setBotY(nextBot);

      const visitorMin = visitorYRef.current - 10;
      const visitorMax = visitorYRef.current + 10;
      const botMin = nextBot - 10;
      const botMax = nextBot + 10;

      if (next.x >= 93 && next.y >= visitorMin && next.y <= visitorMax && next.vx > 0) {
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
            {String(score.bot).padStart(2, "0")} {String(score.visitor).padStart(2, "0")}
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
      setLines((prev) => [...prev, "Negotiating carrier... 2400 / 9600 / 14400"]);
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
          <div className="mt-2 text-lg font-semibold text-zinc-100">PRODIGY ISP</div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
            Local access numbers varied by city
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            initial={false}
            animate={{ opacity: status === "connected" ? [0.55, 1, 0.55] : [0.35, 0.8, 0.35] }}
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
          Prodigy used local POP dial-up access rather than one universal nationwide member number.
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
        const response = await fetch("https://api.github.com/users/maxhayim/repos?per_page=100&sort=updated");
        if (!response.ok) throw new Error("Failed to load repositories");
        const repoList = await response.json();

        const filtered = repoList
          .filter((repo) => !repo.fork)
          .filter((repo) => repo.name !== "maxhayim" && repo.name !== "maxhayim.github.io")
          .sort((a, b) => {
            const aStars = a.stargazers_count || 0;
            const bStars = b.stargazers_count || 0;
            if (bStars !== aStars) return bStars - aStars;
            return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
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
              repoDescriptions[repo.name] || repo.description || "Public repository in the maxhayim command center.",
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
      .filter((repo) => repo.name !== "maxhayim" && repo.name !== "maxhayim.github.io")
      .sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime())
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
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
    const languages = Array.from(
      new Set(repos.map((repo) => repo.language).filter((lang) => lang && lang !== "—"))
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
      .sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime())
      .slice(0, 4);
  }, [repos]);

  const activeConversationRepo = repoTraffic[Math.max(visibleMessages - 1, 0)]?.from;

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
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
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
              Public repos, telemetry, activity logs, and engineering identity presented through a radar-inspired interface centered on live GitHub work.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-emerald-500/20 bg-black/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src="/logo_fullclear.png" alt="maxhayim site logo" className="h-9 w-9" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300">
                      Site Emblem
                    </div>
                    <div className="text-sm text-zinc-200">MAXHAYIM Command Mark</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
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
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
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
                style={{ width: `${size}px`, height: `${size}px`, transform: "translate(-50%, -50%)" }}
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
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
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
                  transition={{ duration: isActive ? 0.9 : 2.8 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 2 + index * 0.15, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Plane className={`h-4 w-4 ${isActive ? "text-cyan-300" : "text-emerald-300"}`} />
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
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
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
                        isTx ? "border-emerald-500/25 bg-emerald-500/10" : "border-cyan-500/25 bg-cyan-500/10"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]">
                          <span className={isTx ? "text-emerald-300" : "text-cyan-300"}>{entry.tag}</span>
                          <span className="text-zinc-400">{entry.from}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          {entry.time}
                        </span>
                      </div>
                      <p className="font-mono text-[12px] leading-6 text-zinc-200">{entry.message}</p>
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
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
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
                        <div className="text-sm text-zinc-200">{item.value}</div>
                      </div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ backgroundColor: enabled ? "rgb(34 197 94)" : "rgb(63 63 70)" }}
                      transition={{ duration: 0.35 }}
                      className="relative h-6 w-11 rounded-full"
                    >
                      <motion.div
                        initial={false}
                        animate={{ x: enabled ? 18 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300">
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
                  <div className="text-sm text-zinc-400">No language data available.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-6 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
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
                      <div className="text-sm font-semibold text-zinc-100">{repo.name}</div>
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
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            <CircleDot className="h-3.5 w-3.5" />
            Repo Health Lights
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "GitHub API", state: loadingRepos ? "warn" : "ok" },
              { label: "Radar Link", state: repos.length ? "ok" : "down" },
              { label: "Traffic Feed", state: repoTraffic.length > 0 ? "ok" : "warn" },
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
                  {light.state === "ok" ? "Online" : light.state === "warn" ? "Pending" : "Offline"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BuddyList repos={repos} loading={loadingRepos} />

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-12">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
            <Github className="h-3.5 w-3.5" />
            GitHub Stats
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Repositories</div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">{repoTelemetry.totalRepos}</div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Stars</div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">{repoTelemetry.totalStars}</div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Forks</div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">{repoTelemetry.totalForks}</div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Languages</div>
              <div className="mt-2 text-3xl font-semibold text-zinc-100">{repoTelemetry.languages.length}</div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Top Repo</div>
              <div className="mt-2 truncate text-base font-semibold text-zinc-100">
                {repos[0]?.name || "—"}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-zinc-500">Top Languages</div>
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
                  <span className="text-sm text-zinc-500">No language data available.</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-zinc-500">Recent Repository Updates</div>
              <div className="space-y-3">
                {recentActivity.slice(0, 3).map((repo) => (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 px-3 py-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-200">{repo.name}</div>
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
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
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
                <Globe className="h-4 w-4 text-emerald-300" /> OS Journey / Design / Code
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-orange-300" /> Personal Timeline
              </span>
            </div>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-300 md:text-base">
              This page is a command-center style profile of the systems, interfaces, software eras, and creative path that brought coding back into focus.
            </p>
          </div>

          <div className="md:col-span-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
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
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
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
                        <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-4">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-300">
            <Terminal className="h-3.5 w-3.5" /> Favorites
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="text-sm font-semibold text-zinc-100">Favorite Operating Systems</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {favoriteSystems.map((item) => (
                  <li key={item} className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="text-sm font-semibold text-zinc-100">Favorite Applications Growing Up</h3>
              <p className="mt-2 text-xs text-zinc-500">Some may no longer be maintained.</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {favoriteApps.map((item) => (
                  <li key={item} className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-2">
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
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300">
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
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-300">
            <Terminal className="h-3.5 w-3.5" /> MS-DOS Game Archive
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-sm font-semibold text-zinc-100">Pong-Style MS-DOS Game</div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  One of the earliest programming projects was a Pong-style game built during the MS-DOS phase. It represents an early step in logic, motion, and classic software thinking.
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
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
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
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
              <Phone className="h-3.5 w-3.5" /> Contact
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
              Contact
            </h1>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-300 md:text-base">
              A mail-console style contact page with an embedded relay panel and terminal-inspired composition window.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
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

              <audio ref={mailAudioRef} src="/audio/youve-got-mail.mp3" preload="auto" />

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
                    Message staged in demo mode. Public site relay is intentionally simulated only.
                  </div>
                )}
              </form>
            </div>

            <div className="p-4 lg:col-span-4">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
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
                    <div className="mt-1 text-xs text-zinc-400">Payload staging</div>
                  </div>

                  <div className="relative flex flex-col items-center gap-2 px-1">
                    <div className="h-px w-8 bg-cyan-400/60" />
                    <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                      SMTP
                    </div>
                    <div className="h-px w-8 bg-cyan-400/60" />
                    <motion.div
                      animate={{ y: [0, -10, 0], opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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
                    <div className="mt-1 text-xs text-zinc-400">Relay online</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4 font-mono text-xs text-zinc-300">
                  <div className="text-emerald-300">[TX] HELO contact-terminal.local</div>
                  <div className="mt-1 text-cyan-300">[RX] 250 github-mail.gateway ready</div>
                  <div className="mt-1">
                    [TX] MAIL FROM: &lt;{formData.email || "demo-user@terminal.local"}&gt;
                  </div>
                  <div className="mt-1">[TX] RCPT TO: &lt;demo-relay@maxhayim.github.io&gt;</div>
                  <div className="mt-1">[TX] SUBJECT: {formData.subject || "Website Contact"}</div>
                  <motion.div
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
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

function CrtToggle() {
  const [mode, setMode] = useState(() => document.documentElement.dataset.crt || "off");

  const cycle = () => {
    const index = CRT_MODES.findIndex((m) => m.id === mode);
    const next = CRT_MODES[(index + 1) % CRT_MODES.length].id;
    setMode(next);
    applyCrt(next);
    writeStore("localStorage", "mh-crt", next);
  };

  const active = mode !== "off";
  const label = CRT_MODES.find((m) => m.id === mode)?.label || "Off";

  return (
    <button
      type="button"
      onClick={cycle}
      title="Cycle CRT mode: off, color, green phosphor, amber phosphor"
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.18em] transition ${
        active
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
          : "border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
      }`}
    >
      <Monitor className="h-3.5 w-3.5" />
      CRT: {label}
    </button>
  );
}

/* ---------- Boot sequence ---------- */

const BOOT_STEPS = [
  { text: "Detecting Floppy Drive A ...... 1.44MB 3.5in", sound: "floppy" },
  { text: "Detecting IDE Primary Master ... MESHNODE-HDD 540MB", sound: "seek" },
  { text: "Detecting IDE Primary Slave .... None" },
  { text: "Detecting IDE Secondary Master . ATAPI CD-ROM 4X", sound: "seek" },
  { text: "Initializing COM1 .............. 14400 bps modem" },
  { text: "" },
  { text: "Starting MAXHAYIM-DOS...", sound: "floppy" },
  { text: "C:\\> cd \\MAXHAYIM", sound: "seek" },
  { text: "C:\\MAXHAYIM> start command-center.exe", sound: "seek" },
];

const MEMORY_TARGET = 65536;
const MEMORY_START_MS = 400;
const MEMORY_STEP_MS = 70;
const MEMORY_STEPS = 36;
const LINES_START_MS = MEMORY_START_MS + MEMORY_STEPS * MEMORY_STEP_MS + 700;
const LINE_MS = 650;
const BOOT_END_MS = LINES_START_MS + BOOT_STEPS.length * LINE_MS + 1200;

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

function PowerSaverBadge() {
  return (
    <svg viewBox="0 0 132 84" className="h-16 w-auto md:h-20" role="img" aria-label="Power saver ready">
      <rect x="1.5" y="1.5" width="129" height="81" rx="10" fill="none" stroke="#34d399" strokeWidth="3" />
      <path d="M34 60 C18 52 20 26 44 20 C44 38 40 50 34 60 Z" fill="#34d399" />
      <path d="M34 60 C36 46 40 34 44 20" stroke="#04070b" strokeWidth="2" fill="none" />
      <path d="M62 24 a14 14 0 1 0 12 0" stroke="#34d399" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="68" y1="18" x2="68" y2="36" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
      <text x="90" y="34" fill="#34d399" fontFamily="monospace" fontSize="11" fontWeight="700">POWER</text>
      <text x="90" y="48" fill="#34d399" fontFamily="monospace" fontSize="11" fontWeight="700">SAVER</text>
      <text x="66" y="72" fill="#34d399" fontFamily="monospace" fontSize="9" textAnchor="middle" letterSpacing="2">GREEN PC READY</text>
    </svg>
  );
}

function BootScreen({ onDone, startPowered }) {
  const [powered, setPowered] = useState(startPowered);
  const [memory, setMemory] = useState(0);
  const [shown, setShown] = useState(0);
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

  // Before power-on, any key or click powers on. After, any key or click skips.
  const handleInput = () => {
    if (!powered) setPowered(true);
    else finish();
  };

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
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    for (let i = 1; i <= MEMORY_STEPS; i++) {
      at(MEMORY_START_MS + i * MEMORY_STEP_MS, () => setMemory(Math.round((MEMORY_TARGET * i) / MEMORY_STEPS)));
    }
    at(MEMORY_START_MS + MEMORY_STEPS * MEMORY_STEP_MS + 150, () => audio.play("beep"));

    BOOT_STEPS.forEach((step, i) => {
      at(LINES_START_MS + i * LINE_MS, () => {
        setShown(i + 1);
        if (step.sound) audio.play(step.sound);
      });
    });
    at(BOOT_END_MS, finish);

    return () => {
      timers.forEach(clearTimeout);
      audio.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [powered]);

  return (
    <div
      role="dialog"
      aria-label="Boot sequence"
      onClick={handleInput}
      className={`fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-black font-mono text-[13px] leading-6 text-zinc-300 transition-opacity duration-300 md:text-sm ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {!powered ? (
        <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-700 text-zinc-400 transition hover:border-emerald-400 hover:text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 6.5a8 8 0 1 0 10 0" />
              <line x1="12" y1="2.5" x2="12" y2="11" />
            </svg>
          </div>
          <div className="text-zinc-400">Press any key to power on</div>
          <div className="text-xs text-zinc-600">Sound on for the full experience</div>
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-3xl p-6 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-3">
                <img src="/logo_fullclear.png" alt="" className="mt-1 h-9 w-auto opacity-80" />
                <div>
                  <div className="text-zinc-100">MAXHAYIM BIOS v2.01, An Energy Star Ally</div>
                  <div>Copyright (C) 2009-{new Date().getFullYear()} maxhayim.com</div>
                </div>
              </div>
              <PowerSaverBadge />
            </div>
            <div className="mt-6">MaXHyM-486DX2 CPU at 66MHz</div>
            <div>
              Memory Test: <span className="text-zinc-100">{memory}K</span>
              {memory >= MEMORY_TARGET && <span className="text-emerald-300"> OK</span>}
            </div>
            <div className="mt-4">
              {BOOT_STEPS.slice(0, shown).map((step, i) => (
                <div key={i} className={step.text.startsWith("C:\\") ? "text-emerald-300" : ""}>
                  {step.text || "\u00a0"}
                </div>
              ))}
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-zinc-300" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-6 text-xs text-zinc-500">
            <div className="mx-auto max-w-3xl px-6 md:px-10">Press any key to skip</div>
          </div>
        </>
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
  online: { dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]", text: "text-emerald-300", label: "Online" },
  away: { dot: "bg-amber-400", text: "text-amber-300", label: "Away" },
  offline: { dot: "bg-zinc-600", text: "text-zinc-500", label: "Offline" },
};

function BuddyList({ repos, loading }) {
  const [awayMessages, setAwayMessages] = useState(() => {
    try {
      const cached = JSON.parse(readStore("sessionStorage", AWAY_CACHE_KEY) || "null");
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
            new Date(a.pushed_at || a.updated_at || 0).getTime()
        ),
    [repos]
  );

  const groups = ["online", "away", "offline"].map((status) => ({
    status,
    members: buddies.filter((b) => b.status === status),
  }));
  // Offline starts collapsed, unless nobody else is signed on.
  const hasActive = groups[0].members.length + groups[1].members.length > 0;
  const isCollapsed = (status) => collapsed[status] ?? (status === "offline" && hasActive);

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
          const res = await fetch(`https://api.github.com/repos/maxhayim/${buddy.name}/commits?per_page=1`);
          if (!res.ok) return [buddy.name, null];
          const [latest] = await res.json();
          return [buddy.name, latest?.commit?.message?.split("\n")[0] || null];
        } catch {
          return [buddy.name, null];
        }
      })
    ).then((entries) => {
      if (cancelled) return;
      setAwayMessages((prev) => {
        const map = { ...prev, ...Object.fromEntries(entries) };
        writeStore("sessionStorage", AWAY_CACHE_KEY, JSON.stringify({ ts: Date.now(), map }));
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
  const selectedAway = selected ? awayMessages[selected.name] || selected.description : null;

  return (
    <section className="grid gap-6 md:grid-cols-12">
      <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-5 md:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300">
            <Users className="h-3.5 w-3.5" /> Buddy List
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {loading ? "Signing on…" : `${onlineCount} online`}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
          <img src="/avatar.jpg" alt="" className="h-10 w-10 rounded-lg border border-zinc-800 object-cover" />
          <div className="min-w-0">
            <div className="truncate font-mono text-sm text-zinc-100">maxhayim</div>
            <div className="text-xs text-emerald-300">Available</div>
          </div>
        </div>

        <div className="mt-3 max-h-[360px] overflow-y-auto rounded-2xl border border-zinc-800 bg-black/40 p-2 font-mono text-sm">
          {groups.map(({ status, members }) => (
            <div key={status} className="mb-1">
              <button
                type="button"
                onClick={() => setCollapsed((c) => ({ ...c, [status]: !isCollapsed(status) }))}
                aria-expanded={!isCollapsed(status)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-zinc-400 hover:bg-zinc-900"
              >
                <span className={`inline-block transition-transform ${isCollapsed(status) ? "" : "rotate-90"}`}>▸</span>
                <span className="font-semibold text-zinc-300">{STATUS_STYLE[status].label}</span>
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
                        isSelected ? "bg-amber-500/10 text-amber-100" : "text-zinc-300 hover:bg-zinc-900"
                      } ${buddy.status === "offline" ? "opacity-60" : ""}`}
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${STATUS_STYLE[buddy.status].dot}`} />
                      <span className="min-w-0 flex-1 truncate">{buddy.name}</span>
                      {buddy.status === "away" && awayMessages[buddy.name] && (
                        <MessageSquare className="h-3 w-3 shrink-0 text-amber-300" aria-label="Has away message" />
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
        <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300">
          <User className="h-3.5 w-3.5" /> Buddy Info
        </div>

        {selected ? (
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-mono text-xl text-zinc-100">{selected.name}</h3>
              <span
                className={`flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${selectedStyle.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${selectedStyle.dot}`} />
                {selectedStyle.label}
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {awayMessages[selected.name] ? "Away message · latest commit" : "Profile"}
              </div>
              <p className="mt-2 font-mono text-sm italic leading-6 text-zinc-200">{selectedAway}</p>
            </div>

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Last push", formatDate(selected.pushed_at || selected.updated_at)],
                ["Language", selected.language || "—"],
                ["Stars", selected.stargazers_count ?? 0],
                ["Forks", selected.forks_count ?? 0],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">{label}</dt>
                  <dd className="mt-1 truncate text-sm text-zinc-100">{value}</dd>
                </div>
              ))}
            </dl>

            {awayMessages[selected.name] && selected.description && (
              <p className="text-sm leading-6 text-zinc-400">{selected.description}</p>
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
    () => !readStore("localStorage", "mh-booted") && !prefersReducedMotion()
  );
  // Reboot comes from a click, so sound is allowed right away; first visits start at the power button.
  const [startPowered, setStartPowered] = useState(false);

  useEffect(() => {
    applyCrt(readStore("localStorage", "mh-crt") || "off");
    const reboot = () => {
      window.scrollTo(0, 0);
      setStartPowered(true);
      setBooting(true);
    };
    window.addEventListener("mh-reboot", reboot);
    return () => window.removeEventListener("mh-reboot", reboot);
  }, []);

  const page = route === "about" ? <AboutPage /> : route === "contact" ? <ContactPage /> : <HomePage />;

  return (
    <>
      {page}
      {booting && (
        <BootScreen
          startPowered={startPowered}
          onDone={() => {
            writeStore("localStorage", "mh-booted", "1");
            setBooting(false);
          }}
        />
      )}
    </>
  );
}
