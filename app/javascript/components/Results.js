import React, { Component } from 'react'

class Results extends Component {
  constructor(props){
    super(props)

  }

  render(){

    const searchResults = this.props.searchResults.map( result => <li key={result.id}>{result.ip}       {result.pword}       {result.userId}       {result.requestMethod}       {result.requestPath}       {result.requestProtocol}       {result.responseCode}       {result.responseSize}       {result.referrer}       {result.browser} </li> )

    console.log(searchResults)

    return(
      <div>
        <h3>
          Number of Logs Found: {searchResults.length} <br/>
        </h3>
        <div className="results">
          {searchResults}
        </div>
      </div>
    )
  }
}

export default Results