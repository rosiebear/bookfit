import { saveStudio, fetchStudio } from 'helpers/api'
import { addSingleUsersStudio } from './usersStudios'

const FETCHING_STUDIO = 'FETCHING_STUDIO'
const FETCHING_STUDIO_ERROR = 'FETCHING_STUDIO_ERROR'
const FETCHING_STUDIO_SUCCESS = 'FETCHING_STUDIO_SUCCESS'
const ADD_STUDIO = 'ADD_STUDIO'
const ADD_MULTIPLE_STUDIOS = 'ADD_MULTIPLE_STUDIOS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

function fetchingStudio () {
  return {
    type: FETCHING_STUDIO,
  }
}

function fetchingStudioError (error) {
  return {
    type: FETCHING_STUDIO_ERROR,
    error: 'Error fetching Studio',
  }
}

function fetchingStudioSuccess (studio) {
  return {
    type: FETCHING_STUDIO_SUCCESS,
    studio,
  }
}

export function removeFetching () {
  return {
    type: REMOVE_FETCHING,
  }
}

function addStudio (studio) {
  return {
    type: ADD_STUDIO,
    studio,
  }
}

export function addMultipleStudios (studios) {
  return {
    type: ADD_MULTIPLE_STUDIOS,
    studios,
  }
}

export function studioFanout (studio, user) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    saveStudio(studio, user)
      .then((studioWithId) => {
        dispatch(addStudio(studioWithId))
        dispatch(addSingleUsersStudio(uid, studioWithId.studioId))
      })
      .catch((err) => {
        console.warn('Error in studioFanout', err)
      })
  }
}

export function fetchAndHandleStudio (studioId) {
  return function (dispatch) {
    dispatch(fetchingStudio())
    fetchStudio(studioId)
      .then((studio) => dispatch(fetchingStudioSuccess(studio)))
      .catch((error) => dispatch(fetchingStudioError(error)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function studios (state = initialState, action) {
  switch (action.type) {
    case FETCHING_STUDIO :
      return {
        ...state,
        isFetching: true,
      }
    case ADD_STUDIO :
    case FETCHING_STUDIO_SUCCESS :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.studio.studioId]: action.studio,
      }
    case FETCHING_STUDIO_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING :
      return {
        ...state,
        error: '',
        isFetching: false,
      }
    case ADD_MULTIPLE_STUDIOS :
      return {
        ...state,
        ...action.studios,
      }
    default :
      return state
  }
}
