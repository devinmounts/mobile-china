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
      const dateFormatParser = d3.timeParse(dateFormatSpecifier);
      this.state.mobileChinaData.forEach((record) => {
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
      let numberRecordsND = dc.numberDisplay("#number-records-nd");
      let timeChart = dc.barChart('#time-chart');
      let genderChart = dc.rowChart('#gender-row-chart');
      let ageSegmentChart = dc.rowChart('#age-segment-row-chart');
      let phoneBrandChart = dc.rowChart('#phone-brand-row-chart');
      let locationChart = dc.rowChart('#location-row-chart');

      numberRecordsND
        .formatNumber(d3.format('d'))
        .valueAccessor((record) => {return record; })
        .group(all);
      
      timeChart
        .width(650)
        .height(140)
        .margins({top: 10, right: 50, bottom: 20, left: 20})
        .dimension(dateDim)
        .group(numRecordsByDate)
        .transitionDuration(500)
        .x(d3.scaleTime().domain([minDate, maxDate]))
        .elasticY(true)
        .yAxis().ticks(4);
      
      genderChart
        .width(300)
        .height(100)
        .dimension(genderDim)
        .group(genderGroup)
        .ordering((record) => {return -record.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

      ageSegmentChart
        .width(300)
        .height(150)
        .dimension(ageSegmentDim)
        .group(ageSegmentGroup)
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetX(10)
        .xAxis().ticks(4);

      phoneBrandChart
        .width(300)
        .height(310)
        .dimension(phoneBrandDim)
        .group(phoneBrandGroup)
        .ordering((record) => {return -record.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4)

      locationChart
        .width(200)
        .height(510)
        .dimension(locationDim)
        .group(locationGroup)
        .ordering((record) => {return -record.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

        
    } 
  }
  

  render() {
    // console.log(dc)
    return (
      <div>
        App Works
        <div id="time-chart"></div>
      </div>
    );
  }
}

export default App;
