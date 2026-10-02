import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, Reorder, useDragControls, useMotionValue, animate } from "framer-motion";
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
  Play,
  Square,
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  LocateFixed,
  LayoutDashboard,
  RotateCcw,
  Pause,
  SkipBack,
  SkipForward,
  RadioTower,
  Check,
  Calculator,
  CalendarDays,
  PanelTop,
} from "lucide-react";
import { version as OS_VERSION } from "../package.json";

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
  ["version", `v${OS_VERSION}`],
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

function BatteryIndicator({ battery, percent = true }) {
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
      {percent && <span className="hidden sm:inline">{battery.level}%</span>}
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

function formatMenuDate(d, { region = readPrefs(REGION_PREFS), time = readPrefs(TIME_PREFS) } = {}) {
  const locale = region.locale;
  const timeZone = zoneOf(time);
  if (locale !== "en-US" || time.calendar !== "gregory" || timeZone) {
    return d.toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric", calendar: time.calendar, timeZone });
  }
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

function AnalogClock({ now, time, className = "h-[18px] w-[18px]" }) {
  const parts = clockParts(now, time);
  const s = parts.s;
  const m = parts.m + s / 60;
  const h = (parts.h % 12) + m / 60;
  const hand = (deg, len, width, color) => (
    <line x1="12" y1="12" x2="12" y2={12 - len} stroke={color} strokeWidth={width} strokeLinecap="round" transform={`rotate(${deg} 12 12)`} />
  );
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
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
  const { available } = useUpdates();
  const { current } = useUsers();
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
        <span className="hidden text-[var(--os-ink-3)] sm:inline">system</span>
        {available && <span className="update-led h-1.5 w-1.5 rounded-full" title="Update available" aria-label="Update available" />}
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
              <button
                role="menuitem"
                type="button"
                className={`${item} flex items-center justify-between`}
                onClick={() => {
                  setOpen(false);
                  openPreferences("updates");
                }}
              >
                software update…
                {available && <span className="text-[12px] text-[var(--os-accent)]">{available.tag} available</span>}
              </button>
              <button
                role="menuitem"
                type="button"
                className={`${item} flex items-center justify-between gap-3`}
                onClick={() => {
                  setOpen(false);
                  openPreferences("users");
                }}
              >
                users…
                <span className="flex min-w-0 items-center gap-1.5 text-[12px] text-[var(--os-ink-3)]">
                  <UserAvatar user={current} className="h-4 w-4 rounded-full text-[7px]" />
                  <span className="truncate">{current.name}</span>
                </span>
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
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openPreferences("updates");
                  }}
                  className="rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]"
                >
                  {available ? `update to ${available.tag}…` : "software update…"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



/* Dock: a hi-fi front panel you can pick up by its speaker grille; let go and it springs back home */
/* The invisible grid for windows and the dock: wherever you drop them, they settle onto a 16px grid,
   fully on screen (a tall window keeps its title bar on screen). Positions can be remembered. */
const GRID = 16;
const SETTLE = { type: "spring", stiffness: 520, damping: 42 };

function useGridPosition({ storageKey, limits, ref: givenRef, stay = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ownRef = useRef(null);
  const ref = givenRef || ownRef;
  const limitsRef = useRef(limits);
  const stayRef = useRef(stay);
  useEffect(() => {
    limitsRef.current = limits;
    stayRef.current = stay;
  });

  const settle = useCallback(
    ({ instant = false, save = true } = {}) => {
      const el = ref.current;
      if (!el || !el.offsetParent) return;
      // "Spring back" setting: let go and it returns home
      if (!stayRef.current) {
        animate(x, 0, SETTLE);
        animate(y, 0, SETTLE);
        return;
      }
      const zoom = pageZoom();
      const rect = el.getBoundingClientRect();
      const box = limitsRef.current(rect);
      // How far the element may move, in screen pixels, turned into page pixels and onto the grid
      const axis = (value, min, max) => {
        const lo = Math.ceil((value + min / zoom) / GRID) * GRID;
        const hi = Math.floor((value + max / zoom) / GRID) * GRID;
        const snapped = Math.round(value / GRID) * GRID;
        return lo > hi ? value + (min / zoom + max / zoom) / 2 : Math.max(lo, Math.min(hi, snapped));
      };
      const tx = axis(x.get(), box.left - rect.left, box.right - rect.right);
      const ty = axis(y.get(), box.top - rect.top, box.bottom - rect.bottom);
      if (instant) {
        x.set(tx);
        y.set(ty);
      } else {
        animate(x, tx, SETTLE);
        animate(y, ty, SETTLE);
      }
      if (save && storageKey) writeStore("localStorage", storageKey, JSON.stringify({ x: tx, y: ty }));
    },
    [x, y, storageKey, ref],
  );

  const reset = useCallback(() => {
    try {
      if (storageKey) localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    animate(x, 0, SETTLE);
    animate(y, 0, SETTLE);
  }, [x, y, storageKey]);

  useEffect(() => {
    if (!stay) reset();
  }, [stay, reset]);

  // Start where it was left, and stay on screen when the window changes size
  useEffect(() => {
    const saved = storageKey && stayRef.current ? readJSON(storageKey, null) : null;
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      x.set(saved.x);
      y.set(saved.y);
    }
    const id = requestAnimationFrame(() => settle({ instant: true, save: false }));
    const onResize = () => settle({ instant: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [storageKey, settle, x, y]);

  return { x, y, ref, settle, reset };
}

// The usable screen: under the menu bar, with a little margin
const screenBox = (margin = 8) => ({ left: margin, right: window.innerWidth - margin, top: 44 + margin, bottom: window.innerHeight - margin });

function Dock({ currentPage, windowState, onMinimize, onRestore }) {
  const minimized = windowState !== "open";
  const dashboard = useDashboardOpen();
  const controls = useDragControls();
  const boundsRef = useRef(null);
  const [dock] = usePrefs(DOCK_PREFS);
  const { x: dockX, y: dockY, ref: dockRef, settle: settleDock, reset: resetDock } = useGridPosition({ storageKey: "comcen_dock_pos", limits: () => screenBox(4), stay: dock.stay });
  useEffect(() => {
    window.addEventListener("mh-dock-reset", resetDock);
    return () => window.removeEventListener("mh-dock-reset", resetDock);
  }, [resetDock]);
  const [revealed, setRevealed] = useState(false);
  // Auto-hide needs a pointer that can reach the bottom edge; touch screens keep the dock out
  const autohide = dock.autohide && window.matchMedia?.("(pointer: fine)").matches;

  useEffect(() => {
    if (!autohide) return;
    const onMove = (e) => setRevealed(e.clientY > window.innerHeight - (dock.size === "large" ? 130 : 110));
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [autohide, dock.size]);

  return (
    <>
      <div ref={boundsRef} className="pointer-events-none fixed inset-x-1 bottom-1 top-12" aria-hidden="true" />
      <nav
        aria-label="Dock"
        className={`mh-fixed os-ui pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-2 os-dock-${dock.size} ${dock.labels ? "" : "os-dock-nolabels"} ${
          autohide ? "os-dock-autohide" : ""
        } ${autohide && !revealed ? "os-dock-away" : ""}`}
      >
        <motion.div
          ref={dockRef}
          style={{ x: dockX, y: dockY }}
          drag
          dragControls={controls}
          dragListener={false}
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={boundsRef}
          onDragEnd={() => settleDock()}
          className="os-dock pointer-events-auto flex items-end gap-2.5 px-2.5 py-2 sm:gap-5 sm:px-4"
        >
          <div
            className="os-grille os-dock-grip h-11 w-8 rounded-md sm:w-16"
            onPointerDown={(e) => {
              e.preventDefault();
              controls.start(e);
            }}
            title={dock.stay ? "Drag the dock anywhere; it settles onto the grid." : "Drag the dock; it springs back when you let go."}
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
                  <span className="os-dock-label">{label}</span>
                </span>
              </a>
            );
          })}
          <span className="os-dock-sep mb-5 h-8 w-px bg-[var(--os-line)]" aria-hidden="true" />
          <button type="button" onClick={toggleDashboard} aria-pressed={dashboard} className="os-dock-item" title={dashboard ? "Put widgets away" : "Show widgets"}>
            <span className="os-knob">
              <LayoutDashboard className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <span className="flex items-center gap-1">
              <span className={`os-dot ${dashboard ? "os-dot-on" : ""}`} aria-hidden="true" />
              <span className="os-dock-label">widgets</span>
            </span>
          </button>
          <button
            type="button"
            onClick={minimized ? onRestore : onMinimize}
            className="os-dock-item"
            title={windowState === "closed" ? "Open window" : minimized ? "Show window" : "Hide window"}
          >
            <span className="os-knob">
              <AppWindow className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <span className="flex items-center gap-1">
              <span className="os-dot invisible" aria-hidden="true" />
              <span className="os-dock-label">{windowState === "closed" ? "open" : minimized ? "show" : "hide"}</span>
            </span>
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
  return WALLPAPERS.some((w) => w.id === id) || /^custom-[a-z0-9]+$/i.test(id) ? id : "calm";
}

function applyWallpaper(id) {
  // Your own pictures load from the browser's picture library once the page is running
  if (id.startsWith("custom-")) {
    setTimeout(() => applyCustomWallpaper(id), 0);
    return;
  }
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
  const height = 314;
  const zoom = pageZoom();
  const left = Math.max(8, Math.min(menu.x / zoom, window.innerWidth / zoom - width - 8));
  const top = Math.max(52, Math.min(menu.y / zoom, window.innerHeight / zoom - height - 8));
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
      <button
        role="menuitem"
        type="button"
        className={on}
        onClick={() => {
          setMenu(null);
          saveWidgetsOnDesk(!readWidgetsOnDesk());
        }}
      >
        {readWidgetsOnDesk() ? "hide desktop widgets" : "show desktop widgets"}
      </button>
      <button
        role="menuitem"
        type="button"
        className={on}
        onClick={() => {
          setMenu(null);
          openWidgetGallery();
        }}
      >
        widget gallery…
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
/* ---------- Dock, Windows, Language, and Privacy settings: each kept in its own cookie, like the other preferences ---------- */

const REGION_LOCALES = [
  { id: "en-US", label: "English (US)" },
  { id: "en-GB", label: "English (UK)" },
  { id: "es", label: "Español" },
  { id: "fr", label: "Français" },
  { id: "de", label: "Deutsch" },
  { id: "it", label: "Italiano" },
  { id: "pt-BR", label: "Português (Brasil)" },
  { id: "ja", label: "日本語" },
  { id: "he", label: "עברית" },
];

const TIME_ZONES = [
  { id: "auto", label: "automatic" },
  { id: "America/New_York", label: "Miami · New York" },
  { id: "America/Chicago", label: "Chicago" },
  { id: "America/Denver", label: "Denver" },
  { id: "America/Los_Angeles", label: "Los Angeles" },
  { id: "Pacific/Honolulu", label: "Honolulu" },
  { id: "Europe/London", label: "London" },
  { id: "Europe/Paris", label: "Paris · Berlin · Rome" },
  { id: "Asia/Jerusalem", label: "Jerusalem · Tel Aviv" },
  { id: "Asia/Dubai", label: "Dubai" },
  { id: "Asia/Kolkata", label: "Mumbai · Delhi" },
  { id: "Asia/Tokyo", label: "Tokyo" },
  { id: "Australia/Sydney", label: "Sydney" },
  { id: "UTC", label: "UTC" },
];

const CALENDARS = [
  { id: "gregory", label: "Gregorian" },
  { id: "hebrew", label: "Hebrew" },
  { id: "islamic-umalqura", label: "Islamic (Umm al-Qura)" },
  { id: "persian", label: "Persian" },
  { id: "buddhist", label: "Buddhist" },
  { id: "japanese", label: "Japanese" },
  { id: "chinese", label: "Chinese" },
  { id: "indian", label: "Indian national" },
];

const DOCK_PREFS = {
  cookie: "comcen_dock",
  event: "mh-dock-changed",
  defaults: { size: "medium", labels: true, autohide: false, stay: true },
  allowed: { size: ["small", "medium", "large"] },
};
const WINDOW_PREFS = {
  cookie: "comcen_windows",
  event: "mh-windows-changed",
  defaults: { doubleClick: "maximize", openMaximized: false, animate: true, stay: true },
  allowed: { doubleClick: ["maximize", "minimize", "none"] },
};
const REGION_PREFS = {
  cookie: "comcen_region",
  event: "mh-region-changed",
  defaults: { locale: "en-US", temperature: "f" },
  allowed: { locale: REGION_LOCALES.map((l) => l.id), temperature: ["f", "c"] },
};
const TIME_PREFS = {
  cookie: "comcen_time",
  event: "mh-time-changed",
  defaults: { clock: "12", seconds: false, analog: true, timeZone: "auto", calendar: "gregory" },
  allowed: { clock: ["12", "24"], timeZone: TIME_ZONES.map((z) => z.id), calendar: CALENDARS.map((c) => c.id) },
};

function readPrefs({ cookie, defaults, allowed = {} }) {
  let saved = {};
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${cookie}=([^;]*)`));
    if (match) saved = JSON.parse(decodeURIComponent(match[1])) || {};
  } catch {
    saved = {};
  }
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => {
      const value = saved[key];
      const ok = typeof value === typeof fallback && (!allowed[key] || allowed[key].includes(value));
      return [key, ok ? value : fallback];
    }),
  );
}

function savePrefs(spec, next) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${spec.cookie}=${encodeURIComponent(JSON.stringify(next))}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(spec.event, { detail: next }));
}

function usePrefs(spec) {
  const [prefs, setPrefs] = useState(() => readPrefs(spec));
  useEffect(() => {
    const onChanged = (e) => setPrefs(e.detail);
    window.addEventListener(spec.event, onChanged);
    return () => window.removeEventListener(spec.event, onChanged);
  }, [spec]);
  const update = (patch) => savePrefs(spec, { ...readPrefs(spec), ...patch });
  return [prefs, update];
}

const zoneOf = (time) => (time.timeZone === "auto" ? undefined : time.timeZone);

// Times follow Language (which language) and Date & Time (12 or 24 hours, time zone)
function formatTime(date, { region = readPrefs(REGION_PREFS), time = readPrefs(TIME_PREFS), seconds = false, timeZone } = {}) {
  return date.toLocaleTimeString(region.locale, {
    hour: "numeric",
    minute: "2-digit",
    ...(seconds ? { second: "2-digit" } : {}),
    hourCycle: time.clock === "24" ? "h23" : "h12",
    timeZone: timeZone ?? zoneOf(time),
  });
}

// Hours, minutes, and seconds for clock hands, in the chosen time zone
function clockParts(date, time = readPrefs(TIME_PREFS)) {
  const timeZone = zoneOf(time);
  if (!timeZone) return { h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() };
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", hour: "numeric", minute: "numeric", second: "numeric" })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  return { h: Number(parts.hour) % 24, m: Number(parts.minute), s: Number(parts.second) };
}

/* Usage statistics: Google Analytics and Umami, loaded by index.html only while this is on */
const ANALYTICS_COOKIE = "comcen_analytics";
const ANALYTICS_ID = "G-ZRECP8G16F";

function readAnalyticsOn() {
  return !document.cookie.match(new RegExp(`(?:^|; )${ANALYTICS_COOKIE}=off`));
}

function saveAnalyticsOn(on) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ANALYTICS_COOKIE}=${on ? "on" : "off"}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  window[`ga-disable-${ANALYTICS_ID}`] = !on; // stops this visit too, not just the next one
  // Umami's own off switch, so it also stops for the rest of this visit
  if (on) {
    try {
      localStorage.removeItem("umami.disabled");
    } catch {
      /* ignore */
    }
    return;
  }
  writeStore("localStorage", "umami.disabled", "1");
  // Clear the cookies Google Analytics already set, on this host and the parent domain
  const host = window.location.hostname;
  document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid")
    .forEach((name) => {
      [host, `.${host.replace(/^www\./, "")}`].forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
      });
      document.cookie = `${name}=; Max-Age=0; Path=/`;
    });
}

// Everything comcen os keeps on this browser, for the Privacy pane
const STORED_ITEMS = [
  { label: "theme", key: "comcen_theme" },
  { label: "wallpaper", key: "comcen_wallpaper" },
  { label: "screen saver", key: "comcen_screensaver" },
  { label: "sound", key: "comcen_sound" },
  { label: "dock", key: "comcen_dock" },
  { label: "windows", key: "comcen_windows" },
  { label: "language", key: "comcen_region" },
  { label: "date and time", key: "comcen_time" },
  { label: "usage statistics choice", key: "comcen_analytics" },
  { label: "desktop widgets", key: "comcen_widgets" },
  { label: "widget layout", key: "comcen_widget_layout" },
  { label: "window position", key: "comcen_window_pos" },
  { label: "dock position", key: "comcen_dock_pos" },
  { label: "menu bar order", key: "comcen_menubar" },
  { label: "radio station", key: "comcen_radio_station" },
  { label: "weather location", key: "comcen_weather" },
  { label: "internet trial", key: "comcen_trial_end" },
  { label: "registration", key: "comcen_license" },
  { label: "startup screen seen", key: "mh-booted" },
  { label: "users", key: "comcen_users" },
  { label: "signed-in user", key: "comcen_user" },
  { label: "other users' preferences", key: "comcen_user_prefs" },
  { label: "automatic updates", key: "comcen_updates" },
  { label: "network", key: "comcen_network" },
  { label: "mesh radio station", key: "comcen_mesh" },
  { label: "MeshMonitor connection", key: "comcen_meshmonitor" },
  { label: "note", key: "comcen_note" },
  { label: "sticky notes", key: "comcen_notes" },
  { label: "converter", key: "comcen_convert" },
  { label: "translator languages", key: "comcen_translate" },
  { label: "tracked flight", key: "comcen_flight" },
  { label: "stock watchlist", key: "comcen_stocks" },
  { label: "Finnhub key", key: "comcen_finnhub" },
  { label: "world clock", key: "comcen_worldclock" },
  { label: "displays", key: "comcen_display" },
  { label: "power", key: "comcen_power" },
  { label: "keyboard", key: "comcen_keyboard" },
  { label: "pointer", key: "comcen_pointer" },
  { label: "printing", key: "comcen_print" },
  { label: "voice", key: "comcen_voice" },
  { label: "boot drive", key: "comcen_boot" },
  { label: "accessibility", key: "comcen_access" },
];

const ownKey = (name) => name.startsWith("comcen_") || name.startsWith("mh-");

function isStored(key) {
  return readStore("localStorage", key) !== null || new RegExp(`(?:^|; )${key}=`).test(document.cookie);
}

function deleteEverything() {
  const statsOff = !readAnalyticsOn(); // deleting preferences never turns tracking back on
  document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter(ownKey)
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    });
  try {
    Object.keys(localStorage).filter(ownKey).forEach((key) => localStorage.removeItem(key));
    Object.keys(sessionStorage).filter(ownKey).forEach((key) => sessionStorage.removeItem(key));
  } catch {
    /* storage blocked: nothing was saved there */
  }
  if (statsOff) saveAnalyticsOn(false);
  // Your pictures live in IndexedDB; give the browser a moment to drop them, then restart
  const restart = () => window.location.reload();
  try {
    const request = indexedDB.deleteDatabase(PICTURES_DB);
    request.onsuccess = restart;
    request.onerror = restart;
    request.onblocked = restart;
    setTimeout(restart, 1500);
  } catch {
    restart();
  }
}

/* Pane building blocks */
function PaneHeader({ title, children }) {
  return (
    <>
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
        {title}
      </div>
      <p className="mb-4 text-[13px] text-[var(--os-ink-3)]">{children}</p>
    </>
  );
}

function PrefSwitch({ label, hint, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span>
        <span className="block">{label}</span>
        {hint && <span className="block text-[12px] text-[var(--os-ink-3)]">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`os-switch ${checked ? "os-switch-on" : ""} shrink-0 cursor-pointer`}
      />
    </div>
  );
}

function PrefChoice({ label, options, value, onChange, columns = options.length }) {
  return (
    <div className="text-[13px]">
      <div className="mb-1.5">{label}</div>
      <div role="radiogroup" aria-label={label} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className={`prefs-option flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] ring-1 ${
                active ? "bg-[var(--os-hover)] ring-[var(--os-accent)]" : "ring-[var(--os-line)]"
              }`}
            >
              <span className={`os-dot shrink-0 ${active ? "os-dot-on" : ""}`} aria-hidden="true" />
              <span className="truncate">{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DockPane() {
  const [dock, setDock] = usePrefs(DOCK_PREFS);
  return (
    <div className="p-5">
      <PaneHeader title="dock">The hi-fi panel along the bottom of the screen.</PaneHeader>
      <div className="flex flex-col gap-5">
        <PrefChoice
          label="size"
          value={dock.size}
          onChange={(size) => setDock({ size })}
          options={[
            { id: "small", label: "small" },
            { id: "medium", label: "medium" },
            { id: "large", label: "large" },
          ]}
        />
        <PrefSwitch label="show labels" hint="Names under each button." checked={dock.labels} onChange={(labels) => setDock({ labels })} />
        <PrefSwitch
          label="hide the dock automatically"
          hint="It slides away until you move the pointer to the bottom of the screen. Touch screens always show it."
          checked={dock.autohide}
          onChange={(autohide) => setDock({ autohide })}
        />
        <PrefSwitch
          label="dock stays where you drop it"
          hint={
            dock.stay
              ? "Drag the dock by its speaker grille; it settles onto an invisible grid and stays on screen."
              : "The dock springs back to the bottom of the screen when you let go."
          }
          checked={dock.stay}
          onChange={(stay) => setDock({ stay })}
        />
        {dock.stay && (
          <div className="flex justify-end">
            <button type="button" onClick={() => window.dispatchEvent(new Event("mh-dock-reset"))} className="rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
              put the dock back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WindowsPane() {
  const [win, setWin] = usePrefs(WINDOW_PREFS);
  return (
    <div className="p-5">
      <PaneHeader title="windows">How the command center window behaves.</PaneHeader>
      <div className="flex flex-col gap-5">
        <PrefChoice
          label="double-click a title bar to"
          value={win.doubleClick}
          onChange={(doubleClick) => setWin({ doubleClick })}
          options={[
            { id: "maximize", label: "maximize" },
            { id: "minimize", label: "minimize" },
            { id: "none", label: "do nothing" },
          ]}
        />
        <PrefSwitch
          label="open pages maximized"
          hint="Each page fills the screen under the menu bar."
          checked={win.openMaximized}
          onChange={(openMaximized) => setWin({ openMaximized })}
        />
        <PrefSwitch
          label="animate windows"
          hint="Windows grow and shrink as they open, minimize, and close."
          checked={win.animate}
          onChange={(animate) => setWin({ animate })}
        />
        <PrefSwitch
          label="windows stay where you drop them"
          hint={
            win.stay
              ? "Drag a window by its title bar; it settles onto an invisible grid and stays on screen."
              : "Windows spring back to their usual place when you let go."
          }
          checked={win.stay}
          onChange={(stay) => setWin({ stay })}
        />
        {win.stay && (
          <div className="flex justify-end">
            <button type="button" onClick={() => window.dispatchEvent(new Event("mh-window-reset"))} className="rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
              center the window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LanguagePane() {
  const [region, setRegion] = usePrefs(REGION_PREFS);
  const now = useClock();
  return (
    <div className="p-5">
      <PaneHeader title="language">
        Dates, days, and times follow the language you choose. Menus and pages stay in English.
      </PaneHeader>
      <div className="flex flex-col gap-5">
        <PrefChoice
          label="dates and times in"
          value={region.locale}
          onChange={(locale) => setRegion({ locale })}
          options={REGION_LOCALES}
          columns={2}
        />
        <PrefChoice
          label="temperature"
          value={region.temperature}
          onChange={(temperature) => setRegion({ temperature })}
          options={[
            { id: "f", label: "Fahrenheit (°F)" },
            { id: "c", label: "Celsius (°C)" },
          ]}
        />
        <p className="text-[12px] text-[var(--os-ink-3)]">
          Today: <span dir="auto">{formatMenuDate(now, { region })}</span>, <span dir="auto">{formatTime(now, { region })}</span>. The clock format, time zone, and
          calendar are in{" "}
          <button type="button" onClick={() => openPreferences("datetime")} className="underline underline-offset-2 hover:text-[var(--os-ink)]">
            Date &amp; Time
          </button>
          .
        </p>
      </div>
    </div>
  );
}

function DateTimePane() {
  const [time, setTime] = usePrefs(TIME_PREFS);
  const [region] = usePrefs(REGION_PREFS);
  const now = useClock();
  const timeZone = zoneOf(time);
  const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const longDate = now.toLocaleDateString(region.locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    calendar: time.calendar,
    timeZone,
  });
  const select =
    "w-full rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]";

  return (
    <div className="p-5">
      <PaneHeader title="date & time">For the menu bar, the clock widget, the screen saver, and the Buddy List.</PaneHeader>

      <div className="mb-5 flex items-center gap-4 rounded-xl p-4 ring-1 ring-[var(--os-line)]">
        <AnalogClock now={now} time={time} className="h-16 w-16 shrink-0" />
        <div className="min-w-0">
          <div className="text-[28px] font-semibold leading-tight tracking-tight tabular-nums" dir="auto">
            {formatTime(now, { region, time, seconds: true })}
          </div>
          <div className="truncate text-[13px] text-[var(--os-ink-2)]" dir="auto">
            {longDate}
          </div>
          <div className="truncate text-[12px] text-[var(--os-ink-3)]">{timeZone || `automatic · ${deviceZone}`}</div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <PrefChoice
          label="clock"
          value={time.clock}
          onChange={(clock) => setTime({ clock })}
          options={[
            { id: "12", label: `12-hour · ${formatTime(now, { region, time: { ...time, clock: "12" } })}` },
            { id: "24", label: `24-hour · ${formatTime(now, { region, time: { ...time, clock: "24" } })}` },
          ]}
        />
        <PrefSwitch label="show seconds in the menu bar" checked={time.seconds} onChange={(seconds) => setTime({ seconds })} />
        <PrefSwitch label="show the analog clock in the menu bar" checked={time.analog} onChange={(analog) => setTime({ analog })} />

        <div className="grid gap-4 text-[13px] sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span>time zone</span>
            <select value={time.timeZone} onChange={(e) => setTime({ timeZone: e.target.value })} className={select}>
              {TIME_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.id === "auto" ? `automatic (${deviceZone})` : z.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span>calendar</span>
            <select value={time.calendar} onChange={(e) => setTime({ calendar: e.target.value })} className={select}>
              {CALENDARS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="text-[12px] text-[var(--os-ink-3)]">
          The language for dates is set in{" "}
          <button type="button" onClick={() => openPreferences("language")} className="underline underline-offset-2 hover:text-[var(--os-ink)]">
            Language
          </button>
          .
        </p>
      </div>
    </div>
  );
}

function PrivacyPane() {
  const [analytics, setAnalytics] = useState(readAnalyticsOn);
  const [place, setPlace] = useState(() => readWeatherPrefs().place);
  const [confirming, setConfirming] = useState(false);
  const usingLocation = place.name !== WEATHER_HOME.name;
  const stored = STORED_ITEMS.filter((item) => isStored(item.key));

  return (
    <div className="p-5">
      <PaneHeader title="privacy">What comcen os keeps, what it shares, and how to clear it.</PaneHeader>
      <div className="flex flex-col gap-5">
        <PrefSwitch
          label="share anonymous usage statistics"
          hint="Page visits are counted with Google Analytics and with Umami, run on analytics.maxhayim.com. Turning this off stops both and deletes Google's cookies."
          checked={analytics}
          onChange={(on) => {
            saveAnalyticsOn(on);
            setAnalytics(on);
          }}
        />

        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span>
            <span className="block">location</span>
            <span className="block text-[12px] text-[var(--os-ink-3)]">
              {usingLocation
                ? "The weather widget is using your location, rounded to about a kilometer. It's kept only on this browser."
                : `The weather widget shows ${WEATHER_HOME.name}. Your location is used only if you press its locate button.`}
            </span>
          </span>
          <button
            type="button"
            disabled={!usingLocation}
            onClick={() => {
              saveWeatherPlace(WEATHER_HOME);
              setPlace(WEATHER_HOME);
            }}
            className="shrink-0 rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)] disabled:opacity-40 disabled:hover:bg-transparent"
          >
            stop using
          </button>
        </div>

        <div className="text-[13px]">
          <div className="mb-1.5">saved on this browser</div>
          {stored.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {stored.map((item) => (
                <li key={item.key} className="rounded-full px-2.5 py-0.5 text-[12px] ring-1 ring-[var(--os-line)]">
                  {item.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12px] text-[var(--os-ink-3)]">Nothing yet. Everything is at its default.</p>
          )}
          <p className="mt-2 text-[12px] text-[var(--os-ink-3)]">Nothing here leaves your browser.</p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 text-[13px]">
          {confirming ? (
            <>
              <span className="mr-auto text-[12px] text-[var(--os-ink-2)]">Delete every preference, the widget layout, users, your pictures, and registration, then restart? Usage statistics stay off if you turned them off.</span>
              <button type="button" onClick={() => setConfirming(false)} className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
                cancel
              </button>
              <button type="button" onClick={deleteEverything} className="rounded-full bg-[var(--os-warn)] px-3 py-1 font-semibold text-white hover:brightness-105">
                delete
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={!stored.length}
              onClick={() => setConfirming(true)}
              className="rounded-full px-3 py-1 text-[var(--os-warn)] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)] disabled:opacity-40 disabled:hover:bg-transparent"
            >
              delete my preferences…
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Users: Max Hayim owns this computer; visitors can add their own user on their browser ----------
   No passwords. Each user's preferences (theme, wallpaper, widgets, and the rest) are set aside when someone
   else signs in and brought back when they return. Photos are shrunk to a small square and kept locally. */

const OWNER = { id: "max", name: "Max Hayim", handle: "maxhayim", photo: "/avatar.jpg", owner: true };
const USERS_KEY = "comcen_users"; // the visitors' accounts
const USER_COOKIE = "comcen_user"; // who's signed in
const USER_PREFS_KEY = "comcen_user_prefs"; // everyone else's preferences, while they're signed out
const USER_COLORS = ["#e8591a", "#c8371a", "#b8860b", "#3f7f33", "#46687a", "#2f5d8a", "#6b5b95", "#55534e"];
const USER_NAME_MAX = 24;
const USER_PHOTO_PX = 160;
// Belong to the computer, not to one user
const MACHINE_KEYS = new Set([USERS_KEY, USER_COOKIE, USER_PREFS_KEY, "comcen_analytics", "comcen_trial_end", "comcen_license", "mh-booted"]);

function readJSON(key, fallback) {
  try {
    return JSON.parse(readStore("localStorage", key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function readUsers() {
  const saved = readJSON(USERS_KEY, []);
  const visitors = (Array.isArray(saved) ? saved : [])
    .filter((u) => u && typeof u.id === "string" && typeof u.name === "string" && u.id !== OWNER.id)
    .map((u) => ({
      id: u.id,
      name: u.name.slice(0, USER_NAME_MAX),
      color: USER_COLORS.includes(u.color) ? u.color : USER_COLORS[0],
      photo: typeof u.photo === "string" && u.photo.startsWith("data:image/") ? u.photo : null,
    }));
  return [OWNER, ...visitors];
}

function writeVisitors(users) {
  writeStore("localStorage", USERS_KEY, JSON.stringify(users.filter((u) => !u.owner).map(({ id, name, color, photo }) => ({ id, name, color, photo }))));
  window.dispatchEvent(new Event("mh-users-changed"));
}

function currentUserId(users = readUsers()) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${USER_COOKIE}=([^;]*)`));
  const id = match ? decodeURIComponent(match[1]) : OWNER.id;
  return users.some((u) => u.id === id) ? id : OWNER.id;
}

function useUsers() {
  const [users, setUsers] = useState(readUsers);
  useEffect(() => {
    const onChanged = () => setUsers(readUsers());
    window.addEventListener("mh-users-changed", onChanged);
    return () => window.removeEventListener("mh-users-changed", onChanged);
  }, []);
  const current = users.find((u) => u.id === currentUserId(users)) || OWNER;
  return { users, current };
}

// One user's preferences: their comcen_ cookies and browser storage, minus what belongs to the computer
const userCookieNames = () =>
  document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter((name) => name.startsWith("comcen_") && !MACHINE_KEYS.has(name));
const userStorageKeys = () => {
  try {
    return Object.keys(localStorage).filter((key) => key.startsWith("comcen_") && !MACHINE_KEYS.has(key));
  } catch {
    return [];
  }
};

function collectUserPrefs() {
  const cookies = {};
  document.cookie.split("; ").forEach((c) => {
    const i = c.indexOf("=");
    const name = c.slice(0, i);
    if (userCookieNames().includes(name)) cookies[name] = c.slice(i + 1);
  });
  const local = Object.fromEntries(userStorageKeys().map((key) => [key, readStore("localStorage", key)]));
  return { cookies, local };
}

function clearUserPrefs() {
  userCookieNames().forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  });
  userStorageKeys().forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  });
}

