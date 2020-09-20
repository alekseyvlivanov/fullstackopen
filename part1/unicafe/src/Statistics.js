import React from 'react';

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
    <>
      {Object.keys(feedback).map((mark) => (
        <div key={mark}>
          {mark}: {feedback[mark]}
        </div>
      ))}
      <div>all: {all}</div>
      <div>average: {average}</div>
      <div>positive: {positive}%</div>
    </>
  );
};

export default Statistics;
