let currentListItem = 0;
let allLists = ["My Checklist"];

// Creates a new checklist
function newList() {
    var newListInput = document.getElementById("newList").value;
    var newListId;
    var listItemInDock = [];
    var newArray = [];
    // Pushes new list name to an array
    listItemInDock.push(newListInput);
    
    // Compares current List Names to New List Names
    newArray = compare(listItemInDock, allLists);
    // If there are no repeat list names then a new list is created
    if (newArray.length === 0) {

        if (newListInput !== "") {
            newListId = newListInput.replace(/\s/g, '');
            document.getElementById("listContainer").innerHTML += `
    <ul id="${newListId}" ondrop="drop(event, this)" ondragover="allowDrop(event)">
    <h1>${newListInput}</h1>
    <input type="text" id="${newListId}Input">
    <button type="button" class="green" onclick="addNewListItem('${newListId}')">➕ New List Item</button>
    <button onclick="deleteList()" class="red">🗑️Delete List</button>
    <div class="spacer"></div>
    </ul>`;
    allLists.push(newListInput);
        }
      }
}

// Function to compare arrays to check for repeat lists.
function compare(arr1,arr2){
    const finalArray = [];
    arr1.forEach((e1)=>arr2.forEach((e2)=>
    {if(e1 === e2)
    finalArray.push(e1);
    }
    ));
    return finalArray;
}

// Add new item to the list if the new list input box is not empty.
function addNewListItem(id) {
    var newListItem = document.getElementById(`${id}Input`).value;
    if (newListItem !== "") {
        currentListItem++;
        document.getElementById(id).innerHTML += `
        <li id="listItem${currentListItem}" draggable="true" ondragstart="drag(event)">
        <span id="listItem${currentListItem}content">${newListItem}</span>
        <div class="btngroup">
        <button onclick="deleteItem()" class="red">🗑️Delete</button>
        <button onclick="editItem()" class="grey">✏️Edit</button>
        <button onclick="favoriteItem()" class="grey">🖤Favorite</button>
        <button onclick="addTagToItem()" class="grey">➕🏷️Add Tag</button>
        <button onclick="checkItem()" class="green">☑️Complete</button>
        </div>
        </li>`;
    }
}

// Clears list item from the DOM
function deleteItem() {
    event.target.parentNode.parentNode.outerHTML = "";
}

// Moves list item to the favorites list. This feature is not yet complete.
function favoriteItem() {
    event.target.innerHTML = "❤️ Favorited";
    event.target.parentNode.parentNode.classList.toggle("star");
    event.target.setAttribute("onclick", "unfavoriteItem()")


    var listItemInDock = [];
    var newArray = [];
    listItemInDock.push("Favorites");
    
    newArray = compare(listItemInDock, allLists);

    if (newArray.length === 0) {
        document.getElementById("listContainer").innerHTML += `
        <ul id="Favorites">
        <h1>Favorites</h1>
        <input type="text" id="FavoritesInput">
        <button type="button" class="green" onclick="addNewListItem('Favorites')">➕ New List Item</button>
        <button onclick="deleteList()" class="red">🗑️Delete List</button>
        <div class="spacer"></div>
        </ul>`;
        allLists.push("Favorites");
    } 
  
    newListItem = event.target.parentNode.parentNode.childNodes[1].innerHTML;
   
    document.getElementById("Favorites").innerHTML += `
        <li>
        <span>${newListItem}</span>
        <div class="btngroup">
        <button onclick="deleteItem()" class="red">🗑️Delete</button>
        <button onclick="editItem()" class="grey">✏️Edit</button>
        <button onclick="unfavoriteItem()" class="grey">❤️Favorited</button>
        <button onclick="addTagToItem()" class="grey">➕🏷️Add Tag</button>
        <button onclick="checkItem()" class="green">☑️Complete</button>
        </div>
        </li>`;
}

// Unfavorite items by switching innerHTML and remove class. Switch on click attribute to opposite function.
function unfavoriteItem() {
    event.target.innerHTML = "🖤 Favorite";
    event.target.parentNode.parentNode.classList.remove("star");
    event.target.setAttribute("onclick", "favoriteItem()")
}

// Saves current list item to an array. Displays that list item in input box in modal.
var editingItem;
function editItem() {
    document.getElementById("editModal").style.display = "block";
    console.log(event.target.parentNode.parentNode.id)
    editingItem = event.target.parentNode.parentNode.childNodes[1].id;
    var oldListItem = event.target.parentNode.parentNode.childNodes[1].innerHTML;
    document.getElementById("editListItemInput").value = oldListItem;
    document.getElementById("editListItemInput").focus();
}

