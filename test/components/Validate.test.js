import { requestMethodChecker, requestProtocolChecker, checkForPresence } from "../../app/javascript/components/Validate"
import validateInput from "../../app/javascript/components/Validate"

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("SearchModal Unit Tests", () => {

  test("checks for presence of atleast 1 character. Everything is a string", () => {
    expect(checkForPresence("some value")).toEqual(true)
    expect(checkForPresence(" ")).toEqual(false)
  })

  test("checks for valid Request Method", () => {
    expect(requestMethodChecker("GET")).toEqual(true)
    expect(requestMethodChecker("HEAD")).toEqual(true)
    expect(requestMethodChecker("POST")).toEqual(true)
    expect(requestMethodChecker("PUT")).toEqual(true)
    expect(requestMethodChecker("DELETE")).toEqual(true)
    expect(requestMethodChecker("CONNECT")).toEqual(true)
    expect(requestMethodChecker("OPTIONS")).toEqual(true)
    expect(requestMethodChecker("TRACE")).toEqual(true)
    expect(requestMethodChecker(1)).toEqual(false)
    expect(requestMethodChecker()).toEqual(false)
    expect(requestMethodChecker("get")).toEqual(false)
    expect(requestMethodChecker(undefined)).toEqual(false)
    expect(requestMethodChecker(null)).toEqual(false)
  })

  test("checks for valid Request Protocol", () => {
    expect(requestProtocolChecker("HTTP/1.0")).toEqual(true)
    expect(requestProtocolChecker("HTTP/1.1")).toEqual(true)
    expect(requestProtocolChecker("HTTP/2.0")).toEqual(true)
    expect(requestProtocolChecker(1)).toEqual(false)
    expect(requestProtocolChecker()).toEqual(false)
    expect(requestProtocolChecker("http/1.0")).toEqual(false)
    expect(requestProtocolChecker(undefined)).toEqual(false)
  })

  test("checks for valid responses from switch statement. Each asserts correct and incorect values. 24 assertions", () => {
    let formErrors = {
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
    let name = "ip_address";
    let value = "incorectly formatted ip";
    expect(validateInput(name, value, formErrors).ip_address).toEqual("Entered IP Address is not valid")
    value = "12.45.12.45";
    expect(validateInput(name, value, formErrors).ip_address).toEqual("")

    name = "password";
    value = " ";
    expect(validateInput(name, value, formErrors).password).toEqual("Entered Password is not valid")
    value = "password";
    expect(validateInput(name, value, formErrors).password).toEqual("")

    name = "user_id";
    value = " ";
    expect(validateInput(name, value, formErrors).user_id).toEqual("Entered User ID is not valid")
    value = "zg12";
    expect(validateInput(name, value, formErrors).user_id).toEqual("")

    name = "timestamp";
    value = " "; 
    expect(validateInput(name, value, formErrors).timestamp).toEqual("Entered Timestamp is not valid")
    value = "2020-03-24 16:32:15";
    expect(validateInput(name, value, formErrors).timestamp).toEqual("")

    name = "request_method";
    value = "not valid ";
    expect(validateInput(name, value, formErrors).request_method).toEqual("Entered Request Method is not valid")
    value = "GET";
    expect(validateInput(name, value, formErrors).request_method).toEqual("")

    name = "request_path";
    value = " ";
    expect(validateInput(name, value, formErrors).request_path).toEqual("Entered Request Path is not valid")
    value = "/path";
    expect(validateInput(name, value, formErrors).request_path).toEqual("")

    name = "request_protocol";
    value = "http5000";
    expect(validateInput(name, value, formErrors).request_protocol).toEqual("Entered Request Protocol is not valid")
    value = "HTTP/1.1";
    expect(validateInput(name, value, formErrors).request_protocol).toEqual("")

    name = "response_code";
    value = "zzz";
    expect(validateInput(name, value, formErrors).response_code).toEqual("Entered Response Code is not valid")
    value = "200";
    expect(validateInput(name, value, formErrors).response_code).toEqual("")

    name = "response_size";
    value = "zzz";
    expect(validateInput(name, value, formErrors).response_size).toEqual("Entered Response Size is not valid")
    value = "200666";
    expect(validateInput(name, value, formErrors).response_size).toEqual("")

    name = "referrer";
    value = " ";
    expect(validateInput(name, value, formErrors).referrer).toEqual("Entered Referrer is not valid")
    value = "/path/of/referrer";
    expect(validateInput(name, value, formErrors).referrer).toEqual("")

    name = "browser";
    value = " ";
    expect(validateInput(name, value, formErrors).browser).toEqual("Entered Browser is not valid")
    value = "Safari";
    expect(validateInput(name, value, formErrors).browser).toEqual("")
  })


})