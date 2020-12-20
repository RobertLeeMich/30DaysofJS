//get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); // not sure what this is referencing since there's no .toggle class in the HTML? <--- biggz question
const skipButtons = player.querySelectorAll('[data-skip]');
//calling ('[data-skip]') here encapsulates both data-skips in the HTML so they are both selected when the .querySelectorAll runs to select them, i.e. when the user clicks them.
const playerSlider = player.querySelector('.player__slider'); // y u 2 underscores?

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
    toggle.textContent = icon;
    console.log('Update the button')
}


//hook up event listeners

video.addEventListener('click', togglePlay);//toggles playing the video when the video itself is clicked
video.addEventListener('play', togglePlay);

video.addEventListener('pause', updateButton); //toggles changing the play button to a pause button or whatever.

toggle.addEventListener('click', togglePlay);// toggles playing the video when the play button is clicked