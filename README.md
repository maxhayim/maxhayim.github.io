# comcen os — maxhayim.com

Max Hayim's personal website, built as **comcen os**: a late-1990s-style operating system with live GitHub projects, telemetry, and interactive experiments.

**Live:** [maxhayim.com](https://maxhayim.com)

comcen os is a communications center operating system imagined through a late-1990s vision of the future. It combines public repositories, telemetry, activity logs, and engineering identity in a radar-inspired interface centered on live GitHub activity.

## Pages

| Route | Page | What's there |
| --- | --- | --- |
| `#/` | Home | Command profile, quick links, and a Buddy List of design legends (Dieter Rams, Steve Jobs, Jony Ive, Susan Kare, and more) whose online/away status follows their local time zones |
| `#/gits` | Gits | Live Repos Radar, Repo Traffic, Repo Telemetry, Active Languages, Recent Activity, Repo Health Lights, and GitHub Stats, all pulled from the GitHub API |
| `#/internet` | Internet | A dial-up sign-on to a Prodigy-style start page (timed trial or CD key), with a guide to browsing the restored 1990s web through [ProtoWeb](https://protoweb.org/) |
| `#/about` | About | System Badges, OS Journey Timeline, Favorite Operating Systems, Favorite Applications Growing Up, Skills & Tools, and a playable Pong-style MS-DOS game |
| `#/contact` | Contact | A terminal-style mail console (demonstration mode; messages aren't actually sent) |

## System features

- **Boot sequence:** BIOS-style power-on screen with memory count, drive detection, and boot audio. It plays on the first visit and can be triggered again with Reboot or Power from the system menu.
- **Desktop shell:** menu bar with clock, battery, and signal indicators, a dock, and a window that can be minimized and maximized. Widgets, windows, and the dock can be dragged anywhere: they settle onto an invisible grid, never overlap (widgets), and always stay on screen. Windows and the dock can instead spring back when you let go, set in Windows and Dock preferences.
- **Widgets:** a Braun-inspired wall clock, a T3-style pocket radio (Radio Paradise, KEXP, FIP, NTS, Galgalatz, Kiss Country 99.9, and Revolution 93.5), and a weather station for Miami or your own location (forecasts from [Open-Meteo](https://open-meteo.com/)). They sit on the desktop beside the window on wide screens, and the dock's widgets button brings them forward on any screen. Drag them anywhere, press and hold one to remove widgets, and turn each on or off in System Preferences. A fourth, **Mesh**, shows your own mesh network live from a [MeshMonitor](https://github.com/Yeraze/meshmonitor) server (nodes heard in the last hour, day, and week, and the latest channel message); connect it in System Preferences → Mesh Radio with your server's address and an API token, and add this site to MeshMonitor's `ALLOWED_ORIGINS`.
- **More widgets and the widget gallery:** a working calculator after the Braun ET66, a calendar, sticky notes in five colors, a world clock for three cities, a unit and currency converter, a translator (on-device in Chrome, otherwise MyMemory), a flight tracker (routes from adsbdb, live map at ADS-B Exchange), stocks with crypto (CoinGecko; stocks with your own free Finnhub key), and a **Photo Gallery** for your own photos (with a full-screen viewer). Browse and add them in the widget gallery, from the dashboard's **+ add widgets**, the menu bar's widgets button, or the Home page's quick links.
- **Your own pictures:** upload photos for the Photo Gallery and your own wallpapers. They're resized and kept in your browser (IndexedDB); nothing is uploaded.
- **System Preferences:** every pane works. Desk: Theme, Wallpaper, Screen Saver, Widgets, Dock, Menu Bar (rearrange the status items, or reset them), Windows, Language, Privacy. Devices: Bluetooth (Web Bluetooth device search and battery), Discs (a CD player for your own music files), Displays (screen details, interface size, Night Shift), Power (battery, low power mode), Keyboard (Option/Alt shortcuts and a key tester), Pointer (classic or large arrow, pointer trails), Printing (clean print of the page), Sound. Connections: Network, Modem, Mesh Radio, File Sharing. System: Users, Date & Time, Updates, Voice (read aloud, announce the time), Boot Drive (when the startup screen and sounds play), Accessibility (reduce motion, increase contrast, reduce transparency, underline links). Preferences are saved in cookies and browser storage on your device, and can be deleted from the Privacy pane.
- **Users:** Max Hayim is the computer's owner. Visitors can add their own user with a name, a color, or an uploaded photo (shrunk to a small square and kept in their browser). Each user has their own preferences, and switching users swaps them. There are no passwords, and nothing is uploaded.
- **Software Update:** the Updates pane reads this repository's [GitHub releases](https://github.com/maxhayim/maxhayim.github.io/releases), shows the release notes, and checks every half hour for a newer version while the site is open. The system menu shows when one is available.
- **This computer:** a fictional COMCEN Model 2000 graphics workstation (1999).

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for windows and animation
- [Lucide](https://lucide.dev/) icons
- GitHub REST API for live repository data, with built-in fallback data

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Deployment

Every push to `main` is built and deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The custom domain `maxhayim.com` is set in [`CNAME`](CNAME).
