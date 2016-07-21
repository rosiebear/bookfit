import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'

Studio.propTypes = {
  studio: PropTypes.object.isRequired,
}

function Studio ({studio}) {
  return (
    <div>
      <div>
        <div>{studio.name}</div>
        <div>{studio.text}</div>
        <div>{formatTimestamp(studio.timestamp)}</div>
      </div>
    </div>
  )
}

UsersStudios.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  studios: PropTypes.object,
}

export default function UsersStudios ({studios, isFetching, error}) {
  const studioIds = Object.keys(studios)
  return (
    <div>
      {error ? <h3>{error}</h3> : null}
      {isFetching === true
        ? <p>{'Fetching Studios'}</p>
        : <div>
        <h1>{'Studios'}</h1>
        {studioIds.map((studioId) => (
          <Studio key={studioId} studio={studios[studioId]} />
        ))}
      </div>}
      {studioIds.length === 0 && isFetching === false ? <h3>{'Add your fitness studio. 😎'}</h3> : null}
    </div>
  )
}
