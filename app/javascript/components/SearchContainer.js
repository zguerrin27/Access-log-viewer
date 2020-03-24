import React, { Component } from "react";
import axios from "axios";
import SearchModal from './SearchModal';
import { FaRegTimesCircle } from "react-icons/fa";
import { Jumbotron } from "reactstrap";
import {
  Pagination,
  Container,
  Table,
} from "semantic-ui-react";


class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEllipsis: true,
      logs: [],
      modal: false,
      filters: [{ searchQuery: '', dropdownVal: '', modifier: '' }],  // uuid comes from modal
      paramsURLforBookmark: ''
    };

  }

  componentDidMount() {
    this.loadData()
  }

  // componentDidUpdate(){
  //   let url = this.state.paramsURLforBookmark 
  //   console.log("URL", url)
  //   let newUrl = url.replace('http://localhost:3000', '');
  //   console.log("NEW URL ", newUrl)                         // this is what needs to be added to http://localhost:3000
  //   // window.location.hash = newUrl;       
  //   console.log("SEARCH: ", window.location.search)
  //   console.log("ACTUAL PATH NAME: ", window.location.pathname)   
  // }

  loadData = (page = 0) => {
    const addedInfo = page === 0 ? "" : "?page=" + page;
    axios.get("http://localhost:3000/search/" + addedInfo, {
      params: {
        search: this.state.filters
      }
    })
    .then((res) => {
      this.updateState(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  hoistFiltersFromModal = (filters) => {    // gets state from modal then calls load to search db 
    this.setState({
      filters: filters 
    })
    setTimeout(() => {      // work around for timing the hoist of filters state from modal comp
      this.loadData()       // need to wait a milisecond for the setstate to update the load criteria in setstate line above
    }, 10)
  }

  updateState(res) {
    this.setState({
      logs: res.data,
      paramsURLforBookmark: res.request.responseURL
    });
  }

  clearFilterState = () => {
    this.setState({
      filters: [{ searchQuery: '', dropdownVal: '', modifier: '' }]
    })
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  removeFilterinJumbotron = (e, filter) => {
    e.preventDefault()
    const clickedFilterKey = filter.key
    this.setState((prevState) => ({
      filters: prevState.filters.filter(f => f.key !== clickedFilterKey)
    }))
    setTimeout(() => {      
      this.loadData()      
    }, 7)
  }

  displayFiltersinJumbotron = () => {
    const filters = this.state.filters;
    const filtersToBeDisplayed = filters.map(filter => (
      <p key={filter.key}> {filter.dropdownVal}: {filter.searchQuery} <FaRegTimesCircle onClick={(e) => this.removeFilterinJumbotron(e, filter)} /> </p>
    ))
    return filtersToBeDisplayed
  }

  render() {
    const { showEllipsis } = this.state;

    const logs = this.state.logs.requests
      ? this.state.logs.requests.map(log => (
        <tr key={log.id}>
          <td id="ip-td">{log.ip_address}</td>
          <td>{log.password}</td>
          <td id="userID-td">{log.user_id}</td>
          <td id="timestamp-td">{log.timestamp}</td>
          <td>{log.request_method}</td>
          <td id="path-td">{log.request_path}</td>
          <td>{log.request_protocol}</td>
          <td>{log.response_code}</td>
          <td>{log.response_size}</td>
          <td>{log.referrer}</td>
          <td id="browser-td">{log.browser}</td>
        </tr>
      ))
      : null;

    return (

      <div className="search-container">

        <SearchModal
          hoistFiltersFromModal={(e) => this.hoistFiltersFromModal(e)}
          search={() => this.loadData()}
          bookmarkURL={this.state.paramsURLforBookmark}
        />

        <Container className="pagination-container">
          <Pagination
            onPageChange={(e, props) => this.loadData(props.activePage)}
            size="large"
            siblingRange="1"
            defaultActivePage={this.state.logs.page || 1}
            ellipsisItem={showEllipsis ? undefined : null}
            totalPages={this.state.logs.pages || 0}
          />
        </Container>

        <div id="table-div" >
          <Table striped >
            <thead className="table-header" >
              <tr>
                <th>IP Address</th>
                <th>Password</th>
                <th>User ID</th>
                <th>Timestamp</th>
                <th>Request Method</th>
                <th>Request Path</th>
                <th>Request Protocol</th>
                <th>Response Code</th>
                <th>Response Size</th>
                <th>Referrer</th>
                <th>Browser</th>
              </tr>
            </thead>
            <tbody >
              {logs}
            </tbody>
          </Table>
        </div>

      </div>
    );
  }
}

export default SearchContainer;
