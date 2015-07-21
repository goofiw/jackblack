var Card = React.createClass({displayName: "Card",
  render: function() {
    return(
        React.createElement("div", null, 
          React.createElement("div", {className: "card suit d"}, 
            React.createElement("span", {className: "value"}, "2")
          ), 
          React.createElement("div", {className: "card suit s"}, 
            React.createElement("span", {className: "value"}, "2")
          ), 
          React.createElement("div", {className: "card suit h"}, 
            React.createElement("span", {className: "value"}, "2")
          ), 
          React.createElement("div", {className: "card suit c"}, 
            React.createElement("span", {className: "value"}, "2")
          )
        )
    )
  }
});

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
    newDeck = [].concat.apply([], newDeck);
    return newDeck;
  },
  render: function(){
    return (
        React.createElement("div", {id: "game"}, 
          React.createElement("div", null, " Testing ", this.state.deck, " "), 
          React.createElement(Card, null)
        )
    );
  }
});

React.render(
  React.createElement(Game, null),
  document.getElementById('container')
);
