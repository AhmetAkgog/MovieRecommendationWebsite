//CHANGE COLOR OF TITLE ON MOUSEOVER
const title = document.getElementById('title');
var i = 0;
var changeTitleColor = () => {
        title.addEventListener('mouseover', function(e) {
        switch (i) {
            case 0:
                title.style.color = 'red';
                i += 1;
                break;
            case 1:
                title.style.color = 'orange';
                i += 1;
                break;
            case 2:
                title.style.color = 'yellow';
                i += 1;
                break;
            case 3:
                title.style.color = 'green';
                i += 1;
                break;
            case 4:
                title.style.color = 'blue';
                i += 1;
                break;
            case 5:
                title.style.color = 'indigo';
                i += 1;
                break;
            case 6:
                title.style.color = 'violet';
                i += 1;
                break;
            case 7:
                title.style.color = 'cyan';
                i += 1;
                break;
            case 8:
                title.style.color = 'white';
                i += 1;
                break;
            case 9:
                title.style.color = 'pink';
                i = 0;
                break;
        }

    }
    )}
changeTitleColor();


//BACKGROUND ANIMATION ON MOUSEMOVE
const lineContainer = document.getElementById("line-container");
const rowsCount = Math.ceil(document.body.scrollHeight / 20); // Updated to cover the entire scrollable area
// Create lines and add them to the container
for (let i = 0; i < rowsCount; i++) {
  const line = document.createElement("div");
  line.className = "line";
  line.style.top = `${i * 20}px`; // Updated spacing for consistent scroll effect
  const segment = document.createElement("div");
  segment.className = "segment";
  line.appendChild(segment);
  lineContainer.appendChild(line);
}
const lines = document.querySelectorAll(".line");
// Function to track mouse movement and adjust lines
const trackMouse = (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY + window.scrollY; // When you add e.clientY (mouse position within the viewport) to window.scrollY (scroll offset), you get the mouse's vertical position relative to the entire document
  // Calculate the index of the current row
  const rowIndex = Math.floor(mouseY / 20);
  // Adjust the segments of the current, previous, and next lines based on the mouse position
  lines.forEach((line, index) => {
    const lineTop = parseFloat(line.style.top);
    const segment = line.querySelector(".segment");
    const isCurrentLine =
      lineTop >= mouseY - 27 && lineTop <= mouseY + 27;
    const isPreviousLine = index === rowIndex - 1;
    const isNextLine = index === rowIndex + 1;
    if (isCurrentLine) {
      segment.style.width = "54px"; // Full width for current line
      segment.style.opacity = "1"; // Visible for current line
      line.style.transform = "scaleX(1)";
    } else if (isPreviousLine || isNextLine) {
      segment.style.width = "27px"; // Half width for previous and next lines
      segment.style.opacity = "1"; // Visible for previous and next lines
    } else {
      segment.style.width = "0"; // No width for other lines
      segment.style.opacity = "0"; // Hidden for other lines
      line.style.transform = "scaleX(0)";
    }
    // Position the segment relative to the mouse
    segment.style.left = `${
      mouseX - parseInt(segment.style.width) / 2
    }px`;
  });
};
// Add event listeners
document.addEventListener("mousemove", trackMouse);
window.addEventListener("scroll", trackMouse); // Added scroll event listener


//Youtube Iframe API to show video on click (applies only to TodaysFavourites.html)
var tag = document.createElement("script"); // Load the IFrame Player API code asynchronously.
tag.src = "https://www.youtube.com/iframe_api"; //Implementing the API
var firstScriptTag = document.getElementsByTagName("script")[0]; // Find the first script element on the page
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // Insert the <script> tag before the first script element

var player; // Create a variable to store the new YT.Player object
function onYouTubeIframeAPIReady() { 
  player = new YT.Player("player", {
    height: "390",
    width: "640"
  });
}

document.querySelectorAll('.thumbnail').forEach(img => {  // Getting the video ID from the data-video-id attribute for player and display popup
  img.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video-id');
      const popup = document.getElementById('popup');
      popup.style.display = 'block'; // Show the popup // Set the video ID and autoplay
      player.loadVideoById(videoId);
  });
});
document.querySelector('.close').addEventListener('click', function() { // Close the popup when clicking the close button
  const popup = document.getElementById('popup');
  popup.style.display = 'none'; // Hide the popup
  player.stopVideo();
});



