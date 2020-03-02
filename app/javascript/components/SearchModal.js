import React, { Component } from 'react';
import uuid from 'react-uuid';
import InputBar from './InputBar';
import validateInput from './validate';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup
} from 'reactstrap';


const validateForm = (formErrors) => {         // if all of the strings in formErros are empty, returns true 
  let valid = true;
  Object.values(formErrors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const validIpRegex =
  RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
const validResponseCodeRegex = RegExp(/^([1-5][0-9][0-5])/);
const validResponseSizeRegex = RegExp(/^([0-9]*)$/);


class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      dropdownOpen: false,
      filters: [{
        searchQuery: '',
        dropdownVal: '',
        modifier: '',
        key: uuid()
      }],
      formErrors: {
        ip_address: '',
        password: '',
        user_id: '',
        timestamp: '',
        request_method: '',
        request_path: '',
        request_protocol: '',
        response_code: '',
        response_size: '',
        referrer: '',
        browser: ''
      }
    }
  }


  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }


  searchQueryOnChange = (e, row) => {                               // refactor this
    e.preventDefault();                                             // this is doing 2 things. change 65
    const filters = this.state.filters;                             // into a return updated filters
    const updatedFilters = filters.map(f => {                       // almost the same function as below 
      if (row.key === f.key) {
        return {
          ...f,
          searchQuery: e.target.value
        }
      } else {
        return f;
      }
    })
    this.updateModalState(updatedFilters)
  }


  chooseValueFromDropdown = (e, row) => {
    e.preventDefault();
    const filters = this.state.filters;
    const formErrors = { ...this.state.formErrors };
    formErrors[row.dropdownVal] = "";                  // when change the dropdown, also delete the error from formErrors
    this.setState({
      formErrors                                     
    })
    const updatedFilters = filters.map(f => {
      if (row.key === f.key) {
        return {
          ...f,
          dropdownVal: e.target.value,
          searchQuery: ''
        }
      } else {
        return f;
      }
    })
    this.updateModalState(updatedFilters)
  }




// =================================================================  these can be grouped into one / two functions

  chooseReqProtocolDropdown = (e, row) => {
    e.preventDefault();
    const filters = this.state.filters;
    const updatedFilters = filters.map(f => {
      if (row.key === f.key) {
        return {
          ...f,
          // reqProtoDropdown: e.target.value,
          searchQuery: e.target.value
        }
      } else {
        return f;
      }
    })
    this.updateModalState(updatedFilters)
  }


  chooseReqMethDropdown = (e, row) => {
    e.preventDefault();
    const filters = this.state.filters;
    const updatedFilters = filters.map(f => {
      if (row.key === f.key) {
        return {
          ...f,
          // reqMethDropdown: e.target.value,
          searchQuery: e.target.value
        }
      } else {
        return f;
      }
    })
    this.updateModalState(updatedFilters)
  }


  chooseModifierDropdown = (e, row) => {
    e.preventDefault();
    const filters = this.state.filters;
    const updatedFilters = filters.map(f => {
      if (row.key === f.key) {
        return {
          ...f,
          modifier: e.target.value
        }
      } else {
        return f;
      }
    })
    this.updateModalState(updatedFilters)
  }


