import React, { Component } from 'react';
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



class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      dropdownOpen: false,
      filterKey: '',
      filterValue: '',
      filters: [{ key: '', value: '' }]
    }

  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = (e, index) => {
    this.setState({
      filterValue: e.target.value
    })
  }

  chooseFilterFromDropdown = (e) => {
    this.setState({
      filterKey: e.target.value
    })
  }

  removeFilter = (e, index) => {
    console.log("REMOVED FILTER WITH INDEX OF:", index)
    let filters = this.state.filters;
    console.log("CURRENT FILTERS IN STATE: ", filters)
    let removedFilters = filters.splice(index, 1)
    console.log(removedFilters)
    this.setState({
      filters: filters
    })

  }

  addFilter = (e) => {
    let filters = this.state.filters;

    if (filters[filters.length - 1].key === "" && filters[filters.length - 1].value === "") {
      if (filters.length === 1) {
        this.setState({
          filters: [{ key: this.state.filterKey, value: this.state.filterValue }],
          filterKey: '',
          filterValue: '',
        })
      } else {
        this.setState((prevState) => ({
          filters: [...prevState.filters.slice(0, -1), { key: this.state.filterKey, value: this.state.filterValue }]
        }))
      }
      this.setState((prevState) => ({
        filters: [...prevState.filters, { key: '', value: '' }]
      }))
    }

  }



  search = () => {
    let filters = this.state.filters;

    if (filters[0].key === "" && filters[0].value === "") {
      console.log("FROMT THE FIRST IN UPDATE BUTTON");
      this.setState({
        filters: [{ key: this.state.filterKey, value: this.state.filterValue }],
        filterKey: '',
        filterValue: ''
      })
    }

    if (filters[filters.length - 1].key === "" && filters[filters.length - 1].value === "") {
      this.setState((prevState) => ({
        filters: [{ key: this.state.filterKey, value: this.state.filterValue }],
        filterKey: '',
        filterValue: ''
      }))
    }

  }


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
            <Form onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup>

                {
                  this.state.filters.map((filter, index) => {
                    return (

                      <InputBar
                        chooseFilter={this.chooseFilterFromDropdown}
                        onChange={(e) => this.onChange(e, index)}
                        addFilter={this.addFilter}
                        key={index}
                        removeFilter={(e) => this.removeFilter(e, index)}
                        addFilter={(e) => this.addFilter(e)} />

                    )
                  })
                }


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