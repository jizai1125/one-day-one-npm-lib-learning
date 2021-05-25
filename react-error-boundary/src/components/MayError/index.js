import React from "react";

class MayError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  handleClick = () => {
    let { count } = this.state;
    // if(count === 3) {
    //   throw new Error("f*************k!!!");
    // }
    this.setState({
      count: ++count,
    });
  };
  render() {
    const { count } = this.state
    if(count === 3) {
      throw new Error("f*************k!!!");
    }
    return (
      <div>
        <button onClick={this.handleClick}>throw error</button>
        <p>{count}</p>
      </div>
    );
  }
}

export default MayError;
