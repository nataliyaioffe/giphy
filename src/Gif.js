import React, { Component } from "react";

class Gif extends Component {
  render(props) {

    return <li>
        <img className="image" src={this.props.imageObject.url} alt="" />
        <button onClick={this.props.upVote}>upvote</button>
        <button onClick={this.props.downVote}>downVote</button>
        <p>Score: {this.props.imageObject.vote}</p>
      </li>;
  }
}

export default Gif;
