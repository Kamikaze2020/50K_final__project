const initialState = {
  clients: []
};

const ADD_CLIENT = 'ADD_CLIENT';
const GET_CLIENT = 'GET_CLIENT';
const REMOVE_CLIENT = 'REMOVE_CLIENT';

export const clientReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_CLIENT:
      return {...state, clients: [...state.clients, ...payload]}
    case ADD_CLIENT:
      return {...state, clients: [...state.clients, payload]}
    case REMOVE_CLIENT:
      return {...state, clients: state.clients.filter(client => client.id !== payload)}
    default:
      return state;
  }
};

export const getClientAction = (payload) => ({type: GET_CLIENT, payload});
export const addClientAction = (payload) => ({type: ADD_CLIENT, payload:payload.data});
export const removeClientAction = (payload) => ({type: REMOVE_CLIENT, payload})