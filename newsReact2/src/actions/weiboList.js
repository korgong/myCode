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