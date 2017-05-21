angular.module('main')
  .controller('MainCtrl', function($scope, SearchSvc) {
    var ctrl = this;
    this.loadStartEvent = 'loading:start';
    this.loadEndEvent = 'loading:end';
    this.loading = {
      artists: false,
      albums: false,
      tracks: false
    };
    var setLoadingToTrue = function(types) {
      types.split(',').forEach(function(type) {
        ctrl.loading[type+'s'] = true;
      });
    };
    var setLoadingToFalse = function() {
      _.forEach(ctrl.loading, function(val, key) {
        ctrl.loading[key] = false;
      });
    };
    $scope.$on('loading:start', function($event, types) {
      setLoadingToTrue(types);
    });
    $scope.$on('loading:end', function($event, types) {
      setLoadingToFalse();
    });

    this.isNotWaiting = function() {
      return !_.some(this.loading);
    };
    this.dataHandler = function(data) {
      this.data = data;
      setLoadingToFalse();
    };

    this.more = function(type) {
      return SearchSvc.search(SearchSvc.currentTerm, type)
        .then(this.dataHandler.bind(this));
    };
    this.getAlbumsByArtist = function(id) {
      return Spotify.getArtistAlbums(id)
        .then(function(data) {
          ctrl.displayAlbumBack = true;
          ctrl.data = data;
          ctrl.albumMore = () => console.log('album more');
        });
    };
    this.getTracksByAlbum = function(id) {
      return Spotify.getAlbumTracks(id)
        .then(function(data) {
          ctrl.displayTrackBack = true;
          ctrl.data = data;
          ctrl.trackMore = () => console.log('track more');
        });
    };
  });