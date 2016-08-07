import { connect } from 'react-redux'
import { SessionType } from 'components'
import { bindActionCreators } from 'redux'
import { addAndHandleSessionType } from 'redux/modules/sessionTypes'

function mapStateToProps ({sessionTypes}, props) {
  return {
    studioId: props.routeParams.studioId,
    initialValues: sessionTypes.data,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({addAndHandleSessionType}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionType)

