angular.module('searchbar')
  .directive('songSearchbar', function () {
    function controller($scope, SearchSvc) {
      var ctrl = this;
      this.search = function(terms) {
        $scope.$emit('loading:start', SearchSvc.DEFAULT_TYPES);
        return SearchSvc.search(terms, 0)
          .then(function(data) {
            ctrl.setMode();
            return ctrl.onSearch({data: data});
          });
      };

    }
    return {
      controller: controller,
      restrict: 'E',
      scope: {},
      bindToController: {
        canSearch: '=',
        setMode: '&',
        loadStartEvent: '@',
        onSearch: '&'
      },
      controllerAs: 'Search',
      templateUrl: 'src/searchbar/searchbar.html'
    };
  });