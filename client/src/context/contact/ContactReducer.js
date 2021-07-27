import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, CLEAR_CONTACTS, CONTACT_ERROR, SET_CURRENT, UPDATE_CONTACT, CLEAR_CURRENT,FILTER_CONTACTS, CLEAR_FILTER } from '../types';

export default (state,action) => {
    switch(action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts:action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts:[action.payload, ...state.contacts],
                loading: false
            }
            case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            }
            case CONTACT_ERROR:
                return {
                    ...state,
                    error:[...state.contacts, action.payload],
                    loading: false
                }
            case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            }
            case CLEAR_CURRENT:
                return {
                    ...state,
                    current: null,
                    loading: false
                }
                case CLEAR_CONTACTS:
                    return {
                        ...state,
                    contacts: [],
                    current: null,
                    filtered: null,
                    loading: false
                    }
            case UPDATE_CONTACT:
                return {
                    ...state,
                    contacts: state.contacts.map((contact) => (contact._id === action.payload._id
                    ? action.payload : contact)
                    ),
                    loading: false
                }
            case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => 
                {
                    let re = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(re) || contact.email.match(re)
                }),
                loading: false
            }
                case CLEAR_FILTER:
                    return {
                        ...state,
                        filtered: null,
                        loading: false
                    }
            default:
                return state;
    }
}