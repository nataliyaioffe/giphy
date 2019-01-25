import React, { Component } from "react";
import axios from "axios";
import "./styles/App.css";
import Gif from "./Gif";

class App extends Component {
  state = {
    imageArray: [],
    searchTerm: "",
    APISearchTerm: "",
    offset: 0
  };

  upVote = e => {
    e.preventDefault();

    const newImageArray = [...this.state.imageArray];
    const upVotedURL = e.target.previousSibling.src;
    newImageArray.map(object => {
      if (object.url === upVotedURL) {
        object.score += 1;
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
        object.score -= 1;
      }
      this.setState({ imageArray: newImageArray });
    });
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.currentTarget.value
    });
  };

  search = e => {
    e.preventDefault();
    e.currentTarget.reset();

    this.setState({
        APISearchTerm: this.state.searchTerm,
        offset: 0
      },() => this.getGiphys()
    );
  };

  getGiphys = () => {
    const newImageArray = [];

    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${
          this.state.APISearchTerm
        }&offset=${this.state.offset}&api_key=Y32GRFlMiF4Q483R3q1hoglYD95E9ivv`
      )
      .then(res => {
        res.data.data.map(imageObject => {
          const imageURL = imageObject.images.fixed_height.url;
          newImageArray.push({ 
            url: imageURL, 
            score: 0 
          });
          this.setState({ 
            imageArray: newImageArray
           });
        });
      });
  };

  nextPage = e => {
    e.preventDefault();
    const newOffset = this.state.offset + 25;

    this.setState({
        offset: newOffset
      },() => this.getGiphys()
    );
  };

  goBack = e => {
    e.preventDefault();
    const newOffset = this.state.offset - 25;

    if (newOffset < 0) {
      newOffset = 0
    }

    this.setState({
      offset: newOffset
    }, () => this.getGiphys()
    );
  }


  sort = () => {
    const newImageArray = [...this.state.imageArray];
    newImageArray.sort(function(a, b) {
      return b.score - a.score;
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
            <h1>GIPHY THING</h1>
          </div>
        </header>
        <main>
          <div className="search">
            <form action="" onSubmit={this.search}>
              <input
                type="text"
                name="searchTerm"
                onChange={this.handleChange}
                required
              />
              <button type="submit">Search</button>
            </form>

            <div className="current-search-buttons">
              <button onClick={this.sort}>Sort Results</button>
              <button onClick={this.nextPage }>Next Page</button>
              <button onClick={this.goBack}>Back</button>
            </div>
          </div>

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
        </main>
      </div>
    );
  }
}

export default App;
