const modeBtn = document.querySelector('.modeBtn');
const addButton = document.querySelector('.addButton');
const todoWrapper = document.querySelector('.todoWrapper');
const addTaskInput = document.querySelector('.addTaskInput');

const tasksList = JSON.parse(localStorage.getItem('todoList')) || [];

// Funkcja która tworzy element

const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;

function createElement({ value, id }) {
	const newTodoTask = document.createElement('li');
	const text = document.createElement('p');
	const removeBtn = document.createElement('button');

	newTodoTask.classList.add('todoTask');
	newTodoTask.setAttribute('id', id);
	text.setAttribute('contenteditable', 'true');

	text.classList.add('text');
	removeBtn.classList.add('removeButton', 'svgBtn');

	text.textContent = value;
	removeBtn.innerHTML = closeIcon;

	newTodoTask.append(text);
	newTodoTask.append(removeBtn);
	todoWrapper.append(newTodoTask);

	// Wywołanie funkcji removeElement po kliknięciu na removeBtn
	removeBtn.addEventListener('click', removeElement);

	// Wywołanie funkcji saveElement po utracie focusa - blur
	text.addEventListener('blur', saveElement);
}

// Funkcja która dodaje do local storage zawartosc inputa

function addTask() {
	const value = addTaskInput.value;

	if (!value) return;

	addTaskInput.value = '';

	const task = {
		id: crypto.randomUUID(),
		value: value,
	};

	// Dodaje do localStorage
	tasksList.push(task);
	localStorage.setItem('todoList', JSON.stringify(tasksList));

	// Wywietla na stronie
	createElement(task);
}

//Funkcja która wyświtla aktualne elementy/taski (przesłane do localStorage) - na stronie
function displayList() {
	tasksList.forEach((el) => {
		createElement(el);
	});
}

// Funkcja która usuwa element z DOM i z localStorage

function removeElement(event) {
	const element = event.currentTarget.parentElement;
	const id = element.id;

	const idToRemove = tasksList.findIndex((task) => task.id === id);
	tasksList.splice(idToRemove, 1);

	localStorage.setItem('todoList', JSON.stringify(tasksList));

	element.remove();
}

// Funkcja która edytuje element i go zapisuje w localStorage
function saveElement(event) {
	const text = event.currentTarget;
	const id = text.parentElement.id;
	const value = text.textContent;

	const idToEdit = tasksList.findIndex((task) => task.id === id);
	tasksList[idToEdit].value = value;

	localStorage.setItem('todoList', JSON.stringify(tasksList));
}

// Funkcja zmieniająca motyw dark/lightmode poprzez dodanie i usuwanie klasy dark
function toggleBackgroundColor() {
	document.body.classList.toggle('dark');
}

// Funkcja inicjująca
function init() {
	displayList();
	addButton.addEventListener('click', addTask);
	modeBtn.addEventListener('click', toggleBackgroundColor);
}

init();