function applyUserPrefs(bundle) {
  if (!bundle) return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  Object.entries(bundle.cookies || {}).forEach(([name, value]) => {
    document.cookie = `${name}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  });
  Object.entries(bundle.local || {}).forEach(([key, value]) => writeStore("localStorage", key, value));
}

function setUserCookie(id) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${USER_COOKIE}=${encodeURIComponent(id)}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
}

// Sign in as someone else: put the current user's preferences away, bring theirs back, and restart
function switchUser(id, { saveCurrent = true } = {}) {
  const from = currentUserId();
  if (id === from) return;
  radioStop();
  const saved = readJSON(USER_PREFS_KEY, {});
  if (saveCurrent) saved[from] = collectUserPrefs();
  clearUserPrefs();
  applyUserPrefs(saved[id]);
  delete saved[id];
  writeStore("localStorage", USER_PREFS_KEY, JSON.stringify(saved));
  setUserCookie(id);
  window.location.reload();
}

function addUser({ name, color, photo }) {
  const user = { id: `u${Date.now().toString(36)}`, name, color, photo };
  writeVisitors([...readUsers(), user]);
  return user.id;
}

function updateUser(id, patch) {
  writeVisitors(readUsers().map((u) => (u.id === id && !u.owner ? { ...u, ...patch } : u)));
}

async function removeUser(id) {
  if (id === OWNER.id) return;
  await deletePicturesOf(id).catch(() => {}); // their wallpapers and photos go with them
  const saved = readJSON(USER_PREFS_KEY, {});
  delete saved[id];
  writeStore("localStorage", USER_PREFS_KEY, JSON.stringify(saved));
  const wasCurrent = currentUserId() === id;
  writeVisitors(readUsers().filter((u) => u.id !== id));
  if (wasCurrent) switchUser(OWNER.id, { saveCurrent: false });
}

// Crop to a centered square and shrink, so a phone photo becomes a few kilobytes
function shrinkPhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("That file isn't a picture."));
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      reject(new Error("That picture is too large (20 MB at most)."));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      const canvas = document.createElement("canvas");
      canvas.width = USER_PHOTO_PX;
      canvas.height = USER_PHOTO_PX;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, USER_PHOTO_PX, USER_PHOTO_PX);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That picture couldn't be opened."));
    };
    img.src = url;
  });
}

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => [...w][0] || "")
    .join("")
    .toUpperCase();

function UserAvatar({ user, className = "h-10 w-10 rounded-lg text-[14px]" }) {
  if (user.photo) return <img src={user.photo} alt="" className={`${className} shrink-0 object-cover`} />;
  return (
    <span className={`${className} inline-flex shrink-0 items-center justify-center font-semibold text-white`} style={{ background: user.color }} aria-hidden="true">
      {initials(user.name) || "?"}
    </span>
  );
}

// Menu bar: who's signed in; click for Users
function UserMenuButton() {
  const { current } = useUsers();
  return (
    <button
      type="button"
      onClick={() => openPreferences("users")}
      title={`Signed in as ${current.name}. Users & switching`}
      aria-label={`Signed in as ${current.name}. Open users.`}
      className="flex h-8 items-center gap-1.5 rounded-full px-1.5 hover:bg-[var(--os-hover)] sm:px-2"
    >
      <UserAvatar user={current} className="h-5 w-5 rounded-full text-[9px]" />
      <span className="hidden max-w-[9rem] truncate lg:inline">{current.name}</span>
    </button>
  );
}

function UserForm({ initial, onCancel, onSave, saveLabels }) {
  const [name, setName] = useState(initial?.name || "");
  const [color, setColor] = useState(() => initial?.color || USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]);
  const [photo, setPhoto] = useState(initial?.photo || null);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const { users } = useUsers();
  const trimmed = name.trim();
  const taken = users.some((u) => u.id !== initial?.id && u.name.toLowerCase() === trimmed.toLowerCase());
  const problem = !trimmed ? "" : taken ? "Someone already has that name." : "";

  const pick = async (file) => {
    setError("");
    try {
      setPhoto(await shrinkPhoto(file));
    } catch (e) {
      setError(e.message);
    }
  };

  const submit = (signIn) => {
    if (!trimmed || problem) return;
    onSave({ name: trimmed, color, photo }, signIn);
  };

  return (
    <form
      className="rounded-xl p-4 ring-1 ring-[var(--os-line)]"
      onSubmit={(e) => {
        e.preventDefault();
        submit(false);
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <UserAvatar user={{ name: trimmed || "?", color, photo }} className="h-16 w-16 rounded-xl text-[22px]" />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              pick(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <button type="button" onClick={() => fileRef.current?.click()} className="text-[12px] underline underline-offset-2 hover:text-[var(--os-ink)]">
            {photo ? "change photo" : "upload photo"}
          </button>
          {photo && (
            <button type="button" onClick={() => setPhoto(null)} className="text-[12px] text-[var(--os-ink-3)] underline underline-offset-2 hover:text-[var(--os-ink)]">
              remove photo
            </button>
          )}
        </div>
        <div className="min-w-0 flex-1 text-[13px]">
          <label className="flex flex-col gap-1.5">
            <span>name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, USER_NAME_MAX))}
              maxLength={USER_NAME_MAX}
              autoComplete="off"
              autoFocus
              placeholder="Your name"
              className="w-full rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]"
            />
          </label>
          <div className="mt-3">
            <div className="mb-1.5">{photo ? "color (used if you remove the photo)" : "color"}</div>
            <div role="radiogroup" aria-label="Color" className="flex flex-wrap gap-2">
              {USER_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={c === color}
                  aria-label={c}
                  onClick={() => setColor(c)}
                  className={`h-6 w-6 rounded-full ${c === color ? "ring-2 ring-[var(--os-accent)] ring-offset-2 ring-offset-[var(--os-case)]" : ""}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
          {(problem || error) && <p className="mt-2 text-[12px] text-[var(--os-warn)]">{problem || error}</p>}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2 text-[13px]">
        <button type="button" onClick={onCancel} className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
          cancel
        </button>
        <button type="submit" disabled={!trimmed || !!problem} className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] disabled:opacity-40">
          {saveLabels[0]}
        </button>
        {saveLabels[1] && (
          <button
            type="button"
            disabled={!trimmed || !!problem}
            onClick={() => submit(true)}
            className="rounded-full bg-[var(--os-accent)] px-3 py-1 font-semibold text-white hover:brightness-105 disabled:opacity-40"
          >
            {saveLabels[1]}
          </button>
        )}
      </div>
    </form>
  );
}

