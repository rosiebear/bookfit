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

    scheduleId
      sessions
        sessionId
        datetime
        name
        trainer

        bookings
          bookingsId
          sessionId
          clientId

    trainers
      uid
      name
      avatar
      bio
      skills
      userRoles

  clients
    uid
    name
    avatar

/usersStudios
  uid
    studioId
      name
      description
      tags
      location
      photos

      scheduleId
        sessions
          sessionId
            datetime
            name
            trainer
            bookings
              bookingsId
              sessionId
              clientId

      trainers
        uid
        name
        avatar
        bio
        skills
        userRoles

      clients
        uid
        name
        avatar

/bookings
  scheduleId
    sessionId
    bookingsId
    clientId


