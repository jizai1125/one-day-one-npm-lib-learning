import React from 'react'

class ErrorFallback extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1>ErrorFallback</h1>
        <div>
        出错啦！点击<button onClick={this.props.resetErrorBoundary}>重置</button>
        </div>
      </div>
    )
  }
}

export default ErrorFallback
