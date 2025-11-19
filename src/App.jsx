import React, { useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Truck, Zap, Star } from 'lucide-react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import { PRODUCTS, performSearch } from './components/utils'
import './index.css'

function Section({ children, className = '' }) {
  return (
    <section className={`animate-fadeIn ${className}`}>
      {children}
    </section>
  )
}

export default function App() {
  const [view, setView] = useState('home')
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [sortBy, setSortBy] = useState('relevance')

  const navigate = (v) => setView(v)

  const addToCart = (item) => setCart(prev => [...prev, item])

  const runSearch = (q) => {
    setSearchQuery(q)
    const results = performSearch(q, PRODUCTS)
    setSearchResults(results)
    setSortBy('relevance')
    setView('search_results')
  }

  const sortedResults = useMemo(() => {
    const arr = [...(view === 'products' ? PRODUCTS : searchResults)]
    if (sortBy === 'price_low') return arr.sort((a,b) => a.price - b.price)
    if (sortBy === 'price_high') return arr.sort((a,b) => b.price - a.price)
    return arr // relevance already sorted
  }, [view, searchResults, sortBy])

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Navbar onNavigate={navigate} onSearch={runSearch} cartCount={cart.length} currentView={view} />

      {/* Spacer for sticky navbar */}
      <div className="h-16" />

      {view === 'home' && (
        <>
          {/* Hero with dark background and Spline */}
          <div className="relative bg-zinc-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold italic tracking-tight">DOMINATE THE TRACK</h1>
                <p className="mt-4 text-zinc-300">Pro-grade RC cars, planes, and boats engineered for speed and precision. Join the elite and feel the adrenaline.</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setView('products')} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg">Start Your Engine</button>
                  <button onClick={() => setView('about')} className="px-5 py-3 rounded-xl bg-zinc-800 text-white font-semibold shadow-lg">Learn More</button>
                </div>
              </div>
              <div className="h-[360px] w-full rounded-xl overflow-hidden shadow-lg">
                <Spline scene="https://prod.spline.design/8fw9Z-c-rqW3nWBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
            {/* subtle gradient overlay to add pop without blocking pointer */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent"></div>
          </div>

          {/* Best Sellers */}
          <Section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="text-2xl font-extrabold italic mb-6">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PRODUCTS.filter(p => p.isBestSeller).map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          </Section>

          {/* Category Cards */}
          <Section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Off-Road', icon: Truck, color: 'from-zinc-100 to-white' },
                { title: 'Aerial', icon: Zap, color: 'from-zinc-100 to-white' },
                { title: 'Marine', icon: Star, color: 'from-zinc-100 to-white' },
              ].map(({ title, icon: Icon, color }) => (
                <div key={title} className={`rounded-2xl p-6 bg-gradient-to-br ${color} border border-zinc-200 shadow-lg hover:border-blue-400 transition cursor-pointer`}>
                  <Icon className="text-blue-600" />
                  <h3 className="mt-3 font-extrabold italic text-xl">{title}</h3>
                  <p className="text-sm text-zinc-600">Built to conquer this arena with precision components and premium powertrains.</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Promo Banner */}
          <div className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <h3 className="text-2xl font-extrabold italic">Join the Elite Racing Club</h3>
              <div className="flex w-full md:w-auto gap-2">
                <input className="flex-1 md:flex-none w-72 bg-white text-zinc-900 rounded-xl px-4 py-3 placeholder-zinc-500" placeholder="you@example.com" />
                <button className="px-5 py-3 rounded-xl bg-zinc-900 text-white font-semibold">Join</button>
              </div>
            </div>
          </div>
        </>
      )}

      {(view === 'products' || view === 'search_results') && (
        <Section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="font-extrabold italic text-2xl">
              {view === 'products' ? `All Products` : `Found ${searchResults.length} items`}
            </h2>
            <div className="flex items-center gap-2">
              <label className="text-sm text-zinc-600">Sort</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm">
                <option value="relevance">Relevance</option>
                <option value="price_low">Price Low-High</option>
                <option value="price_high">Price High-Low</option>
              </select>
            </div>
          </div>

          {sortedResults.length === 0 ? (
            <div className="text-center py-16 text-zinc-500">
              <Star className="mx-auto mb-4 text-zinc-400" size={48} />
              <p>No results. Try a different search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedResults.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </Section>
      )}

      {view === 'about' && (
        <Section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-3xl font-extrabold italic mb-4">THE RCPRO LEGACY</h2>
          <p className="text-zinc-700 mb-6">In 2010, Mike 'Nitro' Davidson turned a small garage into a high-octane dream. From hand-tuned motors to carbon-reinforced upgrades, the vision was simple: build machines that make hearts race and laps vanish. Today, the spirit of the garage fuels everything we do.</p>
          <div className="relative rounded-2xl overflow-hidden bg-zinc-900 text-white p-8 shadow-lg">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            <blockquote className="relative font-semibold text-xl">"We don't just sell toys."</blockquote>
          </div>
        </Section>
      )}

      <Footer />
    </div>
  )
}
