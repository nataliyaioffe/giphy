import React, { Component } from "react";

class Gif extends Component {
  render(props) {

    return (
      <li>
        <img className="image" src={this.props.url} alt="" />
        <button onClick={this.props.upVote}>upvote</button>
        <button onClick={this.props.downVote}>downVote</button>
      </li>
    );
  }
}

export default Gif;
