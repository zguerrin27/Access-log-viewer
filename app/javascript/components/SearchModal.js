import React, { Component } from 'react';
import uuid from 'react-uuid'
import InputBar from './InputBar'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup
} from 'reactstrap';


const validateForm = (formErrors) => {
  let valid = true;
  Object.values(formErrors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      dropdownOpen: false,
      filters: [{ searchQuery: '', dropdownVal: '', predicate: '', key: uuid() }],
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
    e.preventDefault();                                             // this is doing 2 things. change 55
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
    const updatedFilters = filters.map(f => {
      if (row.key === f.key) {
        return {
          ...f,
          dropdownVal: e.target.value
        }
      } else {
        return f;
      }
    })
    this.updateModalState(updatedFilters)
  }

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
    let uuid = filter.key;
    this.setState((prevState) => ({
      filters: prevState.filters.filter(f => f.key !== uuid)
    }))
  }

  addNewFilterRow = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      filters: prevState.filters.concat([{ searchQuery: '', dropdownVal: '', key: uuid() }])
    }))
  }

  search = (e) => {
    e.preventDefault()
    if (validateForm(this.state.formErrors)) {
      console.info('Valid Form')
      this.props.hoistFiltersFromModal(this.state.filters)
      this.toggleModal()
    } else {
      console.error('Invalid Form')
      this.toggleModal()
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

  handleErrors = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'ip_address':
        formErrors.ip_address =
          value.length < 5 && value.length > 0
            ? 'Entered ip_address is not valid!'
            : '';
        break;
      case 'password':
        formErrors.password =
          // validEmailRegex.test(value)
          value.length < 5 && value.length > 0
            ? 'Entered password is not valid!'
            : '';
        break;
      case 'user_id':
        formErrors.user_id =
          value.length < 5 && value.length > 0
            ? 'Entered user_id is not valid!'
            : '';
        break;
      case 'timestamp':
        formErrors.timestamp =
          value.length < 5 && value.length > 0
            ? 'Entered timestamp is not valid!'
            : '';
        break;
      case 'request_method':
        formErrors.request_method =
          value.length < 5 && value.length > 0
            ? 'Entered request_method is not valid!'
            : '';
        break;
      case 'request_path':
        formErrors.request_path =
          value.length < 5 && value.length > 0
            ? 'Entered request_path is not valid!'
            : '';
        break;
      case 'request_protocol':
        formErrors.request_protocol =
          value.length < 5 && value.length > 0
            ? 'Entered request_protocol is not valid!'
            : '';
        break;
      case 'response_code':
        formErrors.response_code =
          value.length < 5 && value.length > 0
            ? 'Entered response_code is not valid!'
            : '';
        break;
      case 'response_size':
        formErrors.response_size =
          value.length < 5 && value.length > 0
            ? 'Entered response_size is not valid!'
            : '';
        break;
      case 'referrer':
        formErrors.referrer =
          value.length < 5 && value.length > 0
            ? 'Entered referrer is not valid!'
            : '';
        break;
      case 'browser':
        formErrors.browser =
          value.length < 5 && value.length > 0
            ? 'Entered browser is not valid!'
            : '';
        break;
      default:
        break;
    }
    // this.setState({ formErrors, [name]: value }, () => {
    //   // console.log("SET ERRORS STATE WITH:", formErrors)
    // })

    this.setState({ formErrors, [name]: value })
  }

  combineOnChanges = (e, row) => {
    this.searchQueryOnChange(e, row)
    this.handleErrors(e)
  }




  render() {
    const closeBtn = <button className="close" onClick={this.toggleModal}>&times;</button>;
    const filtersLength = this.state.filters.length;
    const { formErrors } = this.state;

    const emptyOrNotErrorsObj = isEmpty(formErrors)
    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

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

                {this.state.filters.map((filterRow, index) => {
                  const placeholder = this.placeholderPicker(filterRow.dropdownVal)
                  return (
                    <InputBar
                      chooseValueFromDropdown={(e) => this.chooseValueFromDropdown(e, filterRow)}
                      // onChange={(e) => this.searchQueryOnChange(e, filterRow)}
                      onChange={(e) => { this.combineOnChanges(e, filterRow) }}
                      dateTimeOnChange={(e) => this.dateTimeOnChange(e, filterRow)}
                      removeFilterRow={(e) => this.removeFilterRow(e, filterRow)}
                      filtersState={this.state.filters}
                      searchQuery={filterRow.searchQuery}
                      key={filterRow.key}
                      filtersLength={this.state.filters.length - 1}
                      deleteButton={this.state.filters.length - 1 === 0}
                      index={index}
                      dropdownTitle={filterRow.dropdownVal}
                      placeholder={placeholder}
                      formErrors={this.state.formErrors}
                    />
                  )
                })}

                {formErrors.ip_address.length > 0 ? <span className="error-message">{formErrors.ip_address}<br /></span> : null}
                {formErrors.password.length > 0 ? <span className="error-message">{formErrors.password}<br /></span> : null}
                {formErrors.user_id.length > 0 ? <span className="error-message">{formErrors.user_id}<br /></span> : null}
                {formErrors.timestamp.length > 0 ? <span className="error-message">{formErrors.timestamp}<br /></span> : null}
                {formErrors.request_method.length > 0 ? <span className="error-message">{formErrors.request_method}<br /></span> : null}
                {formErrors.request_path.length > 0 ? <span className="error-message">{formErrors.request_path}<br /></span> : null}
                {formErrors.request_protocol.length > 0 ? <span className="error-message">{formErrors.request_protocol}<br /></span> : null}
                {formErrors.response_code.length > 0 ? <span className="error-message">{formErrors.response_code}<br /></span> : null}
                {formErrors.response_size.length > 0 ? <span className="error-message">{formErrors.response_size}<br /></span> : null}
                {formErrors.referrer.length > 0 ? <span className="error-message">{formErrors.referrer}<br /></span> : null}
                {formErrors.browser.length > 0 ? <span className="error-message">{formErrors.browser}<br /></span> : null}


                {
                  filtersLength <= 10   // dont allow add button if length of filters === 11
                    ?
                    this.state.filters[filtersLength - 1].dropdownVal === "" ||
                      this.state.filters[filtersLength - 1].searchQuery === "" ||
                      formErrors.ip_address.length > 0 ||
                      formErrors.password.length > 0 ||
                      formErrors.user_id.length > 0 ||
                      formErrors.timestamp.length > 0 ||
                      formErrors.request_method.length > 0 ||
                      formErrors.request_path.length > 0 ||
                      formErrors.request_protocol.length > 0 ||
                      formErrors.response_code.length > 0 ||
                      formErrors.response_size.length > 0 ||
                      formErrors.referrer.length > 0 ||
                      formErrors.browser.length > 0
                      ?
                      <div>
                        {/* <p className="text-above-add-btn">All fields must be entered</p> */}
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