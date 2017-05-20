angular.module('main')
  .controller('MainCtrl', function(SearchSvc) {
    this.name = 'main';

    this.searchHandler = function(data) {
      this.data = data;
    };
    this.more = function(type) {
      SearchSvc.search(SearchSvc.currentTerm, type)
        .then(this.searchHandler.bind(this));
    };
  });