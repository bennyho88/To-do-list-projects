// get elements

const itemForm = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.querySelector('#clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];

// parse is used for string to array
let itemData = JSON.parse(localStorage.getItem('list')) || [];
// console.log(itemData);

if(itemData.length > 0) {
    itemData.forEach(function(singleItem) {

        itemList.insertAdjacentHTML('beforeend', `
        <div class="item my-3">
        <h5 class="item-name text-capitalize">${singleItem}</h5>
        <div class="item-icons">
         <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
         <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
         <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
        </div>
        `);
        handleItem(singleItem)
    })
 
}

// form submission

itemForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const textValue = itemInput.value;

    if (textValue === '') {
        showFeedback('please enter valid value', 'danger');
    } else {
        // add item
        addItem(textValue);
        // clear the form 
        itemInput.value = '';
        // add to item array
        itemData.push(textValue);
        console.log(itemData);
        // local storage
        localStorage.setItem('list', JSON.stringify(itemData))

        // add event listeners to icons
        handleItem(textValue);



    }
})

// show feedback function

function showFeedback(text, action) {
    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`

    setTimeout(function () {
        feedback.classList.remove('showItem')
    }, 3000)
}

// add item

function addItem(value) {

    const div = document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML = `  <h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`

    itemList.appendChild(div)

}

function handleItem(textValue) {

    const items = itemList.querySelectorAll('.item');

    console.log(items);

    items.forEach(item => {

        if (item.querySelector('.item-name').textContent === textValue) {


            // complete event listener
            item.querySelector('.complete-item').addEventListener('click', function () {

                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            })

            // edit event listener
            item.querySelector('.edit-item').addEventListener('click', function () {

                itemInput.value = textValue;
                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {

                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData))
                // itemdata
            })

            // delete event listener

            item.querySelector('.delete-item').addEventListener('click', function () {

                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {

                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData))

                showFeedback('item deleted', 'success');
            })


        }

    })
}

clearBtn.addEventListener('click', function() {

    itemData = [];

    localStorage.removeItem('list');
  
    const items = itemList.querySelectorAll('.item');

    // check if items is larger than 0
    if(items.length > 0) {
        items.forEach(item => {

            itemList.removeChild(item)
        })  
    }
})














































/*
// get elements

const inputForm = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.querySelector('#clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];

let itemData = JSON.parse(localStorage.getItem('list')) || [];

if(itemData.length > 0) {
    itemData.forEach(singleItem => {

        itemList.insertAdjacentHTML('beforeend', `
        <div class='item my-3'>
        <h5 class="item-name text-capitalize">${singleItem}</h5>
        <div class="item-icons">
         <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
         <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
         <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
        </div>
        `)
        handleItem(singleItem);
       });

}


// form event listener

inputForm.addEventListener('submit', function(e) {

    e.preventDefault();

    const textValue = itemInput.value;

    if(textValue === '') {
        showFeedback('please enter the value item', 'danger');
    } else {
        addItem(textValue);
        itemInput.value = '';
        itemData.push(textValue);
        console.log(itemData)
        // localstorage
        localStorage.setItem('list', JSON.stringify(itemData));
        handleItem(textValue)
    }
})

// show feedback function

function showFeedback(text, action) {

    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`

    setTimeout(function() {
        feedback.classList.remove('showItem', `alert-${action}`);
    }, 3000)
}

// add item function

