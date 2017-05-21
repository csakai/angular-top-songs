angular.module('search')
  .service('AlbumSvc', function(Spotify) {
    var service = this;
    var LIMIT = 10;

    this.currentId = '';
    this.cached = {};


  })