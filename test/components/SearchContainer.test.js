import React from "react";
import axios from "axios";
import SearchContainer from "../../app/javascript/components/SearchContainer";

import { shallow, mount } from "enzyme";
import { configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import SearchModal from "../../app/javascript/components/SearchModal";
configure({ adapter: new Adapter() });

axios.defaults.adapter = require("axios/lib/adapters/http");

const nock = require("nock");

const FILTERS = {
  ip_address: "83.149.9.216"
}

const REQUEST1 = {
  ip: "83.149.9.216",
  pword: "-",
  userId: "-",
  timestamp: "12/12/12",
  requestMethod: "GET",
  requestPath: "/path/to/endpoint",
  requestProtocol: "HTTP/1.1",
  responseCode: "200",
  responseSize: "23456",
  referrer: "http://apple.com/secretHelicopter",
  browser: "Safari",
  fullRequest: "GET /path/to/endpoint HTTP/1.1",
  fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"
};


describe("SearchContainer Component", () => {

  beforeEach(() => {
    nock("http://localhost:3000")
      .get("/search/?search[]=%7B%22searchQuery%22:%22%22,%22dropdownVal%22:%22%22,%22modifier%22:%22%22%7D")               // ?search[]=%7B%22searchQuery%22:%22%22,%22dropdownVal%22:%22%22%7D 
      .reply(200, {
        data: {
          requests: [
            REQUEST1
          ],
          page: 1,
          pages: 1
        }
      });
  });

  it("checks if app makes AJAX request and sets initial logs state ",  (done) => {  //async?       // adding done keyword is very important with jest. tells jest that I want to have control over when the test finishes in the execution flow 
    const wrapper = shallow(<SearchContainer />);                                                  // mounts component
    const logsState = wrapper.state().logs;                                                        // initally the logs are empty 
    expect(logsState).toEqual([]);                                                                 // passes 
    setTimeout(() => {
      const logsState = wrapper.state();                                                           // after 1sec it checks state again 
      expect(logsState.logs.data.requests[0]).toEqual(REQUEST1)                                    // confirms that component mounted and makeAJAXCall was called 
      expect(logsState.logs.data.page).toEqual(1)                                                  // pagination test
      expect(logsState.logs.data.pages).toEqual(1)                                                 // pagination test 
      done();                                                                                      // finally call done to tell test to finish
    }, 1000)
  });

  it("checks if Modal Container renders", (done) => {                 //async?       
    setTimeout(() => {
      const wrapper = mount(<SearchContainer />);                            
      expect(wrapper.find('.main-modal-container').exists()).toEqual(true)
      done();    
      // wrapper.unmount()                                                      
    }, 1000)
  });

  it("checks if Pagination renders", (done) => {                     //async?
    setTimeout(() => {
      const wrapper = mount(<SearchContainer />);
      expect(wrapper.find('.pagination-container').exists()).toEqual(true)
      // wrapper.unmount()
      done();
    }, 1000)
  });

  it("checks if Main Table renders", (done) => {                    //async?
    setTimeout(() => {
      const wrapper = mount(<SearchContainer />);
      expect(wrapper.find('#table-div').exists()).toEqual(true)
      // wrapper.unmount()
      done();
    }, 1000)
  });


  it("checks to see if SearchContainer component renders", (done) => {  //async?
    setTimeout(() => {
      const wrapper = mount(<SearchContainer />);  
      expect(wrapper.find(".search-container").exists()).toEqual(true)  
      // wrapper.unmount()
      done();        
    }, 1000)                                              
  });



  it("checks to see if the update button make an AJAX call with given data, and update log state", (done) => {
    const wrapper = mount(<SearchContainer />)
    const modalBtn = wrapper.find("button.modal-button-1")
    modalBtn.simulate('click')  // open searchmodal
    const dropdownBtn = wrapper.find("InputGroupButtonDropdown")
    dropdownBtn.simulate('click') // open dropdownVal 
    const dropdownSelection = wrapper.find("DropdownItem.dropdown-ITEM").at(0)
    dropdownSelection.simulate('click')  // select IP Address
    const input = wrapper.find('Input input#input-bar');
    input.simulate('focus');
    input.simulate('change', { target: { value: '83.149.9.216' } }) // fill input area with ip address to be searched
    const updateBtn = wrapper.find("Button button.search-button")
    updateBtn.simulate('click')  // search for new results
    let key = wrapper.state().filters[0].key  // grab newly generated uuid / key and save to key var for nock
    nock("http://localhost:3000")
      .get("/search/?search[]=%7B%22searchQuery%22:%2283.149.9.216%22,%22dropdownVal%22:%22ip_address%22,%22dropdownLabel%22:%22+IP+Address+%22,%22modifier%22:%22%22,%22key%22:%22" + key + "%22%7D")            
      .reply(200, {
        data: {
          requests: [
            REQUEST1
          ],
          page: 1,
          pages: 1
        }
      });
    setTimeout(()=> {                                                                    // we need the timeout to allow for the update state method to be called etc 
      expect(wrapper.state().logs.data.requests[0]).toEqual(REQUEST1)                    // this asserts that the nock was hit and returned the correct information                     
      expect(wrapper.state().logs.data.page).toEqual(1)                                                  
      expect(wrapper.state().logs.data.pages).toEqual(1) 
      done()
    }, 1000)
  })




  it("IDK why i need this", (done) => {   //async? everything fails without this timeout....
    setTimeout(() => {
      done();
    }, 1000)
  });

});
