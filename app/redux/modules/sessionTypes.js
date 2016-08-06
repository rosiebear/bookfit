import { postSessionType } from 'helpers/api'

const FETCHING_SESSION_TYPES = 'FETCHING_SESSION_TYPES'
const FETCHING_SESSION_TYPES_ERROR = 'FETCHING_SESSION_TYPES_ERROR'
const FETCHING_SESSION_TYPES_SUCCESS = 'FETCHING_SESSION_TYPES_SUCCESS'
const ADD_SESSION_TYPE = 'ADD_SESSION_TYPE'
const ADD_SESSION_TYPE_ERROR = 'ADD_SESSION_TYPE_ERROR'
const REMOVE_SESSION_TYPE = 'REMOVE_SESSION_TYPE'

function addSessionType (studioId, sessionType) {
  return {
    type: ADD_SESSION_TYPE,
    studioId,
    sessionType,
  }
}

function addSessionTypeError (error) {
  console.warn(error)
  return {
    type: ADD_SESSION_TYPE_ERROR,
    error: 'Error adding sessionType',
  }
}

function removeSessionType (studioId, sessionTypeId) {
  return {
    type: REMOVE_SESSION_TYPE,
    sessionTypeId,
  }
}

function fetchingSessionTypes () {
  return {
    type: FETCHING_SESSION_TYPES,
  }
}

function fetchingSessionTypesError (error) {
  return {
    type: FETCHING_SESSION_TYPES_ERROR,
    error: `Error fetching sessionTypes ${error}`,
  }
}

function fetchingSessionTypesSuccess (studioId, sessionTypes) {
  return {
    type: FETCHING_SESSION_TYPES_SUCCESS,
    sessionTypes,
    studioId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleSessionType (studioId, sessionType) {
  return function (dispatch) {
    const { sessionTypeWithId, sessionTypePromise } = postSessionType(studioId, sessionType)
    console.log(sessionTypeWithId)
    dispatch(addSessionType(studioId, sessionTypeWithId))
    sessionTypePromise.catch((error) => {
      dispatch(removeSessionType(studioId, sessionTypeWithId.sessionType.Id))
      dispatch(addSessionTypeError(error))
    })
  }
}

const initialSessionType = {
  name: '',
  sessionType: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  sessionTypeId: '',
}

function studioSessionTypes (state = initialSessionType, action) {
  switch (action.type) {
    case ADD_SESSION_TYPE :
      return {
        ...state,
        [action.sessionType.sessionTypeId]: action.sessionType,
      }
    case REMOVE_SESSION_TYPE :
      return {
        ...state,
        [action.sessionType.sessionTypeId]: undefined,
      }
    default :
      return state
  }
}

const initialStudioState = {
  lastUpdated: Date.now(),
  sessionTypes: {},
}

function sessionTypesAndLastUpated (state = initialStudioState, action) {
  switch (action.type) {
    case FETCHING_SESSION_TYPES_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        sessionTypes: action.sessionTypes,
      }
    case ADD_SESSION_TYPE :
    case REMOVE_SESSION_TYPE :
      return {
        ...state,
        sessionTypes: studioSessionTypes(state.sessionTypes, action),
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function sessionTypes (state = initialState, action) {
  switch (action.type) {
    case FETCHING_SESSION_TYPES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_SESSION_TYPES_ERROR :
    case ADD_SESSION_TYPE_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_SESSION_TYPE :
    case FETCHING_SESSION_TYPES_SUCCESS :
    case REMOVE_SESSION_TYPE :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.studioId]: sessionTypesAndLastUpated(state[action.studioId], action),
      }
    default :
      return state
  }
}