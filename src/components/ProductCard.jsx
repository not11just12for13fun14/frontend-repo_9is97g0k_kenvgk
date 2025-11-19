import React, { useState } from 'react'
import { Heart } from 'lucide-react'

export default function ProductCard({ product, onAddToCart }) {
  const [fav, setFav] = useState(false)
  const [imgOk, setImgOk] = useState(true)

  const fallback = 'https://images.unsplash.com/photo-1520975922284-7b6836c78d46?q=80&w=1200&auto=format&fit=crop'

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgOk ? product.image : fallback}
          onError={() => setImgOk(false)}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-yellow-300 text-zinc-900 text-xs font-extrabold px-2 py-1 rounded-full shadow">
            Best Seller
          </span>
        )}
        <button
          onClick={() => setFav(!fav)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow ${fav ? 'text-red-500' : 'text-zinc-700'}`}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-extrabold italic text-zinc-900">{product.name}</h3>
          <span className="text-blue-600 font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-zinc-600 line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-zinc-500">Rating: {product.rating} / 5</div>
          <button onClick={() => onAddToCart(product)} className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold shadow">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
