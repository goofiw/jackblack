var Board = React.createClass({
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
        <div className="board">
          <Dealer hand={this.state.dealerHand}/>
          <Player hand={this.state.playerHand}/>
        </div>
        );
  }
});

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
    return (
        <div className="player">
        </div>
        );
  }
});

var Card = React.createClass({
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
            <div className={suitClass}>
              <span className='value'>{rank}</span>
              <span className={suit}></span>
              <span className='value inverted'>{rank}</span>
            </div>
            );
      }
    }
    return(
      <div>
        {allCards}
      </div>
    )
  }
});

var Game = React.createClass({
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
          suitSet[suit.concat('J')] = 10;  
        } else if (i === 12){
          suitSet[suit.concat('Q')] = 10;
        } else if (i === 13){
          suitSet[suit.concat('K')] = 10;
        } else if (i === 1) {
          suitSet[suit.concat('A')] = 11;
        } else {
          suitSet[suit.concat(i)] = i;  
        }
      }
    });
    return suitSet;
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
