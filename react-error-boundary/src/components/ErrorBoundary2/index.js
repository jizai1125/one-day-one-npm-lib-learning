import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError();
    }
  }
  render() {
    const { fallback } = this.props;
    const { error } = this.state;
    if (error) {
      // 验证 fallback prop 对象是否为 React 元素
      if(React.isValidElement(fallback)) {
        return fallback
      }
      throw new Error('ErrorBoundary 组件需要传入 fallback');
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
