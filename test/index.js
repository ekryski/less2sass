var less2sass = require('..');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('less2sass', function() {

  describe("whole file", function() {
    var fixture;
    var expected;

    before(function() {
      fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.less')).toString();
      expected = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.scss')).toString();
    });

    it('converts multiple variables in the same line', function() {
      var result = less2sass.convert(fixture);
      assert.equal(result, expected);
    });
  });

  describe("variables", function() {
    it('converts interpolated variables to #{$', function() {
      var result = less2sass.convert('@san-serif-stack: helvetica, arial; @standard-fonts: ~\'@{san-serif-stack}, sans-serif\';');
      assert.equal(result, '$san-serif-stack: helvetica, arial; $standard-fonts: \'#{$san-serif-stack}, sans-serif\';');
    });

    it('converts @ for variables to $', function() {
      var result = less2sass.convert('@var1: #000;');
      assert.equal(result, '$var1: #000;');
    });

    it('converts multiple variables in the same line', function() {
      var result = less2sass.convert('@var1: #000; @var2: #fff;');
      assert.equal(result, '$var1: #000; $var2: #fff;');
    });

    it('still converts variables have the word "media" in them', function() {
      var result = less2sass.convert('@mediaType: screen;');
      assert.equal(result, '$mediaType: screen;');
    });

    it('still converts variables have the word "import" in them', function() {
      var result = less2sass.convert('@importType: screen;');
      assert.equal(result, '$importType: screen;');
    });

    it('still converts variables have the word "import" in them', function() {
      var result = less2sass.convert('@mixinType: screen;');
      assert.equal(result, '$mixinType: screen;');
    });

    it('does not convert @ to $ for media queries', function() {
      var result = less2sass.convert('@media(min-width:768px) {}');
      assert.equal(result, '@media(min-width:768px) {}');
    });

    it('does not convert @ to $ for @mixin statements', function() {
      var result = less2sass.convert('@mixin screen() {}');
      assert.equal(result, '@mixin screen() {}');
    });

    it('does not convert @ to $ for @import statements', function() {
      var result = less2sass.convert('@import "common"');
      assert.equal(result, '@import "common"');
    });

    it('does not convert @ to $ for @font-face statements', function() {
      var result = less2sass.convert('@font-face {}');
      assert.equal(result, '@font-face {}');
    });
  });

  describe("~ strings", function() {
    it('converts ~\'\' to \'\'', function() {
      var result = less2sass.convert('~\'san-serif\'');
      assert.equal(result, '\'san-serif\'');
    });

    it('converts ~"" to ""', function() {
      var result = less2sass.convert('~"san-serif"');
      assert.equal(result, '"san-serif"');
    });
  });

  describe("colour helpers", function() {
    it('converts spin function to adjust-hue', function() {
      var result = less2sass.convert('spin(#aaaaaa, 10)');
      assert.equal(result, 'adjust-hue(#aaaaaa, 10)');
    });
  });

  describe("mixins", function() {
    it('converts mixin declarations to use the @mixins syntax', function() {
      var result = less2sass.convert('.drop-shadow (@x-axis: 0, @y-axis: 1px, @blur: 2px, @alpha: 0.1) {}');
      assert.equal(result, '@mixin drop-shadow($x-axis: 0, $y-axis: 1px, $blur: 2px, $alpha: 0.1) {}');
    });

    it('converts mixin call without argments to use the @include syntax', function() {
      var result = less2sass.convert('.box-sizing();');
      assert.equal(result, '@include box-sizing();');
    });

    it('converts mixin call in shorthand form to use the @include syntax', function() {
      var result = less2sass.convert('.box-sizing;');
      assert.equal(result, '@include box-sizing;');
    });

    it('converts mixin call with arguments to use the @include syntax', function() {
      var result = less2sass.convert('.drop-shadow(0, 2px, 4px, 0.4);');
      assert.equal(result, '@include drop-shadow(0, 2px, 4px, 0.4);');
    });

    it('does not convert .foo .bar', function() {
      var result = less2sass.convert('.foo .bar {}');
      assert.equal(result, '.foo .bar {}');
    });
  });

  describe("control flow", function() {
    it.skip('strips out { and }', function() {
      // TODO
      assert.equal(false, true);
    });

    it.skip('strips out ;', function() {
      // TODO
      assert.equal(false, true);
    });
  });

});
