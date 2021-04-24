const http = require("http");
const url = require("url");
const querystring = require("querystring");
const usersJson = require("./users.json");

const port = 3030;
const users = usersJson.users;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  if(req.url === '/')res.write('Welcome to my Home!');
  else if(req.url === '/raw-html”')res.write('Welcome to my raw-html”!');

  if (req.method === "GET") {
    if (req.url.includes("users") && query.id) {
      res.write(
        JSON.stringify(users.filter((user) => user.id === query.id))
      );
    } else if (req.url.includes("users") && query.name) {
      res.write(
        JSON.stringify(users.filter((user) => user.name === query.name))
      );
    } else if (req.url.includes("users") && query.room) {
      res.write(
        JSON.stringify(
          users.filter((user) => user.room === query.room)
        )
      );
    } else if (req.url.includes("users")) {
      res.write(JSON.stringify(users));
    }
  }

  res.end();
});

server.listen(port, () => {
  console.log("Server is listening on " + port);
});
