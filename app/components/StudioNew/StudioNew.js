import React, { PropTypes } from 'react'
import { formatStudio } from 'helpers/utils'

const { object, func } = PropTypes
StudioNew.PropTypes = {
  user: object.isRequired,
  addAndHandleStudio: func.isRequired,
}

export default function StudioNew (props) {
  function submitStudio () {
    if (StudioNew.ref.value.length === 0) {
      return
    }
    props.addAndHandleStudio(formatStudio(StudioNew.ref.value, props.user), props.user)
    StudioNew.ref.value = ''
  }

  return (
    <div>
      {'Add Studio'}
        <div>
          <input
            ref={(ref) => StudioNew.ref = ref}
            type='text'
            placeholder='Studio Name' />
        </div>
        <button
          onClick={submitStudio}>
            {'Save Studio'}
        </button>
    </div>
  )
}
