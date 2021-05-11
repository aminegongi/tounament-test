// const express = require('express')
const next = require('next')
// const nextI18NextMiddleware = require('next-i18next/middleware').default

// const nextI18next = require('./i18n')

// const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

// (async () => {
//   await app.prepare()
//   const server = express()

//   server.use(nextI18NextMiddleware(nextI18next))

//   server.get('*', (req, res) => handle(req, res))

//   await server.listen(port)
//   console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
// })()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // const server = express()

    // server.use(nextI18NextMiddleware(nextI18next))

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)

      app.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, () => {
    console.log(`> Ready on http://localhost:${3000}`)
  })
})
