import axios from "axios";
import {addClientAction, getClientAction, removeClientAction} from "../clientReducer";

const apiEndPoint = 'http://localhost:5000/clients';

// export const searchClient = (text) => {
//   return dispatch => {
//     dispatch(searchClientAction(text))
//   }
// }

export const fetchClients = () => {
  return dispatch => {
    axios.get(apiEndPoint)
      .then(({data}) => {
        dispatch(getClientAction(data))
      })
  }
}

export const addClients = (data) => {
  return async (dispatch) => {
    await axios.post(apiEndPoint, data).then(res => dispatch(addClientAction(res)))
  }
}

export const removeClients = (id) => {
  return  (dispatch) => {
     return axios.delete(`${apiEndPoint}/${id}`)
       .then(() => dispatch(removeClientAction(id)))
  }
}