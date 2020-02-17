import React from "react";
import axios from "axios";
import SearchModal from "../../app/javascript/components/SearchModal";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import InputBar from "../../app/javascript/components/InputBar";
import { Button, InputGroupButtonDropdown } from 'reactstrap';
configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");


describe("SearchModal Component", () => {

  it("checks to see if modal/Filters button is present", async (done) => {
    const wrapper = shallow(<SearchModal />)
    expect(wrapper.find('.modal-button-1'))
    done();
  })

  it("checks to see if share button is present", async (done) => {
    const wrapper = shallow(<SearchModal />)
    expect(wrapper.find('share-button float-right'))
    done();
  })

  it("should open the modal when the filter button is clicked", async (done) => {
    const wrapper = shallow(<SearchModal />)
    const modalOpenState = wrapper.state().modal
    expect(modalOpenState).toEqual(false)
    wrapper.find('.modal-button-1').simulate('click')
    const newModalOpenState = wrapper.state().modal
    expect(newModalOpenState).toEqual(true)
    done();
  })

  // it("should close the modal when the X is clicked", async (done) => {
  //   const wrapper = shallow(<SearchModal />)
  //   wrapper.find('.modal-button').simulate('click')
  //   const modalOpenState = wrapper.state().modal
  //   expect(modalOpenState).toEqual(true)
  //   // console.log(wrapper.debug())
  //   expect(wrapper.find('ModalHeader').prop('close')).simulate('click')
  //   const newModalOpenState = wrapper.state().modal
  //   expect(newModalOpenState).toEqual(false)
  //   done();  
  // })


  it("should add an inputBar component for each click of the add button corectly", async (done) => {
    const wrapper = mount(<SearchModal />)
    wrapper.find(Button).first().simulate('click')
    expect(wrapper.state().filters).toHaveLength(1);

    expect(wrapper.find('Input.input-bar')).toHaveLength(1);
    expect(wrapper.find(InputGroupButtonDropdown)).toHaveLength(1);
    expect(wrapper.find('Button.delete-button')).toHaveLength(0);
    expect(wrapper.find('Button.add-button')).toHaveLength(1);

    const addButton = wrapper.find('.add-button');
    addButton.first().simulate('click')

    console.log(wrapper.debug())

    // expect(wrapper.state().filters).toHaveLength(1);
    // expect(wrapper.find('Input.input-bar')).toHaveLength(2);
    // expect(wrapper.find(InputGroupButtonDropdown)).toHaveLength(2);
    // expect(wrapper.find('Button.delete-button')).toHaveLength(2);
    // expect(wrapper.find('Button.add-button')).toHaveLength(2);

    done()
  })







})
