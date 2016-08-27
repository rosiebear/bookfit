import { bindActionCreators } from 'redux'
import { Journey } from 'components'
import { connect } from 'react-redux'
import { addJourneyOrigin, addJourneyDestination } from 'redux/modules/journey'

function mapStateToProps ({journey}) {
  return {
    originId: journey.originId,
    destinationId: journey.destinationId,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addJourneyOrigin, addJourneyDestination }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Journey)
