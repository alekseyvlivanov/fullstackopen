import React from 'react';

const Statistic = (props) => {
  const { text, value, suffix } = props;
  return (
    <div>
      {text}: {value} {suffix}
    </div>
  );
};

export default Statistic;
