import axios from 'axios';

export default {
  parentCompanies(data){
    return axios.get(`/companies?parent=1`,data);
  },
  companiesList(data){
    return axios.get(`/companies`,data);
  },
  companyAdd(data){
    return axios.post(`/company`, data);
  },
  companyUpdate(data){
    return axios.put(`/company`, data);
  },
  companyDelete(id){
    return axios.delete(`/company/${id}`);
  }
}
