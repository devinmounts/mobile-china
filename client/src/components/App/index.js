import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3v4';
import dc from 'dc';
import { getDataFromApi } from '../API';
import crossfilter from 'crossfilter';
// import * as dc from 'dcharts';


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
    if (this.state.mobileChinaData) {
      
      //Clean Data
      const dateFormatSpecifier = "%Y-%m-%d %H:%M:%S";
      const dateFormat = d3.timeFormat(dateFormatSpecifier);
      const dateFormatParser = d3.timeParse(dateFormatSpecifier);
      this.state.mobileChinaData.forEach((record) => {
        record['timestamp'] = dateFormat(record['timestamp']);
        record['timestamp'] = dateFormatParser(record["timestamp"]);
        record["timestamp"].setMinutes(0);
        record['timestamp'].setSeconds(0);
        record['longitude'] = +record['longitude'];
        record['latitude'] = +record['latitude'];
      });
      console.log(this.state.mobileChinaData);

      //Create Crossfilter instance
      let ndx = crossfilter(this.state.mobileChinaData);

      //Define Dimensions
      let dateDim = ndx.dimension((record) => {return record['timestamp']; });
      let genderDim = ndx.dimension((record) => {return record['gender']; });
      let ageSegmentDim = ndx.dimension((record) => {return record['age_segment']; });
      let phoneBrandDim = ndx.dimension((record) => {return record['phone_brand_en']; });
      let locationDim = ndx.dimension((record) => {return record['location']; });
      let allDim = ndx.dimension((record) => {return record;});

      //Group Data
      let numRecordsByDate = dateDim.group();
      let genderGroup = genderDim.group();
      let ageSegmentGroup = ageSegmentDim.group();
      let phoneBrandGroup = phoneBrandDim.group();
      let locationGroup = locationDim.group();
      let all = ndx.groupAll();

      //Define values for charts
      let minDate = dateDim.bottom(1)[0]['timestamp'];
      let maxDate = dateDim.top(1)[0]['timestamp'];


      //Charts
      
    } 
  }
  

  render() {
    // console.log(dc)
    return (
      <div>
        App Works
      </div>
    );
  }
}

export default App;
