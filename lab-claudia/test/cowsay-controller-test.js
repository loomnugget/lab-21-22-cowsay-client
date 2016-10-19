'use strict';

require('./lib/setup.js');

const cowsay = require('cowsay-browser');
const angular = require('angular');

// TESTING COWSAY CONTROLLER
describe('testing cowsayCtrl', function() {
  beforeEach(() => {
    //mock module the controller is associated with
    angular.mock.module('demoApp');
    //creates a new controller, each time a test is run
    //need to inject the controller since it is not available on the global scope
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

// TESTING NAV CONTROLLER
describe('testing NavCtrl', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject($controller => {
      this.navCtrl = new $controller('NavController');
    });
  });

  describe('testing initial properties', () => {
    it('should return an array', () => {
      expect(Array.isArray(this.navCtrl.routes)).toBe(true);
    });
    it('should return an correct name', () => {
      expect(this.navCtrl.routes[0].name).toEqual('Home');
    });
    it('should return a correct url', () => {
      expect(this.navCtrl.routes[0].url).toEqual('/home');
    });
    it('should return an correct name', () => {
      expect(this.navCtrl.routes[1].name).toEqual('About');
    });
    it('should return a correct url', () => {
      expect(this.navCtrl.routes[1].url).toEqual('/about');
    });
    it('should return an correct name', () => {
      expect(this.navCtrl.routes[2].name).toEqual('Cow Facts');
    });
    it('should return a correct url', () => {
      expect(this.navCtrl.routes[2].url).toEqual('/cowfacts');
    });
    it('should return an correct name', () => {
      expect(this.navCtrl.routes[3].name).toEqual('Contact');
    });
    it('should return a correct url', () => {
      expect(this.navCtrl.routes[3].url).toEqual('/contact');
    });
  });
  describe('testing #selectedItem()', () => {
    it('should return active', () => {
      this.navCtrl.selectedItem('active'); //undo from
      expect(this.navCtrl.active).toEqual('active');
    });
  });
});
