// global variables

const form = document.querySelector('#itemForm');
const inputForm = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');

const clearButton = document.querySelector('#clear-list');

////add list in html

/*
<!-- single item -->
<!-- <div class="item my-3">
<h5 class="item-name text-capitalize">laundry</h5>
<div class="item-icons">
 <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
 <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
 <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
</div>
</div> -->
*/


const itemDiv = document.createElement('div');
const head = document.createElement('h5');
const itemIconsDiv = document.createElement('div');

const completeItem = document.createElement('a');
const editItem = document.createElement('a');
const deleteItem = document.createElement('a');

const completeIcon = document.createElement('i');
const editIcon = document.createElement('i');
const deleteIcon = document.createElement('i');

// add class in element

itemDiv.classList.add('item', 'my-3');
head.classList.add('item-name', 'text-capitalize');
itemIconsDiv.classList.add('item-icons');

completeItem.setAttribute('href', '#');
completeItem.classList.add('complete-item', 'mx-2', 'item-icon')
editItem.setAttribute('href', '#');
editItem.classList.add('edit-item', 'mx-2', 'item-icon');
deleteItem.setAttribute('href', '#');
deleteItem.classList.add('delete-item', 'item-icon');

completeIcon.classList.add('far', 'fa-check-circle');
editIcon.classList.add('far', 'fa-edit');
deleteIcon.classList.add('far', 'fa-times-circle');

// append elements to item list

itemList.appendChild(itemDiv);
itemDiv.appendChild(head);
itemDiv.appendChild(itemIconsDiv);


itemIconsDiv.appendChild(completeItem);
itemIconsDiv.appendChild(editItem);
itemIconsDiv.appendChild(deleteItem);

completeItem.appendChild(completeIcon);
editItem.appendChild(editIcon);
deleteItem.appendChild(deleteIcon);

// validateinput

const validateInput = function(item) {

    let isFeedback = false;
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = ''

    if(item === "") {
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += 'Please Enter Valid Value';
        isFeedback = true;
    }

    setTimeout(function() {
        feedback.classList.remove('showItem', 'alert-danger');
    },5000)
}

form.addEventListener('submit', function(e) {

    e.preventDefault();
    

    const item = document.querySelector('#itemInput').value;
    console.log('check value item: ' + item);

    
    let isFeedback = validateInput(item);
    console.log('check isFeedback: ' + isFeedback);
    
})

// clear items - button