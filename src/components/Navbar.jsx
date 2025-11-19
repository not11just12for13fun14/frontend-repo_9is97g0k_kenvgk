import React, { useEffect, useState } from 'react'
import { ShoppingCart, Zap, Menu, X } from 'lucide-react'

export default function Navbar({ onNavigate, onSearch, cartCount, currentView }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    onSearch(query)
    setMobileOpen(false)
  }

  const LinkBtn = ({ label, view }) => (
    <button
      onClick={() => { onNavigate(view); setMobileOpen(false) }}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${currentView === view ? 'text-white' : 'text-zinc-200/80 hover:text-white'}`}
    >{label}</button>
  )

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'backdrop-blur-md bg-zinc-900/70 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg">
              <Zap size={20} />
            </div>
            <span className="text-white font-extrabold italic tracking-wide text-lg group-hover:text-blue-400 transition-colors">RCPRO</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <LinkBtn label="Home" view="home" />
            <LinkBtn label="Products" view="products" />
            <LinkBtn label="About" view="about" />
          </nav>

          {/* Search + Cart */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={submit} className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cars, planes, boats..."
                className="w-72 bg-white/90 placeholder-zinc-500 border border-zinc-200 rounded-full px-4 py-2 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow">Go</button>
            </form>

            <button onClick={() => onNavigate('cart')} className="relative p-2 rounded-full hover:bg-zinc-800 text-zinc-200">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-300 text-zinc-900 text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-zinc-100" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Panel */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <form onSubmit={submit} className="relative mb-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full bg-white placeholder-zinc-500 border border-zinc-200 rounded-full px-4 py-2 pr-16 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow">Search</button>
            </form>
            <div className="flex flex-col gap-2">
              <LinkBtn label="Home" view="home" />
              <LinkBtn label="Products" view="products" />
              <LinkBtn label="About" view="about" />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
