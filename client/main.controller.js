angular.module('main')
  .controller('MainCtrl', function($scope, SearchSvc) {
    var ctrl = this;
    this.name = 'main';
    this.hasResults = {
      artists: false,
      albums: false,
      tracks: false
    };
    this.loading = {
      artists: false,
      albums: false,
      tracks: false
    };
    this.collapsed = {
      artists: false,
      albums: false
    };
    this.toggleCollapsed = function(type) {
      this.collapsed[type] = !this.collapsed[type];
    };
    var setLoadingToTrue = function(types) {
      types.split(',').forEach(function(type) {
        ctrl.loading[type+'s'] = true;
      });
    };
    var setLoadingToFalse = function() {
      _.forEach(ctrl.loading, function(val, key) {
        ctrl.loading[key] = false;
      });
    };
    $scope.$on('loading:start', function($event, types) {
      setLoadingToTrue(types);
    });
    $scope.$on('loading:end', function($event, types) {
      setLoadingToFalse();
    });

    this.isNotWaiting = function() {
      return !_.some(this.loading);
    };

    this.searchHandler = function(data) {
      this.data = data;
      setLoadingToFalse();
      _.forEach(data, function(results, key) {
        ctrl.hasResults[key] = !_.isEmpty(results.items);
      });
    };

    this.more = function(type) {
      SearchSvc.search(SearchSvc.currentTerm, type)
        .then(this.searchHandler.bind(this));
    };
  });