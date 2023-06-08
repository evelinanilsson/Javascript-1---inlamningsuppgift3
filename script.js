let todosArray = [];
let idCounter = 31;
const todosNotCompleted = document.querySelector("#not-completed");
const todosCompleted = document.querySelector("#completed");

function getTodos () {
    fetch("https://dummyjson.com/todos")
        .then((res) => res.json())
        .then((value) => {
            todosArray = value.todos;
            console.log(todosArray)
            createTodoElements(todosArray);
        })
}

getTodos();

function createTodoElements (todosArray) {
    for (let todo of todosArray){

        let listItem = document.createElement("li");
        listItem.classList.add("todo-element");
        let article = document.createElement("article");

        let todoTitle = document.createElement("h2");
        let todoId = document.createElement("p");
        let userId = document.createElement("p");
        let complete = document.createElement("input");

        todoTitle.innerText = todo.todo;
        todoId.innerText = "ID= "+ todo.id;
        userId.innerText = "UserId= " + todo.userId;
        complete.type = "checkbox";
        complete.checked = todo.completed;

        article.append(todoTitle, todoId, userId, complete);
        listItem.append(article);
        if (todo.completed) {
            todosCompleted.append(listItem)
        }
        else {
            todosNotCompleted.append(listItem)
        }
    }

    

}