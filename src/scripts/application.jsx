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

var Board = React.createClass({
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
        <div className="board">
          <Dealer hand={this.state.dealerHand}/>
          <Player hand={this.state.playerHand}/>
        </div>
        );
  }
});

var Deck = React.createClass({
  render: function(){
    return (
        <div className="card" id="deck">
        </div>
        )
  }
})

var Dealer = React.createClass({
  render: function(){
    return (
        <div className="dealer">
          <Card cards={this.props.hand}/>
        </div>
        );
  }
});

var Player = React.createClass({
  render: function(){
    var currentPlayer = true;
    return (
        <div className="player">
          <Card cards={this.props.hand}
                currentPlayer={currentPlayer}/>
        </div>
        );
  }
});

var Card = React.createClass({
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
            <div className={suitClass}>
              <span className='value'>{rank}</span>
              <span className={suit}></span>
              <span className='value inverted'>{rank}</span>
            </div>
            );
      }
    return(
      <div className='hand'>
        {allCards}
      </div>
    )
  }
});

var Game = React.createClass({
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
        <div id='game'>
          <Board deck={this.state.deck}/>
        </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('container')
);
