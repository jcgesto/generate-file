const fs = require('fs');
const breakpoints = require('./breakpoints.json');

function generateSassVariables(breakpoints) {
  return Object.keys(breakpoints).map(breakpointKey => {
    return `$${breakpointKey}: ${breakpoints[breakpointKey]};`
  });
}

function generateCssVariables(breakpoints) {
  var result = Object.keys(breakpoints).map(breakpointKey => {
    return `\t$${breakpointKey}: ${breakpoints[breakpointKey]};`
  });
  result.unshift(':root {');
  result.push('}');
  return result; 
}

const sassVariables = generateSassVariables(breakpoints);
const cssVariables = generateCssVariables(breakpoints);
const content = sassVariables.concat([''],cssVariables);

fs.writeFile('output.scss', content.join('\n'), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("File generated succesfully");
});

const writeStream = fs.createWriteStream('streamed-output.scss')
writeStream.on('error', (err) => {
  console.log(err);
});
writeStream.on('finish', (err) => {
  console.log('Streamed file generated succesfully');
});
content.forEach(line => {
  writeStream.write(`${line}\n`);
});
writeStream.end();
