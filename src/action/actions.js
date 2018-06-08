import api from '../api';
import actionType from './actionType';

export function createCompany (item) {
  return function (dispatch) {
    return api.companyAdd(item).then((data)=>{
      return data
    }).then((data)=>{
      dispatch(loadCompanies ())
      dispatch(parentCompanies())
    }).catch(error => {
      alert(error); // Error: Not Found
    });
  }
}

export function editCompany (item) {
  return function (dispatch) {
    return api.companyUpdate(item).then((data)=>{
      console.log(data)
      return data
    }).then(()=>{
      dispatch(loadCompanies ())
      dispatch(parentCompanies())
    }).catch(error => {
      alert(error); // Error: Not Found
    });
  }
}

export function loadCompanies () {
  return function (dispatch) {
    return api.companiesList({parent:1}).then((data)=>{
      dispatch({
        type: actionType.LOAD_COMPANIES_SUCCESS,
        companies: data.data
      })
    }).catch(error => {
      alert(error); // Error: Not Found
    });
  }
}
export function parentCompanies () {
  return function (dispatch) {
    return api.parentCompanies().then((data)=>{
      dispatch({
        type: actionType.LOAD_PARENTSCOMPANIES_SUCCESS,
        parentCompanies: data.data
      })
    }).catch(error => {
      alert(error); // Error: Not Found
    });
  }
}

export function deleteCompany (id) {
  return function (dispatch) {
    return api.companyDelete(id).then((data)=>{
      dispatch({
        type: actionType.LOAD_COMPANIES_SUCCESS
      })

    }).then(()=>{
      dispatch(loadCompanies ())
      dispatch(parentCompanies())
    }).catch(error => {
      alert(error); // Error: Not Found
    });
  }
}
