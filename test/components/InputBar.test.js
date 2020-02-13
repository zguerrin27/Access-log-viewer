import React from "react";
import axios from "axios";
import InputBar from "../../app/javascript/components/InputBar";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");


describe("Input Bar Component", () => {

  it("checks to see if input bar renders", async (done) => {
    const wrapper = shallow(<InputBar />)
    expect(wrapper.find('input-bar'))
    done()
  })

  it("checks to see if a dropdown button renders", async (done) => {
    const wrapper = shallow(<InputBar />)
    expect(wrapper.find('DropdownMenu'))
    done()
  })

  it("checks to see if add button renders", async (done) => {
    const wrapper = shallow(<InputBar />)
    expect(wrapper.find('add-button'))
    done()
  })

  it("checks to see if dropdown opens when clicked", async (done) => {
    const wrapper = shallow(<InputBar />)
    const dropdownOpenState = wrapper.state().dropdownOpen
    expect(dropdownOpenState).toEqual(false)
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    const newDropdownOpenState = wrapper.state().dropdownOpen
    expect(newDropdownOpenState).toEqual(true)
    done();
  })

  it("checks to see if dropdown closes when clicked", async (done) => {
    const wrapper = shallow(<InputBar />)
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    const dropdownOpenState = wrapper.state().dropdownOpen
    expect(dropdownOpenState).toEqual(false)
    done();
  })

  it("when dropdown is clicked, it should render 12 dropdownItems, including the header", async (done) => {
    const wrapper = shallow(<InputBar />)
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    expect(wrapper.find('DropdownItem').length).toEqual(12)
    done();
  })


})