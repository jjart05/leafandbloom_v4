import {
  adminConfigured,
  createSessionToken,
  sessionCookieHeader,
  verifyPassword,
} from './_lib/adminSession.js'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  if (!adminConfigured()) {
    res.status(503).json({
      error: 'Admin authentication is not configured on this deployment.',
    })
    return
  }

  const password =
    typeof req.body === 'object' && req.body
      ? String(req.body.password || '')
      : ''

  if (!verifyPassword(password)) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const token = createSessionToken()
  res.setHeader('Set-Cookie', sessionCookieHeader(token))
  res.status(200).json({ ok: true })
}
