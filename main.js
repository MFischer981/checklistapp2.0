let listData = [{
    listName: "Tutorial Checklist",
    listTag: "tutorialchecklist",
    listColor: "#6600ff",
    listColor2: "#ff00bb",
    listItems: [{
            listItemName: "Use the Create New List Input to create a new checklist.",
            completed: false,
            favorited: false,
            locked: false,
            tags: ["🍎 Tutorial"]
        },
        {
            listItemName: "Within each checklist you can use the add to list button to add new list items to your lists.",
            completed: false,
            favorited: false,
            locked: false,
            tags: ["🍎 Tutorial"]
        },
        {
            listItemName: "Once a task has been completed you make click the ✔️ button to mark the task as complete. If you mistakenly ✔️ a list item you can click ❌ to uncheck a task.",
            completed: false,
            favorited: false,
            locked: false,
            tags: ["🍎 Tutorial"]
        },
        {
            listItemName: "If a list item is very important you can favorite it by clicking the 🖤 button. To unfavorite a list item you can click the ❤️ button.",
            completed: false,
            favorited: false,
            locked: false,
            tags: ["🍎 Tutorial"]
        },
        {
            listItemName: "If you need to modify a list item which you have already created you can click the 📝 button.",
            completed: false,
            favorited: false,
            locked: false,
            tags: ["🍎 Tutorial"]
        },
        {
            listItemName: "If you want to remove a list item you can use the 🗑️ button. Removing a list item cannot be undone.",
            completed: false,
            favorited: false,
            locked: false,
            tags: ["🍎 Tutorial"]
        },
        {
            listItemName: "Update 1.1: You can use the color picker square next to the 🎨 to change the color of a list. This can help distinguish the list from other lists. Additionally you can edit the title of each list using the Edit List Title button at the top of each list.",
            completed: false,
            favorited: false,
            locked: false,
            tags: ["🍎 Tutorial", "🖥️ Update 1.1"]
        }
    ]
}]

let allTags = [
    "🔥 Urgent",
    "📅 Date",
    "🗺️ Location",
    "🕒 Time"
]



