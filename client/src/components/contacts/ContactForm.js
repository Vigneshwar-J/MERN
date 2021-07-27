import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/ContactContext';

export const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const {addContact, current, clearCurrent, updateContact} = contactContext;

    useEffect(() => {
        if(current !== null) {
            console.log(current)
            setContact(current)
            //We are setting current directly rather than each variable bcz current includes ID
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
             })
        }
    }, [contactContext, current])

    const [contact,setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name, email, phone, type} = contact

    const onChange =(event) => {
        setContact({ ...contact, [event.target.name] : event.target.value})
    }

    const onSubmit = (eve) => {
    eve.preventDefault();  
    console.log(contact)
    if(current === null) {
        addContact(contact);
    } else {
        updateContact(contact);
        clearCurrent();
    }
     setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
     })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current? 'Update Contact': 'Add Contact'}</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type ===  'personal'} onChange={onChange} /> Personal
            &nbsp;
            <input type='radio' name='type' value='professional' checked={type ===  'professional'} onChange={onChange} /> Professional
            <input type='submit' value={current? 'Update Contact': 'Add Contact'} className='btn btn-primary btn-block' />
            {current && (<button className='btn btn-dark btn-block' onClick={() => clearCurrent()}>Clear</button>)}
        </form>
    )
}
