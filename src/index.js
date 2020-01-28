import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import App from './components/App/App';

function* rootSaga() {
  yield takeLatest('GET_WEATHER', getWeather);
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


const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  weatherReducer,
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);