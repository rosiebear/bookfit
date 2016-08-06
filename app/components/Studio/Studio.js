import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
const { func, object } = PropTypes

const Studio = ({studio, handleClick}) => (
  <div>
    <div onClick={handleClick}>
      {studio.name}
    </div>
    <div>{studio.text}</div>
    <div>{formatTimestamp(studio.timestamp)}</div>
  </div>
)

Studio.propTypes = {
  studio: object.isRequired,
  handleClick: func,
}

export default Studio
