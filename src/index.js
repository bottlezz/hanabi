import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import App from './containers/App'
import store from './reduxStore'
import 'bootstrap/dist/css/bootstrap.css';
//import {GameData} from './hanabi/models'

//let hanabi= new GameData();

let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
