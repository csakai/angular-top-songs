angular.module('search')
  .directive('result', function() {
    function link(scope, el, attr, ctrl) {
      if (_.isUndefined(ctrl.canDoAction)) {
        ctrl.canDoAction = true;
      }
    }
    return {
      bindToController: {
        info: '=',
        action: '&',
        hideButton: '=?',
        canDoAction: '=?',
        ctaText: '@'
      },
      controller: angular.noop,
      controllerAs: 'Result',
      link: link,
      require: 'result',
      restrict: 'E',
      transclude: {
        'content': '?extraContent',
        'note': '?note'
      },
      templateUrl: 'src/search/result.html'
    };
  })