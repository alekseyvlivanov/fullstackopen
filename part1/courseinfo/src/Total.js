import React from 'react';

const Total = (props) => {
  const { parts } = props;
  const total = parts.reduce((acc, { exercises }) => acc + exercises, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
