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


  it("sets state when component mounts", async (done) => {

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

    const wrapper = shallow(<SearchContainer />);
    const logsState = wrapper.state().logs;
    expect(logsState).toEqual([]);
    setTimeout(() => {
      const logsState = wrapper.state().logs;
      expect(logsState.data.requests[0]).toEqual(REQUEST1)
      expect(logsState.data.page).toEqual(1)
      expect(logsState.data.pages).toEqual(1)
      done();
    }, 1000)


  });


});
