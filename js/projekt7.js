let $todoInput; //miejsce gdzie użytkownik wspisuje treść
let $alertInfo; //info o braku zadań/koniecznosci dodania tekstu
let $addBtn; //przycisk ADD
let $ulList; //lista zadań
let $newTask; //nowo dodane zadanie

let $popup; //pobrany popup
let $popupInfo; //alert, jak się doda pusty tekst
let $editedTodo; //edytowany todo
let $popupInput; //tekst wpisywany w inputa w popupie
let $addPopupBtn; //przycisk zatwierdz
let $closeTodoBtn; //przycisk do zamykania popupa
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

//pobieramy nasze elementy
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};

//nadajemy nasluchiwania(listenery)
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addnewTask)
    $ulList.addEventListener('click', checkClick)
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo)
    $todoInput.addEventListener('keyup', enterCheck)
    

};

const addnewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);

        $todoInput.value = ''
        $alertInfo.innerText = ''
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!'
    }
};

const enterCheck = () => {
    if (event.keyCode === 13) {
        addnewTask();
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools')

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit')
    editBtn.innerText = 'EDIT'

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.appendChild(completeBtn)
    toolsPanel.appendChild(editBtn)
    toolsPanel.appendChild(deleteBtn)
    $newTask.appendChild(toolsPanel)

};

const checkClick = event => {
    if (event.target.closest('button').classList.contains('complete')) {
        event.target.closest('li').classList.toggle('completed')
        event.target.closest('button').classList.toggle('completed')
    } else if (event.target.closest('button').className === 'edit') {
        editTask(event);
    } else if (event.target.closest('button').className === 'delete') {
        deleteTask(event);
    }
};


//edycja zadania
const editTask = (event) => {
    const oldTodo = event.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
};

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none'
        $popupInfo.innerText = ''
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść!'
    }
}

//zamykanie popupa
const closePopup = () => {
    $popup.style.display = 'none'
    $popupInfo.innerText = ''
};

const deleteTask = (event) => {
    const deleteTodo = event.target.closest('li');
    deleteTodo.remove()

    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.'
    };
}

document.addEventListener('DOMContentLoaded', main)