import { postListing, fetchListings } from 'helpers/api'
import { formatListing } from 'helpers/utils'

const FETCHING_LISTINGS = 'FETCHING_LISTINGS'
const FETCHING_LISTINGS_ERROR = 'FETCHING_LISTINGS_ERROR'
const FETCHING_LISTINGS_SUCCESS = 'FETCHING_LISTINGS_SUCCESS'
const ADD_LISTING = 'ADD_LISTING'
const ADD_LISTING_ERROR = 'ADD_LISTING_ERROR'
const REMOVE_LISTING = 'REMOVE_LISTING'

function addListing (studioId, listing) {
  return {
    type: ADD_LISTING,
    studioId,
    listing,
  }
}

function addListingError (error) {
  console.warn(error)
  return {
    type: ADD_LISTING_ERROR,
    error: 'Error adding listing',
  }
}

function removeListing (listingId) {
  return {
    type: REMOVE_LISTING,
    listingId,
  }
}

function fetchingListings () {
  return {
    type: FETCHING_LISTINGS,
  }
}

function fetchingListingsError (error) {
  console.warn(error)
  return {
    type: FETCHING_LISTINGS_ERROR,
    error: 'Error fetching listings',
  }
}

function fetchingListingsSuccess (studioId, listings) {
  return {
    type: FETCHING_LISTINGS_SUCCESS,
    listings,
    studioId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleListing (listing, studioId) {
  return function (dispatch, getState) {
    const authedId = getState().users.authedId
    const userInfo = getState().users[authedId].info
    const formattedListing = formatListing(listing, userInfo, studioId)
    const { listingWithId, listingPromise } = postListing(studioId, formattedListing)

    dispatch(addListing(studioId, listingWithId))
    listingPromise.catch((error) => {
      dispatch(removeListing(studioId, listingWithId.listingId))
      dispatch(addListingError(error))
    })
  }
}

export function fetchAndHandleListings (studioId) {
  return function (dispatch, getState) {
    dispatch(fetchingListings())

    fetchListings(studioId)
      .then((listings) => dispatch(fetchingListingsSuccess(studioId, listings, Date.now())))
      .catch((error) => dispatch(fetchingListingsError(error)))
  }
}

const initialListing = {
  name: '',
  listing: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  listingId: '',
}

function studioListings (state = initialListing, action) {
  switch (action.type) {
    case ADD_LISTING :
      return {
        ...state,
        [action.listing.listingId]: action.listing,
      }
    case REMOVE_LISTING :
      return {
        ...state,
        [action.listing.listingId]: undefined,
      }
    default :
      return state
  }
}

const initialDuckState = {
  lastUpdated: Date.now(),
  listings: {},
}

function listingsAndLastUpated (state = initialDuckState, action) {
  switch (action.type) {
    case FETCHING_LISTINGS_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        listings: action.listings,
      }
    case ADD_LISTING :
    case REMOVE_LISTING :
      return {
        ...state,
        listings: studioListings(state.listings, action),
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function listings (state = initialState, action) {
  switch (action.type) {
    case FETCHING_LISTINGS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_LISTINGS_ERROR :
    case ADD_LISTING_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_LISTING :
    case FETCHING_LISTINGS_SUCCESS :
    case REMOVE_LISTING :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.studioId]: listingsAndLastUpated(state[action.studioId], action),
      }
    default :
      return state
  }
}