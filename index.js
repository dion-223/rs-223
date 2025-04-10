import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSc1NFZjrFWFjNqbUHsAqk3e_8HCieZukjrZmkbacz6Q2ww5Z1sfWFFdxzHq6jfw9mym0VJ7CQyFTnR/pub?output=csv"

    fetch(CSV_URL)
      .then(res => res.text())
      .then(data => {
        const rows = data.trim().split("\n").slice(1)
        const parsed = rows.map(row => {
          const matches = row.match(/(?:^|,)(\"(?:[^\"]*(?:\"\"[^\"]*)*)\"|[^,]*)/g)
          if (!matches || matches.length < 3) return null

          const time = matches[0].replace(/^,|"/g, '').trim()
          const matchup = matches[1].replace(/^,|"/g, '').trim()
          const link = matches[2].replace(/^,|"/g, '').trim()

          return { time, matchup, link }
        }).filter(Boolean)

        setGames(parsed)
      })
      .catch(err => {
        console.error("Failed to fetch schedule:", err)
        setGames([])
      })
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-neutral-900 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-white">RushyStreams</Link>
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Your Football Streams</h1>
          <p className="text-xl text-gray-400">Stream for free in HD | Find your stream below!</p>
        </div>

        {/* Schedule Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 rounded-lg p-6 space-y-4">
            {games.length > 0 ? (
              games.map((game, i) => (
                <div key={i} className="bg-neutral-950 rounded p-4 hover:bg-neutral-900 transition duration-300">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 text-gray-400">{game.time}</div>
                    <div className="col-span-6 font-semibold text-white">{game.matchup}</div>
                    <div className="col-span-4 text-right">
                      <a href={game.link} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 inline-block text-center">Watch</a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">No games available.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
