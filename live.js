import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LiveGame() {
  const router = useRouter()
  const { game } = router.query

  const [embed1, setEmbed1] = useState('')
  const [embed2, setEmbed2] = useState('')
  const [embed3, setEmbed3] = useState('')
  const [currentStream, setCurrentStream] = useState('')
  const [found, setFound] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!game) return

    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSfWqB1cJc39ig5OnXYgLWPLlPLQojVE1lOir59KYrBhSdr8xjJUUwUedXGMBChOdW-nIy9pzorWxIe/pub?output=csv')
      .then(res => res.text())
      .then(data => {
        const rows = data.trim().split('\n').slice(1)
        let match = rows.find(row => {
          const [id] = row.split(',')
          return id.trim().toLowerCase() === game.trim().toLowerCase()
        })

        if (match) {
          const [id, e1, e2, e3] = match.split(',')
          setEmbed1(e1)
          setEmbed2(e2)
          setEmbed3(e3)
          setCurrentStream(e1)
          setFound(true)
        } else {
          setFound(false)
        }
      })
      .catch(err => {
        console.error("Failed to load embed sheet:", err)
        setFound(false)
      })
  }, [game])

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-neutral-900 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="https://rushystreams.com">
              <a className="text-2xl font-bold text-white">RushyStreams</a>
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
                <Link href="/blog">
                  <a className="hover:text-red-600 px-3 py-2 text-sm font-medium">BLOG</a>
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

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Live Stream</h1>
          <p className="text-gray-400 text-sm mt-2">Select your preferred server below</p>
        </div>

        <div id="stream-container" className="w-full flex flex-col items-center">
          {!found ? (
            <div className="text-center text-gray-400 py-8">
              Stream not found.
            </div>
          ) : (
            <>
              <div id="server-buttons" className="flex flex-wrap justify-center gap-4 mb-6">
                <button onClick={() => setCurrentStream(embed1)} className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-red-600 transition duration-300">Server 1</button>
                <button onClick={() => setCurrentStream(embed2)} className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-red-600 transition duration-300">Server 2</button>
                <button onClick={() => setCurrentStream(embed3)} className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-red-600 transition duration-300">Server 3</button>
              </div>
              <div className="flex flex-col md:flex-row justify-between w-full">
                <div id="player-container" className="w-full flex justify-center">
                  <iframe 
                    id="stream-frame" 
                    src={currentStream}
                    className="w-full aspect-video rounded-xl border border-neutral-700 shadow-lg" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
