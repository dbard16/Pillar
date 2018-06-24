import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CompanySearch from './CompanySearch';
import axios from 'axios';

class CompanyDetail extends Component {

  constructor(){

    super();
    this.state= {
      name: '',
      repos: [],
      contributors:[]
    }
    this.searchCompany = this.searchCompany.bind(this);
  }

  searchCompany(name){
    // axios.get(`https://api.github.com/orgs/${name}/repos?per_page=100`)
    // .then(res => res.data)
    // .then(repos => this.setState({
    //   name,
    //   repos
    // }))


    // this.setState({
    //   name
    // })
        const fakeRepos = [
    {
      id: 1,
      name: 'bob',
      stars: 15,
      forks: 28,
      contributors: 3
    },
    {
      id: 2,
      name: 'Tony',
      stars: 4,
      forks: 40,
      contributors: 11
    },
        {
      id: 3,
      name: 'Sam',
      stars: 18,
      forks:1,
      contributors: 25
    }
    ]
    this.setState({
      repos:fakeRepos,
      name: name
    })
  }

  render(){
    console.log(this.state);
    return(
      <div>

        <CompanySearch searchCompany={this.searchCompany}/>
        <h4> {this.state.name} </h4>
        {this.state.name !== '' ?
        <nav className="navbar navbar-expand-sm">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to={{ pathname: `/repos`, state: {repos:this.state.repos} }} > Repos </Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/internal`}> Internal Contributors </Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/external`}> External Contributors </Link></li>
          </ul>
        </nav>
        : <div></div>

        }
      </div>
    )

  }
}

export default CompanyDetail;
