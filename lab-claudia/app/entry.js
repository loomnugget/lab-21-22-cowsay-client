'use strict';

// require webpack assets
require('./scss/main.scss');

// npm modules
const cowsay = require('cowsay-browser');
const angular = require('angular');

// app modules

// angular module
// creates an angular module called demoA (has 2 arguments - setter)
const demoApp = angular.module('demoApp', []);
//demoApp is the entry point to the app
//ng-app is demo app- route module is bound to this tag
//angular can only be done inside this tag

// angular constructor - all controllers are constructors
// services can be injected into controller
// services are helper functions - lib directory - supporting code
demoApp.controller('CowsayController', [ '$log', CowsayController]);

function CowsayController($log){
  $log.debug('init cowsayCtrl');
  this.title = 'Derp!';
  this.data = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.currentCow = this.cowfiles[0];
    console.log('this.cowfiles', this.cowfiles);
  });

  this.updateCow = function(input){
    $log.debug('this.updateCow()');
    return '\n' + cowsay.say({text: input || 'give me all the says'});
  };
  this.helloClick = function(input){
    $log.debug('this.helloClick()');
    this.data.push(input);
    this.populate = this.updateCow(input);

  };
  this.resetClick = function(){
    $log.debug('this.resetClick()');
    this.populate = this.updateCow(this.data.pop() || '');
  };
}

//modern form of controller
demoApp.controller('NavController', [ '$log', NavController]);

//navcontroller as controller - same as using the $scope
//navctrl is created on the scope - created in the html
//if there is no 'as + __ctrl', it will expect the scope to be injected and not work
//allows us to use 'this' - less things to inject

function NavController($log){
  $log.debug('init NavCtrl');
  //makes the object thing on its own and everything is added to that scope
  this.routes = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Cow Facts',
      url: '/cowfacts',
    },
    {
      name: 'Contact',
      url: '/contact',
    },
  ];
}
