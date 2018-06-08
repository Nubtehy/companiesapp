import React, {Component} from 'react';
import Company from '../../components/Company'
import Form from '../../components/Form'

class Companies extends Component {
  constructor(props){
    super(props)
    this.state = {
      editCompany: null,
    }
  }
  renderRecursive = (companies)=>{
    let replies;
    if(companies.length){
      replies =
          <Companies
            companiesList={companies}
            className="child"
            editCompanyModal={ this.props.editCompanyModal }
            deleteCompany={ this.props.deleteCompany }
          />
    }
    return replies
  }
  deleteCompanyFromList = (item) =>{
    this.props.deleteCompany(item.id)
  }
  editCompanyModal = (item) =>{
    this.props.editCompanyModal(item)
  }
  render(){
    let  { companiesList, className } = this.props;
    return(
      <div className={className }>
        {
          companiesList.map((item, i) => {
            return <div key={item.id} className="company">
              <Company item={item}
                       deleteCompany={this.deleteCompanyFromList.bind(null, item)}
                       editCompany={this.editCompanyModal.bind(null, item)}
              />
              {
                item.companies&&this.renderRecursive(item.companies)
              }
            </div>
          })
        }
      </div>
    )
  }
}
export default Companies;
