import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { UsersStudios } from 'components'
import { fetchAndHandleUsersStudios } from 'redux/modules/usersStudios'

const UsersStudiosContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    studioIds: PropTypes.array.isRequired,
    fetchAndHandleUsersStudios: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
  },
  componentDidMount () {
    this.props.fetchAndHandleUsersStudios(this.props.uid)
  },
  render () {
    return (
      <UsersStudios
        isFetching={this.props.isFetching}
        error={this.props.error}
        studioIds={this.props.studioIds} />
    )
  },
})

function mapStateToProps ({users, usersStudios}, props) {
  const specificUsersStudios = usersStudios[props.routeParams.uid]
  return {
    studioIds: specificUsersStudios ? specificUsersStudios.studioIds : [],
    isFetching: usersStudios.isFetching,
    error: usersStudios.error,
    user: users[users.authedId] ? users[users.authedId].info : {},
    uid: props.routeParams.uid,
  }
}

export default connect(
  mapStateToProps,
  { fetchAndHandleUsersStudios }
)(UsersStudiosContainer)