function addItem(value) {

    const div = document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`

    itemList.appendChild(div);

}

// handleitem function with the buttons

function handleItem(textValue) {

    const items = itemList.querySelectorAll('.item');

    items.forEach(item => {

        if(item.querySelector('.item-name').textContent === textValue) {

            item.addEventListener('click', function() {
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            })
        }

        item.querySelector('.edit-item').addEventListener('click', function() {
            itemInput.value = textValue;
            itemList.removeChild(item)

            itemData = itemData.filter(function(item) {

                return item !== textValue
            })
            localStorage.setItem('list', JSON.stringify(itemData))
            console.log(itemData)
        })

        item.querySelector('.delete-item').addEventListener('click', function() {

            itemList.removeChild(item)

            itemData = itemData.filter(function(item) {

                return item !== textValue
            })
            localStorage.setItem('list', JSON.stringify(itemData))

            showFeedback('item removed', 'success')
        })
    })
}


// clear btn

clearBtn.addEventListener('click', function() {

    itemData = [];
    localStorage.removeItem('list')
    const items = document.querySelectorAll('.item');

    if(items.length > 0) {
        items.forEach(item => {
            itemList.removeChild(item)
        })
    }
})
*/














































/*




// get elements

const itemForm = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.querySelector('#clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];



let itemData = JSON.parse(localStorage.getItem('list')) || [];
console.log(itemData)

if (itemData.length > 0) {
    itemData.forEach(singleItem => {

        itemList.insertAdjacentHTML('beforeend', `

        <div class='item my-3'>
        <h5 class="item-name text-capitalize">${singleItem}</h5>
        <div class="item-icons">
            <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
            <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
            <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
         </div>
         </div>


        `);

        handleItem(singleItem);
    })
}


// form submission

itemForm.addEventListener('submit', function (event) {

    event.preventDefault();

    let textValue = itemInput.value;
    console.log(textValue);

    if (textValue === '') {
        showFeedback('please enter valid value', 'danger');
    } else {
        // add item
        addItem(textValue)
        // clear the form
        itemInput.value = '';
        // add to item array
        itemData.push(textValue)
        console.log(itemData)
        // local storage


        localStorage.setItem('list', JSON.stringify(itemData));

        // add event listeners to icons;
        handleItem(textValue)
    }
})

// show feedback function

function showFeedback(text, action) {

    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(function () {
        feedback.classList.remove('showItem', `alert-${action}`)
    }, 3000)
}

// add item

function addItem(value) {

    const div = document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML = ` <h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`

    itemList.appendChild(div);


}


function handleItem(textValue) {

    const items = itemList.querySelectorAll('.item');
    console.log(items);

    items.forEach(item => {

        if (item.querySelector('.item-name').textContent === textValue) {

            // complete event listener

            item.querySelector('.complete-item').addEventListener('click', function () {
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });

            // edit event listener
            item.querySelector('.edit-item').addEventListener('click', function () {
                itemInput.value = textValue;
                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData));

                console.log(itemData)
            });

            // delete event listener

            item.querySelector('.delete-item').addEventListener('click', function () {

                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                })
                localStorage.setItem('list', JSON.stringify(itemData));


                showFeedback('item deleted', 'success');
            })
        }
    })

}
//  clear btn

clearBtn.addEventListener('click', function () {
    itemData = [];
    localStorage.removeItem('list');

    const items = itemList.querySelectorAll('.item');

    if (items.length > 0) {
        items.forEach(item => {
            itemList.removeChild(item)
        });
    }
})



*/




































/*
// get elements

const itemForm = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const clearButton = document.querySelector('#clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];


let itemData = JSON.parse(localStorage.getItem('list')) || [];
// console.log(itemData);

if (itemData.length > 0) {
    itemData.forEach(singleItem => {

        itemList.insertAdjacentHTML('beforeend', `
        <div class= "item my-3">
        <h5 class="item-name text-capitalize">${singleItem}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>
    </div>`
        );

        handleItem(singleItem);
    });

}
// form submission

itemForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const textValue = itemInput.value;
    console.log('check textValue: ' + textValue);

    if (textValue === '') {
        showFeedback('please enter valid value', 'danger')
    } else {
        // add item
        addItem(textValue);
        // clear the form
        itemInput.value = '';
        // add to item array
        itemData.push(textValue);
        // console.log(itemData)
        // local storage
        localStorage.setItem('list', JSON.stringify(itemData));

        // add event listeners to icons;
        handleItem(textValue);

    }
})

// show feedback function
function showFeedback(text, action) {

    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(function () {

        feedback.classList.remove('showItem', `alert-${action}`);

    }, 3000);
}

// add item

function addItem(value) {

    const div = document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;

    itemList.appendChild(div);
}

function handleItem(textValue) {

    const items = itemList.querySelectorAll('.item');
    items.forEach(item => {
        console.log(item)
        if (item.querySelector('.item-name').textContent === textValue) {

            // complete event listener

            item.querySelector('.complete-item').addEventListener('click', function () {
                item.querySelector('.item-name').classList.toggle('completed');

                this.classList.toggle('visibility');
            })

            // edit event listener

            item.querySelector('.edit-item').addEventListener('click', function () {
                itemInput.value = textValue;
                // console.log(this);
                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {

                    return item !== textValue;
                })
                localStorage.setItem('list', JSON.stringify(itemData));
            })

            // delete event listener

            item.querySelector('.delete-item').addEventListener('click', function () {
                itemList.removeChild(item);

                itemData = itemData.filter(function (item) {
                    return item !== textValue;
                })
                localStorage.setItem('list', JSON.stringify(itemData));

                showFeedback('item delete', 'success')
            })
        }
    })
}

clearButton.addEventListener('click', function () {
    itemData = [];
    localStorage.removeItem('list');
    const items = itemList.querySelectorAll('.item');

    if (items.length > 0) {
        items.forEach(item => {
            itemList.removeChild(item);
        })
    }

})

*/
















/*
// global variables

const form = document.querySelector('#itemForm');
const inputForm = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');

const clearButton = document.querySelector('#clear-list');

////add list in html


<!-- single item -->
<!-- <div class="item my-3">
<h5 class="item-name text-capitalize">laundry</h5>
<div class="item-icons">
 <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
 <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
 <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
</div>
</div> -->


const itemDiv1 = document.createElement('div');
const head = document.createElement('h5');
const itemIconsDiv = document.createElement('div');

const completeItem = document.createElement('a');
const editItem = document.createElement('a');
const deleteItem = document.createElement('a');

const completeIcon = document.createElement('i');
const editIcon = document.createElement('i');
const deleteIcon = document.createElement('i');

// add class in element

itemDiv1.classList.add('item', 'my-3');
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


    const itemValue = document.querySelector('#itemInput').value;
    console.log('check value item: ' + itemValue);
    console.log('check typeof itemvalue: ' + typeof itemValue);

   //  addItem(itemValue);
   // addItem(head.value);
   addItem();

   // head.value = '';



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
        itemDiv1.textContent = '';
    })

    deleteButton.addEventListener('click', function() {
        itemDiv1.textContent = '';
    })



})

// edit item button

editButton.addEventListener('click', function() {
        head.textContent = '';
        inputForm.value = item;
        console.log('check item: ' + item)
    })





// clear items - button

// localStorage.clear();
// store items in localstorage



// add item

function addItem() {



    const item = document.querySelector('#itemInput').value;

    // item div append to itemlist
    itemList.appendChild(itemDiv1);
    // head 5 append to item div
    itemDiv1.appendChild(head);
    // item icon div append to item div
    itemDiv1.appendChild(itemIconsDiv);


    itemIconsDiv.appendChild(completeItem);
    itemIconsDiv.appendChild(editItem);
    itemIconsDiv.appendChild(deleteItem);

    completeItem.appendChild(completeIcon);
    editItem.appendChild(editIcon);
    deleteItem.appendChild(deleteIcon);
    console.log(itemDiv1)

    head.textContent = item;
    console.log('itemValue has been added: ' + item)
}
*/
