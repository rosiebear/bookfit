import { connect } from 'react-redux'
import { SessionType } from 'components'
import { bindActionCreators } from 'redux'
import { addAndHandleSessionType } from 'redux/modules/sessionTypes'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({addAndHandleSessionType}, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(SessionType)

