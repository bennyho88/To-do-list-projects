// get elements

const itemInput = document.querySelector("#itemInput");
const itemForm = document.querySelector("#itemForm");
const itemList = document.querySelector(".item-list");
const clearBtn = document.querySelector("#clear-list");
const feedBack = document.querySelector(".feedback");

// let itemData = [];

let itemData = JSON.parse(localStorage.getItem("list")) || [];

if (itemData.length > 0) {
  itemData.forEach(function (singleItem) {
    itemList.insertAdjacentHTML(
      "beforeend",
      `
    
        <div class= "item my-3">
        <h5 class="item-name text-capitalize">${singleItem}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>
    </div>
        `
    );
    handleItem(singleItem);
  });
}

// form submission

itemForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let textValue = itemInput.value;

  if (textValue === "") {
    showFeedback("item input is not valied", "danger");
  } else {
    addItem(textValue);

    // clear item

    itemInput.value = "";
    itemData.push(textValue);
    // localstorage

    localStorage.setItem("list", JSON.stringify(itemData));
    handleItem(textValue);
  }
});

function showFeedback(text, action) {
  feedBack.classList.add("showItem", `alert-${action}`);
  feedBack.innerHTML = `<p>${text}</p>`;

  setTimeout(function () {
    feedBack.classList.remove("showItem", `alert-${action}`);
  }, 3000);
}

function addItem(value) {
  const div = document.createElement("div");
  div.classList.add("item", "my-3");
  div.innerHTML = `
    <h5 class="item-name text-capitalize">${value}</h5>
        <div class="item-icons">
         <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
         <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
         <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
        </div>
    `;

  itemList.appendChild(div);
}

function handleItem(textValue) {
  const items = itemList.querySelectorAll(".item");

  items.forEach((item) => {
    if (item.querySelector(".item-name").textContent === textValue) {
      item
        .querySelector(".complete-item")
        .addEventListener("click", function () {
          item.querySelector(".item-name").classList.toggle("completed");
          this.classList.toggle("visibility");
        });

      item.querySelector(".edit-item").addEventListener("click", function () {
        itemInput.value = textValue;
        itemList.removeChild(item);

        itemData = itemData.filter(function (item) {
          return item !== textValue;
        });
        localStorage.setItem("list", JSON.stringify(itemData));
        console.log(itemData);
      });

      item.querySelector(".delete-item").addEventListener("click", function () {
        itemList.removeChild(item);

        itemData = itemData.filter((item) => {
          return item !== textValue;
        });
        localStorage.setItem("list", JSON.stringify(itemData));

        showFeedback("item has been deleted", "success");
      });
    }
  });
}

clearBtn.addEventListener("click", function () {
  itemData = [];

  localStorage.removeItem("list");
  const items = itemList.querySelectorAll(".item");

  if (items.length > 0) {
    items.forEach((item) => {
      itemList.removeChild(item);
    });
  }
});
