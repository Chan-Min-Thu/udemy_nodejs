const fs = require("fs");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 4; //default thread size = 4

setTimeout(() => console.log("Set time out function..."), 0);
setImmediate(() => console.log("Set Immidiate function..."));
const start = Date.now();
fs.readFile("text.txt", () => {
  console.log("I/O finished");
  console.log("________");
  setTimeout(() => {
    console.log("Set time out function-2");
  }, 0);
  setTimeout(() => {
    console.log("Set time out function-3");
  }, 3000);
  setImmediate(() => console.log("Set Immediate function-2"));
  process.nextTick(() => {
    //nextTick is misleading name , Immediate get executed once per tick but nextTick get executed immediately before setImmediate
    console.log("This is next tick function.");
  });
  // thread pool
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Process encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Process encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Process encrypted");

  //   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Process encrypted");
  //   });
  //   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Process encrypted");
  //   });
  //   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //     console.log(Date.now() - start, "Process encrypted");
  //   });
});

//top level code
console.log("hello world");
