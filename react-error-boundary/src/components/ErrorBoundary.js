import React from 'react'

/**
 * 版本1：
 * 当组件内部定义了 getDerivedStateFromError、componentDidCatch 这两个生命周期方法中的任意一个（或两个）时，
 * 则它就变成错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logger.error(error, errorInfo);
    console.warn('<<< componentDidCatch log error>>>', error)
    console.warn('<<< componentDidCatch log errorInfo>>>', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
