import React, { PureComponent } from 'react'
import addRipper from './ripple'

import './style.less'
import './styles/reset.css'

const Button = addRipper(({ children, className = '', ...props }) => (
  <div className={`button ${className}`} {...props}>{children}</div>))

export default class extends PureComponent {
  state = {
    ceshi: ''
  }

  render() {
    return (
      <Button>确认</Button>
    )
  }
}
