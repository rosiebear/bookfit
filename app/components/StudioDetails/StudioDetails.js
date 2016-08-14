import React, { PropTypes } from 'react'
import { StudioContainer, SessionTypesContainer } from 'containers'

StudioDetails.propTypes = {
  studioId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default function StudioDetails ({studioId, isFetching, error}) {
  return (
    <div>
      {isFetching === true
        ? <p>{'Fetching'}</p>
        : <div>
            <StudioContainer studioId={studioId} />
          </div>}
      {error ? <p>{error}</p> : null}
    </div>
  )
}
