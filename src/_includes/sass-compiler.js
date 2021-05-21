const fs = require('fs');
const path = require('path');
const sass = require('sass');

module.exports = function({ inputDir, outputDir, stylesheetNames }) {
  if (!fs.existsSync(path.resolve(outputDir))) {
    console.log(`Creating new CSS output directory: ${path.resolve(outputDir)}/`);
    fs.mkdirSync(path.resolve(outputDir), { recursive: true });
    console.log('CSS output directory created.');
  }

  // Build CSS on startup.
  compile();

  return compile;

  function compile() {
    // Compile each stylesheet in turn.
    stylesheetNames.forEach((name) => {
      const inputRelativePath = `${inputDir}${path.sep}${name}.scss`;
      const inputFile = path.join(inputRelativePath);
      const outputFile = path.join(outputDir, `${name}.css`);

      // Render CSS from Sass source path.
      const rendered = sass.renderSync({ file: inputFile });

      // Save CSS to output path.
      fs.writeFileSync(outputFile, rendered.css.toString());

      console.log(`Writing ${outputFile} from ${inputRelativePath} (in ${rendered.stats.duration}ms)`);
    });
  }
}
