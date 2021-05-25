// import logo from './logo.svg';
/**
 * 错误边界（Error Boundaries）
 * 部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。
 *
 *** 错误边界无法捕获以下场景中产生的错误：
 *  - 事件处理（了解更多）
 *  - 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
 *  - 服务端渲染
 *  - 它自身抛出来的错误（并非它的子组件）
 */
import { useState } from 'react'
import './App.css'
import MayError from './components/MayError'
import ErrorFallback from './components/ErrorFallback.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorBoundary2 from './components/ErrorBoundary2'
import ErrorBoundary3 from './components/ErrorBoundary3'
import withErrorBoundary from './components/withErrorBoundary'

function App() {
  const handleError = () => {
    console.log('handleError>>>>>')
    // console.error("出错啦");
  }
  const handleResetBoudary = () => {
    console.log('handleResetBoudary>>>>>>>>>')
  }
  const [retry, setRetry] = useState(0)

  const MayErrorWithErrorBoundary = withErrorBoundary(MayError, {
    resetKeys: [retry],
    FallbackComponent: ErrorFallback,
    onError: error => console.log('MayErrorWithErrorBoundary onError'),
    onReset: () => console.log('MayErrorWithErrorBoundary onReset'),
  })

  return (
    <div className="App">
      <div>
        <h4>ErrorBoundary</h4>
        <ErrorBoundary>
          <MayError />
        </ErrorBoundary>
      </div>
      <div>
        <h4>ErrorBoundary2 (外部手动重置)</h4>
        {/* fallback prop: 传入 渲染函数 / 组件 / React元素 */}
        <ErrorBoundary2 fallback={<div>出错啦</div>} onError={handleError}>
          <MayError />
        </ErrorBoundary2>
        <ErrorBoundary2 FallbackComponent={ErrorFallback} onError={handleError} onReset={handleResetBoudary}>
          <MayError />
        </ErrorBoundary2>
        <ErrorBoundary2
          fallbackRender={fallbackProps => <ErrorFallback {...fallbackProps} />}
          onError={handleError}
          onReset={handleResetBoudary}
        >
          <MayError />
        </ErrorBoundary2>
      </div>
      <div>
        <h4>ErrorBoundary3 (监听值变化，自动重置)</h4>
        <button onClick={() => setRetry(retry + 1)}>retry</button>
        <ErrorBoundary3 resetKeys={[retry]} FallbackComponent={ErrorFallback}>
          <MayError />
        </ErrorBoundary3>
      </div>
      <div>
        <h4>withErrorBoundary 高阶函数</h4>
        <button onClick={() => setRetry(retry + 1)}>retry</button>
        <MayErrorWithErrorBoundary />
      </div>
    </div>
  )
}

export default App
