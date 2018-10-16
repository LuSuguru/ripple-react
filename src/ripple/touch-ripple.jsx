import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { TransitionGroup } from 'react-transition-group'

import Ripple from './ripple'

export default class TouchRipple extends PureComponent {
  state = {
    nextKey: 0,
    ripples: []
  }

  pulsate = () => {
    this.start({}, { pulsate: true })
  };

  start = ({ type, clientX, clientY, touches }, options = {}) => {
    const { pulsate = false } = options


    if (type === 'mousedown' && this.ignoringMouseDown) {
      this.ignoringMouseDown = false
      return
    }

    if (type === 'touchstart') {
      this.ignoringMouseDown = true
    }

    const element = ReactDOM.findDOMNode(this)
    const rect = element ? element.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 }

    let rippleX = ''
    let rippleY = ''
    let rippleSize = ''

    if ((clientX === 0 && clientY === 0) || (!clientX && !touches)) {
      rippleX = Math.round(rect.width / 2)
      rippleY = Math.round(rect.height / 2)
    } else {
      const realClientX = clientX || touches[0].clientX
      const realClientY = clientY || touches[0].clientY
      rippleX = Math.round(realClientX - rect.left)
      rippleY = Math.round(realClientY - rect.top)
    }

    const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2
    const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2
    rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2)

    if (touches) {
      this.startTimerCommit = () => {
        this.startCommit({ pulsate, rippleX, rippleY, rippleSize })
      }

      this.startTimer = setTimeout(() => {
        if (this.startTimerCommit) {
          this.startTimerCommit()
          this.startTimerCommit = null
        }
      }, 80)
    } else {
      this.startCommit({ pulsate, rippleX, rippleY, rippleSize })
    }
  }

  startCommit = ({ pulsate, rippleX, rippleY, rippleSize }) => {
    this.setState(({ nextKey, ripples }) => ({
      nextKey: nextKey + 1,
      ripples: [
        ...ripples,
        <Ripple
          key={nextKey}
          timeout={{ exit: 550, enter: 550 }}
          pulsate={pulsate}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize} />
      ]
    }))
  }

  stop = e => {
    clearTimeout(this.startTimer)
    const { ripples } = this.state

    if (e.type === 'touchend' && this.startTimerCommit) {
      e.persist()

      this.startTimerCommit()
      this.startTimerCommit = null

      this.startTimer = setTimeout(() => this.stop(e), 0)
      return
    }

    this.startTimerCommit = null

    if (ripples && ripples.length) {
      this.setState({ ripples: ripples.slice(1) })
    }
  }


  componentWillUnmount() {
    clearTimeout(this.startTimer)
  }

  render() {
    return (
      <TransitionGroup
        component="span"
        className="ripple-con"
        enter
        exit>
        {this.state.ripples}
      </TransitionGroup>
    )
  }
}
