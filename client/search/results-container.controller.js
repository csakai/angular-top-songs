angular.module('search')
  .controller('resultsCtrl', function(SearchSvc) {
    this.more = function() {
      var ctrl = this;
      this.getMore();
    };
    this.collapsed = false;
    this.toggleCollapsed = function() {
      this.collapsed = !this.collapsed;
    };
  });