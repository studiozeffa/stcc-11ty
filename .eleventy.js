const makeSassCompiler = require('./src/_includes/sass-compiler');

module.exports = function (config) {
  config.addPassthroughCopy({ 'src/_includes/assets': 'assets' });
  config.addPassthroughCopy({ 'src/_includes/images': 'images' });

  // Run only when 11ty is in watch mode.
  if (process.argv.includes('--watch')) {
    const sassCompile = makeSassCompiler({
      inputDir: './src/_includes/scss',
      outputDir:  './public/assets/css',
      stylesheetNames: ['main']
    })

    config.on('beforeWatch', (changedFiles) => {
      // changedFiles is an array of files that changed
      // to trigger the watch/serve build
      if(sassChanged(changedFiles)) {
        sassCompile();
      }
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

function sassChanged(changedFiles) {
  for (const changed of changedFiles) {
    if(changed.endsWith('.scss')) {
      return true;
    }
  }
  return false;
}
