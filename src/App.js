import React, { Component } from "react";
import axios from "axios";
import "./styles/App.css";
import Gif from "./Gif";

class App extends Component {
  state = {
    imageArray: [],
    searchTerm: "",
    offset: 0
  };

  upVote = e => {
    e.preventDefault();

    const newImageArray = [...this.state.imageArray];
    const upVotedURL = e.target.previousSibling.src;
    newImageArray.map(object => {
      if (object.url === upVotedURL) {
        object.vote += 1;
      }
      this.setState({
        imageArray: newImageArray
      });
    });
  };

  downVote = e => {
    e.preventDefault();

    const newImageArray = [...this.state.imageArray];
    const downVotedURL = e.target.previousElementSibling.previousSibling.src;
    newImageArray.map(object => {
      if (object.url === downVotedURL) {
        object.vote -= 1;
      }
      this.setState({ imageArray: newImageArray });
    });
  };

  handleChange = e => {
    const searchTerm = e.currentTarget.value;
    this.setState({
      searchTerm: searchTerm
    });
  };

  call = e => {
    if (e) {
      e.preventDefault();
    }
    const newImageArray = [];
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${
          this.state.searchTerm
        }&offset=${this.state.offset}&api_key=Y32GRFlMiF4Q483R3q1hoglYD95E9ivv`
      )
      .then(res => {
        const images = res.data.data;

        images.map(imageObject => {
          const imageURL = imageObject.images.fixed_height.url;
          newImageArray.push({
            url: imageURL,
            vote: 0
          });
          this.setState({
            imageArray: newImageArray
          });
        });
      });
    // e.currentTarget.reset();
    const newOffset = this.state.offset + 25;
    this.setState({
      offset: newOffset
    });
  };

  sort = () => {
    const newImageArray = [...this.state.imageArray];
    newImageArray.sort(function(a, b) {
      return b.vote - a.vote;
    });
    this.setState({
      imageArray: newImageArray
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>GIPHY</h1>
          </div>
        </header>
        <div className="wrapper">
          <form action="" onSubmit={this.call}>
            <input
              type="text"
              name="searchTerm"
              onChange={this.handleChange}
              required
            />
            <button type="submit">Axios</button>
          </form>

          <button onClick={this.sort}>Sort</button>

          <form action="" onSubmit={this.call}>
            <button type="submit">Next</button>
          </form>

          <ul>
            {this.state.imageArray.map((key, index) => {
              return (
                <Gif
                  key={key}
                  index={index}
                  imageObject={this.state.imageArray[index]}
                  upVote={this.upVote}
                  downVote={this.downVote}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
