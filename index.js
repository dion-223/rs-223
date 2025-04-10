import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [games, setGames] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const CSV_URL =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSc1NFZjrFWFjNqbUHsAqk3e_8HCieZukjrZmkbacz6Q2ww5Z1sfWFFdxzHq6jfw9mym0VJ7CQyFTnR/pub?output=csv'

    fetch(CSV_URL)
      .then(res => res.text())
      .then(data => {
        const rows = data.trim().split('\n').slice(1)
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
      <nav className="bg-neutral-900 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              RushyStreams
            </Link>
            <div className="hidden md:block flex-grow">
              <div className="flex items-baseline justify-center space-x-6">
                <Link href="https://hoopystreams.com">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">NBA</span>
                </Link>
                <Link href="https://hoopystreams.com">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">NCAA</span>
                </Link>
                <Link href="https://rushystreams.com">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">NFL</span>
                </Link>
                <Link href="https://rushystreams.com">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">CFB</span>
                </Link>
                <Link href="https://pitchystreams.com">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">MLB</span>
                </Link>
                <Link href="https://footystreams.xyz">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">SOCCER</span>
                </Link>
                <Link href="https://trackystreams.com">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">F1</span>
                </Link>
                <Link href="https://fightystreams.com">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">UFC</span>
                </Link>
                <Link href="/blog">
                  <span className="hover:text-red-600 px-3 py-2 text-sm font-medium">BLOG</span>
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="text-white hover:text-red-600 p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Your Football Streams</h1>
          <p className="text-xl text-gray-400">Stream for free in HD | Find your stream below!</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 rounded-lg p-6 space-y-4">
            {games.length > 0 ? (
              games.map((game, i) => (
                <div key={i} className="bg-neutral-950 rounded p-4 hover:bg-neutral-900 transition duration-300">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 text-gray-400">{game.time}</div>
                    <div className="col-span-6 font-semibold text-white">{game.matchup}</div>
                    <div className="col-span-4 text-right">
                      <Link href={game.link}>
                        <span className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 inline-block text-center">
                          Watch
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">No games available.</div>
            )}
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-neutral-900 rounded-lg p-6 text-sm text-gray-400">
            <h2 className="text-lg font-semibold text-white mb-2">Watch Free NFL & CFB Streams</h2>
            <p className="mb-4">
              At RushyStreams, we deliver high-quality streams for every NFL and College Football (CFB) game — completely free...
            </p>
          </div>
        </section>

        <footer className="bg-neutral-900 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 RushyStreams. All rights reserved.</p>
            <p className="mt-2">Disclaimer: This site does not host any video content.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
