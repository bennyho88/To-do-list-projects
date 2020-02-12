// global variables

const form = document.querySelector('#itemForm');
const inputForm = document.querySelector('#itemInput');


const clearButton = document.querySelector('#clear-list');

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