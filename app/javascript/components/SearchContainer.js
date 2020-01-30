import React, { Component } from 'react'
import Search from './Search'
import Results from './Results'
import NavBar from './NavBar'
import axios from 'axios'

class SearchContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchTerm: "",
      search_results: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    const term = e.target.value;
    this.setState({
      [e.target.searchTerm]: term
    })
    axios.post("http://localhost:3000/search", {
      search: term
    })
    .then((data)=> {
    // console.log(data)
    this.setState({
      search_results: [...data.data.requests]
    })
      console.log(this.state.search_results)
    })
    .catch((data)=>{
      debugger
    })
  }

  render(){
    return(
      <div>
        <NavBar/>
        <Search handleChange={this.handleChange}/>
        <Results searchResults={this.state.search_results} />
      </div>
    )
  }
}

export default SearchContainer