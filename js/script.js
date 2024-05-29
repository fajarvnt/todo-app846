const todos = []
const RENDER_EVENT = 'render-todo'

document.addEventListener("DOMContentLoaded", function (){
    const submitForm = document.querySelector("#form")
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault()
        addTodo()
    })
})

document.addEventListener(RENDER_EVENT,function() {
    const uncompletedTodoList = document.querySelector('#todos')
    uncompletedTodoList.innerHTML = ''

    const completedTodoList = document.querySelector('#completed-todos')
    completedTodoList.innerHTML = ''

    for(const todo of todos){
        const todoelement = makeTodo(todo)

        if(!todo.isCompleted){
            uncompletedTodoList.appendChild(todoelement)    
        } else {
            completedTodoList.appendChild(todoelement)
        }
        
    }
})

const addTodo = () => {
    const textTodo = document.querySelector('#title').value 
    const timestamp = document.querySelector('#date').value
    const generateID = generateId()
    const todoObject = generateTodoObject (generateID, textTodo,timestamp,false)
    todos.push(todoObject)
    document.dispatchEvent(new Event(RENDER_EVENT))
}   

const makeTodo = (todoObject) => {
    const textTitle = document.createElement('h1')
    textTitle.innerText = todoObject.task
    const texttimestamp = document.createElement('p')
    texttimestamp.innerText = todoObject.timestamp

    const textcontainer = document.createElement('div')
    textcontainer.classList.add('inner')
    textcontainer.append(textTitle, texttimestamp)

    const container = document.createElement('div')
    container.classList.add('item', 'shadow')
    container.append(textcontainer)
    container.setAttribute('íd', `todo-${todoObject.id}`)


    if(todoObject.isCompleted){
        const undobutton = document.createElement("button")
        undobutton.classList.add("undo-button")
        undobutton.addEventListener("click",function(){
            undoTaskFromComplete(todoObject.id)
        })

        const trashButton = document.createElement("button")
        trashButton.classList.add("trash-button")
        trashButton.addEventListener("click",function(){
            removeTaskFromComplete(todoObject.id)
        })

        container.append(undobutton,trashButton)
    } else {
        const checkButton = document.createElement("Button")
       checkButton.classList.add("check-button")
       checkButton.addEventListener("click",function(){
            addTaskToComplete(todoObject.id)
        })

        container.append(checkButton)
    }

    return container
}

const generateId = () => {
    return +new Date()
}

const generateTodoObject = (id,task,timestamp,isCompleted) => {
    return {id,task,timestamp,isCompleted}
}

function addTaskToComplete(todoId){
    const todoTarget = findTodo(todoId)
    if(todoTarget ==null) return
    todoTarget.isCompleted = true
    document.dispatchEvent(new Event(RENDER_EVENT))
}

function findTodo(todoid){
    for(const todoitem of todos){
        if(todoitem.id===todoid){
            return todoitem
        }
    }

    return null
}

function removeTaskFromComplete(todoId){
    const todoTarget = findTodoindex(todoId)
    if(todoTarget === -1) return
    todos.splice(todoTarget,1)
    document.dispatchEvent (new Event(RENDER_EVENT))
}

function undoTaskFromComplete(todoId) {
    const todoTarget =findTodo (todoId)
    if(todoTarget == null) return
    todoTarget.isCompleted=false
    document.dispatchEvent(new Event(RENDER_EVENT))
}

function findTodoindex(todoId){
    for(const index in todos){
        if(todos[index].id ===todoId)
        return index
    }
    return -1
}