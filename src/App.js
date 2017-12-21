import React, { Component } from 'react';
import './App.css';
import Player from './Player/Player'
import Battle from './Battle'
import ToggleDisplay from 'react-toggle-display';

class App extends Component {
constructor(props){
  super(props);
  this.state = {
    FirstPlayer: { id: "id1",
      name: "Select Player",
      hp: "0",
      strength: "0",
      action1: "",
      action2: "",
      image: {url: "/uploads/player/goggles.jpg"}
    },
    SecondPlayer: { id: "id2",
      name: "Select Player",
      hp: "0",
      strength: "0",
      action1: "",
      action2: "",
      image: {url: "/uploads/player/goggles.jpg"}
    },
    showBattle: false,
    show: true
  }
  this._onButtonClick=  this._onButtonClick.bind(this)
  this.reset = this.reset.bind(this)
}

  togglePlayerHandler = (player) => {
    this.state.FirstPlayer.name === "Select Player" ? this.setState({FirstPlayer: player}) : this.setState({SecondPlayer: player})
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/players/players.json')
      .then(data => data.json())
      .then(data=> {
        this.setState({
          playerData: data
        })
      })
  }

  _onButtonClick(){
    this.setState({
      showBattle: true,
      show: !this.state.show
    });
  }

  reset() {
    this.setState({
      FirstPlayer: { id: "id1",
        name: "Select Player",
        hp: "0",
        strength: "0",
        action1: "",
        action2: "",
        image: {url: "/uploads/player/goggles.jpg"}
      },
      SecondPlayer: { id: "id2",
        name: "Select Player",
        hp: "0",
        strength: "0",
        action1: "",
        action2: "",
        image: {url: "/uploads/player/goggles.jpg"}
      }
    })
  }

  render() {
    if (!this.state.playerData) {
      return <p>Loading Players...</p>
    } else {
      const listOfPlayers = this.state.playerData.map( player => {
        return <Player
          name = {player.name}
          image = {"http://localhost:4000" + player.image.url}
          click = {() => this.togglePlayerHandler(player)}
          key = {player.id}
           />;
      });

      const PlayersChosen = [this.state.FirstPlayer, this.state.SecondPlayer]

      const SelectedPlayers = PlayersChosen.map( player => {
        return <Player
          name = {player.name}
         image = {"http://localhost:4000" + player.image.url}
            hp =  {"Health: " + player.hp}
      strength = {"Strength: " + player.strength}
         showed = {player.hp}
           key = {player.id}
          />;
      });

      return (
        <ul>
          <ToggleDisplay show={this.state.show}>
            {listOfPlayers} <br></br>
            {SelectedPlayers}<br></br>
            {this.state.FirstPlayer.name + " Vs " + this.state.SecondPlayer.name}
            <br />
            <button onClick={this._onButtonClick}> Fight </button>
            <button onClick={this.reset}> Reset </button>
          </ToggleDisplay>

          {this.state.showBattle ? <Battle player1={this.state.FirstPlayer}
                                  player2={this.state.SecondPlayer}/> : null}
        </ul>
      );
    }
  }
}

export default App;
