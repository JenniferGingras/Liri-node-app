require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');



console.log("I'm here!");

var axios = require("axios");
// search for Bands in Town events
// command for search is node liri.js concert-this <insert artist/band name>
var concert = function () {
  var artist = process.argv[3];
  // var artist = process.argv.slice(3).join("+");
  // store api url in variable
  // var queryBands = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  var queryBands = "https://rest.bandsintown.com/artists/Halestorm/events?app_id=codingbootcamp"
  // use axios.get with query variable
  axios.get(queryBands).then(
    function (response) {
      // console.log(response);
      console.log("Venue: " + response.data.venue.name);
    });

  // console.log data (name of venue, venue location, date of event (use moment- blech! - to format as MM/DD/YYYY))
  // NB - put each piece of data on a separate line
}

// Search for a song
// command for search is node liri.js spotify-this-song <insert song name>
// function 'spotify-this-song'
var spotify = new Spotify(keys.spotify);
var songTitle = process.argv.slice(3).join(" ");
var spotifySong = function (query) {
  if (!query) {
    console.log("if")
    spotify.search({
        type: "track",
        query: "The Sign"
      })
      .then(function (response) {
        console.log(response)
      });
  } else {
    console.log.apply("else")
    spotify.search({
        type: "track",
        query: query
      })
      .then(function (response) {
        console.log(response);
        // console.log data (artist, song's name, preview lin of song from Spotify, album name)
      });
  }
}



// search for movie
// command for search is node liri.js movie-this <insert movie name>
var movie = function (query) {
  var movieTitle = process.argv[3];
  // store api url in variable
  var queryMovie = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy&"
  var nobody = "http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy&"

  // create default for no input - if user input === null
  if (!query) {
    // use axios.get to pull info for "Mr. Nobody"
    axios.get(nobody).then(function (response) {

      console.log("Title: " + data.Title + "\nYear Released: " + data.Year + "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatos Rating: " + data.Ratings +
        "\nCountry: " + data.Country + "\nLanguage: " + data.Language + "\nSummary: " + data.Plot + "\nCast: " + data.Actors);
    });
  } else {
    // use axios.get with query variable
    axios.get(queryMovie).then(function (response) {
      var data = response.data;
      console.log("Title: " + data.Title + "\nYear Released: " + data.Year + "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatos Rating: " + data.Ratings +
        "\nCountry: " + data.Country + "\nLanguage: " + data.Language + "\nSummary: " + data.Plot + "\nCast: " + data.Actors);
      // console.log data (title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors)
    });
  }

}

// use random.txt to call command
// command is node liri.js do-what-it-says
// function 'do-what-it-says'
//


// Switch statement runs the functions when they are called
var command = process.argv[2];
switch (command) {
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    spotifySong(songTitle);
    break;
  case "movie-this":
    movie();
    break;
  case "do-what-it-says":
    doWhat();
    break;
  default:
    console.log("default");
}