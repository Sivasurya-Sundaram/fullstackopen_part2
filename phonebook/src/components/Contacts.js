const DisplayContacts=({contacts})=>{
    return(
        contacts.map((contact)=>
            <li key={contact.id}>{contact.name}---{contact.number}</li>)
    );
}
export default DisplayContacts