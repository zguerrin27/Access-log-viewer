import React, { Component } from "react";
import axios from "axios";
import SearchModal from './SearchModal';
import {
  Pagination,
  Container,
  Icon,
} from "semantic-ui-react";

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      search_results: [],
      showEllipsis: true,
      logs: [],
      modal: false
    };


  }

  // componentDidMount() {
  //   this.loadInitialData();
  // }
  // loadInitialData() {
  //   axios
  //     .get("http://localhost:3000/load")    // this is the old way of doing this. It isnt functional programming.
  //     .then(data => {                       // I refactored this in the section directly below 
  //       this.setState({                     //
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
    this.makeAJAXCall();
  }

  async makeAJAXCall(page = 0) {
    const addedInfo = page === 0 ? "" : "?page=" + page;
    const url = "http://localhost:3000/load/" + addedInfo;
    const res = await axios.get(url);
    this.updateState(res);
  }

  updateState(data) {
    this.setState({
      logs: data.data
    });
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const showEllipsis = this.state;

    const logs = this.state.logs.requests
      ? this.state.logs.requests.map(log => (
        <li key={log.id}>
          {log.ip_address} {log.password} {log.user_id} {log.request_method}{" "}
          {log.request_path} {log.request_protocol} {log.response_code}{" "}
          {log.response_size} {log.referrer} {log.browser}{" "}
        </li>
      ))
      : null;

    return (
      <Container className="main-content">

        <SearchModal

        />


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

        <div className="logs-container">
          {logs}
        </div>
      </Container>
    );
  }
}

export default SearchContainer;
