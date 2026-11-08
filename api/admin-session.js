import {
  adminConfigured,
  readCookie,
  verifySessionToken,
} from './_lib/adminSession.js'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  if (!adminConfigured()) {
    res.status(503).json({ ok: false, configured: false })
    return
  }
  const token = readCookie(req)
  const ok = verifySessionToken(token)
  res.status(ok ? 200 : 401).json({ ok, configured: true })
}
