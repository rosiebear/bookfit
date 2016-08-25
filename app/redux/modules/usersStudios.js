import { fetchUsersStudios } from 'helpers/api'
import { addMultipleStudios } from 'redux/modules/studios'

const FETCHING_USERS_STUDIOS = 'FETCHING_USERS_STUDIOS'
const FETCHING_USERS_STUDIOS_ERROR = 'FETCHING_USERS_STUDIOS_ERROR'
const FETCHING_USERS_STUDIOS_SUCCESS = 'FETCHING_USERS_STUDIOS_SUCCESS'
const ADD_SINGLE_USERS_STUDIO = 'ADD_SINGLE_USERS_STUDIO'

function fetchingUsersStudios (uid) {
  return {
    type: FETCHING_USERS_STUDIOS,
    uid,
  }
}

function fetchingUsersStudiosError (error) {
  console.warn(error)
  return {
    type: FETCHING_USERS_STUDIOS_ERROR,
    error: 'Error fetching Users Studio Ids' + error,
  }
}

function fetchingUsersStudiosSuccess (uid, studioIds, lastUpdated) {
  return {
    type: FETCHING_USERS_STUDIOS_SUCCESS,
    uid,
    studioIds,
    lastUpdated,
  }
}

export function addSingleUsersStudio (uid, studioId) {
  return {
    type: ADD_SINGLE_USERS_STUDIO,
    uid,
    studioId,
  }
}

const initialUsersStudioState = {
  lastUpdated: 0,
  studioIds: [],
}

function usersStudio (state = initialUsersStudioState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_STUDIO :
      return {
        ...state,
        studioIds: state.studioIds.concat([action.studioId]),
      }
    default :
      return state
  }
}

export function fetchAndHandleUsersStudios (uid) {
  return function (dispatch, getState) {
    dispatch(fetchingUsersStudios())

    fetchUsersStudios(uid)
      .then((studios) => dispatch(addMultipleStudios(studios)))
      .then(({studios}) => dispatch(
        fetchingUsersStudiosSuccess(
          uid,
          Object.keys(studios).sort((a, b) => studios[b].timestamp - studios[a].timestamp),
          Date.now())
        )
      )
      .catch((error) => dispatch(fetchingUsersStudiosError(error)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function usersStudios (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_STUDIOS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USERS_STUDIOS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USERS_STUDIOS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          studioIds: action.studioIds,
        },
      }
    case ADD_SINGLE_USERS_STUDIO :
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersStudio(state[action.uid], action),
        }
    default :
      return state
  }
}
