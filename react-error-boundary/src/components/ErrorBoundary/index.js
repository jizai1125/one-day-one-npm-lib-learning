import React from "react";

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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logger.error(error, errorInfo);
    console.warn("<<< componentDidCatch log error>>>", error);
    console.warn("<<< componentDidCatch log errorInfo>>>", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
