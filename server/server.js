const express = require('express')
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const server = express()
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
})
server.use(express.static(path.resolve(__dirname, '../dist')))
server.get('*', (req, res) => {
  if (req.url != 'favicon.ico') {
    const context = {url: req.url}
    const ssrStream = renderer.renderToStream(context);
    let html = ''
    ssrStream.on('data', data => {
      html += data.toString()
    })

    ssrStream.on('end', () => {
      console.log(html) // 渲染完成
      res.end(html)
    })
    ssrStream.on('error', (err) =>{console.log(err)})
  }
})

server.listen(8090, () => {
  console.log(`vue ssr started at http://localhost:8090`)
})
