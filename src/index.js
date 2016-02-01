import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import App from './containers/App'

//import {socket} from './actions'
import store from './reduxStore'
let rootElement = document.getElementById('root')


render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
