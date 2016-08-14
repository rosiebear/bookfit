import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { StudioDetails } from 'components'
import { bindActionCreators } from 'redux'
import { fetchAndHandleStudio, removeFetching } from 'redux/modules/studios'

const StudioDetailsContainer = React.createClass({
  propTypes: {
    studioId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    studioAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleStudio: PropTypes.func.isRequired,
  },
  componentDidMount () {
    if (this.props.studioAlreadyFetched === false) {
      this.props.fetchAndHandleStudio(this.props.studioId)
    } else {
      this.props.removeFetching()
    }
  },
  render () {
    return (
      <StudioDetails
        studioId={this.props.studioId}
        error={this.props.error}
        isFetching={this.props.isFetching} />
    )
  },
})

function mapStateToProps ({studios}, props) {
  return {
    isFetching: studios.isFetching,
    error: studios.error,
    studioId: props.routeParams.studioId,
    studioAlreadyFetched: !!studios[props.routeParams.studioId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchAndHandleStudio,
    removeFetching,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudioDetailsContainer)