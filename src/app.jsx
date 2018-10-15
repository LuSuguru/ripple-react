import React, { PureComponent } from 'react'
import qs from 'querystring'

import './style.less'
import './styles/reset.css'

export default class extends PureComponent {
  state = {
    ceshi: ''
  }

  componentDidMount() {
    fetch('/api/login/account', {
      method: "POST",
      body: qs.stringify({ ceshi: 1 }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ ceshi: data.text })
      })

    fetch('/repos/hello.do')
  }

  render() {
    const { ceshi } = this.state
    return (
      <div>{ceshi}</div>
    )
  }
}
