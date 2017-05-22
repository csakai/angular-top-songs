angular.module('search')
  .service('TrackSvc', function($q, Spotify, SpotifyData) {
    var service = this;
    this.cacheId = 'tracks';

    this.currentAlbumId = '';

    function getTracks(id, offset) {
      var options = {
        limit: SpotifyData.LIMIT,
        offset: offset || 0
      };
      return Spotify.getAlbumTracks(id, options)
        .then(function(response) {
          return SpotifyData.updateCached(service.cacheId, response.data);
        });
    }

    this.getTracksByAlbum = function(id, isMore) {
      var promise;
      if (this.currentAlbumId === id) {
        if (isMore) {
          var offset = SpotifyData.getNextOffset(this.cacheId);
          promise = getTracks(id, offset);
        } else {
          promise = $q.resolve(SpotifyData.cache.get(this.cacheId));
        }
      } else {
        this.currentAlbumId = id;
        SpotifyData.clearCached(this.cacheId);
        promise = getTracks(id);
      }
      return promise
        .then(function(tracks) {
          return { tracks: tracks };
        });
    };
  });