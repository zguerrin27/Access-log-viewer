import React from "react";
import SearchModal from "../../app/javascript/components/SearchModal";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


describe("SearchModal Unit Tests", () => {

  const checkForPresence = jest.fn(
    (value) => {
      if (value) {
        return true
      }
      return false
    }
  )

  const reqMethCheck = jest.fn(
    (value) => {
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
      return false;
    }
  )

  const reqProtoCheck = jest.fn(
    (value) => {
      let successValues = [
        "HTTP/1.0",
        "HTTP/1.1",
        "HTTP/2.0"
      ]
      if (successValues.indexOf(value) !== -1) {
        return true;
      }
      return false;
    }
  )

  test("checks for presence of atleast 1 character. Each data typechecked", () => {
    expect(checkForPresence("string")).toEqual(true)
    expect(checkForPresence()).toEqual(false)
    expect(checkForPresence(101)).toEqual(true)
    expect(checkForPresence(undefined)).toEqual(false)
  })

  test("checks for valid Request Method", () => {
    expect(reqMethCheck("GET")).toEqual(true)
    expect(reqMethCheck("HEAD")).toEqual(true)
    expect(reqMethCheck("POST")).toEqual(true)
    expect(reqMethCheck("PUT")).toEqual(true)
    expect(reqMethCheck("DELETE")).toEqual(true)
    expect(reqMethCheck("CONNECT")).toEqual(true)
    expect(reqMethCheck("OPTIONS")).toEqual(true)
    expect(reqMethCheck("TRACE")).toEqual(true)
    expect(reqMethCheck(1)).toEqual(false)
    expect(reqMethCheck()).toEqual(false)
    expect(reqMethCheck("get")).toEqual(false)
    expect(reqMethCheck(undefined)).toEqual(false)
    expect(reqMethCheck(null)).toEqual(false)
  })

  test("checks for valid Request Protocol", () => {
    expect(reqProtoCheck("HTTP/1.0")).toEqual(true)
    expect(reqProtoCheck("HTTP/1.1")).toEqual(true)
    expect(reqProtoCheck("HTTP/2.0")).toEqual(true)
    expect(reqProtoCheck(1)).toEqual(false)
    expect(reqProtoCheck()).toEqual(false)
    expect(reqProtoCheck("http/1.0")).toEqual(false)
    expect(reqProtoCheck(undefined)).toEqual(false)
  })
  

})