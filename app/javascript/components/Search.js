import React, { Component } from 'react'

class Search extends Component {
  constructor(props){
    super(props)


  }

  render(){
    return(
      <div>
        <h1>Search for Logs here</h1>
        <div className='from-group'>
          <label>Search for an Access Log</label><br />
          <input onChange={this.props.handleChange} value={this.props.searchTerm} type='text' name="name" placeholder='Ex: "Safari, Mozilla..."' className="field" />
        </div>
      </div>
    )
  }
}

export default Search