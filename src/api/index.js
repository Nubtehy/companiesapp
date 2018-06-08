import axios from 'axios';
const  apiPrefix="mysql://dog4wtomi2vl5w81:bkir20kv3ac0rr1q@n7qmaptgs6baip9z.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/poqjubfg0a4kskou";

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
