import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
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
  StickyNote,
  Palette,
  Image as ImageIcon,
  PanelBottom,
  Lock,
  Bluetooth,
  Disc,
  Lightbulb,
  Keyboard,
  Printer,
  Volume2,
  VolumeX,
  Volume1,
  Network,
  Share2,
  RefreshCw,
  Mic,
  HardDrive,
  Accessibility,
  LayoutGrid,
  MonitorPlay,
  Mouse,
  ShieldCheck,
  BatteryCharging,
  ChevronRight,
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
  House,
  FileText,
  AppWindow,
  Minus,
  Power,
  X,
  Maximize2,
  Minimize2,
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
    if (hash === "#/gits") return "gits";
    if (hash === "#/internet") return "internet";
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

const SITE_URL = "https://maxhayim.com";
const SITE_DESCRIPTION =
  "Max Hayim's personal website, built as comcen os: a late-1990s-style operating system with live GitHub projects, telemetry, and interactive experiments.";
const PAGE_TITLES = {
  home: "comcen os — maxhayim.com",
  gits: "Gits — comcen os",
  about: "About — comcen os",
  internet: "Internet — comcen os",
  contact: "Contact — comcen os",
};

function usePageMeta(page = "home") {
  useEffect(() => {
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;

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
    metaDescription.setAttribute("content", SITE_DESCRIPTION);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SITE_URL);
  }, [page]);
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

/* ---------- comcen os: Braun-timeline desktop ---------- */

const OS_PAGES = [
  { page: "home", label: "home", href: "#/", Icon: House },
  { page: "gits", label: "gits", href: "#/gits", Icon: Github },
  { page: "internet", label: "internet", href: "#/internet", Icon: Globe },
  { page: "about", label: "about", href: "#/about", Icon: FileText },
  { page: "contact", label: "contact", href: "#/contact", Icon: Mail },
];

// Same machine the BIOS detects on boot.
const THIS_COMPUTER_NAME = "COMCEN Model 2000";
const THIS_COMPUTER_KIND = "professional graphics workstation, 1999";
const THIS_COMPUTER = [
  ["system", "COMCEN OS I"],
  ["processor", "2× MIPS R12000, 300 MHz"],
  ["memory", "1 GB ECC SDRAM"],
  ["graphics", "SGI InfiniteReality2 Graphics"],
  ["frame buffer", "64 MB"],
  ["storage", "Seagate Cheetah 18.2 GB Ultra2 SCSI (10,000 RPM)"],
  ["drives", "3.5\" 1.44 MB floppy, Toshiba DVD-ROM, Plextor PlexWriter CD-RW"],
  ["audio", "SGI Professional Digital Audio (16-bit, 48 kHz)"],
  ["network", "3Com Fast EtherLink XL (10/100 Ethernet)"],
  ["modem", "U.S. Robotics Courier V.Everything (56K V.90)"],
  ["display", "Sony GDM-F500 (21\" Trinitron CRT, 2048 × 1536 maximum)"],
  ["graphics API", "OpenGL (Pixar RenderMan compatible)"],
  ["interfaces", "Ultra2 SCSI, 10/100 Ethernet, USB, RS-232, parallel, S-VHS video I/O"],
  ["firmware", "COMCEN PROM by MaXHyM v6.5"],
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}


/* Menu bar status: date, battery, and network signal from the browser */
function useBattery() {
  const [battery, setBattery] = useState(null);
  useEffect(() => {
    if (!navigator.getBattery) return;
    let bat = null;
    let cancelled = false;
    const update = () => {
      if (!cancelled && bat) setBattery({ level: Math.round(bat.level * 100), charging: bat.charging });
    };
    navigator
      .getBattery()
      .then((b) => {
        bat = b;
        update();
        b.addEventListener("levelchange", update);
        b.addEventListener("chargingchange", update);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (bat) {
        bat.removeEventListener("levelchange", update);
        bat.removeEventListener("chargingchange", update);
      }
    };
  }, []);
  return battery; // null where the browser doesn't expose it (Safari, Firefox)
}

function barsFromLatency(ms) {
  if (ms < 90) return 4;
  if (ms < 220) return 3;
  if (ms < 600) return 2;
  return 1;
}

function useSignal() {
  const [signal, setSignal] = useState(() =>
    navigator.onLine ? { bars: 4, label: "checking…" } : { bars: 0, label: "offline" }
  );

  useEffect(() => {
    let cancelled = false;

    // Time a tiny request back to this site. No browser exposes Wi-Fi strength, so latency is the honest proxy.
    const measure = async () => {
      if (!navigator.onLine) {
        setSignal({ bars: 0, label: "offline" });
        return;
      }
      const start = performance.now();
      try {
        await fetch(`/logo_fullclear_favicon.ico?ping=${Date.now()}`, { method: "HEAD", cache: "no-store" });
        if (cancelled) return;
        const ms = Math.round(performance.now() - start);
        const c = navigator.connection;
        const type = c?.effectiveType ? `${c.effectiveType}, ` : "";
        const typeBars = c?.effectiveType ? { "slow-2g": 1, "2g": 2, "3g": 3, "4g": 4 }[c.effectiveType] : 4;
        setSignal({ bars: Math.min(barsFromLatency(ms), typeBars || 4), label: `${type}${ms} ms` });
      } catch {
        if (!cancelled) setSignal({ bars: 0, label: "no connection" });
      }
    };

    measure();
    const id = setInterval(measure, 30000);
    window.addEventListener("online", measure);
    window.addEventListener("offline", measure);
    navigator.connection?.addEventListener?.("change", measure);
    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener("online", measure);
      window.removeEventListener("offline", measure);
      navigator.connection?.removeEventListener?.("change", measure);
    };
  }, []);

  return signal;
}

function BatteryIndicator({ battery }) {
  if (!battery) return null;
  const fill = Math.max(2, Math.round((battery.level / 100) * 16));
  const low = battery.level <= 20 && !battery.charging;
  return (
    <span className="flex h-8 items-center gap-1.5 px-1 tabular-nums sm:px-2" title={`Battery ${battery.level}%${battery.charging ? ", charging" : ""}`}>
      <svg viewBox="0 0 24 12" className="h-3 w-6" aria-hidden="true">
        <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" fill="none" stroke="currentColor" opacity="0.55" />
        <rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.55" />
        <rect x="2.5" y="2.5" width={fill} height="7" rx="1.2" fill={low ? "var(--os-warn)" : battery.charging ? "var(--os-ok)" : "currentColor"} />
        {battery.charging && <path d="M11.5 1.5 L7.5 6.5 H10.5 L9.5 10.5 L13.5 5.5 H10.5 Z" fill="var(--os-case)" />}
      </svg>
      <span className="hidden sm:inline">{battery.level}%</span>
    </span>
  );
}

function SignalIndicator({ signal }) {
  // Wi-Fi fan: the dot plus three arcs light up with signal strength (0 to 4)
  const lit = (level) => (level <= signal.bars ? "currentColor" : "var(--os-line)");
  return (
    <span
      className="flex h-8 items-center px-1 sm:px-2"
      title={`Network: ${signal.label}`}
      aria-label={`Wi-Fi signal ${signal.bars} of 4, ${signal.label}`}
      role="img"
    >
      <svg viewBox="0 0 20 15" className="h-[13px] w-[17px]" fill="none" strokeLinecap="round" aria-hidden="true">
        <path d="M1.5 5.2a12 12 0 0 1 17 0" stroke={lit(4)} strokeWidth="2" />
        <path d="M4.6 8.3a7.6 7.6 0 0 1 10.8 0" stroke={lit(3)} strokeWidth="2" />
        <path d="M7.6 11.2a3.4 3.4 0 0 1 4.8 0" stroke={lit(2)} strokeWidth="2" />
        <circle cx="10" cy="13.4" r="1.3" fill={lit(1)} />
      </svg>
    </span>
  );
}

function formatMenuDate(d) {
  const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
  const month = d.toLocaleDateString("en-US", { month: "short" });
  return `${weekday} ${month} ${d.getDate()}`;
}

/* Full screen via the browser's Fullscreen API */
function useFullscreen() {
  const [active, setActive] = useState(() => Boolean(document.fullscreenElement));
  const supported = Boolean(document.fullscreenEnabled && document.documentElement.requestFullscreen);
  useEffect(() => {
    const onChange = () => setActive(Boolean(document.fullscreenElement));
    // Browsers already exit on Esc; this also covers any that pass the key through to the page.
    const onKey = (e) => {
      if (e.key === "Escape" && document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };
  return { supported, active, toggle };
}

function usePopover() {
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
  return { open, setOpen, ref };
}

function AnalogClock({ now }) {
  const s = now.getSeconds();
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;
  const hand = (deg, len, width, color) => (
    <line x1="12" y1="12" x2="12" y2={12 - len} stroke={color} strokeWidth={width} strokeLinecap="round" transform={`rotate(${deg} 12 12)`} />
  );
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="var(--os-card)" stroke="var(--os-line)" />
      {[0, 90, 180, 270].map((d) => (
        <line key={d} x1="12" y1="2.6" x2="12" y2="4.2" stroke="var(--os-ink-3)" strokeWidth="1" transform={`rotate(${d} 12 12)`} />
      ))}
      {hand(h * 30, 5, 1.8, "var(--os-ink)")}
      {hand(m * 6, 7.5, 1.3, "var(--os-ink)")}
      {hand(s * 6, 8.5, 0.8, "var(--os-accent)")}
      <circle cx="12" cy="12" r="1.1" fill="var(--os-accent)" />
    </svg>
  );
}

function SystemMenu() {
  const { open, setOpen, ref } = usePopover();
  const fullscreen = useFullscreen();
  const [showAbout, setShowAbout] = useState(false);
  const item = "block w-full rounded-lg px-3 py-1.5 text-left hover:bg-[var(--os-hover)]";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setShowAbout(false);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-2 hover:bg-[var(--os-hover)] sm:gap-2 sm:px-2.5 ${open ? "bg-[var(--os-hover)]" : ""}`}
      >
        <img src="/logo_fullclear.png" alt="" className="os-logo h-4 w-auto" />
        <span className="font-semibold tracking-tight">comcen os</span>
        <span className="text-[var(--os-ink-3)]">system</span>
      </button>

      {open && (
        <div role="menu" className="os-popover absolute left-0 top-10 z-50 max-h-[calc(100vh-64px)] w-[380px] max-w-[calc(100vw-16px)] overflow-y-auto p-1.5">
          {!showAbout ? (
            <>
              <button role="menuitem" type="button" className={item} onClick={() => setShowAbout(true)}>
                about this computer
              </button>
              <button
                role="menuitem"
                type="button"
                className={item}
                onClick={() => {
                  setOpen(false);
                  openPreferences("all");
                }}
              >
                system preferences…
              </button>
              {fullscreen.supported && (
                <button
                  role="menuitem"
                  type="button"
                  className={`${item} flex items-center justify-between`}
                  onClick={() => {
                    setOpen(false);
                    fullscreen.toggle();
                  }}
                >
                  {fullscreen.active ? "Exit Full Screen" : "Full Screen"}
                  <span className="text-[var(--os-ink-3)]">{fullscreen.active ? "esc" : ""}</span>
                </button>
              )}
              <div className="my-1 h-px bg-[var(--os-line)]" />
              <button
                role="menuitem"
                type="button"
                className={item}
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new Event("mh-reboot"));
                }}
              >
                restart…
              </button>
              <button
                role="menuitem"
                type="button"
                className={item}
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new Event("mh-power-off"));
                }}
              >
                shut down…
              </button>
            </>
          ) : (
            <div className="p-3">
              <div className="os-grille mb-3 h-10 w-full rounded-md" aria-hidden="true" />
              <div className="text-[15px] font-semibold tracking-tight">{THIS_COMPUTER_NAME}</div>
              <div className="text-[var(--os-ink-3)]">{THIS_COMPUTER_KIND}</div>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13px] leading-snug">
                {THIS_COMPUTER.map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt className="text-[var(--os-ink-3)]">{k}</dt>
                    <dd className="tabular-nums">{v}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



/* Dock: a hi-fi front panel you can pick up by its speaker grille; let go and it springs back home */
const SNAP_BACK = { bounceStiffness: 420, bounceDamping: 28 };

function Dock({ currentPage, windowState, onMinimize, onRestore }) {
  const minimized = windowState !== "open";
  const controls = useDragControls();
  const boundsRef = useRef(null);

  return (
    <>
      <div ref={boundsRef} className="pointer-events-none fixed inset-x-1 bottom-1 top-12" aria-hidden="true" />
      <nav aria-label="Dock" className="mh-fixed os-ui pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-2">
        <motion.div
          drag
          dragControls={controls}
          dragListener={false}
          dragElastic={0.08}
          dragConstraints={boundsRef}
          dragSnapToOrigin
          dragTransition={SNAP_BACK}
          className="os-dock pointer-events-auto flex items-end gap-2.5 px-2.5 py-2 sm:gap-5 sm:px-4"
        >
          <div
            className="os-grille os-dock-grip h-11 w-8 rounded-md sm:w-16"
            onPointerDown={(e) => {
              e.preventDefault();
              controls.start(e);
            }}
            title="Drag the dock; it springs back when you let go."
            aria-hidden="true"
          />
          {OS_PAGES.map(({ page, label, href, Icon }) => {
            const active = page === currentPage && !minimized;
            return (
              <a
                key={page}
                href={href}
                onClick={() => page === currentPage && onRestore()}
                aria-current={page === currentPage ? "page" : undefined}
                className="os-dock-item"
              >
                <span className="os-knob">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <span className="flex items-center gap-1">
                  <span className={`os-dot ${active ? "os-dot-on" : ""}`} aria-hidden="true" />
                  {label}
                </span>
              </a>
            );
          })}
          <span className="mb-5 h-8 w-px bg-[var(--os-line)]" aria-hidden="true" />
          <button
            type="button"
            onClick={minimized ? onRestore : onMinimize}
            className="os-dock-item"
            title={windowState === "closed" ? "Open window" : minimized ? "Show window" : "Hide window"}
          >
            <span className="os-knob">
              <AppWindow className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <span>{windowState === "closed" ? "open" : minimized ? "show" : "hide"}</span>
          </button>
        </motion.div>
      </nav>
    </>
  );
}


/* ---------- Wallpapers: right-click the desktop to change; the choice is kept in a cookie ---------- */

const WALLPAPERS = [
  { id: "calm", label: "calm", src: "/wallpaper/system6-calm.jpg", thumb: "/wallpaper/system6-calm-thumb.jpg", position: "70% center" },
  { id: "fish", label: "fish", src: "/wallpaper/system6-fish.jpg", thumb: "/wallpaper/system6-fish-thumb.jpg", position: "center" },
  { id: "wetleaf", label: "wet leaf", src: "/wallpaper/system6-wetleaf.jpg", thumb: "/wallpaper/system6-wetleaf-thumb.jpg", position: "center" },
  { id: "abstractgreen", label: "abstract green", src: "/wallpaper/system6-abstractgreen.jpg", thumb: "/wallpaper/system6-abstractgreen-thumb.jpg", position: "center" },
];
const WALLPAPER_COOKIE = "comcen_wallpaper";

function readWallpaperCookie() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${WALLPAPER_COOKIE}=([^;]*)`));
  const id = match ? decodeURIComponent(match[1]) : "calm";
  return WALLPAPERS.some((w) => w.id === id) ? id : "calm";
}

