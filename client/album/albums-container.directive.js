angular.module('search')
  .directive('albums', function() {
    function link(scope, el, attr, ctrl) {
      ctrl.action = function(id) {
        return ctrl.actionFn({ id: id });
      };

      scope.$watch('Albums.displayOnly', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal) {
          ctrl.collapsed = false;
        }
      });
    }
    return {
      bindToController: {
        info: '=',
        actionFn: '&action',
        getMore: '&',
        canLoadMore: '=',
        displayOnly: '=',
        goBack: '&',
        loadStartEvent: '@'
      },
      controller: 'resultsCtrl',
      controllerAs: 'Albums',
      link: link,
      require: 'albums',
      restrict: 'E',
      scope: {},
      templateUrl: 'src/album/albums-container.html'
    };
  });
