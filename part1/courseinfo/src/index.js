import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Content from './Content';
import Total from './Total';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const parts = [part1, part2, part3];
  const exercises = [exercises1, exercises2, exercises3];

  const content = Object.fromEntries(
    parts.map((_, idx) => [parts[idx], exercises[idx]]),
  );
  const total = exercises.reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <Header header={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
