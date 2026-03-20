import { useEffect, useRef, useState } from "react";

const GITHUB_USER = "maxhayim";

export default function App() {
  const [repos, setRepos] = useState([]);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (r) =>
            !r.fork &&
            r.name !== "maxhayim" &&
            r.name !== "maxhayim.github.io"
        );
        setRepos(filtered);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-emerald-400 font-mono">
      {/* HEADER */}
      <header className="border-b border-emerald-500/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/logo_fullclear.png"
            alt="logo"
            className="h-10"
          />
          <span className="tracking-widest text-sm">
            COMMAND CENTER
          </span>
        </div>

        <nav className="flex gap-6 text-sm">
          <a href="/" className="hover:text-white">HOME</a>
          <a href="/about.html" className="hover:text-white">ABOUT</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="px-6 py-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          maxhayim.github.io
        </h1>
        <p className="text-sm mt-2 text-emerald-300">
          Live GitHub Command Interface
        </p>
      </section>

      {/* GRID */}
      <section className="grid md:grid-cols-2 gap-6 px-6">

        {/* RADAR */}
        <Radar />

        {/* REPO LIST */}
        <div className="border border-emerald-500/20 rounded-xl p-4">
          <h2 className="text-sm mb-3 tracking-widest">
            LIVE REPOS
          </h2>

          <div className="space-y-2 text-xs">
            {repos.map((repo) => (
              <div key={repo.id} className="flex justify-between">
                <span>{repo.name}</span>
                <span className="text-emerald-300">
                  ★ {repo.stargazers_count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PONG */}
        <PongGame />

      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-500/20 mt-10 px-6 py-4 text-xs text-center">
        © 2009 - {year} MAXYIM.COM. All Rights Reserved.
      </footer>
    </div>
  );
}

/* ========================= */
/* RADAR COMPONENT */
/* ========================= */

function Radar() {
  return (
    <div className="border border-emerald-500/20 rounded-xl p-4 relative overflow-hidden h-64">
      <h2 className="text-sm mb-2 tracking-widest">
        RADAR
      </h2>

      {/* SWEEP */}
      <div className="absolute inset-0 animate-spin-slow">
        <div className="w-full h-full border-t border-emerald-400 opacity-40"></div>
      </div>

      {/* CENTER DOT */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
      </div>
    </div>
  );
}

/* ========================= */
/* PONG GAME */
/* ========================= */

function PongGame() {
  const fieldRef = useRef(null);
  const [visitorY, setVisitorY] = useState(50);
  const [botY, setBotY] = useState(50);
  const [ball, setBall] = useState({ x: 50, y: 50, vx: 0.5, vy: 0.3 });

  useEffect(() => {
    const move = (e) => {
      const rect = fieldRef.current.getBoundingClientRect();
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setVisitorY(Math.max(10, Math.min(90, y)));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBall((b) => {
        let { x, y, vx, vy } = b;

        x += vx;
        y += vy;

        if (y <= 0 || y >= 100) vy *= -1;

        // bot AI
        setBotY((prev) => prev + (y - prev) * 0.1);

        // collisions
        if (x >= 95 && Math.abs(y - visitorY) < 10) vx *= -1;
        if (x <= 5 && Math.abs(y - botY) < 10) vx *= -1;

        // reset
        if (x > 100 || x < 0) {
          return { x: 50, y: 50, vx: -vx, vy };
        }

        return { x, y, vx, vy };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [visitorY, botY]);

  return (
    <div className="border border-emerald-500/20 rounded-xl p-4">
      <h2 className="text-sm mb-2 tracking-widest">
        PONG.EXE
      </h2>

      <div ref={fieldRef} className="relative h-64 bg-black overflow-hidden">

        {/* ball */}
        <div
          className="absolute w-3 h-3 bg-emerald-300"
          style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
        />

        {/* bot */}
        <div
          className="absolute left-0 w-2 h-12 bg-emerald-400"
          style={{ top: `${botY}%` }}
        />

        {/* player */}
        <div
          className="absolute right-0 w-2 h-12 bg-cyan-400"
          style={{ top: `${visitorY}%` }}
        />
      </div>
    </div>
  );
}