const divs = document.querySelectorAll('div');

function logText(e) {
    console.log(this.classList.value);
    //stops bubbling
    e.stopPropagation();
}

divs.forEach(div => div.addEventListener('click', logText, {
    //if true, bubbles down instead of up
    capture: false,
    //will listen to action then unbind itself AKA remove event listener
    once: true
}));