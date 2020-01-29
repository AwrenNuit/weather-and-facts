import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class Weather extends Component{

  state = {
    temp: 0,
    high: '',
    low: ''
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_WEATHER`}); 
    this.props.dispatch({type: `GET_HISTORY_FACT`}); 
  }

  componentDidUpdate(prevProps){
    if(this.props.weather !== prevProps.weather){
      this.setState({temp:this.props.weather.temperatureHigh});
      this.highNumber(Math.round(this.props.weather.temperatureHigh));
      this.lowNumber(Math.round(this.props.weather.temperatureLow));
    }
  }

  highNumber = (num) => {
    Axios.get(`http://numbersapi.com/${num}/trivia`).then(response=>{
      this.setState({high: response.data});
    })
  }

  lowNumber = (num) => {
    Axios.get(`http://numbersapi.com/${num}/trivia`).then(response=>{
      this.setState({low: response.data});
    })
  }

  render(){
    let today = this.props.weather;
    let history = this.props.historyFact;

    return(
      <>
        <p>Summary: {today.summary}</p>
        <p>High: {this.state.high}</p>
        <p>Low: {this.state.low}</p>
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
        <p>In {history.year}, {history.text}</p>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  weather: reduxState.weatherReducer,
  historyFact: reduxState.historyFactReducer
});

export default connect(putReduxStateOnProps)(Weather);