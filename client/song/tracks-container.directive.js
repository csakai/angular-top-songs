angular.module('search')
  .directive('tracks', function() {
    function link(scope, el, attr, ctrl) {
      scope.$watch('Tracks.displayOnly', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal) {
            ctrl.collapsed = false;
          } else {
            ctrl.reset();
          }
        }
      });
      ctrl.addToPlaylist = function(track) {
        var playlistData = {
          track: track.name,
          trackId: track.id,
          artist: track.artists.reduce(function(artistArr, artist) {
            artistArr.push(artist.name);
            return artistArr;
          }, []).join(', '),
          album: ctrl.albumName || track.album.name,
          note: ctrl.note,
          customImage: ctrl.customImage
        };
        ctrl.actionFn({ playlistData: playlistData });
        ctrl.reset();
      };

      ctrl.showNoteForm = function(id) {
        ctrl.selectedId = id;
        ctrl.showNote = true;
        ctrl.customImage = ctrl.image;
      };

      ctrl.reset = function() {
        ctrl.selectedId = '';
        ctrl.showNote = false;
        ctrl.note = '';
        ctrl.customImage = '';
      };
    }
    return {
      bindToController: {
        info: '=',
        albumName: '=?',
        image: '=?',
        actionFn: '&action',
        canAddToPlaylist: '&',
        getMore: '&',
        canLoadMore: '=',
        displayOnly: '=',
        goBack: '&',
        loadStartEvent: '@'
      },
      controller: 'resultsCtrl',
      controllerAs: 'Tracks',
      link: link,
      require: 'tracks',
      restrict: 'E',
      scope: {},
      templateUrl: 'src/song/tracks-container.html'
    };
  });
