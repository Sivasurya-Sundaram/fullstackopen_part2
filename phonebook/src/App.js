import { useEffect, useState } from "react";
import axios from "axios";
import DisplayContacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import FilterContact from "./components/FilterContact";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const fileredContacts =
    searchName.length !== 0
      ? persons.filter((x) =>
          x.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : persons;
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchName = (event) => {
    const name = event.target.value;
    setSearchName(name);
  };
  const handleAddClick = (event) => {
    event.preventDefault();
    const isNameExist = persons.some((x) => x.name === newName);
    if (isNameExist) {
      alert(`"${newName}" is already added to the phonebok`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      );
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterContact searchName={searchName} handleChange={handleSearchName} />
      <h2>add a new</h2>
      <AddContact
        name={newName}
        number={newNumber}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
        handleAddClick={handleAddClick}
      />
      <h2>Numbers</h2>
      <ul>
        <DisplayContacts contacts={fileredContacts} />
      </ul>
    </div>
  );
}

export default App;
