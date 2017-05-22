angular.module('search')
  .service('SearchSvc', function($q, Spotify, SpotifyData) {
    var service = this;
    var DEFAULT_TYPES = 'artist,album,track';
    this.DEFAULT_TYPES = DEFAULT_TYPES;
    this.cacheId = 'search';

    this.currentTerm = '';

    function getResults(terms, type, offset) {
      type = type || DEFAULT_TYPES;
      var options = {
        limit: SpotifyData.LIMIT,
        offset: offset || 0
      };
      return Spotify.search(terms, type, options)
        .then(function(response) {
          return SpotifyData.updateCached(service.cacheId, response.data);
        });
    };
    this.search = function(terms, type) {
      var promise;
      if (this.currentTerm === terms) {
        if (type) {
          var offset = SpotifyData.getNextOffset(this.cacheId, type);
          promise = getResults(terms, type, offset);
        } else {
          promise = $q.resolve(SpotifyData.cache.get(this.cacheId));
        }
      } else {
        this.currentTerm = terms;
        SpotifyData.clearCached(this.cacheId);
        promise = getResults(terms);
      }
      return promise;
    };
  });