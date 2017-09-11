import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reduxReactRouter } from 'redux-router'
import DevTools from '../containers/devTools'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/rootSaga'
import {hashHistory} from 'react-router'
import routerMiddleware from 'react-router-redux/lib/middleware'

const sagaMiddleware = createSagaMiddleware()

const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware, thunk),
  applyMiddleware(routerMiddleware(hashHistory)),
  applyMiddleware(createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
)(createStore)

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState)
    sagaMiddleware.run(rootSaga)
    return store
}
