import React,{Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class VarianceAnalysisChart extends Component{
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
    this.data=nextProps.chart_data;
  }

  render(){
    console.log(this.props.chart_data);

    return(
      <BarChart width={600} height={300} data={this.props.chart_data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="date"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="value" fill="#8884d8" />

      </BarChart>
    );
  }
}


function mapStateToProps(state){
  return {
    chart_data:state.variance_analysis_store.variance_chart_data
  };
}



const VisibleVarianceAnalysisChart=connect(mapStateToProps)(VarianceAnalysisChart);

export default VisibleVarianceAnalysisChart;