function applyWallpaper(id) {
  const wallpaper = WALLPAPERS.find((w) => w.id === id) || WALLPAPERS[0];
  const root = document.documentElement;
  root.style.setProperty("--os-wallpaper-image", `url("${wallpaper.src}")`);
  root.style.setProperty("--os-wallpaper-position", wallpaper.position);
  root.dataset.wallpaper = wallpaper.id;
}

function saveWallpaper(id) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${WALLPAPER_COOKIE}=${encodeURIComponent(id)}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  applyWallpaper(id);
  window.dispatchEvent(new CustomEvent("mh-wallpaper-changed", { detail: id }));
}

// Apply the saved wallpaper as early as possible so the desktop never flashes the default.
if (typeof document !== "undefined") applyWallpaper(readWallpaperCookie());

const openPreferences = (pane = "all") => window.dispatchEvent(new CustomEvent("mh-preferences-open", { detail: { pane } }));

// Right-click on the desktop: same look as the system menu
function DesktopMenu() {
  const [menu, setMenu] = useState(null); // { x, y } or null
  const ref = useRef(null);

  useEffect(() => {
    const onOpen = (e) => setMenu(e.detail);
    window.addEventListener("mh-desktop-menu", onOpen);
    return () => window.removeEventListener("mh-desktop-menu", onOpen);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenu(null);
    };
    const onKey = (e) => e.key === "Escape" && setMenu(null);
    const onScroll = () => setMenu(null);
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menu]);

  if (!menu) return null;
  const width = 230;
  const height = 250;
  const left = Math.max(8, Math.min(menu.x, window.innerWidth - width - 8));
  const top = Math.max(52, Math.min(menu.y, window.innerHeight - height - 8));
  const item = "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left";
  const off = `${item} cursor-default text-[var(--os-ink-3)] opacity-60`;
  const on = `${item} hover:bg-[var(--os-hover)]`;
  const divider = <div className="my-1 h-px bg-[var(--os-line)]" />;

  return (
    <div ref={ref} role="menu" aria-label="Desktop" className="os-ui os-popover fixed z-[60] p-1.5" style={{ left, top, width }}>
      <button role="menuitem" type="button" aria-disabled="true" className={off}>new folder</button>
      <button role="menuitem" type="button" aria-disabled="true" className={off}>paste item</button>
      {divider}
      <button role="menuitem" type="button" aria-disabled="true" className={off}>get info</button>
      <button
        role="menuitem"
        type="button"
        className={on}
        onClick={() => {
          setMenu(null);
          openPreferences("wallpaper");
        }}
      >
        change wallpaper…
      </button>
      {divider}
      <button role="menuitem" type="button" aria-disabled="true" className={off}>
        sort by <span aria-hidden="true">&rsaquo;</span>
      </button>
      <button role="menuitem" type="button" aria-disabled="true" className={off}>show view options</button>
    </div>
  );
}

/* System Preferences: the full grid of panes; only Desktop & Wallpaper works for now */
const PREF_SECTIONS = [
  {
    title: "Desk",
    panes: [
      { id: "theme", label: "Theme", Icon: Palette, ready: true },
      { id: "wallpaper", label: "Wallpaper", Icon: ImageIcon, ready: true },
      { id: "screensaver", label: "Screen Saver", Icon: MonitorPlay, ready: true },
      { id: "dock", label: "Dock", Icon: PanelBottom },
      { id: "windows", label: "Windows", Icon: AppWindow },
      { id: "language", label: "Language", Icon: Globe },
      { id: "privacy", label: "Privacy", Icon: ShieldCheck },
    ],
  },
  {
    title: "Devices",
    panes: [
      { id: "bluetooth", label: "Bluetooth", Icon: Bluetooth },
      { id: "discs", label: "Discs", Icon: Disc },
      { id: "displays", label: "Displays", Icon: Monitor },
      { id: "power", label: "Power", Icon: BatteryCharging },
      { id: "keyboard", label: "Keyboard", Icon: Keyboard },
      { id: "pointer", label: "Pointer", Icon: Mouse },
      { id: "printing", label: "Printing", Icon: Printer },
      { id: "sound", label: "Sound", Icon: Volume2, ready: true },
    ],
  },
  {
    title: "Connections",
    panes: [
      { id: "network", label: "Network", Icon: Network },
      { id: "modem", label: "Modem", Icon: Phone, ready: true },
      { id: "mesh", label: "Mesh Radio", Icon: Radio },
      { id: "sharing", label: "File Sharing", Icon: Share2 },
    ],
  },
  {
    title: "System",
    panes: [
      { id: "users", label: "Users", Icon: Users },
      { id: "clock", label: "Clock", Icon: Clock3 },
      { id: "updates", label: "Updates", Icon: RefreshCw },
      { id: "voice", label: "Voice", Icon: Mic },
      { id: "boot", label: "Boot Drive", Icon: HardDrive },
      { id: "access", label: "Accessibility", Icon: Accessibility },
    ],
  },
];


/* Modem pane: shows how the site dials in and reaches ProtoWeb. Managed by Prodigy, so it's read-only. */
const DIALUP_NUMBER = "305-503-0823";
const MODEM_SETTINGS = [
  {
    title: "Dial-up",
    rows: [
      ["Modem", "U.S. Robotics Courier V.Everything"],
      ["Phone number", DIALUP_NUMBER],
      ["Dialing", "Tone"],
      ["Connect speed", "14,400 bps"],
    ],
  },
  {
    title: "ProtoWeb proxy",
    rows: [
      ["HTTP proxy", "wayback.protoweb.org"],
      ["Port", "7851"],
      ["FTP proxy", "wayback.protoweb.org : 7851"],
      ["Modem-speed port", "7856"],
      ["Start page", "http://www.inode.com/"],
    ],
  },
];

