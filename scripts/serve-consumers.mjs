import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
const root = resolve(process.argv[2])
createServer(async (req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204).end()
    return
  }
  const path = resolve(
    root,
    '.' +
      new URL(req.url, 'http://localhost').pathname.replace(
        /\/$/,
        '/index.html',
      ),
  )
  if (!path.startsWith(root + '/')) {
    res.writeHead(403).end()
    return
  }
  try {
    const data = await readFile(path)
    res.setHeader(
      'Content-Type',
      { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[
        extname(path)
      ] || 'application/octet-stream',
    )
    res.end(data)
  } catch {
    res.writeHead(404).end()
  }
}).listen(Number(process.argv[3]), '127.0.0.1')
