angular.module('playlist')
  .directive('playlist', function() {
    function controller() {
      this.removeSong = function(index) {
        this.songs.splice(index, 1);
      };

      this.exportToJson = function() {
        if (this.info.$invalid) {
          return;
        } else if (this.limit !== this.songs.length) {
          return;
        }
        var exported = {
          title: this.name,
          songs: this.songs
        };
        this.displayJson({playlist: exported });
      };
    }
    return {
      restrict: 'E',
      controller: controller,
      controllerAs: 'Playlist',
      bindToController: {
        songs: '=',
        displayJson: '&',
        limit: '='
      },
      templateUrl: 'src/playlist/playlist.html'
    };
  });