function ModemPane() {
  return (
    <div className="p-5">
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
        modem
      </div>
      <p className="mb-4 flex items-center gap-1.5 text-[13px] text-[var(--os-ink-3)]">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Set by Prodigy. These settings can&rsquo;t be changed.
      </p>

      <div className="flex flex-col gap-5">
        {MODEM_SETTINGS.map((group) => (
          <fieldset key={group.title} disabled className="min-w-0">
            <legend className="mb-2 text-[13px] font-semibold">{group.title}</legend>
            <div className="grid gap-2 sm:grid-cols-[150px_1fr] sm:items-center">
              {group.rows.map(([label, value]) => {
                const id = `modem-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
                return (
                  <React.Fragment key={label}>
                    <label htmlFor={id} className="text-[13px] text-[var(--os-ink-2)]">
                      {label}
                    </label>
                    <input
                      id={id}
                      readOnly
                      value={value}
                      className="prefs-locked w-full rounded-lg px-2.5 py-1.5 text-[13px] tabular-nums"
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}

function SystemPreferences() {
  const [pane, setPane] = useState(null); // null = closed, "all", or a pane id
  const drag = useDragControls();
  const [current, setCurrent] = useState(readWallpaperCookie);
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);
  const open = pane !== null;

  useEffect(() => {
    const onOpen = (e) => {
      if (!document.querySelector("[aria-labelledby='prefs-title']")) returnFocusRef.current = document.activeElement;
      setCurrent(readWallpaperCookie());
      setPane(e.detail?.pane || "all");
    };
    const onChanged = (e) => setCurrent(e.detail);
    window.addEventListener("mh-preferences-open", onOpen);
    window.addEventListener("mh-wallpaper-changed", onChanged);
    return () => {
      window.removeEventListener("mh-preferences-open", onOpen);
      window.removeEventListener("mh-wallpaper-changed", onChanged);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setPane(null);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Keep keyboard focus inside the window while it's open
      const items = [...panel.querySelectorAll("button:not([aria-disabled='true'])")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus into the window whenever the pane changes; give it back when it closes
  useEffect(() => {
    if (pane === null) {
      returnFocusRef.current?.focus?.();
      return;
    }
    const panel = panelRef.current;
    const target = pane === "wallpaper" ? panel?.querySelector("[aria-checked='true']") : panel?.querySelector("[data-pane='wallpaper']");
    target?.focus();
  }, [pane]);

  if (!open) return null;
  const paneInfo = PREF_SECTIONS.flatMap((sct) => sct.panes).find((p) => p.id === pane);

  return (
    <div className="os-ui fixed inset-0 z-[70] flex items-center justify-center bg-black/20 p-3 sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && setPane(null)}>
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="prefs-title"
        drag
        dragControls={drag}
        dragListener={false}
        dragElastic={0.08}
        dragSnapToOrigin
        dragTransition={SNAP_BACK}
        className="os-window prefs-window flex max-h-[calc(100vh-24px)] w-full max-w-[760px] flex-col overflow-hidden"
      >
        {/* Title bar: drag to move; it springs back when you let go */}
        <div
          className="os-titlebar-grab relative flex items-center gap-3 border-b border-[var(--os-line)] px-4 py-2.5"
          onPointerDown={(e) => {
            if (e.pointerType === "touch" || e.target.closest("button")) return;
            drag.start(e);
          }}
        >
          <button type="button" onClick={() => setPane(null)} aria-label="Close system preferences" title="Close" className="os-round-btn os-win-close">
            <X className="h-3.5 w-3.5" strokeWidth={2.2} />
          </button>
          <h2 id="prefs-title" className="pointer-events-none absolute inset-x-0 text-center font-semibold tracking-tight">
            {pane === "all" ? "system preferences" : paneInfo?.label.toLowerCase()}
          </h2>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-[var(--os-line)] bg-[var(--os-desk)]/40 px-3 py-2">
          <button
            type="button"
            onClick={() => setPane("all")}
            aria-pressed={pane === "all"}
            className={`prefs-tool flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] ${pane === "all" ? "prefs-tool-active" : ""}`}
          >
            <LayoutGrid className="h-5 w-5" strokeWidth={1.6} />
            all settings
          </button>
          <span className="mx-1 h-9 w-px bg-[var(--os-line)]" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setPane("theme")}
            aria-pressed={pane === "theme"}
            className={`prefs-tool flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] ${pane === "theme" ? "prefs-tool-active" : ""}`}
          >
            <Palette className="h-5 w-5" strokeWidth={1.6} />
            theme
          </button>
          <button
            type="button"
            onClick={() => setPane("wallpaper")}
            aria-pressed={pane === "wallpaper"}
            className={`prefs-tool flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] ${pane === "wallpaper" ? "prefs-tool-active" : ""}`}
          >
            <ImageIcon className="h-5 w-5" strokeWidth={1.6} />
            wallpaper
          </button>
          <button
            type="button"
            onClick={() => setPane("screensaver")}
            aria-pressed={pane === "screensaver"}
            className={`prefs-tool flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] ${pane === "screensaver" ? "prefs-tool-active" : ""}`}
          >
            <MonitorPlay className="h-5 w-5" strokeWidth={1.6} />
            screen saver
          </button>
          <button
            type="button"
            onClick={() => setPane("sound")}
            aria-pressed={pane === "sound"}
            className={`prefs-tool flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] ${pane === "sound" ? "prefs-tool-active" : ""}`}
          >
            <Volume2 className="h-5 w-5" strokeWidth={1.6} />
            sound
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {pane === "all" && (
            <div>
              {PREF_SECTIONS.map((section, si) => (
                <section key={section.title} className={`px-4 pb-4 pt-3 ${si % 2 ? "bg-[var(--os-desk)]/35" : ""}`}>
                  <h3 className="mb-2 text-[13px] font-semibold">{section.title}</h3>
                  <div className="grid grid-cols-3 gap-y-3 sm:grid-cols-5 md:grid-cols-8">
                    {section.panes.map(({ id, label, Icon, ready }) => (
                      <button
                        key={id}
                        type="button"
                        data-pane={id}
                        aria-disabled={ready ? undefined : "true"}
                        title={ready ? label : `${label} is coming soon`}
                        onClick={() => ready && setPane(id)}
                        className={`prefs-pane flex flex-col items-center gap-1.5 rounded-xl px-1 py-2 text-center text-[12px] leading-tight ${ready ? "prefs-pane-ready" : "prefs-pane-off"}`}
                      >
                        <span className="prefs-icon">
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </span>
                        {label}
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {pane === "screensaver" && <ScreenSaverPane />}
          {pane === "theme" && <ThemePane />}
          {pane === "sound" && <SoundPane />}
          {pane === "modem" && <ModemPane />}

          {pane === "wallpaper" && (
            <div className="p-5">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
                wallpaper
              </div>
              <p className="mb-4 text-[13px] text-[var(--os-ink-3)]">Choose the picture on your desktop.</p>
              <div role="radiogroup" aria-label="Wallpaper" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {WALLPAPERS.map((w) => {
                  const active = w.id === current;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => saveWallpaper(w.id)}
                      className="prefs-option flex flex-col items-center gap-2 rounded-xl p-1.5 text-[13px]"
                    >
                      <img
                        src={w.thumb}
                        alt=""
                        className={`aspect-video w-full rounded-lg object-cover ${active ? "wallpaper-thumb-active" : "wallpaper-thumb"}`}
                      />
                      <span className="flex items-center gap-1.5">
                        <span className={`os-dot ${active ? "os-dot-on" : ""}`} aria-hidden="true" />
                        {w.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <p className="prefs-footer border-t border-[var(--os-line)] px-5 py-2.5 text-[12px] text-[var(--os-ink-3)]">
          {pane === "all"
            ? "Your preferences are remembered on this browser."
            : pane === "modem"
              ? "These settings are managed by Prodigy."
              : "Your preference is remembered on this browser."}
        </p>
      </motion.div>
    </div>
  );
}




/* ---------- Sound: one switch and one volume for every sound on the site ---------- */

const SOUND_COOKIE = "comcen_sound";
const SOUND_DEFAULT = { on: true, volume: 80 };

function readSound() {
  if (typeof document === "undefined") return SOUND_DEFAULT;
  const match = document.cookie.match(new RegExp(`(?:^|; )${SOUND_COOKIE}=([^;]*)`));
  if (!match) return SOUND_DEFAULT;
  const [on, volume] = decodeURIComponent(match[1]).split(":");
  const v = Number(volume);
  return { on: on !== "off", volume: Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : SOUND_DEFAULT.volume };
}

let soundState = readSound();
const liveMedia = new Set(); // <audio> / new Audio() currently playing
const liveGains = new Set(); // Web Audio master gains (the boot synth)

function applyMedia(el) {
  const base = el._mhBase ?? 1;
  el.volume = Math.max(0, Math.min(1, base * (soundState.volume / 100)));
  el.muted = !soundState.on;
}

function applyAllSound() {
  liveMedia.forEach(applyMedia);
  liveGains.forEach(({ gain, base, ctx }) => {
    gain.gain.setTargetAtTime(soundState.on ? base * (soundState.volume / 100) : 0, ctx.currentTime, 0.05);
  });
}

function saveSound(next) {
  soundState = next;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${SOUND_COOKIE}=${encodeURIComponent(`${next.on ? "on" : "off"}:${next.volume}`)}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  applyAllSound();
  window.dispatchEvent(new CustomEvent("mh-sound-changed", { detail: next }));
}

// Every sound on the site goes through here, so the switch and volume always apply.
function playSound(el, base = 1) {
  if (!el) return Promise.resolve();
  el._mhBase = base;
  applyMedia(el);
  if (!soundState.on) return Promise.resolve();
  liveMedia.add(el);
  el.addEventListener("ended", () => liveMedia.delete(el), { once: true });
  el.currentTime = 0;
  return el.play();
}

function useSound() {
  const [state, setState] = useState(soundState);
  useEffect(() => {
    const onChanged = (e) => setState(e.detail);
    window.addEventListener("mh-sound-changed", onChanged);
    return () => window.removeEventListener("mh-sound-changed", onChanged);
  }, []);
  return state;
}


// "Best with sound" note for anything that plays audio; offers to unmute if sound is off.
function SoundHint({ className = "" }) {
  const sound = useSound();
  return (
    <p className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-zinc-500 ${className}`}>
      {sound.on ? <Volume2 className="h-3.5 w-3.5" aria-hidden="true" /> : <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />}
      {sound.on ? (
        <span>Turn your sound on for the best experience.</span>
      ) : (
        <>
          <span>Sound is off. Turn it on for the best experience.</span>
          <button
            type="button"
            onClick={() => saveSound({ ...sound, on: true })}
            className="rounded-full border border-zinc-800 px-2.5 py-0.5 text-zinc-300 hover:bg-[var(--os-hover)] hover:text-zinc-100"
          >
            Turn on
          </button>
        </>
      )}
    </p>
  );
}

// Menu bar speaker: click to mute or unmute, right-click for Sound settings
function SoundToggle() {
  const sound = useSound();
  const Icon = !sound.on || sound.volume === 0 ? VolumeX : sound.volume < 45 ? Volume1 : Volume2;
  return (
    <button
      type="button"
      onClick={() => saveSound({ ...sound, on: !sound.on })}
      onContextMenu={(e) => {
        e.preventDefault();
        openPreferences("sound");
      }}
      aria-pressed={!sound.on}
      aria-label={sound.on ? "Mute sound" : "Unmute sound"}
      title={`${sound.on ? "Sound on" : "Muted"}: click to ${sound.on ? "mute" : "unmute"}, right-click for sound settings`}
      className={`flex h-8 items-center rounded-full px-1.5 hover:bg-[var(--os-hover)] sm:px-2 ${sound.on ? "" : "text-[var(--os-ink-3)]"}`}
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}

function SoundPane() {
  const sound = useSound();
  const update = (next) => saveSound({ ...sound, ...next });

  return (
    <div className="p-5">
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
        sound
      </div>
      <p className="mb-5 text-[13px] text-[var(--os-ink-3)]">
        Covers every sound on the site: the startup chime, drive sounds, the dial-up modem, and mail.
      </p>

      <div className="flex max-w-[460px] flex-col gap-5 text-[13px]">
        <label className="flex items-center justify-between gap-3">
          <span>play sounds</span>
          <button
            type="button"
            role="switch"
            aria-checked={sound.on}
            onClick={() => update({ on: !sound.on })}
            className={`os-switch ${sound.on ? "os-switch-on" : ""} shrink-0 cursor-pointer`}
          >
            <span className="sr-only">play sounds</span>
          </button>
        </label>

        <div className={`flex flex-col gap-2 ${sound.on ? "" : "opacity-50"}`}>
          <div className="flex items-center justify-between">
            <label htmlFor="sound-volume">volume</label>
            <span className="tabular-nums text-[var(--os-ink-3)]">{sound.volume}%</span>
          </div>
          <div className="flex items-center gap-3">
            <Volume1 className="h-4 w-4 shrink-0 text-[var(--os-ink-3)]" aria-hidden="true" />
            <input
              id="sound-volume"
              type="range"
              min="0"
              max="100"
              step="5"
              value={sound.volume}
              disabled={!sound.on}
              onChange={(e) => update({ volume: Number(e.target.value) })}
              className="os-range w-full"
            />
            <Volume2 className="h-4 w-4 shrink-0 text-[var(--os-ink-3)]" aria-hidden="true" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={!sound.on}
            onClick={() => playSound(new Audio("/audio/comcen-boot.mp3"), 0.8).catch(() => {})}
            className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]"
          >
            test
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Theme: light, dark, or follow the computer ---------- */

const THEME_COOKIE = "comcen_theme";

function readTheme() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : "auto";
  return ["auto", "light", "dark"].includes(value) ? value : "auto";
}

function applyTheme(pref) {
  const root = document.documentElement;
  if (pref === "light" || pref === "dark") root.dataset.theme = pref;
  else delete root.dataset.theme;
}

function saveTheme(pref) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${THEME_COOKIE}=${encodeURIComponent(pref)}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  applyTheme(pref);
  window.dispatchEvent(new CustomEvent("mh-theme-changed", { detail: pref }));
}

// Apply before the first paint so the chosen edition never flashes the other one
if (typeof document !== "undefined") applyTheme(readTheme());

function useSystemDark() {
  const query = "(prefers-color-scheme: dark)";
  const [dark, setDark] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return;
    const onChange = (e) => setDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return dark;
}

