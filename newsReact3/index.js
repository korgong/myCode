import 'babel-polyfill'
import React from 'react'
import ReactDOM  from 'react-dom'
import configureStore from './src/store/configureStore.dev'
import View from './src/containers/view'
import { Provider } from 'react-redux'
import DevTools from './src/containers/devTools'
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
        <div>
            <View/>
            <DevTools />
        </div>
  </Provider>,
  document.getElementById('root')
)