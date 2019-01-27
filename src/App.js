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
    this.setState({
      gifID: gifID
    });

    const newImageArray = [...this.state.imageArray];
    const values = Object.values(newImageArray);

    values.map(value => {
      if (value.id === gifID) {
        value.score += 1;
        this.sendFB(value, gifID);
      }
    });
  };

  // keys.map(key => {
  //   if (imageObject.id === gifID) {
  //     imageObject.score += 1;
  //     gifFBID = {
  //       id: gifID,
  //       score: object.score
  //     };
  // }
  // console.log(keys);

  // keys.map((key) = () => {
  // console.log("key", key);
  // })
  // let gifFBID = {};

  // newImageArray.map((imageObject,i)=> {
  //   if (imageObject.id === gifID) {
  //     imageObject.score += 1;
  //     // gifFBID = {
  //       // id: gifID,
  //       // score: object.score
  //     // };
  //     this.setState({
  //         gifID: gifID,
  //         score: imageObject.score
  //       },
  //       () => this.sendFB()
  //     );

  //   }
  // });
  // };

  sendFB = (value, gifID) => {
    this.dbRef = firebase.database().ref(`/${gifID}`);
    this.dbRef.update(value);
  };

  // downVote = gifID => {
  //   const newImageArray = [...this.state.imageArray];

  //   newImageArray.map(object => {
  //     if (object.id === gifID) {
  //       object.score -= 1;
  //     }
  //     this.setState({ imageArray: newImageArray });
  //   });
  // };

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
        }&offset=${this.state.offset}&api_key=Y32GRFlMiF4Q483R3q1hoglYD95E9ivv`
      )
      .then(res => {
        res.data.data.map(imageObject => {
          // const imageURL = imageObject.images.fixed_height.url;
          newImageArray.push({
            id: imageObject.id,
            offset: this.state.offset + 25,
            // url: imageURL,
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

          <ul>
            {this.state.imageArray.map((key, index) => {
              return (
                <Gif
                  key={key}
                  index={index}
                  imageObject={this.state.imageArray[index]}
                  upVote={this.upVote}
                  downVote={this.downVote}
                  userData={this.state.userData}
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
