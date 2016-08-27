import React, {PropTypes} from 'react'
import { map } from './style.css'

const Map = React.createClass({
  propTypes: {
    to: PropTypes.string,
    from: PropTypes.string,
  },
  getInitialState () {
    return {
      directionsDisplay: new google.maps.DirectionsRenderer,
      directionsService: new google.maps.DirectionsService,
    }
  },

  componentDidMount () {
    this.initMap()
  },

  componentWillUpdate (props) {
    this.route(props.origin, props.destination, this.state.directionsService, this.state.directionsDisplay)
  },

  initMap () {
    this.map = new google.maps.Map(this.refs.map, {
      mapTypeControl: false,
      center: { lat: 51.4749992, lng: -0.24525840000001153},
      zoom: 13,
    })
    this.state.directionsDisplay = new google.maps.DirectionsRenderer
    this.state.directionsDisplay.setMap(this.map)
  },

  route (originPlaceId, destinationPlaceId, directionsService, directionsDisplay) {
    if (!originPlaceId || !destinationPlaceId) {
      return
    }
    directionsService.route({
      origin: { 'placeId': originPlaceId },
      destination: { 'placeId': destinationPlaceId },
      travelMode: 'DRIVING',
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status)
      }
    })
  },
  render () {
    return (
      <div className={map} ref='map'></div>
    )
  }
,
})

export default Map
