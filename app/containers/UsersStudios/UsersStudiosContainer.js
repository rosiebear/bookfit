import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { UsersStudios } from 'components'
import { fetchAndHandleStudios } from 'redux/modules/usersStudios'

const UsersStudiosContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    studios: PropTypes.object.isRequired,
    fetchAndHandleStudios: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.fetchAndHandleStudios()
  },
  render () {
    return (
      <UsersStudios
        isFetching={this.props.isFetching}
        error={this.props.error}
        studios={this.props.studios} />
    )
  },
})

function mapStateToProps ({usersStudios, users}) {
  console.log(usersStudios.studios)
  return {
    studios: usersStudios.studios,
    isFetching: usersStudios.isFetching,
    error: usersStudios.error,
    user: users[users.authedId] ? users[users.authedId].info : {},
  }
}

export default connect(
  mapStateToProps,
  { fetchAndHandleStudios }
)(UsersStudiosContainer)