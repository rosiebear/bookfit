import { ref } from 'config/constants'

// save user to teams
//  teams
//    studioId
//      uid

// add schedule to studioSchedules
//  studioSchedules
//    studioId
//      scheduleId

function saveToStudios (studio) {
  const studioId = ref.child('studios').push().key
  const studioPromise = ref.child(`studios/${studioId}`).set({...studio, studioId})

  return {
    studioId,
    studioPromise,
  }
}

function saveToUsersStudios (studio, studioId) {
  return ref.child(`usersStudios/${studio.uid}/${studioId}`)
    .set({...studio, studioId})
}

function saveUserToStudiosTeams (user, studioId) {
  return ref.child(`studiosTeams/${studioId}/${user.uid}/`)
    .set({...user, studioId})
}

function saveToStudiosSchedules (user, studioId) {
  const scheduleId = ref.child(`studiosSchedules/${studioId}`).push().key
  const scheduleWithId = {uid: user.uid, scheduleId}
  return ref.child(`studiosSchedules/${studioId}/${scheduleId}`).set(scheduleWithId)
}

export function saveStudio (studio, user) {
  const { studioId, studioPromise } = saveToStudios(studio)

  return Promise.all([
    studioPromise,
    saveToUsersStudios(studio, studioId),
    saveUserToStudiosTeams(user, studioId),
    saveToStudiosSchedules(user, studioId),
  ]).then(() => ({...studio, studioId}))
}

export function fetchUsersStudios (uid) {
  return ref.child(`usersStudios/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function postSessionType (studioId, sessionType) {
  const sessionTypeId = ref.child(`sessionTypes/${studioId}`).push().key
  const sessionTypeWithId = {...sessionType, sessionTypeId}
  const sessionTypePromise = ref.child(`sessionTypes/${studioId}/${sessionTypeId}`).set(sessionTypeWithId)

  return {
    sessionTypeWithId,
    sessionTypePromise,
  }
}

export function fetchSessionTypes (studioId) {
  console.log(studioId)
  return ref.child(`sessionTypes/${studioId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

// DUCK STUFF
function saveToDucks (duck) {
  const duckId = ref.child('ducks').push().key
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  return {
    duckId,
    duckPromise,
  }
}

function saveToUsersDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (cb, errorCB) {
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  }, errorCB)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchUsersDucks (uid) {
  return ref.child(`usersDucks/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchDuck (duckId) {
  return ref.child(`ducks/${duckId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}

export function postReply (duckId, reply) {
  const replyId = ref.child(`replies/${duckId}`).push().key
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${duckId}/${replyId}`).set(replyWithId)

  return {
    replyWithId,
    replyPromise,
  }
}

export function fetchReplies (duckId) {
  return ref.child(`replies/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