//SOLO RECOMMENDATION (only work for solorecommendation.html)
//API Authorization
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer YOUR API TOKEN HERE'
  }
}

//API function to fetch trailers
function fetchVideoData(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch videos for movie ${movieId}: ${response.status}`);
      }
      return response.json();
    })
    .then(video => {
      console.log(`Fetched video data for movie ${movieId}:`, video);
      return video.results; // Return results array for videos
    })
    .catch(error => {
      console.error(`Error fetching video data for movie ${movieId}:`, error);
      return []; // Return empty array in case of error
    });
}


//API function to fetch recommendations and place them in movie containers

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const submitButton = document.getElementById('submitButton');
  const suggestionsBox = document.getElementById('suggestions');
  let selectedMovieId = null; // Store the movie_id of the selected movie

  searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      suggestionsBox.textContent = '';

      if (query) {
          fetchSuggestions(query);
      } else {
          suggestionsBox.style.display = 'none';
      }
  });

  // Close dropdown recommendation box when clicking outside of it
  document.addEventListener('click', (event) => {
      if (!event.target.closest('.autocomplete')) {
          suggestionsBox.textContent = '';
          suggestionsBox.style.display = 'none';
      }
  });


  //Submit button to fetch recommendations
  submitButton.addEventListener('click', () => {
      if (selectedMovieId) {
        console.log('chosen movie id:',selectedMovieId)
        const movieElements = document.querySelectorAll('.movie-container .movie')
        fetch(`https://api.themoviedb.org/3/movie/${selectedMovieId}/recommendations?language=en-US&page=1`, options)
          .then(response => response.json())
          .then(response =>  {
            results = response.results;
            console.log(results)
            results.forEach((recommendedMovie, index) => {
              if (index < movieElements.length) {
              const movieElement = movieElements[index];
              const imgElement = movieElement.querySelector('img');
              imgElement.src = `https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`;
              imgElement.alt = `${recommendedMovie.title} poster`;
              const titleElement = movieElement.querySelector('h3');
              titleElement.textContent = recommendedMovie.title;
              const overviewElement = movieElement.querySelector('.movie span');
              overviewElement.textContent = recommendedMovie.overview;
              console.log(imgElement,titleElement,overviewElement)
              const movieContainer = document.getElementById('movie-container');
              movieContainer.style.display = 'flex';

              fetchVideoData(recommendedMovie.id)
              .then(videoData => {
                // Find and set trailer video key if available
                const trailerVideo = videoData.find(video => video.type === 'Trailer');
                if (trailerVideo) {
                  imgElement.setAttribute('data-video-id', trailerVideo.key);
                }
              })
              .catch(err => console.error('Error fetching video data:', err));

          }});
          })

          .catch(err => console.error(err));
      } else {
          alert('Please select a movie from the dropdown');
      }
  });


  //Dropdown menu for recommendations
  function fetchSuggestions(query) {
      fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
          .then(response => response.json())
          .then(data => {
              const results = data.results;
              suggestionsBox.textContent = '';
              if (results.length > 0) {
                  results.forEach(movie => {
                      const div = document.createElement('div');
                      div.classList.add('suggestion');
                      const img = document.createElement('img');
                      img.src = `https://image.tmdb.org/t/p/w92${movie.poster_path}`;
                      img.alt = `${movie.title} poster`;
                      const span = document.createElement('span');
                      span.textContent = movie.title;
                      div.appendChild(img);
                      div.appendChild(span);
                      div.addEventListener('click', () => {
                          searchInput.value = movie.title;
                          selectedMovieId = movie.id; // Store the selected movie ID
                          suggestionsBox.textContent = '';
                          suggestionsBox.style.display = 'none';
                      });
                      suggestionsBox.appendChild(div);
                  });
                  suggestionsBox.style.display = 'block';
              } else {
                  suggestionsBox.style.display = 'none';
              }
          })
          .catch(error => {
              console.error('Error fetching suggestions:', error);
          });
  }
});

