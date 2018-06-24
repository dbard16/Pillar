import React, { Component } from 'react';

class Repos extends Component {

  constructor(){
    super();
    this.state= {
      stars: true,
      forks: false,
      contributors: false
    }
    this.setStars = this.setStars.bind(this);
    this.setForks = this.setForks.bind(this);
    this.setContributors = this.setContributors.bind(this);

  }

  setStars(){
    this.setState({
      stars: true,
      forks: false,
      contributors: false
    })
  }
  setForks(){
    this.setState({
      stars: false,
      forks: true,
      contributors: false
    })
  }
  setContributors(){
    this.setState({
      stars: false,
      forks: false,
      contributors: true
    })
  }

  render(){
    const repos = this.props.location.state.repos
    let sortedRepos;
    if(this.state.stars){
      sortedRepos = repos.sort(function(a,b) {
        return b.stars - a.stars
      })
    }
    else if(this.state.forks){
       sortedRepos = repos.sort(function(a,b) {
        return b.forks - a.forks
      })
    }
    else{
       sortedRepos = repos.sort(function(a,b) {
        return b.contributors - a.contributors
      })
    }
    console.log(sortedRepos)
    return(
      <div>
        <nav className="navbar navbar-light navbar-expand-sm">
          <div className="navbar-brand"> Sort Options </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a onClick={this.setStars} className="nav-link"> Stars
              </a>
            </li>

            <li className="nav-item">
              <a onClick={this.setForks} className="nav-link"> Forks </a>
            </li>

            <li className="nav-item">
              <a onClick={this.setContributors} className="nav-link"> Contributors </a>
            </li>
          </ul>
        </nav>

        <table className="table">
          <thead>
            <tr>
              <th> Name </th>
              <th> Stars </th>
              <th> Forks </th>
              <th> Contributors </th>
            </tr>
          </thead>
          <tbody>
            {sortedRepos.map(repo => (
              <tr key={repo.id}>
                <td>
                  {repo.name}
                </td>
                <td>
                  {repo.stars}
                </td>
                <td>
                  {repo.forks}
                </td>
                <td>
                  {repo.contributors}
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Repos;
