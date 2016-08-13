import React, { PropTypes } from 'react'
import { StudioContainer } from 'containers'

UsersStudios.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  studioIds: PropTypes.array,
}

export default function UsersStudios ({studioIds, isFetching, error}) {
  return (
    <div>
      {error ? <h3>{error}</h3> : null}
      {isFetching === true
        ? <p>{'Fetching Studios'}</p>
        : <div>
        <h1>{'Studios'}</h1>
        {studioIds.map((id) => (
          <StudioContainer key={id} studioId={id} />
        ))}
      </div>}
      {studioIds.length === 0 && isFetching === false ? <h3>{'Add your fitness studio. 😎'}</h3> : null}
    </div>
  )
}
