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
      publicMembers: [],
      contributors: []

    }
    this.searchCompany = this.searchCompany.bind(this);
  }

  searchCompany(name){
    let allRepos;
    let allPublic;
    //clears out the contributors for any new searches since below the aggregation of contributors is being appended to the current state
    this.setState({
      contributors: []
    })

    //First get all the repos of the name put in and all the public members
    Promise.all([axios.get(`https://api.github.com/orgs/${name}/repos`),  axios.get(`https://api.github.com/orgs/${name}/public_members`)])
    .then(res=> {
      allRepos= res[0].data
      allPublic= res[1].data
      return allRepos
    })

    //There's no contributors count for the repo, so this loops through each repo and adds it as a key on each repo object which eventually the state gets set to

    .then(repos =>{
     for(var i = 0; i < repos.length; i++){
      let counter = i;
      axios.get(`https://api.github.com/repos/${name}/${repos[i].name}/contributors?per_page=100`)
      .then(res => res.data)
      .then(contrs => {
        allRepos[counter].totContributors = contrs.length
        //this setState below is... not great, but when I tried pushing to a temp array to then set later, the setState was async and would run before the array would be populated. In the end I decided rather than loop through again in the Contributors component, I would do it this way. Not thrilled with it though.
        this.setState({
          contributors: [...this.state.contributors, ...contrs]
        })

      })
     }

    })
    .then(() =>{

      //at the end, we have a name, all the repos, and public members which will be used in the Contributors Component
      this.setState({
        name,
        repos: allRepos,
        publicMembers: allPublic
      })
    })

  }

  render(){
    return(
      <div>

        <CompanySearch searchCompany={this.searchCompany}/>
        <h4> {this.state.name} </h4>
        {this.state.name !== '' ?
        <nav className="navbar navbar-expand-sm">
          <ul className="navbar-nav">
          {/* passing props down with a Link is a bit tricky/tedious, but same idea as passing props normally in React with components
          */}
            <li className="nav-item"><Link className="nav-link" to={{ pathname: `/repos`, state: {repos:this.state.repos} }} > Repos </Link></li>

            <li className="nav-item"><Link className="nav-link" to={{pathname: `/internal`, state: {publicMembers: this.state.publicMembers, contributors: this.state.contributors} }}> Internal Contributors </Link></li>

            <li className="nav-item"><Link className="nav-link" to={{pathname: `/external`, state: {publicMembers: this.state.publicMembers, contributors: this.state.contributors} }}> External Contributors </Link></li>

          </ul>
        </nav>
        //I didn't want the options to show if nothing had been put in, so I put in this ternary operator. If there's no name, just show an empty div.
        : <div></div>

        }
      </div>
    )

  }
}

export default CompanyDetail;
