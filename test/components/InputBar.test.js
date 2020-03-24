import React from "react";
import axios from "axios";
import SearchModal from "../../app/javascript/components/SearchModal";
import InputBar from "../../app/javascript/components/InputBar";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");
// const nock = require("nock");

// const filterState = [{
//   searchQuery: 'test-password-SQ',
//   dropdownVal: 'password',
//   dropdownLabel: 'Password',
//   modifier: 'test-modifier',
//   key: "66ab0-7c28-83d-b7b-5b880636a21b"
// }]

// const REQUEST1 = {
//   ip: "83.149.9.216",
//   pword: "-",
//   userId: "-",
//   timestamp: "12/12/12",
//   requestMethod: "GET",
//   requestPath: "/path/to/endpoint",
//   requestProtocol: "HTTP/1.1",
//   responseCode: "200",
//   responseSize: "23456",
//   referrer: "http://apple.com/secretHelicopter",
//   browser: "Safari",
//   fullRequest: "GET /path/to/endpoint HTTP/1.1",
//   fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"
// };

describe("Input Bar Component", () => {


  // beforeEach(() => {
  //   nock("http://localhost:3000")
  //     .get("/search/?search[]=%7B%22searchQuery%22:%22%22,%22dropdownVal%22:%22%22,%22modifier%22:%22%22%7D")               // ?search[]=%7B%22searchQuery%22:%22%22,%22dropdownVal%22:%22%22%7D 
  //     .reply(200, {
  //       data: {
  //         requests: [
  //           REQUEST1
  //         ],
  //         page: 1,
  //         pages: 1
  //       }
  //     });
  // });

  

  // it("checks to see if input bar renders", async (done) => {
  //   const wrapper = shallow(<InputBar />)
  //   expect(wrapper.find('#input-bar'))
  //   done()
  // })

  it("checks to see if dropdown opens when clicked", async (done) => {
    const wrapper = shallow(<InputBar />)
    console.log(wrapper.debug())
    // const dropdownOpenState = wrapper.state().dropdownOpen
    // expect(dropdownOpenState).toEqual(false)
    // wrapper.find('InputGroupButtonDropdown').simulate('click')
    // const newDropdownOpenState = wrapper.state().dropdownOpen
    // expect(newDropdownOpenState).toEqual(true)
    setTimeout(()=> {
    done();
    }, 2000)
  })

  // it("checks to see if dropdown closes when clicked", async (done) => {
  //   const wrapper = shallow(<InputBar />)
  //   wrapper.find('InputGroupButtonDropdown').simulate('click')
  //   wrapper.find('InputGroupButtonDropdown').simulate('click')
  //   const dropdownOpenState = wrapper.state().dropdownOpen
  //   expect(dropdownOpenState).toEqual(false)
  //   done();
  // })

  // it("when dropdown is clicked, it should render 12 dropdownItems, including the header", async (done) => {
  //   const wrapper = shallow(<InputBar />)
  //   wrapper.find('InputGroupButtonDropdown').simulate('click')
  //   expect(wrapper.find('DropdownItem').length).toEqual(12)
  //   done();
  // })


})