//get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); // not sure what this is referencing since there's no .toggle class in the HTML? <--- biggz question
const skipButtons = player.querySelectorAll('[data-skip]');
//calling ('[data-skip]') here encapsulates both data-skips in the HTML so they are both selected when the .querySelectorAll runs to select them, i.e. when the user clicks them.
const playerSlider = player.querySelector('.player__slider'); // y u 2 underscores?
const ranges = player.querySelectorAll('.player__slider');
const fullbtn = player.querySelectorAll('.fullscreen');

//build out functions
function togglePlay (){
    //pauseD is a property that lives on the video. there is no playING property (There is a play property though it seems), only paused property
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    //playerButton.textContent = '>>'; not the best way to do this
    /*if (video.paused){
        video.play();
    } else {
        video.pause();
    }*/
}

function updateButton(){
    const icon = this.paused ? '►' : '||';
    console.log(icon);
    toggle.textContent = icon;
    console.log('Update the button')
}

function skip() {
    console.log('this.dataset.skip') //logs when clicking skip buttons
    video.currentTime += parseFloat(this.dataset.skip); //taking the currentTime in the video and parsing the time to a string, and then to a floating point number, I think?
}

function handleRangeUpdate() {
    video[this.name] = this.value; //'this' here is the slider itself, and it is being updated to a certain value within the video player to control speed and/or volume (on separate sliders)
    console.log(this.name); //logs the name of the value (or element? not sure) we're referencing
    console.log(this.value); // logs the value/number of where the slider is (the 'change', handleRangeUpdate or the mousemovement )
}

function handleProgress() { // function to see the progress bar on the video
	const percent = (video.currentTime / video.duration) * 100; //var of percent to reference later, then taking the currentTime of the video and dividing that by the current duration and multiplying that by 100 to get a percentage
	progressBar.style.flexBasis = `${percent}%` // referencing the progressBar from the top references of HTML, then styling that using the flexBasis property from the CSS sheet and having that equal a percent output on the video
	
}

function scrub(e) { //scrub function creation for being able to jump around the video
    const scrubTime = (e.offsetX / progress.offsetWidth)* video.duration; //var creation for explicitly where the bar visual should move in the progress bar (progress var declared previously) and does some math to determine this. offsetX is a JS event that works by reading the coordinate of the mouse pointer between what you're clicking and the "padding edge" of the target. offsetWidth returns the width of an element as an integer, so in this case the position of the mouse on the bar is being divided by the total width of the bar and being given back as a percentage and multiplied by the video duration
    video.currentTime = scrubTime; //the scrubTime var gets assigned to currentTime var
    console.log(e); //logs the event when the mouse is clicked on the bar
}

//did this myself
/* function toggleFull(){
    if (document.fullscreenElement){
        document.exitFullscreen();
    } else {
        video.requestFullscreen();
    }
} */ //this function does not work either?

function toggleFull() {
    if (video.requestFullscreen){
        video.requestFullscreen();
    }  //this function did not work as advertised lol
   
    /* } else if (video.webkitrequestFullScreen){
        video.webkitrequestFullScreen();
    } else if (video.mozrequestFullScreen){
        video.mozrequestFullScreen();
    } */

//hook up event listeners

video.addEventListener('click', togglePlay);//toggles playing the video when the video itself is clicked
video.addEventListener('play', updateButton); //updates the button to the play button if the button is currently set to the pause button
video.addEventListener('pause', updateButton); //toggles changing the play button to a pause button or whatever.
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);// toggles playing the video when the play button is clicked
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); //will trigger the handleRangeUpdate function on slider change on the video
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //will trigger on mousemove the handleRangeUpdate function on mouse movement on the slider

let mousedown = false;
progress.addEventListener('click', scrub); //listens for the mouse click event on the progress bar, and run the scrub function to move the progress of the video to that point via the scrub function
//can also do:
//progress.addEventListener('mousemove', scrub); but this isn't great to use
progress.addEventListener('mousemove', (e) => mousedown = mousedown && scrub(e)); //when someone moves their mouse we fire mousedown & scrub and if the mousedown var is true, then it moves to scrub to fire the function. If it's false, it returns false and doesn't do anything
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//added this myself
fullbtn.onclick = toggleFull;