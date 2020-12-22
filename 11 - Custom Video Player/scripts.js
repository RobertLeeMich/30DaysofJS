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

//hook up event listeners

video.addEventListener('click', togglePlay);//toggles playing the video when the video itself is clicked
video.addEventListener('play', updateButton); //updates the button to the play button if the button is currently set to the pause button
video.addEventListener('pause', updateButton); //toggles changing the play button to a pause button or whatever.

toggle.addEventListener('click', togglePlay);// toggles playing the video when the play button is clicked
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); //will trigger the handleRangeUpdate function on slider change on the video
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //will trigger on mousemove the handleRangeUpdate function on mouse movement on the slider