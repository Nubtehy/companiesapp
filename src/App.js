import React, { Component } from 'react';
import './App.css';
import Companies from './views/Companies';
import Company from './components/Company';
import { loadCompanies, createCompany, editCompany, deleteCompany, parentCompanies} from './action/actions'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from './components/Form';

const FourOhFour = () => <h1>404</h1>
class App extends Component {
  constructor (props) {
    super(props)
    this.state =  {
      companiesList: [],
      showModal: false,
      showItem: null,
      parentCompanies: []
    }
  }
  componentDidMount(){
    this.props.getList();
    this.props.getParentCompanies();
  }
  hideModal = ()=>{
    this.setState({showItem: null, showModal: false})
  }
  editCompany = (item) =>{
    this.setState({showItem: item, showModal: true})
  }
  addCompany = () =>{
    this.setState({showItem: null, showModal: true})
  }
  saveCompany = (company) =>{
    if (company.id){
      this.props.editCompany(company);
    } else {
      this.props.addCompany(company);
    }
    this.hideModal();
  }
  deleteCompany = (id) =>{
    this.props.deleteCompany(id)
  }
  render() {
    const { companies, parentCompanies } = this.props.companies? this.props : this.state;
    const { showModal, showItem } = this.state
    return (
      <div className="App">
        {
          <button className="addCompany green" onClick={this.addCompany}>Add Company</button>
        }
        {
          companies &&
          <Switch>
            <Route exact path='/' render={ () =>
              <Companies companiesList={ companies }
                         editCompanyModal={ this.editCompany }
                         deleteCompany={ this.deleteCompany }
                         className="parent"
              />
            } />
            <Route component={ FourOhFour }/>
          </Switch>
        }
        {
          showModal &&
          <Form
            item = {showItem}
            saveCompany = { this.saveCompany}
            closeModal = {this.hideModal}
            parentCompanies = {parentCompanies}
          />
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {

  return {
    companies: state.default.companies,
    parentCompanies: state.default.parentCompanies
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getList: () => {
      dispatch(loadCompanies())
    },
    addCompany: (item) => {
      dispatch(createCompany(item))
    },
    editCompany: (item) => {
      dispatch(editCompany(item))
    },
    deleteCompany: (item) => {
      dispatch(deleteCompany(item))
    },
    getParentCompanies: () =>{
      dispatch(parentCompanies())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
