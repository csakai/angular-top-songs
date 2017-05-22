angular.module('search')
  .service('SpotifyData', function($cacheFactory) {
    var LIMIT = 10;
    this.LIMIT = LIMIT;
    this.cache = $cacheFactory('spotify');
    var TYPE_MAP = {
      artist: 'artists',
      album: 'albums',
      track: 'tracks'
    };

    this.parseData = function(data) {
      return _.reduce(data, function(acc, val, key) {
        acc[key] = _.pick(val, [ 'items', 'total', 'offset' ]);
        acc[key].next = (val.total - val.offset > LIMIT);
        return acc;
      }, {});
    };

    function updateSingleCache(cached, data) {
      return _.mergeWith(cached, data, function concatItems(objValue, srcValue) {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      });
    }

    this.updateCached = function(cacheId, data) {
      var cached = this.cache.get(cacheId);
      var newCached;
      if (cached) {
        newCached = updateSingleCache(cached, data);
      } else {
        newCached = data;
      }
      this.cache.put(cacheId, newCached);
      return newCached;
    };

    this.updateCachedSearch = function(cacheId, data) {
      var cached = this.cache.get(cacheId);
      var newCached;
      if (cached) {
        newCached = _.reduce(cached, function(acc, val, key) {
          acc[key] = updateSingleCache(val, data[key]);
          return acc;
        }, {});
      } else {
        newCached = data;
      }
      this.cache.put(cacheId, newCached);
      return newCached;
    };

    this.clearCached = function(cacheId) {
      this.cache.remove(cacheId);
    };

    this.getNextOffset = function(cacheId, type) {
      var cached = this.cache.get(cacheId);
      if (type) {
        cached = cached[TYPE_MAP[type]];
      }
      return cached.offset + LIMIT;
    };
  })