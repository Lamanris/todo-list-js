let todoInput = document.querySelector('.todo-list__input')
let addBtn = document.querySelector('.todo-list__btn-add')
let clearBtn = document.querySelector('.todo-list__btn-clear')
let taskList = document.querySelector('.todo-list__task-list')

addBtn.addEventListener('click', () => addTask())
clearBtn.addEventListener('click', () => clearAll())
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask()
    }
})

function getTasks () {
    return JSON.parse(localStorage.getItem('tasks')) || ['Nothing here']
}

function addTask () {
    if (todoInput.value !== '') {
        let tasks = getTasks()
        tasks = [...tasks, todoInput.value]
        localStorage.setItem('tasks', JSON.stringify(tasks))
        todoInput.value = ''
        view()
    }
}

function deleteTask (index) {
    let tasks = getTasks()
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    view()
}

function editTask (ind) {
    let tasks = getTasks()
    let editedTask = prompt('Edit your task')
    console.log(editedTask)
    if (editedTask == null || editedTask == "") {
        return null
    } else {
        tasks[ind] = editedTask
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    view()


}

function clearAll () {
    localStorage.removeItem('tasks')
    view()
}

function view () {
    let tasks = getTasks()
    taskList.innerHTML = ''
    return tasks.forEach((el) => {
        taskList.innerHTML += (
            `<div class="todo-list__task">
                <p class="todo-list__task-text">${el}</p>
                <div class="todo-list__task-controls">
                    <button class="todo-list__btn todo-list__btn-edit">Edit</button>
                    <button class="todo-list__btn todo-list__btn-delete">Delete</button>
                </div>
            </div>`
        )
        document.querySelectorAll('.todo-list__btn-delete').forEach((button, ind) => {
            button.addEventListener('click', () => deleteTask(ind))
        })
        document.querySelectorAll('.todo-list__btn-edit').forEach((button, ind) => {
            button.addEventListener('click', () => editTask(ind))
        })
    })
}
view()