import {routerStateReducer} from 'redux-router'
import {combineReducers} from 'redux'
import weiboList from './weiboList'
import {routerReducer} from 'react-router-redux/lib/reducer'

export default combineReducers({
    routing: routerReducer,
    weiboList
})
