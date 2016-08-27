import { getAddress } from 'helpers/gmaps'

const ADD_JOURNEY_ORIGIN = 'ADD_JOURNEY_ORIGIN'
const ADD_JOURNEY_DESTINATION = 'ADD_JOURNEY_DESTINATION'

export const addJourneyOrigin = (place) => {
  const { id, address } = getAddress(place)
  return {
    type: ADD_JOURNEY_ORIGIN,
    id,
    address,
    place,
  }
}

export const addJourneyDestination = (place) => {
  const { id, address } = getAddress(place)
  return {
    type: ADD_JOURNEY_DESTINATION,
    id,
    address,
    place,
  }
}

const initialState = {
  isFetching: true,
  error: '',
  destinationId: '',
  destinationAddress: {},
  destinationPlace: {},
  originId: '',
  originAddress: {},
  originPlace: {},
}

export default function journey (state = initialState, action) {
  switch (action.type) {
    case ADD_JOURNEY_ORIGIN :
      return {
        ...state,
        originId: action.id,
        originAddress: action.address,
        originPlace: action.place,
      }
    case ADD_JOURNEY_DESTINATION :
      return {
        ...state,
        destinationId: action.id,
        destinationAddress: action.address,
        destinationPlace: action.place,
      }
    default :
      return state
  }
}
