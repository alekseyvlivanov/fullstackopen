import React from 'react';

const Statistic = (props) => {
  const { text, value, suffix } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
      <td>{suffix}</td>
    </tr>
  );
};

export default Statistic;
