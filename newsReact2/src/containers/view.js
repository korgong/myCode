import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import View from '../components/view'

let runConnect = connect(
    (state) => ({
    }),
    (dispatch)=>({
    }),
    (x, y, props) => {
        return {
            ...x,
            ...y
        }
    }
)
let EditMode = runConnect(View)

export default EditMode