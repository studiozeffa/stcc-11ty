const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const sass = require('sass');

module.exports = function({ inputDir, outputDir, stylesheetNames }) {
  if (!fs.existsSync(path.dirname(outputDir))) {
    console.log(`Creating new CSS output directory: ${path.dirname(outputDir)}/`);
    fs.mkdirSync(path.dirname(outputDir), { recursive: true });
    console.log('CSS output directory created.');
  }

  // Build CSS on startup.
  compile();

  // Watch for changes to Sass directory.
  chokidar.watch(inputDir).on('change', function(path) {
    console.log(`SCSS file changed: ${path}`);
    compile();
  });

  function compile() {
    // Compile each stylesheet in turn.
    stylesheetNames.forEach((name) => {
      const inputFile = path.join(inputDir, `${name}.scss`);
      const outputFile = path.join(outputDir, `${name}.css`);

      // Render CSS from Sass source path.
      const rendered = sass.renderSync({ file: inputFile });

      // Save CSS to output path.
      fs.writeFileSync(outputFile, rendered.css.toString());

      console.log(`CSS output file saved: ${outputFile} (in ${rendered.stats.duration}ms)`);
    });
  }
}
