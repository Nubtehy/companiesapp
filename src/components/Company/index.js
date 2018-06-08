import React, {Component}  from 'react';

class Company extends Component{
  render(){
    const { editCompany, deleteCompany } =  this.props
    return (
      <div>
        {this.props.item.name} | {this.props.item.earnings}$
        {this.props.item.totalSum !== this.props.item.earnings ? ` | ${this.props.item.totalSum}$` : ''}
        <button className="orange" onClick={ editCompany }>Edit</button>
        <button onClick={ deleteCompany }>Delete</button>
      </div>
    )
  }
}
export default Company;
