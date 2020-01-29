import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import logger from 'redux-logger';
import axios from 'axios';
import App from './components/App/App';

function* rootSaga() {
  yield takeLatest('GET_HISTORY_FACT', getHistoryFact);
  yield takeLatest('GET_WEATHER', getWeather);
}

function* getHistoryFact(){
  try{
    const getResponse = yield axios.get(`/api/weather/history`);
    yield put({type: `SET_HISTORY_FACT`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET history fact', error);
  }
}

function* getWeather(){
  try{
    const getResponse = yield axios.get(`/api/weather`);
    yield put({type: `SET_WEATHER`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET weather', error);
  }
}

const weatherReducer = (state=[], action) => action.type === `SET_WEATHER` ? action.payload : state;

const historyFactReducer = (state=[], action) => action.type === `SET_HISTORY_FACT` ? action.payload : state;


const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  combineReducers({
    weatherReducer,
    historyFactReducer
  }),
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);