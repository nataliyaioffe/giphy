import React, { Component } from "react";

class Gif extends Component {
  handleUpvote = () => {
    this.props.upVote(this.props.imageObject.id);
  };

  handleDownvote = () => {
    this.props.downVote(this.props.imageObject.id);
  };

  render(props) {
    const {
      imageObject,
      userData
    } = this.props;

    const gifID = imageObject.id;
    const imagePath = `https://media2.giphy.com/media/${
      imageObject.id
    }/200.gif`;


    return <li id={gifID}>
        <img className="image" src={imagePath} alt="" />
        <button onClick={this.handleUpvote}>upvote</button>
        <button onClick={this.handleDownvote}>downVote</button>
      {/* <p>Score: {test.score}|| {this.props.imageObject.score}</p> */}
      </li>;
  }
}

export default Gif;
