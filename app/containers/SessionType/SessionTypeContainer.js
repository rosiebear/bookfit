import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import { SessionType } from 'components'
import { bindActionCreators } from 'redux'
import { formatSessionType } from 'helpers/utils'
import { addAndHandleSessionType } from 'redux/modules/sessionTypes'

const SessionTypeContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    studioId: PropTypes.string.isRequired,
    addAndHandleSessionType: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object
  },
  handleSubmit(props) {
    console.log(props)
  },
  render () {
    console.log(this.props)
    return (
        <SessionType {...this.props} onSubmit={this.handleSubmit} />
    )
  },
})

function mapStateToProps ({users}, props) {
  return {
    authedUser: users[users.authedId].info,
    studioId: props.routeParams.studioId,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addAndHandleSessionType,
  }, dispatch)
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, mapStateToProps, mapDispatchToProps)(SessionTypeContainer);