function ThemePane() {
  const [pref, setPref] = useState(readTheme);
  const systemDark = useSystemDark();
  const auto = pref === "auto";
  const showing = auto ? (systemDark ? "dark" : "light") : pref;

  const choose = (next) => {
    setPref(next);
    saveTheme(next);
  };

  const editions = [
    { id: "light", label: "light", desk: "#e7e3da", win: "#f3f1ec", ink: "#262624", line: "#dcd7cc" },
    { id: "dark", label: "dark", desk: "#151514", win: "#201f1d", ink: "#eeebe4", line: "#383733" },
  ];

  return (
    <div className="p-5">
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
        theme
      </div>
      <p className="mb-4 text-[13px] text-[var(--os-ink-3)]">Pick the white or graphite edition, or let comcen os follow your computer.</p>

      <label className="mb-4 flex cursor-pointer items-center gap-2.5 text-[13px]">
        <input
          type="checkbox"
          className="os-check"
          checked={auto}
          onChange={(e) => choose(e.target.checked ? "auto" : showing)}
        />
        <span>match computer settings</span>
        {auto && <span className="text-[var(--os-ink-3)]">(your computer is set to {systemDark ? "dark" : "light"})</span>}
      </label>

      <div role="radiogroup" aria-label="Theme" className="grid grid-cols-2 gap-3 sm:max-w-[420px]">
        {editions.map((ed) => {
          const active = showing === ed.id;
          return (
            <button
              key={ed.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(ed.id)}
              title={auto ? `Turn off matching and use ${ed.label}` : `Use ${ed.label}`}
              className="prefs-option flex flex-col items-center gap-2 rounded-xl p-1.5 text-[13px]"
            >
              <span
                className={`relative block aspect-video w-full overflow-hidden rounded-lg ${active ? "wallpaper-thumb-active" : "wallpaper-thumb"}`}
                style={{ background: ed.desk }}
                aria-hidden="true"
              >
                <span className="absolute inset-x-0 top-0 h-[10%]" style={{ background: ed.win, borderBottom: `1px solid ${ed.line}` }} />
                <span
                  className="absolute left-[14%] top-[22%] h-[62%] w-[72%] rounded-md"
                  style={{ background: ed.win, boxShadow: `0 0 0 1px ${ed.line}` }}
                >
                  <span className="absolute left-[8%] top-[14%] h-[8%] w-[40%] rounded-full" style={{ background: ed.ink, opacity: 0.8 }} />
                  <span className="absolute left-[8%] top-[34%] h-[6%] w-[70%] rounded-full" style={{ background: ed.ink, opacity: 0.25 }} />
                  <span className="absolute left-[8%] top-[48%] h-[6%] w-[58%] rounded-full" style={{ background: ed.ink, opacity: 0.25 }} />
                  <span className="absolute bottom-[12%] right-[8%] h-[16%] w-[10%] rounded-full" style={{ background: "#e8591a" }} />
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`os-dot ${active ? "os-dot-on" : ""}`} aria-hidden="true" />
                {ed.label}
                {auto && active && <span className="text-[var(--os-ink-3)]">· auto</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Screen savers: "Mesh" and "Starfield" ---------- */

const SCREENSAVER_COOKIE = "comcen_screensaver";
const SCREENSAVER_DELAYS = [
  { minutes: 1, label: "1 minute" },
  { minutes: 2, label: "2 minutes" },
  { minutes: 5, label: "5 minutes" },
  { minutes: 10, label: "10 minutes" },
  { minutes: 15, label: "15 minutes" },
];
const SCREENSAVERS = [
  { id: "mesh", label: "Mesh" },
  { id: "starfield", label: "Starfield" },
];
const SCREENSAVER_DEFAULT = { on: true, minutes: 5, saver: "mesh" };

function readScreensaver() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${SCREENSAVER_COOKIE}=([^;]*)`));
  if (!match) return SCREENSAVER_DEFAULT;
  const [on, minutes, saver] = decodeURIComponent(match[1]).split(":");
  const m = Number(minutes);
  return {
    on: on === "on",
    minutes: SCREENSAVER_DELAYS.some((d) => d.minutes === m) ? m : SCREENSAVER_DEFAULT.minutes,
    saver: SCREENSAVERS.some((x) => x.id === saver) ? saver : SCREENSAVER_DEFAULT.saver,
  };
}

function saveScreensaver(settings) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const value = `${settings.on ? "on" : "off"}:${settings.minutes}:${settings.saver}`;
  document.cookie = `${SCREENSAVER_COOKIE}=${encodeURIComponent(value)}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("mh-screensaver-changed", { detail: settings }));
}

// Drifting radio nodes that link up when close; orange packets hop node to node.
function MeshCanvas({ compact = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const slow = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let nodes = [];
    let packets = [];
    let frame = 0;
    let last = 0;
    let lastSpawn = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(14, Math.min(90, Math.round((width * height) / (compact ? 2600 : 16000))));
      const speed = (compact ? 9 : 16) * (slow ? 0.35 : 1);
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const v = speed * (0.4 + Math.random() * 0.6);
        return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(angle) * v, vy: Math.sin(angle) * v, r: compact ? 1.4 : 2 + Math.random() * 1.2 };
      });
      packets = [];
    };

    const linkDistance = () => (compact ? 46 : 150);

    const neighbors = (i) => {
      const reach = linkDistance();
      const out = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        if (dx * dx + dy * dy < reach * reach) out.push(j);
      }
      return out;
    };

    const draw = (time) => {
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0;
      last = time;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      ctx.fillStyle = "#0b0b0a";
      ctx.fillRect(0, 0, width, height);

      const reach = linkDistance();
      ctx.lineWidth = compact ? 0.6 : 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d2 = dx * dx + dy * dy;
          if (d2 > reach * reach) continue;
          const alpha = (1 - Math.sqrt(d2) / reach) * 0.35;
          ctx.strokeStyle = `rgba(238, 235, 228, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(238, 235, 228, 0.75)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Send a new packet every so often from a random node
      if (time - lastSpawn > (slow ? 2400 : 900) && packets.length < 6) {
        lastSpawn = time;
        const from = Math.floor(Math.random() * nodes.length);
        const next = neighbors(from);
        if (next.length) packets.push({ from, to: next[Math.floor(Math.random() * next.length)], t: 0, hops: 0 });
      }

      packets = packets.filter((p) => {
        p.t += dt * (slow ? 0.6 : 1.6);
        if (p.t >= 1) {
          p.hops += 1;
          const next = neighbors(p.to).filter((j) => j !== p.from);
          if (!next.length || p.hops > 7) {
            // arrival flash
            const n = nodes[p.to];
            ctx.strokeStyle = "rgba(240, 106, 42, 0.6)";
            ctx.beginPath();
            ctx.arc(n.x, n.y, compact ? 5 : 12, 0, Math.PI * 2);
            ctx.stroke();
            return false;
          }
          p.from = p.to;
          p.to = next[Math.floor(Math.random() * next.length)];
          p.t = 0;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.strokeStyle = "rgba(240, 106, 42, 0.55)";
        ctx.lineWidth = compact ? 1 : 1.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "#f06a2a";
        ctx.beginPath();
        ctx.arc(x, y, compact ? 2 : 3.4, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      frame = requestAnimationFrame(draw);
    };

    setup();
    frame = requestAnimationFrame(draw);
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [compact]);

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />;
}


// A 90s flight through space, in the comcen palette: warm white stars, the odd orange one.
function StarfieldCanvas({ compact = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const slow = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let stars = [];
    let frame = 0;
    let last = 0;

    const spawn = (star, far = true) => {
      star.x = (Math.random() * 2 - 1) * 1.2;
      star.y = (Math.random() * 2 - 1) * 1.2;
      star.z = far ? 1 : 0.2 + Math.random() * 0.8;
      star.px = null;
      star.py = null;
      star.orange = Math.random() < 0.07;
      return star;
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = compact ? 110 : Math.max(220, Math.min(520, Math.round((width * height) / 4200)));
      stars = Array.from({ length: count }, () => spawn({}, false));
      ctx.fillStyle = "#0b0b0a";
      ctx.fillRect(0, 0, width, height);
    };

    const draw = (time) => {
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0;
      last = time;
      const speed = (slow ? 0.12 : 0.34) * dt;
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.max(width, height) * 0.5;

      // Leave faint trails, like a CRT's afterglow
      ctx.fillStyle = "rgba(11, 11, 10, 0.42)";
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= speed;
        if (star.z <= 0.02) {
          spawn(star);
          continue;
        }
        const sx = cx + (star.x / star.z) * scale;
        const sy = cy + (star.y / star.z) * scale;
        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10) {
          spawn(star);
          continue;
        }
        const nearness = 1 - star.z;
        const size = (compact ? 0.4 : 0.6) + nearness * (compact ? 1.6 : 2.8);
        const color = star.orange ? `rgba(240, 106, 42, ${0.4 + nearness * 0.6})` : `rgba(238, 235, 228, ${0.25 + nearness * 0.75})`;
        if (star.px !== null) {
          ctx.strokeStyle = color;
          ctx.lineWidth = size;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(star.px, star.py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(sx, sy, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        star.px = sx;
        star.py = sy;
      }

      frame = requestAnimationFrame(draw);
    };

    setup();
    frame = requestAnimationFrame(draw);
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [compact]);

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />;
}

function SaverCanvas({ saver, compact = false }) {
  return saver === "starfield" ? <StarfieldCanvas compact={compact} /> : <MeshCanvas compact={compact} />;
}

// Starts the screen saver after the chosen idle time; any input ends it.
function ScreenSaverHost({ disabled }) {
  const [settings, setSettings] = useState(readScreensaver);
  const [active, setActive] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const startedAtRef = useRef(0);
  const pointerRef = useRef(null);

  useEffect(() => {
    const onChanged = (e) => setSettings(e.detail);
    const onStart = () => {
      startedAtRef.current = performance.now();
      pointerRef.current = null;
      setActive(true);
    };
    window.addEventListener("mh-screensaver-changed", onChanged);
    window.addEventListener("mh-screensaver-start", onStart);
    return () => {
      window.removeEventListener("mh-screensaver-changed", onChanged);
      window.removeEventListener("mh-screensaver-start", onStart);
    };
  }, []);

  // Idle timer
  useEffect(() => {
    if (disabled || active || !settings.on) return;
    let timer = null;
    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (document.hidden) return arm();
        startedAtRef.current = performance.now();
        pointerRef.current = null;
        setActive(true);
      }, settings.minutes * 60 * 1000);
    };
    const events = ["mousemove", "mousedown", "keydown", "wheel", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    arm();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, arm));
    };
  }, [disabled, active, settings]);

  // Wake up on any real input (ignore the tiny jitter right after it starts)
  useEffect(() => {
    if (!active) return;
    const wake = () => setActive(false);
    const onMove = (e) => {
      if (performance.now() - startedAtRef.current < 400) return;
      if (!pointerRef.current) {
        pointerRef.current = { x: e.clientX, y: e.clientY };
        return;
      }
      if (Math.abs(e.clientX - pointerRef.current.x) + Math.abs(e.clientY - pointerRef.current.y) > 8) wake();
    };
    const onKey = (e) => {
      e.preventDefault();
      wake();
    };
    const tick = setInterval(() => setNow(new Date()), 1000);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", wake);
    window.addEventListener("touchstart", wake, { passive: true });
    window.addEventListener("wheel", wake, { passive: true });
    return () => {
      clearInterval(tick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", wake);
      window.removeEventListener("touchstart", wake);
      window.removeEventListener("wheel", wake);
    };
  }, [active]);

  if (!active) return null;
  return (
    <div className="screensaver fixed inset-0 z-[90] cursor-none bg-[#0b0b0a]" role="presentation" aria-hidden="true">
      <SaverCanvas saver={settings.saver} />
      <div className="os-ui pointer-events-none absolute bottom-8 left-8" style={{ color: "#eeebe4" }}>
        <div className="text-5xl font-semibold tabular-nums tracking-tight opacity-80">
          {now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </div>
        <div className="mt-1 text-sm opacity-50">comcen os</div>
      </div>
    </div>
  );
}

function ScreenSaverPane() {
  const [settings, setSettings] = useState(readScreensaver);
  const update = (next) => {
    const merged = { ...settings, ...next };
    setSettings(merged);
    saveScreensaver(merged);
  };

  return (
    <div className="p-5">
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
        screen saver
      </div>
      <p className="mb-4 text-[13px] text-[var(--os-ink-3)]">Shown when the desk has been idle. Move the mouse or press a key to return.</p>

      <div className="grid gap-5 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-[var(--os-line)]">
            <SaverCanvas key={settings.saver} saver={settings.saver} compact />
          </div>
          <div role="radiogroup" aria-label="Screen saver" className="mt-3 grid grid-cols-2 gap-2">
            {SCREENSAVERS.map((sv) => {
              const active = settings.saver === sv.id;
              return (
                <button
                  key={sv.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => update({ saver: sv.id })}
                  className={`prefs-option flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] ring-1 ${
                    active ? "bg-[var(--os-hover)] ring-[var(--os-accent)]" : "ring-[var(--os-line)]"
                  }`}
                >
                  <span className={`os-dot ${active ? "os-dot-on" : ""}`} aria-hidden="true" />
                  {sv.label}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-end text-[13px]">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("mh-screensaver-start"))}
              title="Preview the screen saver full screen"
              className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]"
            >
              test
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-[13px]">
          <label className="flex items-center justify-between gap-3">
            <span>use screen saver</span>
            <button
              type="button"
              role="switch"
              aria-checked={settings.on}
              onClick={() => update({ on: !settings.on })}
              className={`os-switch ${settings.on ? "os-switch-on" : ""} shrink-0 cursor-pointer`}
            >
              <span className="sr-only">use screen saver</span>
            </button>
          </label>

          <label className={`flex flex-col gap-1.5 ${settings.on ? "" : "opacity-50"}`}>
            <span>start after</span>
            <select
              value={settings.minutes}
              disabled={!settings.on}
              onChange={(e) => update({ minutes: Number(e.target.value) })}
              className="rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]"
            >
              {SCREENSAVER_DELAYS.map((d) => (
                <option key={d.minutes} value={d.minutes}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>

        </div>
      </div>
    </div>
  );
}

function SharedShell({ currentPage, children }) {
  const currentYear = new Date().getFullYear();
  const now = useClock();
  const battery = useBattery();
  const signal = useSignal();
  // "open", "minimized" (tucked into the dock), or "closed"
  const [windowState, setWindowState] = useState("open");
  const [maximized, setMaximized] = useState(false);
  const reduceMotion = prefersReducedMotion();
  const windowDrag = useDragControls();
  usePageMeta(currentPage);

  const page = OS_PAGES.find((p) => p.page === currentPage) || OS_PAGES[0];
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const isOpen = windowState === "open";

  const minimize = () => {
    setWindowState("minimized");
    window.scrollTo(0, 0);
  };
  const close = () => {
    setWindowState("closed");
    setMaximized(false);
    window.scrollTo(0, 0);
  };
  const restore = () => setWindowState("open");
  const toggleMaximize = () => {
    setMaximized((m) => !m);
    window.scrollTo(0, 0);
  };

  const hiddenPose =
    windowState === "minimized"
      ? { opacity: 0, scale: 0.92, y: 60, transitionEnd: { display: "none" } }
      : { opacity: 0, scale: 0.97, y: 0, transitionEnd: { display: "none" } };

  return (
    <>
      {/* Menu bar */}
      <header className="mh-fixed os-ui os-menubar fixed inset-x-0 top-0 z-40 flex h-11 items-center justify-between pl-2 pr-1.5 sm:pl-3 sm:pr-2">
        <SystemMenu />
        <div className="flex items-center gap-0.5">
          <SoundToggle />
          <BatteryIndicator battery={battery} />
          <SignalIndicator signal={signal} />
          <div className="flex h-8 items-center gap-2 px-1 tabular-nums sm:px-2">
            <span className="whitespace-nowrap">{formatMenuDate(now)}</span>
            <span className="hidden sm:inline-flex">
              <AnalogClock now={now} />
            </span>
            <span className="hidden whitespace-nowrap md:inline">{time}</span>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("mh-power-off"))}
            title="Shut down"
            aria-label="Shut down"
            className="os-menubar-power"
          >
            <Power className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
        </div>
      </header>

      <div
        onContextMenu={(e) => {
          if (e.target.closest(".os-window, .os-dock, header, [role='menu']")) return;
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("mh-desktop-menu", { detail: { x: e.clientX, y: e.clientY } }));
        }}
        className={`mh-screen os-desk os-ui relative min-h-screen overflow-hidden pb-28 ${
          maximized ? "pt-11" : "px-3 pt-16 sm:px-5 md:px-8"
        }`}
      >
        <motion.div
          className={`os-window relative z-10 mx-auto origin-bottom ${maximized ? "os-window-max max-w-none" : "max-w-7xl"}`}
          initial={false}
          drag={!maximized}
          dragControls={windowDrag}
          dragListener={false}
          dragElastic={0.08}
          dragSnapToOrigin
          dragTransition={SNAP_BACK}
          animate={isOpen ? { display: "block", opacity: 1, scale: 1, y: 0 } : hiddenPose}
          transition={{ duration: reduceMotion ? 0 : windowState === "closed" ? 0.14 : 0.22, ease: [0.3, 0, 0.2, 1] }}
          aria-hidden={!isOpen}
        >
          {/* Window header: controls on the left, double-click to maximize */}
          <div
            className={`flex flex-wrap items-center gap-3 border-b border-[var(--os-line)] px-4 py-3 sm:px-5 ${maximized ? "" : "os-titlebar-grab"}`}
            onPointerDown={(e) => {
              if (maximized || e.pointerType === "touch" || e.target.closest("a, button")) return;
              e.preventDefault(); // no text selection while dragging
              windowDrag.start(e);
            }}
            onDoubleClick={(e) => {
              if (e.target.closest("a, button")) return;
              toggleMaximize();
            }}
          >
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={close} title="Close" aria-label="Close window" className="os-round-btn os-win-close">
                <X className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
              <button type="button" onClick={minimize} title="Minimize" aria-label="Minimize window" className="os-round-btn os-win-min">
                <Minus className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={toggleMaximize}
                title={maximized ? "Restore size" : "Maximize"}
                aria-label={maximized ? "Restore window size" : "Maximize window"}
                aria-pressed={maximized}
                className="os-round-btn os-win-max"
              >
                {maximized ? <Minimize2 className="h-3.5 w-3.5" strokeWidth={2.2} /> : <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.2} />}
              </button>
            </div>

            <div className="flex min-w-0 items-center gap-2 select-none">
              <span className="os-led" aria-hidden="true" />
              <span className="truncate font-semibold tracking-tight">command center</span>
              <span className="text-[var(--os-ink-3)]">/ {page.label}</span>
            </div>

          </div>

          {/* Finder-style tabs: one per page; the active tab joins the page below */}
          <nav aria-label="Pages" className="os-tabs flex">
            {OS_PAGES.map(({ page: id, label, href, Icon }) => {
              const active = id === currentPage;
              return (
                <a key={id} href={href} aria-current={active ? "page" : undefined} className={`os-tab ${active ? "os-tab-active" : ""}`}>
                  <Icon className="hidden h-3.5 w-3.5 shrink-0 sm:block" strokeWidth={1.8} aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </a>
              );
            })}
          </nav>

          <div className="os relative p-3 sm:p-5 md:p-6">
            <main className="relative z-10 flex flex-col gap-5">{children}</main>
            <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--os-line)] pt-4 text-[13px] text-[var(--os-ink-3)]">
              <div className="flex items-center gap-2">
                <img src="/logo_fullclear.png" alt="maxhayim logo" className="os-logo h-4 w-auto" />
                <span>&copy; 2009 - {currentYear} MAXYIM.COM. All Rights Reserved.</span>
              </div>
              <span>comcen os I on the COMCEN Model 2000</span>
            </footer>
          </div>
        </motion.div>
      </div>

      <Dock currentPage={currentPage} windowState={windowState} onMinimize={minimize} onRestore={restore} />
      <DesktopMenu />
      <SystemPreferences />
    </>
  );
}

/* Pong: waits for the visitor to start; the bot is quick but beatable. */
const PONG_TO_WIN = 5;
const PADDLE_HALF = 11; // % of field height the paddle covers above/below its center

function PongGame() {
  const fieldRef = useRef(null);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const visitorYRef = useRef(50);
  const botYRef = useRef(50);
  const ballRef = useRef({ x: 50, y: 50, vx: 0, vy: 0 });
  const botAimRef = useRef(0);
  const serveAtRef = useRef(0);
  const scoreRef = useRef({ bot: 0, visitor: 0 });

  const [status, setStatus] = useState("idle"); // idle, playing, over
  const [visitorY, setVisitorY] = useState(50);
  const [botY, setBotY] = useState(50);
  const [ball, setBall] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState({ bot: 0, visitor: 0 });
  const [winner, setWinner] = useState(null);

  const setVisitorPosition = (clientY) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clamped = Math.max(PADDLE_HALF, Math.min(100 - PADDLE_HALF, ((clientY - rect.top) / rect.height) * 100));
    visitorYRef.current = clamped;
    setVisitorY(clamped);
  };

  const serve = (toward) => {
    const angle = (Math.random() * 0.8 - 0.4) * 30;
    ballRef.current = { x: 50, y: 50, vx: toward === "visitor" ? 38 : -38, vy: angle };
    botAimRef.current = Math.random() * 14 - 7;
    serveAtRef.current = performance.now() + 700;
  };

  const start = () => {
    scoreRef.current = { bot: 0, visitor: 0 };
    setScore({ bot: 0, visitor: 0 });
    setWinner(null);
    botYRef.current = 50;
    setBotY(50);
    serve("visitor");
    setBall({ x: 50, y: 50 });
    lastTimeRef.current = 0;
    setStatus("playing");
  };

  // Mouse, touch, and arrow keys move the visitor paddle while a game is on.
  useEffect(() => {
    if (status !== "playing") return;
    const node = fieldRef.current;
    if (!node) return;
    const onMouseMove = (e) => setVisitorPosition(e.clientY);
    const onTouchMove = (e) => {
      if (e.touches?.[0]) {
        e.preventDefault();
        setVisitorPosition(e.touches[0].clientY);
      }
    };
    const onKeyDown = (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const step = e.key === "ArrowUp" ? -6 : 6;
      visitorYRef.current = Math.max(PADDLE_HALF, Math.min(100 - PADDLE_HALF, visitorYRef.current + step));
      setVisitorY(visitorYRef.current);
    };
    node.addEventListener("mousemove", onMouseMove);
    node.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("mousemove", onMouseMove);
      node.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [status]);

  // Game loop, timed in seconds so it plays the same on any refresh rate.
  useEffect(() => {
    if (status !== "playing") return;

    const point = (who) => {
      const next = { ...scoreRef.current, [who]: scoreRef.current[who] + 1 };
      scoreRef.current = next;
      setScore(next);
      if (next[who] >= PONG_TO_WIN) {
        setWinner(who);
        setStatus("over");
        return true;
      }
      serve(who === "bot" ? "visitor" : "bot");
      return false;
    };

    const tick = (time) => {
      const dt = lastTimeRef.current ? Math.min(0.05, (time - lastTimeRef.current) / 1000) : 0;
      lastTimeRef.current = time;

      if (document.hidden || time < serveAtRef.current) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const b = { ...ballRef.current };
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      if (b.y <= 2 || b.y >= 98) {
        b.vy *= -1;
        b.y = Math.max(2, Math.min(98, b.y));
      }

      // Bot: tracks the ball only when it's coming its way, at a capped speed, with a little aim error.
      const target = b.vx < 0 ? b.y + botAimRef.current : 50;
      const diff = target - botYRef.current;
      const maxStep = 46 * dt;
      botYRef.current = Math.max(PADDLE_HALF, Math.min(100 - PADDLE_HALF, botYRef.current + Math.max(-maxStep, Math.min(maxStep, diff))));
      setBotY(botYRef.current);

      const speedUp = (v) => Math.sign(v) * Math.min(85, Math.abs(v) * 1.07);

      if (b.vx > 0 && b.x >= 93 && b.x <= 97 && Math.abs(b.y - visitorYRef.current) <= PADDLE_HALF) {
        b.vx = -speedUp(b.vx);
        b.vy += (b.y - visitorYRef.current) * 2.4;
        b.x = 93;
        b.vy += Math.random() * 12 - 6;
        // The bot reads the return a little wrong; past the paddle's reach, it misses.
        botAimRef.current = Math.random() * 34 - 17;
      }
      if (b.vx < 0 && b.x <= 7 && b.x >= 3 && Math.abs(b.y - botYRef.current) <= PADDLE_HALF) {
        b.vx = -speedUp(b.vx);
        b.vy += (b.y - botYRef.current) * 2.4;
        b.x = 7;
      }

      if (b.x > 102) {
        if (point("bot")) return;
      } else if (b.x < -2) {
        if (point("visitor")) return;
      } else {
        ballRef.current = b;
      }

      setBall({ x: ballRef.current.x, y: ballRef.current.y });
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [status]);

  const playing = status === "playing";

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-black p-4 shadow-inner">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
        <span>PONG.EXE</span>
        <span>BOT vs VISITOR</span>
      </div>

      <div
        ref={fieldRef}
        className={`term-screen relative h-64 select-none overflow-hidden rounded-xl border border-emerald-500/20 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(4,12,8,1))] font-mono text-emerald-300 ${
          playing ? "cursor-none touch-none" : ""
        }`}
      >
        <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-emerald-500/30" />

        <div
          className="absolute left-4 w-2 -translate-y-1/2 rounded-sm bg-emerald-300"
          style={{ top: `${botY}%`, height: `${PADDLE_HALF * 2}%` }}
        />
        <div
          className="absolute right-4 w-2 -translate-y-1/2 rounded-sm bg-cyan-300"
          style={{ top: `${visitorY}%`, height: `${PADDLE_HALF * 2}%` }}
        />
        {playing && (
          <div
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-emerald-200"
            style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
          />
        )}

        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">
          <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-500/80">FIRST TO {PONG_TO_WIN}</div>
          <div className="mt-1 text-lg font-bold tracking-[0.3em] text-emerald-200">
            {String(score.bot).padStart(2, "0")} {String(score.visitor).padStart(2, "0")}
          </div>
        </div>

        {!playing && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/55 text-center"
          >
            {status === "over" && (
              <span className="text-lg font-bold uppercase tracking-[0.2em] text-emerald-200">
                {winner === "visitor" ? "YOU WIN" : "BOT WINS"}
              </span>
            )}
            <span className="rounded-md border border-emerald-400/60 bg-emerald-500/15 px-4 py-2 text-sm uppercase tracking-[0.2em] text-emerald-200">
              {status === "over" ? "Click here to play again" : "Click here to play"}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-400/80">Mouse, touch, or arrow keys</span>
          </button>
        )}

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-emerald-400/80">
          <span>BOT</span>
          <span>VISITOR</span>
        </div>
      </div>
    </div>
  );
}


function HomePage() {
  return (
    <SharedShell currentPage="home">
      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-emerald-300">
                  <User className="h-3.5 w-3.5" />
                  Command Profile
                </div>
                <h1 className="mt-2 break-words text-[26px] font-semibold tracking-tight text-zinc-100 sm:text-3xl md:text-5xl">
                  maxhayim.com
                </h1>
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
              comcen os is a communications center operating system imagined
              through a late-1990s vision of the future, combining public
              repositories, telemetry, activity logs, and engineering identity
              within a radar-inspired interface centered on live GitHub
              activity. The site also includes live, interactive elements that
              explore how a communications-focused operating system could look,
              feel, and function.
            </p>
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
                href="#/gits"
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
              >
                Gits
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="#/internet"
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
              >
                Internet
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

      <BuddyList />
    </SharedShell>
  );
}

function GitsPage() {
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
    <SharedShell currentPage="gits">
      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-emerald-300">
          <Github className="h-3.5 w-3.5" />
          Gits
        </div>
        <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-zinc-100 sm:text-3xl md:text-5xl">Gits</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
          Live GitHub activity from{" "}
          <a href="https://github.com/maxhayim" target="_blank" rel="noreferrer" className="underline decoration-zinc-600 underline-offset-4 hover:text-zinc-100">
            github.com/maxhayim
          </a>
          : the repos radar, traffic, telemetry, recent activity, and stats.
        </p>
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

          <div className="term-screen relative h-[360px] overflow-hidden rounded-2xl border border-emerald-500/20 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),rgba(3,7,18,0.96)_55%)]">
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
                          ? "#e8591a"
                          : "#9a968d",
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
                        className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-[#ffffff]"
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


/* ---------- Internet: dial up, then browse. A short free trial keeps it from being abused. ---------- */

// ProtoWeb is an HTTP proxy (wayback.protoweb.org:7851), which a static page can't route through,
// so the browser shows a start page with the settings instead of the restored sites themselves.
const TRIAL_MINUTES = 3;
const TRIAL_KEY = "comcen_trial_end";
const TRIAL_RESET_HOURS = 24; // after the trial ends, a fresh one is available this many hours later

function readTrialEnd() {
  const fromStore = Number(readStore("localStorage", TRIAL_KEY));
  const match = document.cookie.match(new RegExp(`(?:^|; )${TRIAL_KEY}=([^;]*)`));
  const fromCookie = match ? Number(decodeURIComponent(match[1])) : NaN;
  const values = [fromStore, fromCookie].filter((n) => Number.isFinite(n) && n > 0);
  return values.length ? Math.min(...values) : null;
}

function trialResetAt(end) {
  return end + TRIAL_RESET_HOURS * 60 * 60 * 1000;
}

function startTrial() {
  const existing = readTrialEnd();
  if (existing && Date.now() < trialResetAt(existing)) return existing;
  const end = Date.now() + TRIAL_MINUTES * 60 * 1000;
  writeStore("localStorage", TRIAL_KEY, String(end));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TRIAL_KEY}=${end}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  return end;
}


// CD key: a registered copy never runs out. Only a SHA-256 fingerprint of the key is kept here.
const CD_KEY_HASH = "31eccaeda039fccd512b50642550c5386f34b47d3dfadb056ae8c19f5e378300";
const LICENSE_KEY = "comcen_license";

function isRegistered() {
  return readStore("localStorage", LICENSE_KEY) === CD_KEY_HASH || document.cookie.includes(`${LICENSE_KEY}=${CD_KEY_HASH}`);
}

function removeLicense() {
  try {
    localStorage.removeItem(LICENSE_KEY);
  } catch {
    /* ignore */
  }
  document.cookie = `${LICENSE_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function formatCdKey(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 25);
  return clean.match(/.{1,5}/g)?.join("-") ?? "";
}

