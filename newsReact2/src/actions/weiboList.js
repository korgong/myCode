import * as actionConstants from './actionConstants'

/**
 * 获取weibo列表
 * @export
 */
export function getweiboList() {
    return {
        type: actionConstants.GET_WEIBO_LIST_REQUEST,
        payload: {}
    }
}

/**
 * 获取整个年级的信息
 * @export
 */
export function getGrade() {
    return {
        type: actionConstants.GET_GRADE_REQUEST,
        payload: {}
    }
}