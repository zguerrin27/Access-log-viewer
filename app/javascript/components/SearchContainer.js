import React, { Component } from "react";
import axios from "axios";
import uuid from 'react-uuid'
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
      showEllipsis: true,
      logs: [],
      modal: false,
      filters: [{ searchQuery: '', dropdownVal: '' }]  // uuid comes from modal
    };

  }

  // componentDidMount() {
  //   this.loadInitialData();         // older older code lol
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

  // componentDidMount() {
  //   this.makeAJAXCall();                                                         // older code
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


  hoistFiltersFromModal = (filters) => {
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


  render() {
    const { showEllipsis } = this.state;

    const logs = this.state.logs.requests
      ? this.state.logs.requests.map(log => (
        <li key={log.id}>
          {log.ip_address} {log.password} {log.user_id} {log.timestamp} {log.request_method}{" "}
          {log.request_path} {log.request_protocol} {log.response_code}{" "}
          {log.response_size} {log.referrer} {log.browser}{" "}
        </li>
      ))
      : null;

    return (
      <Container className="main-content">

        <SearchModal
          hoistFiltersFromModal={(e) => this.hoistFiltersFromModal(e)}
          search={() => this.loadData()}
        />

        <Container className="pagination-container">
          <Pagination
            // onPageChange={this.handlePage}
            // onPageChange={(e, props) => this.makeAJAXCall(props.activePage)}
            onPageChange={(e, props) => this.loadData(props.activePage)}
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
