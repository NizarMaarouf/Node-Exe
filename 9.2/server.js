const http = require('http');
const server = http.createServer((req ,res)=>{
  res.setHeader('Content-Type', 'text/html');
  res.statusCode =200;
  // res.write('Welcome to my server!\n');
  // res.write('you are now in port 3000')
  if(req.url === '/')res.write('Welcome to my Home!');
  else if(req.url === '/About')res.write('Welcome to my About!');
  res.end();
});
server.listen(3000 , ()=>console.log('server is listening on port 3000'));

