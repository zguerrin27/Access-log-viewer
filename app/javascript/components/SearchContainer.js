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
      filters: [{ searchQuery: '', dropdownVal: '' }]  // uuid comes from modal
    };

  }

  // ===================================================================================

  // componentDidMount() {
  //   this.makeAJAXCall();                                                         // older code, wont work with pagination
  // }

  // async makeAJAXCall(page = 0) {
  //   const addedInfo = page === 0 ? "" : "?page=" + page;
  //   const url = "http://localhost:3000/load/" + addedInfo;
  //   const res = await axios.get(url);
  //   this.updateState(res)
  // }

  // ===================================================================================  //split for array => string for params 


  // componentDidMount() {  // res => state                                             // nicer code
  //   const res = this.search()
  //   this.updateState(res)
  // }

  // async search(page = 0) {    //  res => 
  //   const pageNum = page === 0 ? 0 : page;
  //   const params = { filters: this.state.filters, page: pageNum }
  //   const url = "http://localhost:3000/search/"
  //   const res = await this.makeAJAXCall({ url, search: params })
  //   return res
  // }

  // async makeAJAXCall({ url, search }){
  //   const res = await axios.post(url, { search });   // post to back end 
  //   return res;
  // }

  // ===================================================================================== // working with get


  componentDidMount() {
    this.loadData()
  }

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

  removeFilterinJumbotron = (e, filter) => {
    e.preventDefault()
    console.log("REMOVE CLIKED-FILTER IS: ", filter)
    const clickedFilterKey = filter.key

    this.setState((prevState) => ({
      filters: prevState.filters.filter(f => f.key !== clickedFilterKey)
    }))

    setTimeout(() => {      
      this.loadData()      
    }, 10)

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
    const filters = this.state.filters[0];
    const filtersInJumbotron = this.displayFiltersinJumbotron()


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

      <div>

        <SearchModal
          hoistFiltersFromModal={(e) => this.hoistFiltersFromModal(e)}
          search={() => this.loadData()}
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