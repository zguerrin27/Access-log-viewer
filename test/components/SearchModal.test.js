import React from "react";
import axios from "axios";
import SearchModal from "../../app/javascript/components/SearchModal";
import { shallow, mount, ShallowWrapper } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import InputBar from "../../app/javascript/components/InputBar";

import { Button, InputGroupButtonDropdown, ModalHeader } from 'reactstrap';
configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");

  // const filters = [
  //   {
  //     searchQuery: 'test-password',
  //     dropdownVal: 'password'
  //   },
  //   {
  //     searchQuery: 'test-userId',
  //     dropdownVal: 'user_id'
  //   },
  //   {
  //     searchQuery: '83.149.9.216',
  //     dropdownVal: 'ip_address'
  //   }
  // ]


describe("SearchModal Component User Interaction", () => {

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


  it("should close the modal when the 'X' btn is clicked", async (done) => {
    const wrapper = mount(<SearchModal />)                               // mount SearchModal
    wrapper.find(Button).first().simulate('click');                      // open modal
    const modalOpenState = wrapper.state().modal                        
    expect(modalOpenState).toEqual(true)                                 // confirm modal is open 

    const closeBtn = wrapper.find("button.close").simulate('click')     // find a click close button
    const newModalOpenState = wrapper.state().modal
    expect(newModalOpenState).toEqual(false)                            // confim modal is closed  
    done();  
  })


  it("checks to see if a add button renders", async (done) => {
    const wrapper = mount(<SearchModal />)                           
    wrapper.find(Button).first().simulate('click');   
    expect(wrapper.find('.add-button').exists()).toEqual(true)
    done()
  })

  it("checks to see if the add button is disabled initially", async (done) => {
    const wrapper = mount(<SearchModal />)
    wrapper.find(Button).first().simulate('click');
    const addBtn = wrapper.find('button.add-button')  // find add btn
    expect(addBtn.props().disabled).toEqual(true)     // look at props on addBtn .disabled is the prop name..toEqual is expecting true
    done()
  })

  it("checks to see if update button renders", async (done) => {
    const wrapper = mount(<SearchModal />)
    wrapper.find(Button).first().simulate('click');
    expect(wrapper.find('button.search-button').exists()).toEqual(true)
    done()
  })


  it("SearchModal row and button functionality", async (done) => {       

    const wrapper = mount(<SearchModal />)
    wrapper.find(Button).first().simulate('click');                       // open modal
    expect(wrapper.state().filters).toHaveLength(1);                      // check that there is one row
    expect(wrapper.find('Input#input-bar')).toHaveLength(1);              // check for each part of the row 
    expect(wrapper.find(InputGroupButtonDropdown)).toHaveLength(1);
    expect(wrapper.find('Button.delete-button')).toHaveLength(0);         // no delete button with one row
    expect(wrapper.find('Button.add-button')).toHaveLength(1);       

    const dropdownButton = wrapper.find('DropdownToggle button.dropdown-button').at(0)  // simulate dropdown click
    dropdownButton.simulate('click');
    const password = wrapper.find('.dropdown-ITEM').at(2);                 // simulate selection of password option
    password.simulate('click');
   
    const inputBar = wrapper.find('Input#input-bar');
    inputBar.simulate('focus');
    inputBar.simulate('change', { target: { value: 'HelloHello' } })       // enter value into input bar

    const addButton = wrapper.find('.add-button');                         // click add button 
    addButton.first().simulate('click')

    expect(wrapper.state().filters).toHaveLength(2);                       // check that new filter row is there 
    expect(wrapper.find('Input#input-bar')).toHaveLength(2);
    expect(wrapper.find(InputGroupButtonDropdown)).toHaveLength(2);
    expect(wrapper.find('Button.delete-button')).toHaveLength(2);          // now that there are 2 rows...there should be two delete btns
    expect(wrapper.find('button.search-button')).toHaveLength(1);          // should still only have 1 update btn
    expect(wrapper.find('Button.add-button')).toHaveLength(1);             // still only 1 add button 
                   
    expect(wrapper.find('button.add-button').props().disabled).toEqual(true)     // add btn should be disabled
    expect(wrapper.find('button.search-button').props().disabled).toEqual(true)  // update btn should be disabled

    const deleteBtn2 = wrapper.find('Button.delete-button').at(1)          // find delete btn in 2nd row
    deleteBtn2.simulate('click')                                           // click it
    expect(wrapper.state().filters).toHaveLength(1);                       // confirm that there is now only 1, and that the one is not the one delete

    done()
  })


  it("should clear all filters when Clear Filters Button is clicked", async (done) => {
    const wrapper = mount(<SearchModal />)
    expect(wrapper.state().filters).toHaveLength(1); 
    wrapper.find(Button).first().simulate('click'); 
    const dropdownButton1 = wrapper.find('DropdownToggle button.dropdown-button').at(0)  
    dropdownButton1.simulate('click');
    const password = wrapper.find('.dropdown-ITEM').at(2);                 
    password.simulate('click');
    const inputBar1 = wrapper.find('Input#input-bar');
    inputBar1.simulate('focus');
    inputBar1.simulate('change', { target: { value: 'PASSWORD-PASSWORD' } })    
    const addButton = wrapper.find('.add-button');                       
    addButton.first().simulate('click')

    expect(wrapper.state().filters).toHaveLength(2);                                  // filter state has length of 2
    const clearFiltersBtn = wrapper.find('ModalHeader button.clear-filters')          // find clear btn
    clearFiltersBtn.simulate('click')                                                 // click clear btn 
    expect(wrapper.state().filters).toEqual([])                                       // filters state is now empty
    done()
  })


})
