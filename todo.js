// check if you are using local storage, if not, set the itemsarray into an empty array (f2)
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

console.log(itemsArray);

// Add an event listener to the enter button to add items to our todo list (f3)
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

// access the array and display the items on screen (f4)
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `    <div class="item">
                        <div class="input-controller">
                            <textarea disabled>${itemsArray[i]}</textarea>
                            <div class="edit-controller">
                                <i class="fa-solid fa-check deleteBtn"></i>
                                <i class="fa-solid fa-pen-to-square editBtn"></i>
                            </div>
                        </div>
                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = items;
  //   create the delete, edit, save & cancel functions here (f5)
  activateDeleteListeners();
  activateEditListeners();
  acticateSaveListeners();
  activateCancelListener();
}
// (f5-1) delete eventlistener & function
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

// (f5-2) edit eventlistener
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

// (f5-3) save event listener
function acticateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}
// (f5-3-1) save function (updateItem)
function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

// (f4) event listener for cancel
function activateCancelListener() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}

// (f5-1-1) the delete function
function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

// save the item in (f3) in our local storage (f3-1)
function createItem(item) {
  itemsArray.push(item.value); //we have stored item in the items array
  localStorage.setItem("items", JSON.stringify(itemsArray)); //saved to the local storage
  location.reload(); //reloads the page after sending the data
}

// Display date function (f1)
function displayDate() {
  let date = new Date();
  // convert date to string
  date = date.toString().split(" ");
  // display it on the screen
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayDate();
  //   call the f4 function here
  displayItems();
};
