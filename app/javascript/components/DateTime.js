import React, { Component } from 'react';
import { DatePicker } from 'antd';


class DateTime extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }

  }

  onChange = (value, dateString) => {
    this.props.dateTimeOnChange(dateString)
  }

  // onOk = (value) => {
  //   console.log('onOk: ', value);
  // }

  render() {
    return (
      <div className="dateTimeDiv">
        <DatePicker showTime placeholder="Select Time" onChange={this.onChange} onOk={this.onOk} />
      </div>
    )
  }
}

export default DateTime;






