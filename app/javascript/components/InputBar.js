import React, { Component } from 'react';
import DateTime from './DateTime';
import {
  Button,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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
      { value: 'ip_address' },
      { value: 'password' },
      { value: 'user_id' },
      { value: 'timestamp' },
      { value: 'request_method' },
      { value: 'request_path' },
      { value: 'request_protocol' },
      { value: 'response_code' },
      { value: 'response_size' },
      { value: 'referrer' },
      { value: 'browser' }
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

      <InputGroup className="input-group-grow"  >
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









