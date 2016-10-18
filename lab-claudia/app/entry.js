'use strict';

// require webpack assets
require('./scss/main.scss');

// npm modules
const cowsay = require('cowsay-browser');
const angular = require('angular');

// app modules

// angular module
const demoApp = angular.module('demoApp', []);

// angular constructus
demoApp.controller('CowsayController', [ '$log', '$scope', CowsayController]);

function CowsayController($log, $scope){
  $log.debug('init CowsayController');
  let cowsayCtrl = $scope.cowsayCtrl = {};
  cowsayCtrl.title = 'Derp!';
  cowsayCtrl.data = [];

  cowsayCtrl.updateCow = function(input){
    $log.debug('cowsayCtrl.updateCow()');
    return '\n' + cowsay.say({text: input || 'give me all the says'});
  };
  cowsayCtrl.helloClick = function(input){
    $log.debug('cowsayCtrl.helloClick()');
    cowsayCtrl.data.push(input);
    cowsayCtrl.populate = cowsayCtrl.updateCow(input);

  };
  cowsayCtrl.resetClick = function(){
    $log.debug('cowsayCtrl.resetClick()');
    cowsayCtrl.populate =cowsayCtrl.updateCow(cowsayCtrl.data.pop());
  };
}
