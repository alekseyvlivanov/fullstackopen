import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter} />
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  handleName,
  newName,
  handleNumber,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons }) => {
  return persons.map((person) => <Person key={person.name} person={person} />);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleFilter = ({ target: { value } }) => {
    setFilterName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName('');
    setNewNumber('');
  };

  const handleName = ({ target: { value } }) => {
    setNewName(value);
  };

  const handleNumber = ({ target: { value } }) => {
    setNewNumber(value);
  };

  const personsToShow =
    filterName.trim() === ''
      ? persons
      : persons.filter(({ name }) =>
          name.trim().toLowerCase().includes(filterName.trim().toLowerCase()),
        );

  const getPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  };

  useEffect(getPersons, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleName={handleName}
        newName={newName}
        handleNumber={handleNumber}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
