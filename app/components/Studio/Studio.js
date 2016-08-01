import React, { PropTypes } from 'react'
import { formatStudio } from 'helpers/utils'

const { object, func } = PropTypes
Studio.PropTypes = {
  user: object.isRequired,
  addAndHandleStudio: func.isRequired,
}

export default function Studio (props) {

  function submitStudio () {
    if (Studio.ref.value.length === 0) {
      return
    }
    props.addAndHandleStudio(formatStudio(Studio.ref.value, props.user), props.user)
    Studio.ref.value = ''
  }

  return (
    <div>
      {'Add Studio'}
        <div>
          <input
            ref={(ref) => Studio.ref = ref}
            type='text'
            placeholder="Studio Name" />
        </div>
        <button
          onClick={submitStudio}>
            {'Save Studio'}
        </button>
    </div>
  )
}
