import React, { Component } from 'react'
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';


class NavigationBar extends Component {
  constructor(props){
    super(props)


  }

  render(){
    return(
      <div>
      <Navbar color="dark">
        <NavbarBrand id="nav-logo">AccessLogViewer</NavbarBrand>
      </Navbar>
    </div>
    )
  }
}

export default NavigationBar