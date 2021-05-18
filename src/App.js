import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';

const clearState = ["", "", "", "", "", "", "", "", "", ""];
var i = 0 ;


function App() {
    const [msg, setMsg] = useState("")
    const [gameState, updateGameState] = useState(clearState)
    const [isXChance, updateIsXChance] = useState(false)
   

    const onUserClicked = (index) => {
        i ++;
        let strings = Array.from(gameState);
        if (strings[index])
            return;
        strings[index] = isXChance ? "X" : "O";
        setMsg(isXChance ? 'O `s turn' : 'X `s turn')
        updateIsXChance(!isXChance)
        updateGameState(strings)
    }

    const clearGame = () => {
        updateGameState(clearState)

            i = 0;

        setMsg('')
    }

    useEffect(() => {

        const checkIfTie = () => {
            
            let filled = true;
            console.log(filled)
            gameState.forEach((pos) => {
            console.log('pos:', pos)
              if (pos === "") {
                filled = false;
                console.log('filled false: ', filled)
              }
            });

              return filled;
          }; 
       
      
          const checkWinner = () => {
              const lines = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6],
              ];
         
              console.log('Class: App, Function: checkWinner ==', gameState[0], gameState[1], gameState[2]);
              for (let i = 0; i < lines.length; i++) {
                  const [a, b, c] = lines[i];
                  if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                      return gameState[a];
                  }
              }
              return null;
          }

       

        let winner = checkWinner();

        if (winner) {
            clearGame();
            setMsg(`$ ${winner} WON THE GAME $`)
            i = 0;
        }

        let full = checkIfTie();
        
        console.log('i:', i)
        if (!full && i === 9) {
          clearGame();
          setMsg('# TIE: GAME OVER #');
          i = 0;
        }
        
      
    }, [gameState])

    


    const SquareComponent = (props) => {
      const classes = (props.className ? `${props.className} square` : `square`)
      return (
          <span
              className={classes + (props.state === "X" ? ` fc-aqua` : ` fc-white`)}
              onClick={() => props.onClick(props.index)}>
             {props.state}
          </span>
      )
  }

    return (
     
        <div className="app-header">
            <p className="heading-text">React Tic Tac Toe</p>
            <div><button className="btn" onClick={clearGame}> {'>'} start a new game</button></div>
            <div className="gameboard">
            <Grid container spacing={1}>

            <Grid container item xs={12} spacing={3}>
              
              <React.Fragment>
                <Grid item xs={4}>
                   <SquareComponent className="squarebtn" onClick={() => onUserClicked(0)} state={gameState[0]}/>
                </Grid>
                <Grid item xs={4}>
                    <SquareComponent className="squarebtn" onClick={() => onUserClicked(1)} state={gameState[1]}/>
                </Grid>
                <Grid item xs={4}>
                    <SquareComponent className="squarebtn" onClick={() => onUserClicked(2)} state={gameState[2]}/>
                </Grid>
             </React.Fragment>
          </Grid>


            <Grid container item xs={12} spacing={3}>
            <React.Fragment>
                <Grid item xs={4}>
                   <SquareComponent className="squarebtn" onClick={() => onUserClicked(3)} state={gameState[3]}/>
                </Grid>
                <Grid item xs={4}>
                    <SquareComponent className="squarebtn" onClick={() => onUserClicked(4)} state={gameState[4]}/>
                </Grid>
                <Grid item xs={4}>
                    <SquareComponent className="squarebtn" onClick={() => onUserClicked(5)} state={gameState[5]}/>
                </Grid>
             </React.Fragment>
            </Grid>


            <Grid container item xs={12} spacing={3}>
            <React.Fragment>
                <Grid item xs={4}>
                   <SquareComponent className="squarebtn" onClick={() => onUserClicked(6)} state={gameState[6]}/>
                </Grid>
                <Grid item xs={4}>
                    <SquareComponent className="squarebtn" onClick={() => onUserClicked(7)} state={gameState[7]}/>
                </Grid>
                <Grid item xs={4}>
                    <SquareComponent className="squarebtn" onClick={() => onUserClicked(8)} state={gameState[8]}/>
                </Grid>
             </React.Fragment>
            </Grid>

            </Grid>
            </div>
            <div className="result-text">{msg}</div>
            <div className="desc-text">Hi, I created this game
             as the 3rd coursework for the Web Engineering class using React JS and material-ui. github: @zammagoude</div>
        </div>

    );
}

export default App;