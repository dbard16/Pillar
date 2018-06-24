import React, { Component } from 'react';

class CompanySearch extends Component {

  constructor(){
    super();
    this.state = {
      input: ''
    }
    this.updateInput = this.updateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateInput(ev){
    this.setState({
      input:ev.target.value
    })
  }

  handleSubmit(ev){
    ev.preventDefault();
    this.props.searchCompany(this.state.input)
    this.setState({
      input: ''
    })
  }

  render() {
    const handleSubmit = this.handleSubmit
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <h4> Enter Company Name</h4>
            <input className='form-control' type='text' value={this.state.input} onChange={this.updateInput} />
            <button type="submit" className="btn btn-success"> Search </button>
          </div>

        </form>
      </div>
    )
  }

}

export default CompanySearch;
