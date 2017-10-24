import * as effects from 'redux-saga/effects'
import * as actionConstants from '../actions/actionConstants'
import fetch from 'isomorphic-fetch'

let {put, take, call, select} = effects

/**
 * 获取版本信息列表
 * @export
 * @param {any} {caseId}
 */
export function *getWeiboList() {
    try {
        let response = yield fetch('http://192.168.85.53:9090/api/v1/weibos').then((res,rej)=>{
            return res.json()
        })
        yield put({type: actionConstants.GET_WEIBO_LIST_SUCCESS, response})
    } catch (error) {
        yield put({type: actionConstants.GET_WEIBO_LIST_FAILURE, error})
    }
}

/**
 * 获取年级的信息
 * @export
 */
export function *getGrade() {
    try {
        let response = yield fetch('http://192.168.85.53:9090/api/v1/grade').then((res,rej)=>{
            return res.json()
        })
        yield put({type: actionConstants.GET_GRADE_SUCCESS, response})
    } catch (error) {
        yield put({type: actionConstants.GET_GRADE_FAILURE, error})
    }
}