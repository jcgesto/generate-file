var fs = require('fs');
var breakpoints = require('./breakpoints.json');

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

var sassVariables = generateSassVariables(breakpoints)
var cssVariables = generateCssVariables(breakpoints)
var content = sassVariables.concat([''],cssVariables)

fs.writeFile('output.scss', content.join('\n'), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("File generated succesfully");
});
