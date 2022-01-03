import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './Components/App'

//REDUX
import {createStore} from 'redux'
import AllReducer from './Reducer/AllReducer'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(AllReducer,composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>

  ,document.getElementById('root')
);
