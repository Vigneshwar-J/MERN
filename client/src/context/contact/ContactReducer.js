import ContactContext from "./ContactContext";
import ContactState from "./ContactState";

import { ADD_CONTACT, DELETE_CONTACT, SET_ALERT, REMOVE_ALERT, SET_CURRENT, UPDATE_CONTACT, CLEAR_CURRENT,FILTER_CONTACTS, CLEAR_FILTER } from '../types';

export default (state,action) => {
    switch(action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts:[...state.contacts, action.payload]
            }
            default:
                return state;
    }
}