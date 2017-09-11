import 'babel-polyfill'
import React from 'react'
import ReactDOM  from 'react-dom'
import configureStore from './src/store/configureStore.dev'
import { Provider } from 'react-redux'
import DevTools from './src/containers/devTools'
import getRoutes from './src/routes'
import style from './src/styles/weiboList.css'
const hashHistory = require('react-router').hashHistory
const syncHistoryWithStore = require('react-router-redux/lib/sync').default
const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
        <div>
          { getRoutes(history) }
          <DevTools />
        </div>
  </Provider>,
  document.getElementById('root')
)