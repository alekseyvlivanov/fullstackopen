import React from 'react';

const Header = ({ course: { name } }) => {
  return <h2>{name}</h2>;
};

const Content = ({ course: { parts } }) => {
  return parts.map((part) => <Part part={part} />);
};

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ course: { parts } }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
