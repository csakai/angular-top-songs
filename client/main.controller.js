angular.module('main')
  .controller('MainCtrl', function() {
    this.name = 'main';
    
    this.searchHandler = function(data) {
      this.data = data;
    };
  });