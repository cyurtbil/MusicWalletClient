'use strict';

app.factory('songFactory', ['$http', 'ServerUrl', function($http, ServerUrl) {

  var addSong = function(wallet, source) {
    var params = {song: {
      url: source,
      wallet_id: wallet.id
    }};
    return $http.post(ServerUrl + 'songs.json', params);
  };

  var removeSong = function(song) {
    return $http.delete(ServerUrl + 'songs/' + song.id + '.json');
  };

  return {
    addSong: addSong,
    removeSong: removeSong
  };
}]);