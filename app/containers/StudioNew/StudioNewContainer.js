import { bindActionCreators } from 'redux'
import { StudioNew } from 'components'
import { connect } from 'react-redux'
import { studioFanout } from 'redux/modules/studios'

function mapStateToProps ({users}) {
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({studioFanout}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudioNew)
