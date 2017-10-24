import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux/lib/actions'
import WeiboList from '../components/weiboList'
import {getweiboList,getGrade} from '../actions/weiboList'

let runConnect = connect(
    (state) => ({
        weiboList:state.weiboList.items,
        grade:state.grade.items
    }),
    (dispatch)=>({
        push:(...args)=>dispatch(push(...args)),
        getWeiboList:(...args)=>dispatch(getweiboList(...args)),
        getGrade:(...args)=>dispatch(getGrade(...args))
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