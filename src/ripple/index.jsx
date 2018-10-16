import React, { PureComponent } from 'react'

import TouchRipple from './touch-ripple'
import './style.less'

export default WrapComponent => class extends PureComponent {
  ripple = {}

  onRippleRef = node => {
    this.ripple = node
  }

  handleMouseDown = e => this.ripple.start(e)
  handleMouseUp = e => this.ripple.stop(e)

  handleTouchStart = e => this.ripple.start(e)
  handleTouchEnd = e => this.ripple.stop(e)
  handleTouchMove = e => this.ripple.stop(e)

  render() {
    const { handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd, handleTouchMove, onRippleRef } = this
    const { className = '', ...otherProps } = this.props

    return (
      <WrapComponent
        {...otherProps}
        className={`ripple-wrap ${className}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}>
        {this.props.children}
        <TouchRipple ref={onRippleRef} />
      </WrapComponent>
    )
  }
}
