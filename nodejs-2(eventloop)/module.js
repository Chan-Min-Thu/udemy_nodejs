// const fs = require("fs");

// console.log(arguments);
// console.log(require("module").wrapper);
const C = require("./test-module-1.js");
const calc1 = new C();
// console.log(calc1.add(4, 2));

const { add, multiple, divided } = require("./test_module_2.js");
console.log(add(12, 6));

require("./test_module_3.js")();
