import React, { useEffect, useState } from 'react';

import personService from './services/persons';

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
  handleNumber,
  newName,
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

const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
      <button onClick={handleDelete(person.id, person.name)}>delete</button>
    </p>
  );
};

const Persons = ({ persons, handleDelete }) => {
  return persons.map((person) => (
    <Person key={person.name} person={person} handleDelete={handleDelete} />
  ));
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

    personService
      .createPerson({ name: newName, number: newNumber })
      .then((newPerson) => {
        setPersons([...persons, newPerson]);
        setNewName('');
        setNewNumber('');
      });
  };

  const handleName = ({ target: { value } }) => {
    setNewName(value);
  };

  const handleNumber = ({ target: { value } }) => {
    setNewNumber(value);
  };

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  const personsToShow =
    filterName.trim() === ''
      ? persons
      : persons.filter(({ name }) =>
          name.trim().toLowerCase().includes(filterName.trim().toLowerCase()),
        );

  const getPersons = () => {
    personService.getPersons().then((allPersons) => setPersons(allPersons));
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
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
