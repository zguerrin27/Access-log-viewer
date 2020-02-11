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


    // this.chooseFilter = this.chooseFilter.bind(this)

  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  addFilter = (e) => {
    this.setState((prevState) => ({
      filters: [...prevState.filters, { key: this.state.filterKey, value: this.state.filterValue }],
      filterKey: '',
      filterValue: ''

    }))
  }

  onChange = (e, index) => {
    // let preFilter = this.state.filters
    this.setState({
      filterValue: e.target.value
    })
  }

  chooseFilter = (e) => {
    console.log("FROM THE FILTER CLICK", e.target.value)
    this.setState({
      filterKey: e.target.value
    })
  }

  removeFilter = (e, index) => {
    console.log("REMOVED FILTER WITH INDEX OF:", index)
    let filters = this.state.filters;
    let oldFilters = filters.splice(index, 1)
    console.log(oldFilters)
    this.setState({
      filters: filters
    })


  }





  render() {

    return (
      <div>

        <Button
          color="primary"
          size="lg"
          onClick={this.toggleModal}
          className="modal-button">
          Filters
        </Button>

        <Button
          color="success"
          size="lg"
          className="share-button float-right">
          Share
        </Button>

        <Modal isOpen={this.state.modal}>
          <ModalHeader > Filters </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup>

                {
                  this.state.filters.map((filter, index) => {
                    return (

                      <InputBar
                        chooseFilter={this.chooseFilter}
                        onChange={(e) => this.onChange(e, index)}
                        addFilter={this.addFilter}
                        key={index}
                        removeFilter={(e) => this.removeFilter(e, index)} />

                    )
                  })
                }

                <Button
                  color="primary"
                  block
                  className="update-button"
                  onClick={this.addFilter} >
                  Additional Filter
                </Button>
                <Button
                  color="success"
                  block
                  className="update-button">
                  Update
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