// Save list item edits, hides the modal and writes new input box value over the old innerHTML.
function saveEdits() {
    document.getElementById("editModal").style.display = "none";
    var newListItem = document.getElementById("editListItemInput").value;
    document.getElementById(editingItem).innerHTML = newListItem;
}

// Close edit pop up, cancels the edit modal.
function closeEdits() {
    document.getElementById("editListItemInput").value = "";
    document.getElementById("editModal").style.display = "none";
}

// Check list item
function checkItem() {
    event.target.parentNode.parentNode.classList.add("completed");
    event.target.parentNode.innerHTML = '<button onclick="deleteItem()" class="red">🗑️Delete</button><button onclick="uncheckItem()" class="grey">↩️Undo</button>';
}

// Uncheck list item
function uncheckItem() {
    event.target.parentNode.parentNode.classList.remove("completed");
    event.target.parentNode.innerHTML = `<button onclick="deleteItem()" class="red">🗑️Delete</button>
    <button onclick="editItem()" class="grey">✏️Edit</button>
    <button onclick="favoriteItem()" class="grey">🖤Favorite</button>
    <button onclick="addTagToItem()" class="grey">➕🏷️Add Tag</button>
    <button onclick="checkItem()" class="green">☑️Complete</button>`;
}

// Variables for delete list popup
let verifyDelete;
let listTitle;

// Display delete list pop up
function deleteList() {
    verifyDelete = event.target.parentNode;
    listTitle = verifyDelete.childNodes[1].innerHTML;
    document.getElementById("deleteListModal").style.display = "block";
    document.getElementById("deleteListModalTitle").innerHTML = `Are you sure you want to delete ${listTitle}? <br> This action cannot be undone.`;
}

// Confirm the deletion of a list
function deleteListConfirm() {
    document.getElementById(verifyDelete.id).outerHTML = "";
    document.getElementById("deleteListModal").style.display = "none";
}

// Cancel delete list pop up
function deleteListCancel() {
    document.getElementById("deleteListModal").style.display = "none";
}

// Create a new tag
function newTag() {
    document.getElementById("newTagModal").style.display = "block";
}

// Create a new tag, display tag pop up
function createTag() {
    var tag = document.getElementsByClassName("tag");
    var tagData = tag[0].id;
    var tagName = tag[0].innerHTML;
    document.getElementById("tagDropdown").innerHTML += `"<option value="${tagData}">${tagName}</option>"`;
    document.getElementById("newTagModal").style.display = "none";
    tag[0].innerHTML = "Tag Preview"
}

// Close tag popup
function closeTag() {
    document.getElementById("newTagModal").style.display = "none";
}

// Set tag color
function setTagColor() {
    var tag = document.getElementsByClassName("tag");
    var tagColor = event.target.id;
    tag[0].id = `${tagColor}`;
}

// Set a tag name
function setTagName() {
    var tag = document.getElementsByClassName("tag");
    tag[0].innerHTML = document.getElementById("newTagInput").value;
}

// Add tag to list item
var eventAddTagTo;

function addTagToItem() {
    eventAddTagTo = event.target.parentNode.parentNode;
    document.getElementById("applyTagModal").style.display = "block";
}

// Apply tag to tag drop down list
function applyTag() {
    var colorId = document.getElementById("tagDropdown").value;
    var tagContent = document.getElementById("tagDropdown").options[document.getElementById("tagDropdown").selectedIndex].innerHTML;
    eventAddTagTo.innerHTML += `<div class="tag" style="margin-right: 8px;" id="${colorId}">${tagContent}<div onclick="deleteTag()">❌</div></div>`
    document.getElementById("applyTagModal").style.display = "none";
}

// Hide tag pop up
function cancelApplyTag() {
    document.getElementById("applyTagModal").style.display = "none";
}

// Delete tag
function deleteTag() {
    event.target.parentNode.outerHTML = "";
}

// Prevent default behavior and allow drop on lists.
function allowDrop(ev) {
    ev.preventDefault();
}

// Drag events, transfer text data
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// Drop element in new list
function drop(ev, el) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    el.appendChild(document.getElementById(data));
}

// Toggle the visibility for completed list items by using a for loop to check for classes.
function hideCompletedItem() {
    var completedItems = document.querySelectorAll("li.completed");
    for (let i = 0; i < completedItems.length; i++) {
        completedItems[i].style.display = "none";
    }
    event.target.outerHTML = `<button type="button" class="grey" onclick="unhideCompletedItem()">👁️Unhide Completed Tasks</button>`
}

function unhideCompletedItem() {
    var completedItems = document.querySelectorAll("li.completed");
    for (let i = 0; i < completedItems.length; i++) {
        completedItems[i].style.display = "block";
    }
    event.target.outerHTML = `<button type="button" class="grey" onclick="hideCompletedItem()">👁️Hide Completed Tasks</button>`
}