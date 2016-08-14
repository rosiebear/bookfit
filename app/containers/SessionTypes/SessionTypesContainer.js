import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SessionTypes } from 'components'
import { staleSessionTypes } from 'helpers/utils'
import * as sessionTypesActionCreators from 'redux/modules/sessionTypes'

const SessionTypesContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    sessionTypes: PropTypes.object,
    studioId: PropTypes.string.isRequired,
    fetchAndHandleSessionTypes: PropTypes.func.isRequired,
  },
  getDefaultProps () {
    return {
      lastUpdated: 0,
      sessionTypes: {},
    }
  },
  componentDidMount () {
    console.log(this.props.lastUpdated)
    //if (staleSessionTypes(this.props.lastUpdated)) {
      this.props.fetchAndHandleSessionTypes(this.props.studioId)
    //}
  },
  render () {
    return (
      <SessionTypes
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        sessionTypes={this.props.sessionTypes} />
    )
  },
})

function mapStateToProps (state, props) {
  const studioSessionTypesInfo = state.sessionTypes[props.studioId] || {}
  const { lastUpdated, sessionTypes } = studioSessionTypesInfo
  return {
    isFetching: state.sessionTypes.isFetching,
    error: state.sessionTypes.error,
    lastUpdated,
    sessionTypes,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(sessionTypesActionCreators, dispatch)
)(SessionTypesContainer)