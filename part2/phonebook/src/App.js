import React, { useEffect, useState } from "react";

import personService from "./services/persons";

import "./index.css";

const Notification = ({ message: { text, type } }) => {
  if (!text || !type) {
    return null;
  }

  return <div className={type}>{text}</div>;
};

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
      {person.name} {person.number}{" "}
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
  const [filterName, setFilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState({});

  const handleFilter = ({ target: { value } }) => {
    setFilterName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, number: newNumber };
    const oldPerson = persons.find((person) => person.name === newName);

    if (oldPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(oldPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage({
              text: `Updated ${returnedPerson.name}`,
              type: "success",
            });
            setTimeout(() => setMessage({}), 2000);
          })
          .catch((err) => {
            setMessage({ text: err.response.data.error, type: "error" });
            setTimeout(() => setMessage({}), 2000);
          });
      }
    } else {
      personService
        .createPerson(newPerson)
        .then((person) => {
          setPersons([...persons, person]);
          setNewName("");
          setNewNumber("");
          setMessage({ text: `Added ${person.name}`, type: "success" });
          setTimeout(() => setMessage({}), 2000);
        })
        .catch((err) => {
          setMessage({ text: err.response.data.error, type: "error" });
          setTimeout(() => setMessage({}), 2000);
        });
    }
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
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setMessage({ text: `Deleted ${name}`, type: "success" });
          setTimeout(() => setMessage({}), 2000);
        })
        .catch((err) => {
          setMessage({ text: err.response.data.error, type: "error" });
          setTimeout(() => setMessage({}), 2000);
        });
    }
  };

  const personsToShow =
    filterName.trim() === ""
      ? persons
      : persons.filter(({ name }) =>
          name.trim().toLowerCase().includes(filterName.trim().toLowerCase())
        );

  const getPersons = () => {
    personService.getPersons().then((allPersons) => setPersons(allPersons));
  };

  useEffect(getPersons, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
