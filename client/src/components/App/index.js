import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3v4';
import { getDataFromApi } from '../API';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mobileChinaData: null
    }
  }

  componentWillMount() {
      d3.queue()
        .defer(d3.json, getDataFromApi().then(results => {
          this.setState({
            mobileChinaData: results
          })
        }))
  }

  componentDidUpdate() {
    // const dateFormat = d3.timeFormat("%Y-%m-%d %H:%M:%S");
    // this.state.mobileChinaData.forEach((record) => {
    //   record['timestamp'] = dateFormat.parse(record["timestamp"]);
    //   record["timestamp"].setMinutes(0);
    //   record['timestamp'].setSeconds(0);
    //   record
    // })
  }
  

  render() {
    console.log(this.state)
    return (
      <div>
        App Works
      </div>
    );
  }
}

export default App;
