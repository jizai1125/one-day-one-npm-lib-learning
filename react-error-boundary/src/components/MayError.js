import React, { useState } from 'react'
import useErrorHandler from './useErrorHandler'

// class MayError extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       count: 0,
//     }
//   }
//   handleClick = () => {
//     let { count } = this.state
//     if (count >= 3) {
//       throw new Error('f*************k!!!')
//     }
//     this.setState({
//       count: ++count,
//     })
//   }
//   render() {
//     const { count } = this.state
//     // if (count >= 3) {
//     //   throw new Error('f*************k!!!')
//     // }
//     return (
//       <div>
//         <button onClick={this.handleClick}>throw error</button>
//         <p>{count}</p>
//       </div>
//     )
//   }
// }

function MayError() {
  const [count, setCount] = useState(0)
  // 通过 useErrorHandler 抛出错误，让 errorBoundary 捕获
  const setError = useErrorHandler()

  const handleClick = () => {
    let value = count
    if (value >= 3) {
      // throw new Error('f*************k!!!')
      setError(new Error('f*************k!!!'))
    }

    setCount(++value)
  }

  let element = (
    <div>
      <button onClick={handleClick}>throw error</button>
      <p>{count}</p>
    </div>
  )
  return element
}

export default MayError
