'use strict';

app.service('colorService', [function(){
  return {
    defineColor: function(expression, selector) {
      switch(expression) {
        case "Dark":
          $(selector).css("background-color", "black");
          break;
        case "Chill":
          $(selector).css("background-color", "rgb(95, 147, 225)");
          break;
        case "Happy":
          $(selector).css("background-color", "rgb(239, 164, 86)");
          break;
        case "Party":
          $(selector).css("background-color", "rgb(177, 177, 13)");
          break;
        case "Dance":
          $(selector).css("background-color", "rgb(30, 142, 141)");
          break;
        case "Sport":
          $(selector).css("background-color", "rgb(11, 44, 114)");
          break;
        case "Mixed Moods":
          $(selector).css({"background-color": "white", "border": "black"});
          $(selector).children().css("color", "black");
          break;
        case "Sad":
          $(selector).css("background-color", "grey");
          break;
        case "Angry":
          $(selector).css("background-color", "rgb(106, 5, 5)");
          break;
        case "Dreamy":
          $(selector).css("background-color", "purple");
          break;
        case "Illegal":
          $(selector).css("background-color", "rgb(101, 79, 6)");
          break;
        case "Pumped":
          $(selector).css("background-color", "rgb(190, 24, 24)");
          break;
      };
    }
  };
}]);