angular.module('searchbar')
  .service('SearchSvc', function(Spotify) {
      var DEFAULT_TYPES = 'artist,album,track';
      var LIMIT = 10;
      this.search = function(terms, offset, types) {
          // types is an optional param - sometimes when doing a multi-type search,
          // the spotify API will have no more results after the returned result
          // for one type of searchtype, but the other search types will have more results
          offset = offset || 0;
          // offset is our search offset, and by default,
          //we are going to limit results to 10 per type
          var typeParam;
          if (types) {
              typeParam = types.join(',');
          } else {
              typeParam = DEFAULT_TYPES;
          }
          var options = {
              limit: LIMIT,
              offset: offset
          }
          return Spotify.search(terms, typeParam, options)
            .then(function(response) {
                return response.data;
            });
      }
  })