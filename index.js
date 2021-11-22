import { TodoApi } from "./api.js";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~View~~~~~~~~~~~~~~~~~~~~~~~~~~~
const View = (() => {
    const domString = {
        todolist_container:  '.todolist_container',
        input: '.todolist_input',
    }

    const render = (ele, temp) => {
        ele.innerHTML = temp;
    }

    const listTodos = (array) => {
        let temp = '';
        array.forEach(ele => {
            temp += `
                    <li>
                        <p>${ele.title}</p>
                        <button class="delete_btn" id=${ele.id}>X</button>
                    </li>`
        });
        return temp;
    }

    return {
        domString,
        render,
        listTodos
    }
})()

//~~~~~~~~~~~~~~~~~~~~~~~~~~~Model~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Model = ((api, view) => {
    class Todo {
        constructor(title) {
            this.userId = 22;
            this.title = title;
            this.completed = false;
        }
    }

    class State {
        #todo = [];
        constructor() {}

        get todolist() {
            return this.#todo;
        } 

        set todolist(todo) {
            this.#todo = todo;

            const temp = view.listTodos(this.#todo);
            const element = document.querySelector(view.domString.todolist_container);
            view.render(element, temp);
        }        
    }

    const getTodo = api.getTodo;
    const addTodo = api.addTodo;
    const deleteTodo = api.deleteTodo;
    

    return {
        Todo,
        State,
        getTodo,
        addTodo,
        deleteTodo
    }
    
})(TodoApi, View)

//~~~~~~~~~~~~~~~~~~~~~~~~~~~Controller~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {
    const state = new model.State();
    
    const addTodo = () => {
        const input = document.querySelector(view.domString.input);
        input.addEventListener("keyup", event => {
            if (event.key === "enter") {
                const newtodo = new model.Todo(event.target.value);
                model.addTodo(newtodo).then(todo => {
                    state.todo = [todo, ...state.todo];
                })
            }

        })
    }

    const deleteTodo = (id) => {
        const todolist_container = document.querySelector(view.domString.todolist_container);
        todolist_container.addEventListener("click", event => {
            state.todo = state.todo.filter(ele => +ele.id !== +event.target.id);
            model.deleteTodo(event.target.id)
        })
    }
    
    
    const onInit = () => {
        state.todo = model.getTodo().then(data => state.todolist = data);
    }

    const bootstrap = () => {
        onInit();
        addTodo();
        deleteTodo();
    }

    return {bootstrap};
})(Model, View);

Controller.bootstrap();

