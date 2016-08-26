import React, {PropTypes} from 'react'
import { map } from './style.css'

const Map = React.createClass({
  propTypes: {
    to: PropTypes.string,
    from: PropTypes.string,
  },
  getInitialState () {
    return {
      directionsDisplay: new google.maps.DirectionsRenderer
    }
  },

  componentDidMount () {
    this.initMap()
  },

  componentWillUpdate (props, newprops) {
    console.log(props, newprops)
    this.route(props.from, props.to)
  },

  initMap () {
    this.map = new google.maps.Map(this.refs.map, {
      mapTypeControl: false,
      center: { lat: 51.4749992, lng: -0.24525840000001153},
      zoom: 13,
    })
    this.state.directionsDisplay.setMap(this.map)
  },

  route (originPlaceId, destinationPlaceId) {
    console.log(originPlaceId, destinationPlaceId)
    let directionsService = new google.maps.DirectionsService
    if (!originPlaceId || !destinationPlaceId) {
      return
    }
    directionsService.route({
      origin: { 'placeId': originPlaceId },
      destination: { 'placeId': destinationPlaceId },
      travelMode: 'DRIVING',
    }, function (response, status) {
      if (status === 'OK') {
        this.state.directionsDisplay.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status);
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
