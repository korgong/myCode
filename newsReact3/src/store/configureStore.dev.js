import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import rootReducer from '../reducers/index'
import DevTools from '../containers/devTools'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, DevTools.instrument())
    return store
}
