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
  FormControl,
  Container
} from 'reactstrap';


class InputBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      filterkey: '',
      filterValue: '',
      filters: []
    }

  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }



  render() {
    return (

      <InputGroup  >
        <Input onChange={this.props.onChange} className='input-bar' />
        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle caret >
            Search Field
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem header >Choose Below:</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='ip' >I.P Address</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='pword' >Password</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='userId' >User ID</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='timestamp' >Date</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='requestMethod' >Request Method</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='requestPath' >Request Path</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='requestProtocol' >Request Protocol</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='responseCode' >Response Code</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='responseSize' >Response Size</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='referrer' >Referrer</DropdownItem>
            <DropdownItem onClick={this.props.chooseFilter} value='browser' >Browser</DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>

        <Button
          color='danger'
          size='md'
          className="delete-button"
          onClick={this.props.removeFilter} >
          Delete
        </Button>

      </InputGroup>


    )
  }
}

export default InputBar;









