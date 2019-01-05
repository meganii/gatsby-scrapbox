const fs = require('fs');
const filepath = 'src/data/mediamarker-icossa.json';
const json = JSON.parse(fs.readFileSync(filepath, 'utf8'));
const pages = json.pages;

console.log(pages);

pages.map((page, index) => {

  fs.writeFile(`src/data/pages/${index}.json`, JSON.stringify(page), (err) => {console.error(err)});
});

