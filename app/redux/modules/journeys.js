import { postJourney, fetchJourneys } from 'helpers/api'
import { formatJourney } from 'helpers/utils'

const FETCHING_JOURNEYS = 'FETCHING_JOURNEYS'
const FETCHING_JOURNEYS_ERROR = 'FETCHING_JOURNEYS_ERROR'
const FETCHING_JOURNEYS_SUCCESS = 'FETCHING_JOURNEYS_SUCCESS'
const ADD_JOURNEY = 'ADD_JOURNEY'
const ADD_JOURNEY_ERROR = 'ADD_JOURNEY_ERROR'
const REMOVE_JOURNEY = 'REMOVE_JOURNEY'

function addJourney (userId, journey) {
  return {
    type: ADD_JOURNEY,
    userId,
    journey,
  }
}

function addJourneyError (error) {
  return {
    type: ADD_JOURNEY_ERROR,
    error: 'Error adding journey',
  }
}

function removeJourney (journeyId) {
  return {
    type: REMOVE_JOURNEY,
    journeyId,
  }
}

function fetchingJourneys () {
  return {
    type: FETCHING_JOURNEYS,
  }
}

function fetchingJourneysError (error) {
  console.warn(error)
  return {
    type: FETCHING_JOURNEYS_ERROR,
    error: 'Error fetching journeys',
  }
}

function fetchingJourneysSuccess (userId, journeys) {
  return {
    type: FETCHING_JOURNEYS_SUCCESS,
    journeys,
    userId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleJourney (journey, userId) {
  return function (dispatch, getState) {
    const authedId = getState().users.authedId
    const userInfo = getState().users[authedId].info
    const formattedJourney = formatJourney(journey, userInfo, userId)
    const { journeyWithId, journeyPromise } = postJourney(userId, formattedJourney)

    dispatch(addJourney(userId, journeyWithId))
    journeyPromise.catch((error) => {
      dispatch(removeJourney(userId, journeyWithId.journeyId))
      dispatch(addJourneyError(error))
    })
  }
}

export function fetchAndHandleJourneys (userId) {
  return function (dispatch, getState) {
    dispatch(fetchingJourneys())

    fetchJourneys(userId)
      .then((journeys) => dispatch(fetchingJourneysSuccess(userId, journeys, Date.now())))
      .catch((error) => dispatch(fetchingJourneysError(error)))
  }
}

const initialJourney = {
  name: '',
  journey: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  journeyId: '',
}

function userJourneys (state = initialJourney, action) {
  switch (action.type) {
    case ADD_JOURNEY :
      return {
        ...state,
        [action.journey.journeyId]: action.journey,
      }
    case REMOVE_JOURNEY :
      return {
        ...state,
        [action.journey.journeyId]: undefined,
      }
    default :
      return state
  }
}

const initialJourneyState = {
  lastUpdated: Date.now(),
  journeys: {},
}

function journeysAndLastUpated (state = initialJourneyState, action) {
  switch (action.type) {
    case FETCHING_JOURNEYS_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        journeys: action.journeys,
      }
    case ADD_JOURNEY :
    case REMOVE_JOURNEY :
      return {
        ...state,
        journeys: userJourneys(state.journeys, action),
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function journeys (state = initialState, action) {
  switch (action.type) {
    case FETCHING_JOURNEYS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_JOURNEYS_ERROR :
    case ADD_JOURNEY_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_JOURNEY :
    case FETCHING_JOURNEYS_SUCCESS :
    case REMOVE_JOURNEY :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.userId]: journeysAndLastUpated(state[action.userId], action),
      }
    default :
      return state
  }
}
