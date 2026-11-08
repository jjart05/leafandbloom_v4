import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import {
  adminConfigured,
  createSessionToken,
  readCookie,
  sessionCookieHeader,
  verifyPassword,
  verifySessionToken,
} from '../api/_lib/adminSession.js'

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(Buffer.from(c)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function sendJson(
  res: ServerResponse,
  status: number,
  body: unknown,
  cookie?: string,
): void {
  const payload = JSON.stringify(body)
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  if (cookie) res.setHeader('Set-Cookie', cookie)
  res.end(payload)
}

/** Local `/api/admin-*` handlers so Vite can exercise server-side admin auth. */
export function viteAdminApiPlugin(): Plugin {
  return {
    name: 'lb-admin-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || ''
        if (!url.startsWith('/api/admin-')) {
          next()
          return
        }

        try {
          if (url === '/api/admin-session' && req.method === 'GET') {
            if (!adminConfigured()) {
              sendJson(res, 503, { ok: false, configured: false })
              return
            }
            const ok = verifySessionToken(readCookie(req))
            sendJson(res, ok ? 200 : 401, { ok, configured: true })
            return
          }

          if (url === '/api/admin-logout' && req.method === 'POST') {
            sendJson(res, 200, { ok: true }, sessionCookieHeader('', { clear: true }))
            return
          }

          if (url === '/api/admin-login' && req.method === 'POST') {
            if (!adminConfigured()) {
              sendJson(res, 503, {
                error: 'Admin authentication is not configured on this deployment.',
              })
              return
            }
            const raw = await readBody(req)
            let password = ''
            try {
              password = String(JSON.parse(raw || '{}').password || '')
            } catch {
              password = ''
            }
            if (!verifyPassword(password)) {
              sendJson(res, 401, { error: 'Invalid credentials' })
              return
            }
            const token = createSessionToken()
            sendJson(res, 200, { ok: true }, sessionCookieHeader(token))
            return
          }

          sendJson(res, 405, { error: 'Method not allowed' })
        } catch {
          sendJson(res, 500, { error: 'Server error' })
        }
      })
    },
  }
}
