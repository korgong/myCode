import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux/lib/actions'
import WeiboList from '../components/weiboList'
import {getweiboList} from '../actions/weiboList'

let runConnect = connect(
    (state) => ({
        weiboList:state.weiboList.items
    }),
    (dispatch)=>({
        push,
        getWeiboList:(...args)=>dispatch(getweiboList(...args))
    }),
    (x, y, props) => {
        return {
            ...x,
            ...y
        }
    }
)
let EditMode = runConnect(WeiboList)

export default EditMode