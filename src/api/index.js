import axios from 'axios';
const  apiPrefix="http://localhost:3000";

export default {
  parentCompanies(data){
    return axios.get(`${apiPrefix}/companies?parent=1`,data);
  },
  companiesList(data){
    return axios.get(`${apiPrefix}/companies`,data);
  },
  companyAdd(data){
    return axios.post(`${apiPrefix}/company`, data);
  },
  companyUpdate(data){
    return axios.put(`${apiPrefix}/company`, data);
  },
  companyDelete(id){
    return axios.delete(`${apiPrefix}/company/${id}`);
  }
}
