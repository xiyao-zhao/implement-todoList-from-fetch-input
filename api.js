export const TodoApi = (() => {
    const baseUrl = "https://jsonplaceholder.typicode.com";
    const todoUrl = "todos";

    const getTodo = () => 
        fetch([baseUrl, todoUrl].join('/'))
            .then(response => response.json())

    // function getTodo() {
    //     return fetch([baseUrl, todoUrl].join('/'))
    //     .then(response => response.json())
    // }

    // async function getTodo() {
    //     const response = await fetch([baseUrl, todoUrl].join('/'));
    //     return await response.json();
    //}

    const addTodo = newtodo =>
        fetch([baseUrl, todoUrl].join('/'), {
            method: 'POST',
            body: JSON.stringify(newtodo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())

    const deleteTodo = id =>
        fetch([baseUrl, todoUrl, id].join('/'), {
            method: 'DELETE',
    })
        .then((response) => response.json())

    return {
        getTodo,
        addTodo,
        deleteTodo
    }
})();