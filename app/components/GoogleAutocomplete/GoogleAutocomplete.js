import React, {PropTypes} from 'react';

const GoogleAutocomplete = React.createClass({
  propTypes: {
    onPlaceSelected: PropTypes.func,
  },
  onSelected() {
    if (this.props.onPlaceSelected) {
      this.props.onPlaceSelected(this.autocomplete.getPlace());
    }
  },
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.refs.input, {
      types: ['geocode'],
    });
    this.autocomplete.addListener('place_changed', this.onSelected);
  },
  render() {
    return (
      <input className="form-control" ref="input" />
    )
  }
})

export default GoogleAutocomplete