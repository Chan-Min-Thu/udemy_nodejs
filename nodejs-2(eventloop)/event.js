const EventEmmitter = require("events");
const http = require("http");
const { url } = require("inspector");

class Sale extends EventEmmitter {
  constructor() {
    super();
  }
}
const emmit = new Sale();

emmit.on("newSale", () => {
  console.log("There was a new sale.");
});

emmit.on("newSale", (stock) => {
  console.log(`There is ${stock} items.`);
});
emmit.emit("newSale", 20);

////// http /////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(`This is request:${req.url}`);
  res.end("This is request: ");
});

server.on("request", (req, res) => {
  console.log(`This is another request:`);
});

server.on("close", () => {
  console.log("This is close.");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening.");
});
