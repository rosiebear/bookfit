import { bindActionCreators } from 'redux'
import { Studio } from 'components'
import { connect } from 'react-redux'
import { addAndHandleStudio } from 'redux/modules/usersStudios'

function mapStateToProps ({users}) {
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({addAndHandleStudio}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Studio)