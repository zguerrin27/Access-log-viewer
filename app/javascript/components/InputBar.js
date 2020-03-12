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
      reqProtoDropdown: false,
      reqMethDropdown: false,
      modifierDropdown: false,
    }

  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  toggleReqProtoDropdown = () => {
    this.setState({
      reqProtoDropdown: !this.state.reqProtoDropdown
    })
  }

  toggleReqMethDropdown = () => {
    this.setState({
      reqMethDropdown: !this.state.reqMethDropdown
    })
  }

  toggleModifierDropdown = () => {
    this.setState({
      modifierDropdown: !this.state.modifierDropdown
    })
  }

  loopOverDropdownOptions = () => {
    const options = [
      { value: 'ip_address', text: 'IP Address' },
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
      return <DropdownItem className="dropdown-ITEM" onClick={this.props.chooseValueFromDropdown} key={option.value} disabled={grayedOut} value={option.value} > {option.text} </DropdownItem>
    })
  }

  reqProtocolOptions = () => {    // why have another state object called this specfic drop down???just push into searchQuery
    const options = [
      { value: 'HTTP/1.0' },
      { value: 'HTTP/1.1' },
      { value: 'HTTP/2.0' }
    ]
    return options.map(option => {
      var grayedOut = false
      this.props.filtersState.map(f => {
        if (f.searchQuery === option.value) {
          grayedOut = true                        
        }
      })
      return <DropdownItem onClick={this.props.chooseProtoDropdown} key={option.value} disabled={grayedOut} value={option.value} > {option.value} </DropdownItem>
    })
  }


  reqMethOptions = () => {    
    const options = [
      { value: 'GET' },
      { value: 'POST' },
      { value: 'PUT' },
      { value: 'HEAD' },
      { value: 'DELETE' },
      { value: 'CONNECT' },
      { value: 'OPTIONS' },
      { value: 'TRACE' }
    ]
    return options.map(option => {
      var grayedOut = false
      this.props.filtersState.map(f => {
        if (f.searchQuery === option.value) {
          grayedOut = true
        }
      })
      return <DropdownItem onClick={this.props.chooseReqMethDropdown} key={option.value} disabled={grayedOut} value={option.value} > {option.value} </DropdownItem>
    })
  }


  resSizeModifierOptions = () => {
    const options = [
      { value: 'Less Than' },
      { value: 'Exactly' },
      { value: 'Larger Than' }
    ]
    return options.map(option => {
      var grayedOut = false
      this.props.filtersState.map(f => {
        if (f.searchQuery === option.value) {
          grayedOut = true
        }
      })
      return <DropdownItem onClick={this.props.chooseModifierDropdown} key={option.value} disabled={grayedOut} value={option.value} > {option.value} </DropdownItem>
    })
  }

  urlModifierOptions = () => {
    const options = [
      { value: 'Starts With' },
      { value: 'Contains' },
      { value: 'Ends With' }
    ]
    return options.map(option => {
      var grayedOut = false
      this.props.filtersState.map(f => {
        if (f.searchQuery === option.value) {
          grayedOut = true
        }
      })
      return <DropdownItem onClick={this.props.chooseModifierDropdown} key={option.value} disabled={grayedOut} value={option.value} > {option.value} </DropdownItem>
    })
  }

  timestampModifierOptions = () => {
    const options = [
      { value: 'Before Time' },
      { value: 'At Time' },
      { value: 'After Time' }
    ]
    return options.map(option => {
      var grayedOut = false
      this.props.filtersState.map(f => {
        if (f.searchQuery === option.value) {
          grayedOut = true
        }
      })
      return <DropdownItem onClick={this.props.chooseModifierDropdown} key={option.value} disabled={grayedOut} value={option.value} > {option.value} </DropdownItem>
    })
  }

  render() {

    const dropdowns = this.loopOverDropdownOptions()
    const reqProtoDropdowns = this.reqProtocolOptions()
    const reqMethDropdowns = this.reqMethOptions()
    const resSizeModifierDropdowns = this.resSizeModifierOptions()
    const urlModifierDropdowns = this.urlModifierOptions()
    const timestampModifierDropdowns = this.timestampModifierOptions()
    const protoDropdownTitle = this.props.searchQuery
    const reqMethDropdownTitle = this.props.searchQuery
    const modifierDropdownTitle = this.props.modifier
    const dropdownTitle = this.props.dropdownTitle
    const dropdownLabel = this.props.dropdownLabel
  



    return (

      <InputGroup className="input-group-grow"  >

        <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} onClick={this.toggleDropdown}>
          <DropdownToggle color="none" className="dropdown-button btn btn-outline-secondary" caret >
            {dropdownLabel === "" ? "Select" : dropdownLabel}
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem header >Choose Below:</DropdownItem>
            {dropdowns}
          </DropdownMenu>
        </InputGroupButtonDropdown>


        {
          dropdownTitle === 'request_protocol'  
          ?
            <InputGroupButtonDropdown addonType="prepend" className="second-dropdown-div" isOpen={this.state.reqProtoDropdown} toggle={this.toggleReqProtoDropdown} onClick={this.toggleReqProtoDropdown} >
            <DropdownToggle color="none" className="second-dropdown-button btn btn-outline-secondary"  caret >
              {protoDropdownTitle === "" ? "Select" : protoDropdownTitle}
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem header >Choose Below:</DropdownItem>
              {reqProtoDropdowns}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          :
          null
        }


        {
          dropdownTitle === 'request_method'
            ?
            <InputGroupButtonDropdown addonType="prepend" className="second-dropdown-div" isOpen={this.state.reqMethDropdown} toggle={this.toggleReqMethDropdown} onClick={this.toggleReqMethDropdown} >
              <DropdownToggle color="none" className="second-dropdown-button btn btn-outline-secondary" caret >
                {reqMethDropdownTitle === "" ? "Select" : reqMethDropdownTitle}
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem header >Choose Below:</DropdownItem>
                {reqMethDropdowns}
              </DropdownMenu>
            </InputGroupButtonDropdown>
            :
            null
        }


        {
          dropdownTitle === 'response_size'
            ?
            <InputGroupButtonDropdown addonType="prepend"  isOpen={this.state.modifierDropdown} toggle={this.toggleModifierDropdown} onClick={this.toggleModifierDropdown} >
              <DropdownToggle color="none" className="resSize-dropdown btn btn-outline-secondary"  caret >
                {modifierDropdownTitle === "" ? "Select" : modifierDropdownTitle}
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem header >Choose Below:</DropdownItem>
                {resSizeModifierDropdowns}
              </DropdownMenu>
            </InputGroupButtonDropdown>
            :
            null
        }


        {
          dropdownTitle === 'request_path' || dropdownTitle === 'referrer'
            ?
            <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.modifierDropdown} toggle={this.toggleModifierDropdown} onClick={this.toggleModifierDropdown} >
              <DropdownToggle color="none" className="resSize-dropdown btn btn-outline-secondary" caret >
                {modifierDropdownTitle === "" ? "Select" : modifierDropdownTitle}
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem header >Choose Below:</DropdownItem>
                {urlModifierDropdowns}
              </DropdownMenu>
            </InputGroupButtonDropdown>
            :
            null
        }


        {
          dropdownTitle === 'timestamp'
            ?
            <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.modifierDropdown} toggle={this.toggleModifierDropdown} onClick={this.toggleModifierDropdown} >
              <DropdownToggle color="none" className="resSize-dropdown btn btn-outline-secondary" caret >
                {modifierDropdownTitle === "" ? "Select" : modifierDropdownTitle}
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem header >Choose Below:</DropdownItem>
                {timestampModifierDropdowns}
              </DropdownMenu>
            </InputGroupButtonDropdown>
            :
            null
        }



        {
          dropdownTitle !== "timestamp" &&
          dropdownTitle !== "request_protocol" &&
          dropdownTitle !== "request_method"
            ?
            <Input
              onChange={this.props.onChange}
              id="input-bar"
              value={this.props.searchQuery}
              name={this.props.dropdownTitle}
              placeholder={this.props.placeholder}
            />
            :
              dropdownTitle === "timestamp"
              ?
              <DateTime
                dateTimeOnChange={(dateString) => this.props.dateTimeOnChange(dateString)}
              />
              :
              null
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









