import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
const { object, string, func, bool } = PropTypes

const renderField = ({ input, label, type, id, meta: { touched, error, invalid } }) => (
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <input className='form-control' {...input} id={id}
           type={type}/>
    <div className='text-help'>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

renderField.propTypes = {
  input: object,
  label: string,
  type: string,
  id: string,
  meta: object,
}

const SessionType = (props, context) => {
  const { handleSubmit, submitting } = props
  const onSubmit = (values) => {
    props.addAndHandleSessionType(values, props.studioId)
    context.router.push('/')
  }
  return (
    <div className='col-xs-12 col-sm-8 col-sm-offset-2 main-content'>
      <h3>{'Create A New Session Type'}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name='title' id='title' type='text'
               component={renderField} label='Title'/>
        <Field name='spaces' id='spaces' type='number'
               component={renderField} label='Spaces'/>
        <Field name='description' id='description' type='text'
               component={renderField} label='Description'/>
        <Field name='duration' id='duration' type='number'
               component={renderField} label='Duration in minutes' />
        <button type='submit' className='btn btn-primary' disabled={submitting}>{'Submit'}</button>
      </form>
    </div>
  )
}

SessionType.propTypes = {
  handleSubmit: func,
  submitting: bool,
  addAndHandleSessionType: func,
  studioId: string,
}

SessionType.contextTypes = {
  router: PropTypes.object.isRequired,
}

const validate = (values) => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Enter a username'
  }
  if (!values.spaces) {
    errors.spaces = 'Enter the number of spaces'
  }
  return errors
}

export default reduxForm({
  form: 'sessionType',
  validate,
})(SessionType)
