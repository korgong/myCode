/*eslint-disable*/
import React from 'react'
import { Route } from 'react-router'
import * as containers from './containers'
/*eslint-enable*/

const {
  CounterPage,App
} = containers

export default (
  <Route component={App}>
    <Route path="/" component={CounterPage} />
  </Route>
)
