// pages/index.js or app/page.js if using App Router
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSc1NFZjrFWFjNqbUHsAqk3e_8HCieZukjrZmkbacz6Q2ww5Z1sfWFFdxzHq6jfw9mym0VJ7CQyFTnR/pub?output=csv";

    fetch(CSV_URL)
      .then(res => res.text())
      .then(data => {
        const rows = data.trim().split("\n").slice(1); // Skip header row
        const container = document.getElementById("schedule-container");
        container.innerHTML = "";

        rows.forEach(row => {
          // Use regex to properly parse CSV, handling commas within quotes
          const matches = row.match(/(?:^|,)("(?:[^"]*(?:""[^"]*)*)"|[^,]*)/g);
          if (!matches || matches.length < 3) return;
          
          const time = matches[0].replace(/^,|"|"/g, '').trim();
          const matchup = matches[1].replace(/^,|"|"/g, '').trim();
          const streamLink = matches[2].replace(/^,|"|"/g, '').trim();

          // Skip rows with missing data
          if (!time || !matchup || !streamLink) return;

          const card = document.createElement("div");
          card.className = "bg-neutral-950 rounded p-4 hover:bg-neutral-900 transition duration-300";

          card.innerHTML = `
            <div class="grid grid-cols-12 gap-4 items-center">
              <div class="col-span-2 text-gray-400">${time}</div>
              <div class="col-span-6 font-semibold text-white">${matchup}</div>
              <div class="col-span-4 text-right">
                <a href="${streamLink}" class="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 inline-block text-center">Watch</a>
              </div>
            </div>
          `;

          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Failed to fetch schedule:", error);
        const container = document.getElementById("schedule-container");
        container.innerHTML = `
          <div class="text-center text-gray-400 py-8">
            Unable to load schedule. Please try again later.
          </div>
        `;
      });
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-neutral-900 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="https://rushystreams.com" className="text-2xl font-bold text-white">
              RushyStreams
            </Link>
            <div className="hidden md:block flex-grow">
              <div className="flex items-baseline justify-center space-x-6">
                <a href="https://hoopystreams.com" className="hover:text-red-600 px-3 py-2 text-sm font-medium">NBA</a>
                <a href="https://hoopystreams.com" className="hover:text-red-600 px-3 py-2 text-sm font-medium">NCAA</a>
                <a href="https://rushystreams.com" className="hover:text-red-600 px-3 py-2 text-sm font-medium">NFL</a>
                <a href="https://rushystreams.com" className="hover:text-red-600 px-3 py-2 text-sm font-medium">CFB</a>
                <a href="https://pitchystreams.com" className="hover:text-red-600 px-3 py-2 text-sm font-medium">MLB</a>
                <a href="https://footystreams.xyz" className="hover:text-red-600 px-3 py-2 text-sm font-medium">SOCCER</a>
                <a href="https://trackystreams.com" className="hover:text-red-600 px-3 py-2 text-sm font-medium">F1</a>
                <a href="https://fightystreams.com" className="hover:text-red-600 px-3 py-2 text-sm font-medium">UFC</a>
                <a href="/blog" className="hover:text-red-600 px-3 py-2 text-sm font-medium">BLOG</a>
              </div>
            </div>
            <div className="md:hidden">
              <button type="button" className="text-white hover:text-red-600 p-2" onClick={() => toggleMobileMenu()}>
                <span className="sr-only">Open menu</span>
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your Football Streams</h1>
          <p className="text-xl text-gray-400">Stream for free in HD | Find your stream below!</p>
        </div>

        {/* Schedule Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Schedule Content */}
          <div className="bg-neutral-900 rounded-lg p-6">
            <div id="schedule-container" className="space-y-4">
              {/* Games will be injected here */}
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-neutral-900 rounded-lg p-6 text-sm text-gray-400">
            <h2 className="text-lg font-semibold text-white mb-2">Watch Free NFL & CFB Streams</h2>
            <p className="mb-4">
              At RushyStreams, we deliver high-quality streams for every NFL and College Football (CFB) game — completely free. Whether it's Monday Night Football, the Super Bowl, or College Bowl Season, we've got every yard covered. No sign-ups. No shady popups. Just reliable football streaming.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">Why RushyStreams Stands Out</h3>
            <p className="mb-4">
              Complete NFL & CFB Coverage: From preseason to the Playoffs and the Super Bowl, and from regular season CFB games to rivalry weeks and Bowl games — you'll find every stream right here.
              User-First Interface: Clean, intuitive, and lightning fast. No clutter, no confusion — just pick your game and start watching.
              Multiple Server Options: Every stream page features several servers, so if one link is down, you're just one click away from another.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">How It Works</h3>
            <p className="mb-4">
              RushyStreams doesn't host the streams directly. Instead, we curate the best football streams from around the internet, ranked for stability and speed. Each game page offers multiple viewing options — all within a single, smooth interface.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">All-American Football Streaming</h3>
            <p className="mb-4">
              If you've been hunting for NFL and CFB streaming alternatives, RushyStreams is your new go-to. We stay updated daily, so you can always catch your favorite teams without stress.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">More Than Just Streams</h3>
            <p className="mb-4">
              In addition to full NFL and College Football games, we aim to bring you football recaps, highlight clips, and important updates soon — so everything you need is in one place.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">Stay in the Game with RushyStreams</h3>
            <p>
              Join thousands of football fans who rely on RushyStreams every week. We keep it simple, smooth, and always up to date — no logins, no sketchy redirects, just football.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-neutral-900 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-400 text-sm">
              <p>&copy; 2024 RushyStreams. All rights reserved.</p>
              <p className="mt-2">Disclaimer: This site does not host any video content.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
