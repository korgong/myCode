import React from 'react'
import { IndexRoute, Route, Router, Link, Redirect} from 'react-router'
import WeiboList from './containers/weiboList'
import View from './containers/view'

export default function getRoutes(hashHistory) {

    // view路由观察渲染情况
    return (
      <Router history={hashHistory}>
        <Route path="/" component={WeiboList}/>
        <Route path="/view/:step" component={View}/>
      </Router>
    )
}