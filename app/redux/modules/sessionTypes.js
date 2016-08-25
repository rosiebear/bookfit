import { postSessionType, fetchSessionTypes } from 'helpers/api'
import { formatSessionType } from 'helpers/utils'

const FETCHING_STUDIO_TYPES = 'FETCHING_STUDIO_TYPES'
const FETCHING_STUDIO_TYPES_ERROR = 'FETCHING_STUDIO_TYPES_ERROR'
const FETCHING_STUDIO_TYPES_SUCCESS = 'FETCHING_STUDIO_TYPES_SUCCESS'
const ADD_STUDIO_TYPE = 'ADD_STUDIO_TYPE'
const ADD_STUDIO_TYPE_ERROR = 'ADD_STUDIO_TYPE_ERROR'
const REMOVE_STUDIO_TYPE = 'REMOVE_STUDIO_TYPE'

function addSessionType (studioId, sessionType) {
  return {
    type: ADD_STUDIO_TYPE,
    studioId,
    sessionType,
  }
}

function addSessionTypeError (error) {
  console.warn(error)
  return {
    type: ADD_STUDIO_TYPE_ERROR,
    error: 'Error adding sessionType',
  }
}

function removeSessionType (sessionTypeId) {
  return {
    type: REMOVE_STUDIO_TYPE,
    sessionTypeId,
  }
}

function fetchingSessionTypes () {
  return {
    type: FETCHING_STUDIO_TYPES,
  }
}

function fetchingSessionTypesError (error) {
  console.warn(error)
  return {
    type: FETCHING_STUDIO_TYPES_ERROR,
    error: 'Error fetching sessionTypes',
  }
}

function fetchingSessionTypesSuccess (studioId, sessionTypes) {
  return {
    type: FETCHING_STUDIO_TYPES_SUCCESS,
    sessionTypes,
    studioId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleSessionType (sessionType, studioId) {
  return function (dispatch, getState) {
    const authedId = getState().users.authedId
    const userInfo = getState().users[authedId].info
    const formattedSessionType = formatSessionType(sessionType, userInfo, studioId)
    const { sessionTypeWithId, sessionTypePromise } = postSessionType(studioId, formattedSessionType)

    dispatch(addSessionType(studioId, sessionTypeWithId))
    sessionTypePromise.catch((error) => {
      dispatch(removeSessionType(studioId, sessionTypeWithId.sessionTypeId))
      dispatch(addSessionTypeError(error))
    })
  }
}

export function fetchAndHandleSessionTypes (studioId) {
  return function (dispatch, getState) {
    dispatch(fetchingSessionTypes())

    fetchSessionTypes(studioId)
      .then((sessionTypes) => dispatch(fetchingSessionTypesSuccess(studioId, sessionTypes, Date.now())))
      .catch((error) => dispatch(fetchingSessionTypesError(error)))
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
    case ADD_STUDIO_TYPE :
      return {
        ...state,
        [action.sessionType.sessionTypeId]: action.sessionType,
      }
    case REMOVE_STUDIO_TYPE :
      return {
        ...state,
        [action.sessionType.sessionTypeId]: undefined,
      }
    default :
      return state
  }
}

const initialDuckState = {
  lastUpdated: Date.now(),
  sessionTypes: {},
}

function sessionTypesAndLastUpated (state = initialDuckState, action) {
  switch (action.type) {
    case FETCHING_STUDIO_TYPES_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        sessionTypes: action.sessionTypes,
      }
    case ADD_STUDIO_TYPE :
    case REMOVE_STUDIO_TYPE :
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
    case FETCHING_STUDIO_TYPES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_STUDIO_TYPES_ERROR :
    case ADD_STUDIO_TYPE_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_STUDIO_TYPE :
    case FETCHING_STUDIO_TYPES_SUCCESS :
    case REMOVE_STUDIO_TYPE :
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
