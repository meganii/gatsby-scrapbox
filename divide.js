const fs = require('fs');
const filepath = 'src/data/mediamarker-icossa.json';
const json = JSON.parse(fs.readFileSync(filepath, 'utf8'));
const pages = json.pages;

// console.log(pages);

pages.map((page, index) => {
  let tags = new Set();
  let links = new Set();

  page.lines.map((line) => {
    const m_tags = line.match(/#([^\s$]*)/g);
    if (m_tags) {
      m_tags.map( value => tags.add(value.replace('#', '')) );
    }

    const m_links = line.match(/\[(.+?)\]/g);
    if (m_links) {
      m_links.filter(v => !v.startsWith('[http')).map(value => {
        links.add(value.replace(/[\[\]]/g,''))
      });
    }
  });

  let json = {
    title: page.title,
    created: page.created,
    updated: page.updated,
    lines: page.lines,
    tags: Array.from(tags),
    links: Array.from(links),
  }
  fs.writeFile(`src/data/pages/${index}.json`, JSON.stringify(json, 'utf-8', 4), (err) => {console.error(err)});
});

