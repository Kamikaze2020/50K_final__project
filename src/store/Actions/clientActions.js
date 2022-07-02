import axios from "axios";
import {ADD_CLIENT, GET_CLIENT, REMOVE_CLIENT} from "./typesActions";

const getClientAction = (payload) => ({type: GET_CLIENT, payload});
const addClientAction = (payload) => ({type: ADD_CLIENT, payload: payload.data});
const removeClientAction = (payload) => ({type: REMOVE_CLIENT, payload})

const apiEndPoint = 'http://localhost:5000/clients';


export const fetchClients = () => {
  return dispatch => {
    axios.get(apiEndPoint)
      .then(({data}) => {
        dispatch(getClientAction(data))
      }).catch(err => console.log(err))
  }
}

export const addClients = (data) => {
  return async (dispatch) => {
    await axios.post(apiEndPoint, data)
      .then(res => dispatch(addClientAction(res))
      ).catch(err => console.log(err))
  }
}

export const removeClients = (id) => {
  return (dispatch) => {
    return axios.delete(`${apiEndPoint}/${id}`)
      .then(() => dispatch(removeClientAction(id))
      ).catch(err => console.log(err))
  }
}
