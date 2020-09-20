import React from 'react';

const Statistics = (props) => {
  const { feedback } = props;
  const { good, neutral, bad } = feedback;
  const all = good + neutral + bad;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good * 100) / all : 0;

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
