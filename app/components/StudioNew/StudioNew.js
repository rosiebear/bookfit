import React, { PropTypes } from 'react'
import { formatStudio } from 'helpers/utils'

const StudioNew = React.createClass({

  submitStudio () {
    if (StudioNew.ref.value.length === 0) {
      return
    }
    this.props.studioFanout(formatStudio(StudioNew.ref.value, props.user), props.user)
    StudioNew.ref.value = ''
  },

  render () {
    return (
      <div className='col-md-12 col-xs-12'>
        <div className='page-header text-center'>
          <h1>Listing - Details</h1>
        </div>
        <div className='col-md-6 col-md-offset-3'>
          <form>
            <div className='form-group'>
              <label htmlFor='listingTitle'>Title</label>
              <input type='text' className='form-control' id='listingTitle' />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea className='form-control' id='description'></textarea>
            </div>
          </form>
        </div>
        <div id='main-content' className='col-xs-12 col-sm-8 col-sm-offset-2 main-content'>
          <div className='panel panel-floating-header'>
            <div className='panel-heading'>
              <h5>Services Offered</h5>
            </div>
            <div className='panel-body'>
              <form id='js-listing-submit' className='form-horizontal collapsible' action='/listing/services' method='post'>
                {'Add Studio'}
                <div>
                  <input
                    ref={(ref) => StudioNew.ref = ref}
                    type='text'
                    placeholder='Studio Name' />
                </div>
                <button
                  onClick={this.submitStudio}>
                  {'Save Studio'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export default StudioNew
