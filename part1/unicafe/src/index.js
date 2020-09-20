import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Buttons from './Buttons';
import Header from './Header';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const appHeader = 'Give Feedback';
  const statHeader = 'Statistics';
  const feedback = { good, neutral, bad };

  const handleClick = (mark) => () => {
    switch (mark) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        throw new Error(`Unknown mark: '${mark}'!`);
    }
  };

  return (
    <div>
      <Header header={appHeader} />
      <Buttons feedback={feedback} handleClick={handleClick} />
      <Header header={statHeader} />
      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
