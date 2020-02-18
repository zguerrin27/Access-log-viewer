import React, { Component } from 'react';
import uuid from 'react-uuid'
import InputBar from './InputBar'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownButton,
  Dropdown,
  Item,
  FormControl,
  Container
} from 'reactstrap';
import Axios from 'axios';




class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      dropdownOpen: false,
      filters: [{ searchQuery: '', dropdownVal: '', key: uuid() }]
    }

  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }



  // three functions 

  // one that sets state

  // one that simply handles the on change 

  // params for setstate



  onChange = (e, row) => {
    e.preventDefault();
    const filters = this.state.filters;
    const updatedFilters = filters.map(f => {
      if (row.key === f.key) {
        return {
          ...f,
          searchQuery: e.target.value
        }
      } else {
        return f;
      }
    })
    this.setState({
      filters: updatedFilters
    })
  }

  chooseValueFromDropdown = (e, row) => {
    e.preventDefault();
    const filters = this.state.filters;
    const updatedFilters = filters.map(f => {
      if (row.key === f.key) {
        return {
          ...f,
          dropdownVal: e.target.value
        }
      } else {
        return f;
      }
    })
    this.setState({
      filters: updatedFilters
    })
  }

  dateTimeOnChange = (dateString, filterRow) => {
    const filters = this.state.filters;
    const updatedFilters = filters.map(f => {
      if (filterRow.key === f.key) {
        return {
          ...f,
          searchQuery: dateString
        }
      } else {
        return f;
      }
    })
    this.setState({
      filters: updatedFilters
    })

  }

  removeFilterRow = (e, filter) => {
    let uuid = filter.key;
    this.setState((prevState) => ({
      filters: prevState.filters.filter(f => f.key !== uuid)
    }))
  }

  addNewFilterRow = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      filters: prevState.filters.concat([{ searchQuery: '', dropdownVal: '', key: uuid() }])
    }))
  }


  // search = (e) => {
  //   console.log(e)
  //   Axios.post("http://localhost:3000/search", {
  //     search: e.target.value
  //   })
  // }


  placeholderPicker = (dropdownVal) => {
    const options = {
      ip_address: "'17.23.156.123...'",
      password: "'Enter password'",
      user_id: "'Enter user_id'",
      request_method: "'GET'",
      request_path: "'/path/of/request...'",
      request_protocol: "'HTTP/1.0'",
      response_code: "'200, 404...'",
      response_size: "'234560...'",
      referrer: "'/path/of/referrer...'",
      browser: "'Safari, Chrome....'"
    }
    return options[dropdownVal]
  }


  render() {
    const closeBtn = <button className="close" onClick={this.toggleModal}>&times;</button>;
    let filtersLength = this.state.filters.length;


    return (
      <div>
        <Button
          color="none"
          size="lg"
          onClick={this.toggleModal}
          className="modal-button-1 btn btn-outline-primary">
          Filters
        </Button>
        <Button
          color="none"
          size="lg"
          className="share-button btn btn-outline-success float-right">
          Share
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalHeader close={closeBtn} className="modal-header" > Filters </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.search(e)}>
              <FormGroup>

                {this.state.filters.map((filterRow, index) => {
                  const placeholder = this.placeholderPicker(filterRow.dropdownVal)
                  return (

                    <InputBar
                      chooseValueFromDropdown={(e) => this.chooseValueFromDropdown(e, filterRow)}
                      onChange={(e) => this.onChange(e, filterRow)}
                      dateTimeOnChange={(e) => this.dateTimeOnChange(e, filterRow)}
                      removeFilterRow={(e) => this.removeFilterRow(e, filterRow)}
                      filtersState={this.state.filters}
                      searchQuery={filterRow.searchQuery}
                      key={filterRow.key}
                      filtersLength={this.state.filters.length - 1}
                      deleteButton={this.state.filters.length - 1 === 0}
                      index={index}
                      dropdownTitle={filterRow.dropdownVal}
                      placeholder={placeholder}
                    />

                  )

                })}


                {
                  this.state.filters[filtersLength - 1].dropdownVal === "" || this.state.filters[filtersLength - 1].searchQuery === ""
                    ?
                    <div>
                      <p className="text-above-add-btn">All fields must be entered</p>
                      <Button
                        disabled
                        color="none"
                        block
                        className="add-button"
                        onClick={(e) => this.addNewFilterRow(e)} >
                        Add Another Filte
                    </Button>
                      <Button
                        disabled
                        color="none"
                        block
                        onClick={this.search}
                        className="search-button">
                        Update Results
                    </Button>
                    </div>
                    :
                    <div>
                      <Button
                        color="none"
                        block
                        className="add-button"
                        onClick={(e) => this.addNewFilterRow(e)} >
                        Add Another Filter
                    </Button>
                      <Button
                        color="none"
                        block
                        onClick={this.search}
                        className="search-button">
                        Update Results
                    </Button>
                    </div>
                }







              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>


      </div>
    )
  }

}

export default SearchModal;