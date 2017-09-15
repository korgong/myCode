/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
})

const enforceImmutableMiddleware = require('redux-immutable-state-invariant')()

let createStoreWithMiddleware

  const DevTools = require('../containers/DevTools')
  createStoreWithMiddleware = compose(
    applyMiddleware(
      enforceImmutableMiddleware,
      thunkMiddleware,
      promiseMiddleware,
      loggerMiddleware
    ),
    DevTools.instrument(),
  )(createStore)

/**
 * Creates a preconfigured store.
 */
export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}
