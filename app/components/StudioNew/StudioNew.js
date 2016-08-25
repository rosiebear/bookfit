import React, { PropTypes } from 'react'
import { formatStudio } from 'helpers/utils'
import { GoogleAutocomplete } from 'components'
import { ref } from 'config/constants'

const { object, func } = PropTypes
StudioNew.PropTypes = {
  user: object.isRequired,
  addAndHandleStudio: func.isRequired,
}

export default function StudioNew (props) {
  function formatAddress (place) {
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

    console.log(place.geometry.location.lat())
    console.log(place.geometry.location.lng())

    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    }

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0]
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]]
        // console.log(addressType, val)
        // document.getElementById(addressType).value = val;
      }
    }
  }

  function submitStudio () {
    if (StudioNew.ref.value.length === 0) {
      return
    }
    props.studioFanout(formatStudio(StudioNew.ref.value, props.user), props.user)
    StudioNew.ref.value = ''
  }

  return (
    <div className='col-md-12 col-xs-12'>
      <div className='page-header text-center'>
        <h1>Listing - Details</h1>
      </div>
      <div className='col-md-6 col-md-offset-3'>
        <form>
          <div className='form-group'>
            <label htmlFor='listingTitle'>Title</label>
            <input type='text' className='form-control' id='listingTitle' />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea className='form-control' id='description'></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Enter your address</label>
            <GoogleAutocomplete onPlaceSelected={formatAddress} />
          </div>
        </form>
      </div>
      <div id='main-content' className='col-xs-12 col-sm-8 col-sm-offset-2 main-content'>
        <div className='panel panel-floating-header'>
          <div className='panel-heading'>
            <h5>Services Offered</h5>
          </div>
          <div className='panel-body'>
            <form id='js-listing-submit' className='form-horizontal collapsible' action='/listing/services' method='post'>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
