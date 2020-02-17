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



  render() {

    // console.log(this.props.index)
    // console.log(this.props.filtersLength)


    return (


      <InputGroup  >
        <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} onClick={this.toggleDropdown}>
          <DropdownToggle color="none" className="dropdown-button btn btn-outline-secondary" caret >
            {this.props.dropdownTitle === "" ? "Select" : this.props.dropdownTitle}
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem header >Choose Below:</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='ip' >I.P Address</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='pword' >Password</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='userId' >User ID</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='timestamp' >Date</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='requestMethod' >Request Method</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='requestPath' >Request Path</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='requestProtocol' >Request Protocol</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='responseCode' >Response Code</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='responseSize' >Response Size</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='referrer' >Referrer</DropdownItem>
            <DropdownItem onClick={this.props.chooseValueFromDropdown} value='browser' >Browser</DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>

        {
          this.props.dropdownTitle !== "timestamp"
            ?
            <Input
              onChange={this.props.onChange}
              className='input-bar'
              value={this.props.searchQuery} />
            :
            <DateTime
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









