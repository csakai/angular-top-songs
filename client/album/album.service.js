angular.module('search')
  .service('AlbumSvc', function($q, Spotify, SpotifyData) {
    var service = this;
    this.cacheId = 'albums';

    this.currentArtistId = '';

    function getAlbums(id, offset) {
      var options = {
        limit: SpotifyData.LIMIT,
        offset: offset || 0
      };
      return Spotify.getArtistAlbums(id, options)
        .then(function(response) {
          return SpotifyData.updateCached(service.cacheId, response.data);
        });
    }

    this.getAlbumsByArtist = function(id, isMore) {
      var promise;
      if (this.currentArtistId === id) {
        if (isMore) {
          var offset = SpotifyData.getNextOffset(this.cacheId);
          promise = getAlbums(id, offset);
        } else {
          promise = $q.resolve(SpotifyData.cache.get(this.cacheId));
        }
      } else {
        this.currentArtistId = id;
        SpotifyData.clearCached(this.cacheId);
        promise = getAlbums(id);
      }
      return promise
        .then(function(albums) {
          return { albums: albums };
        });
    };
  });