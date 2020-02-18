import React, { Component } from 'react';
import DateTime from './DateTime';
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
  InputGroupAddon,
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
      lastRowNum: this.props.lastRowNum
    }


  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  loopOverDropdownOptions = () => {

    const options = [
      { value: 'ip_address', text: 'I.P Address' },
      { value: 'password', text: 'Password' },
      { value: 'user_id', text: 'User ID' },
      { value: 'timestamp', text: 'Timestamp' },
      { value: 'request_method', text: 'Request Method' },
      { value: 'request_path', text: 'Request Path' },
      { value: 'request_protocol', text: 'Request Protocol' },
      { value: 'response_code', text: 'Response Code' },
      { value: 'response_size', text: 'Response Size' },
      { value: 'referrer', text: 'Referrer' },
      { value: 'browser', text: 'Browser' }
    ]

    return options.map(option => {
      var grayedOut = false

      this.props.filtersState.map(f => {
        if (f.dropdownVal === option.value) {
          grayedOut = true
        }
      })
      return <DropdownItem onClick={this.props.chooseValueFromDropdown} key={option.value} disabled={grayedOut} value={option.value} > {option.value} </DropdownItem>
    })
  }


  render() {

    const dropdowns = this.loopOverDropdownOptions()

    return (

      <InputGroup  >
        <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} onClick={this.toggleDropdown}>
          <DropdownToggle color="none" className="dropdown-button btn btn-outline-secondary" caret >
            {this.props.dropdownTitle === "" ? "Select" : this.props.dropdownTitle}
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem header >Choose Below:</DropdownItem>
            {dropdowns}
          </DropdownMenu>
        </InputGroupButtonDropdown>

        {
          this.props.dropdownTitle !== "timestamp"
            ?
            <Input
              onChange={this.props.onChange}
              id="input-bar"
              value={this.props.searchQuery}
              placeholder={this.props.placeholder}
            />
            :
            <DateTime
              dateTimeOnChange={(dateString) => this.props.dateTimeOnChange(dateString)}
            />
        }

        {
          this.props.deleteButton
            ?
            null
            :
            <Button
              color="none"
              size='md'
              className="delete-button btn btn-outline-danger"
              onClick={this.props.removeFilterRow} >
              Delete
            </Button>
        }


      </InputGroup>


    )
  }
}

export default InputBar;









