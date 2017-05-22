angular.module('search')
  .directive('artists', function() {
    function link(scope, el, attr, ctrl) {
      ctrl.type = 'artist';
      ctrl.action = function(id) {
        return ctrl.actionFn({ id: id });
      };
    }
    return {
      bindToController: {
        info: '=',
        actionFn: '&action',
        getMore: '&',
        canLoadMore: '=',
        loadStartEvent: '@'
      },
      controller: 'resultsCtrl',
      controllerAs: 'Artists',
      link: link,
      require: 'artists',
      restrict: 'E',
      scope: {},
      templateUrl: 'src/artist/artists-container.html'
    };
  });