export const FREE_SHIPPING_MIN = 2500
export const SHIPPING_FEE = 150

export function formatPHP(amount: number): string {
  return `₱${amount.toLocaleString('en-PH')}`
}

export function calcShipping(subtotal: number): number {
  if (subtotal <= 0) return 0
  return subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE
}

export function calcTotal(subtotal: number): number {
  return subtotal + calcShipping(subtotal)
}
