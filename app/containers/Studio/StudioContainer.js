import React, { PropTypes } from 'react'
import { Studio } from 'components'
const { func, object } = PropTypes

const StudioContainer = React.createClass({
  propTypes: {
    studio: object.isRequired,
    handleClick: func,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleClick (e) {
    e.preventDefault()
    this.context.router.push('/sessiontypes/' + this.props.studio.studioId)
  },
  render () {
    return (
      <Studio
        handleClick={this.handleClick}
        studio={this.props.studio} />
    )
  },
})

export default StudioContainer
