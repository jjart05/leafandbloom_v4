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
    "img": "https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=435&auto=format&fit=crop",
    "desc": "Iconic split-leaf philodendron. A statement piece for any interior."
  },
  {
    "id": 2,
    "name": "Fiddle Leaf Fig",
    "category": "tropical",
    "price": 3500,
    "badge": "New",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?q=80&w=687&auto=format&fit=crop",
    "desc": "Architectural silhouette with dramatic, glossy fiddle-shaped leaves."
  },
  {
    "id": 3,
    "name": "Bird of Paradise",
    "category": "tropical",
    "price": 2800,
    "badge": "",
    "badgeClass": "",
    "img": "https://plus.unsplash.com/premium_photo-1676316337647-65c35c441c9d?q=80&w=687&auto=format&fit=crop",
    "desc": "Bold, tropical foliage that transforms any corner into a lush retreat."
  },
  {
    "id": 4,
    "name": "White Phalaenopsis",
    "category": "orchid",
    "price": 2200,
    "badge": "Sale",
    "badgeClass": "sale",
    "img": "https://images.unsplash.com/photo-1710524784485-5c77ae822ecc?q=80&w=1170&auto=format&fit=crop",
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
    "img": "https://images.unsplash.com/photo-1632906379687-355e24798632?q=80&w=1073&auto=format&fit=crop",
    "desc": "Velvety heart-shaped blooms in soft blush pink."
  },
  {
    "id": 6,
    "name": "Purple Dendrobium",
    "category": "orchid",
    "price": 1600,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1755027619393-65e8de9c1b31?q=80&w=720&auto=format&fit=crop",
    "desc": "Rich lavender clusters that bloom abundantly with minimal care."
  },
  {
    "id": 7,
    "name": "Curated Succulent Set",
    "category": "succulent",
    "price": 980,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=705&auto=format&fit=crop",
    "desc": "A sculptural trio of rare succulents in hand-thrown ceramic pots."
  },
  {
    "id": 8,
    "name": "Geometric Terrarium",
    "category": "succulent",
    "price": 2400,
    "badge": "New",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1604591251652-80897be7c245?q=80&w=735&auto=format&fit=crop",
    "desc": "Gold-framed geometric terrarium with handpicked succulents."
  },
  {
    "id": 9,
    "name": "Boston Fern",
    "category": "fern",
    "price": 750,
    "badge": "",
    "badgeClass": "",
    "img": "https://plus.unsplash.com/premium_photo-1770836554434-75c5c88914ad?q=80&w=880&auto=format&fit=crop",
    "desc": "Lush, arching fronds that bring soft, romantic texture."
  },
  {
    "id": 10,
    "name": "Golden Pothos",
    "category": "fern",
    "price": 450,
    "badge": "Popular",
    "badgeClass": "gold",
    "img": "https://images.unsplash.com/photo-1763060819223-b92eb0ca6e4d?q=80&w=1173&auto=format&fit=crop",
    "desc": "Trailing golden-green pothos for shelves and hangers."
  },
  {
    "id": 11,
    "name": "The Signature Bouquet",
    "category": "arrangement",
    "price": 3800,
    "badge": "Luxury",
    "badgeClass": "gold",
    "img": "https://plus.unsplash.com/premium_photo-1674581211991-bd10fa5137bf?q=80&w=880&auto=format&fit=crop",
    "desc": "Our flagship arrangement — lush, seasonal blooms, hand-tied."
  },
  {
    "id": 12,
    "name": "Wild Garden Vase",
    "category": "arrangement",
    "price": 2600,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1533616688419-b7a585564566?w=500&auto=format&fit=crop",
    "desc": "Loose meadow blooms and branches in a vase."
  },
  {
    "id": 13,
    "name": "Variegated Monstera",
    "category": "rare",
    "price": 18000,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "https://images.unsplash.com/photo-1684738054008-6fcab69c48b0?w=500&auto=format&fit=crop",
    "desc": "Crown jewel of plant collectors. Striking white-marbled foliage."
  },
  {
    "id": 14,
    "name": "Black Bat Flower",
    "category": "rare",
    "price": 8500,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "https://images.unsplash.com/photo-1666071016865-9a2c93dd880c?w=500&auto=format&fit=crop",
    "desc": "Extraordinarily exotic — dramatic black blooms with tendrils."
  },
  {
    "id": 15,
    "name": "Snake Plant Laurentii",
    "category": "tropical",
    "price": 890,
    "badge": "Popular",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "desc": "Upright yellow-edged leaves. Handles low light and infrequent watering."
  },
  {
    "id": 16,
    "name": "Bird's Nest Snake Plant",
    "category": "tropical",
    "price": 650,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/7349006/pexels-photo-7349006.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "desc": "Compact Sansevieria Hahnii — a desk-size plant for bright, filtered light."
  },
  {
    "id": 17,
    "name": "Peace Lily",
    "category": "tropical",
    "price": 1250,
    "badge": "New",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/7862172/pexels-photo-7862172.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "desc": "Glossy foliage with white spathes. Prefers shade and steady moisture."
  },
  {
    "id": 18,
    "name": "Calathea Orbifolia",
    "category": "tropical",
    "price": 1650,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=1200&auto=format&fit=crop",
    "desc": "Broad silver-striped leaves. Best in humid rooms away from direct sun."
  },
  {
    "id": 19,
    "name": "Spider Plant",
    "category": "fern",
    "price": 520,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=1200&auto=format&fit=crop",
    "desc": "Arching variegated leaves that send out plantlets. Easy shelf plant."
  },
  {
    "id": 20,
    "name": "Neon Pothos",
    "category": "fern",
    "price": 550,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "desc": "Bright chartreuse trailing vines for shelves, hangers, or cabinets."
  },
  {
    "id": 21,
    "name": "Lace Aloe",
    "category": "succulent",
    "price": 480,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=1200&auto=format&fit=crop",
    "desc": "Speckled rosette succulent. Water sparingly; bright light preferred."
  },
  {
    "id": 22,
    "name": "Columnar Cactus",
    "category": "succulent",
    "price": 690,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop",
    "desc": "Tall ribbed cactus for sunny windowsills. Minimal weekly care."
  },
  {
    "id": 23,
    "name": "Ficus Ginseng",
    "category": "rare",
    "price": 3200,
    "badge": "Featured",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1200&auto=format&fit=crop",
    "desc": "Sculptural bonsai-form ficus with thick roots and dense canopy."
  },
  {
    "id": 24,
    "name": "Rubber Plant",
    "category": "tropical",
    "price": 1450,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
    "desc": "Thick waxy leaves on a clean stem. Bright, indirect light indoors."
  },
  {
    "id": 25,
    "name": "Dracaena Marginata",
    "category": "tropical",
    "price": 1350,
    "badge": "New",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Slender red-edged leaves on a tall cane. Good for bright corners."
  },
  {
    "id": 26,
    "name": "Areca Palm",
    "category": "tropical",
    "price": 2100,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Feathery fronds that soften living rooms. Prefers bright, filtered light."
  },
  {
    "id": 27,
    "name": "Chinese Money Plant",
    "category": "tropical",
    "price": 780,
    "badge": "Popular",
    "badgeClass": "gold",
    "img": "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Round coin-like leaves on upright stems. Easy desk or shelf plant."
  },
  {
    "id": 28,
    "name": "String of Pearls",
    "category": "succulent",
    "price": 620,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Trailing bead-like foliage for hanging pots. Water sparingly."
  },
  {
    "id": 29,
    "name": "Haworthia Cluster",
    "category": "succulent",
    "price": 540,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/1022922/pexels-photo-1022922.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Compact striped rosettes. Ideal for sunny windowsills."
  },
  {
    "id": 30,
    "name": "Soft Fern Basket",
    "category": "fern",
    "price": 890,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1400&auto=format&fit=crop",
    "desc": "Full, feathery foliage in a clean pot. Likes humidity and shade."
  },
  {
    "id": 31,
    "name": "Staghorn Fern",
    "category": "fern",
    "price": 1750,
    "badge": "Featured",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Lush layered fronds with rich texture. A sculptural greenery piece."
  },
  {
    "id": 32,
    "name": "Blush Orchid Spray",
    "category": "orchid",
    "price": 1950,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1710524784485-5c77ae822ecc?q=80&w=1400&auto=format&fit=crop",
    "desc": "White orchid blooms on graceful stems. Gift-ready potting."
  },
  {
    "id": 33,
    "name": "Yellow Dancing Orchid",
    "category": "orchid",
    "price": 1680,
    "badge": "New",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/1084189/pexels-photo-1084189.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Bright oncidium sprays with lively yellow petals."
  },
  {
    "id": 34,
    "name": "Classic White Bouquet",
    "category": "arrangement",
    "price": 2900,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Clean white blooms hand-tied for tables, vows, and quiet rooms."
  },
  {
    "id": 35,
    "name": "Meadow Wildflower Vase",
    "category": "arrangement",
    "price": 2450,
    "badge": "Popular",
    "badgeClass": "gold",
    "img": "https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Loose seasonal wildflowers in a studio vase. Soft and informal."
  },
  {
    "id": 36,
    "name": "Eucalyptus Bloom Bundle",
    "category": "arrangement",
    "price": 2200,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Studio greenery set with lasting foliage — clean table arrangement."
  },
  {
    "id": 37,
    "name": "Alocasia Amazonica",
    "category": "rare",
    "price": 2800,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "desc": "Dramatic sculptural leaves. Loves humidity and bright shade."
  },
  {
    "id": 38,
    "name": "Velvet Leaf Anthurium",
    "category": "rare",
    "price": 4200,
    "badge": "Rare",
    "badgeClass": "rare",
    "img": "https://images.unsplash.com/photo-1632906379687-355e24798632?q=80&w=1400&auto=format&fit=crop",
    "desc": "Glossy heart-shaped spathes with bold foliage. Collector favorite."
  },
  {
    "id": 39,
    "name": "Sweetheart Hoya",
    "category": "tropical",
    "price": 720,
    "badge": "",
    "badgeClass": "",
    "img": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1400&auto=format&fit=crop",
    "desc": "Compact leafy plant in a clean pot. Easy gift for shelves."
  }
] as Product[]

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
