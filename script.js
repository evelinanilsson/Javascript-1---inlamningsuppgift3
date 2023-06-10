let todosArray = [];
let idCounter = 31;
const todosNotCompleted = document.querySelector("#not-completed");
const todosCompleted = document.querySelector("#completed");
const createForm = document.querySelector(".create-todo");

getTodos();

function getTodos () {
    fetch("https://dummyjson.com/todos")
        .then((res) => res.json())
        .then((value) => {
            todosArray = value.todos;
            console.log(todosArray)
            applyTodos(todosArray);
        })
}

function applyTodos(todosArray){
    todosCompleted.innerHTML = "";
    todosNotCompleted.innerHTML = "";

    for (let todo of todosArray){
        let item = createTodoElements(todo);

        if (todo.completed) {
            todosCompleted.append(item);
            }
        else {
            todosNotCompleted.append(item);
        }
    }
}

function createTodoElements (todo) {

    let listItem = document.createElement("li");
    listItem.classList.add("todo-element");
    let article = document.createElement("article");

    let flexRow = document.createElement("div");
    flexRow.classList.add("flex-row");
    let todoTitle = document.createElement("h2");
    let todoId = document.createElement("p");
    let userId = document.createElement("p");
    let complete = document.createElement("input");
    let deleteButton = document.createElement("button");
    
    todoTitle.innerText = todo.todo;
    todoId.innerText = "ID= "+ todo.id;
    userId.innerText = "UserId= " + todo.userId;
    complete.type = "checkbox";
    complete.checked = todo.completed;
    deleteButton.innerHTML = `<img src="images/trashcan1.png">`;
    deleteButton.style.height ="10px;"

    flexRow.append(todoId, userId, complete, deleteButton);
    article.append(todoTitle,  flexRow);
    listItem.append(article);

    complete.addEventListener("change", (event) => {
        todo.completed = event.target.checked;
        applyTodos(todosArray)
    });

    deleteButton.addEventListener("click", () => {
        deleteTodo(todo, todosArray, () => {
            applyTodos(todosArray);
        });  
    });

    return listItem;
}


function createNewTodo(todoTitle, todoId, userId){
    fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            todo: todoTitle,
            complete: false,
            todoId: 1,
            userId: 1,
        })
    })
        .then((res) => res.json())
        .then((value) => {
            value.id = idCounter++;
            todosArray.push(value);
            after();
            
        });
}

createForm.addEventListener("submit", (event) => {
    
})

function deleteTodo(todo, todosArray, after){
    fetch("https://dummyjson.com/todos/" + todo.id, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((value) => {
            if (value.isDeleted) {
                let index = todosArray.findIndex((todo) => todo.id === value.id);
                if (index !== -1) {
                    todosArray.splice(index, 1);
                }
                after();
            }
        });
}
