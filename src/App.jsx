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

const repoConversation = [
  {
    from: "ZPTTLink",
    tag: "TX",
    time: "19:41Z",
    message: "bridge push complete. radio gateway patch packaged and queued for field check.",
  },
  {
    from: "meshmonitor-bridge-homeassistant",
    tag: "RX",
    time: "19:42Z",
    message: "entity state received. synchronizing event payload into automation pipeline.",
  },
  {
    from: "meshmonitor-watchandreboot",
    tag: "TX",
    time: "19:43Z",
    message: "watchdog loop complete. service health within threshold. no recovery action needed.",
  },
  {
    from: "meshmonitor-carrier-outage",
    tag: "RX",
    time: "19:44Z",
    message: "signal anomaly detected. logging outage indicator and raising alert state.",
  },
  {
    from: "meshmonitor-llm-bridge",
    tag: "TX",
    time: "19:45Z",
    message: "message parsed. formatting response for low-bandwidth transport route.",
  },
  {
    from: "meshmonitor-mx-weather-alerts",
    tag: "RX",
    time: "19:46Z",
    message: "bulletin ingested. timed broadcast payload generated and staged.",
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
    document.title = "maxhayim.com — GitHub Command Center";

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
      "Public GitHub command center for maxhayim with live repo radar, telemetry, dashboards, and interactive engineering modules."
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
    <div className="min-h-screen overflow-hidden bg-[#04070b] text-zinc-100 selection:bg-emerald-400/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <nav className="relative z-20 mx-auto mt-4 max-w-7xl rounded-3xl border border-zinc-800 bg-black/60 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo_fullclear.png" alt="maxhayim logo" className="h-10 w-auto" />
            <div className="text-lg font-semibold tracking-[0.2em] text-zinc-100">
              maxhayim.com
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-6">
        {children}
      </main>

      <footer className="relative z-10 mx-auto mb-4 max-w-7xl rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-3 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo_clear.png" alt="maxhayim logo" className="h-4 w-4" />
            <span>© 2009 - {currentYear} MAXYIM.COM. All Rights Reserved.</span>
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            GitHub Command Center
          </div>
        </div>
      </footer>
    </div>
  );
}

