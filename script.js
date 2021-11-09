let todosList = [];
let add = document.getElementById('add');

// add todo and push to []
function createTodo() {
    let input = document.querySelector('input');
    let todo = {
    task : input.value,
    // id : Date.now(),
    // filter : 'all',
    // completed: '',
    };
    todosList.push(todo);
    print();
    console.log(todosList)
};
add.addEventListener('click', createTodo);
document.addEventListener('keydown',function(event){
    if (event.key === 'Enter') {
        createTodo();
    }
})
function print(){
    let ul = document.querySelector("ul.list");

    ul.innerHTML = '';

    todosList.forEach(function(todo){
        const li = document.createElement('li');
        li.classList.add('list-point');

        const span = document.createElement('span');
        span.insertAdjacentText('afterbegin', `${todo.task}`);

        li.appendChild(span);
        
        ul.appendChild(li)
    });
};







