const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    //to stop page from reloading as it is a form
    //we want it to all be client side
    e.preventDefault();
    
    const text = (this.querySelector('[name=item]')).value;

    const item = {
        text,       //es6 shorthand
        done: false
    };

    items.push(item);
    populateList(items, itemsList);
    //set it to localStorage
    //REMEMBER IT TAKES STRINGS ONLY
    localStorage.setItem('items', JSON.stringify(items));

    console.table(items);

    this.reset(); //clears text box

}

//Issue that this recreates the list everytime so in terms of performance it is suboptimal.
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}">${plate.text}</label>
            </li>
        
        `;
    }).join(' ');

}

function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip unless it is an input. Similar to .is in jquery
    const el = e.target;

    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);