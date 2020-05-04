//listen for a key down
function playSound(e){
    //should return html audio element
    const audio = this.document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = this.document.querySelector(`.key[data-key="${e.keyCode}"]`);

    //base case: if input is a letter that isnt assigned, dont run.
    if(!audio) {
        return;
    }

    audio.currentTime = 0; //rewind to start
    audio.play();

    // add the playing class to keys 
    key.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') {
        return;
    }
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
