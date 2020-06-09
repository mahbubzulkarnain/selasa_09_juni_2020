import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const BadgeText = ({ value }: any) => (
  <div className='badge-text'>
    <p className='badge-text__value'>{ value }</p>
  </div>
)

BadgeText.propTypes = {
  value: PropTypes.number.isRequired
}

export default BadgeText
