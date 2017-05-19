angular.module('searchbar')
  .directive('songSearchbar', function () {
    function controller(SearchSvc) {
      var ctrl = this;
      this.search = function(terms) {
        return SearchSvc.search(terms, 0)
          .then(function(data) {
            return ctrl.onSearch({data: data});
          });
      };
    
    }
    return {
      controller: controller,
      restrict: 'E',
      scope: {},
      bindToController: {
        onSearch: '&'
      },
      controllerAs: 'Search',
      templateUrl: 'src/searchbar/searchbar.html'
    };
  });