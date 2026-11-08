export type ProductCategory =
  | 'tropical'
  | 'orchid'
  | 'succulent'
  | 'fern'
  | 'arrangement'
  | 'rare'

export interface Product {
  id: number
  name: string
  category: ProductCategory
  price: number
  badge: string
  badgeClass: string
  img: string
  desc: string
  oldPrice?: number
}

export const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'tropical', label: 'Tropical Plants' },
  { id: 'orchid', label: 'Orchids' },
  { id: 'succulent', label: 'Succulents' },
  { id: 'fern', label: 'Ferns & Foliage' },
  { id: 'arrangement', label: 'Arrangements' },
  { id: 'rare', label: 'Rare Finds' },
]

export const PRODUCTS: Product[] = [
  {
    "id": 1,
    "name": "Monstera Deliciosa",
    "category": "tropical",
    "price": 1200,
    "badge": "Best Seller",
    "badgeClass": "gold",
    "img": "/images/products/1.jpg",
    "desc": "Iconic split-leaf philodendron. A statement piece for any interior."
  },
  {
    "id": 2,
    "name": "Fiddle Leaf Fig",
    "category": "tropical",
    "price": 3500,
    "badge": "New",
    "badgeClass": "",
    "img": "/images/products/2.jpg",
    "desc": "Architectural silhouette with dramatic, glossy fiddle-shaped leaves."
  },
  {
    "id": 3,
    "name": "Bird of Paradise",
    "category": "tropical",
    "price": 2800,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/3.jpg",
    "desc": "Bold, tropical foliage that transforms any corner into a lush retreat."
  },
  {
    "id": 4,
    "name": "White Phalaenopsis",
    "category": "orchid",
    "price": 2200,
    "badge": "Sale",
    "badgeClass": "sale",
    "img": "/images/products/4.jpg",
    "desc": "White phalaenopsis with cascading blooms.",
    "oldPrice": 2800
  },
  {
    "id": 5,
    "name": "Pink Anthurium",
    "category": "orchid",
    "price": 1800,
    "badge": "Premium",
    "badgeClass": "gold",
    "img": "/images/products/5.jpg",
    "desc": "Velvety heart-shaped blooms in soft blush pink."
  },
  {
    "id": 6,
    "name": "Purple Dendrobium",
    "category": "orchid",
    "price": 1600,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/6.jpg",
    "desc": "Rich lavender clusters that bloom abundantly with minimal care."
  },
  {
    "id": 7,
    "name": "Curated Succulent Set",
    "category": "succulent",
    "price": 980,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/7.jpg",
    "desc": "A sculptural trio of rare succulents in hand-thrown ceramic pots."
  },
  {
    "id": 8,
    "name": "Geometric Terrarium",
    "category": "succulent",
    "price": 2400,
    "badge": "New",
    "badgeClass": "",
    "img": "/images/products/8.jpg",
    "desc": "Gold-framed geometric terrarium with handpicked succulents."
  },
  {
    "id": 9,
    "name": "Boston Fern",
    "category": "fern",
    "price": 750,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/9.jpg",
    "desc": "Lush, arching fronds that bring soft, romantic texture."
  },
  {
    "id": 10,
    "name": "Golden Pothos",
    "category": "fern",
    "price": 450,
    "badge": "Popular",
    "badgeClass": "gold",
    "img": "/images/products/10.jpg",
    "desc": "Trailing golden-green pothos for shelves and hangers."
  },
  {
    "id": 11,
    "name": "The Signature Bouquet",
    "category": "arrangement",
    "price": 3800,
    "badge": "Luxury",
    "badgeClass": "gold",
    "img": "/images/products/11.jpg",
    "desc": "Our flagship arrangement — lush, seasonal blooms, hand-tied."
  },
  {
    "id": 12,
    "name": "Wild Garden Vase",
    "category": "arrangement",
    "price": 2600,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/12.jpg",
    "desc": "Loose meadow blooms and branches in a vase."
  },
  {
    "id": 13,
    "name": "Variegated Monstera",
    "category": "rare",
    "price": 18000,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "/images/products/13.jpg",
    "desc": "Crown jewel of plant collectors. Striking white-marbled foliage."
  },
  {
    "id": 14,
    "name": "Black Bat Flower",
    "category": "rare",
    "price": 8500,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "/images/products/14.jpg",
    "desc": "Extraordinarily exotic — dramatic black blooms with tendrils."
  },
  {
    "id": 15,
    "name": "Snake Plant Laurentii",
    "category": "tropical",
    "price": 890,
    "badge": "Popular",
    "badgeClass": "",
    "img": "/images/products/15.jpeg",
    "desc": "Upright yellow-edged leaves. Handles low light and infrequent watering."
  },
  {
    "id": 16,
    "name": "Bird's Nest Snake Plant",
    "category": "tropical",
    "price": 650,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/16.jpeg",
    "desc": "Compact Sansevieria Hahnii — a desk-size plant for bright, filtered light."
  },
  {
    "id": 17,
    "name": "Peace Lily",
    "category": "tropical",
    "price": 1250,
    "badge": "New",
    "badgeClass": "",
    "img": "/images/products/17.jpeg",
    "desc": "Glossy foliage with white spathes. Prefers shade and steady moisture."
  },
  {
    "id": 18,
    "name": "Calathea Orbifolia",
    "category": "tropical",
    "price": 1650,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/18.jpg",
    "desc": "Broad silver-striped leaves. Best in humid rooms away from direct sun."
  },
  {
    "id": 19,
    "name": "Spider Plant",
    "category": "fern",
    "price": 520,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/19.jpg",
    "desc": "Arching variegated leaves that send out plantlets. Easy shelf plant."
  },
  {
    "id": 20,
    "name": "Neon Pothos",
    "category": "fern",
    "price": 550,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/20.jpeg",
    "desc": "Bright chartreuse trailing vines for shelves, hangers, or cabinets."
  },
  {
    "id": 21,
    "name": "Lace Aloe",
    "category": "succulent",
    "price": 480,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/21.jpg",
    "desc": "Speckled rosette succulent. Water sparingly; bright light preferred."
  },
  {
    "id": 22,
    "name": "Columnar Cactus",
    "category": "succulent",
    "price": 690,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/22.jpg",
    "desc": "Tall ribbed cactus for sunny windowsills. Minimal weekly care."
  },
  {
    "id": 23,
    "name": "Ficus Ginseng",
    "category": "rare",
    "price": 3200,
    "badge": "Featured",
    "badgeClass": "",
    "img": "/images/products/23.jpg",
    "desc": "Sculptural bonsai-form ficus with thick roots and dense canopy."
  },
  {
    "id": 24,
    "name": "Rubber Plant",
    "category": "tropical",
    "price": 1450,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/24.jpg",
    "desc": "Thick waxy leaves on a clean stem. Bright, indirect light indoors."
  },
  {
    "id": 25,
    "name": "Dracaena Marginata",
    "category": "tropical",
    "price": 1350,
    "badge": "New",
    "badgeClass": "",
    "img": "/images/products/25.jpeg",
    "desc": "Slender red-edged leaves on a tall cane. Good for bright corners."
  },
  {
    "id": 26,
    "name": "Areca Palm",
    "category": "tropical",
    "price": 2100,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/26.jpeg",
    "desc": "Feathery fronds that soften living rooms. Prefers bright, filtered light."
  },
  {
    "id": 27,
    "name": "Chinese Money Plant",
    "category": "tropical",
    "price": 780,
    "badge": "Popular",
    "badgeClass": "gold",
    "img": "/images/products/27.jpeg",
    "desc": "Round coin-like leaves on upright stems. Easy desk or shelf plant."
  },
  {
    "id": 28,
    "name": "String of Pearls",
    "category": "succulent",
    "price": 620,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/28.jpeg",
    "desc": "Trailing bead-like foliage for hanging pots. Water sparingly."
  },
  {
    "id": 29,
    "name": "Haworthia Cluster",
    "category": "succulent",
    "price": 540,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/29.jpeg",
    "desc": "Compact striped rosettes. Ideal for sunny windowsills."
  },
  {
    "id": 30,
    "name": "Soft Fern Basket",
    "category": "fern",
    "price": 890,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/30.jpg",
    "desc": "Full, feathery foliage in a clean pot. Likes humidity and shade."
  },
  {
    "id": 31,
    "name": "Staghorn Fern",
    "category": "fern",
    "price": 1750,
    "badge": "Featured",
    "badgeClass": "",
    "img": "/images/products/31.jpeg",
    "desc": "Lush layered fronds with rich texture. A sculptural greenery piece."
  },
  {
    "id": 32,
    "name": "Blush Orchid Spray",
    "category": "orchid",
    "price": 1950,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/32.jpg",
    "desc": "White orchid blooms on graceful stems. Gift-ready potting."
  },
  {
    "id": 33,
    "name": "Yellow Dancing Orchid",
    "category": "orchid",
    "price": 1680,
    "badge": "New",
    "badgeClass": "",
    "img": "/images/products/33.jpeg",
    "desc": "Bright oncidium sprays with lively yellow petals."
  },
  {
    "id": 34,
    "name": "Classic White Bouquet",
    "category": "arrangement",
    "price": 2900,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/34.jpeg",
    "desc": "Clean white blooms hand-tied for tables, vows, and quiet rooms."
  },
  {
    "id": 35,
    "name": "Meadow Wildflower Vase",
    "category": "arrangement",
    "price": 2450,
    "badge": "Popular",
    "badgeClass": "gold",
    "img": "/images/products/35.jpeg",
    "desc": "Loose seasonal wildflowers in a studio vase. Soft and informal."
  },
  {
    "id": 36,
    "name": "Eucalyptus Bloom Bundle",
    "category": "arrangement",
    "price": 2200,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/36.jpeg",
    "desc": "Studio greenery set with lasting foliage — clean table arrangement."
  },
  {
    "id": 37,
    "name": "Alocasia Amazonica",
    "category": "rare",
    "price": 2800,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "/images/products/37.jpeg",
    "desc": "Dramatic sculptural leaves. Loves humidity and bright shade."
  },
  {
    "id": 38,
    "name": "Velvet Leaf Anthurium",
    "category": "rare",
    "price": 4200,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "/images/products/38.jpg",
    "desc": "Glossy heart-shaped spathes with bold foliage. Collector favorite."
  },
  {
    "id": 39,
    "name": "Sweetheart Hoya",
    "category": "tropical",
    "price": 720,
    "badge": "",
    "badgeClass": "",
    "img": "/images/products/39.jpg",
    "desc": "Compact leafy plant in a clean pot. Easy gift for shelves."
  }
] as Product[]

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
