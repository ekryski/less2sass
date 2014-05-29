var less2sass = require('..');
var assert = require('assert');

describe('less2sass', function() {

  describe("variables", function() {
    it('converts @ for variables to $', function(done) {
      // TODO
    });

    it('does not convert @ to $ for media queries', function(done) {
      // TODO
    });

    it('does not convert @ to $ for @import statements', function(done) {
      // TODO
    });
  });

  describe("mixins", function() {
    it('converts mixin declarations to use the @mixins syntax', function(done) {
      // TODO
    });

    it('converts mixin calls to use the @include syntax', function(done) {
      // TODO
    });
  });

  describe("control flow", function() {
    it('strips out { and }', function(done) {
      // TODO
    });

    it('strips out ;', function(done) {
      // TODO
    });
  });

});