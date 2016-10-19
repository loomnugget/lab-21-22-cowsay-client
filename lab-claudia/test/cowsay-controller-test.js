'use strict';

require('./lib/setup.js');

const cowsay = require('cowsay-browser');
const angular = require('angular');

// expect is built into jasmine
// only has beforeeach and aftereach, no before, after, or done
describe('testing cowsayCtrl', function() {
  beforeEach(() => {
    //mock module the controller is associated with
    angular.mock.module('demoApp');
    //creates a new controller, each time a test is run
    //scope is reinitialized every time a test is run - they have the same state
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });
  describe('testing initial properties', () => {
    it('title should equal derp cows', () => {
      expect(this.cowsayCtrl.title).toBe('Derp cows');
    });
    it('data should be empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.data)).toBe(true);
    });
    it('cowfiles should be the same as cowsay.list', () => {
      cowsay.list((err,list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.currentCow).toEqual(list[0]);
      });
    });
  });

  describe('testing #updateCow', () => {
    it('should return a bevis.zen hello', () => {
      let expected = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      let result = this.cowsayCtrl.updateCow('hello');
      expect(result).toEqual(expected);
    });
  });

  describe('testing #helloClick()', () => {
    it('should return a bevis.zen hello', () => {
      let expected = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.helloClick('hello');
      expect(this.cowsayCtrl.populate).toEqual(expected);
    //  expect(this.cowsayCtrl.data[0]).toEqual(expected);
    });
  });

  describe('testing #resetClick()', () => {
    it('should return a bevis.zen hello', () => {
      let expected = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.helloClick('hello'); //undo back to
      this.cowsayCtrl.helloClick('goodbye'); //undo from
      this.cowsayCtrl.resetClick();
      expect(this.cowsayCtrl.populate).toEqual(expected);
      expect(this.cowsayCtrl.data.length).toEqual(0);
    });
  });

});
