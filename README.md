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
- **Desktop shell:** menu bar with clock, battery, and signal indicators, a draggable dock, and a window that can be minimized and maximized.
- **Widgets:** a Braun-inspired wall clock, a T3-style pocket radio (Radio Paradise, KEXP, FIP, and NTS), and a weather station for Miami or your own location (forecasts from [Open-Meteo](https://open-meteo.com/)). They sit on the desktop beside the window on wide screens, and the dock's widgets button brings them forward on any screen. Drag them anywhere, press and hold one to remove widgets, and turn each on or off in System Preferences.
- **System Preferences:** working panes for Theme (light, dark, or auto), Wallpaper (four System 6-inspired images), Screen Saver (Mesh or Starfield), Widgets, Sound, and Modem. Preferences are saved in cookies.
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
