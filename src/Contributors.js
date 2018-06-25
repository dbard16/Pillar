import React, { Component } from 'react';


class Contributors extends Component {

  constructor(){
    super();
    this.state = {
      summedContributions: []
    }
  }

  componentDidMount(){
    //similar to the looping of every repo, not thrilled with this either. If a contributor contributed in more than 1 repo, it wasn't being aggregated. So this basically creates a hash table, if it finds the ID, adds it up, then puts it back into array format for easy filtering later on. Not the most efficient, but does the job.
    //I also originally didn't have a constructor/state/componentDidMount but if I left this in the render, toggling views meant everything was being summed up over and over again, so putting it here keeps things cleaner in that regard.
   let temp = {};
   let obj = null;
   const contributors = this.props.location.state.contributors;
   for(let i=0; i < contributors.length; i++) {
    obj=contributors[i];

     if(!temp[obj.id]) {
      temp[obj.id] = obj;
     }
     else {
       temp[obj.id].contributions += obj.contributions;
     }
    }
    let summedContributions = [];
    for (let prop in temp)
    summedContributions.push(temp[prop]);
    this.setState({
      summedContributions
    })
  }
  render() {

    //Get the public members so we can compare contributors.
    const publicMembers = this.props.location.state.publicMembers.map(member => (
      member.id
    ));





    //This boolean will tell us if we should show internal contributors or external
     let internal = false;
     if(this.props.location.pathname ==="/internal"){
      internal = true;
     }
    let filteredArr;

    //filter the array based on the boolean above, then sort the array
    if(internal){
      filteredArr = (this.state.summedContributions.filter(user => publicMembers.includes(user.id) === true)).sort(function(a,b) {
        return b.contributions - a.contributions
      })
    }
    else{
      filteredArr = (this.state.summedContributions.filter(user => publicMembers.includes(user.id) === false)).sort(function(a,b) {
        return b.contributions - a.contributions
      })
    }

    return(
      <div>
      {/* Another simple ternary. If it's Internal, show an Internal header, otherwise External
      */}
        {internal ? <h2> Internal Contributors </h2> : <h2> External Contributors </h2>}
        <table className="table">
          <thead>
            <tr>
              <th> Name </th>
              <th> Contributions </th>
            </tr>
          </thead>
          <tbody>
            {filteredArr.map(user => (
              <tr key={user.id}>
                <td>
                  {user.login}
                </td>
                <td>
                  {user.contributions}
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
     )
  }
}

export default Contributors;
