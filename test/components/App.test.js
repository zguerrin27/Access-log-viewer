import React from "react";
import axios from "axios";
import App from "../../app/javascript/components/App";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");
const nock = require("nock");


describe("App Component", ()=> {

  it("checks to see if NavBar Component Renders", () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('NavigationBar'))
  })

  it("checks to see if SearchContainer Component Renders", () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('SearchContainer'))
  })

})