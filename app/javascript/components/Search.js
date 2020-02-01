import React, { Component } from 'react'

class Search extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="main-app-container">
        <h2>Search for Logs</h2><br/>
        <div className='from-group'>
          <h6>Search by I.P. here:</h6>
          <input onChange={this.props.handleChange} value={this.props.searchTerm} type='text' name="searchIp" placeholder='Ex: "83.149.9.216..."' className="field" /><br/><br/>

          <h6>Search by Browser here:</h6>
          <input onChange={this.props.handleChange} value={this.props.searchTerm} type='text' name="browser" placeholder='Ex: "Safari, Chrome..."' className="field" />
        </div>
      </div>
    )
  }
}

export default Search