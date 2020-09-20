import React from 'react';

const Buttons = (props) => {
  const { feedback, handleClick } = props;
  return Object.keys(feedback).map((mark) => (
    <button key={mark} onClick={handleClick(mark)}>
      {mark}
    </button>
  ));
};

export default Buttons;
