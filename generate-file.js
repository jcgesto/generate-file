var fs = require('fs');
var breakpoints = require('./breakpoints.json');

var sassVariables = Object.keys(breakpoints).map(breakpointKey => {
  return `$${breakpointKey}: ${breakpoints[breakpointKey]};`
})

function generateCssVariables(breakpoints) {
  var result = Object.keys(breakpoints).map(breakpointKey => {
    return `\t$${breakpointKey}: ${breakpoints[breakpointKey]};`
  })
  cssVariables.unshift(':root {')
  cssVariables.push('}')
  return cssVariables 
}

var cssVariables = generateCssVariables(breakpoints)
var content = sassVariables.concat([''],cssVariables)

fs.writeFile('output.scss', content.join('\n'), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("File generated succesfully");
});
