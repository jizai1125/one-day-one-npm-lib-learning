import React from 'react'

/**
 * 优化版本3：监听值变化，自动重置
 * 1. 添加 resetKeys 和 onResetKeysChange props，提供 监听值变化 而 自动重置 的功能
 * 2. 在 componentDidUpdate 里，只要是由于 error 引发的组件渲染或更新，而且 resetKeys 有变化了，那么直接重置组件状态来达到自动重置
 */
// 初始状态
const initialState = {
  error: null,
  resetErrorBoundary: null, // 重置执行函数
}
// 检查 resetKeys 是否有变化
const changedArray = (a = [], b = []) => {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
}
class ErrorBoundary extends React.Component {
  // 是否已经由于 error 而引发的 render/update
  updatedWithError = false
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
    console.log(666666666666666)
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }
  // 重置该组件状态，将 error 设置 null
  reset = () => {
    this.updatedWithError = false
    this.setState(initialState)
  }
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate', prevProps)
    const { error } = this.state
    const { resetKeys, onResetKeysChange } = this.props
    // 已经存在错误，并且是第一次由于 error 而引发的 render/update，那么设置 flag=true，不会重置
    if (error !== null && !this.updatedWithError) {
      console.log('set updatedWithError true')
      this.updatedWithError = true
      return
    }
    // 已经存在错误，并且是普通的组件 render，则检查 resetKeys 是否有改动，改了就重置
    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      if (onResetKeysChange) {
        onResetKeysChange(prevProps.resetKeys, resetKeys)
      }
      this.reset()
    }
  }
  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props
    const { error } = this.state
    const fallbackProps = {
      error,
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
