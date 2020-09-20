import React from 'react';

const Statistics = (props) => {
  const { feedback } = props;
  return Object.keys(feedback).map((mark) => (
    <div key={mark}>
      {mark}: {feedback[mark]}
    </div>
  ));
};

export default Statistics;
