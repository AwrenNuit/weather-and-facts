import React, {Component} from 'react';
import {connect} from 'react-redux';

class Weather extends Component{

  state = {
    temp: 0
  }

  componentDidMount(){
    console.log('in there');
    this.props.dispatch({type: `GET_WEATHER`});
  }

  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      this.setState({temp:this.props.reduxState.temperatureHigh});
    }
  }

  render(){
    let today = this.props.reduxState;

    return(
      <>
        <p>Summary: {today.summary}</p>
        <p>High: {today.temperatureHigh}</p>
        <p>Low: {today.temperatureLow}</p>
        <p>Humidity: {today.humidity * 100}%</p>
        <p>Wind Speed: {today.windSpeed}</p>
        <p>Moon Phase: {today.moonPhase * 100}% illuminated</p>
        {this.state.temp < 35 ? 
          <p>Dress warm today!</p>
          :
          ''
        }
        {this.state.temp > 75 ?
          <p>Dress light today!</p>
          :
          ''
        }
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState
});

export default connect(putReduxStateOnProps)(Weather);