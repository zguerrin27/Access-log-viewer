import React from "react";
import axios from "axios";
import InputBar from "../../app/javascript/components/InputBar";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");


describe("Input Bar Component", () => {

  it("checks to see if input area renders", (done) => {
    const wrapper = shallow(<InputBar filtersState = {[{searchQuery: ""}]} />)  // pass in filtersState object...the real method in the App needs the object to map over for options. Therefore the test needs something to map over as well
    expect(wrapper.find('#input-bar'))
    done()
  })

  it("checks to see if dropdown opens when clicked", (done) => {
    const wrapper = shallow(<InputBar filtersState = {[{searchQuery: ""}]} />)
    const dropdownOpenState = wrapper.state().dropdownOpen
    expect(dropdownOpenState).toEqual(false)
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    const newDropdownOpenState = wrapper.state().dropdownOpen
    expect(newDropdownOpenState).toEqual(true)
    done();
  })

  it("checks to see if dropdown closes when clicked", (done) => {
    const wrapper = shallow(<InputBar filtersState={[{ searchQuery: "" }]} />)
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    const dropdownOpenState = wrapper.state().dropdownOpen
    expect(dropdownOpenState).toEqual(false)
    done();
  })

  it("when dropdown is clicked, it should render 12 dropdownItems, including the header", (done) => {
    const wrapper = shallow(<InputBar filtersState={[{ searchQuery: "" }]} />)
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    expect(wrapper.find('DropdownItem').length).toEqual(12)
    done();
  })

})