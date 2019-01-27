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

    const test = Object.values(userData)
    let savedScore;
    test.map(entry => {
      if (entry.id === gifID)
        savedScore = entry.score;
    })

    return <li id={gifID}>
        <img className="image" src={imagePath} alt="" />
        <button onClick={this.handleUpvote}>upvote</button>
        <button onClick={this.handleDownvote}>downVote</button>
      <p>Score: {savedScore} </p>
      </li>;
  }
}

export default Gif;
