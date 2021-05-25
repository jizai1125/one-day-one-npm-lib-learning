// import logo from './logo.svg';
import "./App.css";
import MayError from "./components/MayError";
import ErrorFallback from "./components/ErrorFallback/index.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorBoundary2 from "./components/ErrorBoundary2";
function App() {
  const handleError = () => {
    console.error("出错啦");
  };
  return (
    <div className="App">
      {/* fallback prop: 传入 渲染函数 / 组件 / React元素 */}
      <ErrorBoundary2 fallback={<div>出错啦</div>} onError={handleError}>
        <MayError />
      </ErrorBoundary2>
      <ErrorBoundary2 fallComponent={ErrorFallback} onError={handleError}>
        <MayError />
      </ErrorBoundary2>
      <ErrorBoundary2 fallback={fallbaclprops => <ErrorFallback {...fallbaclprops} />} onError={handleError}>
        <MayError />
      </ErrorBoundary2>
    </div>
  );
}

export default App;
