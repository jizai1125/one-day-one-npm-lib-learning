/**
 * <ErrorBoundary>
 *    <aaa/>
 * </ErrorBoundary>
 * <ErrorBoundary>
 *    <bbb/>
 * </ErrorBoundary>
 * ...
 * 为了处理这样啰嗦的包裹，借鉴 React Router 的 withRouter 函数，我们也可以输出一个高阶函数
 */
import ErrorBoundary from './ErrorBoundary3'

/**
 * with
 * @param {*} Component 业务组件
 * @param {*} errorBoundaryProps ErrorBoundary 组件 props
 * @returns 
 */
function withErrorBoundary(Component, errorBoundaryProps) {
  const Wrapped = props => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
  // DevTools 显示的组件名
  const name = Component.displayName || Component.name || 'Unknown'
  Wrapped.displayName = `withErrorBoundary(${name})`
  return Wrapped
}

export default withErrorBoundary