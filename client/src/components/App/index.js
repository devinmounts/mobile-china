import React, { Component } from 'react';
import './App.css';
import queue from 'queue';
import * as d3 from 'd3v4';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      apiData: null
    }
  }

  componentWillMount() {
      d3.queue()
        // .defer(d3.json, )
    
  }
  
  makeGraphs(error, recordsJson) {
    const records = recordsJson;
    const dateFormat = d3.timeFormat("%Y-%m-%d %H:%M:%S");
    
    records.forEach((record) => {
      record['timestamp'] = dateFormat.parse(record["timestamp"]);
      record["timestamp"].setMinutes();
    })
  }
  
  render() {
    return (
      <div>
        App Works
      </div>
    );
  }
}

export default App;
