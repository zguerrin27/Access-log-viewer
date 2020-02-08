import React, { Component } from 'react';
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
  FormControl
} from 'reactstrap';



class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      dropdownOpen: false,
      filters: []
    }

  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }



  render() {

    // let { filters } = this.state
    return (
      <div>

        <Button
          color="primary"
          size="lg"
          onClick={this.toggleModal}
          className="modal-button">

          Filters
        </Button>

        <Modal isOpen={this.state.modal}>
          <ModalHeader > Filters </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup>
                {/* <Label for="item"></Label> */}

                {/* <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="New Name"
                  onChange={this.onChange}>
                </Input> */}

                <InputGroup>

                  <Input />
                  <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle caret>
                      Search Field
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Choose Below:</DropdownItem>
                      <DropdownItem>I.P Address</DropdownItem>
                      <DropdownItem>Password</DropdownItem>
                      <DropdownItem>User ID</DropdownItem>
                      <DropdownItem>Date</DropdownItem>
                      <DropdownItem>Request Method</DropdownItem>
                      <DropdownItem>Request Path</DropdownItem>
                      <DropdownItem>Request Protocol</DropdownItem>
                      <DropdownItem>Response Code</DropdownItem>
                      <DropdownItem>Response Size</DropdownItem>
                      <DropdownItem>Referrer</DropdownItem>
                      <DropdownItem>Browser</DropdownItem>
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                  {/* <Button
                    color='danger'
                    size='md'
                    className="delete-button">
                    Delete
                  </Button> */}
                </InputGroup>
                <Button
                  color="primary"
                  block
                  className="update-button">
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