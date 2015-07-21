var Card = React.createClass({
  render: function() {
    return(
        <div className='card suit rank-2 d'></div>
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
        <div id='game'>
          <div> Testing {this.state.deck} </div>
          <Card />
        </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('container')
);