function onLoad() {


    document.getElementById("listContainer").innerHTML = "";
    for (let i = 0; i < listData.length; i++) {
        var totalNoListItems = listData[i].listItems.length;
        console.log(totalNoListItems)


        document.getElementById("listContainer").innerHTML +=
            `<div class="list" style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), linear-gradient(45deg, ${listData[i].listColor}, ${listData[i].listColor2})">
        <div class="spacer"></div>
        <h1>${listData[i].listName}</h1>
        <input type="text" class="addItemToList" id="listItemInput">
        <button onclick="addToList(${i})">Add To List</button>
        <button onclick="initListEdit(${i})">Edit List Title</button>
        <button onclick="deleteList(${i})">Delete List</button>
        <div class="spacer"></div>
        <div class="floatleft">
        <input type="color" oninput="changeColor(${i})" value="${listData[i].listColor}" class="" id="">
        <h3>🎨 ${listData[i].listColor}</h3>
        </div>
        <div class="floatright">
        <input type="color" oninput="changeColor2(${i})" value="${listData[i].listColor2}" style="float: right; margin-left: 4px;">
        <h3>🎨 ${listData[i].listColor2}</h3>
        </div>
        <div id="${listData[i].listTag}progress" class="progress">
        <div class="filler" style="width: 0%; background: linear-gradient(45deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), linear-gradient(45deg, ${listData[i].listColor}, ${listData[i].listColor2})">0%</div>
        </div>
        <ul id="${listData[i].listTag}">
        </ul>
        </div>
        `
        var totalCompleteListItems = 0;
        for (let j = 0; j < listData[i].listItems.length; j++) {


            if (listData[i].listItems[j].completed === true) {
                totalCompleteListItems++;
            }
            console.log(totalCompleteListItems);

            var progressBar = document.getElementById(`${listData[i].listTag}progress`)
            var width = ((totalCompleteListItems / totalNoListItems) * 100).toFixed(0);
            progressBar.innerHTML = `<div class="filler" style="width: ${width}%; background: linear-gradient(45deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(45deg, ${listData[i].listColor}, ${listData[i].listColor2})">${width}%</div>`;
            var listPercentage = `${width}%`;

            listData[i].listCompletion = listPercentage;

            if (listData[i].listItems[j].completed === true && listData[i].listItems[j].favorited === true) {

                    document.getElementById(listData[i].listTag).innerHTML += `<li class="favorite complete" id="${listData[i].listTag}${j}">
                    <span>◼️✅❤️ ${listData[i].listItems[j].listItemName}</span>
                    <button onclick="deleteFromList(${i}, ${j})">🗑️Delete</button>
                    <button onclick="initEdit(${i}, ${j})">📝Edit</button>
                    <button onclick="unfavorite(${i}, ${j})">❤️Unfavorite</button>
                    <button onclick="uncomplete(${i}, ${j})">❌Uncheck</button>
                    <select id="${listData[i].listTag}${j}tagSelect" onchange="pushTag(${i}, ${j})">
                        <option>Select A Tag</option>
                    <select>
                    </li>
                    `
                
                
                listData[i].listItems[j].listItemId = `${listData[i].listTag}${j}`
            } else if (listData[i].listItems[j].completed === true) {

                document.getElementById(listData[i].listTag).innerHTML += `<li class="complete" id="${listData[i].listTag}${j}"> 
                <span>◼️✅ ${listData[i].listItems[j].listItemName}</span>
                <button onclick="deleteFromList(${i}, ${j})">🗑️Delete</button>
                <button onclick="initEdit(${i}, ${j})">📝Edit</button>
                <button onclick="favorite(${i}, ${j})">🖤Favorite</button>
                <button onclick="uncomplete(${i}, ${j})">❌Uncheck</button>
                <select id="${listData[i].listTag}${j}tagSelect" onchange="pushTag(${i}, ${j})">
                <option>Select A Tag</option>
                <select>
                </li>
                `

                listData[i].listItems[j].listItemId = `${listData[i].listTag}${j}`
            } else if (listData[i].listItems[j].favorited === true) {

                document.getElementById(listData[i].listTag).innerHTML += `<li class="favorite" id="${listData[i].listTag}${j}"> 
                <span>◼️❤️ ${listData[i].listItems[j].listItemName}</span>
                <button onclick="deleteFromList(${i}, ${j})">🗑️Delete</button>
                <button onclick="initEdit(${i}, ${j})">📝Edit</button>
                <button onclick="unfavorite(${i}, ${j})">❤️Unfavorite</button>
                <button onclick="complete(${i}, ${j})">✔️Check</button>
                <select id="${listData[i].listTag}${j}tagSelect" onchange="pushTag(${i}, ${j})">
                <option>Select A Tag</option>
                <select>
                </li>
                `

                listData[i].listItems[j].listItemId = `${listData[i].listTag}${j}`
            } else {

                document.getElementById(listData[i].listTag).innerHTML += `<li id="${listData[i].listTag}${j}">
                <span>◼️ ${listData[i].listItems[j].listItemName}</span>
                <button onclick="deleteFromList(${i}, ${j})">🗑️Delete</button>
                <button onclick="initEdit(${i}, ${j})">📝Edit</button>
                <button onclick="favorite(${i}, ${j})">🖤Favorite</button> 
                <button onclick="complete(${i}, ${j})">✔️Check</button>
                <select id="${listData[i].listTag}${j}tagSelect" onchange="pushTag(${i}, ${j})">
                <option>Select A Tag</option>
                <select>
                </li>
                `

                listData[i].listItems[j].listItemId = `${listData[i].listTag}${j}`
            }

            
            for (let k = 0; k < listData[i].listItems[j].tags.length; k++) {
                document.getElementById(`${listData[i].listTag}${j}`).innerHTML += `
                <div class="tag"><span onclick="deleteTag(${i}, ${j}, ${k})">🗑️</span>${listData[i].listItems[j].tags[k]}</div>`;

            }

            for (let l = 0; l < allTags.length; l++) {
                document.getElementById(`${listData[i].listTag}${j}tagSelect`).innerHTML += `<option value=${l}>${allTags[l]}</option>`  
            }

        }

    }

}

