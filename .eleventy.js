const sassWatch = require('./src/_includes/watch-sass');

module.exports = function (config) {
  config.addPassthroughCopy({ 'src/_includes/assets': 'assets' });
  config.addPassthroughCopy({ 'src/_includes/images': 'images' });

  // Run only when 11ty is in watch mode.
  if (process.argv.includes('--watch')) {
    // Watch Sass directory for updates.
   sassWatch({
     inputDir: './src/_includes/scss',
     outputDir:  './public/assets/css',
     stylesheetNames: ['main']
   });
 }

  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_includes',
      layouts: '_layouts'
    }
  }
}
