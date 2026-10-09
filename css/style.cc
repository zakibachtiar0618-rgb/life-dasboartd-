:root {
    --bg-color: #f4f7f6;
    --card-bg: #ffffff;
    --text-color: #333333;
    --border-color: #e0e0e0;
    --primary-color: #4a90e2;
    --success-color: #2ec4b6;
    --danger-color: #e71d36;
}

[data-theme="dark"] {
    --bg-color: #121212;
    --card-bg: #1e1e1e;
    --text-color: #ffffff;
    --border-color: #333333;
    --primary-color: #3775c4;
}

body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
    padding: 20px;
}

header {
    display: flex;
    justify-content: flex-end;
    max-width: 1000px;
    margin: 0 auto 20px auto;
}

.dashboard-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

h1, h2, h3 {
    margin-top: 0;
}

#time-display {
    font-size: 3rem;
    margin-bottom: 5px;
}

#timer-display {
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    background-color: var(--border-color);
    color: var(--text-color);
}

.btn-primary { background-color: var(--primary-color); color: white; }
.btn-success { background-color: var(--success-color); color: white; }
.btn-danger { background-color: var(--danger-color); color: white; }

.timer-controls, .timer-custom {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
}

input[type="text"], input[type="url"], input[type="number"] {
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

#todo-form, #link-form {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

#todo-form input, #link-form input {
    flex: 1;
}

#todo-list {
    list-style: none;
    padding: 0;
}

.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid var(--border-color);
}

.todo-item.done span {
    text-decoration: line-through;
    opacity: 0.6;
}

.error-text {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin: -10px 0 10px 0;
}

.links-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.link-btn-wrapper {
    display: inline-flex;
    align-items: center;
    background-color: var(--border-color);
    border-radius: 6px;
    overflow: hidden;
}

.link-anchor {
    padding: 8px 12px;
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
}

.delete-link-btn {
    background: none;
    border: none;
    color: var(--danger-color);
    cursor: pointer;
    padding: 8px;
    font-weight: bold;
}

