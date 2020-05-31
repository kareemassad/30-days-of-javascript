const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; //stop fn from running if true
    //stop text selection
    e.preventDefault();
    //recalc location
    const x = e.pageX - slider.offsetLeft;
    //1.5 can be made into a var. It controls speed of scroll.
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});