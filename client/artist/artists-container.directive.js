angular.module('search')
  .directive('artists', function() {
    function link(scope, el, attr, ctrl) {
      ctrl.type = 'artist';
    }
    return {
      bindToController: {
        info: '=',
        action: '&',
        getMore: '&',
        loadStartEvent: '@',
        loadEndEvent: '@'
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