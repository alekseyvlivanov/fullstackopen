import React from 'react';
import ReactDOM from 'react-dom';

const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const Header = ({ course: { name } }) => {
  return <h2>{name}</h2>;
};

const Total = ({ course: { parts } }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course: { parts } }) => {
  return parts.map((part) => <Part part={part} />);
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

const App = () => {
  const title = 'Web development curriculum';
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <Title title={title} />
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
