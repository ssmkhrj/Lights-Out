import React, { Component } from "react";
import "./Box.css";

class Box extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.toggleColor(this.props.pos);
  }
  render() {
    return (
      <td
        onClick={this.handleClick}
        className={this.props.isLit ? "Box Box-lit" : "Box"}
      ></td>
    );
  }
}

export default Box;
