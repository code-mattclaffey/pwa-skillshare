const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
var atImport = require("postcss-import")
// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = 'styles.css';

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, `../_includes/css/${fileName}`);

    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      postcssEnv({ autoprefixer: { grid: true } }),
      atImport(),
      cssnano(),
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
