import React, { Component } from "react";
import axios from "axios";
import "./styles/App.css";
import Gif from "./components/Gif";
import firebase from "./components/firebase";

class App extends Component {
  state = {
    imageArray: [],
    searchTerm: "",
    APISearchTerm: "",
    offset: 0,
    userData: {}
  };

  componentDidMount() {
    this.dbRef = firebase.database().ref();
    this.dbRef.on("value", snapshot => {
      this.setState({
        userData: snapshot.val() || {}
      });
    });
  }

  upVote = gifID => {
    const newImageArray = [...this.state.imageArray];

    newImageArray.map((image, i) => {
      if (image.id === gifID) {
        image.score += 1;
        this.sendFB(image, gifID);
      }
    });

    this.setState({
      imageArray: newImageArray
    });
  };

  downVote = gifID => {
    console.log("downvote");
  };

  sendFB = (image, gifID) => {
    this.dbRef = firebase.database().ref(`/${gifID}`);
    this.dbRef.update(image);
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.currentTarget.value
    });
  };

  search = e => {
    e.preventDefault();
    e.currentTarget.reset();

    this.setState(
      {
        searchTerm: "",
        APISearchTerm: this.state.searchTerm,
        offset: 0
      },
      () => this.getGiphys()
    );
  };

  getGiphys = () => {
    const newImageArray = [];

    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${
          this.state.APISearchTerm
        }&offset=${
          this.state.offset
        }&api_key=Y32GRFlMiF4Q483R3q1hoglYD95E9ivv&limit=25`
      )
      .then(res => {
        res.data.data.map(imageObject => {
          newImageArray.push({
            id: imageObject.id,
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

    this.setState(
      {
        offset: newOffset
      },
      () => this.getGiphys()
    );
  };

  goBack = e => {
    e.preventDefault();
    const newOffset = this.state.offset - 25;

    if (newOffset < 0) {
      newOffset = 0;
    }

    this.setState(
      {
        offset: newOffset
      },
      () => this.getGiphys()
    );
  };

  sort = () => {
    const newImageArray = [...this.state.imageArray];
    newImageArray.sort(function(a, b) {
      return b.score - a.score;
    });
    this.setState({
      imageArray: newImageArray
    });
  };

  focus = gifID => {
    console.log(gifID);
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
              <button onClick={this.nextPage}>Next Page</button>
              <button onClick={this.goBack}>Back</button>
            </div>
          </div>

          <ul className="gallery">
            {this.state.imageArray.map((key, index) => {
              return (
                <Gif
                  key={key.id}
                  index={index}
                  imageObject={this.state.imageArray[index]}
                  upVote={this.upVote}
                  downVote={this.downVote}
                  userData={this.state.userData}
                  focus={this.focus}
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