function PongGame() {
  const fieldRef = useRef(null);
  const [visitorY, setVisitorY] = useState(50);
  const [botY, setBotY] = useState(50);
  const [ball, setBall] = useState({ x: 50, y: 50, vx: 0.65, vy: 0.42 });
  const [score, setScore] = useState({ bot: 3, visitor: 7 });

  useEffect(() => {
    const handleMove = (clientY) => {
      const rect = fieldRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relativeY = ((clientY - rect.top) / rect.height) * 100;
      setVisitorY(Math.max(10, Math.min(90, relativeY)));
    };

    const onMouseMove = (event) => handleMove(event.clientY);
    const onTouchMove = (event) => {
      if (event.touches[0]) handleMove(event.touches[0].clientY);
    };

    const node = fieldRef.current;
    node?.addEventListener("mousemove", onMouseMove);
    node?.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      node?.removeEventListener("mousemove", onMouseMove);
      node?.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBall((prev) => {
        let { x, y, vx, vy } = prev;
        x += vx;
        y += vy;

        if (y <= 3 || y >= 97) vy *= -1;

        setBotY((currentBotY) => {
          const nextBotY = Math.max(10, Math.min(90, currentBotY + (y - currentBotY) * 0.18));

          const visitorMin = visitorY - 12;
          const visitorMax = visitorY + 12;
          const botMin = nextBotY - 12;
          const botMax = nextBotY + 12;

          if (x >= 92 && y >= visitorMin && y <= visitorMax) {
            vx = -Math.abs(vx);
            vy += (y - visitorY) * 0.015;
            x = 92;
          }

          if (x <= 8 && y >= botMin && y <= botMax) {
            vx = Math.abs(vx);
            vy += (y - nextBotY) * 0.015;
            x = 8;
          }

          return nextBotY;
        });

        if (x > 100) {
          setScore((s) => ({ ...s, bot: s.bot + 1 }));
          return { x: 50, y: 50, vx: -0.65, vy: 0.34 };
        }

        if (x < 0) {
          setScore((s) => ({ ...s, visitor: s.visitor + 1 }));
          return { x: 50, y: 50, vx: 0.65, vy: -0.34 };
        }

        return { x, y, vx, vy };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [visitorY]);

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
          style={{ top: `${botY}%`, height: "56px" }}
        />
        <div
          className="absolute right-4 w-2 -translate-y-1/2 rounded-sm bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.75)]"
          style={{ top: `${visitorY}%`, height: "56px" }}
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
          <span>MOVE MOUSE / TOUCH</span>
          <span>VISITOR</span>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [repos, setRepos] = useState(fallbackRepos);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [visibleMessages, setVisibleMessages] = useState(1);

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
    setVisibleMessages(1);
    const interval = setInterval(() => {
      setVisibleMessages((current) => {
        if (current >= repoConversation.length) return 1;
        return current + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

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

  const activeConversationRepo = repoConversation[Math.max(visibleMessages - 1, 0)]?.from;

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
              <img src="/logo_fullclear.png" alt="radar core" className="h-16 w-16 opacity-75" />
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
                Code-related traffic presented like live message flow.
              </div>
            </div>

            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
              Message Stream Live
            </span>
          </div>

          <div className="h-[360px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
            <div className="flex h-full flex-col gap-3 overflow-hidden">
              {repoConversation.slice(0, visibleMessages).map((entry, index) => {
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
              { label: "Traffic Feed", state: visibleMessages > 0 ? "ok" : "warn" },
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

      <section className="grid gap-6 md:grid-cols-12">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl md:col-span-12">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
            <Github className="h-3.5 w-3.5" />
            GitHub Stats
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
              <img
                alt="GitHub stats"
                src="https://github-readme-stats.vercel.app/api?username=maxhayim&show_icons=true&theme=transparent&hide_border=true&title_color=ffffff&text_color=a1a1aa&icon_color=6ee7b7&ring_color=22c55e"
                className="w-full rounded-xl"
              />
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
              <img
                alt="Top languages"
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=maxhayim&layout=compact&theme=transparent&hide_border=true&title_color=ffffff&text_color=a1a1aa"
                className="w-full rounded-xl"
              />
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
            <div className="rounded-2xl border border-cyan-500/20 bg-zinc-950/70 p-4">
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

                <motion.div
                  initial={false}
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300"
                >
                  CONNECTING
                </motion.div>
              </div>

              <div className="mt-4 rounded-2xl border border-zinc-800 bg-black/40 p-4 font-mono text-xs text-zinc-300">
                <div className="text-cyan-300">ATDT PRODIGY-LOCAL-POP</div>
                <div className="mt-1">Initializing modem...</div>
                <div className="mt-1">Negotiating carrier... 2400 / 9600 / 14400</div>
                <div className="mt-1 text-emerald-300">CONNECT 2400</div>
                <div className="mt-1 text-zinc-500">
                  Prodigy used local POP dial-up access rather than one universal nationwide member number.
                </div>
              </div>
            </div>

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mailtoHref =
    `mailto:maxhayim@users.noreply.github.com` +
    `?subject=${encodeURIComponent(formData.subject || "Website Contact")}` +
    `&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;

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
                    Compose a message and launch your mail client.
                  </div>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                  relay ready
                </div>
              </div>

              <form className="space-y-4" action={mailtoHref} method="get">
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
                    ./send-message
                  </button>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Opens your email client using mailto
                  </span>
                </div>
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
                    [TX] MAIL FROM: &lt;{formData.email || "maxhayim@users.noreply.github.com"}&gt;
                  </div>
                  <div className="mt-1">[TX] RCPT TO: &lt;maxhayim@users.noreply.github.com&gt;</div>
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

export default function App() {
  const route = useHashRoute();
  if (route === "about") return <AboutPage />;
  if (route === "contact") return <ContactPage />;
  return <HomePage />;
}