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


//SHOW VIDEO ON CLICK
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