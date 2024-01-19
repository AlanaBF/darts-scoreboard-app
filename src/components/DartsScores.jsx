import { useState } from 'react';

const DartScores = () => {
  const [selectedType, setSelectedType] = useState('Double');

  const doubleScores = Array.from({ length: 20 }, (_, index) => index + 1).map((score) => ({
    value: score * 2,
    notation: `D${score}`,
  }));
  const tripleScores = Array.from({ length: 20 }, (_, index) => index + 1).map((score) => ({
    value: score * 3,
    notation: `T${score}`,
  }));

  const scoresByType = {
    Double: doubleScores,
    Triple: tripleScores,
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div>
      <label htmlFor="scoreType">Select Dart Score Type: </label>
      <select id="scoreType" onChange={handleTypeChange} value={selectedType}>
        {Object.keys(scoresByType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div>
        <h2>{`${selectedType} Scores`}</h2>
        <ul>
          {scoresByType[selectedType].map(({ value, notation }) => (
            <li key={value}>{`${notation} - ${value}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DartScores;
