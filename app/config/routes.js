import React from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import { MainContainer, HomeContainer, AuthenticateContainer, LogoutContainer,
  UsersStudiosContainer, SessionTypeContainer, StudioNewContainer, StudioDetailsContainer } from 'containers'

export default function getRoutes (checkAuth, hashHistory) {
  return (
    <Router history={hashHistory}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='studionew' component={StudioNewContainer} onEnter={checkAuth} />
        <Route path='userstudios/:uid' component={UsersStudiosContainer} onEnter={checkAuth} />
        <Route path='studio-detail/:studioId' component={StudioDetailsContainer} onEnter={checkAuth} />
        <Route path='sessiontypes/:studioId' component={SessionTypeContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  )
}
