
var Game = React.createClass({displayName: "Game",
  getInitialState: function(){
    return {
    deck: this.createDeck()
    };
  },
  createDeck: function(){
    var suitSet = [], newDeck;
    var suits = ['s', 'd', 'h', 'c'];
    newDeck = suits.map(function(suit) {
      for(var i = 0; i < 14; i ++){
        suitSet.push(suit + i);  
      }
      return suitSet;
    });
    console.log(newDeck);
  },
  render: function(){
    return (
        React.createElement("div", null, " ", this.deck, " ")
    );
  }
});

React.render(
  React.createElement(Game, null),
  document.getElementById('container')
);
