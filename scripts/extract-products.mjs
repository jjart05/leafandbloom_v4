import fs from 'node:fs'

const rawJs = fs.readFileSync('src/data/products.raw.js', 'utf8')
const products = eval(rawJs.replace('export default', ''))

const header = `export type ProductCategory =
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

export const PRODUCTS: Product[] = `

const footer = `

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
`

fs.writeFileSync(
  'src/data/products.ts',
  `${header}${JSON.stringify(products, null, 2)} as Product[]${footer}`,
)
fs.unlinkSync('src/data/products.raw.js')
console.log('wrote', products.length, 'products')
