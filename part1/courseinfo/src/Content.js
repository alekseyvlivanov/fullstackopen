import React from 'react';

const Content = (props) => {
  const { content } = props;
  return (
    <>
      {Object.entries(content).map(([part, exercises], idx) => (
        <p key={idx}>
          {part} {exercises}
        </p>
      ))}
    </>
  );
};

export default Content;
