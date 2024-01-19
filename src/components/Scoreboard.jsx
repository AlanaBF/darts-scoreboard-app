import { useState } from "react";
import checkout from "./checkout.json";
import { Modal, Button } from "react-bootstrap";
import DartScores from "./DartsScores";
const Scoreboard = () => {
  const [score, setScore] = useState(501);
  const [dart1, setDart1] = useState(0);
  const [dart2, setDart2] = useState(0);
  const [dart3, setDart3] = useState(0);
  const [gameType, setGameType] = useState("501");
  const [showBustModal, setShowBustModal] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const calculateScore = () => {
    const totalScore = score - (dart1 + dart2 + dart3);
  
    if (totalScore === 0) {
      // Display a success message or perform any other actions when the player wins
      // For now, just log to the console
      console.log("Well done, you have won!");
      // You can customize this to display a modal, alert, or any other UI element
    }
  
    // Check for bust
    if ((totalScore < 0 || totalScore === 1) && score !== 0) {
      // Show bust modal only if the score is not already 0
      setShowBustModal(true);
      // Reset the score if bust
      setScore(score);
    } else {
      setScore(totalScore);
    }
  };

  const resetDarts = () => {
    // Reset the dart input fields
    setDart1(0);
    setDart2(0);
    setDart3(0);
  };

  const handleThrowDarts = () => {
    calculateScore();
    resetDarts();
    // Implement logic for updating the backend with the new score (if using a backend)
  };

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
    // Reset the score based on the selected game type
    setScore(event.target.value === "501" ? 501 : 301);
  };

  const getCheckoutOptions = () => {
    const currentOptions = checkout[score];

    if (currentOptions && currentOptions.length > 0) {
      const optionsString = currentOptions.slice(0, 3).join(", ");
      return (
        <div>
          <h3>Checkout Options:</h3>
          <p>{optionsString}</p>
        </div>
      );
    }

    return null; // No options available for the current score
  };

  const handleModalClose = () => {
    setShowBustModal(false);
  };

  return (
    <div className="scoreboard-container">
      <h2>Scoreboard</h2>
      {/* Button to open the modal */}
      <button
        className="dartscores-modal btn btn-secondary"
        onClick={handleShowModal}
      >
        Score help
      </button>
      <br></br>
      <label className="game-type-label">
        Select Game Type:{" "}
        <select
          className="game-type-select"
          value={gameType}
          onChange={handleGameTypeChange}
        >
          <option className="game-option" value="501">501</option>
          <option className="game-option" value="301">301</option>
        </select>
      </label>
      <div>
        <p>Current Score: {score}</p>
        <label className="dart-label">
          Dart 1:{" "}
          <input
            type="number"
            value={dart1}
            onChange={(e) => setDart1(Number(e.target.value))}
          />
        </label>
        <br></br>
        <label className="dart-label">
          Dart 2:{" "}
          <input
            type="number"
            value={dart2}
            onChange={(e) => setDart2(Number(e.target.value))}
          />
        </label>
        <br></br>
        <label className="dart-label">
          Dart 3:{" "}
          <input
            type="number"
            value={dart3}
            onChange={(e) => setDart3(Number(e.target.value))}
          />
        </label>
        <br></br>
        <button className="calculate-btn btn btn-danger" onClick={handleThrowDarts}>
          Calculate Score
        </button>
      </div>
      {score < 171 && getCheckoutOptions()}

      {showBustModal && (
        <div className="bust-modal">
          <p>Bust! Your score has been reset.</p>
          <button onClick={handleModalClose}>OK</button>
        </div>
      )}

      {score === 0 && (
        <div className="win-modal">
          <p>Well done, you have won!</p>
          {/* You can display a modal, alert, or any other UI element for winning */}
        </div>
      )}

      {/* Bootstrap Modal */}
      <Modal
        className="dartscores-modal"
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Dart Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DartScores />
          {/* Add the content for your Dart Scores here */}
          {/* You can include your DartScores component or any other content */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Scoreboard;
