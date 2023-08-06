import { useEffect, useState } from "react";
import DisplayContacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import FilterContact from "./components/FilterContact";
import contactService from "./services/contacts";

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
    contactService.getAll().then((contacts) => {
      setPersons(contacts);
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
    const existingContact = persons.find((x) => x.name === newName);
    if (existingContact !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newContact = {
          name: newName,
          number: newNumber,
        };
        contactService
          .update(existingContact.id, newContact)
          .then((updatedContact) => {
            setPersons(
              persons.map((x) =>
                x.id === existingContact.id ? updatedContact : x
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      contactService.create(newContact).then((contact) => {
        setPersons(persons.concat(contact));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const handleDeleteClick = (contact) => {
    if (window.confirm(`Delete ${contact.name}`)) {
      contactService
        .deleteContact(contact.id)
        .then((res) => {
          console.log(res);
          setPersons(persons.filter((x) => x.id !== contact.id));
        })
        .catch((error) => {
          window.alert(`No Record Found`);
        });
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
        {fileredContacts?.map((contact) => (
          <DisplayContacts
            key={contact.id}
            contact={contact}
            handleDeleteClick={() => handleDeleteClick(contact)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
