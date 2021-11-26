import app from './app'
import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, '../cert/localhost.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert/localhost.crt')),
}, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

// app.listen(3000, () => {
//     console.log(`listening on port ${3000}`)
// })
