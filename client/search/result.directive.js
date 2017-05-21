angular.module('search')
  .directive('result', function() {
    return {
      bindToController: {
        info: '=',
        action: '&',
        ctaText: '@'
      },
      controller: angular.noop,
      controllerAs: 'Result',
      restrict: 'E',
      transclude: {
        'content': '?extraContent',
        'note': '?note'
      },
      templateUrl: 'src/search/result.html'
    };
  })