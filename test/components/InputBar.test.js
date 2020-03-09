import React from "react";
import axios from "axios";
import SearchModal from "../../app/javascript/components/SearchModal";
import InputBar from "../../app/javascript/components/InputBar";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");

const filterState = [{
  searchQuery: 'test-password-SQ',
  dropdownVal: 'password',
  dropdownLabel: 'Password',
  modifier: 'test-modifier',
  key: "66ab0-7c28-83d-b7b-5b880636a21b"
}]





describe("Input Bar Component", () => {

  it("checks to see if a dropdown button renders", async (done) => {

    
    // const SmWrapper = mount(<SearchModal />)
    // SmWrapper.find("Button button.modal-button-1").first().simulate('click');  // open modal

    // const wrapper = shallow(<InputBar />)

   
    // const dropdownButton = smWrapper.find('DropdownToggle button.dropdown-button').at(0)  // simulate dropdown click
    // dropdownButton.simulate('click');

    // console.log("BLAHHHHHHHHH",smWrapper.debug())

   
    // setTimeout(() => {
    //   const wrapper = shallow(<InputBar />)
    //   expect(wrapper.find('#input-bdddar'))
    //   console.log("BLAHHH 222222222222", wrapper.debug())
    //   done();                                                  // finally call done to tell test to finish
    // }, 1000)


    // expect(wrapper.find('DropdownMenu'))
    // done()
  })

  // it("checks to see if input bar renders", async (done) => {
  //   const wrapper = shallow(<InputBar />)
  //   expect(wrapper.find('#input-bar'))
  //   done()
  // })

  it("checks to see if dropdown opens when clicked", async (done) => {
    const wrapper = shallow(<InputBar />)
    const dropdownOpenState = wrapper.state().dropdownOpen
    expect(dropdownOpenState).toEqual(false)
    wrapper.find('InputGroupButtonDropdown').simulate('click')
    const newDropdownOpenState = wrapper.state().dropdownOpen
    expect(newDropdownOpenState).toEqual(true)
    done();
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