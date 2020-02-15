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
        <Input onChange={this.props.onChange} className='input-bar' value={this.props.searchQuery} />
        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} onClick={this.toggleDropdown}>
          <DropdownToggle className="dropdown-button" caret >
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
          this.props.deleteButton
            ?
            null
            :
            <Button
              color='danger'
              size='md'
              className="delete-button"
              onClick={this.props.removeFilterRow} >
              Delete
        </Button>
        }


        {
          this.props.filtersLength === this.props.index
            ?
            <Button
              color="success"
              size='md'
              className="add-button"
              onClick={this.props.addNewFilterRow} >
              Add
            </Button>
            :
            null
        }



      </InputGroup>


    )
  }
}

export default InputBar;









