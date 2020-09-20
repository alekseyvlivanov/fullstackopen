import React from 'react';

const Button = (props) => {
  const { mark, onClick } = props;
  return <button onClick={onClick(mark)}>{mark}</button>;
};

export default Button;
