require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var axios = require("axios");


// BANDS IN TOWN SEARCH
// ----------------------
// command for search is node liri.js concert-this <insert artist/band name>
var concert = function () {
  var artist = process.argv.slice(3).join("+");
  // console.log(artist);
  // store api url in variable
  var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  // use axios.get with query variable
  if (!artist) {
    console.log("\n-!! Try again, please. Remember to type in an artist or band. !!-\n")
  }
  axios.get(URL).then(function (response) {
    // console.log data (name of venue, venue location, date of event (use moment- blech! - to format as MM/DD/YYYY))
    // NB - put each piece of data on a separate line
    var data = response.data[0];
    var time = moment(data.datetime).format("MMMM Do YYYY, h:mm:ss a");
    console.log("\n----Upcoming Concert Info----\n" +
      "\nVenue: " + data.venue.name +
      "\nLocation: " + data.venue.city + ", " + data.venue.country +
      "\nTime: " + time +
      "\n\n");
  });


}

// // SEARCH FOR A SONG WITH SPOTIFY NODE API
// // ----------------------------------------
// // command for search is node liri.js spotify-this-song <insert song name>
// var spotify = new Spotify(keys.spotify);
// var songTitle = process.argv.slice(3).join(" ");
// var spotifySong = function (query) {
//   if (!query) {
//     console.log("if")
//     spotify.search({
//         type: "track",
//         query: "The Sign"
//       }, function (err, data) {
//         if (err) {
//           return console.log("Error: " + err);
//         });
//     }
//   }
//   .then(function (response) {
//     console.log(response)
//   });

// } else {
//   console.log.apply("else")
//   spotify.search({
//       type: "track",
//       query: query
//     })
//     .then(function (response) {
//       console.log(response);
//       // console.log data (artist, song's name, preview lin of song from Spotify, album name)
//     });
// }
// }



// SEARCH FOR A MOVIE
// ---------------------
// command for search is node liri.js movie-this <insert movie name>
var movie = function (query) {
  var movieTitle = process.argv.slice(3).join("+");
  console.log(movieTitle);
  // store api url in variable
  var URL = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy&"
  // var nobody = "http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy&"
  // create default for no input
  if (!movieTitle) {
    // movieTitle = "Mr+Nobody";
    URL = "http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy&"
    console.log("\n-!! You didn't pick a movie, so we picked for you. !!-")
  }
  // use axios.get with query variable
  axios.get(URL).then(function (response) {
      var data = response.data;
      if (data.Title === undefined) {
        console.log("\n--Could not find title. Check your spelling and try again.--\n\n")
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