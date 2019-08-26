
var currentListItem = 0;


dragula([document.getElementById("mainList")]);


function newList() {
    var newListInput = document.getElementById("newList").value;
    if (newListInput !== "") {
        var newListId = newListInput.replace(/\s/g, '');
    document.getElementById("listContainer").innerHTML += `<ul id="${newListId}">
    <h1>${newListInput}</h1>
    <input type="text" id="${newListId}Input">
    <button type="button" class="green" onclick="addNewListItem('${newListId}')">➕ New List Item</button>
    <div class="spacer"></div>
    </ul>`;
    dragula([document.getElementById(newListId)]);
    }
}

function addNewListItem(id) {
        var newListItem = document.getElementById(`${id}Input`).value;
        if (newListItem !== "") {
            currentListItem++;
            document.getElementById(id).innerHTML += `<li><span id="listItem${currentListItem}">${newListItem}</span><div class="btngroup"><button onclick="deleteItem()" class="red">🗑️</button><button onclick="editItem()" class="grey">✏️</button><button onclick="checkItem()" class="green">☑️</button></div></li>`;
        }
}

function deleteItem() {
    event.target.parentNode.parentNode.outerHTML = "";
}

var editingItem;

function editItem() {
    document.getElementById("editModal").style.display = "block";
    console.log(event.target.parentNode.parentNode.childNodes[0].id)
    editingItem = event.target.parentNode.parentNode.childNodes[0].id;
    var oldListItem = event.target.parentNode.parentNode.childNodes[0].innerHTML;
    document.getElementById("editListItemInput").value = oldListItem;
    document.getElementById("editListItemInput").focus()

}

function saveEdits() {
    document.getElementById("editModal").style.display = "none";
    var newListItem = document.getElementById("editListItemInput").value;
    document.getElementById(editingItem).innerHTML = newListItem;
}

function closeEdits() {
    document.getElementById("editListItemInput").value = "";
    document.getElementById("editModal").style.display = "none";
}


function checkItem() {
    event.target.parentNode.parentNode.classList.add("completed");
    event.target.parentNode.innerHTML = '<button onclick="uncheckItem()" class="grey">↩️</button>';
}

function uncheckItem() {
    event.target.parentNode.parentNode.classList.remove("completed");
    event.target.parentNode.innerHTML = '<button onclick="deleteItem()" class="red">🗑️</button><button onclick="editItem()" class="grey">✏️</button><button onclick="checkItem()" class="green">☑️</button>';
}
