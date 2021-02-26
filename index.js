  const http = require('http');
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("url: " + req.url + "req.method: " + req.method);

    if(req.method === 'GET'){
      var fileUrl;

      if(req.url === '/'){
        fileUrl = '/index.html';
      } else fileUrl = req.url

      var filePath = path.resolve('./public'+fileUrl);
      const fileExt = path.extname(filePath)

      if(fileExt === '.html'){  
        fs.exists(filePath, (exists) =>{
          if(!exists){
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end('<html><body><h1>File not found: 404 Error.</h1></body></html>')
            return
          }else{
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            fs.createReadStream(filePath).pipe(res)
          }
        })
      }else{           
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('<html><body><h1>File is not an HTML file.</h1></body></html>')
        return
      }

    }else{
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.end('<html><body><h1> ' + req.method + ' not supported.</h1></body></html>')
    }


})

server.listen(port,hostname, function(){
  console.log('server running');
})