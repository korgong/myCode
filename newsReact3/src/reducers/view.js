import { combineReducers } from 'redux'
import * as actionConstants from '../actions/actionConstants'

export default function weiboList(state = {items:[]}, action) {
    let result = action.response
    switch (action.type) {
        case actionConstants.GET_WEIBO_LIST_SUCCESS:
            return  Object.assign({},state,{items:result})
        default:
            return state
    }
}