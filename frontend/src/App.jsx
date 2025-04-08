import { useState, useEffect } from 'react'
import Service from "./services/Service.jsx"
import Add from "./components/Add.jsx"
import Display from "./components/Display.jsx"
import Notification from "./components/Notification.jsx"
import Search from "./components/Search.jsx"

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    Service.getAll()
           .then(initialContacts => setContacts(initialContacts))
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if (contacts.some(contact => contact.name === newName)) {
      if (confirm(`Are you sure you want to update ${newName}'s number?`)) {
        const replaceId = contacts.find(contact => contact.name === newName).id
        Service.replaceContact(replaceId, { name: newName, number: newNumber })
               .then((returnedContact) => {
                                            setContacts(contacts.map(contact => contact.id === replaceId ? returnedContact : contact))
                                            setMessage(`${newName}'s number successfully updated!`)
                                            setTimeout(() => setMessage(''), 3000)
                                          })
               .catch(() => {
                              setSuccess(false)
                              setMessage(`${newName} has already been removed from the server.`)
                              setContacts(contacts.filter(contact => contact.id !== replaceId))
                              setTimeout(() => setMessage(''), 3000)
                              setTimeout(() => setSuccess(true), 3000)
               })
        return
      }
    }
    const newContact = { name: newName, number: newNumber }
    Service.addContact(newContact)
           .then(returnedContact => setContacts(contacts.concat(returnedContact)))
    setNewName('')
    setNewNumber('')
    setMessage(`${newName} successfully added!`)
    setTimeout(() => setMessage(''), 3000)
  }

  const deleteContact = (id) => {
    if (confirm(`Are you sure you want to delete ${contacts.find(contact => contact.id === id).name}?`)) {
      Service.deleteContact(id)
             .then(setContacts(contacts.filter(contact => contact.id !== id)))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success}/>
      <Search handleSearch={handleSearchChange}/>
      <form onSubmit={addContact}>
        <Add name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange}/>
        <Display contacts={contacts} search={search} deleteContact={deleteContact}/>
      </form>
    </div>
  )
}

export default App