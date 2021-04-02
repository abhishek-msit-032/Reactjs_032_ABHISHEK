import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt} from 'react-router-dom';

function Slat(props){
  return <div className="Slat" onClick={() => props.handleClick()}>
    {[...Array(props.holes.length)].map((x, j) => 
      <Hole key={j} value={props.holes[j]}></Hole>)}
    </div>
}
function Hole(props){
  return <div className="Hole"><div className={props.value}></div></div>
}



class Board extends Component {

  constructor() {
    super();
    this.state = {
      boardState: new Array(7).fill(new Array(6).fill(null)),
      playerTurn: 'Red',
      Player1:"",
      Player2:"",
      gameMode: '',
      gameSelected: false,
      winner: '',
      play:''
    }
  }

  selectedGame(mode){
    if(this.state.Player1==="" || this.state.Player2===""){
      alert("Please Enter the Player Names")
    }
    else{
    this.setState({
       gameMode: mode,
       gameSelected: true, 
       boardState: new Array(7).fill(new Array(6).fill(null))
    })
  }
  }

  makeMove(slatID){
    const boardCopy = this.state.boardState.map(function(arr) {
      return arr.slice();
    });
    if( boardCopy[slatID].indexOf(null) !== -1 ){
      let newSlat = boardCopy[slatID].reverse()
      newSlat[newSlat.indexOf(null)] = this.state.playerTurn
      newSlat.reverse()
      this.setState({
        playerTurn: (this.state.playerTurn === 'Red') ? 'Blue' : 'Red',
        boardState: boardCopy
      })
      
    }
    if(this.state.playerTurn==='Red'){
      <h1>Player Red Turn</h1>
    }
    else if(this.state.playerTurn==='Blue') {
      <p>Player Blue Turn</p>
    }
  }

  /*Only make moves if winner doesn't exist*/
  handleClick(slatID) {
    if(this.state.winner === ''){
      this.makeMove(slatID)
    }
  }
  
  /*check the winner and make AI move IF game is in AI mode*/
  componentDidUpdate(){
    let winner = checkwin(this.state.boardState) 
    if(this.state.winner !== winner){
      this.setState({
        winner: winner
      })
    } 
  }

  updateResponse=(event)=>{
    this.setState({
      Player1:event.target.value
    })
  }

  updateResponse1=(event)=>{
    this.setState({
      Player2:event.target.value
    })
  }

  render(){
    /*If a winner exists display the name*/
   
    // let winnerMessageStyle
    // if(this.state.winner !== ""){
    //   winnerMessageStyle = "winnerMessage appear"
    // }else {
    //   winnerMessageStyle = "winnerMessage" 
    // }

    /*Contruct slats allocating column from board*/
    let slats = [...Array(this.state.boardState.length)].map((x, i) => 
      <Slat 
          key={i}
          holes={this.state.boardState[i]}
          handleClick={() => this.handleClick(i)}
      ></Slat>
    )

    return (
      <div>
        {this.state.gameSelected &&
          <div className="Board">
            {slats}
          </div>
        }
        <br></br>
        <br></br>
        <br></br>
         {(!this.state.gameSelected  ) &&

            <div className="name">
              <h2 className="Con">Please Enter the Players Names </h2>
              <p><b>Player1:</b></p>
              <input type="text" value={this.state.Player1} onChange={this.updateResponse} placeholder="Enter the name " />
              <p><b>Player2:</b></p>
              <input type="text" value={this.state.Player2} onChange={this.updateResponse1} placeholder="Enter the name " />
              <br></br>
              <button value={this.state.play} onClick={() => this.selectedGame('Play')}>Start</button>
              <br></br>
              <br></br>
              
            </div>
          }
     
        <div >{this.state.winner}</div>
        {(this.state.playerTurn==="Red" && this.state.winner === '' && this.state.gameSelected ) &&
          <div>
            <h2>Player Red's Turn</h2> 
          </div>
        }
        {(this.state.playerTurn==="Blue" && this.state.winner === '' && this.state.gameSelected  ) &&
          <div>
            <h2>Player Blue's Turn</h2>  
          </div>
        }
       
        {(this.state.winner !== '' && this.state.playerTurn==="Blue" ) &&
          <div>
            <h2>Congrats {this.state.Player1} </h2>
            <h2>Good play.....!</h2>
          </div>
        }
        
        {(this.state.winner !== '' && this.state.playerTurn==="Red") &&
          <div>
            <h2 >Congrats {this.state.Player2} </h2>
            <h2>Good play.....!</h2>         
          </div>
        }
       
        
      </div>
    )
  }
}

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
            <br></br>
            <br></br>
            <button className="b1"><NavLink className="tags" to="/Game" exact activeStyle={
              { color:'black' }
            }>Start</NavLink></button>
            <button className="b1"><NavLink className="tags" to="/" exact activeStyle={
              { color:'black' }
            }>Home</NavLink></button>
          
            
            
        <Route path="/" exact strict render={
          () => {
            return ( <div>
              <br></br>
              <h1>Connect 4</h1>
              <div className="App">
                <div className="App-header">
                  
                  <h2>Rules of the Game</h2>
                  
                  <ol>
                    <li className="list1">
                    The standard game size for a Connect 4 game is a 6x7 grid consisting of 42 cells.
                    </li>
                    <li className="list1">
                    Each player takes turns dropping a token into a column
                    </li>
                    <li className="list1">
                    which drops to the lowest available slot.
                    </li>
                    <li className="list1">
                    Once settled, the players check to see if their newly placed piece.
                    </li>
                    <li className="list1">
                    in combination with any existing pieces of their same color.
                    </li>
                    <li className="list1">
                    make a straight light of four tokens. If four tokens are connected in a straight line, that player wins.
                    </li>
                    <li className="list1">
                      A valid connection must have four tokens that are immediately adjacent to each other, and they can be vertical, diagonal, or horizontal.
                    </li>
                  </ol>
                </div>
                </div>
                </div>
                );
          }
        }/>
        <Route path="/Game" exact strict render={
          () => {
            return (  
            <div >
              <br></br>
              <br></br>
              <br></br>
            <div>
            
            </div>
            <div className="Game">
            <Board></Board>
            </div>
          </div> 
          );
          }
        }/>
        </div>
      </Router>
    );
  }
}

function checkcondition(a,b,c,d) {
    return ((a !== null) && (a === b) && (a === c) && (a === d));
}

function checkwin(position) {
    
    for (let c = 0; c < 7; c++)
        for (let r = 0; r < 4; r++)
            if (checkcondition(position[c][r], position[c][r+1], position[c][r+2], position[c][r+3]))
                return position[c][r] + ' wins!'

    for (let r = 0; r < 6; r++)
         for (let c = 0; c < 4; c++)
             if (checkcondition(position[c][r], position[c+1][r], position[c+2][r], position[c+3][r]))
                 return position[c][r] + ' wins!'

    for (let r = 0; r < 3; r++)
         for (let c = 0; c < 4; c++)
             if (checkcondition(position[c][r], position[c+1][r+1], position[c+2][r+2], position[c+3][r+3]))
                 return position[c][r] + ' wins!'

    for (let r = 0; r < 4; r++)
         for (let c = 3; c < 6; c++)
             if (checkcondition(position[c][r], position[c-1][r+1], position[c-2][r+2], position[c-3][r+3]))
                 return position[c][r] + ' wins!'

    return "";
}

export default App;