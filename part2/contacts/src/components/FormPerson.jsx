import { useState } from 'react'
import contactService from '../services/contact'

const FormPerson = ({persons, setPersons, setNotification}) => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleName = (event) => {
        setNewName(event.target.value)
    }

    const handlePhone = (event) => {
        setNewPhone(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            phone: newPhone,
            id: (persons.length + 1).toString()
        }
    
        if (persons.some(person => person.name === newName)) {
            if(window.confirm('newName is already added to phonebook, replace the old number with a new one?')){
                const contact = persons.find(person => person.name === newName)
                const newContact = {...contact, phone: newPhone}
                contactService
                    .update(contact.id, newContact)
                    .then(updatedContact => {
                        setPersons(persons.map(person => person.id === contact.id ? updatedContact : person))
                        setNewName('')
                        setNewPhone('')
                    })
                    .catch(error => {
                        setNotification(`Contact '${newName}' was already removed from server. Error: ${error.message}`);
                        setTimeout(()=>{
                            setNotification(null)
                        }, 5000)
                        setNewName('')
                        setNewPhone('')
                    })
            }
        }else{
            contactService
            .create(person)
            .then(response => {
                setNotification(`${newName} is added to contacts successful`)
                setTimeout(()=>{
                    setNotification(null)
                }, 5000)
                setPersons(persons.concat(response))
                setNewName('')
                setNewPhone('')
            })
        }
    }

    return (
        <form>
            <div>Name: <input value={newName} onChange={handleName}/></div>
            <div>Number: <input value={newPhone} onChange={handlePhone}/></div>
            <div>
            <button type="submit" onClick={addName}>add</button>
            </div>
        </form>
    )
}

export default FormPerson
