import { bindActionCreators } from 'redux'
import { Calendar } from 'components'
import { connect } from 'react-redux'
import * as calendarActionCreators from 'redux/modules/calendars'

function mapStateToProps ({users}) {
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...calendarActionCreators}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar)