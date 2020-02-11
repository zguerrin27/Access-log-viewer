import React from "react";
import axios from "axios";
import SearchContainer from "../../app/javascript/components/SearchContainer";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

axios.defaults.adapter = require("axios/lib/adapters/http");

const nock = require("nock");

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

  it("checks if app makes AJAX request and sets state ", async (done) => {  //adding done keyword is very important with jest. tells                                                                                 jest that I want to have control over when the test                                                                                    finishes in the execution flow
    nock("http://localhost:3000")
      .get("/load/")
      .reply(200, {
        data: {
          requests: [
            REQUEST1
          ],
          page: 1,
          pages: 1
        }
      });

    const wrapper = shallow(<SearchContainer />);       // mounts component
    const logsState = wrapper.state().logs;             // initally the logs are empty 
    expect(logsState).toEqual([]);                      // passes 
    setTimeout(() => {
      const logsState = wrapper.state().logs;                  // after 1sec it checks state again 
      expect(logsState.data.requests[0]).toEqual(REQUEST1)     // confirms that component mounted and makeAJAXCall was called 
      expect(logsState.data.page).toEqual(1)                   // pagination test
      expect(logsState.data.pages).toEqual(1)                  // pagination test 
      expect(wrapper.find('.main-content'))
      expect(wrapper.find('.pagination-container'))
      expect(wrapper.find('.logs-container'))
      done();                                                  // finally call done to tell test to finish
    }, 1000)

  });


  it("checks if each component renders", async (done) => {   // adding done keyword is very important with jest. tells                                                                                          jest that I want to have control over when the test                                                                                             finishes in the execution flow 
    nock("http://localhost:3000")
      .get("/load/")
      .reply(200, {
        data: {
          requests: [
            REQUEST1
          ],
          page: 1,
          pages: 1
        }
      });

    setTimeout(() => {
      const wrapper = shallow(<SearchContainer />);           // simulates component, allows us to writes assertions on component
      expect(wrapper.find('.main-content'))
      expect(wrapper.find('.pagination-container'))
      done();                                                  // finally call done to tell test to finish
    }, 1000)

  });


  it("checks to see if SearchModal component renders", async (done) => {

    nock("http://localhost:3000")
      .get("/load/")
      .reply(200, {
        data: {
          requests: [
            REQUEST1
          ],
          page: 1,
          pages: 1
        }
      });

    setTimeout(() => {
      const wrapper = shallow(<SearchContainer />);           // simulates component, allows us to writes assertions on component
      // console.log(wrapper.debug())
      expect(wrapper.containsMatchingElement('<SearchModal />'));
      done();                                                  // finally call done to tell test to finish
    }, 1000)

  });

  it("checks to see if logs list renders", async (done) => {
    nock("http://localhost:3000")
      .get("/load/")
      .reply(200, {
        data: {
          requests: [
            REQUEST1
          ],
          page: 1,
          pages: 1
        }
      });

    setTimeout(() => {
      const wrapper = shallow(<SearchContainer />);
      expect(wrapper.find('.logs-container'))
      done();
    }, 1000)

  });




});
