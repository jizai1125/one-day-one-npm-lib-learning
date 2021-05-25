import React from 'react'

/**
 * 优化版本2：
 * 1. 添加 fallback（元素）、FallbackComponent（组件）、fallbackRender（渲染函数） prop，支持三种方式传入展示 fallback
 * 2. 添加重置功能: 添加 onReset prop，将重置函数 resetErrorBoundary 绑定到传入的 fallback 组件，让 fallback 组件可以手动调用执行重置
 */

// 初始状态
const initialState = {
  error: null,
  resetErrorBoundary: null // 重置函数
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  static getDerivedStateFromError(error) {
    return {
      error,
    }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }
  // 重置该组件状态，将 error 设置 null
  reset = () => {
    this.setState(initialState)
  }
  // 执行自定义重置逻辑，并重置组件状态
  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset()
    }
    this.reset()
  }
  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props
    const { error } = this.state
    const fallbackProps = {
      error,
      resetErrorBoundary: this.resetErrorBoundary
    }
    if (error) {
      // 验证 fallback prop 对象是否为 React 元素
      if (React.isValidElement(fallback)) {
        return fallback
      }
      // 判断 fallbackRender prop 是否为函数
      if (typeof fallbackRender === 'function') {
        return fallbackRender(fallbackProps)
      }
      // 判断 FallbackComponent prop 是否存在
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />
      }
      throw new Error('ErrorBoundary 组件需要传入 fallback, fallbackRender, FallbackComponent 其中一个')
    }
    return this.props.children
  }
}

export default ErrorBoundary
