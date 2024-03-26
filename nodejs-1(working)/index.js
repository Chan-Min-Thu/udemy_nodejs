const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replacementCard = require('./modules/replacementCard')


const hello= "hello world";
////////////////////////////////Files//////////////////
// // Blocking (sync)//////////
// const textIn = fs.readFileSync("./txt/text.txt",'utf-8')
// // console.log(textIn)

// fs.writeFileSync("./txt/start.txt",textIn)
// fs.appendFileSync("./txt/start.txt",`\n;created on ${Date.now()}`)

// Non-blockig (async)///////////

// fs.readFile("./txt/text.txt",'utf-8',(err,data)=>{
//     console.log(data)
// })

// fs.writeFile("./txt/red.txt",hello,(err,data)=>{
//     console.log(err)
// })

// fs.readFile("./txt/red.txt",'utf-8',(err,data1)=>{
//     if(err)return console.log("Error occurs.")
//     fs.writeFile(`./txt/${data1}.txt`,hello,'utf-8',(err,data2)=>{
//         console.log("data has successfully written.")
//         fs.readFile("./txt/start.txt",'utf-8',(err,data3)=>{
//             console.log("from start.txt :",data3 )
//         })
//     })
// })

// console.log("This code is allowed to run while async function is working.")

///////////////////////////////SERVER /////////////////////////////////
// modules created (part-17)
// const replacementCard =(template,product)=>{
//     let output = template.replace(/{%IMAGE%}/g,product.image);
//     output=output.replace(/{%FROM%}/g,product.from);
//     output=output.replace(/{%PRODUCTNAME%}/g,product.productName);
//     output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
//     output=output.replace(/{%QUANTITY%}/g,product.quantity);
//     output=output.replace(/{%PRICE%}/g,product.price);
//     output=output.replace(/{%DESCRIPTION%}/g,product.description);
//     output =output.replace(/{%ID%}/g,product.id)

//     if(!product.organic){ output = output.replace(/{%NOT_ORGANIC%}/g,"not-organic")}
//     return output;
// } 
     

const template_product = fs.readFileSync(`${__dirname}/templates/product.html`,"utf-8")
const template_card =fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8")
const  template_overview =fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8")

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")
const dataForm = JSON.parse(data);
const server = http.createServer((req,res)=>{
   
    const {query,pathname} = url.parse(req.url,true)
    const slugs = dataForm.map(ele => slugify(ele.productName,{lower:true}))
    console.log(slugs)
    ///OVERVIEW
    if(pathname ==="/" || pathname==="/overview"){
        const product = dataForm.map((ele)=> replacementCard(template_card,ele)).join("");
        const output = template_overview.replace(/ {%PRODUCT_CARDS%}/g,product)
        res.end(output)
    }
    ////PRODUCT
    else if (pathname=== "/product"){
        // res.writeHead(200,{'Content-type':"text/html"})
        console.log(query)
        // const id = query.id;
        const selectedProduct = dataForm[query.id];
        const output = replacementCard(template_product,selectedProduct)
        res.end(output)
    }
    ///API
    else if (pathname ==="/api" ){
        res.writeHead(200,{
            "Content-type":"application/json",
            
        })
        res.end(data)
    }
    ///404
    else{
        res.writeHead(404,{
            "Content-type":"text/html",
            "my-own-header":"hello-world"
            
        })
        res.end(`<h1>Page is not found.</h1>`)
    }
    // res.end("Hello All Guys From my Server!")
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("My Server is started...")
})
