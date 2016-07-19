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

    users
      uid
      name
      avatar
      bio
      trainingTypes
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
      users
        uid
        name
        avatar
        bio
        sessionTypes
        userRoles

      clients
        uid
        name
        avatar


