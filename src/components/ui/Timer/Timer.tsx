import React, { Component } from "react";
import { render } from "react-dom";

export default class Timer extends React.Component<any,any> {
  private timer:any;
  constructor(props){
    super(props)
    this.tick = this.tick.bind(this)
    this.state = {seconds: props.seconds}
  }

  componentDidMount(){
    this.timer = setInterval(this.tick, 1000);
  }

  tick(){
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
    } else {
      clearInterval(this.timer);
      this.props.goToNextQuestion();
    }
  }
  restartTimer=(time)=>{
    if(time<0) {
      clearInterval(this.timer);
    } else {
      this.setState({seconds:time});
    }
  }
  render(){
    return <div>
      <p>Time Remaining: {this.state.seconds} seconds</p>
    </div>
  }
}
