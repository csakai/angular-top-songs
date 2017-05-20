angular.module('search')
  .directive('song', function() {
    return {
      restrict: 'E',
      controller: angular.noop,
      controllerAs: 'Song',
      bindToController: {
        info: '='
      },
      scope: {},
      templateUrl: 'src/song/song.html'
    };
  });
