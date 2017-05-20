angular.module('search')
  .directive('album', function() {
    return {
      restrict: 'E',
      controller: angular.noop,
      controllerAs: 'Album',
      bindToController: {
        info: '='
      },
      scope: {},
      templateUrl: 'src/album/album.html'
    };
  });
