import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rand = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;

const App = (props) => {
  const { anecdotes } = props;
  const length = anecdotes.length;

  const [selected, setSelected] = useState(rand(0, length - 1));
  const [votes, setVotes] = useState(new Array(length).fill(0));

  const handleNext = () => {
    setSelected(rand(0, length - 1));
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>Next anecdote</button>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
