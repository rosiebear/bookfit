import React, { PropTypes } from 'react'

SessionType.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

function SessionType (props) {
  const dotheSubmit = () => {
    console.log(props)
    props.handleSubmit();
  }

  const { fields: { title, categories, content }, handleSubmit } = props;
  return (
    <div>
      <h3>Create A New Session Type</h3>
      <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
        <label>Title</label>
        <input type="text" className="form-control" {...title} />
        <div className="text-help">
          {title.touched ? title.error : ''}
        </div>
      </div>

      <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
        <label>Categories</label>
        <input type="text" className="form-control" {...categories} />
        <div className="text-help">
          {categories.touched ? categories.error : ''}
        </div>
      </div>

      <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
        <label>Content</label>
        <textarea className="form-control" {...content} />
        <div className="text-help">
          {content.touched ? content.error : ''}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SessionType