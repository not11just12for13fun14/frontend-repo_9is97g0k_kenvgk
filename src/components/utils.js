export const PRODUCTS = [
  {
    id: 'car-tdk500',
    name: 'Turbo Drift King 500',
    category: 'Cars',
    price: 349.99,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1719929833699-f82f83f8ca63?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUdXJibyUyMERyaWZ0JTIwS2luZyUyMDUwMHxlbnwwfDB8fHwxNzYzNTc3ODIyfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description: 'The Turbo Drift King 500 is built for ultimate control with a brushless motor and precision AWD. Conquer corners with effortless slides and lap your rivals with blistering speed.',
    isBestSeller: true,
  },
  {
    id: 'car-rallyx',
    name: 'RallyX Vortex Pro',
    category: 'Cars',
    price: 279.0,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop',
    description: 'A rugged off-road beast with long-travel suspension and sealed electronics. Tear through dirt, gravel, and mud with unstoppable torque.',
    isBestSeller: true,
  },
  {
    id: 'plane-skypro',
    name: 'SkyMaster Pro Jet',
    category: 'Planes',
    price: 459.99,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=1600&auto=format&fit=crop',
    description: 'A sleek EDF jet with reinforced airframe for high-G maneuvers. Stable at low speeds and savage at full throttle—perfect for show-stopping passes.',
    isBestSeller: true,
  },
  {
    id: 'plane-aeroblade',
    name: 'AeroBlade Trainer 2S',
    category: 'Planes',
    price: 189.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    description: 'Beginner-friendly yet aerobatic when you are ready. EPO foam construction for durability and quick repairability keeps you flying.',
    isBestSeller: false,
  },
  {
    id: 'boat-wave',
    name: 'WaveCrusher Speed Boat',
    category: 'Boats',
    price: 229.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1600&auto=format&fit=crop',
    description: 'Slices across the water with a water-cooled brushless system and self-righting hull. Dominate lakes with razor-straight tracking.',
    isBestSeller: true,
  },
  {
    id: 'boat-mariner',
    name: 'Mariner Explorer 400',
    category: 'Boats',
    price: 159.99,
    rating: 3,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
    description: 'A reliable deep-V hull crafted for long runtime and easy handling. Great for weekend cruising and fun with friends.',
    isBestSeller: false,
  },
  {
    id: 'car-trackviper',
    name: 'TrackViper GT',
    category: 'Cars',
    price: 399.99,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop',
    description: 'Race-tuned chassis and low-CG battery tray for insane cornering grip. Carbon-reinforced components keep the weight down and strength up.',
    isBestSeller: true,
  },
  {
    id: 'plane-stormwing',
    name: 'StormWing FPV Racer',
    category: 'Planes',
    price: 249.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1713545021758-35a5bfeba080?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdG9ybVdpbmclMjBGUFYlMjBSYWNlcnxlbnwwfDB8fHwxNzYzNTc3ODIzfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description: 'An agile wing optimized for FPV with roomy bays and excellent glide ratio. Carves up the sky with a locked-in, confidence-inspiring feel.',
    isBestSeller: false,
  }
]

export function performSearch(query, products) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return []
  const tokens = q.split(/\s+/).filter(Boolean)

  return products
    .map(p => {
      let score = 0
      if (p.name.toLowerCase() === q) score += 10
      if (p.category.toLowerCase().includes(q)) score += 5
      for (const t of tokens) {
        if (p.name.toLowerCase().includes(t)) score += 3
        if (p.description.toLowerCase().includes(t)) score += 1
      }
      return { ...p, _score: score }
    })
    .filter(p => p._score > 0)
    .sort((a, b) => b._score - a._score)
}
