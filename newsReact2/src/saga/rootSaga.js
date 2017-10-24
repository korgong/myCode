import { take, put, call, fork, race, cancelled } from 'redux-saga/effects'
import { delay, takeEvery, eventChannel, END } from 'redux-saga'
import * as actionConstants from '../actions/actionConstants'
import * as WeiboListSaga from './weiboListSaga'

export default function* rootSaga() {
    yield takeEvery(actionConstants.GET_WEIBO_LIST_REQUEST, mapPayload(WeiboListSaga.getWeiboList))
    yield takeEvery(actionConstants.GET_GRADE_REQUEST, mapPayload(WeiboListSaga.getGrade))
}

/**
 * 提取action.payload
 * saga层直接接触参数,便于saga复用
 * @param func
 * @returns {mapFunc}
 */
function mapPayload(func) {
    return function* mapFunc(action) {
        return yield func.call(this, action.payload)
    }
}
