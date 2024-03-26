const fs = require("fs");
const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  //solution-1
  //   fs.readFile("text.txt", (err, data) => {
  //     if (err) console.log(data);
  //     res.end(data);
  //   });
  //solution-2
  //   const read = fs.createReadStream("textt.txt");
  //   read.on("data", (chunk) => {
  //     res.end(chunk);
  //   });
  //   read.on("end", () => {
  //     res.end();
  //   });
  //   read.on("error", () => {
  //     console.log("There is error");
  //     (res.statusCode = 500), res.end("File does not exit...");
  //   });
  //solution-3
  const read = fs.createReadStream("text.txt");
  read.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening...");
});
