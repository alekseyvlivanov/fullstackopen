import React from 'react';

import Part from './Part';

const Content = (props) => {
  const { content } = props;
  return (
    <div>
      {Object.entries(content).map(([part, exercises], idx) => (
        <Part key={idx} part={part} exercises={exercises} />
      ))}
    </div>
  );
};

export default Content;
