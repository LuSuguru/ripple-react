import React, { PureComponent } from 'react'
import { Transition } from 'react-transition-group'
import classNames from 'classnames'

export default class Ripple extends PureComponent {
  state = {
    visible: false,
    leaving: false
  }

  handleEnter = () => this.setState({ visible: true })

  handleExit = () => this.setState({ leaving: true })

  render() {
    const { pulsate, rippleX, rippleY, rippleSize, ...other } = this.props
    const { visible, leaving } = this.state
    const { handleEnter, handleExit } = this

    const rippleClassName = classNames('ripple-item', {
      'ripple-item_visible': visible,
      'ripple-item_pulsate': pulsate
    })

    const childClassName = classNames('ripple-child', {
      'ripple-child_leaving': leaving,
      'ripple-child_pulsate': pulsate
    })

    const rippleStyle = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX
    }


    return (
      <Transition
        onEnter={handleEnter}
        onExit={handleExit}
        {...other}>
        <span className={rippleClassName} style={rippleStyle}>
          <span className={childClassName} />
        </span>
      </Transition>
    )
  }
}
