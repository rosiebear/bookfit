export const getAddress = (place) => {
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
  return {
    id: place.place_id,
    address: from,
  }
}
