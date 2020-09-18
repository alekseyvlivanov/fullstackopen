import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Content from './Content';
import Total from './Total';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  const content = [part1, part2, part3];
  const total = content.reduce((acc, { exercises }) => acc + exercises, 0);

  return (
    <div>
      <Header header={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
