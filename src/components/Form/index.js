import React,{ Component } from 'react'

class Form extends Component{
  constructor(props){
    super(props)
    this.state = {
      name: this.props.item? this.props.item.name : '',
      earnings: this.props.item? this.props.item.earnings : '',
      parent: this.props.item? this.props.item.parent : 0,
      id: this.props.item ? this.props.item.id : null,
      error: '',
      parentCompanies: this.props.parentCompanies ? this.props.parentCompanies : null,
    }
  }
  handleChange(e){
    this.setState({ name: e.target.value })
  }
  validate(e){
    const pattern = /^\d+$/;
    if (e.target.value == ''){
      this.setState({ earnings: e.target.value,error:'Field earnings shoud not be empy' })
    } else if (!pattern.test(e.target.value)){
     this.setState({ error: "Field earnings shoud be a number!"})
   } else{
     this.setState({ earnings: e.target.value,error:'' })
   }
  }
  handleChangeParent(e){
    this.setState({ parent: e.target.value })
  }
  saveCompany = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    const { name, earnings, parent, id } = this.state;
    if (name == '' || earnings == '' ){
      this.setState({ error: "Fields  shoud not be empty"})
      return false
    }
    const company = {
      name,
      earnings,
      parent,
      id
    }
    this.props.saveCompany(company);
    this.setState({
      parent: 0,
      name: '',
      earnings: 0,
      id: null
    })
  }
  render(){
    const {name, earnings,error, parentCompanies } = this.state
    return(
      <div>
        <div className="modal-container">

          <button className="close" onClick={this.props.closeModal}>x Close</button>
          <form>
            {
              error&&<div>{error}</div>
            }
            <div className="form-input">
              <label>Company name</label>
              <input type="text" value = {name} onChange={this.handleChange.bind(this)} placeholder="Company name"/>
            </div>
            <div className="form-input">
              <input type="text" value = {earnings} onChange={this.validate.bind(this)} placeholder="Company Estimated Earnings"/>
            </div>

            {

              parentCompanies&&<select name="" id="" onChange={this.handleChangeParent.bind(this)}>
                <option value="0">---</option>
                {
                  parentCompanies.map((parent,index)=>{
                    return <option value={parent.id} key={index}>{parent.name}</option>
                  })
                }

              </select>
            }
            <div className="form-input">
              <button className="green" onClick={this.saveCompany}>Save</button>
            </div>
          </form>
        </div>
        <div className="modal-wrapper">
        </div>
      </div>
    )
  }
}
export default Form
