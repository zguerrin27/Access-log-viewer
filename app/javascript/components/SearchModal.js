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


  render() {
    const closeBtn = <button className="close" onClick={this.toggleModal}>&times;</button>;



    return (
      <div>
        <Button
          color="primary"
          size="lg"
          onClick={this.toggleModal}
          className="modal-button-1">
          Filters
        </Button>
        <Button
          color="success"
          size="lg"
          className="share-button float-right">
          Share
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalHeader close={closeBtn} > Filters </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.search(e)}>
              <FormGroup>

                {this.state.filters.map((filterRow, index) => {

                  return (

                    <InputBar
                      chooseValueFromDropdown={(e) => this.chooseValueFromDropdown(e, filterRow)}
                      onChange={(e) => this.onChange(e, filterRow)}
                      removeFilterRow={(e) => this.removeFilterRow(e, filterRow)}
                      addNewFilterRow={(e) => this.addNewFilterRow(e)}
                      searchQuery={filterRow.searchQuery}
                      dropdownVal={filterRow.dropdownVal}
                      key={filterRow.key}
                      filtersLength={this.state.filters.length-1}
                      index={index}
                    />

                  )

                })}

                <Button
                  color="primary"
                  block
                  onClick={this.search}
                  className="search-button">
                  Search
                </Button>

              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>


      </div>
    )
  }

}

export default SearchModal;