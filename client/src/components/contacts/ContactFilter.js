import React, {useContext, useRef} from 'react';
import ContactContext from '../../context/contact/ContactContext';

export const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts, clearFilter, filtered } = contactContext;
    const text = useRef();

    const onChange = (eve) => {
        if(text.current.value !== '') {
             filterContacts(eve.target.value)
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    )
}
