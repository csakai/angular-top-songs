angular.module('search')
  .directive('artist', function() {
    return {
      restrict: 'E',
      controller: angular.noop,
      controllerAs: 'Artist',
      bindToController: {
        info: '='
      },
      scope: {},
      templateUrl: 'src/artist/artist.html'
    };
  });