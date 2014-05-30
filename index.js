// http://stackoverflow.com/questions/14970224/anyone-know-of-a-good-way-to-convert-from-less-to-sass

function Less2Sass(){

}

Less2Sass.prototype.convert = function(file) {

  this.file = file;

  this.convertVariables()
      .convertMixins()
      .includeMixins()
      .convertColourHelpers();

  return this.file;
};

Less2Sass.prototype.includeMixins = function() {
  var includeRegex = /\.([\w\-]*\(?.*\)?\s*;)/g;

  this.file = this.file.replace(includeRegex, '@include $1');

  return this;
};

Less2Sass.prototype.convertMixins = function() {
  var mixinRegex = /\.([\w\-]*)\s*\((.*)\)\s*\{/g;

  this.file = this.file.replace(mixinRegex, '@mixin $1($2) {');
  
  return this;
};

Less2Sass.prototype.convertColourHelpers = function() {
  var helperRegex = /spin\(/g;

  this.file = this.file.replace(helperRegex, 'adjust-hue(');

  // TODO (EK): Flag other colour helpers for manual conversion that SASS does not have

  return this;
};

Less2Sass.prototype.convertVariables = function() {
  // Matches any @ that doesn't have 'media ' or 'import ' after it.
  var atRegex = /@(?!(media|import|mixin)\s)/g;

  this.file = this.file.replace(atRegex, '$');

  return this;
};

module.exports = new Less2Sass();