// --- STATE & INITIALIZATION ---
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let quickLinks = JSON.parse(localStorage.getItem('quickLinks')) || [];
let userName = localStorage.getItem('userName') || 'User';
let currentTheme = localStorage.getItem('theme') || 'light';

let timerInterval;
let timerMinutes = 25;
let timerSeconds = 0;
let isTimerRunning = false;

// --- DOM ELEMENTS ---
const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');
const greetingText = document.getElementById('greeting-text');
const nameDisplay = document.getElementById('name-display');
const themeToggle = document.getElementById('theme-toggle');

const pomodoroDisplay = document.getElementById('timer-display');
const timerStartBtn = document.getElementById('timer-start');
const timerStopBtn = document.getElementById('timer-stop');
const timerResetBtn = document.getElementById('timer-reset');
const customMinutesInput = document.getElementById('custom-minutes');
const setTimerBtn = document.getElementById('set-timer');

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoError = document.getElementById('todo-error');

const linkForm = document.getElementById('link-form');
const linkNameInput = document.getElementById('link-name');
const linkUrlInput = document.getElementById('link-url');
const linksContainer = document.getElementById('links-container');

// --- TEMA (DARK / LIGHT) ---
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap';
    localStorage.setItem('theme', theme);
}
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
});

// --- WAKTU & SAPAAN ---
function updateClock() {
    const now = new Date();
    
    // Format Waktu
    timeDisplay.textContent = now.toLocaleTimeString('id-ID');
    
    // Format Tanggal
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('id-ID', options);
    
    // Logika Sapaan
    const hours = now.getHours();
    let greeting = 'Selamat malam';
    if (hours < 11) greeting = 'Selamat pagi';
    else if (hours < 15) greeting = 'Selamat siang';
    else if (hours < 19) greeting = 'Selamat sore';
    
    greetingText.childNodes[0].nodeValue = `${greeting}, `;
}
setInterval(updateClock, 1000);

// Nama Kustom
nameDisplay.textContent = userName;
nameDisplay.addEventListener('blur', () => {
    let newName = nameDisplay.textContent.trim();
    if(!newName) newName = 'User';
    localStorage.setItem('userName', newName);
    nameDisplay.textContent = newName;
});

// --- FOCUS TIMER (POMODORO) ---
function updateTimerDisplay() {
    const m = String(timerMinutes).padStart(2, '0');
    const s = String(timerSeconds).padStart(2, '0');
    pomodoroDisplay.textContent = `${m}:${s}`;
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                clearInterval(timerInterval);
                alert('Waktu fokus selesai! SIlakan istirahat.');
                resetTimer();
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    stopTimer();
    timerMinutes = parseInt(customMinutesInput.value) || 25;
    timerSeconds = 0;
    updateTimerDisplay();
}

setTimerBtn.addEventListener('click', () => {
    let val = parseInt(customMinutesInput.value);
    if (val > 0 && val <= 60) {
        timerMinutes = val;
        timerSeconds = 0;
        updateTimerDisplay();
    }
});
timerStartBtn.addEventListener('click', startTimer);
timerStopBtn.addEventListener('click', stopTimer);
timerResetBtn.addEventListener('click', resetTimer);

// --- TO-DO LIST (DENGAN CEK DUPLIKAT & EDIT) ---
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.done ? 'done' : ''}`;
        
        li.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="toggleTodo(${index})">
                <span contenteditable="true" onblur="editTodo(${index}, this)">${todo.text}</span>
            </div>
            <button class="btn btn-danger" onclick="deleteTodo(${index})">Hapus</button>
        `;
        todoList.appendChild(li);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    
    // Tantangan: Cegah Duplikat
    const isDuplicate = todos.some(t => t.text.toLowerCase() === taskText.toLowerCase());
    if (isDuplicate) {
        todoError.style.display = 'block';
        return;
    }
    
    todoError.style.display = 'none';
    todos.push({ text: taskText, done: false });
    todoInput.value = '';
    renderTodos();
});

window.toggleTodo = (index) => {
    todos[index].done = !todos[index].done;
    renderTodos();
};

window.editTodo = (index, element) => {
    const updatedText = element.textContent.trim();
    if(updatedText) {
        todos[index].text = updatedText;
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        renderTodos();
    }
};

window.deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
};

// --- TAUTAN CEPAT (QUICK LINKS) ---
function renderLinks() {
    linksContainer.innerHTML = '';
    quickLinks.forEach((link, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'link-btn-wrapper';
        wrapper.innerHTML = `
            <a href="${link.url}" target="_blank" class="link-anchor">${link.name}</a>
            <button class="delete-link-btn" onclick="deleteLink(${index})">×</button>
        `;
        linksContainer.appendChild(wrapper);
    });
    localStorage.setItem('quickLinks', JSON.stringify(quickLinks));
}

linkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    quickLinks.push({ name: linkNameInput.value.trim(), url: linkUrlInput.value.trim() });
    linkNameInput.value = '';
    linkUrlInput.value = '';
    renderLinks();
});

window.deleteLink = (index) => {
    quickLinks.splice(index, 1);
    renderLinks();
};

// --- APP RUN ---
applyTheme(currentTheme);
updateClock();
updateTimerDisplay();
renderTodos();
renderLinks();
