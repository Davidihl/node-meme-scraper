import https from 'node:https';
import fs from 'fs';

// Given URL to access
const url = 'https://memegen-link-examples-upleveled.netlify.app/';
console.log(url);

// Create directory
const dir = 'memes';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log("Directory 'memes' created");
}

// Access URL
https.get(url, (result) => {
  console.log('Accessing website ... ');
  let htmlOutput = '';

  result.on('data', (websiteResponse) => {
    console.log('writing');
    htmlOutput += websiteResponse;
  });

  result.on('end', () => {
    console.log('finished');
    //console.log(htmlOutput);
  });
});
