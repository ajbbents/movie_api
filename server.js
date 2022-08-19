const http = require('http'),
fs = require('fs'),
url = require('url');

http.createServer((request, response) => {
  let addr = request.url,
  q = url.parse(addr, true),
  filepath = ' ';

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to Log.');
    }
  });

  if (q.pathname.includes('documentation')) {
    filepath = (__dirname + 'documentation.html');
  } else {
    filepath = 'index.html'
  };

  fs.readfile(filepath, (err, data) => {
    if (err) {
      throw err;
    }
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  });

}).listen(8080);
