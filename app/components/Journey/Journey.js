import React, { PropTypes } from 'react'
import { GoogleAutocomplete, Map } from 'components'
import { mapContainer } from './style.css'

const Journey = (props) => (
  <div>
    <div className='col-md-6 col-md-offset-3'>
      <div className={mapContainer}>
        <Map destination={props.destinationId} origin={props.originId}  />
      </div>
    </div>
    <div className='col-md-6 col-md-offset-3'>
      <div className='form-group'>
        <label htmlFor='from'>{'From'} </label>
        <GoogleAutocomplete onPlaceSelected={props.addJourneyOrigin} />
      </div>
      <div className='form-group'>
        <label htmlFor='from'>{'To'} </label>
        <GoogleAutocomplete onPlaceSelected={props.addJourneyDestination} />
      </div>
    </div>
  </div>
)

Journey.propTypes = {
  destinationId: PropTypes.string.isRequired,
  originId: PropTypes.string.isRequired,
  addJourneyOrigin: PropTypes.func.isRequired,
  addJourneyDestination: PropTypes.func.isRequired,
}

export default Journey