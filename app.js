const form = document.querySelector('form')
form.addEventListener('submit', addTask)

const ul = document.querySelector('ul')
ul.addEventListener('click', deleteTask)

const deleteTasks = document.querySelector('#clear-all-tasks')
deleteTasks.addEventListener('click', deleteAllTasks)

document.addEventListener('DOMContentLoaded', getTasks)

function getTasks(event){
    // add task to localStorage
    let tasks // array for user inputs
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    // loop array for each element value
    tasks.forEach(function (task){
        let li = document.createElement('li')
        li.className = 'collection-item'
        let liText = document.createTextNode(task)
        li.appendChild(liText)

        let a = document.createElement('a')
        a.className = 'teal-text lighten-2 secondary-content'
        let aText = document.createTextNode('X')
        a.appendChild(aText)
        a.setAttribute('href', '#')

        li.appendChild(a)

        ul.appendChild(li)
    })
}

function deleteAllTasks(event){
    // while(ul.firstElementChild){
    //     ul.removeChild(ul.firstElementChild)
    // }
    ul.innerHTML = ''
    localStorage.removeItem('tasks')
    event.preventDefault()
}

function deleteTask(event){
    if(event.target.textContent === 'X'){
        if(confirm('Are you sure to delete this task?')){
            event.target.parentElement.remove()
            // get task value from dom li element textContent
            let liText = event.target.parentElement.textContent
            let liTextCorrect = liText.slice(0, liText.length-1)
            // get data from LS
            let tasks // array for user inputs
            if(localStorage.getItem('tasks') === null){
                tasks = []
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'))
            }
            // loop all tasks elements
            tasks.forEach(function(task, index){
                // get element with the same value as clicked
                if(task === liTextCorrect){
                    tasks.splice(index, 1) // delete this element from data array
                }
            })
            localStorage.setItem('tasks', JSON.stringify(tasks)) // save updated data lo LS
        }
    }
}


function addTask(event) {
    // user input
    const taskText = document.querySelector('#task').value

    // add DOM element - begin
    let li = document.createElement('li')
    li.className = 'collection-item'
    let liText = document.createTextNode(taskText)
    li.appendChild(liText)

    let a = document.createElement('a')
    a.className = 'teal-text lighten-2 secondary-content'
    let aText = document.createTextNode('X')
    a.appendChild(aText)
    a.setAttribute('href', '#')

    li.appendChild(a)

    ul.appendChild(li)
    // add DOM element - end

    // add task to localStorage
    let tasks // array for user inputs
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(taskText)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    document.querySelector('#task').value = ''
    event.preventDefault()
}