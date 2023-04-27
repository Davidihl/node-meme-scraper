import * as cheerio from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';
import { parse } from 'path';

// Given URL to access
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const response = await fetch(url);
const data = await response.text();

/* Play here */

const children = JSON.stringify(data);
const test = children.substring(1, children.length - 1);

const array = test.split(' ');

const filtered = array.filter((element) => element.startsWith('src='));

const memes = filtered.slice(1);
memes.length = 10;
const memesURL = memes.map((element) => element.slice(6));

console.log(memesURL);

/*
src=\\"
?width=300\\"\\n
*/