function pushTag(index, subindex) {
    console.log(event.target.value)
    listData[index].listItems[subindex].tags.push(
        allTags[event.target.value]
    );
    onLoad();
}

function deleteTag(index, subindex, tagIndex) {
    listData[index].listItems[subindex].tags.splice(tagIndex, 1);
    onLoad();
}


function newList() {
    if (document.getElementById("newList").value !== "") {
        listData.push({
            listName: document.getElementById("newList").value,
            listTag: ((document.getElementById("newList").value).replace(/\s/g, '')).toLowerCase(),
            listColor: random_rgba(),
            listColor2: random_rgba(),
            listItems: []
        })
        onLoad();
    }
}

function addToList(index) {
    listData[index].listItems.push({
        listItemName: document.querySelectorAll(".addItemToList")[index].value,
        completed: false,
        favorited: false
    })
    onLoad();
}

function deleteFromList(index, subindex) {
    listData[index].listItems.splice(subindex, 1);
    onLoad();
}

// Edit List Items
let editContent;
let editIndex;
let editSubIndex;
function initEdit(index, subindex) {
    editIndex = index;
    editSubIndex = subindex;
    document.getElementById("editModal").classList.toggle("toggle-display");
    document.getElementById("editListItem").value = listData[editIndex].listItems[editSubIndex].listItemName
}

function editContentSave() {
    editContent = document.getElementById("editListItem").value;
    document.getElementById("editModal").classList.toggle("toggle-display");
    listData[editIndex].listItems[editSubIndex].listItemName = editContent;
    onLoad();
}

// Edit List Content
let editListContent;
let editListIndex;

function initListEdit(index) {
    editListIndex = index;
    document.getElementById("editListModal").classList.toggle("toggle-display");
    document.getElementById("editListTitle").value = listData[editListIndex].listName
}

function editListTitleSave() {
    editListContent = document.getElementById("editListTitle").value;
    document.getElementById("editListModal").classList.toggle("toggle-display");
    listData[editListIndex].listName = editListContent;
    onLoad();
}

// Edit List Content
let deleteListIndex;

function deleteList(index) {
    deleteListIndex = index;
    document.getElementById("deleteListModal").classList.toggle("toggle-display");
    document.getElementById("deleteListModalTitle").innerHTML = `Are you sure you want to delete ${listData[deleteListIndex].listName}?`
}

function confirmDelete() {
    listData.splice(deleteListIndex, 1);
    document.getElementById("deleteListModal").classList.toggle("toggle-display");
    onLoad();
}


// Toggle Favorite
function favorite(index, subindex) {
    listData[index].listItems[subindex].favorited = true;
    onLoad();
    event.target.outerHTML = `<button onclick="unfavorite(${index}, ${subindex})">Unfavorite</button>`
}

function unfavorite(index, subindex) {
    listData[index].listItems[subindex].favorited = false;
    onLoad();
    event.target.outerHTML = `<button onclick="favorite(${index}, ${subindex})">Favorite</button>`
}

// Toggle Complete
function complete(index, subindex) {
    listData[index].listItems[subindex].completed = true;
    onLoad();
    event.target.outerHTML = `<button onclick="uncomplete(${index}, ${subindex})">Uncomplete</button>`
}

function uncomplete(index, subindex) {
    listData[index].listItems[subindex].completed = false;
    onLoad();
    event.target.outerHTML = `<button onclick="complete(${index}, ${subindex})">Complete</button>`
}

function openTagModal() {
    document.getElementById("createTagModal").classList.toggle("toggle-display");
}

function newTagSave() {
    allTags.push(document.getElementById("tagNameInput").value)
    onLoad();
}

// Generate random RGB value for new lists.
function random_rgba() {
    let o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
}

// Change RGB values.
function changeColor(index) {
    listData[index].listColor = event.target.value;
    onLoad();
}

// Change RGB values.
function changeColor2(index) {
    listData[index].listColor2 = event.target.value;
    onLoad();
}