function UsersPane() {
  const { users, current } = useUsers();
  const [form, setForm] = useState(null); // null, "new", or a user id being edited
  const [confirmDelete, setConfirmDelete] = useState(null);
  const editing = users.find((u) => u.id === form);

  return (
    <div className="p-5">
      <PaneHeader title="users">
        People who use comcen os on this browser. Each user has their own theme, wallpaper, widgets, and other preferences. There are no
        passwords: anyone using this browser can switch users.
      </PaneHeader>

      <ul className="divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
        {users.map((u) => {
          const signedIn = u.id === current.id;
          return (
            <li key={u.id} className="flex flex-wrap items-center gap-3 px-3 py-2.5 text-[13px]">
              <UserAvatar user={u} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{u.name}</span>
                <span className="flex items-center gap-1.5 text-[12px] text-[var(--os-ink-3)]">
                  {signedIn && <span className="widget-led widget-led-on" aria-hidden="true" />}
                  {[u.owner ? "owner" : "visitor", signedIn ? "signed in" : null].filter(Boolean).join(" · ")}
                </span>
              </span>
              {confirmDelete === u.id ? (
                <span className="flex items-center gap-2">
                  <span className="text-[12px] text-[var(--os-ink-2)]">Delete {u.name} and their preferences?</span>
                  <button type="button" onClick={() => setConfirmDelete(null)} className="rounded-full px-2.5 py-0.5 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
                    cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmDelete(null);
                      removeUser(u.id);
                    }}
                    className="rounded-full bg-[var(--os-warn)] px-2.5 py-0.5 font-semibold text-white"
                  >
                    delete
                  </button>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {!u.owner && (
                    <>
                      <button type="button" onClick={() => setForm(u.id)} className="rounded-full px-2.5 py-0.5 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
                        edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(u.id)}
                        className="rounded-full px-2.5 py-0.5 text-[var(--os-warn)] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]"
                      >
                        delete
                      </button>
                    </>
                  )}
                  {!signedIn && (
                    <button type="button" onClick={() => switchUser(u.id)} className="rounded-full bg-[var(--os-accent)] px-2.5 py-0.5 font-semibold text-white hover:brightness-105">
                      sign in
                    </button>
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        {form === "new" ? (
          <UserForm
            key="new"
            saveLabels={["add", "add and sign in"]}
            onCancel={() => setForm(null)}
            onSave={(details, signIn) => {
              const id = addUser(details);
              setForm(null);
              if (signIn) switchUser(id);
            }}
          />
        ) : editing ? (
          <UserForm
            key={editing.id}
            initial={editing}
            saveLabels={["save"]}
            onCancel={() => setForm(null)}
            onSave={(details) => {
              updateUser(editing.id, details);
              setForm(null);
            }}
          />
        ) : (
          <div className="flex justify-end text-[13px]">
            <button type="button" onClick={() => setForm("new")} className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
              add user…
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-[12px] text-[var(--os-ink-3)]">Names and photos stay on this browser. Nothing is uploaded.</p>
    </div>
  );
}

/* ---------- Updates: releases come from this site's GitHub repository ---------- */

const RELEASES_API = "https://api.github.com/repos/maxhayim/maxhayim.github.io/releases?per_page=30";
const RELEASES_PAGE = "https://github.com/maxhayim/maxhayim.github.io/releases";
const RELEASES_CACHE_KEY = "comcen_releases"; // session only, to stay well inside GitHub's rate limit
const RELEASES_CACHE_MS = 10 * 60 * 1000;
const UPDATE_CHECK_MS = 30 * 60 * 1000;
const UPDATES_PREFS = { cookie: "comcen_updates", event: "mh-updates-changed", defaults: { auto: true } };

function compareVersions(a, b) {
  const parse = (v) => String(v).replace(/^v/, "").split(".").map((n) => Number.parseInt(n, 10) || 0);
  const [x, y] = [parse(a), parse(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0) ? 1 : -1;
  }
  return 0;
}

const updates = { status: "idle", releases: [], checkedAt: null, listeners: new Set() }; // status: idle | checking | ok | error

function setUpdates(patch) {
  Object.assign(updates, patch);
  updates.listeners.forEach((listener) => listener());
}

async function checkForUpdates({ force = false } = {}) {
  if (updates.status === "checking") return;
  if (!force) {
    try {
      const cached = JSON.parse(sessionStorage.getItem(RELEASES_CACHE_KEY) || "null");
      if (cached && Date.now() - cached.at < RELEASES_CACHE_MS) {
        setUpdates({ status: "ok", releases: cached.releases, checkedAt: cached.at });
        return;
      }
    } catch {
      /* no cache */
    }
  }
  setUpdates({ status: "checking" });
  try {
    const response = await fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error("releases");
    const releases = (await response.json())
      .filter((r) => !r.draft && !r.prerelease)
      .map((r) => ({ tag: r.tag_name, name: r.name || r.tag_name, date: r.published_at, body: r.body || "", url: r.html_url }))
      .sort((a, b) => compareVersions(b.tag, a.tag));
    const at = Date.now();
    try {
      sessionStorage.setItem(RELEASES_CACHE_KEY, JSON.stringify({ at, releases }));
    } catch {
      /* fine without a cache */
    }
    setUpdates({ status: "ok", releases, checkedAt: at });
  } catch {
    setUpdates({ status: "error", checkedAt: Date.now() });
  }
}

function useUpdates() {
  const [, rerender] = useState(0);
  useEffect(() => {
    const listener = () => rerender((n) => n + 1);
    updates.listeners.add(listener);
    return () => updates.listeners.delete(listener);
  }, []);
  const latest = updates.releases[0];
  return { ...updates, latest, available: latest && compareVersions(latest.tag, OS_VERSION) > 0 ? latest : null };
}

// Checks on start and every half hour while automatic updates are on
function useAutoUpdateCheck() {
  const [prefs] = usePrefs(UPDATES_PREFS);
  useEffect(() => {
    if (!prefs.auto) return;
    checkForUpdates();
    const id = setInterval(() => checkForUpdates({ force: true }), UPDATE_CHECK_MS);
    return () => clearInterval(id);
  }, [prefs.auto]);
}

// Release notes are Markdown; this covers what they use: headings, bullets (one level of nesting), bold, links, code
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|`[^`]+`)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noreferrer" className="underline underline-offset-2">
          {link[1]}
        </a>
      );
    }
    if (/^`[^`]+`$/.test(part)) return <code key={i}>{part.slice(1, -1)}</code>;
    return part;
  });
}

function ReleaseNotes({ body }) {
  const blocks = [];
  let list = null;
  body
    .replace(/\r/g, "")
    .split("\n")
    .forEach((line) => {
      const bullet = line.match(/^(\s*)[-*] (.*)$/);
      if (bullet) {
        if (!list) {
          list = [];
          blocks.push({ type: "list", items: list });
        }
        if (bullet[1].length >= 2 && list.length) {
          const parent = list[list.length - 1];
          parent.children = [...(parent.children || []), bullet[2]];
        } else {
          list.push({ text: bullet[2] });
        }
        return;
      }
      list = null;
      const heading = line.match(/^#{1,6}\s+(.*)$/);
      if (heading) blocks.push({ type: "h", text: heading[1] });
      else if (line.trim()) blocks.push({ type: "p", text: line.trim() });
    });

  return (
    <div className="release-notes text-[13px] leading-6 text-[var(--os-ink-2)]">
      {blocks.map((b, i) =>
        b.type === "h" ? (
          <h5 key={i} className="mt-3 font-semibold text-[var(--os-ink)]">
            {renderInline(b.text)}
          </h5>
        ) : b.type === "p" ? (
          <p key={i} className="mt-2">
            {renderInline(b.text)}
          </p>
        ) : (
          <ul key={i} className="mt-1 list-disc pl-5">
            {b.items.map((item, j) => (
              <li key={j}>
                {renderInline(item.text)}
                {item.children && (
                  <ul className="list-[circle] pl-5">
                    {item.children.map((child, k) => (
                      <li key={k}>{renderInline(child)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function UpdatesPane() {
  const state = useUpdates();
  const [prefs, setPrefs] = usePrefs(UPDATES_PREFS);
  const [region] = usePrefs(REGION_PREFS);

  useEffect(() => {
    checkForUpdates();
  }, []);

  const day = (iso) => new Date(iso).toLocaleDateString(region.locale, { year: "numeric", month: "short", day: "numeric" });
  const status =
    state.status === "checking"
      ? "Checking GitHub for updates…"
      : state.status === "error"
        ? "Couldn't reach GitHub. Try again in a little while."
        : state.available
          ? `${state.available.name} is available.`
          : state.status === "ok"
            ? "comcen os is up to date."
            : "";

  return (
    <div className="p-5">
      <PaneHeader title="updates">
        New versions are published as releases on GitHub. The site updates itself when it&rsquo;s published; restarting picks it up.
      </PaneHeader>

      <div className="mb-5 flex flex-wrap items-center gap-4 rounded-xl p-4 ring-1 ring-[var(--os-line)]">
        <img src="/logo_fullclear.png" alt="" className="os-logo h-10 w-auto" />
        <div className="min-w-0 flex-1">
          <div className="text-[17px] font-semibold tracking-tight">comcen os I</div>
          <div className="text-[13px] text-[var(--os-ink-2)]">version {OS_VERSION}</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-[var(--os-ink-3)]" aria-live="polite">
            <span className={`widget-led ${state.available ? "update-led" : state.status === "ok" ? "widget-led-on" : ""}`} aria-hidden="true" />
            {status}
            {state.checkedAt && state.status !== "checking" && <span>· checked {formatTime(new Date(state.checkedAt), { region })}</span>}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-[13px]">
          {state.available ? (
            <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-[var(--os-accent)] px-3 py-1 font-semibold text-white hover:brightness-105">
              restart to update
            </button>
          ) : (
            <button
              type="button"
              disabled={state.status === "checking"}
              onClick={() => checkForUpdates({ force: true })}
              className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] disabled:opacity-40"
            >
              check now
            </button>
          )}
        </div>
      </div>

      <PrefSwitch
        label="check for updates automatically"
        hint="Looks for a new release on GitHub every half hour while comcen os is open, and lets you know in the system menu."
        checked={prefs.auto}
        onChange={(auto) => setPrefs({ auto })}
      />

      <div className="mt-6 flex items-center justify-between gap-3">
        <h4 className="text-[13px] font-semibold">release history</h4>
        <a href={RELEASES_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12px] underline underline-offset-2 hover:text-[var(--os-ink)]">
          on GitHub <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
      {state.releases.length ? (
        <div className="mt-2 divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
          {state.releases.map((r, i) => {
            const installed = compareVersions(r.tag, OS_VERSION) === 0;
            return (
              <details key={r.tag} open={i === 0} className="release group px-3 py-2">
                <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px]">
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--os-ink-3)] transition-transform group-open:rotate-90" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate font-semibold">{r.name}</span>
                  {installed && <span className="rounded-full px-2 py-0.5 text-[11px] ring-1 ring-[var(--os-accent)]">installed</span>}
                  <span className="shrink-0 text-[12px] text-[var(--os-ink-3)]">{day(r.date)}</span>
                </summary>
                <div className="pb-2 pl-5">
                  <ReleaseNotes body={r.body} />
                  <a href={r.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[12px] text-[var(--os-ink-3)] underline underline-offset-2 hover:text-[var(--os-ink)]">
                    view {r.tag} on GitHub
                  </a>
                </div>
              </details>
            );
          })}
        </div>
      ) : (
        <p className="mt-2 text-[12px] text-[var(--os-ink-3)]">{state.status === "checking" ? "Loading releases…" : "No releases to show yet."}</p>
      )}
    </div>
  );
}

/* ---------- Connections: Network, Mesh Radio, and File Sharing ---------- */

const NETWORK_PREFS = { cookie: "comcen_network", event: "mh-network-changed", defaults: { menubar: true } };
const PING_URL = "/logo_fullclear_favicon.ico";
// Same-site files for the speed test: the wallpapers, about 1.2 MB together
const SPEED_TEST_FILES = ["/wallpaper/system6-fish.jpg", "/wallpaper/system6-wetleaf.jpg", "/wallpaper/system6-calm.jpg", "/wallpaper/system6-abstractgreen.jpg"];

function useOnline() {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}

// What the browser will say about the connection (Chrome and Android do; Safari and Firefox don't)
function useConnectionInfo() {
  const read = () => {
    const c = navigator.connection;
    return c ? { type: c.effectiveType, downlink: c.downlink, rtt: c.rtt, saveData: c.saveData } : null;
  };
  const [info, setInfo] = useState(read);
  useEffect(() => {
    const c = navigator.connection;
    if (!c?.addEventListener) return;
    const update = () => setInfo(read());
    c.addEventListener("change", update);
    return () => c.removeEventListener("change", update);
  }, []);
  return info;
}

async function measureLatency(samples = 5) {
  const times = [];
  for (let i = 0; i < samples; i++) {
    const start = performance.now();
    await fetch(`${PING_URL}?ping=${Date.now()}-${i}`, { method: "HEAD", cache: "no-store" });
    times.push(performance.now() - start);
  }
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const jitter = times.slice(1).reduce((sum, t, i) => sum + Math.abs(t - times[i]), 0) / Math.max(1, times.length - 1);
  return { min: Math.min(...times), avg, jitter };
}

async function measureSpeed() {
  const start = performance.now();
  let bytes = 0;
  for (const file of SPEED_TEST_FILES) {
    const response = await fetch(`${file}?speed=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("speed");
    bytes += (await response.arrayBuffer()).byteLength;
  }
  const seconds = (performance.now() - start) / 1000;
  return { mbps: (bytes * 8) / seconds / 1e6, megabytes: bytes / 1e6, seconds };
}

function NetworkPane() {
  const [prefs, setPrefs] = usePrefs(NETWORK_PREFS);
  const online = useOnline();
  const info = useConnectionInfo();
  const [latency, setLatency] = useState(null); // { min, avg, jitter } | "running" | "error"
  const [speed, setSpeed] = useState(null); // { mbps, megabytes, seconds } | "running" | "error"
  const secure = window.location.protocol === "https:";

  const run = async (kind) => {
    const [set, test] = kind === "latency" ? [setLatency, measureLatency] : [setSpeed, measureSpeed];
    set("running");
    try {
      set(await test());
    } catch {
      set("error");
    }
  };

  const row = "flex items-center justify-between gap-3 px-3 py-2 text-[13px]";
  const value = "text-right tabular-nums text-[var(--os-ink-2)]";
  const testButton = (kind, state) => (
    <button
      type="button"
      disabled={state === "running" || !online}
      onClick={() => run(kind)}
      className="shrink-0 rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] disabled:opacity-40"
    >
      {state === "running" ? "testing…" : state ? "test again" : "test"}
    </button>
  );

  return (
    <div className="p-5">
      <PaneHeader title="network">How this browser is reaching maxhayim.com right now.</PaneHeader>

      <div className="divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
        <div className={row}>
          <span>status</span>
          <span className={`${value} flex items-center gap-1.5`}>
            <span className={`widget-led ${online ? "widget-led-on" : ""}`} aria-hidden="true" />
            {online ? "connected" : "offline"}
          </span>
        </div>
        <div className={row}>
          <span>server</span>
          <span className={value}>
            {window.location.hostname} {secure ? "· secure (HTTPS)" : "· not encrypted"}
          </span>
        </div>
        <div className={row}>
          <span>connection</span>
          <span className={value}>
            {info
              ? [info.type && `${info.type.toUpperCase()}-class`, info.downlink && `about ${info.downlink} Mbps`, info.rtt && `${info.rtt} ms`, info.saveData && "data saver on"]
                  .filter(Boolean)
                  .join(" · ") || "unknown"
              : "This browser doesn't share connection details."}
          </span>
        </div>
        <div className={row}>
          <span>
            <span className="block">latency</span>
            <span className="block text-[12px] text-[var(--os-ink-3)]">
              {latency === "error"
                ? "The test couldn't finish."
                : latency && latency !== "running"
                  ? `${Math.round(latency.avg)} ms average · ${Math.round(latency.min)} ms best · ${Math.round(latency.jitter)} ms jitter`
                  : "Five round trips to the server."}
            </span>
          </span>
          {testButton("latency", latency)}
        </div>
        <div className={row}>
          <span>
            <span className="block">download speed</span>
            <span className="block text-[12px] text-[var(--os-ink-3)]">
              {speed === "error"
                ? "The test couldn't finish."
                : speed && speed !== "running"
                  ? `${speed.mbps.toFixed(1)} Mbps · ${speed.megabytes.toFixed(1)} MB in ${speed.seconds < 1 ? `${Math.round(speed.seconds * 1000)} ms` : `${speed.seconds.toFixed(1)} s`}`
                  : "Downloads about 1 MB of wallpapers from this site."}
            </span>
          </span>
          {testButton("speed", speed)}
        </div>
      </div>

      <div className="mt-5">
        <PrefSwitch
          label="show Wi-Fi status in the menu bar"
          hint="The signal bars reflect how quickly this site answers."
          checked={prefs.menubar}
          onChange={(menubar) => setPrefs({ menubar })}
        />
      </div>
    </div>
  );
}

/* Mesh Radio: Max builds MeshMonitor scripts for Meshtastic and MeshCore. Visitors can set up their own station:
   a callsign and a Maidenhead grid square, with distance and bearing to Max's station in Miami. */
const MESH_PREFS = {
  cookie: "comcen_mesh",
  event: "mh-mesh-changed",
  defaults: { callsign: "", grid: "" },
};
const MESH_BASE = { name: "Max's station", lat: 25.7617, lon: -80.1918 }; // Miami
const MESH_REPOS_KEY = "comcen_mesh_repos"; // session cache
const MESH_REPOS_MS = 30 * 60 * 1000;

// Maidenhead locator to six characters (about 5 by 4 km), the grid hams and mesh users swap
function toGrid(lat, lon) {
  let x = lon + 180;
  let y = lat + 90;
  const field = String.fromCharCode(65 + Math.floor(x / 20)) + String.fromCharCode(65 + Math.floor(y / 10));
  x %= 20;
  y %= 10;
  const square = `${Math.floor(x / 2)}${Math.floor(y)}`;
  x -= Math.floor(x / 2) * 2;
  y -= Math.floor(y);
  const sub = String.fromCharCode(97 + Math.floor(x * 12)) + String.fromCharCode(97 + Math.floor(y * 24));
  return field + square + sub;
}

// The center of a grid square
function fromGrid(grid) {
  const g = grid.toUpperCase();
  if (!/^[A-R]{2}[0-9]{2}([A-X]{2})?$/.test(g)) return null;
  let lon = (g.charCodeAt(0) - 65) * 20 - 180 + Number(g[2]) * 2;
  let lat = (g.charCodeAt(1) - 65) * 10 - 90 + Number(g[3]);
  if (g.length === 6) {
    lon += (g.charCodeAt(4) - 65) / 12 + 1 / 24;
    lat += (g.charCodeAt(5) - 65) / 24 + 1 / 48;
  } else {
    lon += 1;
    lat += 0.5;
  }
  return { lat, lon };
}

function pathTo(from, to) {
  const rad = Math.PI / 180;
  const dLat = (to.lat - from.lat) * rad;
  const dLon = (to.lon - from.lon) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(from.lat * rad) * Math.cos(to.lat * rad) * Math.sin(dLon / 2) ** 2;
  const km = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const y = Math.sin(dLon) * Math.cos(to.lat * rad);
  const x = Math.cos(from.lat * rad) * Math.sin(to.lat * rad) - Math.sin(from.lat * rad) * Math.cos(to.lat * rad) * Math.cos(dLon);
  const bearing = (Math.atan2(y, x) / rad + 360) % 360;
  const compass = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(bearing / 45) % 8];
  return { km, bearing, compass };
}

function useMeshRepos() {
  const [state, setState] = useState(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(MESH_REPOS_KEY) || "null");
      if (cached && Date.now() - cached.at < MESH_REPOS_MS) return { repos: cached.repos, status: "ok" };
    } catch {
      /* no cache */
    }
    return { repos: [], status: "loading" };
  });
  const fresh = state.status === "ok";

  useEffect(() => {
    if (fresh) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("https://api.github.com/users/maxhayim/repos?per_page=100&sort=updated");
        if (!response.ok) throw new Error("repos");
        const repos = (await response.json())
          .filter((r) => !r.fork && /mesh/i.test(`${r.name} ${r.description || ""}`))
          .map((r) => ({ name: r.name, description: r.description || "", url: r.html_url, stars: r.stargazers_count, pushed: r.pushed_at }));
        try {
          sessionStorage.setItem(MESH_REPOS_KEY, JSON.stringify({ at: Date.now(), repos }));
        } catch {
          /* fine without a cache */
        }
        if (!cancelled) setState({ repos, status: "ok" });
      } catch {
        if (!cancelled) setState({ repos: [], status: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fresh]);
  return state;
}

// The project's own name from its description ("Sky and Sea Alert is a MeshMonitor Script…"),
// or else from the repo name ("meshmonitor-mx-weather-alerts" → "MX Weather Alerts")
const repoTitle = (name, description = "") =>
  description.match(/^(.{2,40}?)\s+is\s/)?.[1] ||
  name
    .replace(/^meshmonitor-/, "")
    .split("-")
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

function MeshPane() {
  const [mesh, setMesh] = usePrefs(MESH_PREFS);
  const [region] = usePrefs(REGION_PREFS);
  const [locating, setLocating] = useState(false);
  const [gridDraft, setGridDraft] = useState(null); // while typing a grid by hand
  const { repos, status } = useMeshRepos();
  const baseGrid = toGrid(MESH_BASE.lat, MESH_BASE.lon);
  const here = mesh.grid ? fromGrid(mesh.grid) : null;
  const path = here ? pathTo(here, MESH_BASE) : null;
  const miles = region.temperature === "f"; // people on °F usually think in miles too
  const distance = path ? (miles ? `${Math.round(path.km * 0.621371).toLocaleString()} mi` : `${Math.round(path.km).toLocaleString()} km`) : "";

  const locate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setMesh({ grid: toGrid(pos.coords.latitude, pos.coords.longitude) }); // only the grid is kept, not the coordinates
        setGridDraft(null);
      },
      () => setLocating(false),
      { maximumAge: 30 * 60 * 1000, timeout: 10000 },
    );
  };

  const input = "w-full rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 font-mono uppercase tracking-[0.08em] ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]";
  const draft = gridDraft ?? mesh.grid;
  const draftValid = !draft || fromGrid(draft);

  return (
    <div className="p-5">
      <PaneHeader title="mesh radio">
        Off-grid text messaging over Meshtastic and MeshCore radios. Max builds MeshMonitor scripts for both, from his station in grid {baseGrid.slice(0, 4)}.
      </PaneHeader>

      <div className="rounded-xl p-4 ring-1 ring-[var(--os-line)]">
        <div className="mb-3 text-[13px] font-semibold">your station</div>
        <div className="grid gap-3 text-[13px] sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span>callsign or handle</span>
            <input
              value={mesh.callsign}
              onChange={(e) => setMesh({ callsign: e.target.value.toUpperCase().replace(/[^A-Z0-9/-]/g, "").slice(0, 12) })}
              placeholder="KD4ABC"
              autoComplete="off"
              className={input}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span>grid square</span>
            <span className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => {
                  const next = e.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 6);
                  setGridDraft(next);
                  if (!next || fromGrid(next)) setMesh({ grid: next.length > 4 ? next.slice(0, 4).toUpperCase() + next.slice(4).toLowerCase() : next.toUpperCase() });
                }}
                placeholder="EL95"
                aria-invalid={!draftValid}
                autoComplete="off"
                className={`${input} ${draftValid ? "" : "ring-[var(--os-warn)]"}`}
              />
              <button
                type="button"
                onClick={locate}
                disabled={locating}
                title="Work out my grid from my location"
                aria-label="Work out my grid from my location"
                className="widget-mini-btn h-auto w-9 shrink-0 ring-1 ring-[var(--os-line)]"
              >
                <LocateFixed className={`h-4 w-4 ${locating ? "animate-pulse" : ""}`} strokeWidth={2} />
              </button>
            </span>
          </label>
        </div>
        <p className="mt-3 text-[12px] text-[var(--os-ink-3)]">
          {path
            ? `${mesh.callsign || "You"} in ${mesh.grid} → ${MESH_BASE.name} in ${baseGrid.slice(0, 4)}: ${distance}, bearing ${Math.round(path.bearing)}° ${path.compass}.`
            : "Enter a grid square, or use the locate button. Only the grid square is kept, on this browser."}
        </p>
      </div>

      <MeshMonitorSettings />

      <div className="mt-6 flex items-center justify-between gap-3">
        <h4 className="text-[13px] font-semibold">MeshMonitor scripts by Max</h4>
        <a href="https://github.com/maxhayim?tab=repositories&q=mesh" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12px] underline underline-offset-2 hover:text-[var(--os-ink)]">
          on GitHub <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
      {repos.length ? (
        <ul className="mt-2 divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
          {repos.map((r) => (
            <li key={r.name}>
              <a href={r.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 px-3 py-2.5 text-[13px] hover:bg-[var(--os-hover)]">
                <Radio className="mt-0.5 h-4 w-4 shrink-0 text-[var(--os-accent)]" strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{repoTitle(r.name, r.description)}</span>
                  <span className="line-clamp-2 block text-[12px] text-[var(--os-ink-3)]">{r.description}</span>
                </span>
                <span className="shrink-0 text-[12px] tabular-nums text-[var(--os-ink-3)]">★ {r.stars}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[12px] text-[var(--os-ink-3)]">{status === "error" ? "Couldn't reach GitHub right now." : "Tuning in to GitHub…"}</p>
      )}
    </div>
  );
}

/* File Sharing: share the site, and move your settings between browsers as a file */
const SETTINGS_FORMAT = "comcen-os-settings";

function exportSettings(user) {
  const file = {
    format: SETTINGS_FORMAT,
    version: 1,
    exported: new Date().toISOString(),
    from: `comcen os ${OS_VERSION}`,
    user: user.owner ? { name: user.name } : { name: user.name, color: user.color, photo: user.photo },
    prefs: (() => {
      const prefs = collectUserPrefs();
      delete prefs.local[MESHMONITOR_KEY]; // API keys never leave this browser
      delete prefs.local[FINNHUB_KEY];
      return prefs;
    })(),
  };
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `comcen-settings-${user.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "user"}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Only comcen os preferences that belong to a user; nothing else from the file is used
function readSettingsFile(text) {
  const data = JSON.parse(text);
  if (data?.format !== SETTINGS_FORMAT || !data.prefs) throw new Error("That isn't a comcen os settings file.");
  const allowed = (key) => typeof key === "string" && key.startsWith("comcen_") && !MACHINE_KEYS.has(key) && key !== MESHMONITOR_KEY && key !== FINNHUB_KEY;
  const pick = (obj) => Object.fromEntries(Object.entries(obj || {}).filter(([k, v]) => allowed(k) && typeof v === "string" && v.length < 200000));
  const user = data.user && typeof data.user.name === "string" ? data.user : null;
  return { prefs: { cookies: pick(data.prefs.cookies), local: pick(data.prefs.local) }, user };
}

function SharingPane() {
  const { current } = useUsers();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(null); // a settings file waiting for confirmation
  const fileRef = useRef(null);
  const link = window.location.href.split("#")[0] + window.location.hash;
  const canShare = typeof navigator.share === "function";

  const share = async () => {
    setMessage("");
    try {
      if (canShare) {
        await navigator.share({ title: "comcen os — maxhayim.com", text: "Max Hayim's site, built as a late-1990s operating system.", url: link });
      } else {
        await navigator.clipboard.writeText(link);
        setMessage("Link copied.");
      }
    } catch (e) {
      if (e?.name !== "AbortError") setMessage("Couldn't share from this browser.");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setMessage("Link copied.");
    } catch {
      setMessage("Couldn't copy from this browser.");
    }
  };

  const pick = async (file) => {
    setMessage("");
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setMessage("That file is too large to be a settings file.");
      return;
    }
    try {
      setPending({ name: file.name, ...readSettingsFile(await file.text()) });
    } catch (e) {
      setMessage(e instanceof SyntaxError ? "That file couldn't be read." : e.message);
    }
  };

  const apply = () => {
    clearUserPrefs();
    applyUserPrefs(pending.prefs);
    if (!current.owner && pending.user) {
      updateUser(current.id, {
        color: USER_COLORS.includes(pending.user.color) ? pending.user.color : current.color,
        photo: typeof pending.user.photo === "string" && pending.user.photo.startsWith("data:image/") ? pending.user.photo : current.photo,
      });
    }
    window.location.reload();
  };

  const button = "rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]";
  const count = pending ? Object.keys(pending.prefs.cookies).length + Object.keys(pending.prefs.local).length : 0;

  return (
    <div className="p-5">
      <PaneHeader title="file sharing">Share comcen os, or take your settings to another browser.</PaneHeader>

      <div className="rounded-xl p-4 ring-1 ring-[var(--os-line)]">
        <div className="text-[13px] font-semibold">share this page</div>
        <div className="mt-2 truncate rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 font-mono text-[12px] ring-1 ring-[var(--os-line)]">{link}</div>
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={copy} className={button}>
            copy link
          </button>
          {canShare && (
            <button type="button" onClick={share} className="rounded-full bg-[var(--os-accent)] px-3 py-1 text-[13px] font-semibold text-white hover:brightness-105">
              share…
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl p-4 ring-1 ring-[var(--os-line)]">
        <div className="text-[13px] font-semibold">your settings</div>
        <p className="mt-1 text-[12px] text-[var(--os-ink-3)]">
          Save {current.name}&rsquo;s theme, wallpaper, widgets, and other preferences as a file, then open it on another browser to pick up where you left off.
        </p>
        {pending ? (
          <div className="mt-3 flex flex-wrap items-center justify-end gap-2 text-[13px]">
            <span className="mr-auto text-[12px] text-[var(--os-ink-2)]">
              Replace {current.name}&rsquo;s preferences with {count} from {pending.name}
              {pending.user ? ` (saved by ${pending.user.name})` : ""}, then restart?
            </span>
            <button type="button" onClick={() => setPending(null)} className={button}>
              cancel
            </button>
            <button type="button" onClick={apply} className="rounded-full bg-[var(--os-accent)] px-3 py-1 font-semibold text-white hover:brightness-105">
              import
            </button>
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              tabIndex={-1}
              onChange={(e) => {
                pick(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <button type="button" onClick={() => fileRef.current?.click()} className={button}>
              import…
            </button>
            <button type="button" onClick={() => exportSettings(current)} className={button}>
              export
            </button>
          </div>
        )}
      </div>

      {message && (
        <p className="mt-3 text-[12px] text-[var(--os-ink-2)]" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}

/* ---------- Devices and System: Bluetooth, Discs, Displays, Power, Keyboard, Pointer, Printing, Voice, Boot Drive, Accessibility ---------- */

const DISPLAY_PREFS = {
  cookie: "comcen_display",
  event: "mh-display-changed",
  defaults: { scale: "100", nightShift: "off", warmth: 50 },
  allowed: { scale: ["90", "100", "110", "125"], nightShift: ["off", "on", "sunset"] },
};
const POWER_PREFS = { cookie: "comcen_power", event: "mh-power-changed", defaults: { lowPower: false, percent: true } };
const KEYBOARD_PREFS = { cookie: "comcen_keyboard", event: "mh-keyboard-changed", defaults: { shortcuts: true } };
const POINTER_PREFS = {
  cookie: "comcen_pointer",
  event: "mh-pointer-changed",
  defaults: { cursor: "system", trails: false },
  allowed: { cursor: ["system", "classic", "large"] },
};
const PRINT_PREFS = { cookie: "comcen_print", event: "mh-print-changed", defaults: { mono: false, links: true } };
const VOICE_PREFS = { cookie: "comcen_voice", event: "mh-voice-changed", defaults: { voice: "", rate: 1, announce: false } };
const BOOT_PREFS = {
  cookie: "comcen_boot",
  event: "mh-boot-changed",
  defaults: { when: "first", sound: true },
  allowed: { when: ["first", "always", "never"] },
};
const ACCESS_PREFS = {
  cookie: "comcen_access",
  event: "mh-access-changed",
  defaults: { reduceMotion: false, contrast: false, transparency: false, underline: false },
};

// Settings that change the whole page are applied as classes and styles on <html>
function applyRootPrefs() {
  const root = document.documentElement;
  const access = readPrefs(ACCESS_PREFS);
  const power = readPrefs(POWER_PREFS);
  const display = readPrefs(DISPLAY_PREFS);
  const pointer = readPrefs(POINTER_PREFS);
  const print = readPrefs(PRINT_PREFS);
  root.classList.toggle("a11y-reduce-motion", access.reduceMotion || power.lowPower);
  root.classList.toggle("a11y-contrast", access.contrast);
  root.classList.toggle("a11y-solid", access.transparency || power.lowPower);
  root.classList.toggle("a11y-underline", access.underline);
  root.classList.toggle("print-mono", print.mono);
  root.classList.toggle("print-links", print.links);
  root.dataset.cursor = pointer.cursor;
  root.style.zoom = display.scale === "100" ? "" : `${display.scale}%`;
}

if (typeof window !== "undefined") {
  applyRootPrefs();
  [ACCESS_PREFS, POWER_PREFS, DISPLAY_PREFS, POINTER_PREFS, PRINT_PREFS].forEach((spec) => window.addEventListener(spec.event, applyRootPrefs));
}

// The interface size from Displays; positions measured in the page are divided by it
const pageZoom = () => Number(readPrefs(DISPLAY_PREFS).scale) / 100;

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const OPTION_KEY = isMac ? "⌥" : "Alt+";

function PrefRows({ rows }) {
  return (
    <div className="divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-3 px-3 py-2 text-[13px]">
          <span>{label}</span>
          <span className="text-right tabular-nums text-[var(--os-ink-2)]">{value}</span>
        </div>
      ))}
    </div>
  );
}

const paneButton = "rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] disabled:opacity-40";
const paneButtonPrimary = "rounded-full bg-[var(--os-accent)] px-3 py-1 text-[13px] font-semibold text-white hover:brightness-105 disabled:opacity-40";

/* Bluetooth: the browser's own device picker (Web Bluetooth, in Chrome and Edge) */
function BluetoothPane() {
  const supported = typeof navigator !== "undefined" && !!navigator.bluetooth;
  const [available, setAvailable] = useState(null);
  const [devices, setDevices] = useState([]); // { id, name, battery, status }
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supported || !navigator.bluetooth.getAvailability) return;
    let cancelled = false;
    navigator.bluetooth.getAvailability().then((ok) => !cancelled && setAvailable(ok));
    return () => {
      cancelled = true;
    };
  }, [supported]);

  const patch = (id, next) => setDevices((list) => list.map((d) => (d.id === id ? { ...d, ...next } : d)));

  const search = async () => {
    setMessage("");
    try {
      const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: ["battery_service"] });
      setDevices((list) => [...list.filter((d) => d.id !== device.id), { id: device.id, name: device.name || "Unnamed device", device, battery: null, status: "" }]);
    } catch (e) {
      if (e?.name !== "NotFoundError") setMessage(e?.message || "Bluetooth isn't available right now.");
    }
  };

  const readBattery = async (d) => {
    patch(d.id, { status: "connecting…" });
    try {
      const server = await d.device.gatt.connect();
      const service = await server.getPrimaryService("battery_service");
      const level = await (await service.getCharacteristic("battery_level")).readValue();
      patch(d.id, { battery: level.getUint8(0), status: "" });
      server.disconnect();
    } catch {
      patch(d.id, { status: "no battery information" });
    }
  };

  return (
    <div className="p-5">
      <PaneHeader title="bluetooth">Find nearby Bluetooth devices and check their battery.</PaneHeader>
      {!supported ? (
        <p className="text-[13px] text-[var(--os-ink-2)]">This browser doesn&rsquo;t offer Bluetooth to websites. Chrome and Edge on a computer or Android do.</p>
      ) : (
        <>
          <PrefRows rows={[["Bluetooth", available === false ? "off or not found on this computer" : "ready"]]} />
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={search} className={paneButtonPrimary}>
              search for devices…
            </button>
          </div>
          {devices.length > 0 && (
            <ul className="mt-4 divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
              {devices.map((d) => (
                <li key={d.id} className="flex items-center gap-3 px-3 py-2.5 text-[13px]">
                  <Bluetooth className="h-4 w-4 shrink-0 text-[var(--os-accent)]" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate font-semibold">{d.name}</span>
                  <span className="text-[12px] text-[var(--os-ink-3)]">{d.battery !== null ? `battery ${d.battery}%` : d.status}</span>
                  <button type="button" onClick={() => readBattery(d)} className={paneButton}>
                    battery
                  </button>
                </li>
              ))}
            </ul>
          )}
          {message && <p className="mt-3 text-[12px] text-[var(--os-ink-2)]">{message}</p>}
          <p className="mt-4 text-[12px] text-[var(--os-ink-3)]">Your browser asks before sharing any device. Devices are forgotten when you leave.</p>
        </>
      )}
    </div>
  );
}

/* Discs: a CD player for music on your own computer. Files play locally and are forgotten when you leave. */
const disc = { tracks: [], index: 0, status: "empty", audio: null, time: 0, listeners: new Set() }; // status: empty | stopped | playing | paused

function setDisc(patch) {
  Object.assign(disc, patch);
  disc.listeners.forEach((listener) => listener());
}

function useDisc() {
  const [, rerender] = useState(0);
  useEffect(() => {
    const listener = () => rerender((n) => n + 1);
    disc.listeners.add(listener);
    return () => disc.listeners.delete(listener);
  }, []);
  return disc;
}

function discAudio() {
  if (!disc.audio) {
    const audio = new Audio();
    audio._mhBase = 0.9;
    audio.addEventListener("timeupdate", () => setDisc({ time: audio.currentTime }));
    audio.addEventListener("ended", () => (disc.index < disc.tracks.length - 1 ? discPlay(disc.index + 1) : discStop()));
    disc.audio = audio;
  }
  return disc.audio;
}

function discPlay(index = disc.index) {
  if (!disc.tracks.length) return;
  radioStop(); // one sound source at a time, like a real stereo
  const audio = discAudio();
  if (index !== disc.index || !audio.src) {
    audio.src = disc.tracks[index].url;
    setDisc({ index, time: 0 });
  }
  applyMedia(audio);
  liveMedia.add(audio);
  setDisc({ status: "playing" });
  audio.play().catch(() => setDisc({ status: "paused" }));
}

function discPause() {
  if (disc.status !== "playing") return;
  disc.audio?.pause();
  setDisc({ status: "paused" });
}

function discStop() {
  if (disc.audio) {
    disc.audio.pause();
    disc.audio.currentTime = 0;
  }
  setDisc({ status: disc.tracks.length ? "stopped" : "empty", time: 0 });
}

function discEject() {
  discStop();
  disc.tracks.forEach((t) => URL.revokeObjectURL(t.url));
  if (disc.audio) {
    disc.audio.removeAttribute("src");
    disc.audio.load();
    liveMedia.delete(disc.audio);
  }
  setDisc({ tracks: [], index: 0, status: "empty", time: 0 });
}

function discInsert(files) {
  const tracks = [...files]
    .filter((f) => f.type.startsWith("audio/") || /\.(mp3|m4a|aac|wav|ogg|oga|flac|opus)$/i.test(f.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    // "01 First Song.mp3" → "First Song": the player numbers tracks itself
    .map((f) => ({ name: f.name.replace(/\.[^.]+$/, "").replace(/^\d{1,3}[\s._-]+/, "") || f.name, url: URL.createObjectURL(f) }));
  if (!tracks.length) return false;
  discEject();
  setDisc({ tracks, index: 0, status: "stopped" });
  return true;
}

const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function DiscsPane() {
  const d = useDisc();
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  const current = d.tracks[d.index];

  return (
    <div className="p-5">
      <PaneHeader title="discs">The COMCEN Model 2000&rsquo;s disc player. Insert music from your computer; it plays here and never leaves your browser.</PaneHeader>

      <div className="rounded-xl p-4 ring-1 ring-[var(--os-line)]">
        <div className="disc-lcd flex items-center justify-between gap-3 rounded-lg px-3 py-2 font-mono text-[13px]">
          <span className="min-w-0 truncate">
            {d.status === "empty" ? "NO DISC" : `${String(d.index + 1).padStart(2, "0")} ${current?.name || ""}`}
          </span>
          <span className="shrink-0 tabular-nums">{d.status === "empty" ? "--:--" : mmss(d.time)}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <button type="button" disabled={d.status === "empty" || d.index === 0} onClick={() => discPlay(d.index - 1)} className="os-knob h-9 w-9" aria-label="Previous track">
            <SkipBack className="h-4 w-4" fill="currentColor" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            disabled={d.status === "empty"}
            onClick={() => (d.status === "playing" ? discPause() : discPlay())}
            className={`os-knob h-11 w-11 ${d.status === "playing" ? "os-knob-power" : ""}`}
            aria-label={d.status === "playing" ? "Pause" : "Play"}
          >
            {d.status === "playing" ? <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />}
          </button>
          <button type="button" disabled={d.status === "empty"} onClick={discStop} className="os-knob h-9 w-9" aria-label="Stop">
            <Square className="h-3 w-3" fill="currentColor" strokeWidth={0} />
          </button>
          <button
            type="button"
            disabled={d.status === "empty" || d.index >= d.tracks.length - 1}
            onClick={() => discPlay(d.index + 1)}
            className="os-knob h-9 w-9"
            aria-label="Next track"
          >
            <SkipForward className="h-4 w-4" fill="currentColor" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="audio/*"
            multiple
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              setMessage(discInsert(e.target.files || []) ? "" : "Those files aren't music the player can read.");
              e.target.value = "";
            }}
          />
          {d.status !== "empty" && (
            <button type="button" onClick={discEject} className={paneButton}>
              eject
            </button>
          )}
          <button type="button" onClick={() => fileRef.current?.click()} className={paneButtonPrimary}>
            {d.status === "empty" ? "insert music…" : "insert another…"}
          </button>
        </div>
        {message && <p className="mt-2 text-[12px] text-[var(--os-warn)]">{message}</p>}
      </div>

      {d.tracks.length > 0 && (
        <ol className="mt-4 divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
          {d.tracks.map((t, i) => (
            <li key={t.url}>
              <button type="button" onClick={() => discPlay(i)} className="flex w-full items-center gap-3 px-3 py-2 text-left text-[13px] hover:bg-[var(--os-hover)]">
                <span className="w-6 shrink-0 tabular-nums text-[var(--os-ink-3)]">{String(i + 1).padStart(2, "0")}</span>
                <span className={`min-w-0 flex-1 truncate ${i === d.index && d.status !== "stopped" ? "font-semibold text-[var(--os-accent)]" : ""}`}>{t.name}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-4 text-[12px] text-[var(--os-ink-3)]">Playing a disc turns the radio off. The music keeps playing while you browse.</p>
    </div>
  );
}

/* Displays: what the browser knows about the screen, the interface size, and Night Shift */
function useRefreshRate() {
  const [hz, setHz] = useState(null);
  useEffect(() => {
    let frames = 0;
    let start = 0;
    let id;
    const tick = (t) => {
      if (!start) start = t;
      frames += 1;
      if (t - start < 1000) id = requestAnimationFrame(tick);
      else setHz(Math.round((frames * 1000) / (t - start)));
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);
  return hz;
}

const nightShiftActive = (display, date = new Date()) =>
  display.nightShift === "on" || (display.nightShift === "sunset" && (date.getHours() >= 19 || date.getHours() < 7));

function DisplaysPane() {
  const [display, setDisplay] = usePrefs(DISPLAY_PREFS);
  const hz = useRefreshRate();
  const dpr = window.devicePixelRatio || 1;
  const gamut = window.matchMedia("(color-gamut: rec2020)").matches ? "Rec. 2020" : window.matchMedia("(color-gamut: p3)").matches ? "Display P3" : "sRGB";
  const hdr = window.matchMedia("(dynamic-range: high)").matches;

  return (
    <div className="p-5">
      <PaneHeader title="displays">Your screen, as this browser sees it.</PaneHeader>
      <PrefRows
        rows={[
          ["resolution", `${screen.width} × ${screen.height}${dpr !== 1 ? ` (${Math.round(screen.width * dpr)} × ${Math.round(screen.height * dpr)} pixels)` : ""}`],
          ["pixel density", `${dpr.toFixed(dpr % 1 ? 2 : 0)}×${dpr >= 2 ? " · high resolution" : ""}`],
          ["color", `${gamut} · ${screen.colorDepth}-bit${hdr ? " · HDR" : ""}`],
          ["refresh rate", hz ? `about ${hz} Hz` : "measuring…"],
        ]}
      />
      <div className="mt-5 flex flex-col gap-5">
        <PrefChoice
          label="interface size"
          value={display.scale}
          onChange={(scale) => setDisplay({ scale })}
          options={[
            { id: "90", label: "smaller" },
            { id: "100", label: "default" },
            { id: "110", label: "larger" },
            { id: "125", label: "largest" },
          ]}
        />
        <PrefChoice
          label="Night Shift"
          value={display.nightShift}
          onChange={(nightShift) => setDisplay({ nightShift })}
          options={[
            { id: "off", label: "off" },
            { id: "sunset", label: "7 pm to 7 am" },
            { id: "on", label: "on" },
          ]}
        />
        <label className={`flex items-center gap-3 text-[13px] ${display.nightShift === "off" ? "opacity-50" : ""}`}>
          <span className="w-20 shrink-0">warmth</span>
          <span className="text-[12px] text-[var(--os-ink-3)]">less</span>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={display.warmth}
            disabled={display.nightShift === "off"}
            onChange={(e) => setDisplay({ warmth: Number(e.target.value) })}
            className="os-range flex-1"
          />
          <span className="text-[12px] text-[var(--os-ink-3)]">more</span>
        </label>
      </div>
    </div>
  );
}

// Night Shift: a warm tint over everything, on a schedule
function NightShift() {
  const [display] = usePrefs(DISPLAY_PREFS);
  const now = useMinuteClock();
  if (!nightShiftActive(display, now)) return null;
  return <div className="night-shift no-print" style={{ "--warmth": display.warmth / 100 }} aria-hidden="true" />;
}

/* Power */
function useBatteryDetails() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    if (!navigator.getBattery) return;
    let bat;
    let cancelled = false;
    const update = () =>
      !cancelled && bat && setInfo({ level: Math.round(bat.level * 100), charging: bat.charging, chargingTime: bat.chargingTime, dischargingTime: bat.dischargingTime });
    navigator.getBattery().then((b) => {
      bat = b;
      update();
      ["levelchange", "chargingchange", "chargingtimechange", "dischargingtimechange"].forEach((ev) => b.addEventListener(ev, update));
    });
    return () => {
      cancelled = true;
      if (bat) ["levelchange", "chargingchange", "chargingtimechange", "dischargingtimechange"].forEach((ev) => bat.removeEventListener(ev, update));
    };
  }, []);
  return info;
}

const hoursMinutes = (seconds) => {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`;
};

function PowerPane() {
  const [power, setPower] = usePrefs(POWER_PREFS);
  const battery = useBatteryDetails();
  const estimate = battery
    ? battery.charging
      ? Number.isFinite(battery.chargingTime) && battery.chargingTime > 0
        ? `full in ${hoursMinutes(battery.chargingTime)}`
        : battery.level === 100
          ? "fully charged"
          : "charging"
      : Number.isFinite(battery.dischargingTime)
        ? `${hoursMinutes(battery.dischargingTime)} left`
        : "on battery"
    : null;

  return (
    <div className="p-5">
      <PaneHeader title="power">Battery, energy use, and turning comcen os off.</PaneHeader>
      <PrefRows
        rows={[
          ["power source", battery ? (battery.charging ? "power adapter" : "battery") : "This browser doesn't share battery details."],
          ...(battery ? [["battery", `${battery.level}% · ${estimate}`]] : []),
        ]}
      />
      <div className="mt-5 flex flex-col gap-5">
        <PrefSwitch
          label="low power mode"
          hint="Turns off animations and see-through effects to save energy."
          checked={power.lowPower}
          onChange={(lowPower) => setPower({ lowPower })}
        />
        <PrefSwitch label="show battery percentage in the menu bar" checked={power.percent} onChange={(percent) => setPower({ percent })} />
        <p className="text-[12px] text-[var(--os-ink-3)]">
          When the desk is idle, the{" "}
          <button type="button" onClick={() => openPreferences("screensaver")} className="underline underline-offset-2 hover:text-[var(--os-ink)]">
            screen saver
          </button>{" "}
          takes over.
        </p>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={() => window.dispatchEvent(new Event("mh-reboot"))} className={paneButton}>
          restart…
        </button>
        <button type="button" onClick={() => window.dispatchEvent(new Event("mh-power-off"))} className={paneButton}>
          shut down…
        </button>
      </div>
    </div>
  );
}

/* Keyboard: shortcuts that work anywhere on the desktop, plus a key tester */
const SHORTCUTS = [
  { keys: "1 – 5", label: "home, gits, internet, about, contact", match: (e) => /^Digit[1-5]$/.test(e.code) },
  { keys: "W", label: "show or put away widgets", match: (e) => e.code === "KeyW" },
  { keys: ",", label: "system preferences", match: (e) => e.code === "Comma" },
  { keys: "R", label: "radio on or off", match: (e) => e.code === "KeyR" },
  { keys: "S", label: "start the screen saver", match: (e) => e.code === "KeyS" },
  { keys: "P", label: "print this page", match: (e) => e.code === "KeyP" },
];

function runShortcut(e) {
  if (e.code.startsWith("Digit")) {
    const page = OS_PAGES[Number(e.code.slice(5)) - 1];
    if (page) window.location.hash = page.href.slice(1);
  } else if (e.code === "KeyW") toggleDashboard();
  else if (e.code === "Comma") openPreferences("all");
  else if (e.code === "KeyR") radio.status === "off" ? radioStart() : radioStop();
  else if (e.code === "KeyS") window.dispatchEvent(new Event("mh-screensaver-start"));
  else if (e.code === "KeyP") printPage();
}

function useKeyboardShortcuts() {
  const [keyboard] = usePrefs(KEYBOARD_PREFS);
  useEffect(() => {
    if (!keyboard.shortcuts) return;
    const onKey = (e) => {
      if (!e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable='true']")) return;
      if (!SHORTCUTS.some((s) => s.match(e))) return;
      e.preventDefault();
      runShortcut(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboard.shortcuts]);
}

function KeyboardPane() {
  const [keyboard, setKeyboard] = usePrefs(KEYBOARD_PREFS);
  const [pressed, setPressed] = useState(null);
  return (
    <div className="p-5">
      <PaneHeader title="keyboard">Shortcuts for getting around comcen os.</PaneHeader>
      <PrefSwitch label="use keyboard shortcuts" hint={`Hold ${isMac ? "Option (⌥)" : "Alt"} and press a key.`} checked={keyboard.shortcuts} onChange={(shortcuts) => setKeyboard({ shortcuts })} />
      <div className={`mt-4 divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)] ${keyboard.shortcuts ? "" : "opacity-50"}`}>
        {SHORTCUTS.map((s) => (
          <div key={s.keys} className="flex items-center justify-between gap-3 px-3 py-2 text-[13px]">
            <span>{s.label}</span>
            <kbd className="kbd">
              {OPTION_KEY}
              {s.keys}
            </kbd>
          </div>
        ))}
      </div>
      <div className="mt-5 text-[13px]">
        <div className="mb-1.5">key tester</div>
        <div
          tabIndex={0}
          role="textbox"
          aria-label="Key tester: press any key"
          onKeyDown={(e) => {
            if (e.key === "Tab" || e.key === "Escape") return;
            e.preventDefault();
            e.stopPropagation();
            setPressed({ key: e.key === " " ? "Space" : e.key, code: e.code, mods: [e.metaKey && "⌘", e.ctrlKey && "Ctrl", e.altKey && OPTION_KEY.replace("+", ""), e.shiftKey && "Shift"].filter(Boolean) });
          }}
          className="disc-lcd flex min-h-[44px] items-center justify-center rounded-lg px-3 py-2 font-mono text-[13px] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]"
        >
          {pressed ? `${[...pressed.mods, pressed.key].join(" + ")}  ·  ${pressed.code}` : "click here, then press any key"}
        </div>
      </div>
    </div>
  );
}

/* Pointer: classic or large arrows, and 90s mouse trails */
function PointerTrails() {
  const [pointer] = usePrefs(POINTER_PREFS);
  const [points, setPoints] = useState([]);
  const enabled = pointer.trails && !prefersReducedMotion() && window.matchMedia?.("(pointer: fine)").matches;

  useEffect(() => {
    if (!enabled) return;
    let last = null;
    let trail = [];
    let id;
    const onMove = (e) => {
      if (e.pointerType === "mouse") last = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      if (last) trail = [last, ...trail].slice(0, 7);
      else trail = trail.slice(0, -1);
      last = null;
      setPoints(trail);
      id = requestAnimationFrame(() => setTimeout(tick, 33));
    };
    window.addEventListener("pointermove", onMove);
    id = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(id);
      setPoints([]);
    };
  }, [enabled]);

  if (!enabled) return null;
  const zoom = pageZoom();
  return (
    <div className="no-print pointer-events-none fixed inset-0 z-[96]" aria-hidden="true">
      {points.slice(1).map((p, i) => (
        <span key={i} className="pointer-ghost" data-size={pointer.cursor === "large" ? "large" : "normal"} style={{ left: p.x / zoom, top: p.y / zoom, opacity: 0.55 - i * 0.08 }} />
      ))}
    </div>
  );
}

function PointerPane() {
  const [pointer, setPointer] = usePrefs(POINTER_PREFS);
  const fine = window.matchMedia("(pointer: fine)").matches;
  const hover = window.matchMedia("(hover: hover)").matches;
  return (
    <div className="p-5">
      <PaneHeader title="pointer">The arrow you point with.</PaneHeader>
      <PrefRows rows={[["pointing device", fine ? (hover ? "mouse or trackpad" : "pen") : "touch screen"]]} />
      <div className="mt-5 flex flex-col gap-5">
        <PrefChoice
          label="pointer"
          value={pointer.cursor}
          onChange={(cursor) => setPointer({ cursor })}
          options={[
            { id: "system", label: "system" },
            { id: "classic", label: "classic arrow" },
            { id: "large", label: "large arrow" },
          ]}
        />
        <PrefSwitch label="pointer trails" hint="Ghost arrows follow the pointer, like a 1990s laptop screen." checked={pointer.trails} onChange={(trails) => setPointer({ trails })} />
        {!fine && <p className="text-[12px] text-[var(--os-ink-3)]">Touch screens don&rsquo;t show a pointer, so these apply when you use a mouse or trackpad.</p>}
      </div>
    </div>
  );
}

/* Printing: a clean copy of the window, without the desktop around it */
function printPage() {
  window.dispatchEvent(new Event("mh-preferences-close"));
  window.dispatchEvent(new Event("mh-dashboard-close"));
  setTimeout(() => window.print(), 150);
}

function PrintingPane() {
  const [print, setPrint] = usePrefs(PRINT_PREFS);
  return (
    <div className="p-5">
      <PaneHeader title="printing">Prints the page in the window, without the desktop, dock, or wallpaper. Your browser&rsquo;s print dialog picks the printer, or saves a PDF.</PaneHeader>
      <div className="flex flex-col gap-5">
        <PrefSwitch label="black and white" hint="Saves color ink." checked={print.mono} onChange={(mono) => setPrint({ mono })} />
        <PrefSwitch label="print link addresses" hint="Shows where each link goes, after the link." checked={print.links} onChange={(links) => setPrint({ links })} />
      </div>
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={printPage} className={paneButtonPrimary}>
          print this page…
        </button>
      </div>
    </div>
  );
}

/* Voice: the browser's text-to-speech voices */
function useVoices() {
  const [voices, setVoices] = useState(() => (window.speechSynthesis ? window.speechSynthesis.getVoices() : []));
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const update = () => setVoices(synth.getVoices());
    synth.addEventListener?.("voiceschanged", update);
    return () => synth.removeEventListener?.("voiceschanged", update);
  }, []);
  return voices;
}

function speak(text, prefs = readPrefs(VOICE_PREFS)) {
  const synth = window.speechSynthesis;
  if (!synth || !soundState.on) return false;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = synth.getVoices().find((v) => v.voiceURI === prefs.voice);
  if (voice) utterance.voice = voice;
  else utterance.lang = readPrefs(REGION_PREFS).locale;
  utterance.rate = Math.max(0.5, Math.min(2, prefs.rate));
  utterance.volume = soundState.volume / 100;
  synth.speak(utterance);
  return true;
}

// "It's 3 o'clock": on the hour, when Voice → announce the time is on
function useTimeAnnouncements() {
  const [voice] = usePrefs(VOICE_PREFS);
  useEffect(() => {
    if (!voice.announce) return;
    let lastHour = null;
    const id = setInterval(() => {
      const now = new Date();
      const { h, m } = clockParts(now);
      if (m !== 0 || lastHour === h) return;
      lastHour = h;
      speak(`It's ${formatTime(now)}.`, voice);
    }, 15000);
    return () => clearInterval(id);
  }, [voice]);
}

function VoicePane() {
  const [voice, setVoice] = usePrefs(VOICE_PREFS);
  const voices = useVoices();
  const sound = useSound();
  const [speaking, setSpeaking] = useState(false);
  const supported = !!window.speechSynthesis;
  const sorted = [...voices].sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));

  const say = (text) => {
    if (!speak(text, voice)) return;
    setSpeaking(true);
    const check = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        setSpeaking(false);
        clearInterval(check);
      }
    }, 300);
  };

  const readPage = () => {
    const text = window.getSelection()?.toString().trim() || document.querySelector("main")?.innerText || "";
    say(text.slice(0, 4000));
  };

  return (
    <div className="p-5">
      <PaneHeader title="voice">comcen os can read to you, using your browser&rsquo;s voices.</PaneHeader>
      {!supported ? (
        <p className="text-[13px] text-[var(--os-ink-2)]">This browser doesn&rsquo;t have speech.</p>
      ) : (
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-1.5 text-[13px]">
            <span>voice</span>
            <select
              value={voice.voice}
              onChange={(e) => setVoice({ voice: e.target.value })}
              className="w-full rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]"
            >
              <option value="">automatic (matches your language)</option>
              {sorted.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} · {v.lang}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3 text-[13px]">
            <span className="w-20 shrink-0">speed</span>
            <span className="text-[12px] text-[var(--os-ink-3)]">slow</span>
            <input type="range" min="0.5" max="2" step="0.1" value={voice.rate} onChange={(e) => setVoice({ rate: Number(e.target.value) })} className="os-range flex-1" />
            <span className="text-[12px] text-[var(--os-ink-3)]">fast</span>
          </label>
          <PrefSwitch label="announce the time" hint="Says the time every hour, on the hour, while comcen os is open." checked={voice.announce} onChange={(announce) => setVoice({ announce })} />
          {!sound.on && <p className="text-[12px] text-[var(--os-warn)]">Sound is off, so comcen os stays quiet.</p>}
          <div className="flex flex-wrap justify-end gap-2">
            {speaking ? (
              <button
                type="button"
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setSpeaking(false);
                }}
                className={paneButton}
              >
                stop
              </button>
            ) : (
              <>
                <button type="button" onClick={() => say("Hello. Welcome to comcen os.")} className={paneButton}>
                  test
                </button>
                <button type="button" onClick={readPage} className={paneButtonPrimary}>
                  read this page
                </button>
              </>
            )}
          </div>
          <p className="text-[12px] text-[var(--os-ink-3)]">Select some text first to read just that.</p>
        </div>
      )}
    </div>
  );
}

/* Boot Drive */
function BootPane() {
  const [boot, setBoot] = usePrefs(BOOT_PREFS);
  return (
    <div className="p-5">
      <PaneHeader title="boot drive">How comcen os starts up.</PaneHeader>
      <div className="rounded-xl p-3 ring-1 ring-[var(--os-accent)]">
        <div className="flex items-center gap-3 text-[13px]">
          <HardDrive className="h-8 w-8 shrink-0 text-[var(--os-accent)]" strokeWidth={1.4} aria-hidden="true" />
          <span className="min-w-0">
            <span className="block font-semibold">COMCEN HD</span>
            <span className="block truncate text-[12px] text-[var(--os-ink-3)]">comcen os I {OS_VERSION} · Seagate Cheetah 18.2 GB Ultra2 SCSI</span>
          </span>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <PrefChoice
          label="show the startup screen"
          value={boot.when}
          onChange={(when) => setBoot({ when })}
          options={[
            { id: "first", label: "first visit" },
            { id: "always", label: "every visit" },
            { id: "never", label: "never" },
          ]}
        />
        <PrefSwitch label="play the startup sounds" hint="The BIOS beeps, drive sounds, and chime." checked={boot.sound} onChange={(sound) => setBoot({ sound })} />
      </div>
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={() => window.dispatchEvent(new Event("mh-reboot"))} className={paneButton}>
          restart now…
        </button>
      </div>
    </div>
  );
}

/* Accessibility */
function AccessibilityPane() {
  const [access, setAccess] = usePrefs(ACCESS_PREFS);
  const deviceReduces = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div className="p-5">
      <PaneHeader title="accessibility">Make comcen os easier to see and use.</PaneHeader>
      <div className="flex flex-col gap-5">
        <PrefSwitch
          label="reduce motion"
          hint={deviceReduces ? "Your device already asks for less motion, and comcen os follows it." : "Stops animations, the startup screen, and screen saver movement."}
          checked={access.reduceMotion}
          onChange={(reduceMotion) => setAccess({ reduceMotion })}
        />
        <PrefSwitch label="increase contrast" hint="Darker text and stronger outlines." checked={access.contrast} onChange={(contrast) => setAccess({ contrast })} />
        <PrefSwitch label="reduce transparency" hint="Solid menu bar, dock, and panels instead of see-through ones." checked={access.transparency} onChange={(transparency) => setAccess({ transparency })} />
        <PrefSwitch label="underline links" checked={access.underline} onChange={(underline) => setAccess({ underline })} />
        <p className="text-[12px] text-[var(--os-ink-3)]">
          Text size is in{" "}
          <button type="button" onClick={() => openPreferences("displays")} className="underline underline-offset-2 hover:text-[var(--os-ink)]">
            Displays
          </button>
          , and having pages read aloud is in{" "}
          <button type="button" onClick={() => openPreferences("voice")} className="underline underline-offset-2 hover:text-[var(--os-ink)]">
            Voice
          </button>
          .
        </p>
      </div>
    </div>
  );
}

/* ---------- MeshMonitor: a live look at your own mesh, through MeshMonitor's v1 API ----------
   The browser talks to your MeshMonitor directly. The address and API token stay in this browser's storage
   (not a cookie, so they're never sent to maxhayim.com), and they're left out of settings exports. */

const MESHMONITOR_KEY = "comcen_meshmonitor"; // { url, token, source }
const MESHMONITOR_REFRESH_MS = 60 * 1000;
const MESH_BROADCAST = "!ffffffff";

function readMeshMonitor() {
  const saved = readJSON(MESHMONITOR_KEY, null);
  if (!saved || typeof saved.url !== "string" || typeof saved.token !== "string" || !saved.url || !saved.token) return null;
  return { url: saved.url, token: saved.token, source: typeof saved.source === "string" && saved.source ? saved.source : "default" };
}

function saveMeshMonitor(conn) {
  if (conn) writeStore("localStorage", MESHMONITOR_KEY, JSON.stringify(conn));
  else {
    try {
      localStorage.removeItem(MESHMONITOR_KEY);
    } catch {
      /* ignore */
    }
  }
  meshSnapshots.clear();
  window.dispatchEvent(new Event("mh-meshmonitor-changed"));
}

function useMeshMonitorConfig() {
  const [conn, setConn] = useState(readMeshMonitor);
  useEffect(() => {
    const onChanged = () => setConn(readMeshMonitor());
    window.addEventListener("mh-meshmonitor-changed", onChanged);
    return () => window.removeEventListener("mh-meshmonitor-changed", onChanged);
  }, []);
  return conn;
}

// "meshmonitor.example.com/" → "https://meshmonitor.example.com"; a pasted ".../api/v1" is trimmed off
function normalizeMeshMonitorUrl(raw) {
  let url = raw.trim().replace(/\/+$/, "");
  if (!url) return "";
  // No scheme typed: https, except for MeshMonitor on this computer, which usually runs plain http
  if (!/^https?:\/\//i.test(url)) url = /^(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(url) ? `http://${url}` : `https://${url}`;
  return url.replace(/\/api(\/v1)?$/i, "");
}

const isLocalHost = (url) => /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/i.test(url);

async function meshMonitorFetch(conn, path) {
  let response;
  try {
    response = await fetch(`${conn.url}/api/v1${path}`, {
      headers: { Authorization: `Bearer ${conn.token}`, Accept: "application/json" },
      credentials: "omit",
      cache: "no-store",
    });
  } catch {
    throw new Error("unreachable");
  }
  if (response.status === 401) throw new Error("token");
  if (response.status === 403) throw new Error("permission");
  if (!response.ok) throw new Error("server");
  const json = await response.json().catch(() => null);
  if (!json || json.success === false) throw new Error("server");
  return json.data;
}

function describeMeshMonitorError(error, url = "") {
  if (error.message === "insecure") {
    return "maxhayim.com uses https, so browsers block plain http servers. Use an https address, for example through a reverse proxy or Tailscale Serve.";
  }
  if (error.message === "unreachable") {
    return `Couldn't reach ${url || "MeshMonitor"}. Check the address, that it's online and uses https, and that MeshMonitor's ALLOWED_ORIGINS setting includes ${window.location.origin}.`;
  }
  if (error.message === "token") return "MeshMonitor didn't accept that API token.";
  if (error.message === "permission") return "That token isn't allowed to read nodes on this source.";
  return "MeshMonitor answered with an error. Check that it's version 4.13 or newer.";
}

// The latest snapshot per server and source, so the widget doesn't reload when it moves
const meshSnapshots = new Map(); // key -> { data, at }

async function loadMeshSnapshot(conn) {
  const base = `/sources/${encodeURIComponent(conn.source)}`;
  const [nodes, status, messages] = await Promise.all([
    meshMonitorFetch(conn, `${base}/nodes`),
    meshMonitorFetch(conn, `${base}/status`).catch(() => null),
    meshMonitorFetch(conn, `${base}/messages?limit=25`).catch(() => []),
  ]);
  const list = Array.isArray(nodes) ? nodes : [];
  const nowSeconds = Date.now() / 1000;
  const heardWithin = (seconds) => list.filter((n) => n.lastHeard && nowSeconds - n.lastHeard < seconds).length;
  const nameOf = (id) => {
    const node = list.find((n) => n.nodeId === id);
    return node?.longName || node?.shortName || id;
  };
  // Channel messages only: direct messages stay private, even on your own screen
  const latest = (Array.isArray(messages) ? messages : []).find((m) => m.text && m.toNodeId === MESH_BROADCAST);
  return {
    total: list.length,
    hour: heardWithin(3600),
    day: heardWithin(86400),
    week: heardWithin(7 * 86400),
    local: status ? { name: status.longName || status.shortName || status.localNodeId, connected: !!status.connected } : null,
    message: latest ? { from: nameOf(latest.fromNodeId), text: latest.text, at: latest.timestamp } : null,
  };
}

function useMeshSnapshot(conn) {
  const key = conn ? `${conn.url}|${conn.source}` : "";
  const [state, setState] = useState(() => ({ key, data: meshSnapshots.get(key)?.data ?? null, error: null }));

  useEffect(() => {
    if (!conn) return;
    let cancelled = false;
    const load = async () => {
      try {
        const data = await loadMeshSnapshot(conn);
        meshSnapshots.set(key, { data, at: Date.now() });
        if (!cancelled) setState({ key, data, error: null });
      } catch (error) {
        if (!cancelled) setState((s) => ({ key, data: s.key === key ? s.data : null, error }));
      }
    };
    const age = Date.now() - (meshSnapshots.get(key)?.at ?? 0);
    let id;
    const first = setTimeout(
      () => {
        load();
        id = setInterval(load, MESHMONITOR_REFRESH_MS);
      },
      Math.max(0, MESHMONITOR_REFRESH_MS - age),
    );
    return () => {
      cancelled = true;
      clearTimeout(first);
      clearInterval(id);
    };
  }, [conn, key]);

  if (!conn) return { data: null, error: null };
  if (state.key === key) return state;
  return { data: meshSnapshots.get(key)?.data ?? null, error: null };
}

const timeAgo = (ms) => {
  const s = Math.max(0, (Date.now() - ms) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)} min`;
  if (s < 86400) return `${Math.floor(s / 3600)} h`;
  return `${Math.floor(s / 86400)} d`;
};

/* Mesh widget: a Braun-style receiver panel for your MeshMonitor */
function MeshWidget() {
  const conn = useMeshMonitorConfig();
  const { data, error } = useMeshSnapshot(conn);
  useMinuteClock(); // keeps "5 min ago" current
  const open = () => openPreferences("mesh");
  const live = data && !error && data.local?.connected !== false;

  return (
    <section
      className="widget widget-mesh cursor-pointer px-3.5 pb-4 pt-3"
      role="button"
      tabIndex={0}
      aria-label={conn ? `Mesh: ${data ? `${data.hour} nodes heard in the last hour` : "loading"}. Open Mesh Radio preferences.` : "Mesh: not connected. Open Mesh Radio preferences."}
      title="Mesh Radio preferences"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--os-ink-3)]">
        <span className={`widget-led ${live ? "widget-led-on" : ""}`} aria-hidden="true" />
        <span className="min-w-0 truncate">{conn ? data?.local?.name || "mesh" : "mesh"}</span>
      </div>

      {!conn ? (
        <div className="flex h-[150px] flex-col items-center justify-center gap-2 text-center">
          <RadioTower className="h-8 w-8 text-[var(--os-ink-3)]" strokeWidth={1.4} aria-hidden="true" />
          <p className="text-[12px] leading-snug text-[var(--os-ink-2)]">Connect your MeshMonitor to see your mesh here.</p>
          <span className="rounded-full px-3 py-1 text-[12px] ring-1 ring-[var(--os-line)]">set up…</span>
        </div>
      ) : !data ? (
        <div className="flex h-[150px] items-center justify-center px-2 text-center text-[12px] text-[var(--os-ink-3)]">
          {error ? describeMeshMonitorError(error).split(". ")[0] + "." : "Listening…"}
        </div>
      ) : (
        <>
          <div className="mt-1.5 flex items-end gap-2">
            <span className="widget-weather-temp">{data.hour}</span>
            <span className="mb-1 text-[11px] leading-tight text-[var(--os-ink-3)]">
              heard in the
              <br />
              last hour
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1 border-t border-[var(--w-line)] pt-2 text-center tabular-nums">
            {[
              ["day", data.day],
              ["week", data.week],
              ["all", data.total],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[14px] font-semibold">{value}</div>
                <div className="text-[9.5px] uppercase tracking-[0.12em] text-[var(--os-ink-3)]">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 min-h-[34px] border-t border-[var(--w-line)] pt-2 text-[11px] leading-snug">
            {data.message ? (
              <>
                <div className="flex items-baseline justify-between gap-2 text-[10px] text-[var(--os-ink-3)]">
                  <span className="truncate font-semibold text-[var(--os-ink-2)]">{data.message.from}</span>
                  <span className="shrink-0">{timeAgo(data.message.at)}</span>
                </div>
                <p className="line-clamp-2 text-[var(--os-ink-2)]" dir="auto">
                  {data.message.text}
                </p>
              </>
            ) : (
              <p className="text-[var(--os-ink-3)]">No channel messages yet.</p>
            )}
          </div>
        </>
      )}
      <span className="widget-credit">MeshMonitor</span>
    </section>
  );
}

// Mesh Radio → MeshMonitor
function MeshMonitorSettings() {
  const conn = useMeshMonitorConfig();
  const [url, setUrl] = useState(conn?.url || "");
  const [token, setToken] = useState(conn?.token || "");
  const [sources, setSources] = useState(null);
  const [source, setSource] = useState(conn?.source || "default");
  const [state, setState] = useState(null); // { kind: "testing" | "ok" | "error", text }

  const connect = async () => {
    const clean = normalizeMeshMonitorUrl(url);
    setUrl(clean);
    setState({ kind: "testing", text: "Connecting…" });
    try {
      if (clean.startsWith("http://") && !isLocalHost(clean) && window.location.protocol === "https:") throw new Error("insecure");
      const trial = { url: clean, token: token.trim(), source };
      const list = await meshMonitorFetch(trial, "/sources");
      const usable = Array.isArray(list) ? list : [];
      setSources(usable);
      const chosen = usable.some((s) => s.id === source) ? source : usable.find((s) => s.isPrimary)?.id || usable[0]?.id || "default";
      setSource(chosen);
      const status = await meshMonitorFetch({ ...trial, source: chosen }, `/sources/${encodeURIComponent(chosen)}/status`).catch(() => null);
      saveMeshMonitor({ ...trial, source: chosen });
      setWidgetShown("mesh", true);
      const sourceName = usable.find((s) => s.id === chosen)?.name;
      const node = status?.longName || status?.shortName || status?.localNodeId;
      setState({ kind: "ok", text: `Connected${node ? ` to ${node}` : ""}${sourceName ? ` on ${sourceName}` : ""}. The Mesh widget is on.` });
    } catch (error) {
      setState({ kind: "error", text: describeMeshMonitorError(error, clean) });
    }
  };

  const disconnect = () => {
    saveMeshMonitor(null);
    setToken("");
    setSources(null);
    setState({ kind: "ok", text: "Disconnected. The address and token were removed from this browser." });
  };

  const input = "w-full rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]";

  return (
    <div className="mt-4 rounded-xl p-4 ring-1 ring-[var(--os-line)]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[13px] font-semibold">MeshMonitor</div>
        <span className="flex items-center gap-1.5 text-[12px] text-[var(--os-ink-3)]">
          <span className={`widget-led ${conn ? "widget-led-on" : ""}`} aria-hidden="true" />
          {conn ? "connected" : "not connected"}
        </span>
      </div>
      <p className="mt-1 text-[12px] text-[var(--os-ink-3)]">Show your own mesh in the Mesh widget, live from your MeshMonitor server.</p>

      <form
        className="mt-3 grid gap-3 text-[13px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (url.trim() && token.trim()) connect();
        }}
      >
        <label className="flex flex-col gap-1.5">
          <span>server address</span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://meshmonitor.example.com" inputMode="url" autoComplete="off" spellCheck={false} className={input} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span>API token</span>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="mm_v1_…"
            autoComplete="off"
            spellCheck={false}
            className={`${input} font-mono`}
          />
        </label>
        {sources && sources.length > 1 && (
          <label className="flex flex-col gap-1.5">
            <span>source</span>
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                if (conn) saveMeshMonitor({ ...conn, source: e.target.value });
              }}
              className={input}
            >
              {sources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                  {s.type ? ` · ${s.type}` : ""}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          {conn && (
            <button type="button" onClick={disconnect} className="rounded-full px-3 py-1 text-[var(--os-warn)] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
              disconnect
            </button>
          )}
          <button
            type="submit"
            disabled={!url.trim() || !token.trim() || state?.kind === "testing"}
            className="rounded-full bg-[var(--os-accent)] px-3 py-1 font-semibold text-white hover:brightness-105 disabled:opacity-40"
          >
            {conn ? "save" : "connect"}
          </button>
        </div>
      </form>

      {state && (
        <p className={`mt-2 text-[12px] ${state.kind === "error" ? "text-[var(--os-warn)]" : "text-[var(--os-ink-2)]"}`} aria-live="polite">
          {state.text}
        </p>
      )}

      <details className="release group mt-3 text-[12px] text-[var(--os-ink-3)]">
        <summary className="flex cursor-pointer list-none items-center gap-1.5">
          <ChevronRight className="h-3 w-3 transition-transform group-open:rotate-90" aria-hidden="true" />
          setting up MeshMonitor
        </summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5 leading-relaxed">
          <li>In MeshMonitor, open Settings and create an API token. A token for a read-only user is plenty.</li>
          <li>
            Add <code className="font-mono">{window.location.origin}</code> to MeshMonitor&rsquo;s <code className="font-mono">ALLOWED_ORIGINS</code> setting and restart it.
          </li>
          <li>Use the https address you open MeshMonitor with. Plain http only works for MeshMonitor on this same computer.</li>
        </ol>
        <p className="mt-2">The address and token stay in this browser. They&rsquo;re never sent to maxhayim.com and are left out of exported settings.</p>
      </details>
    </div>
  );
}

/* ---------- Your pictures: custom wallpapers and Photos widget pictures ----------
   Kept in this browser's IndexedDB (cookies and local storage are far too small for pictures), shrunk first,
   and tagged with the user who added them so each user sees their own. Nothing is uploaded anywhere. */

const PICTURES_DB = "comcen";
const PICTURES_STORE = "pictures";

function openPictures() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("This browser can't keep pictures."));
      return;
    }
    const request = indexedDB.open(PICTURES_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(PICTURES_STORE)) request.result.createObjectStore(PICTURES_STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("This browser can't keep pictures."));
  });
}

async function picturesRequest(mode, makeRequest) {
  const db = await openPictures();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PICTURES_STORE, mode);
    const request = makeRequest(tx.objectStore(PICTURES_STORE));
    tx.oncomplete = () => {
      db.close();
      resolve(request?.result);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

const picturesChanged = () => window.dispatchEvent(new Event("mh-pictures-changed"));

async function listPictures(kind) {
  const all = (await picturesRequest("readonly", (store) => store.getAll())) || [];
  const user = currentUserId();
  return all.filter((p) => p.kind === kind && p.user === user).sort((a, b) => a.added - b.added);
}

const getPicture = (id) => picturesRequest("readonly", (store) => store.get(id));

async function addPicture(record) {
  await picturesRequest("readwrite", (store) => store.put(record));
  picturesChanged();
}

async function deletePicture(id) {
  await picturesRequest("readwrite", (store) => store.delete(id));
  if (readWallpaperCookie() === `custom-${id}`) saveWallpaper("calm");
  picturesChanged();
}

async function deletePicturesOf(user) {
  const all = (await picturesRequest("readonly", (store) => store.getAll()).catch(() => [])) || [];
  await Promise.all(all.filter((p) => p.user === user).map((p) => picturesRequest("readwrite", (store) => store.delete(p.id))));
}

function usePictures(kind) {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    let cancelled = false;
    const load = () =>
      listPictures(kind)
        .then((list) => !cancelled && setPictures(list))
        .catch(() => !cancelled && setPictures([]));
    load();
    window.addEventListener("mh-pictures-changed", load);
    return () => {
      cancelled = true;
      window.removeEventListener("mh-pictures-changed", load);
    };
  }, [kind]);
  return pictures;
}

// Shrink a picture so it fits comfortably in the browser: longest side at most `maxSide`
function shrinkImage(file, maxSide, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith("image/")) {
      reject(new Error("That file isn't a picture."));
      return;
    }
    if (file.size > 40 * 1024 * 1024) {
      reject(new Error("That picture is too large (40 MB at most)."));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("That picture couldn't be read."))), "image/jpeg", quality);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That picture couldn't be opened."));
    };
    img.src = url;
  });
}

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

async function savePictureFile(file, kind) {
  const [blob, thumbBlob] = await Promise.all([shrinkImage(file, kind === "wallpaper" ? 2560 : 1200), shrinkImage(file, 360, 0.75)]);
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  await addPicture({ id, kind, user: currentUserId(), blob, thumb: await blobToDataUrl(thumbBlob), name: file.name, added: Date.now() });
  return id;
}

// Object URLs for stored pictures, released when no longer shown
function useObjectUrl(blob) {
  const url = useMemo(() => (blob ? URL.createObjectURL(blob) : null), [blob]);
  useEffect(() => () => url && URL.revokeObjectURL(url), [url]);
  return url;
}

// Custom wallpapers load from IndexedDB after the page starts
let customWallpaperUrl = null;
async function applyCustomWallpaper(id) {
  const picture = await getPicture(id.slice("custom-".length)).catch(() => null);
  if (readWallpaperCookie() !== id) return; // changed while loading
  if (!picture?.blob) {
    applyWallpaper("calm");
    return;
  }
  if (customWallpaperUrl) URL.revokeObjectURL(customWallpaperUrl);
  customWallpaperUrl = URL.createObjectURL(picture.blob);
  const root = document.documentElement;
  root.style.setProperty("--os-wallpaper-image", `url("${customWallpaperUrl}")`);
  root.style.setProperty("--os-wallpaper-position", "center");
  root.dataset.wallpaper = "custom";
}

// Wallpaper pane: your own pictures, after the built-in ones
function CustomWallpapers({ current }) {
  const pictures = usePictures("wallpaper");
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const add = async (files) => {
    setMessage("");
    setBusy(true);
    try {
      let last = null;
      for (const file of files) last = await savePictureFile(file, "wallpaper");
      if (last) saveWallpaper(`custom-${last}`);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="mb-2 mt-5 text-[13px] font-semibold">your pictures</div>
      <div role="radiogroup" aria-label="Your wallpapers" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {pictures.map((p) => {
          const id = `custom-${p.id}`;
          const active = id === current;
          return (
            <div key={p.id} className="relative">
              <button type="button" role="radio" aria-checked={active} onClick={() => saveWallpaper(id)} className="prefs-option flex w-full flex-col items-center gap-2 rounded-xl p-1.5 text-[13px]">
                <img src={p.thumb} alt="" className={`aspect-video w-full rounded-lg object-cover ${active ? "wallpaper-thumb-active" : "wallpaper-thumb"}`} />
                <span className="flex max-w-full items-center gap-1.5">
                  <span className={`os-dot shrink-0 ${active ? "os-dot-on" : ""}`} aria-hidden="true" />
                  <span className="truncate">{p.name.replace(/\.[^.]+$/, "")}</span>
                </span>
              </button>
              <button type="button" onClick={() => deletePicture(p.id)} className="widget-remove" aria-label={`Remove ${p.name}`} title="Remove">
                <X className="h-3 w-3" strokeWidth={2.6} />
              </button>
            </div>
          );
        })}
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="prefs-option flex aspect-video flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[var(--os-line)] text-[12px] text-[var(--os-ink-2)]"
        >
          <ImageIcon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          {busy ? "adding…" : "add your own…"}
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          add([...(e.target.files || [])]);
          e.target.value = "";
        }}
      />
      {message && <p className="mt-2 text-[12px] text-[var(--os-warn)]">{message}</p>}
      <p className="mt-3 text-[12px] text-[var(--os-ink-3)]">Your pictures are resized and kept in this browser. Nothing is uploaded.</p>
    </>
  );
}

/* ---------- More widgets: Calculator, Calendar, Notes, World Clock, Photos ---------- */

/* Calculator: after the Braun ET66 by Dieter Rams and Dietrich Lubs, 1987 */
const CALC_MAX_DIGITS = 9;

function formatCalc(n) {
  if (!Number.isFinite(n)) return "Error";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-7 && n !== 0)) return n.toExponential(3).replace("e+", "e");
  return String(Number.parseFloat(n.toPrecision(CALC_MAX_DIGITS)));
}

function calcStep(state, key) {
  const value = Number.parseFloat(state.display);
  const apply = (a, op, b) => (op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : b === 0 ? Number.NaN : a / b);
  if (state.display === "Error" && key !== "C") return state;
  if (/^[0-9]$/.test(key)) {
    if (state.fresh) return { ...state, display: key, fresh: false };
    if (state.display.replace(/[-.]/g, "").length >= CALC_MAX_DIGITS) return state;
    return { ...state, display: state.display === "0" ? key : state.display + key };
  }
  if (key === ".") {
    if (state.fresh) return { ...state, display: "0.", fresh: false };
    return state.display.includes(".") ? state : { ...state, display: `${state.display}.` };
  }
  if (key === "C") return { display: "0", acc: null, op: null, fresh: true };
  if (key === "±") return { ...state, display: formatCalc(-value) };
  // Percent finishes the sum like a pocket calculator: 50 × 10 % = 5, 200 + 10 % = 220, 200 − 10 % = 180
  if (key === "%") {
    if (state.acc === null || !state.op) return { ...state, display: formatCalc(value / 100), fresh: true };
    const part = (state.acc * value) / 100;
    const result = state.op === "×" ? part : state.op === "÷" ? (value === 0 ? Number.NaN : (state.acc * 100) / value) : state.op === "+" ? state.acc + part : state.acc - part;
    return { display: formatCalc(result), acc: null, op: null, fresh: true };
  }
  if (["+", "−", "×", "÷"].includes(key)) {
    const acc = state.acc !== null && state.op && !state.fresh ? apply(state.acc, state.op, value) : value;
    return { display: formatCalc(acc), acc, op: key, fresh: true };
  }
  if (key === "=") {
    if (state.acc === null || !state.op) return { ...state, fresh: true };
    return { display: formatCalc(apply(state.acc, state.op, value)), acc: null, op: null, fresh: true };
  }
  return state;
}

const CALC_KEYS = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="];

function CalculatorWidget() {
  const [state, setState] = useState({ display: "0", acc: null, op: null, fresh: true });
  const press = (key) => setState((s) => calcStep(s, key));
  const keyMap = { "*": "×", x: "×", "/": "÷", "-": "−", "+": "+", Enter: "=", "=": "=", Escape: "C", c: "C", C: "C", ",": ".", ".": ".", "%": "%" };

  return (
    <section
      className="widget widget-calc"
      aria-label="Calculator"
      tabIndex={0}
      onKeyDown={(e) => {
        const key = /^[0-9]$/.test(e.key) ? e.key : keyMap[e.key];
        // Keys the calculator uses stay with it (Escape clears instead of closing the dashboard)
        if (e.key === "Backspace") {
          e.preventDefault();
          e.stopPropagation();
          setState((s) => (s.fresh ? s : { ...s, display: s.display.length > 1 ? s.display.slice(0, -1) : "0" }));
        } else if (key && !e.altKey && !e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          e.stopPropagation();
          press(key);
        }
      }}
    >
      <div className="widget-calc-lcd" aria-live="polite">
        <span className="widget-calc-op">{state.op || ""}</span>
        {state.display}
      </div>
      <div className="widget-calc-keys">
        {CALC_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => press(key)}
            className={`widget-calc-key ${key === "=" ? "widget-calc-equals" : ""} ${key === "C" ? "widget-calc-clear" : ""} ${key === "0" ? "col-span-2" : ""} ${["÷", "×", "−", "+"].includes(key) ? "widget-calc-fn" : ""}`}
            aria-label={{ "÷": "divide", "×": "multiply", "−": "minus", "+": "plus", "±": "change sign", "%": "percent", C: "clear", "=": "equals", ".": "point" }[key] || key}
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  );
}

/* Calendar: this month, in your language, starting on your week's first day */
function weekStartsOn(locale) {
  try {
    const info = new Intl.Locale(locale);
    const first = info.getWeekInfo?.().firstDay ?? info.weekInfo?.firstDay;
    if (first) return first % 7; // 7 = Sunday
  } catch {
    /* older browsers */
  }
  return ["en-US", "he", "ja", "pt-BR"].includes(locale) ? 0 : 1;
}

function CalendarWidget() {
  const now = useMinuteClock();
  const [region] = usePrefs(REGION_PREFS);
  const start = weekStartsOn(region.locale);
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() - start + 7) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 7 + ((start + i) % 7)).toLocaleDateString(region.locale, { weekday: "narrow" }));
  const open = () => openPreferences("datetime");

  return (
    <section
      className="widget widget-calendar cursor-pointer px-3.5 pb-3.5 pt-3"
      role="button"
      tabIndex={0}
      aria-label={`Calendar: ${now.toLocaleDateString(region.locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}. Open date and time preferences.`}
      title="Date & time preferences"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.16em]">
        <span className="font-semibold text-[var(--os-accent)]" dir="auto">
          {now.toLocaleDateString(region.locale, { month: "long" })}
        </span>
        <span className="text-[var(--os-ink-3)]">{year}</span>
      </div>
      <div className="mt-2 grid grid-cols-7 text-center text-[9.5px] text-[var(--os-ink-3)]" aria-hidden="true">
        {weekdays.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-y-0.5 text-center text-[11px] tabular-nums" aria-hidden="true">
        {cells.map((day, i) => (
          <span key={i} className={`mx-auto flex h-[21px] w-[21px] items-center justify-center rounded-full ${day === now.getDate() ? "bg-[var(--os-accent)] font-semibold text-white" : ""}`}>
            {day || ""}
          </span>
        ))}
      </div>
    </section>
  );
}

/* Notes: a sticky note that saves as you type */
const NOTE_KEY = "comcen_note";


/* World Clock: three cities, set in Widgets preferences */
const WORLD_PREFS = {
  cookie: "comcen_worldclock",
  event: "mh-worldclock-changed",
  defaults: { a: "Asia/Jerusalem", b: "Europe/London", c: "Asia/Tokyo" },
  allowed: Object.fromEntries(["a", "b", "c"].map((k) => [k, TIME_ZONES.filter((z) => z.id !== "auto").map((z) => z.id)])),
};
const cityName = (zone) => (TIME_ZONES.find((z) => z.id === zone)?.label || zone).split(" · ").pop();

function dayOffset(now, zone) {
  const local = new Date(now.toLocaleString("en-US"));
  const there = new Date(now.toLocaleString("en-US", { timeZone: zone }));
  const days = Math.round((new Date(there.toDateString()) - new Date(local.toDateString())) / 86400000);
  return days > 0 ? "tomorrow" : days < 0 ? "yesterday" : "today";
}

function WorldClockWidget() {
  const now = useClock();
  const [world] = usePrefs(WORLD_PREFS);
  const [region] = usePrefs(REGION_PREFS);
  const [time] = usePrefs(TIME_PREFS);
  const zones = [world.a, world.b, world.c];
  return (
    <section className="widget widget-world px-3 pb-3.5 pt-3" aria-label={`World clock: ${zones.map((z) => `${cityName(z)} ${formatTime(now, { region, time, timeZone: z })}`).join(", ")}`}>
      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--os-ink-3)]">world clock</div>
      <div className="mt-2 grid grid-cols-3 gap-1 text-center">
        {zones.map((zone, i) => (
          <div key={`${zone}-${i}`} className="flex min-w-0 flex-col items-center">
            <AnalogClock now={now} time={{ timeZone: zone }} className="h-[50px] w-[50px]" />
            <span className="mt-1.5 w-full truncate text-[11px] font-semibold">{cityName(zone)}</span>
            <span className="text-[10.5px] tabular-nums text-[var(--os-ink-2)]" dir="auto">
              {formatTime(now, { region, time, timeZone: zone })}
            </span>
            <span className="text-[9.5px] text-[var(--os-ink-3)]">{dayOffset(now, zone)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Photo Gallery: your own photos as a slideshow in a frame, a new one every 20 seconds.
   Click it for the full gallery. */
const PHOTO_INTERVAL_MS = 20000;

function PhotosWidget() {
  const photos = usePictures("photo");
  const [index, setIndex] = useState(0);
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const count = photos.length;
  const current = count ? photos[index % count] : null;
  const url = useObjectUrl(current?.blob);

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => i + 1), PHOTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);

  const add = async (files) => {
    setBusy(true);
    try {
      for (const file of files) await savePictureFile(file, "photo");
    } catch {
      /* a file that isn't a picture is skipped */
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="widget widget-photos" aria-label={current ? `Photo Gallery: ${current.name}` : "Photo Gallery"}>
      {current ? (
        <button
          type="button"
          onClick={() => openPhotoGallery(index % count)}
          className="widget-photos-frame"
          title="Open the photo gallery"
          aria-label={`${current.name}. Open the photo gallery.`}
        >
          {url && <img src={url} alt="" className="h-full w-full object-cover" />}
        </button>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
          <ImageIcon className="h-8 w-8 text-[var(--os-ink-3)]" strokeWidth={1.4} aria-hidden="true" />
          <p className="text-[12px] text-[var(--os-ink-2)]">Your photos, in a frame.</p>
          <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="rounded-full px-3 py-1 text-[12px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
            {busy ? "adding…" : "add photos…"}
          </button>
        </div>
      )}
      {count > 1 && (
        <div className="widget-photos-dots" aria-hidden="true">
          {photos.slice(0, 8).map((p, i) => (
            <span key={p.id} className={i === index % count ? "on" : ""} />
          ))}
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          add([...(e.target.files || [])]);
          e.target.value = "";
        }}
      />
    </section>
  );
}

// Widgets pane: the Photos widget's pictures and the World Clock's cities
function WidgetExtrasSettings() {
  const photos = usePictures("photo");
  const [world, setWorld] = usePrefs(WORLD_PREFS);
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const select = "w-full rounded-lg bg-[var(--os-card)] px-2 py-1.5 ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]";

  const add = async (files) => {
    setBusy(true);
    setMessage("");
    try {
      for (const file of files) await savePictureFile(file, "photo");
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="mt-6 text-[13px] font-semibold">photos</div>
      <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {photos.map((p) => (
          <div key={p.id} className="relative">
            <img src={p.thumb} alt={p.name} className="aspect-square w-full rounded-lg object-cover ring-1 ring-[var(--os-line)]" />
            <button type="button" onClick={() => deletePicture(p.id)} className="widget-remove" aria-label={`Remove ${p.name}`} title="Remove">
              <X className="h-3 w-3" strokeWidth={2.6} />
            </button>
          </div>
        ))}
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="prefs-option flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[var(--os-line)] text-[11px] text-[var(--os-ink-2)]"
        >
          <ImageIcon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          {busy ? "adding…" : "add…"}
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          add([...(e.target.files || [])]);
          e.target.value = "";
        }}
      />
      {message && <p className="mt-2 text-[12px] text-[var(--os-warn)]">{message}</p>}
      <p className="mt-2 text-[12px] text-[var(--os-ink-3)]">Shown in the Photos widget. Resized and kept in this browser; nothing is uploaded.</p>

      <div className="mt-6 text-[13px] font-semibold">world clock cities</div>
      <div className="mt-2 grid gap-2 text-[13px] sm:grid-cols-3">
        {["a", "b", "c"].map((slot) => (
          <select key={slot} value={world[slot]} onChange={(e) => setWorld({ [slot]: e.target.value })} className={select} aria-label={`World clock city ${slot.toUpperCase()}`}>
            {TIME_ZONES.filter((z) => z.id !== "auto").map((z) => (
              <option key={z.id} value={z.id}>
                {z.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </>
  );
}

/* Widget gallery: every widget with a live preview, to add or remove */
const openWidgetGallery = () => window.dispatchEvent(new Event("mh-widget-gallery-open"));

// Each gallery card gets its own backdrop: the built-in wallpapers, alternating with Braun-style color panels
const GALLERY_PANELS = [
  "linear-gradient(150deg, #e8591a, #9c3410)",
  "linear-gradient(150deg, #8a9a6b, #4f5d3a)",
  "linear-gradient(150deg, #5d7f93, #2f4b5c)",
  "linear-gradient(150deg, #d9d4c7, #a8a294)",
  "linear-gradient(150deg, #f2b200, #b07c00)",
];
// Wallpaper, panel, wallpaper, panel… then the remaining panels: nine different backdrops for nine widgets
const GALLERY_BACKDROPS = [
  ...WALLPAPERS.flatMap((w, i) => [`url("${w.thumb}")`, GALLERY_PANELS[i]]),
  ...GALLERY_PANELS.slice(WALLPAPERS.length),
];
const galleryBackground = (i) => ({ backgroundImage: GALLERY_BACKDROPS[i % GALLERY_BACKDROPS.length] });

function WidgetGallery() {
  const [open, setOpen] = useState(false);
  const layout = useWidgetLayout();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("mh-widget-gallery-open", onOpen);
    return () => window.removeEventListener("mh-widget-gallery-open", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation(); // close just the gallery, not what's behind it
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);

  if (!open) return null;
  const out = WIDGET_KINDS.filter((w) => layout.shown[w.id]).length;

  return (
    <div className="os-ui no-print fixed inset-0 z-[72] flex items-center justify-center bg-black/30 p-3 sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="gallery-title" className="os-window prefs-window flex max-h-[calc(100vh-24px)] w-full max-w-[880px] flex-col overflow-hidden">
        <div className="relative flex items-center gap-3 border-b border-[var(--os-line)] px-4 py-2.5">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close widget gallery" title="Close" className="os-round-btn os-win-close">
            <X className="h-3.5 w-3.5" strokeWidth={2.2} />
          </button>
          <h2 id="gallery-title" className="pointer-events-none absolute inset-x-0 text-center font-semibold tracking-tight">
            widget gallery
          </h2>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openPreferences("widgets");
            }}
            className="relative ml-auto rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]"
          >
            widget settings…
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          <p className="mb-4 text-[13px] text-[var(--os-ink-3)]">
            {out} of {WIDGET_KINDS.length} out. Add one and it appears on your desktop and in the dashboard; drag it wherever you like.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {WIDGET_KINDS.map((kind, i) => {
              const { id, label, note, settings } = kind;
              const Preview = kind.Component;
              const shown = layout.shown[id];
              return (
                <div key={id} className={`gallery-card ${shown ? "gallery-card-on" : ""}`}>
                  <div className="gallery-preview" style={galleryBackground(i)} aria-hidden="true" inert>
                    <div className="gallery-preview-scale">
                      <Preview />
                    </div>
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold">{label}</span>
                      <span className="line-clamp-2 block text-[11.5px] leading-snug text-[var(--os-ink-3)]">{note}</span>
                      {settings && (
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            openPreferences(settings);
                          }}
                          className="mt-0.5 text-[11.5px] text-[var(--os-accent)] underline-offset-2 hover:underline"
                        >
                          settings…
                        </button>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => setWidgetShown(id, !shown)}
                      aria-label={`${shown ? "Remove" : "Add"} the ${label.toLowerCase()} widget`}
                      className={shown ? "gallery-toggle gallery-toggle-on" : "gallery-toggle"}
                    >
                      {shown ? <Check className="h-3.5 w-3.5" strokeWidth={2.6} /> : <span aria-hidden="true">+</span>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Photo gallery viewer: every photo large, with a thumbnail strip, arrows, and arrow keys */
const openPhotoGallery = (index = 0) => window.dispatchEvent(new CustomEvent("mh-photo-gallery-open", { detail: index }));

function PhotoGalleryViewer() {
  const photos = usePictures("photo");
  const [index, setIndex] = useState(null); // null = closed
  const fileRef = useRef(null);
  const stripRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const count = photos.length;
  const current = index !== null && count ? photos[Math.min(index, count - 1)] : null;
  const url = useObjectUrl(current?.blob);
  const go = (step) => setIndex((i) => (count ? (i + step + count) % count : 0));

  useEffect(() => {
    const onOpen = (e) => setIndex(Number(e.detail) || 0);
    window.addEventListener("mh-photo-gallery-open", onOpen);
    return () => window.removeEventListener("mh-photo-gallery-open", onOpen);
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation(); // close just the viewer
        setIndex(null);
      } else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  });

  // Keep the current thumbnail in view
  useEffect(() => {
    stripRef.current?.querySelector("[aria-current='true']")?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  if (index === null) return null;

  const add = async (files) => {
    setBusy(true);
    try {
      for (const file of files) await savePictureFile(file, "photo");
    } catch {
      /* a file that isn't a picture is skipped */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="os-ui no-print photo-viewer fixed inset-0 z-[73] flex flex-col" role="dialog" aria-modal="true" aria-label="Photo gallery">
      <div className="flex items-center gap-3 px-4 py-3 text-[13px] text-white/80">
        <button type="button" onClick={() => setIndex(null)} aria-label="Close the photo gallery" title="Close" className="os-round-btn os-win-close">
          <X className="h-3.5 w-3.5" strokeWidth={2.2} />
        </button>
        <span className="min-w-0 flex-1 truncate font-semibold text-white">{current ? current.name.replace(/\.[^.]+$/, "") : "photo gallery"}</span>
        {count > 0 && (
          <span className="tabular-nums">
            {Math.min(index, count - 1) + 1} / {count}
          </span>
        )}
        <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="photo-viewer-btn">
          {busy ? "adding…" : "add photos…"}
        </button>
        {current && (
          <button
            type="button"
            onClick={() => {
              deletePicture(current.id);
              setIndex((i) => Math.max(0, Math.min(i, count - 2)));
            }}
            className="photo-viewer-btn"
          >
            remove
          </button>
        )}
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4" onMouseDown={(e) => e.target === e.currentTarget && setIndex(null)}>
        {current ? (
          url && <img src={url} alt={current.name} className="max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
        ) : (
          <div className="text-center text-white/80">
            <ImageIcon className="mx-auto h-10 w-10" strokeWidth={1.3} aria-hidden="true" />
            <p className="mt-2 text-[14px]">No photos yet.</p>
          </div>
        )}
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className="photo-viewer-arrow left-3" aria-label="Previous photo">
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <button type="button" onClick={() => go(1)} className="photo-viewer-arrow right-3" aria-label="Next photo">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {count > 0 && (
        <div ref={stripRef} className="flex gap-2 overflow-x-auto px-4 py-3" role="list" aria-label="Photos">
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="listitem"
              aria-current={i === Math.min(index, count - 1)}
              aria-label={p.name}
              onClick={() => setIndex(i)}
              className={`photo-viewer-thumb ${i === Math.min(index, count - 1) ? "photo-viewer-thumb-on" : ""}`}
            >
              <img src={p.thumb} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          add([...(e.target.files || [])]);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ---------- Convert, Sticky Notes, Translator, Flight Tracker, Stocks ---------- */

const widgetSelect =
  "min-w-0 rounded-md bg-[var(--os-card)] px-1.5 py-1 text-[12px] ring-1 ring-[var(--w-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]";
const widgetInput =
  "w-full min-w-0 rounded-md bg-[var(--os-card)] px-2 py-1 text-[13px] ring-1 ring-[var(--w-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]";

function useStoredJSON(key, fallback) {
  const [value, setValue] = useState(() => readJSON(key, fallback));
  const update = (next) => {
    setValue((current) => {
      const merged = typeof next === "function" ? next(current) : next;
      writeStore("localStorage", key, JSON.stringify(merged));
      return merged;
    });
  };
  return [value, update];
}

/* Convert: units on the device; currencies from Frankfurter (European Central Bank reference rates) */
const UNIT_GROUPS = {
  length: { label: "length", units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344, "nmi": 1852 }, from: "mi", to: "km" },
  weight: { label: "weight", units: { mg: 1e-6, g: 0.001, kg: 1, t: 1000, oz: 0.028349523125, lb: 0.45359237, st: 6.35029318 }, from: "lb", to: "kg" },
  volume: {
    label: "volume",
    units: { ml: 0.001, l: 1, "US cup": 0.2365882365, "US fl oz": 0.0295735295625, "US qt": 0.946352946, "US gal": 3.785411784, "UK gal": 4.54609 },
    from: "US gal",
    to: "l",
  },
  speed: { label: "speed", units: { "m/s": 1, "km/h": 1 / 3.6, mph: 0.44704, kn: 1852 / 3600 }, from: "mph", to: "km/h" },
  area: { label: "area", units: { "m²": 1, "km²": 1e6, ha: 1e4, "ft²": 0.09290304, acre: 4046.8564224, "mi²": 2589988.110336 }, from: "acre", to: "m²" },
  temperature: { label: "temperature", units: { "°F": null, "°C": null, K: null }, from: "°F", to: "°C" },
  currency: { label: "currency", units: null, from: "USD", to: "EUR" },
};

function convertTemperature(value, from, to) {
  const celsius = from === "°C" ? value : from === "°F" ? ((value - 32) * 5) / 9 : value - 273.15;
  return to === "°C" ? celsius : to === "°F" ? (celsius * 9) / 5 + 32 : celsius + 273.15;
}

const currencyCache = { names: null, rates: new Map() }; // rates: "USD>EUR" -> { rate, date, at }

async function loadCurrencies() {
  if (currencyCache.names) return currencyCache.names;
  const response = await fetch("https://api.frankfurter.dev/v1/currencies");
  if (!response.ok) throw new Error("rates");
  currencyCache.names = await response.json();
  return currencyCache.names;
}

async function loadRate(from, to) {
  const key = `${from}>${to}`;
  const cached = currencyCache.rates.get(key);
  if (cached && Date.now() - cached.at < 60 * 60 * 1000) return cached;
  const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
  if (!response.ok) throw new Error("rates");
  const json = await response.json();
  const entry = { rate: json.rates[to], date: json.date, at: Date.now() };
  currencyCache.rates.set(key, entry);
  return entry;
}

const formatNumber = (n, locale) =>
  Number.isFinite(n) ? n.toLocaleString(locale, { maximumSignificantDigits: Math.abs(n) >= 1 ? 10 : 6, maximumFractionDigits: 6 }) : "—";

function ConvertWidget() {
  const [region] = usePrefs(REGION_PREFS);
  const [saved, setSaved] = useStoredJSON("comcen_convert", { group: "currency", value: "1", from: "USD", to: "EUR" });
  const [currencies, setCurrencies] = useState(currencyCache.names);
  const [rate, setRate] = useState(null); // { key, rate, date } | { key, error }
  const group = UNIT_GROUPS[saved.group] ? saved.group : "currency";
  const isCurrency = group === "currency";
  const options = isCurrency ? Object.keys(currencies || { USD: "", EUR: "", ILS: "", GBP: "" }) : Object.keys(UNIT_GROUPS[group].units);
  const from = options.includes(saved.from) ? saved.from : UNIT_GROUPS[group].from;
  const to = options.includes(saved.to) ? saved.to : UNIT_GROUPS[group].to;
  const value = Number.parseFloat(String(saved.value).replace(",", "."));
  const rateKey = `${from}>${to}`;

  useEffect(() => {
    if (!isCurrency || currencies) return;
    let cancelled = false;
    loadCurrencies()
      .then((names) => !cancelled && setCurrencies(names))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isCurrency, currencies]);

  useEffect(() => {
    if (!isCurrency || from === to) return;
    let cancelled = false;
    loadRate(from, to)
      .then((r) => !cancelled && setRate({ key: rateKey, rate: r.rate, date: r.date }))
      .catch(() => !cancelled && setRate({ key: rateKey, error: true }));
    return () => {
      cancelled = true;
    };
  }, [isCurrency, from, to, rateKey]);

  let result = Number.NaN;
  let footnote = "";
  if (Number.isFinite(value)) {
    if (isCurrency) {
      if (from === to) result = value;
      else if (rate?.key === rateKey && !rate.error) {
        result = value * rate.rate;
        footnote = `ECB rate, ${rate.date}`;
      } else footnote = rate?.key === rateKey ? "Rates aren't available right now." : "Getting today's rate…";
    } else if (group === "temperature") result = convertTemperature(value, from, to);
    else result = (value * UNIT_GROUPS[group].units[from]) / UNIT_GROUPS[group].units[to];
  }

  const set = (patch) => setSaved((s) => ({ ...s, ...patch }));
  // Pickers show codes to stay compact; currency names are spelled out under the result
  const names = isCurrency && currencies?.[from] && currencies?.[to] ? `${currencies[from]} → ${currencies[to]}` : "";

  return (
    <section className="widget widget-convert px-3.5 pb-3.5 pt-3" aria-label="Convert">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--os-ink-3)]">convert</span>
        <select
          value={group}
          onChange={(e) => set({ group: e.target.value, from: UNIT_GROUPS[e.target.value].from, to: UNIT_GROUPS[e.target.value].to })}
          className={widgetSelect}
          aria-label="What to convert"
        >
          {Object.entries(UNIT_GROUPS).map(([id, g]) => (
            <option key={id} value={id}>
              {g.label}
            </option>
          ))}
        </select>
      </div>
      <input
        value={saved.value}
        onChange={(e) => set({ value: e.target.value.slice(0, 18) })}
        inputMode="decimal"
        aria-label="Amount"
        className={`${widgetInput} mt-2.5 text-[15px] tabular-nums`}
      />
      <div className="mt-2 flex items-center gap-1">
        <select value={from} onChange={(e) => set({ from: e.target.value })} className={`${widgetSelect} flex-1`} aria-label="From">
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => set({ from: to, to: from })} className="widget-mini-btn shrink-0" aria-label="Swap" title="Swap">
          ⇄
        </button>
        <select value={to} onChange={(e) => set({ to: e.target.value })} className={`${widgetSelect} flex-1`} aria-label="To">
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 truncate text-[26px] font-light leading-none tracking-tight tabular-nums" aria-live="polite">
        {formatNumber(result, region.locale)}
        <span className="ml-1 text-[13px] font-medium text-[var(--os-ink-3)]">{to}</span>
      </div>
      <div className="mt-1.5 truncate text-[10.5px] text-[var(--os-ink-2)]">{names}</div>
      <div className="h-[14px] truncate text-[10.5px] text-[var(--os-ink-3)]">{footnote}</div>
    </section>
  );
}

/* Sticky Notes: several notes in five colors, saved as you type */
const NOTES_KEY = "comcen_notes";
const NOTE_COLORS = { yellow: "#f2c94c", orange: "#f08a5d", green: "#8fb07a", blue: "#7fa6c4", grey: "#c9c4b8" };

function readNotes() {
  const saved = readJSON(NOTES_KEY, null);
  if (Array.isArray(saved) && saved.length) {
    return saved.filter((n) => n && typeof n.text === "string").map((n) => ({ id: String(n.id), text: n.text.slice(0, 2000), color: NOTE_COLORS[n.color] ? n.color : "yellow" }));
  }
  // The single note from before Sticky Notes becomes the first one
  return [{ id: "n1", text: readStore("localStorage", NOTE_KEY) || "", color: "yellow" }];
}

function NotesWidget() {
  const [notes, setNotesState] = useState(readNotes);
  const [index, setIndex] = useState(0);
  const current = notes[Math.min(index, notes.length - 1)];
  const save = (next) => {
    setNotesState(next);
    writeStore("localStorage", NOTES_KEY, JSON.stringify(next));
  };
  const update = (patch) => save(notes.map((n) => (n.id === current.id ? { ...n, ...patch } : n)));
  const add = () => {
    const next = [...notes, { id: `n${Date.now().toString(36)}`, text: "", color: Object.keys(NOTE_COLORS)[notes.length % 5] }];
    save(next);
    setIndex(next.length - 1);
  };
  const remove = () => {
    const next = notes.filter((n) => n.id !== current.id);
    save(next.length ? next : [{ id: `n${Date.now().toString(36)}`, text: "", color: "yellow" }]);
    setIndex((i) => Math.max(0, Math.min(i, next.length - 1)));
  };

  return (
    <section className="widget widget-notes" aria-label="Sticky notes" style={{ "--note": NOTE_COLORS[current.color] }}>
      <textarea
        value={current.text}
        maxLength={2000}
        onChange={(e) => update({ text: e.target.value })}
        placeholder="Write a note…"
        aria-label={`Note ${index + 1} of ${notes.length}`}
        spellCheck
        dir="auto"
        className="widget-notes-text"
      />
      <div className="widget-notes-bar">
        <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)} className="widget-notes-btn" aria-label="Previous note">
          ‹
        </button>
        <span className="tabular-nums">
          {Math.min(index, notes.length - 1) + 1}/{notes.length}
        </span>
        <button type="button" disabled={index >= notes.length - 1} onClick={() => setIndex((i) => i + 1)} className="widget-notes-btn" aria-label="Next note">
          ›
        </button>
        <span className="ml-auto flex gap-1" role="radiogroup" aria-label="Note color">
          {Object.entries(NOTE_COLORS).map(([name, color]) => (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={current.color === name}
              aria-label={name}
              onClick={() => update({ color: name })}
              className={`h-3 w-3 rounded-full ${current.color === name ? "ring-2 ring-[var(--os-ink)] ring-offset-1 ring-offset-transparent" : ""}`}
              style={{ background: color }}
            />
          ))}
        </span>
        <button type="button" onClick={add} className="widget-notes-btn" aria-label="New note" title="New note">
          +
        </button>
        <button type="button" onClick={remove} className="widget-notes-btn" aria-label="Delete this note" title="Delete this note">
          ×
        </button>
      </div>
    </section>
  );
}

/* Translator: Chrome's on-device translator when it's there (nothing leaves your computer), otherwise MyMemory */
const TRANSLATE_LANGS = [
  ["en", "English"],
  ["he", "עברית"],
  ["es", "Español"],
  ["fr", "Français"],
  ["de", "Deutsch"],
  ["it", "Italiano"],
  ["pt", "Português"],
  ["ru", "Русский"],
  ["ar", "العربية"],
  ["zh", "中文"],
  ["ja", "日本語"],
];
const TRANSLATE_MAX = 450; // MyMemory's free limit is 500 bytes a request

const decodeEntities = (text) => new DOMParser().parseFromString(`<!doctype html><body>${text}`, "text/html").body.textContent || "";

async function translateText(text, from, to) {
  if (typeof self !== "undefined" && "Translator" in self) {
    try {
      const availability = await self.Translator.availability({ sourceLanguage: from, targetLanguage: to });
      if (availability === "available") {
        const translator = await self.Translator.create({ sourceLanguage: from, targetLanguage: to });
        return { text: await translator.translate(text), via: "on this device" };
      }
    } catch {
      /* fall through to MyMemory */
    }
  }
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.responseData || json.quotaFinished) throw new Error("translate");
  return { text: decodeEntities(json.responseData.translatedText), via: "MyMemory" };
}

function TranslatorWidget() {
  const [langs, setLangs] = useStoredJSON("comcen_translate", { from: "en", to: "he" });
  const [text, setText] = useState("");
  const [result, setResult] = useState(null); // { text, via } | { error } | "working"

  const run = async () => {
    const input = text.trim();
    if (!input) return;
    setResult("working");
    try {
      setResult(await translateText(input, langs.from, langs.to));
    } catch {
      setResult({ error: "Couldn't translate right now. Try again in a little while." });
    }
  };

  return (
    <section className="widget widget-translate px-3.5 pb-3 pt-3" aria-label="Translator">
      <div className="flex items-center gap-1">
        <select value={langs.from} onChange={(e) => setLangs((l) => ({ ...l, from: e.target.value }))} className={`${widgetSelect} flex-1`} aria-label="From language">
          {TRANSLATE_LANGS.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setLangs((l) => ({ from: l.to, to: l.from }))} className="widget-mini-btn shrink-0" aria-label="Swap languages" title="Swap">
          ⇄
        </button>
        <select value={langs.to} onChange={(e) => setLangs((l) => ({ ...l, to: e.target.value }))} className={`${widgetSelect} flex-1`} aria-label="To language">
          {TRANSLATE_LANGS.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, TRANSLATE_MAX))}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            run();
          }
        }}
        placeholder="Type, then press Enter"
        aria-label="Text to translate"
        dir="auto"
        rows={3}
        className={`${widgetInput} mt-2 resize-none leading-snug`}
      />
      <div className="mt-2 min-h-[54px] rounded-md bg-[var(--os-hover)] px-2 py-1.5 text-[13px] leading-snug" aria-live="polite" dir="auto">
        {result === "working" ? (
          <span className="text-[var(--os-ink-3)]">Translating…</span>
        ) : result?.error ? (
          <span className="text-[12px] text-[var(--os-warn)]">{result.error}</span>
        ) : result ? (
          result.text
        ) : (
          <span className="text-[var(--os-ink-3)]">The translation appears here.</span>
        )}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] text-[var(--os-ink-3)]">
        <span>{result?.via ? `translated ${result.via === "MyMemory" ? "by MyMemory" : result.via}` : "Chrome translates on-device; others use MyMemory"}</span>
        <button type="button" onClick={run} disabled={!text.trim() || result === "working"} className="rounded-full px-2 py-0.5 text-[11px] ring-1 ring-[var(--w-line)] hover:bg-[var(--os-hover)] disabled:opacity-40">
          translate
        </button>
      </div>
    </section>
  );
}

/* Flight Tracker: a flight's airline and route from adsbdb, a photo from Planespotters, and a live map at ADS-B Exchange */
// Two-letter airline codes the route database doesn't take on their own (it wants the three-letter ones)
const AIRLINE_ICAO = {
  AA: "AAL", UA: "UAL", DL: "DAL", WN: "SWA", B6: "JBU", AS: "ASA", NK: "NKS", F9: "FFT", HA: "HAL", LY: "ELY", BA: "BAW", VS: "VIR",
  LH: "DLH", AF: "AFR", KL: "KLM", IB: "IBE", AY: "FIN", SK: "SAS", LX: "SWR", OS: "AUA", TK: "THY", EK: "UAE", QR: "QTR", EY: "ETD",
  FR: "RYR", U2: "EZY", AC: "ACA", AM: "AMX", AV: "AVA", CM: "CMP", LA: "LAN", SQ: "SIA", CX: "CPA", NH: "ANA", JL: "JAL", QF: "QFA",
};

function flightCandidates(raw) {
  const flight = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const match = flight.match(/^([A-Z0-9]{2})(\d{1,4})$/);
  const icao = match && AIRLINE_ICAO[match[1]] ? `${AIRLINE_ICAO[match[1]]}${match[2]}` : null;
  return [...new Set([flight, icao].filter(Boolean))];
}

async function lookupFlight(raw) {
  for (const callsign of flightCandidates(raw)) {
    const response = await fetch(`https://api.adsbdb.com/v0/callsign/${callsign}`).catch(() => null);
    if (!response) throw new Error("offline");
    if (response.status === 404 || response.status === 400) continue;
    const route = (await response.json())?.response?.flightroute;
    if (route) return route;
  }
  throw new Error("unknown");
}

function FlightWidget() {
  const [saved, setSaved] = useStoredJSON("comcen_flight", { flight: "LY1" });
  const [draft, setDraft] = useState(saved.flight);
  const [state, setState] = useState({ flight: null, route: null, error: null });
  const flight = saved.flight;
  const [region] = usePrefs(REGION_PREFS);

  useEffect(() => {
    if (!flight) return;
    let cancelled = false;
    lookupFlight(flight)
      .then((route) => !cancelled && setState({ flight, route, error: null }))
      .catch((e) => !cancelled && setState({ flight, route: null, error: e.message }));
    return () => {
      cancelled = true;
    };
  }, [flight]);

  const current = state.flight === flight ? state : { route: null, error: null };
  const route = current.route;
  const km = route ? pathTo({ lat: route.origin.latitude, lon: route.origin.longitude }, { lat: route.destination.latitude, lon: route.destination.longitude }).km : 0;
  const distance = region.temperature === "f" ? `${Math.round(km * 0.621371).toLocaleString(region.locale)} mi` : `${Math.round(km).toLocaleString(region.locale)} km`;
  const callsign = route?.callsign_icao || flight;

  return (
    <section className="widget widget-flight px-3.5 pb-3.5 pt-3" aria-label="Flight tracker">
      <form
        className="flex items-center gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          const next = draft.trim().toUpperCase();
          if (next) setSaved({ flight: next });
        }}
      >
        <Plane className="h-3.5 w-3.5 shrink-0 text-[var(--os-ink-3)]" aria-hidden="true" />
        <input value={draft} onChange={(e) => setDraft(e.target.value.slice(0, 10))} placeholder="Flight, e.g. LY1" aria-label="Flight number" className={`${widgetInput} font-mono uppercase`} />
        <button type="submit" className="widget-mini-btn shrink-0 ring-1 ring-[var(--w-line)]" aria-label="Look up flight" title="Look up">
          ↵
        </button>
      </form>

      {route ? (
        <>
          <div className="mt-2.5 truncate text-[12px] font-semibold">{route.airline?.name || "Flight"}</div>
          <div className="text-[10.5px] text-[var(--os-ink-3)]">
            {[route.callsign_iata, route.callsign_icao].filter(Boolean).join(" · ")}
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[22px] font-semibold leading-none tracking-tight">{route.origin.iata_code}</div>
              <div className="truncate text-[10.5px] text-[var(--os-ink-3)]">{route.origin.municipality}</div>
            </div>
            <div className="widget-flight-path" aria-hidden="true">
              <Plane className="h-3.5 w-3.5 rotate-45 text-[var(--os-accent)]" />
            </div>
            <div className="min-w-0 text-right">
              <div className="text-[22px] font-semibold leading-none tracking-tight">{route.destination.iata_code}</div>
              <div className="truncate text-[10.5px] text-[var(--os-ink-3)]">{route.destination.municipality}</div>
            </div>
          </div>
          <div className="mt-2 text-center text-[10.5px] text-[var(--os-ink-3)]">{distance} great-circle</div>
          <a
            href={`https://globe.adsbexchange.com/?callsign=${encodeURIComponent(callsign)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-1 rounded-full py-1 text-[11.5px] ring-1 ring-[var(--w-line)] hover:bg-[var(--os-hover)]"
          >
            track live <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </>
      ) : (
        <div className="flex h-[150px] items-center justify-center px-2 text-center text-[12px] text-[var(--os-ink-3)]">
          {current.error === "unknown"
            ? `No route found for ${flight}. Try the airline's code, like LY1 or ELY1.`
            : current.error
              ? "Couldn't reach the flight database."
              : "Looking up the route…"}
        </div>
      )}
    </section>
  );
}

/* Stocks: crypto from CoinGecko (no key needed); stocks from Finnhub with your own free key */
const STOCKS_KEY = "comcen_stocks"; // { symbols }
const FINNHUB_KEY = "comcen_finnhub"; // your Finnhub API key, kept in this browser and left out of exports
const CRYPTO_IDS = { BTC: "bitcoin", ETH: "ethereum", SOL: "solana", XRP: "ripple", DOGE: "dogecoin", ADA: "cardano", LTC: "litecoin", BNB: "binancecoin" };
const STOCKS_DEFAULT = "AAPL, MSFT, NVDA, TSLA, BTC, ETH";
const STOCKS_REFRESH_MS = 60 * 1000;

const readWatchlist = () =>
  String(readJSON(STOCKS_KEY, { symbols: STOCKS_DEFAULT }).symbols || STOCKS_DEFAULT)
    .toUpperCase()
    .split(/[\s,]+/)
    .filter((s) => /^[A-Z0-9.^-]{1,10}$/.test(s))
    .slice(0, 8);

const stocksCache = { data: null, at: 0, key: "" };

async function loadQuotes(symbols, apiKey) {
  const crypto = symbols.filter((s) => CRYPTO_IDS[s]);
  const stocks = symbols.filter((s) => !CRYPTO_IDS[s]);
  const quotes = {};
  if (crypto.length) {
    const ids = crypto.map((s) => CRYPTO_IDS[s]).join(",");
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`).catch(() => null);
    const json = response?.ok ? await response.json() : {};
    crypto.forEach((s) => {
      const q = json[CRYPTO_IDS[s]];
      if (q) quotes[s] = { price: q.usd, change: q.usd_24h_change };
    });
  }
  if (stocks.length && apiKey) {
    await Promise.all(
      stocks.map(async (s) => {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(s)}&token=${encodeURIComponent(apiKey)}`).catch(() => null);
        if (response?.status === 401) quotes[s] = { error: "key" };
        else if (response?.ok) {
          const q = await response.json();
          if (q && q.c) quotes[s] = { price: q.c, change: q.dp };
        }
      }),
    );
  }
  return quotes;
}

function useStockSettings() {
  const [settings, setSettings] = useState(() => ({ symbols: readWatchlist(), key: readStore("localStorage", FINNHUB_KEY) || "" }));
  useEffect(() => {
    const onChanged = () => setSettings({ symbols: readWatchlist(), key: readStore("localStorage", FINNHUB_KEY) || "" });
    window.addEventListener("mh-stocks-changed", onChanged);
    return () => window.removeEventListener("mh-stocks-changed", onChanged);
  }, []);
  return settings;
}

function StocksWidget() {
  const { symbols, key } = useStockSettings();
  const cacheKey = `${symbols.join(",")}|${key ? "k" : ""}`;
  const [state, setState] = useState(() => (stocksCache.key === cacheKey ? { key: cacheKey, data: stocksCache.data } : { key: cacheKey, data: null }));
  const [region] = usePrefs(REGION_PREFS);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      loadQuotes(symbols, key).then((data) => {
        Object.assign(stocksCache, { data, at: Date.now(), key: cacheKey });
        if (!cancelled) setState({ key: cacheKey, data });
      });
    const age = stocksCache.key === cacheKey ? Date.now() - stocksCache.at : Infinity;
    let id;
    const first = setTimeout(
      () => {
        load();
        id = setInterval(load, STOCKS_REFRESH_MS);
      },
      Math.max(0, STOCKS_REFRESH_MS - age),
    );
    return () => {
      cancelled = true;
      clearTimeout(first);
      clearInterval(id);
    };
  }, [cacheKey, symbols, key]);

  const data = state.key === cacheKey ? state.data : null;
  const needsKey = !key && symbols.some((s) => !CRYPTO_IDS[s]);
  const money = (n) => n.toLocaleString(region.locale, { style: "currency", currency: "USD", maximumFractionDigits: n >= 1000 ? 0 : 2 });

  return (
    <section className="widget widget-stocks px-3.5 pb-3 pt-3" aria-label="Stocks">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[var(--os-ink-3)]">
        <span>stocks</span>
        <button type="button" onClick={() => openPreferences("widgets")} className="normal-case tracking-normal underline-offset-2 hover:underline">
          edit
        </button>
      </div>
      <ul className="mt-1.5 divide-y divide-[var(--w-line)]">
        {symbols.map((s) => {
          const q = data?.[s];
          const up = q?.change >= 0;
          return (
            <li key={s} className="flex items-center justify-between gap-2 py-[5px] text-[12.5px] tabular-nums">
              <span className="w-12 shrink-0 font-semibold">{s}</span>
              <span className="min-w-0 flex-1 truncate text-right">{q?.price ? money(q.price) : q?.error ? "key?" : "—"}</span>
              <span className={`w-[52px] shrink-0 rounded px-1 text-right text-[11px] ${q?.price ? (up ? "stock-up" : "stock-down") : "text-[var(--os-ink-3)]"}`}>
                {q?.price && Number.isFinite(q.change) ? `${up ? "+" : ""}${q.change.toFixed(2)}%` : ""}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-1.5 text-[10px] leading-snug text-[var(--os-ink-3)]">
        {needsKey ? "Add a free Finnhub key in Widgets settings for stock prices." : "Prices may be delayed."}
      </p>
    </section>
  );
}

// Widgets pane: the stock watchlist and Finnhub key
function StocksSettings() {
  const [symbols, setSymbols] = useState(() => String(readJSON(STOCKS_KEY, { symbols: STOCKS_DEFAULT }).symbols || STOCKS_DEFAULT));
  const [key, setKey] = useState(() => readStore("localStorage", FINNHUB_KEY) || "");
  const [saved, setSaved] = useState(false);
  const input = "w-full rounded-lg bg-[var(--os-card)] px-2.5 py-1.5 ring-1 ring-[var(--os-line)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)]";

  const save = () => {
    writeStore("localStorage", STOCKS_KEY, JSON.stringify({ symbols }));
    if (key.trim()) writeStore("localStorage", FINNHUB_KEY, key.trim());
    else {
      try {
        localStorage.removeItem(FINNHUB_KEY);
      } catch {
        /* ignore */
      }
    }
    window.dispatchEvent(new Event("mh-stocks-changed"));
    setSaved(true);
  };

  return (
    <>
      <div className="mt-6 text-[13px] font-semibold">stocks</div>
      <form
        className="mt-2 grid gap-3 text-[13px] sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <label className="flex flex-col gap-1.5">
          <span>watchlist (up to 8)</span>
          <input
            value={symbols}
            onChange={(e) => {
              setSymbols(e.target.value.toUpperCase());
              setSaved(false);
            }}
            placeholder={STOCKS_DEFAULT}
            autoComplete="off"
            spellCheck={false}
            className={`${input} font-mono`}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span>Finnhub API key</span>
          <input
            type="password"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setSaved(false);
            }}
            placeholder="for stock prices"
            autoComplete="off"
            spellCheck={false}
            className={`${input} font-mono`}
          />
        </label>
        <div className="flex items-center justify-between gap-2 sm:col-span-2">
          <span className="text-[12px] text-[var(--os-ink-3)]">
            {saved ? "Saved." : "Crypto (BTC, ETH, SOL…) works without a key. "}
            {!saved && (
              <a href="https://finnhub.io/register" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-[var(--os-ink)]">
                Get a free Finnhub key
              </a>
            )}
          </span>
          <button type="submit" className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
            save
          </button>
        </div>
      </form>
      <p className="mt-2 text-[12px] text-[var(--os-ink-3)]">The key stays in this browser and is left out of exported settings.</p>
    </>
  );
}

/* ---------- Menu bar: the status items on the right, in an order you can change ---------- */

const MENUBAR_ITEMS = [
  { id: "user", label: "user", Icon: User },
  { id: "widgets", label: "widgets", Icon: LayoutDashboard },
  { id: "sound", label: "sound", Icon: Volume2 },
  { id: "battery", label: "battery", Icon: BatteryCharging },
  { id: "network", label: "Wi-Fi", Icon: Network },
  { id: "clock", label: "date and time", Icon: Clock3 },
];
const MENUBAR_DEFAULT = MENUBAR_ITEMS.map((i) => i.id).join(",");
const MENUBAR_PREFS = { cookie: "comcen_menubar", event: "mh-menubar-changed", defaults: { order: MENUBAR_DEFAULT, hidden: "" } };

// The saved order, cleaned up: unknown items dropped, new ones added at the end
function menuBarOrder(order) {
  const known = MENUBAR_ITEMS.map((i) => i.id);
  const saved = String(order).split(",").filter((id, i, all) => known.includes(id) && all.indexOf(id) === i);
  return [...saved, ...known.filter((id) => !saved.includes(id))];
}

// Drag the items left or right to rearrange them; the power button stays at the far right
function MenuBarItems({ items }) {
  const [prefs, setPrefs] = usePrefs(MENUBAR_PREFS);
  const dragged = useRef(false);
  const order = menuBarOrder(prefs.order);
  const hidden = prefs.hidden.split(",");
  const visible = order.filter((id) => items[id] && !hidden.includes(id));

  return (
    <Reorder.Group
      as="div"
      axis="x"
      values={visible}
      // Saved as items trade places, so a new order is never lost
      onReorder={(next) => setPrefs({ order: [...next, ...order.filter((id) => !next.includes(id))].join(",") })}
      className="flex items-center gap-1"
      // A drag isn't a click: swallow the click that ends one
      onClickCapture={(e) => {
        if (!dragged.current) return;
        dragged.current = false;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {visible.map((id) => (
        <Reorder.Item
          key={id}
          value={id}
          as="div"
          className="menubar-item"
          onDragStart={() => {
            dragged.current = true;
          }}
        >
          {items[id]}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

function MenuBarPane() {
  const [prefs, setPrefs] = usePrefs(MENUBAR_PREFS);
  const [network, setNetwork] = usePrefs(NETWORK_PREFS); // Wi-Fi's switch is shared with Network preferences
  const order = menuBarOrder(prefs.order);
  const hidden = prefs.hidden.split(",").filter(Boolean);
  const isShown = (id) => (id === "network" ? network.menubar : !hidden.includes(id));
  const setShown = (id, on) => {
    if (id === "network") setNetwork({ menubar: on });
    else setPrefs({ hidden: (on ? hidden.filter((h) => h !== id) : [...hidden, id]).join(",") });
  };
  const move = (index, step) => {
    const next = [...order];
    [next[index], next[index + step]] = [next[index + step], next[index]];
    setPrefs({ order: next.join(",") });
  };
  const isDefault = order.join(",") === MENUBAR_DEFAULT && !hidden.length && network.menubar;

  return (
    <div className="p-5">
      <PaneHeader title="menu bar">
        The items at the top right of the screen, from left to right. Switch any off to hide it, or drag them in the menu bar to rearrange them.
      </PaneHeader>
      <ol className="divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
        {order.map((id, i) => {
          const item = MENUBAR_ITEMS.find((m) => m.id === id);
          return (
            <li key={id} className="flex items-center gap-3 px-3 py-2 text-[13px]">
              <span className="w-5 shrink-0 tabular-nums text-[var(--os-ink-3)]">{i + 1}</span>
              <item.Icon className="h-4 w-4 shrink-0 text-[var(--os-accent)]" strokeWidth={1.8} aria-hidden="true" />
              <span className={`min-w-0 flex-1 ${isShown(id) ? "" : "text-[var(--os-ink-3)]"}`}>{item.label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={isShown(id)}
                aria-label={`Show ${item.label} in the menu bar`}
                title={isShown(id) ? "Shown" : "Hidden"}
                onClick={() => setShown(id, !isShown(id))}
                className={`os-switch ${isShown(id) ? "os-switch-on" : ""} mr-1 shrink-0 cursor-pointer`}
              />
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="widget-mini-btn ring-1 ring-[var(--os-line)] disabled:opacity-30" aria-label={`Move ${item.label} left`} title="Move left">
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button type="button" disabled={i === order.length - 1} onClick={() => move(i, 1)} className="widget-mini-btn ring-1 ring-[var(--os-line)] disabled:opacity-30" aria-label={`Move ${item.label} right`} title="Move right">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </li>
          );
        })}
        <li className="flex items-center gap-3 px-3 py-2 text-[13px] text-[var(--os-ink-3)]">
          <span className="w-5 shrink-0" />
          <Power className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
          <span className="flex-1">shut down (always last)</span>
        </li>
      </ol>
      <p className="mt-3 text-[12px] text-[var(--os-ink-3)]">Battery shows only when your device reports it. Hidden items are still in the system menu and System Preferences.</p>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          disabled={isDefault}
          onClick={() => {
            setPrefs({ order: MENUBAR_DEFAULT, hidden: "" });
            setNetwork({ menubar: true });
          }}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          reset to default
        </button>
      </div>
    </div>
  );
}

/* All settings: each section's icons spread evenly over as few rows as fit, so no row is left with a lone icon */
function balancedColumns(count, maxCols) {
  if (count <= maxCols) return count;
  for (let rows = Math.ceil(count / maxCols); rows <= count; rows++) {
    const cols = Math.ceil(count / rows);
    if (cols <= maxCols && (count % cols === 0 || count % cols > 1)) return cols;
  }
  return maxCols;
}

function PrefsGrid({ onOpen }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // About 80px a tile. Until the grid is measured, estimate from the screen (the window is at most 760px wide).
  const estimate = Math.min(window.innerWidth - 24, 760) - 32;
  const maxCols = Math.max(3, Math.floor((width || estimate) / 80));

  return (
    <div ref={ref}>
      {PREF_SECTIONS.map((section, si) => {
        const cols = balancedColumns(section.panes.length, maxCols);
        return (
          <section key={section.title} className={`px-4 pb-3 pt-2.5 ${si % 2 ? "bg-[var(--os-desk)]/35" : ""}`}>
            <h3 className="mb-1.5 text-[13px] font-semibold">{section.title}</h3>
            <div className="grid gap-y-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: cols * 96 }}>
              {section.panes.map(({ id, label, Icon, ready }) => (
                <button
                  key={id}
                  type="button"
                  data-pane={id}
                  aria-disabled={ready ? undefined : "true"}
                  title={ready ? label : `${label} is coming soon`}
                  onClick={() => ready && onOpen(id)}
                  className={`prefs-pane flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-center text-[12px] leading-tight ${ready ? "prefs-pane-ready" : "prefs-pane-off"}`}
                >
                  <span className="prefs-icon">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const PREF_SECTIONS = [
  {
    title: "Desk",
    panes: [
      { id: "theme", label: "Theme", Icon: Palette, ready: true },
      { id: "wallpaper", label: "Wallpaper", Icon: ImageIcon, ready: true },
      { id: "screensaver", label: "Screen Saver", Icon: MonitorPlay, ready: true },
      { id: "widgets", label: "Widgets", Icon: LayoutDashboard, ready: true },
      { id: "dock", label: "Dock", Icon: PanelBottom, ready: true },
      { id: "menubar", label: "Menu Bar", Icon: PanelTop, ready: true },
      { id: "windows", label: "Windows", Icon: AppWindow, ready: true },
      { id: "language", label: "Language", Icon: Globe, ready: true },
      { id: "privacy", label: "Privacy", Icon: ShieldCheck, ready: true },
    ],
  },
  {
    title: "Devices",
    panes: [
      { id: "bluetooth", label: "Bluetooth", Icon: Bluetooth, ready: true },
      { id: "discs", label: "Discs", Icon: Disc, ready: true },
      { id: "displays", label: "Displays", Icon: Monitor, ready: true },
      { id: "power", label: "Power", Icon: BatteryCharging, ready: true },
      { id: "keyboard", label: "Keyboard", Icon: Keyboard, ready: true },
      { id: "pointer", label: "Pointer", Icon: Mouse, ready: true },
      { id: "printing", label: "Printing", Icon: Printer, ready: true },
      { id: "sound", label: "Sound", Icon: Volume2, ready: true },
    ],
  },
  {
    title: "Connections",
    panes: [
      { id: "network", label: "Network", Icon: Network, ready: true },
      { id: "modem", label: "Modem", Icon: Phone, ready: true },
      { id: "mesh", label: "Mesh Radio", Icon: Radio, ready: true },
      { id: "sharing", label: "File Sharing", Icon: Share2, ready: true },
    ],
  },
  {
    title: "System",
    panes: [
      { id: "users", label: "Users", Icon: Users, ready: true },
      { id: "datetime", label: "Date & Time", Icon: Clock3, ready: true },
      { id: "updates", label: "Updates", Icon: RefreshCw, ready: true },
      { id: "voice", label: "Voice", Icon: Mic, ready: true },
      { id: "boot", label: "Boot Drive", Icon: HardDrive, ready: true },
      { id: "access", label: "Accessibility", Icon: Accessibility, ready: true },
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
    const onClose = () => setPane(null);
    window.addEventListener("mh-preferences-open", onOpen);
    window.addEventListener("mh-preferences-close", onClose);
    window.addEventListener("mh-wallpaper-changed", onChanged);
    return () => {
      window.removeEventListener("mh-preferences-open", onOpen);
      window.removeEventListener("mh-preferences-close", onClose);
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
      <PrefsWindow panelRef={panelRef} drag={drag} pane={pane} paneInfo={paneInfo} setPane={setPane} current={current} />
    </div>
  );
}

// The System Preferences window itself: it moves on the grid and stays on screen
function PrefsWindow({ panelRef, drag, pane, paneInfo, setPane, current }) {
  const [win] = usePrefs(WINDOW_PREFS);
  const { x, y, settle } = useGridPosition({ limits: () => screenBox(8), ref: panelRef, stay: win.stay });

  return (
      <motion.div
        ref={panelRef}
        style={{ x, y }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="prefs-title"
        drag
        dragControls={drag}
        dragListener={false}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={() => settle()}
        className="os-window prefs-window flex max-h-[calc(100vh-24px)] w-full max-w-[760px] flex-col overflow-hidden"
      >
        {/* Title bar: drag to move; it settles onto the grid, on screen */}
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
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[var(--os-line)] bg-[var(--os-desk)]/40 px-3 py-2">
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
          <button
            type="button"
            onClick={() => setPane("widgets")}
            aria-pressed={pane === "widgets"}
            className={`prefs-tool flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] ${pane === "widgets" ? "prefs-tool-active" : ""}`}
          >
            <LayoutDashboard className="h-5 w-5" strokeWidth={1.6} />
            widgets
          </button>
          <button
            type="button"
            onClick={() => setPane("menubar")}
            aria-pressed={pane === "menubar"}
            className={`prefs-tool flex shrink-0 flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] ${pane === "menubar" ? "prefs-tool-active" : ""}`}
          >
            <PanelTop className="h-5 w-5" strokeWidth={1.6} />
            menu bar
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {pane === "all" && (
            <PrefsGrid onOpen={setPane} />
          )}

          {pane === "screensaver" && <ScreenSaverPane />}
          {pane === "theme" && <ThemePane />}
          {pane === "sound" && <SoundPane />}
          {pane === "modem" && <ModemPane />}
          {pane === "widgets" && <WidgetsPane />}
          {pane === "dock" && <DockPane />}
          {pane === "menubar" && <MenuBarPane />}
          {pane === "windows" && <WindowsPane />}
          {pane === "language" && <LanguagePane />}
          {pane === "datetime" && <DateTimePane />}
          {pane === "users" && <UsersPane />}
          {pane === "updates" && <UpdatesPane />}
          {pane === "network" && <NetworkPane />}
          {pane === "mesh" && <MeshPane />}
          {pane === "sharing" && <SharingPane />}
          {pane === "bluetooth" && <BluetoothPane />}
          {pane === "discs" && <DiscsPane />}
          {pane === "displays" && <DisplaysPane />}
          {pane === "power" && <PowerPane />}
          {pane === "keyboard" && <KeyboardPane />}
          {pane === "pointer" && <PointerPane />}
          {pane === "printing" && <PrintingPane />}
          {pane === "voice" && <VoicePane />}
          {pane === "boot" && <BootPane />}
          {pane === "access" && <AccessibilityPane />}
          {pane === "privacy" && <PrivacyPane />}

          {pane === "wallpaper" && (
            <div className="p-5">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
                wallpaper
              </div>
              <p className="mb-4 text-[13px] text-[var(--os-ink-3)]">Choose the picture on your desktop, or add your own.</p>
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
              <CustomWallpapers current={current} />
            </div>
          )}
        </div>

        <p className="prefs-footer border-t border-[var(--os-line)] px-5 py-2.5 text-[12px] text-[var(--os-ink-3)]">
          {pane === "modem" ? (
            "These settings are managed by Prodigy."
          ) : pane === "privacy" ? (
            "Your preferences are remembered on this browser unless you delete them."
          ) : (
            <>
              Your preferences are remembered on this browser unless you{" "}
              <button type="button" onClick={() => setPane("privacy")} className="underline underline-offset-2 hover:text-[var(--os-ink)]">
                delete them
              </button>
              .
            </>
          )}
        </p>
      </motion.div>
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
          {formatTime(now)}
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
  const [region] = usePrefs(REGION_PREFS);
  const [clockPrefs] = usePrefs(TIME_PREFS);
  const [network] = usePrefs(NETWORK_PREFS);
  const [power] = usePrefs(POWER_PREFS);
  const [win] = usePrefs(WINDOW_PREFS);
  const [maximized, setMaximized] = useState(win.openMaximized);
  const reduceMotion = prefersReducedMotion() || !win.animate;
  const windowDrag = useDragControls();
  const windowRef = useRef(null);
  // The window is part of a scrolling page, so it stays fully on screen side to side, and its top (the title bar)
  // stays between the menu bar and 120px above the bottom of the screen, measured on the page
  const windowLimits = (rect) => {
    const box = screenBox(8);
    const scroll = window.scrollY;
    return { left: box.left, right: box.right, top: box.top - scroll, bottom: rect.bottom + (window.innerHeight - 120 - scroll - rect.top) };
  };
  const { x: winX, y: winY, settle: settleWindow, reset: resetWindow } = useGridPosition({ storageKey: "comcen_window_pos", limits: windowLimits, ref: windowRef, stay: win.stay });
  useEffect(() => {
    window.addEventListener("mh-window-reset", resetWindow);
    return () => window.removeEventListener("mh-window-reset", resetWindow);
  }, [resetWindow]);
  usePageMeta(currentPage);

  const page = OS_PAGES.find((p) => p.page === currentPage) || OS_PAGES[0];
  const time = formatTime(now, { region, time: clockPrefs, seconds: clockPrefs.seconds });
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

  // Desktop widgets step out from behind the window once it's minimized or closed
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("mh-window-state", { detail: windowState }));
  }, [windowState]);
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
          <MenuBarItems
            items={{
              user: <UserMenuButton />,
              widgets: (
                <button
                  type="button"
                  onClick={toggleDashboard}
                  title="Widgets"
                  aria-label="Show widgets"
                  className="flex h-8 items-center rounded-full px-1.5 hover:bg-[var(--os-hover)] sm:px-2"
                >
                  <LayoutDashboard className="h-4 w-4" strokeWidth={2} />
                </button>
              ),
              sound: <SoundToggle />,
              battery: battery && (
                <button type="button" onClick={() => openPreferences("power")} className="rounded-full hover:bg-[var(--os-hover)]" title="Power preferences">
                  <BatteryIndicator battery={battery} percent={power.percent} />
                </button>
              ),
              network: network.menubar && (
                <button type="button" onClick={() => openPreferences("network")} className="rounded-full hover:bg-[var(--os-hover)]" title="Network preferences">
                  <SignalIndicator signal={signal} />
                </button>
              ),
              clock: (
                <button
                  type="button"
                  onClick={() => openPreferences("datetime")}
                  title="Date & time preferences"
                  className="flex h-8 items-center gap-2 rounded-full px-1 tabular-nums hover:bg-[var(--os-hover)] sm:px-2"
                >
                  <span className="whitespace-nowrap" dir="auto">
                    {formatMenuDate(now, { region, time: clockPrefs })}
                  </span>
                  {clockPrefs.analog && (
                    <span className="hidden sm:inline-flex">
                      <AnalogClock now={now} time={clockPrefs} />
                    </span>
                  )}
                  <span className="hidden whitespace-nowrap md:inline" dir="auto">
                    {time}
                  </span>
                </button>
              ),
            }}
          />
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
          ref={windowRef}
          className={`relative z-10 mx-auto ${maximized ? "max-w-none" : "max-w-7xl"}`}
          style={maximized ? { x: 0, y: 0 } : { x: winX, y: winY }}
          drag={!maximized}
          dragControls={windowDrag}
          dragListener={false}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={() => settleWindow()}
        >
        <motion.div
          className={`os-window relative origin-bottom ${maximized ? "os-window-max" : ""}`}
          initial={false}
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
              if (win.doubleClick === "maximize") toggleMaximize();
              else if (win.doubleClick === "minimize") minimize();
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
                <span>&copy; 2009 - {currentYear} MAXHAYIM.COM. All Rights Reserved.</span>
              </div>
              <span>
                comcen os I{" "}
                <button type="button" onClick={() => openPreferences("updates")} title="Software update" className="underline-offset-2 hover:text-[var(--os-ink)] hover:underline">
                  v{OS_VERSION}
                </button>{" "}
                on the COMCEN Model 2000
              </span>
            </footer>
          </div>
        </motion.div>
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

              <button
                type="button"
                onClick={toggleDashboard}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200"
              >
                Widgets
                <LayoutDashboard className="h-4 w-4" />
              </button>
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
const PRODIGY_ID = "MXHM23A"; // Prodigy member IDs looked like this: four letters, two digits, a letter
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
            <span role="img" aria-label="Prodigy" className="prodigy-logo block w-[210px] sm:w-[260px]" />
          </h2>
          <p className="mt-3 text-[15px] tracking-[0.04em] text-zinc-300 sm:text-base">Interactive Personal Service</p>

          {/* Sign-on panel: the member ID and password are saved and locked */}
          <div className="mt-7 w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-left sm:p-5">
            <p className="flex items-center justify-center gap-1.5 text-center text-[13px] text-zinc-400">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Your ID and password are saved. Press Connect to sign on.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] text-zinc-500">ID</span>
                <input readOnly disabled value={PRODIGY_ID} className="prefs-locked w-full rounded-lg px-3 py-2 font-mono text-[14px] tracking-[0.12em]" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] text-zinc-500">Password</span>
                <input readOnly disabled type="password" value="comcenos" className="prefs-locked w-full rounded-lg px-3 py-2 font-mono text-[14px] tracking-[0.12em]" />
              </label>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-[12px] text-zinc-500">
                {registered
                  ? "This copy is registered."
                  : usedTrialEnd && now < trialResetAt(usedTrialEnd)
                    ? `Free trial ended. Resets in ${formatResetIn(trialResetAt(usedTrialEnd) - now)}.`
                    : `New members get a ${TRIAL_MINUTES}-minute free trial.`}
              </span>
              {dial === "idle" ? (
                <button type="button" onClick={connect} className="net-primary shrink-0">
                  Connect
                </button>
              ) : (
                <button type="button" onClick={hangUp} className="net-secondary shrink-0">
                  Cancel
                </button>
              )}
            </div>
          </div>
          <SoundHint className="mt-3" />

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

          {/* Footer line, like the service notice along the bottom of the original sign-on screen */}
          <div className="mt-8 w-full max-w-2xl border-t border-zinc-800 pt-4 text-[12px] leading-6 text-zinc-500">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span>Prodigy Internet</span>
              <span>
                Local access number <span className="tabular-nums text-zinc-300">{DIALUP_NUMBER}</span>
              </span>
              <span>14,400 bps</span>
            </div>
            <p className="mt-1.5">
              Started by IBM and Sears, Prodigy went nationwide in 1990 as one of the first big online services. Members
              dialed a local access number, which varied by city, rather than one nationwide number.
            </p>
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
  if (typeof window === "undefined") return false;
  // The device's setting, or Accessibility → reduce motion, or Power → low power mode
  return Boolean(
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || readPrefs(ACCESS_PREFS).reduceMotion || readPrefs(POWER_PREFS).lowPower,
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
    if (readPrefs(BOOT_PREFS).sound) playSound(new Audio("/audio/comcen-boot.mp3"), 0.8).catch(() => {});
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
    // Boot Drive → startup sounds off: the same sequence, silently
    const audio = readPrefs(BOOT_PREFS).sound ? createBootAudio() : { start() {}, play() {}, stop() {} };
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
  const time = formatTime(now, { timeZone });
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
  const { current: me } = useUsers();
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

        <button
          type="button"
          onClick={() => openPreferences("users")}
          title="Users"
          className="flex w-full items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 text-left hover:bg-[var(--os-hover)]"
        >
          <UserAvatar user={me} className="h-10 w-10 rounded-lg border border-zinc-800 text-[14px]" />
          <div className="min-w-0">
            <div className="truncate font-semibold text-zinc-100">{me.handle || me.name}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" /> Available
            </div>
          </div>
        </button>

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

/* ---------- Widgets: a Braun-style wall clock, pocket radio, and weather station ----------
   They sit on the desktop beside the window (or behind it on smaller screens).
   The dock's widgets button brings them all forward, like a dashboard. */

const WIDGETS_COOKIE = "comcen_widgets";

function readWidgetsOnDesk() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${WIDGETS_COOKIE}=([^;]*)`));
  return !match || decodeURIComponent(match[1]) !== "off";
}

function saveWidgetsOnDesk(on) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${WIDGETS_COOKIE}=${on ? "on" : "off"}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("mh-widgets-desk", { detail: on }));
}

const toggleDashboard = () => window.dispatchEvent(new Event("mh-dashboard-toggle"));

// Lets the dock light its widgets button while the dashboard is open
function useDashboardOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onState = (e) => setOpen(e.detail);
    window.addEventListener("mh-dashboard-state", onState);
    return () => window.removeEventListener("mh-dashboard-state", onState);
  }, []);
  return open;
}

/* Clock: after the Braun ABW 41 wall clock. Flat black hands, yellow sweep hand with a round counterweight. */
function ClockWidget() {
  const now = useClock();
  const [time] = usePrefs(TIME_PREFS);
  const [region] = usePrefs(REGION_PREFS);
  const parts = clockParts(now, time);
  const s = parts.s;
  const m = parts.m + s / 60;
  const h = (parts.h % 12) + m / 60;
  const hand = (deg, length, tail, width, color) => (
    <line x1="100" y1={100 + tail} x2="100" y2={100 - length} stroke={color} strokeWidth={width} transform={`rotate(${deg} 100 100)`} />
  );

  return (
    // Click (or press Enter) for Date & Time preferences; dragging it still moves it
    <section
      className="widget widget-clock cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Clock: ${formatTime(now, { region, time })}. Open date and time preferences.`}
      title="Date & time preferences"
      onClick={() => openPreferences("datetime")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPreferences("datetime");
        }
      }}
    >
      <svg viewBox="0 0 200 200" className="block h-full w-full" aria-hidden="true">
        <circle cx="100" cy="100" r="90" fill="var(--w-face)" />
        {Array.from({ length: 60 }, (_, i) =>
          i % 5 === 0 ? null : (
            <line key={i} x1="100" y1="13" x2="100" y2="17" stroke="var(--w-mark)" strokeWidth="1" transform={`rotate(${i * 6} 100 100)`} />
          ),
        )}
        {Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const a = (n * 30 * Math.PI) / 180;
          return (
            <text
              key={n}
              x={100 + Math.sin(a) * 72}
              y={100 - Math.cos(a) * 72}
              textAnchor="middle"
              dominantBaseline="central"
              className="widget-clock-num"
            >
              {n}
            </text>
          );
        })}
        <text x="100" y="62" textAnchor="middle" className="widget-clock-brand">comcen</text>
        {hand(h * 30, 46, 10, 6, "var(--w-hand)")}
        {hand(m * 6, 70, 12, 4, "var(--w-hand)")}
        <g transform={`rotate(${s * 6} 100 100)`}>
          <line x1="100" y1="124" x2="100" y2="20" stroke="var(--w-yellow)" strokeWidth="1.6" />
          <circle cx="100" cy="122" r="5" fill="var(--w-yellow)" />
        </g>
        <circle cx="100" cy="100" r="4" fill="var(--w-yellow)" />
      </svg>
    </section>
  );
}

/* Radio: after the Braun T3 pocket radio. Perforated grille on top, a tuning wheel you turn to change stations.
   Public and listener-supported stations from around the world, plus Galgalatz and two Miami favorites. */
const RADIO_STATIONS = [
  { id: "rp", name: "Radio Paradise", genre: "eclectic mix · California", stream: "https://stream.radioparadise.com/mp3-128", site: "https://radioparadise.com/" },
  { id: "rp-mellow", name: "RP Mellow", genre: "mellow mix · California", stream: "https://stream.radioparadise.com/mellow-128", site: "https://radioparadise.com/" },
  {
    id: "kexp",
    name: "KEXP",
    genre: "indie and alternative · Seattle",
    stream: "https://kexp.streamguys1.com/kexp160.aac",
    site: "https://www.kexp.org/",
    nowPlaying: async () => {
      const play = (await (await fetch("https://api.kexp.org/v2/plays/?limit=1")).json()).results?.[0];
      return play?.play_type === "trackplay" && play.artist ? `${play.artist} — ${play.song}` : null;
    },
  },
  { id: "fip", name: "FIP", genre: "eclectic · Paris", stream: "https://icecast.radiofrance.fr/fip-midfi.mp3", site: "https://www.radiofrance.fr/fip" },
  { id: "fip-jazz", name: "FIP Jazz", genre: "jazz · Paris", stream: "https://icecast.radiofrance.fr/fipjazz-midfi.mp3", site: "https://www.radiofrance.fr/fip" },
  {
    id: "nts",
    name: "NTS 1",
    genre: "underground radio · London",
    stream: "https://stream-relay-geo.ntslive.net/stream",
    site: "https://www.nts.live/",
    nowPlaying: async () => {
      const live = (await (await fetch("https://www.nts.live/api/v2/live")).json()).results?.find((c) => c.channel_name === "1");
      return live?.now?.broadcast_title || null;
    },
  },
  {
    id: "galgalatz",
    name: "Galgalatz",
    genre: "Israeli and international pop · Tel Aviv",
    stream: "https://glzicylv01.bynetcdn.com/glglz_mp3",
    site: "https://glz.co.il/",
  },
  {
    id: "kiss-country",
    name: "Kiss Country 99.9",
    genre: "country · Miami",
    stream: "https://live.amperwave.net/direct/audacy-wkisfmaac-imc",
    site: "https://www.audacy.com/stations/kisscountry999",
  },
  {
    id: "revolution",
    name: "Revolution 93.5",
    genre: "dance and electronic · Miami",
    stream: "https://centova87.shoutcastservices.com/proxy/revolution935/stream",
    site: "https://www.revolution935.com/",
  },
];
const RADIO_KEY = "comcen_radio_station";
const RADIO_LEVEL = 0.7; // under the site volume, so it never drowns out system sounds

// One radio for the whole site, outside React, so it keeps playing as you move between pages.
const radio = {
  station: Math.max(0, Math.min(RADIO_STATIONS.length - 1, Number(readStore("localStorage", RADIO_KEY)) || 0)),
  status: "off", // "off" | "tuning" | "on" | "error"
  audio: null,
  listeners: new Set(),
};

function setRadio(patch) {
  Object.assign(radio, patch);
  radio.listeners.forEach((listener) => listener());
}

function useRadio() {
  const [, rerender] = useState(0);
  useEffect(() => {
    const listener = () => rerender((n) => n + 1);
    radio.listeners.add(listener);
    return () => radio.listeners.delete(listener);
  }, []);
  return radio;
}

function radioAudio() {
  if (!radio.audio) {
    const audio = new Audio();
    audio.preload = "none";
    audio._mhBase = RADIO_LEVEL;
    audio.addEventListener("playing", () => setRadio({ status: "on" }));
    audio.addEventListener("waiting", () => radio.status !== "off" && setRadio({ status: "tuning" }));
    audio.addEventListener("error", () => radio.status !== "off" && setRadio({ status: "error" }));
    radio.audio = audio;
  }
  return radio.audio;
}

function radioStart() {
  discPause(); // one sound source at a time
  const audio = radioAudio();
  audio.src = RADIO_STATIONS[radio.station].stream;
  applyMedia(audio);
  liveMedia.add(audio);
  setRadio({ status: "tuning" });
  // Tuning again before a station answers interrupts this play request; that's not a lost signal
  audio.play().catch((e) => e?.name !== "AbortError" && radio.status !== "off" && setRadio({ status: "error" }));
}

function radioStop() {
  setRadio({ status: "off" });
  const audio = radio.audio;
  if (!audio) return;
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  liveMedia.delete(audio);
}

function radioTune(step) {
  const n = RADIO_STATIONS.length;
  const station = (radio.station + step + n) % n;
  writeStore("localStorage", RADIO_KEY, String(station));
  setRadio({ station });
  if (radio.status !== "off") radioStart();
}

// What's on now, for the stations that publish it
function useNowPlaying(station, active) {
  const [track, setTrack] = useState(null); // { stationId, text }
  useEffect(() => {
    if (!active || !station.nowPlaying) return;
    let cancelled = false;
    const load = async () => {
      try {
        const text = await station.nowPlaying();
        if (!cancelled) setTrack({ stationId: station.id, text });
      } catch {
        /* the station description is enough */
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [station, active]);
  return active && track?.stationId === station.id ? track.text : null;
}

function RadioWidget() {
  const { station, status } = useRadio();
  const sound = useSound();
  const current = RADIO_STATIONS[station];
  const playing = status !== "off";
  const track = useNowPlaying(current, status === "on");
  const n = RADIO_STATIONS.length;

  const statusLabel = !playing
    ? "off"
    : status === "error"
      ? "no signal"
      : status === "tuning"
        ? "tuning…"
        : sound.on
          ? "on air"
          : "muted";

  return (
    <section className="widget widget-radio" aria-label="Radio">
      <div className="widget-radio-grille" aria-hidden="true" />
      <div className="px-3.5 pt-3">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--os-ink-3)]">
          <span className={`widget-led ${status === "on" && sound.on ? "widget-led-on" : ""}`} aria-hidden="true" />
          <span aria-live="polite">{statusLabel}</span>
          <span className="ml-auto tabular-nums">
            {station + 1}/{n}
          </span>
        </div>
        <div className="mt-1 truncate text-[15px] font-semibold tracking-tight">{current.name}</div>
        <div className="truncate text-[11px] text-[var(--os-ink-3)]" title={track || current.genre}>
          {playing && !sound.on ? (
            <button type="button" className="underline underline-offset-2 hover:text-[var(--os-ink)]" onClick={() => saveSound({ ...sound, on: true })}>
              turn sound on
            </button>
          ) : (
            track || current.genre
          )}
        </div>
      </div>
      <div className="flex items-end justify-between px-3.5 pb-4 pt-2.5">
        {/* Tuning wheel: click for the next station, shift-click or arrow keys to go back */}
        <button
          type="button"
          className="widget-radio-dial"
          onClick={(e) => radioTune(e.shiftKey ? -1 : 1)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              radioTune(-1);
            } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              radioTune(1);
            }
          }}
          aria-label={`Station ${station + 1} of ${n}: ${current.name}. Turn to change station.`}
          title="Turn to change station"
        >
          <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
            <g className="widget-radio-wheel" style={{ transform: `rotate(${(-station * 360) / n}deg)` }}>
              <circle cx="32" cy="32" r="30" fill="var(--w-face)" />
              {Array.from({ length: 36 }, (_, i) => (
                <line key={i} x1="32" y1="3" x2="32" y2="6.5" stroke="var(--w-mark)" strokeWidth="0.8" transform={`rotate(${i * 10} 32 32)`} />
              ))}
              {RADIO_STATIONS.map((s, i) => {
                const deg = (i * 360) / n;
                const a = deg * (Math.PI / 180);
                const x = 32 + Math.sin(a) * 19;
                const y = 32 - Math.cos(a) * 19;
                return (
                  <text key={s.id} x={x} y={y} textAnchor="middle" dominantBaseline="central" transform={`rotate(${deg} ${x} ${y})`} className="widget-radio-num">
                    {i + 1}
                  </text>
                );
              })}
              <circle cx="32" cy="32" r="7" fill="var(--w-case)" stroke="var(--w-mark)" strokeWidth="0.6" />
            </g>
            <path d="M32 0 L35 5 L29 5 Z" fill="var(--os-accent)" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => (playing ? radioStop() : radioStart())}
          aria-pressed={playing}
          aria-label={playing ? "Turn radio off" : "Turn radio on"}
          title={playing ? "Off" : "On"}
          className={`os-knob widget-radio-power ${playing ? "os-knob-power" : ""}`}
        >
          {playing ? <Square className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />}
        </button>
      </div>
      <a href={current.site} target="_blank" rel="noreferrer" className="widget-credit">
        {current.name}
      </a>
    </section>
  );
}

/* Weather: a Braun-style weather station. Miami by default; the locate button switches to the visitor's own location.
   Forecasts come from Open-Meteo. */
const WEATHER_HOME = { name: "Miami", lat: 25.7617, lon: -80.1918 };
const WEATHER_KEY = "comcen_weather";
const WEATHER_REFRESH_MS = 15 * 60 * 1000;

function readWeatherPrefs() {
  try {
    const saved = JSON.parse(readStore("localStorage", WEATHER_KEY) || "{}");
    const place = Number.isFinite(saved.place?.lat) && Number.isFinite(saved.place?.lon) ? saved.place : WEATHER_HOME;
    return { place };
  } catch {
    return { place: WEATHER_HOME };
  }
}

// Also used by Privacy → stop using my location; the widget follows along
function saveWeatherPlace(place) {
  writeStore("localStorage", WEATHER_KEY, JSON.stringify({ place }));
  window.dispatchEvent(new CustomEvent("mh-weather-place", { detail: place }));
}

// WMO weather codes, as Open-Meteo reports them
function describeWeather(code, day = true) {
  if (code === 0) return { label: day ? "Clear" : "Clear night", Icon: day ? Sun : Moon };
  if (code === 1) return { label: "Mostly clear", Icon: day ? Sun : Moon };
  if (code === 2) return { label: "Partly cloudy", Icon: day ? CloudSun : CloudMoon };
  if (code === 3) return { label: "Overcast", Icon: Cloud };
  if (code === 45 || code === 48) return { label: "Fog", Icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: "Drizzle", Icon: CloudDrizzle };
  if (code >= 61 && code <= 67) return { label: "Rain", Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: "Snow", Icon: CloudSnow };
  if (code >= 80 && code <= 82) return { label: "Showers", Icon: CloudRain };
  if (code === 85 || code === 86) return { label: "Snow showers", Icon: CloudSnow };
  if (code >= 95) return { label: "Thunderstorms", Icon: CloudLightning };
  return { label: "—", Icon: Cloud };
}

// Last forecast per place and unit, so the widgets don't reload it each time they move between desktop and dashboard
const weatherCache = new Map(); // key -> { data, at }

function useWeather(place, unit) {
  const key = `${place.lat},${place.lon},${unit}`;
  const [state, setState] = useState(() => ({ data: weatherCache.get(key)?.data ?? null, error: false, key }));
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const params = new URLSearchParams({
        latitude: place.lat.toFixed(3),
        longitude: place.lon.toFixed(3),
        current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        forecast_days: "5",
        timezone: "auto",
        temperature_unit: unit === "c" ? "celsius" : "fahrenheit",
        wind_speed_unit: unit === "c" ? "kmh" : "mph",
      });
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!response.ok) throw new Error("weather");
        const json = await response.json();
        weatherCache.set(key, { data: json, at: Date.now() });
        if (!cancelled) setState({ data: json, error: false, key });
      } catch {
        if (!cancelled) setState((s) => ({ data: s.key === key ? s.data : null, error: true, key }));
      }
    };
    const cached = weatherCache.get(key);
    const age = cached ? Date.now() - cached.at : Infinity;
    let id;
    // Fetch now if there's nothing fresh, then every 15 minutes
    const first = setTimeout(
      () => {
        load();
        id = setInterval(load, WEATHER_REFRESH_MS);
      },
      Math.max(0, WEATHER_REFRESH_MS - age),
    );
    return () => {
      cancelled = true;
      clearTimeout(first);
      clearInterval(id);
    };
  }, [key, place.lat, place.lon, unit]);
  // Only report what belongs to this place and unit, so switching never shows stale numbers
  if (state.key === key) return state;
  return { data: weatherCache.get(key)?.data ?? null, error: false };
}

function WeatherWidget() {
  const [prefs, setPrefs] = useState(readWeatherPrefs);
  const [region, setRegion] = usePrefs(REGION_PREFS); // °F or °C lives in the Language pane
  const [locating, setLocating] = useState(false);
  const unit = region.temperature;
  const { data, error } = useWeather(prefs.place, unit);
  const isHome = prefs.place.name === WEATHER_HOME.name;

  useEffect(() => {
    const onPlace = (e) => setPrefs({ place: e.detail });
    window.addEventListener("mh-weather-place", onPlace);
    return () => window.removeEventListener("mh-weather-place", onPlace);
  }, []);

  const update = ({ place }) => saveWeatherPlace(place);

  const locate = () => {
    if (!isHome) {
      update({ place: WEATHER_HOME });
      return;
    }
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        // Rounded to about a kilometer: plenty for a forecast
        update({ place: { name: "Here", lat: Math.round(pos.coords.latitude * 100) / 100, lon: Math.round(pos.coords.longitude * 100) / 100 } });
      },
      () => setLocating(false),
      { maximumAge: 30 * 60 * 1000, timeout: 10000 },
    );
  };

  const current = data?.current;
  const daily = data?.daily;
  const now = current ? describeWeather(current.weather_code, current.is_day === 1) : null;
  const days = daily
    ? daily.time.map((date, i) => ({
        date,
        hi: Math.round(daily.temperature_2m_max[i]),
        lo: Math.round(daily.temperature_2m_min[i]),
        code: daily.weather_code[i],
      }))
    : [];
  const lowest = Math.min(...days.map((d) => d.lo));
  const highest = Math.max(...days.map((d) => d.hi));
  const span = Math.max(1, highest - lowest);
  const weekday = (date) => {
    const d = new Date(`${date}T12:00:00`);
    const short = d.toLocaleDateString(region.locale, { weekday: "short" }).replace(".", "");
    // Latin scripts: two letters (Th, Fr). Hebrew, Japanese: the narrow form (ה׳, 木)
    return /^[A-Za-zÀ-ÿ]/.test(short) ? short.slice(0, 2) : d.toLocaleDateString(region.locale, { weekday: "narrow" });
  };

  return (
    <section className="widget widget-weather px-3.5 pb-3 pt-3" aria-label="Weather">
      <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-[var(--os-ink-3)]">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className={`widget-led ${current ? "widget-led-on" : ""}`} aria-hidden="true" />
          <span className="truncate">{isHome ? prefs.place.name : "your location"}</span>
        </span>
        <button
          type="button"
          onClick={locate}
          disabled={locating}
          className={`widget-mini-btn ${isHome ? "" : "widget-mini-btn-on"}`}
          aria-label={isHome ? "Show weather for your location" : `Back to ${WEATHER_HOME.name}`}
          title={isHome ? "Use my location" : `Back to ${WEATHER_HOME.name}`}
        >
          <LocateFixed className={`h-3.5 w-3.5 ${locating ? "animate-pulse" : ""}`} strokeWidth={2} />
        </button>
      </div>

      {current ? (
        <>
          <div className="mt-1.5 flex items-start justify-between">
            <button
              type="button"
              onClick={() => setRegion({ temperature: unit === "f" ? "c" : "f" })}
              className="widget-weather-temp"
              aria-label={`${Math.round(current.temperature_2m)} degrees ${unit === "f" ? "Fahrenheit" : "Celsius"}. Switch to ${unit === "f" ? "Celsius" : "Fahrenheit"}.`}
              title={`Switch to °${unit === "f" ? "C" : "F"}`}
            >
              {Math.round(current.temperature_2m)}
              <span className="widget-weather-unit">°{unit.toUpperCase()}</span>
            </button>
            <now.Icon className="mt-1.5 h-8 w-8 text-[var(--os-ink-2)]" strokeWidth={1.4} aria-hidden="true" />
          </div>
          <div className="truncate text-[12px] font-semibold">{now.label}</div>
          <div className="truncate text-[11px] tabular-nums text-[var(--os-ink-3)]">
            feels {Math.round(current.apparent_temperature)}° · {Math.round(current.relative_humidity_2m)}% · {Math.round(current.wind_speed_10m)} {unit === "c" ? "km/h" : "mph"}
          </div>

          {/* Five-day range meter: each bar runs from the day's low to its high on a shared scale */}
          <div className="mt-2.5 grid grid-cols-5 gap-1 border-t border-[var(--w-line)] pt-2" role="list" aria-label="Five-day forecast">
            {days.map((d, i) => {
              const { label } = describeWeather(d.code);
              return (
                <div key={d.date} role="listitem" className="flex flex-col items-center text-[10px] tabular-nums" aria-label={`${weekday(d.date)}: ${label}, high ${d.hi}, low ${d.lo}`}>
                  <span className={`uppercase tracking-[0.08em] ${i === 0 ? "font-semibold text-[var(--os-ink)]" : "text-[var(--os-ink-3)]"}`}>{weekday(d.date)}</span>
                  <span className="mt-0.5 text-[var(--os-ink-2)]">{d.hi}</span>
                  <span className="widget-weather-track" aria-hidden="true">
                    <span
                      className="widget-weather-range"
                      style={{ top: `${((highest - d.hi) / span) * 100}%`, bottom: `${((d.lo - lowest) / span) * 100}%` }}
                    />
                  </span>
                  <span className="text-[var(--os-ink-3)]">{d.lo}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex h-[150px] items-center justify-center text-[12px] text-[var(--os-ink-3)]">
          {error ? "No forecast right now." : "Reading the sky…"}
        </div>
      )}
      <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="widget-credit">
        Open-Meteo
      </a>
    </section>
  );
}

/* Which widgets are out and where they sit. Positions are kept as a share of the free width (so a widget on the
   right stays on the right when the screen changes size) plus a distance from the top. */
const WIDGET_KINDS = [
  // settings: the preferences pane each widget follows, linked from the widget gallery
  { id: "clock", label: "Clock", note: "after the Braun ABW 41 wall clock", Icon: Clock3, Component: ClockWidget, settings: "datetime" },
  { id: "radio", label: "Radio", note: "after the Braun T3 pocket radio", Icon: Radio, Component: RadioWidget, settings: "sound" },
  { id: "weather", label: "Weather", note: "Miami, or wherever you are", Icon: CloudSun, Component: WeatherWidget, settings: "language" },
  // Off until you connect a MeshMonitor in Mesh Radio
  { id: "mesh", label: "Mesh", note: "live from your MeshMonitor", Icon: RadioTower, Component: MeshWidget, defaultShown: false, settings: "mesh" },
  // More in the widget gallery
  { id: "calculator", label: "Calculator", note: "after the Braun ET66 by Dieter Rams", Icon: Calculator, Component: CalculatorWidget, defaultShown: false },
  { id: "calendar", label: "Calendar", note: "this month, in your language", Icon: CalendarDays, Component: CalendarWidget, defaultShown: false, settings: "datetime" },
  { id: "notes", label: "Sticky Notes", note: "notes in five colors that save as you type", Icon: StickyNote, Component: NotesWidget, defaultShown: false },
  { id: "worldclock", label: "World Clock", note: "three cities at a glance", Icon: Globe, Component: WorldClockWidget, defaultShown: false, settings: "widgets" },
  { id: "photos", label: "Photo Gallery", note: "your own photos, in a frame", Icon: ImageIcon, Component: PhotosWidget, defaultShown: false, settings: "widgets" },
  { id: "convert", label: "Convert", note: "units and currencies", Icon: RefreshCw, Component: ConvertWidget, defaultShown: false },
  { id: "translator", label: "Translator", note: "eleven languages, including Hebrew", Icon: Globe, Component: TranslatorWidget, defaultShown: false },
  { id: "flight", label: "Flight Tracker", note: "any flight's airline and route", Icon: Plane, Component: FlightWidget, defaultShown: false },
  { id: "stocks", label: "Stocks", note: "your watchlist, with crypto", Icon: Activity, Component: StocksWidget, defaultShown: false, settings: "widgets" },
];
const WIDGET_WIDTH = 196;
const WIDGET_GAP = 16;
const WIDGET_EDGE = 20;
const WIDGET_ROW = 16; // the grid's row height
const WIDGET_LAYOUT_KEY = "comcen_widget_layout";
const WIDGET_HOLD_MS = 550; // press and hold this long to start editing, like iOS
const WIDGET_DRAG_SLOP = 5; // px of movement before a press becomes a drag

function readWidgetLayout() {
  const shown = Object.fromEntries(WIDGET_KINDS.map((w) => [w.id, w.defaultShown !== false]));
  try {
    const saved = JSON.parse(readStore("localStorage", WIDGET_LAYOUT_KEY) || "{}");
    WIDGET_KINDS.forEach((w) => {
      if (typeof saved.shown?.[w.id] === "boolean") shown[w.id] = saved.shown[w.id];
    });
    const pos = {};
    Object.entries(saved.pos || {}).forEach(([id, p]) => {
      if (Number.isFinite(p?.col) && Number.isFinite(p?.y)) pos[id] = { col: Math.max(0, Math.round(p.col)), y: Math.max(0, p.y) };
      else if (Number.isFinite(p?.fx) && Number.isFinite(p?.y)) pos[id] = { fx: Math.max(0, Math.min(1, p.fx)), y: Math.max(0, p.y) };
    });
    return { shown, pos };
  } catch {
    return { shown, pos: {} };
  }
}

const widgetLayout = { ...readWidgetLayout(), listeners: new Set() };

function setWidgetLayout(patch) {
  Object.assign(widgetLayout, patch);
  writeStore("localStorage", WIDGET_LAYOUT_KEY, JSON.stringify({ shown: widgetLayout.shown, pos: widgetLayout.pos }));
  widgetLayout.listeners.forEach((listener) => listener());
}

function setWidgetShown(id, on) {
  if (!on && id === "radio") radioStop(); // nothing left to switch it off with
  setWidgetLayout({ shown: { ...widgetLayout.shown, [id]: on } });
}

function useWidgetLayout() {
  const [, rerender] = useState(0);
  useEffect(() => {
    const listener = () => rerender((n) => n + 1);
    widgetLayout.listeners.add(listener);
    return () => widgetLayout.listeners.delete(listener);
  }, []);
  return widgetLayout;
}

function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

// System Preferences → Widgets
function WidgetsPane() {
  const layout = useWidgetLayout();
  const [onDesk, setOnDesk] = useState(readWidgetsOnDesk);
  const moved = Object.keys(layout.pos).length > 0;

  return (
    <div className="p-5">
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
        widgets
      </div>
      <p className="mb-4 text-[13px] text-[var(--os-ink-3)]">
        Braun-inspired desk accessories. Drag a widget to move it; press and hold one to remove it.
      </p>

      <ul className="divide-y divide-[var(--os-line)] rounded-xl ring-1 ring-[var(--os-line)]">
        {WIDGET_KINDS.map(({ id, label, note, Icon }) => (
          <li key={id} className="flex items-center gap-3 px-3 py-2.5 text-[13px]">
            <span className="prefs-icon shrink-0">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{label}</span>
              <span className="block truncate text-[12px] text-[var(--os-ink-3)]">{note}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={layout.shown[id]}
              aria-label={`Show the ${label.toLowerCase()} widget`}
              onClick={() => setWidgetShown(id, !layout.shown[id])}
              className={`os-switch ${layout.shown[id] ? "os-switch-on" : ""} shrink-0 cursor-pointer`}
            />
          </li>
        ))}
      </ul>

      <label className="mt-5 flex items-center justify-between gap-3 text-[13px]">
        <span>
          <span className="block">show widgets on the desktop</span>
          <span className="block text-[12px] text-[var(--os-ink-3)]">With the window open, only on wide screens. The dock&rsquo;s widgets button always brings them forward.</span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={onDesk}
          onClick={() => {
            saveWidgetsOnDesk(!onDesk);
            setOnDesk(!onDesk);
          }}
          className={`os-switch ${onDesk ? "os-switch-on" : ""} shrink-0 cursor-pointer`}
        >
          <span className="sr-only">show widgets on the desktop</span>
        </button>
      </label>

      <WidgetExtrasSettings />
      <StocksSettings />

      <div className="mt-5 flex flex-wrap items-center justify-end gap-2 text-[13px]">
        <button type="button" onClick={openWidgetGallery} className="rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]">
          widget gallery…
        </button>
        <button
          type="button"
          disabled={!moved}
          onClick={() => setWidgetLayout({ pos: {} })}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)] focus-visible:outline-2 focus-visible:outline-[var(--os-accent)] disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          reset positions
        </button>
      </div>
    </div>
  );
}

function Widgets({ disabled }) {
  const layout = useWidgetLayout();
  const viewport = useViewport();
  const [dashboard, setDashboard] = useState(false);
  const [onDesk, setOnDesk] = useState(readWidgetsOnDesk);
  const [windowOpen, setWindowOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [drag, setDrag] = useState(null); // { id, x, y } while a widget is being moved
  const press = useRef(null); // the pointer that's down on a widget
  const swallowClick = useRef(false);
  const [heights, setHeights] = useState({}); // measured, for the default column and keeping widgets on screen

  // Phones: one centered column you scroll, no dragging
  const stacked = viewport.w < 640;
  const areaTop = 44; // under the menu bar
  const zoom = pageZoom(); // Displays → interface size scales the page, so measure in its units
  const areaW = viewport.w / zoom;
  const areaH = viewport.h / zoom - areaTop;

  useEffect(() => {
    const onToggle = () => setDashboard((d) => !d);
    const onDeskChange = (e) => setOnDesk(e.detail);
    const onWindow = (e) => setWindowOpen(e.detail === "open");
    const onRoute = () => setDashboard(false);
    window.addEventListener("mh-dashboard-toggle", onToggle);
    window.addEventListener("mh-dashboard-close", onRoute);
    window.addEventListener("mh-widgets-desk", onDeskChange);
    window.addEventListener("mh-window-state", onWindow);
    window.addEventListener("hashchange", onRoute);
    return () => {
      window.removeEventListener("mh-dashboard-toggle", onToggle);
      window.removeEventListener("mh-dashboard-close", onRoute);
      window.removeEventListener("mh-widgets-desk", onDeskChange);
      window.removeEventListener("mh-window-state", onWindow);
      window.removeEventListener("hashchange", onRoute);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("mh-dashboard-state", { detail: dashboard }));
  }, [dashboard]);

  // Escape or a click away from the widgets ends editing first, then closes the dashboard
  useEffect(() => {
    if (!dashboard && !editing) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (editing) setEditing(false);
      else setDashboard(false);
    };
    const onDown = (e) => {
      if (editing && !e.target.closest(".widget-slot, .widget-done")) setEditing(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown, true);
    };
  }, [dashboard, editing]);

  if (disabled) return null;

  const shown = WIDGET_KINDS.filter((w) => layout.shown[w.id]);

  /* The invisible grid: columns one widget wide, counted from the right edge, and rows every 16px.
     Every widget sits on it, fully on screen, and never on top of another. */
  const pitch = WIDGET_WIDTH + WIDGET_GAP;
  const maxCol = Math.max(0, Math.floor((areaW - WIDGET_EDGE * 2 - WIDGET_WIDTH) / pitch));
  const colX = (col) => areaW - WIDGET_EDGE - WIDGET_WIDTH - col * pitch;
  const colAt = (x) => Math.max(0, Math.min(maxCol, Math.round((areaW - WIDGET_EDGE - WIDGET_WIDTH - x) / pitch)));
  const heightOf = (id) => heights[id] || WIDGET_WIDTH;
  const lowest = (h) => Math.max(WIDGET_EDGE, WIDGET_EDGE + Math.floor((areaH - WIDGET_EDGE * 2 - h) / WIDGET_ROW) * WIDGET_ROW);
  const rowAt = (y, h) => Math.max(WIDGET_EDGE, Math.min(lowest(h), WIDGET_EDGE + Math.round((y - WIDGET_EDGE) / WIDGET_ROW) * WIDGET_ROW));

  const savedSpot = (id) => {
    const p = layout.pos[id];
    if (!p) return null;
    const col = Number.isFinite(p.col) ? p.col : Math.round((1 - p.fx) * Math.max(0, areaW - WIDGET_WIDTH - WIDGET_EDGE * 2) / pitch);
    return { col: Math.min(maxCol, col), y: p.y };
  };

  // The nearest free spot to where a widget wants to be: the same column first, then the ones beside it
  const findSpot = (want, h, taken) => {
    const fits = (col, y) => !taken.some((t) => t.col === col && y < t.y + t.h + WIDGET_GAP && t.y < y + h + WIDGET_GAP);
    const start = rowAt(want.y, h);
    const columns = [want.col];
    for (let d = 1; d <= maxCol; d++) columns.push(want.col + d, want.col - d);
    for (const col of columns.filter((c) => c >= 0 && c <= maxCol)) {
      for (let y = start; y <= lowest(h); y += WIDGET_ROW) if (fits(col, y)) return { col, y };
      for (let y = start - WIDGET_ROW; y >= WIDGET_EDGE; y -= WIDGET_ROW) if (fits(col, y)) return { col, y };
    }
    return { col: want.col, y: start }; // no room left anywhere: overlap rather than leave the screen
  };

  // Lay everything out: placed widgets keep their spots, new ones fill in from the top right
  const resolve = (skip) => {
    const spots = {};
    const taken = [];
    const put = (id, want) => {
      const h = heightOf(id);
      const spot = findSpot(want, h, taken);
      spots[id] = spot;
      taken.push({ ...spot, h });
    };
    shown.filter((w) => w.id !== skip && savedSpot(w.id)).forEach((w) => put(w.id, savedSpot(w.id)));
    shown.filter((w) => w.id !== skip && !savedSpot(w.id)).forEach((w) => put(w.id, { col: 0, y: WIDGET_EDGE }));
    return { spots, taken };
  };

  const layoutNow = resolve(drag?.id);
  // Where a dragged widget would land if dropped now
  const landing = drag ? findSpot({ col: colAt(drag.x), y: drag.y }, heightOf(drag.id), layoutNow.taken) : null;

  const place = (id) => {
    if (drag?.id === id) return { x: drag.x, y: drag.y };
    const spot = layoutNow.spots[id] || { col: 0, y: WIDGET_EDGE };
    return { x: colX(spot.col), y: spot.y };
  };

  const onPointerDown = (e, id) => {
    if (e.button !== 0 || e.target.closest(".widget-remove")) return;
    const start = place(id);
    const interactive = !!e.target.closest("button, a, input, select, textarea");
    const p = { id, pointerId: e.pointerId, sx: e.clientX, sy: e.clientY, ox: start.x, oy: start.y, dragging: false, interactive };
    p.timer = setTimeout(() => {
      if (press.current !== p || p.dragging) return;
      setEditing(true);
      swallowClick.current = true; // the release after a long press isn't a click
      navigator.vibrate?.(10);
    }, WIDGET_HOLD_MS);
    press.current = p;
  };

  const onPointerMove = (e) => {
    const p = press.current;
    if (!p || p.pointerId !== e.pointerId) return;
    const dx = (e.clientX - p.sx) / zoom;
    const dy = (e.clientY - p.sy) / zoom;
    if (!p.dragging) {
      if (Math.hypot(dx, dy) < WIDGET_DRAG_SLOP) return;
      clearTimeout(p.timer);
      // Controls only drag while editing; the rest of a widget is a handle any time. Phones scroll instead.
      if (stacked || (p.interactive && !editing)) {
        press.current = null;
        return;
      }
      p.dragging = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    // Follow the pointer, but never past the edges of the screen
    p.x = Math.max(WIDGET_EDGE, Math.min(areaW - WIDGET_EDGE - WIDGET_WIDTH, p.ox + dx));
    p.y = Math.max(WIDGET_EDGE, Math.min(lowest(heightOf(p.id)), p.oy + dy));
    setDrag({ id: p.id, x: p.x, y: p.y });
  };

  const onPointerUp = (e) => {
    const p = press.current;
    if (!p || p.pointerId !== e.pointerId) return;
    clearTimeout(p.timer);
    press.current = null;
    if (!p.dragging) return;
    swallowClick.current = true;
    // Drop onto the grid, and pin everything where it is so nothing else shifts
    const others = resolve(p.id);
    const spot = findSpot({ col: colAt(p.x), y: p.y }, heightOf(p.id), others.taken);
    setDrag(null);
    setWidgetLayout({ pos: { ...widgetLayout.pos, ...others.spots, [p.id]: spot } });
  };

  const onClickCapture = (e) => {
    if (editing && !e.target.closest(".widget-remove")) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (!swallowClick.current) return;
    swallowClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const slots = shown.map((kind, index) => {
    const { id, label } = kind;
    const Body = kind.Component;
    const { x, y } = place(id);
    return (
      <div
        key={id}
        ref={(el) => {
          if (el && el.offsetHeight && heights[id] !== el.offsetHeight) setHeights((hs) => ({ ...hs, [id]: el.offsetHeight }));
        }}
        className={`widget-slot ${editing ? "widget-slot-editing" : ""} ${drag?.id === id ? "widget-slot-dragging" : ""}`}
        style={stacked ? undefined : { transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`, "--jiggle-delay": `${index * -0.11}s` }}
        onPointerDown={(e) => onPointerDown(e, id)}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onContextMenu={(e) => editing && e.preventDefault()}
      >
        <Body />
        {editing && (
          <button
            type="button"
            className="widget-remove"
            onClick={() => setWidgetShown(id, false)}
            aria-label={`Remove the ${label.toLowerCase()} widget`}
            title="Remove"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.6} />
          </button>
        )}
      </div>
    );
  });

  const ghost = landing && !stacked && (
    <div
      className="widget-ghost"
      aria-hidden="true"
      style={{ height: heightOf(drag.id), transform: `translate(${colX(landing.col)}px, ${landing.y}px)` }}
    />
  );

  const done = editing ? (
    <button type="button" className="widget-done" onClick={() => setEditing(false)}>
      done
    </button>
  ) : (
    dashboard && (
      <button type="button" className="widget-done widget-add" onClick={openWidgetGallery}>
        + add widgets
      </button>
    )
  );

  const empty = (
    <div className="widget-empty">
      <p>No widgets out.</p>
      <button
        type="button"
        onClick={() => {
          setDashboard(false);
          openPreferences("widgets");
        }}
        className="mt-2 rounded-full px-3 py-1 ring-1 ring-[var(--os-line)] hover:bg-[var(--os-hover)]"
      >
        add widgets…
      </button>
    </div>
  );

  if (dashboard) {
    return (
      <div
        className={`os-ui widget-dashboard fixed inset-x-0 bottom-0 top-11 z-[35] ${stacked ? "widget-area-stacked overflow-y-auto" : "overflow-hidden"}`}
        onMouseDown={(e) => e.target === e.currentTarget && !editing && setDashboard(false)}
        role="dialog"
        aria-label="Widgets"
      >
        {ghost}
        {shown.length ? slots : empty}
        {done}
      </div>
    );
  }

  if (!onDesk || !shown.length) return null;
  // On the desktop, under the window: shown beside it when there's room, otherwise once the window is out of the way
  return (
    <div
      className={`os-ui widget-desk fixed inset-x-0 bottom-0 top-11 ${drag ? "z-[36]" : "z-[5]"} ${stacked ? "widget-area-stacked" : ""} ${
        windowOpen ? "widget-desk-beside" : ""
      }`}
      aria-label="Desktop widgets"
    >
      {ghost}
      {slots}
      {done}
    </div>
  );
}

export default function App() {
  const route = useHashRoute();
  useAutoUpdateCheck();
  // Boot Drive decides: the startup screen on the first visit, every visit, or never
  const [booting, setBooting] = useState(() => {
    const { when } = readPrefs(BOOT_PREFS);
    if (when === "never" || prefersReducedMotion()) return false;
    return when === "always" || !readStore("localStorage", "mh-booted");
  });
  useKeyboardShortcuts();
  useTimeAnnouncements();
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
      <Widgets disabled={booting} />
      <ScreenSaverHost disabled={booting} />
      <NightShift />
      <PointerTrails />
      <WidgetGallery />
      <PhotoGalleryViewer />
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
