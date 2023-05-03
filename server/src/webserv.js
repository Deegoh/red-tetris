import fs from 'fs'
import { loginfo, logerror } from './logger';





export const webserv = (app, callback) => {
  loginfo(`tetris lisgh`, process.env.PORT, process.env.HOST)

  app.on('request', (req, res) => {

    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'

    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  })

  app.listen(parseInt(process.env.PORT), process.env.HOST, () =>{
    loginfo(`tetris listen on`)
    callback()
  })
}
