import crypto from 'node:crypto'

const COOKIE = 'lb_admin_session'
const TTL_MS = 1000 * 60 * 60 * 8

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || ''
}

export function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || ''
}

export function adminConfigured() {
  return Boolean(getAdminPassword() && getSessionSecret())
}

function timingSafeEqualString(a, b) {
  const left = Buffer.from(String(a))
  const right = Buffer.from(String(b))
  if (left.length !== right.length) return false
  return crypto.timingSafeEqual(left, right)
}

export function verifyPassword(candidate) {
  const expected = getAdminPassword()
  if (!expected) return false
  return timingSafeEqualString(candidate, expected)
}

export function createSessionToken() {
  const exp = Date.now() + TTL_MS
  const payload = `admin.${exp}`
  const sig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('hex')
  return `${payload}.${sig}`
}

export function verifySessionToken(token) {
  if (!token || !getSessionSecret()) return false
  const parts = String(token).split('.')
  if (parts.length !== 3) return false
  const [role, expRaw, sig] = parts
  if (role !== 'admin') return false
  const exp = Number(expRaw)
  if (!Number.isFinite(exp) || Date.now() > exp) return false
  const payload = `${role}.${expRaw}`
  const expected = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('hex')
  return timingSafeEqualString(sig, expected)
}

export function readCookie(req, name = COOKIE) {
  const raw = req.headers.cookie || ''
  const match = raw
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${name}=`))
  if (!match) return ''
  return decodeURIComponent(match.slice(name.length + 1))
}

export function sessionCookieHeader(token, { clear = false } = {}) {
  const secure =
    process.env.VERCEL_ENV === 'production' ||
    process.env.NODE_ENV === 'production'
  if (clear) {
    return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${
      secure ? '; Secure' : ''
    }`
  }
  const maxAge = Math.floor(TTL_MS / 1000)
  return `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${
    secure ? '; Secure' : ''
  }`
}

export { COOKIE }
