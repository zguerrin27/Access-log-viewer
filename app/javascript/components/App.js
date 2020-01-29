import React, { Component } from 'react'
import SearchContainer from './SearchContainer'
import axios from 'axios'


const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class App extends Component {
  render(){
    return(
      <div>
        <SearchContainer />
      </div>
    )
  }
}

export default App