const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

//building Promise-lesson
const readFilePro = (file) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(file, (err, data) => {
      if (err) rejects('I could not find this file.');
      resolve(data);
    });
  });
};
//building Promise-lesson
const writeFilePro = (file, data) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(file, data, (err) => {
      if (err) rejects('I could not write this');
      resolve('success');
    });
  });
};
// async await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`, 'utf-8');
    console.log(`Breed:${data}`);
    const url1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const url2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const url3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([url1, url2, url3]);
    const url = all.map((ele) => ele.body.message);
    console.log(url);

    await writeFilePro('new_text.txt', url.join('\n'));
    console.log('Random code are successflly written...');
    return 'hello';
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  try {
    console.log('1. will get Data');
    const x = await getDogPic();
    console.log(x);
    console.log('2.get url');
  } catch (err) {
    console.log(err);
  }
})();

// const x = getDogPic()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   });
// console.log(x);

/*
//.then/catch
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('new_text.txt', res.body.message);
    // writeFilePro(`${__dirname}/new_text.txt`, res.body.message, (err) => {
    //   if (err) console.log(err);
    //   console.log('Random write in new_text.txt');
    // });
  })
  .then(() => console.log('Random code write in new_text.txt'))
  .catch((err) => {
    console.log(err.message);
  });


*/

//from callbacks hell to promise
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed :${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//    .then((res) => {
//       console.log('body:', res.body.message);
//       fs.writeFile('dog.txt', res.body.message, (err) => {
//         console.log('Already written to link in dog.txt');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
