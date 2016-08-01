import { saveStudio, fetchUsersStudios } from 'helpers/api'

const ADD_STUDIO = 'ADD_STUDIO'
const ADD_STUDIO_ERROR = 'ADD_STUDIO'
const FETCHING_STUDIOS = 'FETCHING_STUDIOS'
const FETCHING_STUDIOS_SUCCESS = 'FETCHING_STUDIOS_SUCCESS'
const FETCHING_STUDIOS_ERROR = 'FETCHING_STUDIOS_ERROR'

function addStudio (studio) {
  return {
    type: ADD_STUDIO,
    studio,
  }
}

function addStudioError (error) {
  return {
    type: ADD_STUDIO_ERROR,
    error: `Error adding reply ${error}`,
  }
}

function fetchingStudios () {
  return {
    type: FETCHING_STUDIOS,
  }
}

function fetchingStudiosSuccess (studios) {
  return {
    type: FETCHING_STUDIOS_SUCCESS,
    studios,
    lastUpdated: Date.now(),
  }
}

function fetchingStudiosError (error) {
  return {
    type: FETCHING_STUDIOS_ERROR,
    error: `Fetching studios ${error}`,
  }
}

export function addAndHandleStudio (studio, user) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    saveStudio(studio, user)
      .then((studioWithId) => {
        dispatch(addStudio(uid, studioWithId.studioId))
      })
      .catch((err) => {
        dispatch(addStudioError(err))
      })
  }
}

export function fetchAndHandleStudios () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    dispatch(fetchingStudios())

    fetchUsersStudios(uid)
      .then((studios) => dispatch(fetchingStudiosSuccess(studios)))
      .catch((error) => dispatch(fetchingStudiosError(error)))
  }
}

const initialUsersStudioState = {
  isFetching: true,
  error: '',
  studios: {},
}

export default function usersStudio (state = initialUsersStudioState, action) {
  switch (action.type) {
    case ADD_STUDIO :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.studio.studioId]: action.studio,
      }
    case FETCHING_STUDIOS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_STUDIOS_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        studios: action.studios,
        isFetching: false
      }
    case ADD_STUDIO_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default :
      return state
  }
}