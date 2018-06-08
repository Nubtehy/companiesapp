import actionType from "../action/actionType";
import objectAssign from 'object-assign';
const defaultitems = {
  addNewCompany: false,
  companies: null,
  parentCompanies: null,
  loading: false,
  showModal: false
}

export default function (state = defaultitems, action) {

  switch (action.type){
    case actionType.LOAD_COMPANIES_SUCCESS:
      return objectAssign({}, state,
          {
            companies: action.companies,
          },
          {
            loading: action.loading
          }
        )
    case actionType.LOAD_PARENTSCOMPANIES_SUCCESS:
      return objectAssign({}, state,
          {
            parentCompanies: action.parentCompanies,
          },
          {
            loading: action.loading
          }
        )
    case actionType.SHOW_MODAL:
      return objectAssign({}, state,
          {
            showModal: action.data
          }
        )
    default:
      return state
  }
}
