import React, { PropTypes } from 'react'
import { formatStudio } from 'helpers/utils'
import { GoogleAutocomplete, Map } from 'components'
import { mapContainer } from './style.css'

const StudioNew = React.createClass({
  getInitialState () {
    return {
      fromAddress: {},
      toAddress: {},
      fromId: null,
      toId: null,
    }
  },

  updateFromAddress (place) {
    let from = {}
    from.lat = place.geometry.location.lat()
    from.lng = place.geometry.location.lng()

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
        from[addressType] = val
      }
    }
    this.setState({
      fromId: place.place_id,
      fromAddress: from,
    })
  },

  updateToAddress (place) {
    console.log(place)
    let to = {}
    to.lat = place.geometry.location.lat()
    to.lng = place.geometry.location.lng()
    console.log(to)
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
        to[addressType] = val
      }
    }
    this.setState({
      toId: place.place_id,
      toAddress: to,
    })
  },

  submitStudio () {
    if (StudioNew.ref.value.length === 0) {
      return
    }
    this.props.studioFanout(formatStudio(StudioNew.ref.value, props.user), props.user)
    StudioNew.ref.value = ''
  },

  render () {
    return (
      <div className='col-md-12 col-xs-12'>
        <div className='page-header text-center'>
          <h1>Listing - Details</h1>
        </div>
        <div className={mapContainer}>
          <Map to={this.state.toId} from={this.state.fromId} />
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
              <label htmlFor='from'>From </label>
              <GoogleAutocomplete onPlaceSelected={this.updateFromAddress} />
            </div>
            <div className='form-group'>
              <label htmlFor='from'>To </label>
              <GoogleAutocomplete onPlaceSelected={this.updateToAddress} />
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
                  onClick={this.submitStudio}>
                  {'Save Studio'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export default StudioNew
