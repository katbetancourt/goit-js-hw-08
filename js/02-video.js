// Import lodash.throttle as before
import throttle from "lodash.throttle";

// Obtain a reference to the iframe element
const iframe = document.getElementById("vimeo-player");

// Create a Vimeo player instance
const player = new Vimeo.Player(iframe);

// Function to save the current playback time to local storage
function saveCurrentTime(time) {
  localStorage.setItem("videoplayer-current-time", time);
}

// Function to load the saved playback time from local storage
function loadCurrentTime() {
  return parseFloat(localStorage.getItem("videoplayer-current-time")) || 0;
}

// Throttle the saving of playback time to once per second
const saveCurrentTimeThrottled = throttle(saveCurrentTime, 1000);

// Listen for the 'timeupdate' event to save the current time
player.on("timeupdate", (data) => {
  const currentTime = data.seconds;
  saveCurrentTimeThrottled(currentTime);
});

// Load the saved playback time and set the current time of the video
player.setCurrentTime(loadCurrentTime());

// Add any other event listeners or configurations as needed
