import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-20 bg-zinc-950 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h4 className="text-white font-extrabold italic text-lg mb-3">RCPRO</h4>
          <p className="text-sm text-zinc-400">High-performance RC machines for racers and hobbyists. Built to dominate track, sky, and sea.</p>
        </div>
        <div>
          <h5 className="text-zinc-100 font-semibold mb-3">Catalog</h5>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="#">Cars</a></li>
            <li><a className="hover:text-white" href="#">Planes</a></li>
            <li><a className="hover:text-white" href="#">Boats</a></li>
            <li><a className="hover:text-white" href="#">Parts</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-zinc-100 font-semibold mb-3">Support</h5>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="#">Shipping</a></li>
            <li><a className="hover:text-white" href="#">Returns</a></li>
            <li><a className="hover:text-white" href="#">Warranty</a></li>
            <li><a className="hover:text-white" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-zinc-100 font-semibold mb-3">Newsletter</h5>
          <p className="text-sm text-zinc-400 mb-3">Join the Elite Racing Club</p>
          <div className="flex gap-2">
            <input className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm" placeholder="you@example.com" />
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-900 text-xs text-zinc-500 py-4 text-center">© {new Date().getFullYear()} RCPRO. All rights reserved.</div>
    </footer>
  )
}
