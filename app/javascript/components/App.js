import React, { Component } from "react";
import SearchContainer from "./SearchContainer";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";                        // because I used Webpacker i can do imports like this. But they stop the test unless you build a workout in package.json file 
import "semantic-ui-css/semantic.min.css";
import 'antd/dist/antd.css';


const csrfToken = document.querySelector('[name="csrf-token"]')        
if ( csrfToken ){                                                      // without the If statement this stopped the test from running. The test environment wont get that token. So you need to allow code to run in test env withut csrf token 
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken.content;   // grab content after token if/is found  
}


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