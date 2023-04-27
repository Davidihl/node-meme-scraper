import * as cheerio from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';
import { parse } from 'path';

// Define URL to access
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// Define directory name
const dir = 'memes';

// Prepare Memeobject & Array
const memeUrl = {};
let memes = [];

// Create Directory if it does not exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log('Directory ' + dir + ' created');
} else {
  console.log('Using existing directory');
}

// Fetch Website html and extract images
const response = await fetch(url);
const data = await response.text();
const $ = cheerio.load(data);

const parseImg = $('div');
parseImg.each((index, el) => {
  memes.push((memeUrl.img = $(el).find('a > img').attr('src')));
});

// Clean up and reduce array with images
memes = memes.slice(3);
memes.length = 10;

const imagePath = memes.map((element) => element.replace('?width=300', ''));

// Create a jpg based of each element within the image array
for (let i = 0; i < imagePath.length; i++) {
  // Consider a leading 0 for the filename until we reach 10
  let filename = (i + 1).toString() + '.jpg';
  if (i < 9) {
    filename = 0 + filename;
  }

  fetch(imagePath[i]).then((res) =>
    res.body.pipe(fs.createWriteStream(`./memes/${filename}`)),
  );
}

console.log('Images scraped!');
