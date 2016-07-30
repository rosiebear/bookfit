import React from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import { MainContainer, HomeContainer, AuthenticateContainer, StudioContainer,
  LogoutContainer, UserContainer, UsersStudiosContainer } from 'containers'

export default function getRoutes (checkAuth, browserHistory) {
  return (
    <Router history={browserHistory}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='studio' component={StudioContainer} onEnter={checkAuth} />
        <Route path='userstudios' component={UsersStudiosContainer}  onEnter={checkAuth}  />
        <Route path='logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  )
}