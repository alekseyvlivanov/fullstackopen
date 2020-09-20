import React from 'react';

import Statistic from './Statistic';

const Statistics = (props) => {
  const { feedback } = props;
  const { good, neutral, bad } = feedback;
  const all = good + neutral + bad;

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  return (
    <table>
      <tbody>
        {Object.keys(feedback).map((mark) => (
          <Statistic key={mark} text={mark} value={feedback[mark]} />
        ))}
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} suffix="%" />
      </tbody>
    </table>
  );
};

export default Statistics;
