import React from "react";
import axios from "axios";
import SearchModal from "../../app/javascript/components/SearchModal";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
axios.defaults.adapter = require("axios/lib/adapters/http");


describe("SearchModal Component", () => {

  it("checks to see if share button is present", async (done) => {

    const wrapper = shallow(<SearchModal />)
    console.log(wrapper.debug())
    expect(wrapper.find('share-button float-right'))
    done();

  })

})

