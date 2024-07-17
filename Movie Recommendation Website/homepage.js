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


//SHOW VIDEO ON CLICK (applies only to TodaysFavourites.html)
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



//TMDB API to show popular movie infos according to genre (applies only to TodaysFavourites.html)
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmYxMzBiOWYzZTIxMTI2MGFmMmIwZmQyMzhjZWIyMCIsIm5iZiI6MTcyMTIyMjM1OC4xODMzMzcsInN1YiI6IjY2OTQ0NGU0ZGFjNjc5M2YyNzg5NmIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ff-ja6-IFX7sHB3O4yyZtCsMe9Yk-tYhT0FOSJS4_vU'
  }
};

const totalPages = 10; // Number of pages to fetch
let allMoviesData = []; // Array to store all fetched movies data

const sections = {
  "#All": [],
  "#Drama": [18],
}; // Define sections with their IDs

function fetchMoviesData(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch page ${page}: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Fetched page ${page} data:`, data);
      return data.results; // Return results array for current page
    })
    .catch(error => {
      console.error(`Error fetching page ${page} data:`, error);
      return []; // Return empty array in case of error
    });
}

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

async function fetchAllPagesData() {
  try {
    for (let page = 1; page <= totalPages; page++) {
      const movies = await fetchMoviesData(page);
      allMoviesData = allMoviesData.concat(movies);
    }

    console.log('All movies data:', allMoviesData);

    // Process each movie and fetch video data for each section
    Object.keys(sections).forEach(sectionId => { //get the keys of sections object
      const movieElements = document.querySelectorAll(`${sectionId} .movie`);
      const sectionGenreIds = sections[sectionId]; //gets the value of the sections in iteration of the object

      let filteredMovies;
      if (sectionGenreIds.length > 0) {
        filteredMovies = allMoviesData.filter(movie =>
          movie.genre_ids.some(genreId => sectionGenreIds.includes(genreId)) //some() method: This method checks if at least one element in the array passes the test implemented by the provided function. If any genreId in movie.genre_ids is found in sectionGenreIds, the movie is included in the filteredMovies array.
        );
      } else {
        filteredMovies = allMoviesData;
      }

      filteredMovies.forEach((movie, index) => {
        if (index < movieElements.length) {
          const movieElement = movieElements[index];
          const imgElement = movieElement.querySelector('img');
          const titleElement = movieElement.querySelector('h3');
          const overviewElement = movieElement.querySelector('span');

          imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          titleElement.textContent = movie.title;
          overviewElement.textContent = movie.overview;

          // Fetch video data for the current movie
          fetchVideoData(movie.id)
            .then(videoData => {
              // Find and set trailer video key if available
              const trailerVideo = videoData.find(video => video.type === 'Trailer');
              if (trailerVideo) {
                imgElement.setAttribute('data-video-id', trailerVideo.key);
              }
            })
            .catch(err => console.error('Error fetching video data:', err));
        }
      });
    });
  } catch (error) {
    console.error('Error fetching all pages data:', error);
  }
}

// Call function to fetch all pages data
fetchAllPagesData();
