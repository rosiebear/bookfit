import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SessionTypes } from 'components'
import { staleSessionTypes } from 'helpers/utils'
import * as SessionTypesActionCreators from 'redux/modules/SessionTypes'

const SessionTypesContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    SessionTypes: PropTypes.object,
    studioId: PropTypes.string.isRequired,
    fetchAndHandleSessionTypes: PropTypes.func.isRequired,
  },
  getDefaultProps () {
    return {
      lastUpdated: 0,
      SessionTypes: {},
    }
  },
  componentDidMount () {
    if (staleSessionTypes(this.props.lastUpdated)) {
      this.props.fetchAndHandleSessionTypes(this.props.studioId)
    }
  },
  render () {
    return (
      <SessionTypes
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        SessionTypes={this.props.SessionTypes} />
    )
  },
})

function mapStateToProps (state, props) {
  const studioSessionTypesInfo = state.SessionTypes[props.studioId] || {}
  const { lastUpdated, SessionTypes } = duckSessionTypesInfo
  return {
    studioId: props.routeParams.studioId,
    isFetching: state.SessionTypes.isFetching,
    error: state.SessionTypes.error,
    lastUpdated,
    SessionTypes,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(SessionTypesActionCreators, dispatch)
)(SessionTypesContainer)