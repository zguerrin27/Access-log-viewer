import React from "react";
import SearchContainer from "../../app/javascript/components/SearchContainer";
import { shallow } from "enzyme";

// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16.1";

configure({ adapter: new Adapter() });

describe("SearchContainer Component", () => {
  it("Loads a list of requests", () => {
    const wrapper = shallow(<SearchContainer />);

    const logs = wrapper.find("requests");

    console.log("FROM SEARCH TEST", logs[0]);
    // expect(logs).toContain("requests");
  });
});
