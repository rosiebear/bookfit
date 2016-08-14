import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import { errorMsg } from 'sharedStyles/styles.css'
const { bool, string, object } = PropTypes

SessionType.propTypes = {
  sessionType: object.isRequired,
}

function SessionType ({sessionType}) {
  return (
    <div>
      <div>
        <div>{sessionType.title}</div>
        <div>{formatTimestamp(sessionType.timestamp)}</div>
        <div>{sessionType.description}</div>
      </div>
    </div>
  )
}

SessionTypes.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  sessionTypes: object,
}

function SessionTypes ({sessionTypes, error, isFetching}) {
  const sessionTypeIds = Object.keys(sessionTypes)
  return (
    <div>
      {error ? <h3>{error}</h3> : null}
      {isFetching === true
        ? <p>{'Fetching SessionTypes'}</p>
        : <div>
        <h1>{'SessionTypes'}</h1>
        {sessionTypeIds.map((sessionTypeId) => (
          <SessionType key={sessionTypeId} sessionType={sessionTypes[sessionTypeId]} />
        ))}
      </div>}
      {sessionTypeIds.length === 0 ? <h3>{'Add the first session type. 😎'}</h3> : null}
    </div>
  )
}

export default SessionTypes