require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");


// BANDS IN TOWN SEARCH
// ----------------------
// command for search is node liri.js concert-this <insert artist/band name>
var concert = function (query) {
  var artist = process.argv.slice(3).join("+");
  // console.log(artist);
  // store api url in variable
  var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  // use axios.get with query variable
  if (!artist) {
    console.log("\n-!! Try again, please. Remember to type in an artist or band. !!-\n")
  }
  axios.get(URL).then(function (response, ) {
    // console.log data (name of venue, venue location, date of event (use moment- blech! - to format as MM/DD/YYYY))
    // NB - put each piece of data on a separate line
    var data = response.data[0];
    var time = moment(data.datetime).format("MMMM Do YYYY, h:mm: a");
    console.log("\n----Upcoming Concert Info----\n" +
      "\nVenue: " + data.venue.name +
      "\nLocation: " + data.venue.city + ", " + data.venue.country +
      "\nTime: " + time +
      "\n\n");
  });


}

// SEARCH FOR A SONG WITH NODE SPOTIFY API
// ----------------------------------------
// command for search is node liri.js spotify-this-song <insert song name>
var spotify = new Spotify(keys.spotify);
var songTitle = process.argv.slice(3).join(" ");
var spotifySong = function (query) {
  // no song input
  if (!songTitle) {
    spotify.search({
        type: "track",
        query: "The Sign",
        limit: 10,
      })
      .then(function (response) {
        console.log("\n\n-!! You didn't pick a song, so you get this. !!-")
        var data = response.tracks.items[0];
        console.log("\n----Song Info----\n" +
          "\nSong: " + data.name +
          "\nArtist: " + data.artists[0].name +
          "\nAlbum: " + data.album.name +
          "\nSpotify URL: " + data.external_urls.spotify +
          "\n\n")
      })
  } else {
    spotify.search({
        type: "track",
        query: songTitle,
        limit: 10,
      })
      .then(function (response) {
        // console.log data (artist, song's name, preview lin of song from Spotify, album name)
        var data = response.tracks.items[0];
        console.log("\n----Song Info----\n" +
          "\nSong: " + data.name +
          "\nArtist: " + data.artists[0].name +
          "\nAlbum: " + data.album.name +
          "\nSpotify URL: " + data.external_urls.spotify +
          "\n\n")
      })
  }
}



// SEARCH FOR A MOVIE
// ---------------------
// command for search is node liri.js movie-this <insert movie name>
var movie = function (query) {
  var movieTitle = process.argv.slice(3).join("+");
  console.log(movieTitle);
  // store api url in variable
  var URL = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy&"
  // create default for no input
  if (!movieTitle) {
    URL = "http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy&"
    console.log("\n-!! You didn't pick a movie, so you get this. !!-")
  }
  // use axios.get with query variable
  axios.get(URL).then(function (response) {
      var data = response.data;
      if (data.Title === undefined) {
        console.log("\n\n--Could not find title. Check your spelling and try again.--\n\n")
      } else {
        console.log("\n----Movie Info----\n" +
          "\nTitle: " + data.Title +
          "\nYear Released: " + data.Year +
          "\nIMDB Rating: " + data.imdbRating +
          // "\nRotten Tomatoes Rating: " + data.Ratings[1].Value +
          "\nCountry: " + data.Country +
          "\nLanguage: " + data.Language +
          "\nSummary: " + data.Plot +
          "\nCast: " + data.Actors +
          "\n\n");
        // console.log data (title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}


// RANDOM.TXT CALLS THE COMMAND
// ------------------------------
// command is node liri.js do-what-it-says
var doWhat = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      console.log(error);
    }
    data = data.split(",");
    var doCommand = data[0];
    var doInput = data[1];
    console.log(doCommand + doInput);
  });
}



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
    console.log("\n\n-!! Something went wrong. Make sure you typed your command correctly. !!-\n\n");
}