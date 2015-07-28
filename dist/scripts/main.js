var ObjectStack = function() {
  this.object = {};
  this.stack = [];
}

ObjectStack.prototype.push = function(key, value) {
  this.object[key] = value;
  this.stack.push(key);
}

ObjectStack.prototype.pop = function(){
  var key = this.stack.pop();
  var prop = this.object[key];
  delete this.object[key];
  return [key, prop];
}

var Board = React.createClass({displayName: "Board",
  getInitialState: function(){
    return {
        dealerHand: new ObjectStack(),
        playerHand: new ObjectStack()
        }
  },
  render: function(){
    var deck = this.props.deck;
    temp = deck.pop();
    this.state.dealerHand.push(temp[0],temp[1]);
    temp = deck.pop();
    this.state.dealerHand.push(temp[0],temp[1]);
    temp = deck.pop();
    this.state.playerHand.push(temp[0],temp[1]);
    temp = deck.pop();
    this.state.playerHand.push(temp[0],temp[1]);
    return (
        React.createElement("div", {className: "board"}, 
          React.createElement(Dealer, {hand: this.state.dealerHand}), 
          React.createElement(Player, {hand: this.state.playerHand})
        )
        );
  }
});

var Deck = React.createClass({displayName: "Deck",
  render: function(){
    return (
        React.createElement("div", {className: "card", id: "deck"}
        )
        )
  }
})

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
    var currentPlayer = true;
    return (
        React.createElement("div", {className: "player"}, 
          React.createElement(Card, {cards: this.props.hand, 
                currentPlayer: currentPlayer})
        )
        );
  }
});

var Card = React.createClass({displayName: "Card",
  render: function() {
    console.log(this.props.cards);
    var allCards = [];
    for (var i = 0;  i < this.props.cards.stack.length; i++) {
        var suit, rank, stack, obj, key;
        stack = this.props.cards.stack;
        obj = this.props.cards.object;
        key = stack[i];
        suit = key[0];
        rank = key.slice(1);
        suitClass = 'card suit';
        if (i === 0 && !this.props.currentPlayer) {
          rank='';
          suit = '';
        }
        allCards.push(
            React.createElement("div", {className: suitClass}, 
              React.createElement("span", {className: "value"}, rank), 
              React.createElement("span", {className: suit}), 
              React.createElement("span", {className: "value inverted"}, rank)
            )
            );
      }
    return(
      React.createElement("div", {className: "hand"}, 
        allCards
      )
    )
  }
});

var Game = React.createClass({displayName: "Game",
  getInitialState: function(){
    return {
    deck: this.shuffleDeck(this.createDeck())
    };
  },
  createDeck: function(){
    var newDeck = new ObjectStack();
    var suits = ['s', 'd', 'h', 'c'];
    //reduce was skipping over spades for some reason
    //Creats an object that holds the rendering info in the key
    //and the numerical value as the value
    suits.forEach(function(suit) {
      for(var i = 1; i < 14; i ++){
        if( i == 11) {
          newDeck.push(suit.concat('J'), 10);  
        } else if (i === 12){
          newDeck.push(suit.concat('Q'), 10);
        } else if (i === 13){
          newDeck.push(suit.concat('K'), 10);
        } else if (i === 1) {
          newDeck.push(suit.concat('A'), 11);
        } else {
          newDeck.push(suit.concat(i), i);  
        }
      }
    })
    return newDeck;
  },
  shuffleDeck: function(deck){
    var arr = deck.stack;
    for (var i = arr.length - 1; i > 0;  i--){
      var swap = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[swap];
      arr[swap] = temp; 
    }
    return deck;
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
