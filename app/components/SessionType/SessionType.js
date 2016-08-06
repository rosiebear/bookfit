import React, { PropTypes } from 'react'

SessionType.propTypes = {
  submit: PropTypes.func.isRequired,
}

function SessionType ({ submit }) {
  const handleSubmit = (e) => {
    if (SessionType.ref.value.length === 0) return
    submit(SessionType.ref.value, e)
    SessionType.ref.value = ''
  }

  return (
    <div>
      <textarea
        ref={(ref) => (SessionType.ref = ref)}
        maxLength={140}
        type='text'
        placeholder='Your reponse'/>
      <button
        onClick={handleSubmit}>
        {'Submit'}
      </button>
    </div>
  )
}

export default SessionType