async function checkCdKey(key) {
  const clean = key.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length !== 25 || !window.crypto?.subtle) return false;
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(clean));
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex !== CD_KEY_HASH) return false;
  writeStore("localStorage", LICENSE_KEY, CD_KEY_HASH);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LICENSE_KEY}=${CD_KEY_HASH}; Max-Age=315360000; Path=/; SameSite=Lax${secure}`;
  return true;
}

function formatResetIn(ms) {
  const minutes = Math.max(1, Math.ceil(ms / 60000));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} h ${m} min` : `${m} min`;
}

function formatLeft(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const DIAL_STEPS = ["Dialing", "Connecting", "Signing on"];
const DIALUP_SECONDS = 26; // length of /audio/dialup-connect.mp3, used if the audio can't report its own

function StartPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
      <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Prodigy</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">Welcome to the Information Superhighway</h2>
      <p className="mt-2 text-sm text-zinc-400">You&rsquo;re connected at 14,400 bps.</p>

      <h3 className="mt-8 flex items-center gap-2 font-semibold text-zinc-100">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
        Next stop: ProtoWeb
      </h3>
      <p className="mt-2 text-sm leading-7 text-zinc-300">
        ProtoWeb is a volunteer project that restores websites from the early days of the web, roughly 1996 to 2001, by
        piecing them back together from archives. You browse it through a proxy server, so the old sites load as they
        originally looked.
      </p>

      <h3 className="mt-6 font-semibold text-zinc-100">How to connect</h3>
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-zinc-300">
        <li>
          In your browser&rsquo;s proxy settings, set the HTTP proxy to <code className="net-code">wayback.protoweb.org</code>,
          port <code className="net-code">7851</code>.
        </li>
        <li>
          Visit <code className="net-code">http://www.inode.com/</code>, ProtoWeb&rsquo;s directory of restored sites.
        </li>
        <li>
          For the full dial-up feel, use port <code className="net-code">7856</code>: it slows pages to modem speed.
        </li>
      </ol>
      <p className="mt-3 text-sm text-zinc-400">These settings are also listed under System Preferences &rarr; Modem.</p>

      <a
        href="https://protoweb.org/"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]"
      >
        Visit protoweb.org <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

function NotFoundPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-12 text-center sm:px-8">
      <div className="text-6xl font-semibold tracking-tight text-zinc-100">404</div>
      <h2 className="mt-3 text-xl font-semibold text-zinc-100">Page not found</h2>
      <p className="mt-2 text-sm text-zinc-400">The requested URL /signup was not found on this server.</p>
    </article>
  );
}

function InternetWindow() {
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const endListenerRef = useRef(null);
  const [stage, setStage] = useState("dialup"); // "dialup" | "browser"
  const [dial, setDial] = useState("idle"); // "idle" | "dialing"
  const [step, setStep] = useState(-1);
  const [log, setLog] = useState([`ATDT ${DIALUP_NUMBER}`, "System ready. Awaiting connection command."]);
  const [page, setPage] = useState("start");
  const [trialEnd, setTrialEnd] = useState(null);
  const [registered, setRegistered] = useState(isRegistered);
  // An earlier trial that has already run out (read on load, for the sign-on screen)
  const [usedTrialEnd, setUsedTrialEnd] = useState(() => {
    const end = readTrialEnd();
    return end && Date.now() >= end ? end : null;
  });
  const [dialog, setDialog] = useState("ended"); // "ended" | "key"
  const [cdKey, setCdKey] = useState("");
  const [keyError, setKeyError] = useState("");
  const [checking, setChecking] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const reduceMotion = prefersReducedMotion();

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (stage !== "browser") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [stage]);

  // The sign-on follows the dial-up recording (about 26 s): the steps and modem messages are spread across it,
  // and the browser only opens once the recording has finished.
  const connect = () => {
    if (dial !== "idle") return;
    const audio = audioRef.current;
    const total = (audio && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : DIALUP_SECONDS) * 1000;
    let opened = false;

    setDial("dialing");
    setStep(0);
    setLog([`ATDT ${DIALUP_NUMBER}`, "Initializing modem...", `Dialing ${DIALUP_NUMBER}...`]);
    playSound(audio).catch(() => {});

    const later = (fraction, fn) => timersRef.current.push(setTimeout(fn, Math.round(total * fraction)));
    const say = (line) => setLog((l) => [...l, line]);

    later(0.1, () => say("Ringing..."));
    later(0.2, () => {
      setStep(1);
      say("Carrier detected. Handshaking...");
    });
    later(0.42, () => say("Negotiating carrier... 2400 / 9600 / 14400"));
    later(0.62, () => say("Error correction: V.42bis"));
    later(0.76, () => {
      setStep(2);
      say("CONNECT 14400");
    });
    later(0.84, () => say("Logging on to the network..."));
    later(0.93, () => say("Verifying member ID..."));

    const openBrowser = () => {
      if (opened) return;
      opened = true;
      audio?.removeEventListener("ended", openBrowser);
      // The trial clock starts the first time a visitor gets online, and never resets
      setTrialEnd(startTrial());
      setNow(Date.now());
      setPage("start");
      setDialog("ended");
      setCdKey("");
      setKeyError("");
      setStage("browser");
    };
    // Open when the recording ends; the timer covers muted sound or a recording that can't play.
    audio?.addEventListener("ended", openBrowser);
    endListenerRef.current = () => audio?.removeEventListener("ended", openBrowser);
    timersRef.current.push(setTimeout(openBrowser, total + 400));
  };

  const hangUp = () => {
    endListenerRef.current?.();
    endListenerRef.current = null;
    const end = readTrialEnd();
    setUsedTrialEnd(end && Date.now() >= end ? end : null);
    setNow(Date.now());
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    audioRef.current?.pause();
    setDial("idle");
    setStep(-1);
    setStage("dialup");
    setLog((l) => [...l.slice(-4), "ATH0", "NO CARRIER"]);
  };

  const expired = !registered && trialEnd !== null && now >= trialEnd;
  const resetIn = trialEnd !== null ? trialResetAt(trialEnd) - now : 0;

  useEffect(() => {
    if (expired) audioRef.current?.pause();
  }, [expired]);

  const submitKey = async (e) => {
    e.preventDefault();
    setChecking(true);
    setKeyError("");
    const ok = await checkCdKey(cdKey);
    setChecking(false);
    if (ok) setRegistered(true);
    else setKeyError("That CD key isn't valid. Check it and try again.");
  };
  const address = page === "signup" ? "http://maxhayim.com/signup" : "http://maxhayim.com/start.html";
  const fade = { duration: reduceMotion ? 0 : 0.3, ease: [0.3, 0, 0.2, 1] };

  return (
    <div className="net-window overflow-hidden rounded-2xl border border-zinc-800">
      <audio ref={audioRef} src="/audio/dialup-connect.mp3" preload="auto" />

      {stage === "dialup" ? (
        <motion.div key="dialup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fade} className="flex flex-col items-center px-5 py-10 text-center sm:py-14">
          {/* The logo is a stencil filled with the theme's ink, so it's dark on light and light on dark */}
          <h2 className="m-0">
            <span role="img" aria-label="Prodigy" className="prodigy-logo block w-[132px] sm:w-[150px]" />
          </h2>
          <dl className="mt-5 grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-left text-[13px]">
            <dt className="text-zinc-500">Service</dt>
            <dd className="text-zinc-200">Prodigy Internet</dd>
            <dt className="text-zinc-500">Local access number</dt>
            <dd className="tabular-nums text-zinc-200">{DIALUP_NUMBER}</dd>
            <dt className="text-zinc-500">Modem</dt>
            <dd className="text-zinc-200">14,400 bps</dd>
          </dl>
          <p className="mt-3 max-w-md text-[13px] leading-6 text-zinc-500">
            Started by IBM and Sears, Prodigy went nationwide in 1990 as one of the first big online services. Members
            dialed a local access number, which varied by city, rather than one nationwide number.
          </p>
          <p className="mt-3 text-sm text-zinc-400">
            Dial {DIALUP_NUMBER} to sign on.{" "}
            {registered
              ? "This copy is registered."
              : usedTrialEnd && now < trialResetAt(usedTrialEnd)
                ? `Your free trial has ended. It resets in ${formatResetIn(trialResetAt(usedTrialEnd) - now)}.`
                : `New members get a ${TRIAL_MINUTES}-minute free trial.`}
          </p>
          <SoundHint className="mt-2" />

          <ol className="mt-6 flex items-center gap-2 text-[12px] sm:gap-3" aria-label="Sign-on progress">
            {DIAL_STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-2 sm:gap-3">
                <span className={`flex items-center gap-1.5 ${i <= step ? "text-zinc-100" : "text-zinc-500"}`}>
                  <span className={`os-dot ${i <= step ? "os-dot-on" : ""}`} aria-hidden="true" />
                  {label}
                </span>
                {i < DIAL_STEPS.length - 1 && <span className="h-px w-5 bg-[var(--os-line)] sm:w-8" aria-hidden="true" />}
              </li>
            ))}
          </ol>

          <div className="mt-6 w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-left font-mono text-[12px] leading-5 text-zinc-300" aria-live="polite">
            {log.map((line, i) => (
              <div key={`${line}-${i}`} className={line.startsWith("CONNECT") ? "text-emerald-300" : line.startsWith("ATDT") ? "text-cyan-300" : ""}>
                {line}
              </div>
            ))}
          </div>

          <div className="mt-6">
            {dial === "idle" ? (
              <button type="button" onClick={connect} className="net-primary">
                Connect
              </button>
            ) : (
              <button type="button" onClick={hangUp} className="net-secondary">
                Cancel
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div key="browser" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={fade}>
          {/* Browser toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 px-3 py-2.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {["‹", "›", "↻"].map((g) => (
                <span key={g} className="os-round-btn opacity-50">
                  {g}
                </span>
              ))}
            </div>
            <button type="button" onClick={() => setPage("start")} className="os-round-btn" title="Home" aria-label="Home">
              <House className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <label className="flex min-w-[160px] flex-1 items-center">
              <span className="sr-only">Address</span>
              <input readOnly value={address} className="net-address w-full rounded-full px-3.5 py-1.5 text-[13px]" />
            </label>
            <button type="button" onClick={hangUp} className="net-secondary">
              Disconnect
            </button>
          </div>

          {/* Page */}
          <div className="relative h-[460px] overflow-auto bg-zinc-950/70">
            {page === "signup" ? <NotFoundPage /> : <StartPage />}

            {expired && page !== "signup" && (
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.22)] p-4 backdrop-blur-[5px]">
                <div role="alertdialog" aria-labelledby="trial-title" aria-describedby="trial-text" className="os-popover w-full max-w-[400px] p-5">
                  {dialog === "ended" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="os-led" aria-hidden="true" />
                        <h3 id="trial-title" className="font-semibold text-zinc-100">
                          Your free trial has ended
                        </h3>
                      </div>
                      <p id="trial-text" className="mt-2 text-sm leading-6 text-zinc-400">
                        Thanks for trying Prodigy! To keep surfing the Information Superhighway, enter the CD key from
                        your Prodigy disc, or sign up for a membership.
                      </p>
                      <p className="mt-2 text-[13px] text-zinc-500">
                        Your free trial resets in <span className="tabular-nums text-zinc-300">{formatResetIn(resetIn)}</span>.
                      </p>
                      <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <button type="button" onClick={hangUp} className="net-secondary">
                          Close
                        </button>
                        <button type="button" onClick={() => setPage("signup")} className="net-secondary">
                          Sign Up
                        </button>
                        <button type="button" onClick={() => setDialog("key")} className="net-primary">
                          Enter CD Key
                        </button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={submitKey}>
                      <div className="flex items-center gap-2">
                        <Disc className="h-4 w-4 text-[var(--os-accent)]" aria-hidden="true" />
                        <h3 id="trial-title" className="font-semibold text-zinc-100">
                          Enter your CD key
                        </h3>
                      </div>
                      <p id="trial-text" className="mt-2 text-sm leading-6 text-zinc-400">
                        You&rsquo;ll find the 25-character key on the back of your Prodigy CD case.
                      </p>
                      <label htmlFor="cd-key" className="sr-only">
                        CD key
                      </label>
                      <input
                        id="cd-key"
                        autoFocus
                        autoComplete="off"
                        spellCheck={false}
                        value={cdKey}
                        onChange={(e) => {
                          setCdKey(formatCdKey(e.target.value));
                          setKeyError("");
                        }}
                        placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                        aria-invalid={Boolean(keyError)}
                        aria-describedby={keyError ? "cd-key-error" : undefined}
                        className="net-address mt-3 w-full rounded-lg px-3 py-2 text-center font-mono text-[14px] tracking-[0.08em]"
                      />
                      {keyError && (
                        <p id="cd-key-error" role="alert" className="mt-2 text-[13px] text-[var(--os-warn)]">
                          {keyError}
                        </p>
                      )}
                      <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={() => setDialog("ended")} className="net-secondary">
                          Back
                        </button>
                        <button type="submit" disabled={checking || cdKey.replace(/-/g, "").length !== 25} className="net-primary disabled:opacity-50">
                          {checking ? "Checking…" : "Register"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between gap-3 border-t border-zinc-800 px-4 py-2 text-[12px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="os-led" aria-hidden="true" />
              {page === "signup" ? "404 Not Found" : "Connected at 14,400 bps"}
            </span>
            <span className="flex items-center gap-2 tabular-nums">
              {registered ? (
                <>
                  Registered
                  <button
                    type="button"
                    onClick={() => {
                      removeLicense();
                      setRegistered(false);
                      setDialog("ended");
                      setCdKey("");
                    }}
                    title="Remove the CD key from this browser"
                    className="rounded-full border border-zinc-800 px-2 py-0.5 text-[11px] hover:bg-[var(--os-hover)] hover:text-zinc-100"
                  >
                    remove key
                  </button>
                </>
              ) : expired ? (
                "Free trial ended"
              ) : trialEnd ? (
                `Free trial: ${formatLeft(trialEnd - now)} left`
              ) : (
                ""
              )}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function InternetPage() {
  return (
    <SharedShell currentPage="internet">
      <section className="rounded-3xl border border-zinc-800 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-emerald-300">
          <Globe className="h-3.5 w-3.5" />
          Internet
        </div>
        <InternetWindow />
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
              interfaces, software eras, creative influences, and technologies
              behind comcen os, tracing the journey that brought coding back
              into focus through the design language of a futuristic late-1990s
              operating system.
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
    playSound(mailAudioRef.current).catch(() => {});
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

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner">
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
                  <SoundHint className="mt-1.5 !justify-start" />
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

const MEMORY_TARGET = 1048576; // 1 GB ECC SDRAM

const IDE_DETECT = [
  { label: "SCSI ID 0      ", result: "SEAGATE CHEETAH 18.2GB ULTRA2" },
  { label: "SCSI ID 4      ", result: "TOSHIBA DVD-ROM" },
  { label: "SCSI ID 5      ", result: "PLEXTOR PLEXWRITER CD-RW" },
  { label: "Floppy A:      ", result: "1.44MB 3.5in" },
];

const SYS_CONFIG = [
  [
    ["CPU Type", "2x MIPS R12000", "Memory", "1048576K"],
    ["Co-Processor", "Installed", "Memory Type", "ECC SDRAM"],
    ["CPU Clock", "300MHz", "Frame Buffer", "64MB"],
  ],
  [
    ["Diskette Drive  A", "1.44M, 3.5 in.", "Graphics", "InfiniteReality2"],
    ["Diskette Drive  B", "None", "Display", "2048x1536 CRT"],
    ["SCSI ID 0", "Cheetah 18.2GB U2", "Serial Port(s)", "RS-232"],
    ["SCSI ID 4", "DVD-ROM", "Parallel Port(s)", "378"],
    ["SCSI ID 5", "CD-RW", "USB", "Enabled"],
    ["Controller", "Ultra2 SCSI", "Video I/O", "S-VHS"],
  ],
];

const PCI_DEVICES = [
  ["0", "1", "0", "1000", "000C", "Ultra2 SCSI Controller", "14"],
  ["0", "2", "0", "10B7", "9055", "Ethernet Controller", "10"],
  ["0", "3", "0", "10A9", "0009", "Graphics Controller", "11"],
  ["0", "4", "0", "10A9", "0005", "Audio Controller", "5"],
];

const DOS_LINES = [
  "Starting comcen os I...",
  "",
  "C:\\> cd \\MaXHyM",
  "C:\\MaXHyM> comcen.exe",
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
  let gainEntry = null;

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
      if (!soundState.on) return; // muted in Sound settings
      recording = new Audio("/audio/boot.mp3");
      playSound(recording).catch(() => {
        recording = null;
        if (stopped || !AudioCtx) return;
        ctx = new AudioCtx();
        master = ctx.createGain();
        master.gain.value = 0.7 * (soundState.volume / 100);
        master.connect(ctx.destination);
        gainEntry = { gain: master, base: 0.7, ctx };
        liveGains.add(gainEntry);
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
        liveMedia.delete(recording);
        recording = null;
      }
      if (gainEntry) {
        liveGains.delete(gainEntry);
        gainEntry = null;
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
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${String(d.getFullYear()).slice(2)}-R12000x2,CCN-M2000-0823-00`;
}

const SHUTDOWN_ORANGE = "#dc7a3c";

// mode: "gate" (first visit, waits for a key), "powered" (reboot, starts immediately), "off" (shut down screen)
const BOOT_LOGO_MS = 1700;

function BootLogo() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-8">
      <img src="/bios/comcen-os-logo.png" alt="comcen os" className="boot-logo w-[min(78vw,560px)]" />
      <div className="boot-bar" role="progressbar" aria-label="Loading comcen os">
        <div className="boot-bar-fill" />
      </div>
    </div>
  );
}

function BootScreen({ onDone, mode }) {
  // Full screen isn't available everywhere (iPhone Safari, some embeds); fall back to a maximize hint.
  const canFullscreen = Boolean(document.fullscreenEnabled && document.documentElement.requestFullscreen);
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
  const timersRef = useRef([]);

  // Leaving the boot logo for the desktop: the two-note chime plays as the OS fades in.
  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    timersRef.current.forEach(clearTimeout);
    audioRef.current?.stop();
    playSound(new Audio("/audio/comcen-boot.mp3"), 0.8).catch(() => {});
    setLeaving(true);
    setTimeout(onDone, 600);
  };

  // After the BIOS: the comcen os logo with a quick loading bar, then the desktop.
  const showLogo = () => {
    if (doneRef.current) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    audioRef.current?.stop();
    setScreen(3);
    timersRef.current.push(setTimeout(finish, BOOT_LOGO_MS));
  };

  // Shut down or power-on screen: any key or click powers on. While booting: any key or click skips.
  const handleInput = () => {
    if (phase === "off" && !shutdownVisible) return;
    if (!powered) setPhase("on");
    else if (screen < 3) showLogo();
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
      // F toggles full screen for the full experience (and powers on from the power button)
      if ((e.key === "f" || e.key === "F") && canFullscreen && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
        else document.documentElement.requestFullscreen?.().catch(() => {});
        if (!powered) setPhase("on");
        return;
      }
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

    const timers = timersRef.current;
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
    after(700, showLogo);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
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
      className={`bios-font fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-black text-[14px] leading-[1.35] text-[#aaaaaa] transition-opacity duration-500 sm:text-[20px] md:text-[24px] ${
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
            {canFullscreen ? (
              <>
                Press <span className="opacity-100">F</span> for full screen and turn your sound on for the full experience
              </>
            ) : (
              "Maximize your window and turn your sound on for the full experience"
            )}
          </div>
        </div>
      ) : screen === 3 ? (
        <BootLogo />
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
                  <div>COMCEN PROM by MaXHyM v6.5, An Energy Star Ally</div>
                  <div>
                    Copyright (C) 2009-{String(year).slice(2)}, maxhayim.com
                  </div>
                </div>
              </div>
            </>
          )}
          {post >= 2 && (
            <div className="mt-[1.35em]">
              (CCN2000) COMCEN Model 2000 Workstation
            </div>
          )}
          {post >= 3 && (
            <div className="mt-[1.35em]">
              <div>2x MIPS R12000 CPU at 300MHz</div>
              <div className="whitespace-pre">
                Memory Test : {String(memory).padStart(7, " ")}K
                {memory >= MEMORY_TARGET ? " OK" : ""}
              </div>
            </div>
          )}
          {post >= 4 && (
            <div className="mt-[1.35em]">
              <div className="whitespace-pre-wrap">
                COMCEN Ultra2 SCSI BIOS v1.0A
              </div>
              <div>Copyright (C) {year}, maxhayim.com</div>
              {IDE_DETECT.map((drive, i) => {
                const step = detect - i * 2;
                if (step < 1) return null;
                return (
                  <div key={drive.label} className="whitespace-pre-wrap">
                    {"  Detecting "}
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
                Press <span className={bright}>DEL</span> to enter SETUP
                {canFullscreen ? (
                  <>
                    , <span className={bright}>F</span> for full screen
                  </>
                ) : null}
                , any other key to skip
              </div>
              <div>Turn your sound on for the best experience</div>
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

/* ---------- Buddy List: design legends ---------- */

const buddyListData = [
  {
    name: "Dieter Rams",
    quote: "Good design is as little design as possible.",
    quoteSource: "his ten principles of good design",
    timeZone: "Europe/Berlin",
    bio: "German functionalist industrial architect and legendary head of design at Braun. Pioneered the famous 'Less, but better' ideology and established the 10 Principles for Good Design.",
    products: ["Braun SK-4 phonograph", "Vitsoe 606 Universal Shelving System", "Braun ET66 calculator"],
  },
  {
    name: "Steve Jobs",
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    quoteSource: "The New York Times Magazine, 2003",
    signedOff: "1955–2011",
    bio: "Co-founder and CEO of Apple and NeXT. A visionary leader who profoundly transformed consumer technology, animation, and digital media by treating technology as functional art.",
    products: ["Macintosh", "iPod", "iPhone", "iPad", "Pixar's Toy Story"],
  },
  {
    name: "Jony Ive",
    quote: "So much of what we try to do is get to a point where the solution seems inevitable.",
    quoteSource: "Icon magazine, 2003",
    timeZone: "America/Los_Angeles",
    bio: "British designer and former Chief Design Officer of Apple. Mastermind behind Apple's iconic minimalist aluminum and glass design language.",
    products: ["iMac G3", "iPod", "iPhone", "MacBook unibody design"],
  },
  {
    name: "Jon Rubinstein",
    quote: "I know how to do this. I've got all the parts.",
    quoteSource: "recalling the iPod pitch to Steve Jobs",
    timeZone: "America/Los_Angeles",
    bio: "American electrical engineer and executive. Managed hardware teams at NeXT and Apple, heavily credited with shepherding the engineering behind early Apple revivals and consumer electronics.",
    products: ["Power Macintosh G3", "iMac G3", "First-generation iPod hard-drive engineering"],
  },
  {
    name: "Hartmut Esslinger",
    quote: "Form follows emotion.",
    quoteSource: "frog design's guiding principle",
    timeZone: "America/Los_Angeles",
    bio: "German-American industrial designer and founder of frogdesign. Championed the philosophy of 'form follows emotion' and created a unified visual identity for major corporations.",
    products: ["Apple 'Snow White' design language (Apple IIc)", "Sony Trinitron TV frames", "Original Sony Walkman"],
  },
  {
    name: "Bill Moggridge",
    quote: "Design is an excellent bridge between the sciences and the arts.",
    quoteSource: "Smithsonian magazine",
    signedOff: "1943–2012",
    bio: "British designer, author, and co-founder of IDEO. Pioneered the discipline of interaction design and championed human-centered engineering.",
    products: ["GRID Compass (the world's first successful clamshell laptop)"],
  },
  {
    name: "David Kelley",
    quote: "Fail faster to succeed sooner.",
    quoteSource: "as quoted by IDEO",
    timeZone: "America/Los_Angeles",
    bio: "American engineer, professor, and co-founder of IDEO and the Stanford d.school. Popularized the 'Design Thinking' methodology globally.",
    products: ["Apple's first commercial mouse", "Ergonomic medical instrumentation"],
  },
  {
    name: "Naoto Fukasawa",
    quote: "People shouldn't really have to think about an object when they are using it.",
    quoteSource: "Dwell, 2006",
    timeZone: "Asia/Tokyo",
    bio: "Japanese industrial designer recognized for his clean, minimalist functional aesthetics and his profound collaboration with MUJI and Magis.",
    products: ["MUJI Wall-Mounted CD Player", "INFOBAR cellular phones"],
  },
  {
    name: "Jasper Morrison",
    quote: "An object becomes Super Normal through use.",
    quoteSource: "Super Normal dialogue, Axis Gallery Tokyo",
    timeZone: "Europe/London",
    bio: "Renowned British product designer who defined the 'Super Normal' approach to aesthetics, favoring understated durability over loud styling.",
    products: ["Thinking Man's Chair", "Low Pad armchair", "Rowenta appliances"],
  },
  {
    name: "Marc Newson",
    quote: "The best thing about design is that you can take it or leave it.",
    quoteSource: "IDSA interview",
    timeZone: "Europe/London",
    bio: "Australian industrial designer blending organic lines ('biomorphism') with aerospace-grade engineering. Co-founded LoveFrom with Jony Ive.",
    products: ["Lockheed Lounge chair", "Ikepod watches", "Qantas Skybed"],
  },
  {
    name: "Richard Sapper",
    quote: "[Good design] has to transmit a message to whomever is looking at it.",
    quoteSource: "Dezeen, 2013",
    signedOff: "1932–2015",
    bio: "German industrial designer who seamlessly blended technical innovation with elegant geometric forms.",
    products: ["IBM ThinkPad (the classic black brick)", "Tizio halogen desk lamp"],
  },
  {
    name: "Susan Kare",
    quote: "I believe that good icons are more akin to road signs rather than illustrations.",
    quoteSource: "interview, 2001",
    timeZone: "America/Los_Angeles",
    bio: "Prolific artist and graphic designer who designed the original user interface elements, icons, and typefaces for the first Apple Macintosh.",
    products: ["'Happy Mac' icon", "Chicago typeface", "Cairo 'Clarus the Dogcow' icon"],
  },
  {
    name: "Jerry Manock",
    quote: "Little details like that made the Mac a success.",
    quoteSource: "Macworld",
    timeZone: "America/New_York",
    bio: "Regarded as the father of Apple's Industrial Design Group. Brought structured manufacturing, housing acoustics, and color discipline to early microcomputers.",
    products: ["Original Apple II housing", "Apple III", "Macintosh 128K enclosure"],
  },
  {
    name: "Tony Fadell",
    quote: "The first secret of design is… noticing.",
    quoteSource: "TED, 2015",
    timeZone: "Europe/Paris",
    bio: "American engineer, innovator, and former head of the iPod division at Apple. Later founded Nest Labs to redefine automated home accessories.",
    products: ["iPod hardware design architecture", "Nest Learning Thermostat"],
  },
  {
    name: "Ken Segall",
    quote: "To Steve Jobs, simplicity wasn't just a design principle. It was a religion and a weapon.",
    quoteSource: "Insanely Simple",
    timeZone: "America/New_York",
    bio: "Legendary ad agency creative director who closely collaborated with Steve Jobs to engineer Apple's iconic public rebranding.",
    products: ["'Think Different' ad campaign", "Naming convention for the 'i' prefix (iMac, iPod)"],
  },
];

// Legends are online during their daytime (9am to 9pm in their home time zone) and away overnight.
const ONLINE_FROM_HOUR = 9;
const ONLINE_UNTIL_HOUR = 21;

function localClock(timeZone, now) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(now)
  );
  const time = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" }).format(now);
  const zone =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "long" })
      .formatToParts(now)
      .find((p) => p.type === "timeZoneName")?.value || timeZone;
  return { hour, time, zone };
}

function buddyPresence(buddy, now) {
  if (buddy.signedOff) return { status: "offline" };
  const clock = localClock(buddy.timeZone, now);
  const online = clock.hour >= ONLINE_FROM_HOUR && clock.hour < ONLINE_UNTIL_HOUR;
  return { status: online ? "online" : "away", ...clock };
}

function useMinuteClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Quote({ buddy }) {
  return (
    <figure>
      <blockquote className="text-sm leading-6 text-zinc-100 md:text-base">&ldquo;{buddy.quote}&rdquo;</blockquote>
      <figcaption className="mt-1 text-xs text-zinc-500">&mdash; {buddy.quoteSource}</figcaption>
    </figure>
  );
}

function BuddyList() {
  const now = useMinuteClock();
  const [selected, setSelected] = useState(0);
  const [openGroups, setOpenGroups] = useState({ legends: true, offline: true });
  const listRef = useRef(null);
  const touchStartRef = useRef(null);
  const reduceMotion = prefersReducedMotion();
  const count = buddyListData.length;

  const buddies = buddyListData.map((b, i) => ({ ...b, i, presence: buddyPresence(b, now) }));
  const legends = buddies.filter((b) => !b.signedOff);
  const onlineCount = legends.filter((b) => b.presence.status === "online").length;
  const awayCount = legends.length - onlineCount;

  const groups = [
    { id: "legends", label: "Buddies", members: legends, tally: `${onlineCount}/${legends.length}` },
    { id: "offline", label: "Offline", members: buddies.filter((b) => b.signedOff), tally: `0/${count - legends.length}` },
  ];
  const visible = groups.flatMap((g) => (openGroups[g.id] ? g.members.map((m) => m.i) : []));

  const select = (index, focus = false) => {
    setSelected(index);
    if (focus) listRef.current?.querySelector(`[data-buddy="${index}"]`)?.focus();
  };
  const step = (dir) => {
    const order = visible.length ? visible : buddies.map((b) => b.i);
    const pos = order.indexOf(selected);
    select(order[(pos + dir + order.length) % order.length], true);
  };
  const onListKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      step(-1);
    }
  };

  const onTouchStart = (e) => {
    touchStartRef.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const end = e.changedTouches[0]?.clientX;
    if (start == null || end == null || Math.abs(end - start) < 50) return;
    setSelected((selected + (end < start ? 1 : -1) + count) % count);
  };

  return (
    <section className="grid gap-6 md:grid-cols-12">
      {/* Buddy List window */}
      <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-amber-300">
            <Users className="h-3.5 w-3.5" /> Buddy List
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {onlineCount} online &middot; {awayCount} away
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
          <img src="/avatar.jpg" alt="" className="h-10 w-10 rounded-lg border border-zinc-800 object-cover" />
          <div className="min-w-0">
            <div className="truncate font-semibold text-zinc-100">maxhayim</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" /> Available
            </div>
          </div>
        </div>

        <div
          ref={listRef}
          role="listbox"
          aria-label="Buddy list"
          aria-activedescendant={`buddy-${selected}`}
          onKeyDown={onListKeyDown}
          className="mt-3 max-h-[440px] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950/70 p-1.5"
        >
          {groups.map((group) => {
            const open = openGroups[group.id];
            return (
              <div key={group.id} role="group" aria-label={group.label} className="mb-1">
                <button
                  type="button"
                  onClick={() => setOpenGroups((g) => ({ ...g, [group.id]: !g[group.id] }))}
                  aria-expanded={open}
                  className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-xs text-zinc-400 hover:bg-zinc-900"
                >
                  <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} />
                  <span className="font-semibold text-zinc-300">{group.label}</span>
                  <span>({group.tally})</span>
                </button>

                {open &&
                  group.members.map((buddy) => {
                    const active = buddy.i === selected;
                    const { status } = buddy.presence;
                    return (
                      <button
                        key={buddy.name}
                        id={`buddy-${buddy.i}`}
                        data-buddy={buddy.i}
                        type="button"
                        role="option"
                        aria-selected={active}
                        tabIndex={active ? 0 : -1}
                        onClick={() => select(buddy.i)}
                        title={buddy.presence.time ? `${buddy.presence.time} their time` : undefined}
                        className={`aim-buddy aim-buddy-${status} relative flex w-full items-center gap-2 rounded-lg py-1.5 pl-7 pr-2 text-left ${
                          active ? "aim-buddy-active" : ""
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="aim-highlight"
                            className="aim-highlight absolute inset-0 rounded-lg"
                            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] }}
                          />
                        )}
                        <span className="relative min-w-0 flex-1 truncate">{buddy.name}</span>
                        {status === "away" && <StickyNote className="aim-away-icon relative h-3.5 w-3.5 shrink-0" aria-label="Away" />}
                      </button>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Buddy Info window */}
      <div className="rounded-3xl border border-zinc-800 bg-black/50 p-4 shadow-2xl backdrop-blur-xl md:col-span-8 md:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] term-title text-amber-300">
            <User className="h-3.5 w-3.5" /> Buddy Info
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] tabular-nums text-zinc-500">
              {selected + 1} / {count}
            </span>
            <button type="button" onClick={() => setSelected((selected - 1 + count) % count)} className="os-round-btn" aria-label="Previous buddy">
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button type="button" onClick={() => setSelected((selected + 1) % count)} className="os-round-btn" aria-label="Next buddy">
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
        </div>

        {/* Every card sits side by side on one track; changing buddies slides it with translateX */}
        <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="buddy-track flex" style={{ transform: `translateX(-${selected * 100}%)` }}>
            {buddies.map((buddy) => {
              const { status, time, zone } = buddy.presence;
              return (
                <article
                  key={buddy.name}
                  aria-hidden={buddy.i !== selected}
                  inert={buddy.i !== selected ? "" : undefined}
                  className="w-full shrink-0 px-0.5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">{buddy.name}</h3>
                    <span className={`aim-status aim-status-${status}`}>
                      <span className="aim-status-dot" aria-hidden="true" />
                      {status === "offline" ? "signed off" : status}
                    </span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                    {status === "away" && (
                      <>
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                          <span>Away message</span>
                          <span className="normal-case tracking-normal">
                            {time} their time
                          </span>
                        </div>
                        <Quote buddy={buddy} />
                      </>
                    )}
                    {status === "online" && (
                      <>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Online now</div>
                        <p className="mt-1.5 text-sm text-zinc-200">
                          It&rsquo;s {time} for {buddy.name.split(" ")[0]} ({zone}).
                        </p>
                      </>
                    )}
                    {status === "offline" && (
                      <>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Signed off</div>
                        <p className="mt-1.5 text-sm text-zinc-200">
                          {buddy.name} is no longer online. In memory, {buddy.signedOff}.
                        </p>
                      </>
                    )}
                  </div>

                  {status !== "away" && (
                    <div className="mt-5">
                      <div className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">In their words</div>
                      <Quote buddy={buddy} />
                    </div>
                  )}

                  <div className="mt-5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Profile</div>
                  <p className="mt-1.5 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">{buddy.bio}</p>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Known for</div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {buddy.products.map((product) => (
                      <li key={product} className="rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 text-sm text-zinc-200">
                        {product}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
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
    // CRT mode is retired: clear anything a previous visit left behind.
    delete document.documentElement.dataset.crt;
    try {
      localStorage.removeItem("mh-crt");
    } catch {
      /* ignore */
    }
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
    route === "gits" ? (
      <GitsPage />
    ) : route === "internet" ? (
      <InternetPage />
    ) : route === "about" ? (
      <AboutPage />
    ) : route === "contact" ? (
      <ContactPage />
    ) : (
      <HomePage />
    );

  return (
    <>
      {page}
      <ScreenSaverHost disabled={booting} />
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
