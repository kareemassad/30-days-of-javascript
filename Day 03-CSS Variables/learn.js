
// NOTE: This gives a nodeList not an Array! Nodelist has less pre-built methods
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
    //dataset is an object that has all the made up data-blah class info
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));