import dartsLogo from "/logo.png";
import "./App.css";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <div className="page-background">
    <div className="development-div"><h1 className="development-title">UNDER DEVELOPMENT</h1></div>
      <div className="jumbotron">
        <img src={dartsLogo} className="darts-logo"></img>
        <h1>Darts Scoreboard</h1>
      </div>
      <div className="scoreboard-display">
        <div className="player-1">
          <h1>Player 1</h1>
          <Scoreboard />
        </div>
        <div className="player-2">
          <h1>Player 2</h1>
          <Scoreboard />
        </div>
      </div>
    </div>
  );
}

export default App;
