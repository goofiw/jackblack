var Board = React.createClass({displayName: "Board",
  getInitialState: function(){
    return {
        dealerHand: [],
        playerHand: []
        }
  },
  render: function(){
    var deck = this.props.deck;
    this.state.dealerHand.concat(deck.pop());
    this.state.dealerHand.concat(deck.pop());
    this.state.playerHand.concat(deck.pop());
    this.state.playerHand.concat(deck.pop());
    return (
        React.createElement("div", {className: "board"}, 
          React.createElement(Dealer, {hand: this.state.dealerHand}), 
          React.createElement(Player, {hand: this.state.playerHand})
        )
        );
  }
});

var Dealer = React.createClass({displayName: "Dealer",
  render: function(){
    return (
        React.createElement("div", {className: "dealer"}, 
          React.createElement(Card, {cards: this.props.hand})
        )
        );
  }
});

var Player = React.createClass({displayName: "Player",
  render: function(){
    return (
        React.createElement("div", {className: "player"}
        )
        );
  }
});

var Card = React.createClass({displayName: "Card",
  render: function() {
    console.log(this.props.cards);
    var allCards = [];
    for (var key in this.props.deck) {
      if(this.props.deck.hasOwnProperty(key)){
        var suit, rank;
        suit = key[0];
        rank = key.slice(1);
        suitClass = 'card suit';
        allCards.push(
            React.createElement("div", {className: suitClass}, 
              React.createElement("span", {className: "value"}, rank), 
              React.createElement("span", {className: suit}), 
              React.createElement("span", {className: "value inverted"}, rank)
            )
            );
      }
    }
    return(
      React.createElement("div", null, 
        allCards
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
    var suitSet = {}, newDeck;
    var suits = ['s', 'd', 'h', 'c'];
    //reduce was skipping over spades for some reason
    //Creats an object that holds the rendering info in the key
    //and the numerical value as the value
    suits.forEach(function(suit) {
      for(var i = 1; i < 14; i ++){
        if( i == 11) {
          suitSet[suit.concat('J')] = i;  
        } else if (i === 12){
          suitSet[suit.concat('Q')] = i;
        } else if (i === 13){
          suitSet[suit.concat('K')] = i;
        } else if (i === 1) {
          suitSet[suit.concat('A')] = i;
        } else {
          suitSet[suit.concat(i)] = i;  
        }
      }
    });
    return suitSet;
  },
  render: function(){
    return (
        React.createElement("div", {id: "game"}, 
          React.createElement(Board, {deck: this.state.deck})
        )
    );
  }
});

React.render(
  React.createElement(Game, null),
  document.getElementById('container')
);
