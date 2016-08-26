import { ref } from 'config/constants'
var geoFire = new GeoFire(ref)
geoFire.set('some_key', [31.785326, -129.405696]).then(function () {
  console.log('Provided key has been added to GeoFire')
}, function (error) {
  console.log('Error: ' + error)
})

var geoQuery = geoFire.query({
  center: [37.4, -122.6],
  radius: 1.609, // kilometers
})

geoQuery.on('key_entered', function (key, location, distance) {
  console.log('Bicycle shop ' + key + ' found at ' + location + ' (' + distance + ' km away)')
})

geoFire.set('some_key', [37.785326, -122.405696]).then(function () {
  console.log('Provided key has been added to GeoFire')
}, function (error) {
  console.log('Error: ' + error)
})

var fishLocations = [
  [51.4749992, -0.24525840000001153],
  [51.4528045, -0.24277040000004035],
  [51.46726779999999, -0.2702176000000236],
  [51.45975739999999, -0.13775299999997515],
]

// Set the initial locations of the fish in GeoFire
console.log('*** Setting initial locations ***')
var promises = fishLocations.map(function (location, index) {
  return geoFire.set('fish' + index, location).then(function () {
    log('fish' + index + ' initially set to [' + location + ']')
  })
})

// Once all the fish are in GeoFire, log a message that the user can now move fish around
RSVP.allSettled(promises).then(function () {
  console.log('*** Creating GeoQuery ***')
  // Create a GeoQuery centered at fish2
  var geoQuery = geoFire.query({
    center: fishLocations[2],
    radius: 2,
  })

  var onKeyEnteredRegistration = geoQuery.on('key_entered', function (key, location) {
    console.log(key + ' entered the query. Hi ' + key + '!')
  })

  var onReadyRegistration = geoQuery.on('ready', function () {
    console.log("*** 'ready' event fired - cancelling query ***")
    geoQuery.cancel()
  })
})
