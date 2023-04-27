import fs from 'node:fs';
import * as cheerio from 'cheerio';
import cliProgress from 'cli-progress';
import fetch from 'node-fetch';

// Define URL to access
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// Define directory name
const dir = 'memes';

// Prepare Userinput
const memeText = process.argv[2];
const memeType = process.argv[3];

// Prepare required Objects & Arrays
const memeUrl = {};
let memes = [];

// Create Directory if it does not exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log('Directory ' + dir + ' created');
} else {
  console.log('Using existing directory');
}

// Decide if scrape images or create meme
if (memeText && memeType) {
  console.log('Create personal meme');
} else {
  // Fetch Website html and extract images
  const response = await fetch(url);
  const data = await response.text();
  const $ = cheerio.load(data);
  const imageProgress = new cliProgress.SingleBar(
    {
      format: 'progress {bar} {percentage}% | ETA: {eta}s',
    },
    cliProgress.Presets.shades_classic,
  );

  const parseImg = $('div');
  parseImg.each((index, el) => {
    memes.push((memeUrl.img = $(el).find('a > img').attr('src')));
  });

  // Clean up and reduce array with images
  memes = memes.slice(3);
  memes.length = 10;

  const imagePath = memes.map((element) => element.replace('?width=300', ''));

  // Start Progressbar
  imageProgress.start(100, 0);

  // Create a jpg based of each element within the image array
  for (let i = 0; i < imagePath.length; i++) {
    // Consider a leading 0 for the filename until we reach 10
    let filename = (i + 1).toString() + '.jpg';
    if (i < 9) {
      filename = 0 + filename;
    }

    await fetch(imagePath[i]).then(
      (res) => res.body.pipe(fs.createWriteStream(`./memes/${filename}`)),
      imageProgress.update(i * 10),
    );
  }
  imageProgress.update(100);
  imageProgress.stop();
  console.log('Images scraped!');
}
