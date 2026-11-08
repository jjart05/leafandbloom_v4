import { sessionCookieHeader } from './_lib/adminSession.js'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  res.setHeader('Set-Cookie', sessionCookieHeader('', { clear: true }))
  res.status(200).json({ ok: true })
}
