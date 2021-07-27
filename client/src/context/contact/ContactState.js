import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, CLEAR_CONTACTS, CONTACT_ERROR, SET_CURRENT, UPDATE_CONTACT, CLEAR_CURRENT,FILTER_CONTACTS, CLEAR_FILTER } from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts : [],
        current: null,
        filtered: null,
        error: null,
        loading: true
    }
    const [state,dispatch] = useReducer(ContactReducer, initialState);

// GET_CONTACTS
const GetContacts = async () => {
    try {
        const res = await axios.get('/api/contacts')
        dispatch({type: GET_CONTACTS, payload:res.data })
    } catch (error) {
        dispatch({ type:CONTACT_ERROR, payload:error.response.data.msg})
    }
    // contact._id = uuidv4();
}

    // ADD_CONTACT
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({type: ADD_CONTACT, payload:res.data })
        } catch (error) {
            dispatch({ type:CONTACT_ERROR, payload:error.response.data.msg})
        }
        // contact._id = uuidv4();
    }

    // DELETE_CONTACT
    const deleteContact = async (id) => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`)
            dispatch({ type:DELETE_CONTACT, payload:id })
        } catch (error) {
            dispatch({ type:CONTACT_ERROR, payload:error.response.data.msg})
        }
    }

    // SET_CURRENT CONTACT
    const setCurrent = (current) => {
        dispatch({type: SET_CURRENT, payload:current })
    }

    // CLEAR_CURRENT CONTACT
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT })
    }

    //CLEAR_CONTACTS
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS })
    }

    // UPDATE_CONTACT
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            console.log("put", res.data)
            dispatch({ type:UPDATE_CONTACT, payload:res.data })
        } catch (error) {
            dispatch({ type:CONTACT_ERROR, payload:error.response.data.msg})
        }
    }
    
    // FILTER_CONTACTS
    const filterContacts = (text) => {
        dispatch({type: FILTER_CONTACTS, payload:text })
    }

    // CLEAR_FILTER
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER })
    }


    return (
        <ContactContext.Provider value = {{ contacts:state.contacts, current:state.current, filtered:state.filtered, error:state.error, GetContacts, addContact, deleteContact, setCurrent, clearCurrent, updateContact, filterContacts, clearFilter, clearContacts }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
