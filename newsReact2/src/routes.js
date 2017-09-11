import React from 'react'
import { IndexRoute, Route, Router, Link, Redirect} from 'react-router'
import WeiboList from './containers/weiboList'
import View from './containers/view'

export default function getRoutes(hashHistory) {

    return (
      <Router history={hashHistory}>
        <Route path="/" component={WeiboList}/>
        <Route path="/view/:step" component={View}/>
      </Router>
    )
}