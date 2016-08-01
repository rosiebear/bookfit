/users
  uid
    name
    uid
    avatar

/studios
  studioId
    uid
    name
    description
    tags
    location
    photos

/usersStudios
  uid
    studioId
      name
      description
      tags
      location
      photos

/studioSessionTypes
  studioId
    name
    duration
    spaces
    description
    team
      uid

/studioRates
  studioId
    ratesId
      sessionTypeId
        name
        description
      price
      numberOfSessions
        
/studioSchedules
  studioId
    scheduleId
    uid (of owner)

/scheduleSessions
  scheduleId
    sessionId
      uid
      datetime
      name
      trainer
      bookings
      bookingsId
      sessionId
      clientId

/bookings
  sessionId
    scheduleId
    bookingsId
    clientId

/teams
  studioId
    uid
      name
      avatar
      bio
      skills
      userRoles

/clients
  studioId
    uid
      name
      avatar
      bio
      skills
      userRoles