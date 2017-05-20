angular.module('search')
  .service('SearchSvc', function($q, Spotify) {
    var service = this;
    var TYPE_MAP = {
      artist: 'artists',
      album: 'albums',
      track: 'tracks'
    };
    var DEFAULT_TYPES = 'artist,album,track';
    var LIMIT = 10;

    this.currentTerm = '';
    this.cached = {};

    this.handleData = function(data) {
      var parsedData = _.reduce(data, function(acc, val, key) {
        acc[key] = _.pick(val, [ 'items', 'total', 'offset' ]);
        acc[key].next = (val.total - val.offset > LIMIT);
        return acc;
      }, {});
      if (_.isEmpty(this.cached)) {
        this.cached = parsedData;
      } else {
        _.forEach(parsedData, function(searchMeta, key) {
          var cachedData = service.cached[key];
          cachedData.offset = searchMeta.offset;
          cachedData.items.concat(searchMeta.items);
          cachedData.next = searchMeta.next;
        });
      }
      return this.cached;
    };

    this.getNextOffset = function(type) {
      var key = TYPE_MAP[type];
      return this.cached[key].offset + LIMIT;
    };

    this.getResults = function(terms, type, offset) {
      type = type || DEFAULT_TYPES;
      var options = {
        limit: LIMIT,
        offset: offset || 0
      };
      return Spotify.search(terms, type, options)
        .then(function(response) {
          return service.handleData(response.data);
        });
    };
    this.search = function(terms, type) {
      var promise;
      if (this.currentTerm === terms) {
        if (type) {
          var offset = this.getNextOffset(type);
          promise = this.getResults(terms, type, offset);
        } else {
          promise = $q.resolve(this.cached);
        }
      } else {
        this.currentTerm = terms;
        this.cached = {};
        promise = this.getResults(terms);
      }
      return promise;
    };
  });