angular.module('search')
  .directive('tracks', function() {
    function link(scope, el, attr, ctrl) {
      ctrl.type = 'track';
      ctrl.addToPlaylist = function(track) {
        var playlistData = {
          track: track.name,
          trackId: track.id,
          artist: track.artists.reduce(function(artistArr, artist) {
            artistArr.push(artist.name);
            return artistArr;
          }, []).join(', '),
          album: track.album.name,
          note: ctrl.note,
          customImage: ctrl.image
        };
        ctrl.actionFn({ playlistData: playlistData });
        ctrl.reset();
      };

      ctrl.showNoteForm = function(id) {
        ctrl.selectedId = id;
        ctrl.showNote = true;
      };

      ctrl.reset = function() {
        ctrl.selectedId = '';
        ctrl.showNote = false;
        ctrl.note = '';
        ctrl.image = '';
      };
    }
    return {
      bindToController: {
        info: '=',
        actionFn: '&action',
        canAddToPlaylist: '&',
        getMore: '&',
        canLoadMore: '=',
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
