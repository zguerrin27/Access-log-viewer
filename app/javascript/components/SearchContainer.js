import React, { Component } from "react";
import Search from "./Search";
import Results from "./Results";
import axios from "axios";
import { Pagination, Container, Icon } from "semantic-ui-react";

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      searchIp: "",
      searchBrowser: "",
      search_results: [],
      showEllipsis: true,
      logs: []
    };

    // this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   this.loadInitialData();
  // }

  // loadInitialData() {
  //   axios
  //     .get("http://localhost:3000/load")
  //     .then(data => {
  //       this.setState({
  //         logs: data.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // handlePage = (e, props) => {
  //   axios
  //     .get("http://localhost:3000/load/?page=" + props.activePage)
  //     .then(data => {
  //       this.setState({
  //         logs: data.data
  //       });
  //     });
  // };

  // ===================================================================================

  componentDidMount() {
    // console.debug("0");
    this.makeAJAXCall();
    // console.debug("2");
  }

  async makeAJAXCall(page = 0) {
    console.debug("1");
    const addedInfo = page === 0 ? "" : "?page=" + page;
    const url = "http://localhost:3000/load/" + addedInfo;
    // console.debug(url);
    const res = await axios.get(url);
    // console.debug("3");
    this.updateState(res);
  }

  updateState(data) {
    // console.log("DATA:", data.data);
    this.setState({
      logs: data.data
    });
  }




  //test that state is being changed correctly

  // SEARCH FEATURE

  // handleChange(e){
  //   axios.post("http://localhost:3000/search", {
  //     // search_for: ''
  //     search: e.target.value
  //   })
  //   .then((data)=> {
  //     this.setState({
  //       search_results: [...data.data.requests]
  //     })
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // }

  render() {
    const showEllipsis = this.state;

    const logs = this.state.logs.requests
      ? this.state.logs.requests.map(log => (
        <li key={log.id}>
          {log.ip} {log.pword} {log.userId} {log.requestMethod}{" "}
          {log.requestPath} {log.requestProtocol} {log.responseCode}{" "}
          {log.responseSize} {log.referrer} {log.browser}{" "}
        </li>
      ))
      : null;

    return (
      <Container className="main-content">
        {/* <Search handleChange={this.handleChange}/> 
        <Results searchResults={this.state.search_results} /> */}

        <Container className="pagination-container">
          <Pagination
            // onPageChange={this.handlePage}
            onPageChange={(e, props) => this.makeAJAXCall(props.activePage)}
            size="large"
            siblingRange="1"
            defaultActivePage={this.state.logs.page || 1}
            ellipsisItem={showEllipsis ? undefined : null}
            totalPages={this.state.logs.pages || 0}
          />
        </Container>

        <div className="logs-container">{logs}</div>
      </Container>
    );
  }
}

export default SearchContainer;
