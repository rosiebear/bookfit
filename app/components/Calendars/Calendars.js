import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'

Calendar.propTypes = {
  calendar: PropTypes.object.isRequired,
}

const Calendar = ({calendar}) => {
  return (
    <div>
      <div>{calendar.name}</div>
      <div>{formatTimestamp(calendar.timestamp)}</div>
    </div>
  )
}

Calendars.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  calendars: PropTypes.object,
}

export default function Calendars ({isFetching, error, calendars}) {
  const calendarIds = Object.keys(calendars)
  return (
    <div>
      {error ? <h3>{error}</h3> : null}
      {isFetching === true
        ? <p>{'Fetching Calendars'}</p>
        : <div>
        <h1>{'Calendars'}</h1>
        {calendarIds.map((calendarId) => (
          <Reply key={calendarId} calendar={calendars[calendarId]} />
        ))}
      </div>}
      {replyIds.length === 0 ? <h3 className={center}>{'Be the first to comment. 😎'}</h3> : null}
    </div>
  )
}
