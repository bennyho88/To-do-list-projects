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

// validateinput

const validateInput = function (item) {

    let isFeedback = false;
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = ''

    if (item === "") {
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += 'Please Enter Valid Value';
        isFeedback = true;
    }

    setTimeout(function () {
        feedback.classList.remove('showItem', 'alert-danger');
    }, 5000)
}

form.addEventListener('submit', function (e) {

    e.preventDefault();

    /*
    const itemValue = document.querySelector('#itemInput').value;
    console.log('check value item: ' + itemValue);
    console.log('check typeof itemvalue: ' + typeof itemValue);
*/
   //  addItem(itemValue);
   addItem(head.value);

   head.value = '';
  
/*

    let isFeedback = validateInput(itemValue);
    console.log('check isFeedback: ' + isFeedback);

    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (!isFeedback) {
          
            inputForm.value = '';
            localStorage.setItem('item', itemValue)
            console.log('it works');
            console.log('check localstorage: ' + localStorage.getItem('item') );
            let value  = localStorage.getItem('item');
             head.textContent = value;
            // head.innerHTML = localStorage.getItem('item');
        }
    
      } else {
        // Sorry! No Web Storage support..
        console.log('it doesnt work')
      }
    
*/
    // complete item button

    const completeButton = document.querySelector('.complete-item');
    const editButton = document.querySelector('.edit-item');
    const deleteButton = document.querySelector('.delete-item');

    completeButton.addEventListener('click', function () {
        head.classList.toggle('completed');
    })

    // edit item button

    editButton.addEventListener('click', function () {
        head.textContent = '';
        inputForm.value = itemValue;
        console.log('check item edit: ' + itemValue)
        itemDiv.textContent = '';
    })

    deleteButton.addEventListener('click', function() {
        itemDiv.textContent = '';
    })

   

})

// edit item button
/*
editButton.addEventListener('click', function() {
        head.textContent = '';
        inputForm.value = item;
        console.log('check item: ' + item)
    })

*/



// clear items - button

// localStorage.clear();
// store items in localstorage



// add item 

function addItem() {

    const item = document.querySelector('#itemInput').value;

    // item div append to itemlist
    itemList.appendChild(itemDiv);
    // head 5 append to item div
    itemDiv.appendChild(head);
    // item icon div append to item div
    itemDiv.appendChild(itemIconsDiv);


    itemIconsDiv.appendChild(completeItem);
    itemIconsDiv.appendChild(editItem);
    itemIconsDiv.appendChild(deleteItem);

    completeItem.appendChild(completeIcon);
    editItem.appendChild(editIcon);
    deleteItem.appendChild(deleteIcon);
    console.log(itemDiv)

    head.textContent = item;
}

