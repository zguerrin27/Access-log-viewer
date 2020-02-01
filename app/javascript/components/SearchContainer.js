import React, { Component } from 'react'
import Search from './Search'
import Results from './Results'
import axios from 'axios'
import { Pagination, Container } from 'semantic-ui-react'

class SearchContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchTerm: "",
      searchIp: "",
      searchBrowser: "",
      search_results: [],
      loading: true,
      logs: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.loadInitialData()
  }

  loadInitialData() {
    axios.get("http://localhost:3000/load")
    .then((data)=> {
      console.log('FROM THE loadInitialData() **********', data)
      this.setState({
        loading: false,
        logs: data.data
      })
      console.log('FROM THE STATE AFTER THE LOAD', this.state.logs)
    })
    .catch((error)=>{
      error
    })
  }

  handleChange(e){
    const term = e.target.value;
    this.setState({
      [e.target.name]: term
    })
    axios.post("http://localhost:3000/search", {
      search: term
    })
    .then((data)=> {
      this.setState({
        search_results: [...data.data.requests]
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  handlePage = (e, props) => {
    axios.get("http://localhost:3000/load/?page=" + props.activePage)
    .then((data) => {
      this.setState({
        logs: data.data
      })
    })
  }

  // handlePage = (e, props) => {
  //   this.setState({
  //     loading: true
  //   })
  //   const url = "http://localhost:3000/load/?page=" + props.activePage
  //   fetch(url).
  //   then(res => res.json())
  //   .then(this.initialState)
  // }

  // async handlePage = (e, props) => {
  //   this.setState({
  //     loading: true
  //   })
  //   const url = "http://localhost:3000/load/?page=" + props.activePage
  //   let newData = await fetch(url);
  //   newData= await newData.json();
  //   this.loadInitialData(newData)
  // }



  render(){

    const logs = this.state.logs.requests ? this.state.logs.requests.map(log => <li key={log.id}>{log.ip}       {log.pword}       {log.userId}       {log.requestMethod}       {log.requestPath}       {log.requestProtocol}       {log.responseCode}       {log.responseSize}       {log.referrer}       {log.browser} </li>) : null 

    return(
      <Container>
        {logs}
        <Pagination 
          onPageChange={this.handlePage} 
          // size="mini" 
          siblingRange="6" 
          defaultActivePage={this.state.logs.page || 1}
          totalPages={this.state.logs.pages || 0} 
        />


         {/* <Search handleChange={this.handleChange}/> 
         <Results searchResults={this.state.search_results} /> */}
      </Container>
    )
  }
}

export default SearchContainer