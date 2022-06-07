import axios from "axios";
import {addClientAction, getClientAction, removeClientAction} from "../clientReducer";

const apiEndPoint = 'http://localhost:5000/clients';

export const fetchClients = () => {
  return dispatch => {
    axios.get(apiEndPoint)
      .then(({data}) => {
        console.log('FETCH:', data)
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
  return async (dispatch) => {
    await axios.delete(`${apiEndPoint}/${id}`).then(res=>dispatch(removeClientAction(res)))
  }
}