const Display = ({contacts, search, deleteContact}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {contacts.filter(contact => contact.name.toLowerCase().includes(search))
                         .map(contact => <li key={contact.name}>
                                            {contact.name}: {contact.number}
                                            <button onClick={() => deleteContact(contact.id)}>delete</button>
                                         </li>
                )}
            </ul>
        </>
    )
}

export default Display