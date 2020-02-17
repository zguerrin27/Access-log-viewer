import React, { Component } from "react";
import SearchContainer from "./SearchContainer";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import 'antd/dist/antd.css';

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

class App extends Component {
  render() {
    return (
      <div className="body">
        <NavigationBar />
        <SearchContainer />
      </div>
    );
  }
}

export default App;
