import React, {useContext, useEffect, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactContext from '../../context/contact/ContactContext';
import { ContactItem } from './ContactItem';
import { Spinner } from '../layout/Spinner';

export const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered, GetContacts, loading} = contactContext;

    useEffect(() => {
       GetContacts();
       //eslint-disable-next-line
    }, [])

    if(contacts.length === 0) {
        return <h4>Add a Contact </h4>
    }

    return (
        <Fragment>
            {contacts !== [] && !loading ? (<TransitionGroup>
            {filtered !== null ? filtered.map((contact) => (
                    <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                <ContactItem contact = {contact} />
                </CSSTransition>
            )) : contacts.map((contact) => (
                <CSSTransition
                key={contact._id}
                timeout={500}
                classNames="item"
              >
                <ContactItem contact = {contact} />
            </CSSTransition>
            )) }
            </TransitionGroup>
) : <Spinner />}
                    </Fragment>
    )
}
