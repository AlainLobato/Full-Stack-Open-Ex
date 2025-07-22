import { useState, useEffect } from 'react'
import FormPerson from './components/FormPerson'
import contactService from './services/contact'

const People = ({filterPeople, setPersons}) => {
  return (
    <ul>
      {filterPeople.map(person => 
        <li key={person.id}>{person.name}: {person.phone} <Button text='Delete' handleEvent={deletePerson(person.id, person.name, setPersons)}/></li>
      )}
    </ul>
  )
}

const deletePerson = (id, name, setPersons) => () => {
  if(window.confirm(`Do you want to delete ${name} contact?`)){
    contactService
      .destroy(id)
      .then(res => {
        contactService
          .getContacts()
          .then(res =>
            setPersons(res)
          )
          .catch(err => {
            alert(error)
          })
      })
      .catch(error => {
        alert(error)
      });
  }
}

const FilterPeople = ({filter, setFilter}) =>{
  const handleFilter = (event) =>{
    setFilter(event.target.value)
  }

  return (
    <div>
      Search: <input value={filter} onChange={handleFilter}/>
    </div>
    
  )
}

const Button = ({text, handleEvent}) => <button onClick={handleEvent}>{text}</button>

const Notification = ({message}) =>{
  if(message === null){
    return null
  }

  return (
    <div className='notification'>
      <h3>Notification</h3>
      <p>{message}</p>
    </div>
    
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() =>{
    contactService
      .getContacts()
      .then(response =>{
      console.log(response)
      setPersons(response)
  })}, [])

  const filterPeople = persons.filter((person) => {
    if (filter.match(/[a-zA-Z]/)) {
      return person.name.toLowerCase().startsWith(filter.toLowerCase());
    }

    if (filter.match(/[0-9+]/)) {
      return person.phone.startsWith(filter)
    }

    return persons
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <FormPerson persons = {persons} setPersons = {setPersons} setNotification={setNotification}/>
      
      <h2>Numbers</h2>
      <FilterPeople filter={filter} setFilter={setFilter}/>
      <People filterPeople={filterPeople} setPersons={setPersons}/>
    </div>
  )
}

export default App
