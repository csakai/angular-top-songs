angular.module('main')
  .controller('MainCtrl', function($scope, AlbumSvc, SearchSvc, TrackSvc) {
    var ctrl = this;
    this.loadStartEvent = 'loading:start';
    this.loading = {
      artists: false,
      albums: false,
      tracks: false
    };
    this.playlist = [];

    var setMethodsAs = {
      search: function() {
        ctrl.more = SearchSvc.search.bind(SearchSvc, SearchSvc.currentTerm);
        ctrl.albumsOnly = false;
        ctrl.tracksOnly = false;
      },
      albums: function() {
        ctrl.more = AlbumSvc.getAlbumsByArtist.bind(AlbumSvc, AlbumSvc.currentArtistId, true);
        ctrl.albumsOnly = true;
        ctrl.tracksOnly = false;
      },
      tracks: function() {
        ctrl.more = TrackSvc.getTracksByAlbum.bind(TrackSvc, TrackSvc.currentAlbumId, true);
        ctrl.albumsOnly = false;
        ctrl.tracksOnly = true;
      }
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

    this.isNotWaiting = function() {
      return !_.some(this.loading);
    };

    this.setToSearchMode = function() {
      setMethodsAs.search();
    };
    this.backToSearch = function() {
      this.setToSearchMode();
      setLoadingToTrue(SearchSvc.DEFAULT_TYPES);
      SearchSvc.search(SearchSvc.currentTerm)
        .then(this.dataHandler.bind(this));
    };
    this.backToAlbums = function() {
      this.getAlbumsByArtist(AlbumSvc.currentArtistId);
    };
    this.dataHandler = function(data) {
      this.data = data;
      setLoadingToFalse();
    };

    this.artistMore = function() {
      setLoadingToTrue('artists');
      this.more('artist')
        .then(this.dataHandler.bind(this));
    };
    this.albumMore = function() {
      setLoadingToTrue('albums');
      this.more('album')
        .then(this.dataHandler.bind(this));
    };

    this.trackMore = function() {
      setLoadingToTrue('tracks');
      this.more('track')
        .then(this.dataHandler.bind(this));
    };

    this.getAlbumsByArtist = function(id) {
      setLoadingToTrue('album');
      return AlbumSvc.getAlbumsByArtist(id)
        .then(this.dataHandler.bind(this))
        .then(function() {
          setMethodsAs.albums();
        });
    };

    this.getTracksByAlbum = function(id) {
      setLoadingToTrue('track');
      return TrackSvc.getTracksByAlbum(id)
        .then(this.dataHandler.bind(this))
        .then(function() {
          setMethodsAs.tracks();
        });
    };

    this.canAddToPlaylist = function(id) {
      return -1 === _.findIndex(this.playlist, function(track) {
        return track.id === id;
      });
    };

    this.addToPlaylist = function(track) {
      this.playlist.push(track);
    };
  });