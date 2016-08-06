import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { SessionType } from 'components'
import { bindActionCreators } from 'redux'
import { formatSessionType } from 'helpers/utils'
import * as sessionTypeActionCreators from 'redux/modules/sessionTypes'

const SessionTypeContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    studioId: PropTypes.string.isRequired,
    addAndHandleSessionType: PropTypes.func.isRequired,
  },
  render () {
    return (
        <SessionType
          submit={(sessionTypeText) => this.props.addAndHandleSessionType(this.props.studioId, formatSessionType(sessionTypeText, this.props.authedUser))}
        />
    )
  },
})

function mapStateToProps ({users}, props) {
  console.log(users[users.authedId].info)
  return {
    authedUser: users[users.authedId].info,
    studioId: props.routeParams.studioId,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...sessionTypeActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionTypeContainer)