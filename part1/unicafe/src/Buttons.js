import React from 'react';

import Button from './Button';

const Buttons = (props) => {
  const { feedback, handleClick } = props;
  return Object.keys(feedback).map((mark) => (
    <Button key={mark} mark={mark} onClick={handleClick} />
  ));
};

export default Buttons;
