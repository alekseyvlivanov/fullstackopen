import React from 'react';

import Part from './Part';

const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      {parts.map(({ name, exercises }, idx) => (
        <Part key={idx} name={name} exercises={exercises} />
      ))}
    </div>
  );
};

export default Content;
