angular.module('search')
  .controller('resultsCtrl', function($scope, SearchSvc) {
    this.more = function() {
      var ctrl = this;
      $scope.$emit(this.loadStartEvent, this.type);
      this.getMore()
        .then(function() {
          $scope.$emit(ctrl.loadEndEvent);
        });
    };
    this.collapsed = false;
    this.toggleCollapsed = function() {
      this.colapsed = !this.collapsed;
    };
  });