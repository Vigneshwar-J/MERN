import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_ALERT, REMOVE_ALERT, SET_CURRENT, UPDATE_CONTACT, CLEAR_CURRENT,FILTER_CONTACTS, CLEAR_FILTER } from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts : [
            {
                id: 1,
                name: 'Vigneshwar',
                email: 'viki@gmail.com',
                phone: '9566201180',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Rajini',
                email: 'ssrk@gmail.com',
                phone: '10000',
                type: 'professional'
            },
        ]
    }
    const [state,dispatch] = useReducer(ContactReducer, initialState);

    // ADD_CONTACT
    const addContact = (contact) => {
        contact.id = uuid;
        dispatch({type: ADD_CONTACT, payload:contact })
    }

    // DELETE_CONTACT


    // SET_CURRENT CONTACT


    // CLEAR_CURRENT CONTACT


    // UPDATE_CONTACT


    // FILTER_CONTACTS


    // CLEAR_FILTER

    return (
        <ContactContext.Provider value = {{ contacts:state.contacts, addContact }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