// ============================================================================================================================




  dateTimeOnChange = (dateString, filterRow) => {   
    const filters = this.state.filters;
    const updatedFilters = filters.map(f => {
      if (filterRow.key === f.key) {
        return {
          ...f,
          searchQuery: dateString
        }
      } else {
        return f;
      }
    })
    this.updateModalState(updatedFilters)
  }



  updateModalState = (updatedFilters) => {  
    this.setState({
      filters: updatedFilters
    })
  }


  removeFilterRow = (e, filter) => {
    const formErrors = { ...this.state.formErrors };
    formErrors[filter.dropdownVal] = "";    // when you delete a row also delete the error from formErrors, override with empty string ""
    this.setState({
      formErrors                           
    })
    this.setState((prevState) => ({
      filters: prevState.filters.filter(f => f.key !== filter.key)
    }))
  }



  addNewFilterRow = (e) => {
    e.preventDefault()
    const formErrors = { ...this.state.formErrors };
    if (validateForm(formErrors)) {
      this.setState((prevState) => ({
        filters: prevState.filters.concat([{ searchQuery: '', dropdownVal: '', modifier: '', key: uuid() }])
      }))
    } else {
      const error = Object.values(formErrors)
      var filteredError = error.filter(Boolean);
      alert(filteredError)
    }
  }


  search = (e) => {
    e.preventDefault()
    const formErrors = { ...this.state.formErrors };
    if (validateForm(formErrors)) {
      this.props.hoistFiltersFromModal(this.state.filters)
      this.toggleModal()
    } else {
      const error = Object.values(formErrors)                 // gets values
      var filteredError = error.filter(Boolean);              // trims empty values ,, from string 
      alert(filteredError)                                    // alert error string 
    }
  }


  placeholderPicker = (dropdownVal) => {
    const options = {
      ip_address: "'17.23.156.123...'",
      password: "'Enter password'",
      user_id: "'Enter user_id'",
      request_method: "'GET'",
      request_path: "'/path/of/request...'",
      request_protocol: "'HTTP/1.0'",
      response_code: "'200, 404...'",
      response_size: "'234560...'",
      referrer: "'/path/of/referrer...'",
      browser: "'Safari, Chrome....'"
    }
    return options[dropdownVal]
  }

  requestMethodChecker = (value) => {
    let successValues = [
      "GET",
      "HEAD",
      "POST",
      "PUT",
      "DELETE",
      "CONNECT",
      "OPTIONS",
      "TRACE"
    ]
    if (successValues.indexOf(value) !== -1) {
      return true;
    }
  }

  requestProtocolChecker = (value) => {
    let successValues = [
      "HTTP/1.0",
      "HTTP/1.1",
      "HTTP/2.0"
    ]
    if (successValues.indexOf(value) !== -1) {
      return true;
    }
  }

  handleErrors = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'ip_address':                          
        formErrors.ip_address =
          validIpRegex.test(value)
            ? ''
            : 'Entered ip_address is not valid!';
        break;
      case 'password':                                
        formErrors.password =
          value.length < 1 && value.length - 1 !== 0
            ? 'Entered password is not valid!'
            : '';
        break;
      case 'user_id':                           
        formErrors.user_id =
          value.length < 1
            ? 'Entered user_id is not valid!'
            : '';
        break;
      case 'timestamp':                            
        formErrors.timestamp =
          value.length < 1
            ? 'Entered timestamp is not valid!'
            : '';
        break;
      case 'request_method':                      
        formErrors.request_method =
          this.requestMethodChecker(value)
            ? ''
            : 'Entered request_method is not valid!';
        break;
      case 'request_path':                         
        formErrors.request_path =
          value.length < 1
            ? 'Entered request_path is not valid!'
            : '';
        break;
      case 'request_protocol':                     
        formErrors.request_protocol =
          this.requestProtocolChecker(value)
            ? ''
            : 'Entered request_protocol is not valid!';
        break;
      case 'response_code':                        
        formErrors.response_code =
          validResponseCodeRegex.test(value)
            ? ''
            : 'Entered response_code is not valid!';
        break;
      case 'response_size':                      
        formErrors.response_size =
          validResponseSizeRegex.test(value)
            ? ''
            : 'Entered response_size is not valid!';
        break;
      case 'referrer':                            
        formErrors.referrer =
          value.length < 1
            ? 'Entered referrer is not valid!'
            : '';
        break;
      case 'browser':
        formErrors.browser =                     
          value.length < 1
            ? 'Entered browser is not valid!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value })
  }

  combineOnChanges = (e, row) => {
    this.searchQueryOnChange(e, row)
    this.handleErrors(e)
  }

  render() {
    const closeBtn = <button className="close" onClick={this.toggleModal}>&times;</button>;
    const filtersLength = this.state.filters.length;
    const filters = this.state.filters;
    const dropdownsEmpty = obj => obj.dropdownVal === ''
    const searchQuerysEmpty = obj => obj.searchQuery.trim() === ''

    return (
      <div>
        <Button
          color="none"
          size="lg"
          onClick={this.toggleModal}
          className="modal-button-1 btn btn-outline-primary">
          Filters
        </Button>
        <Button
          color="none"
          size="lg"
          className="share-button btn btn-outline-success float-right">
          Share
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalHeader close={closeBtn} className="modal-header" > Filters </ModalHeader>
          <ModalBody>
            <Form >
              <FormGroup>

                {filters.map((filterRow, index) => {
                  const placeholder = this.placeholderPicker(filterRow.dropdownVal)
                  return (
                    <InputBar
                      chooseValueFromDropdown={(e) => this.chooseValueFromDropdown(e, filterRow)}
                      onChange={(e) => { this.combineOnChanges(e, filterRow) }}
                      dateTimeOnChange={(e) => this.dateTimeOnChange(e, filterRow)}
                      removeFilterRow={(e) => this.removeFilterRow(e, filterRow)}
                      filtersState={this.state.filters}
                      searchQuery={filterRow.searchQuery}
                      modifier={filterRow.modifier}
                      key={filterRow.key}
                      filtersLength={this.state.filters.length - 1}
                      deleteButton={this.state.filters.length - 1 === 0}
                      index={index}
                      dropdownTitle={filterRow.dropdownVal}
                      placeholder={placeholder}
                      formErrors={this.state.formErrors}
                      chooseProtoDropdown={(e) => this.chooseReqProtocolDropdown(e, filterRow)}
                      chooseReqMethDropdown={(e) => this.chooseReqMethDropdown(e, filterRow)}
                      chooseModifierDropdown={(e) => this.chooseModifierDropdown(e, filterRow)}
                    />
                  )
                })}

                {
                  filtersLength <= 10   // dont allow add button if length of filters === 11
                    ?
                    filters.some(dropdownsEmpty) === true || filters.some(searchQuerysEmpty) === true      // actual witchcraft
                      ?
                      <div>
                        <p className="text-above-add-btn">All fields must have value entered</p>
                        <Button
                          disabled
                          color="none"
                          block
                          className="add-button"
                          onClick={(e) => this.addNewFilterRow(e)} >
                          Add Another Filter
                        </Button>
                        <Button
                          disabled
                          color="none"
                          block
                          onClick={(e) => this.search(e)}
                          className="search-button">
                          Update Results
                        </Button>
                      </div>
                      :
                      <div>
                        <Button
                          color="none"
                          block
                          className="add-button"
                          onClick={(e) => this.addNewFilterRow(e)} >
                          Add Another Filter
                        </Button>
                        <Button
                          color="none"
                          block
                          onClick={(e) => this.search(e)}
                          className="search-button">
                          Update Results
                        </Button>
                      </div>
                    :
                    <Button
                      color="none"
                      block
                      onClick={(e) => this.search(e)}
                      className="search-button-max-filters">
                      Update Results
                    </Button>
                }

              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>


      </div>
    )
  }

}

export default SearchModal;