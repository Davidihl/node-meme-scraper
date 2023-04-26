import * as cheerio from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';
import { parse } from 'path';

// Given URL to access
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// Create directory
const dir = 'memes';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log("Directory 'memes' created");
}

const response = await fetch(url);
const data = await response.text();
const $ = cheerio.load(data);

const parseImg = $('div');
parseImg.each((index, el) => {
  const memes = {};
  memes.img = $(el).find('a > img').attr('src');
  console.log(memes.img);
});
