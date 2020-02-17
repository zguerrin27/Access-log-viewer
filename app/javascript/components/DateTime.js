import React, { Component } from 'react';
import { DatePicker } from 'antd';


class DateTime extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }



  onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk = (value) => {
    console.log('onOk: ', value);
  }



  render() {
    return (

      <div >
        <DatePicker showTime placeholder="Select Time" onChange={this.onChange} onOk={this.onOk} />
      </div>

    )
  }
}

export default DateTime;






