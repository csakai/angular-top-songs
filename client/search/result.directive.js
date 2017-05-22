angular.module('search')
  .directive('result', function() {
    function link(scope, el, attr, ctrl) {
      if (_.isUndefined(ctrl.canDoAction)) {
        ctrl.canDoAction = true;
      }
      if (_.isUndefined(ctrl.ctaType)) {
        ctrl.ctaType = 'success';
      }
    }
    return {
      bindToController: {
        info: '=',
        image: '=?',
        action: '&',
        hideButton: '=?',
        canDoAction: '=?',
        ctaType: '@?',
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