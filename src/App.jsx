import { useEffect, useRef, useState } from "react";

const GITHUB_USER = "maxhayim";

export default function App() {
  const [repos, setRepos] = useState([]);
  const year = new Date().getFullYear();

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
    <div className="min-h-screen bg-[#020617] text-emerald-300 font-mono">

      {/* NAVBAR */}
      <header className="border-b border-emerald-500/20 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src="/logo_fullclear.png" className="h-10" />
          <span className="tracking-widest text-sm text-emerald-400">
            COMMAND CENTER
          </span>
        </div>

        <nav className="flex gap-6 text-sm">
          <a href="/" className="hover:text-white">HOME</a>
          <a href="/about.html" className="hover:text-white">ABOUT</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-white">
          maxhayim.github.io
        </h1>

        <p className="text-sm text-emerald-400 mt-2">
          Public Command Center Homepage
        </p>
      </section>

      {/* GRID */}
      <section className="grid md:grid-cols-2 gap-6 px-6">

        {/* RADAR */}
        <div className="rounded-2xl border border-emerald-500/20 bg-black/40 p-4 relative h-64 overflow-hidden">
          <h2 className="text-xs tracking-widest mb-2">RADAR</h2>

          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-full h-full border-t border-emerald-400 opacity-30"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          </div>
        </div>

        {/* REPOS */}
        <div className="rounded-2xl border border-emerald-500/20 bg-black/40 p-4">
          <h2 className="text-xs tracking-widest mb-2">LIVE REPOS</h2>

          <div className="space-y-2 text-xs">
            {repos.map((repo) => (
              <div key={repo.id} className="flex justify-between">
                <span>{repo.name}</span>
                <span>★ {repo.stargazers_count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PONG */}
        <PongGame />

        {/* GITHUB STATS */}
        <section className="rounded-2xl border border-zinc-800 bg-black/40 p-4 col-span-2">
          <h2 className="text-xs tracking-widest text-cyan-300 mb-3">
            GITHUB STATS
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <img
              src="https://github-readme-stats.vercel.app/api?username=maxhayim&show_icons=true&theme=transparent&hide_border=true&title_color=ffffff&text_color=a1a1aa&icon_color=22d3ee&ring_color=22c55e"
              className="w-full"
            />

            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=maxhayim&layout=compact&theme=transparent&hide_border=true&title_color=ffffff&text_color=a1a1aa"
              className="w-full"
            />
          </div>
        </section>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-500/20 mt-10 px-6 py-4 text-xs text-center text-zinc-400">
        © 2009 - {year} MAXYIM.COM. All Rights Reserved.
      </footer>
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
  const [ball, setBall] = useState({ x: 50, y: 50, vx: 0.6, vy: 0.4 });

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

        setBotY((prev) => prev + (y - prev) * 0.1);

        if (x >= 95 && Math.abs(y - visitorY) < 10) vx *= -1;
        if (x <= 5 && Math.abs(y - botY) < 10) vx *= -1;

        if (x > 100 || x < 0) {
          return { x: 50, y: 50, vx: -vx, vy };
        }

        return { x, y, vx, vy };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [visitorY, botY]);

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-black/40 p-4">
      <h2 className="text-xs tracking-widest mb-2">PONG.EXE</h2>

      <div ref={fieldRef} className="relative h-64 bg-black overflow-hidden">

        <div
          className="absolute w-3 h-3 bg-emerald-300"
          style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
        />

        <div
          className="absolute left-0 w-2 h-12 bg-emerald-400"
          style={{ top: `${botY}%` }}
        />

        <div
          className="absolute right-0 w-2 h-12 bg-cyan-400"
          style={{ top: `${visitorY}%` }}
        />
      </div>
    </div>
  );
}