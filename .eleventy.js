module.exports = function (config) {
  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // pass some assets right through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/css');
  config.addPassthroughCopy('./src/scripts');
  config.addPassthroughCopy('./src/manifest.json');

  // make the seed target act like prod
  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: `_data/`,
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
