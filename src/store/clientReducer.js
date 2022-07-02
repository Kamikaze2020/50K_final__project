import {ADD_CLIENT, GET_CLIENT, REMOVE_CLIENT} from "./Actions/typesActions";

const initialState = {
  clients: [],
  loading: true,
};

export const clientReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_CLIENT:
      return {
        ...state,
        clients: [...state.clients, ...payload],
        loading: false,
      }
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, payload],
      }
    case REMOVE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== payload),
        loading: false,
      }
    default:
      return state;
  }
};