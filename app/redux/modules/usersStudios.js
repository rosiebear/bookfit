import { saveStudio, fetchStudios } from 'helpers/api'

const ADD_STUDIO = 'ADD_STUDIO'
const ADD_STUDIO_ERROR = 'ADD_STUDIO'
const FETCHING_STUDIOS = 'FETCHING_STUDIOS'

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

export function addAndHandleStudio (studio) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    saveStudio(studio)
      .then((studioWithId) => {
        dispatch(addStudio(uid, studioWithId.studioId))
      })
      .catch((err) => {
        dispatch(addStudioError(err))
      })
  }
}

const initialUsersStudioState = {
  isFetching: true,
  error: ''
}

function usersStudio (state = initialUsersStudioState, action) {
  switch (action.type) {
    case ADD_STUDIO :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.studio.studioId]: action.studio,
      }
    default :
      return state
  }
}