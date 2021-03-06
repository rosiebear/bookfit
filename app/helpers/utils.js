import { usersDucksExpirationLength, userExpirationLength, sessionTypesExpirationLength } from 'config/constants'

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}

export function formatStudio (text, {name, avatar, uid}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}

export function formatSessionType (values, {name, uid}, studioId) {
  return {
    ...values,
    name,
    uid,
    studioId,
    timestamp: Date.now(),
  }
}

export function formatDuck (text, {name, avatar, uid}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleDucks (timestamp) {
  return getMilliseconds(timestamp) > usersDucksExpirationLength
}

export function staleUser (timestamp) {
  return getMilliseconds(timestamp) > userExpirationLength
}

export function staleSessionTypes (timestamp) {
  return getMilliseconds(timestamp) > sessionTypesExpirationLength
}

export function formatReply ({name, uid, avatar}, reply) {
  return {
    name,
    reply,
    uid,
    avatar,
    timestamp: Date.now(),
  }
}
