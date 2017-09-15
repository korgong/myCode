import 'babel-polyfill'
import React from 'react'
import ReactDOM  from 'react-dom'
import configureStore from './src/store/configureStore.dev'
import { Provider } from 'react-redux'
import DevTools from './src/containers/devTools'
import style from './src/styles/weiboList.css'
import getRoutes from './src/routes'
const store = configureStore()
import { hashHistory } from 'react-router'
import syncHistoryWithStore from 'react-router-redux/lib/sync'
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