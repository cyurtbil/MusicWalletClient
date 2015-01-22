'use strict';

app.controller('WhoController', ['$scope', 'dataFactory', function($scope, dataFactory) {

  dataFactory.fetchUsers().then(function(response) {
    $scope.users = response.data.users;
  });

  $scope.getMaxUserWallet = function(user) {
    var highestSongCountUserWallet = _.max(user.wallets, function(wallet) { return wallet.song_count; });
    switch(highestSongCountUserWallet.name) {
      case "Dark":
        $("." + highestSongCountUserWallet.name).css("background-color", "black");
        break;
      case "Chill":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(95, 147, 225)");
        break;
      case "Happy":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(239, 164, 86)");
        break;
      case "Party":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(177, 177, 13)");
        break;
      case "Dance":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(30, 142, 141)");
        break;
      case "Sport":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(11, 44, 114)");
        break;
      case "Mixed Moods":
        $("." + highestSongCountUserWallet.name).css({"background-color": "white", "border": "black"});
        $("." + highestSongCountUserWallet.name).children().css("color", "black");
        break;
      case "Sad":
        $("." + highestSongCountUserWallet.name).css("background-color", "grey");
        break;
      case "Angry":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(106, 5, 5)");
        break;
      case "Dreamy":
        $("." + highestSongCountUserWallet.name).css("background-color", "purple");
        break;
      case "Illegal":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(101, 79, 6)");
        break;
      case "Pumped":
        $("." + highestSongCountUserWallet.name).css("background-color", "rgb(190, 24, 24)");
        break;
    }
    return [highestSongCountUserWallet.name, highestSongCountUserWallet.song_count];
  };



}]);