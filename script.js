let todosList = [];
let add = document.getElementById('add');
let ul = document.getElementsByClassName('list');
let li = document.getElementsByClassName('list-point');

// add todo and push to []
function createTodo() {
    let input = document.querySelector('input');
    let todo = {
    task : input.value,
    completed: false,
    id: Date.now(),
    };
    todosList.push(todo);
    print();
    input.value = '';
    
};
add.addEventListener('click', createTodo);
document.addEventListener('keydown',function(event){
    if (event.key === 'Enter') {
        createTodo();
    }
});
// Checked todo
document.addEventListener('change', function (event) {
    //  = event.target.parentElement;
    let task =  event.target.parentElement;
    const currentId = task;
    // const currentTask = todoList.find((task) => task.id === currentId);
    const span = event.target.nextElementSibling;
    
    todosList.find(function(todo){
    if ( todo.task === span.textContent){
        todo.completed = !todo.completed;
    };
    console.log(todo);
    });
    console.log(currentId, span.textContent);
   
});

    
// paint todosList

function print(){
    let ul = document.querySelector("ul.list");

    ul.innerHTML = '';

    todosList.forEach(function(todo){
        const li = document.createElement('li');
        li.classList.add('list-point');

        const checked = document.createElement('input');
        checked.type = 'checkbox';
        

        const span = document.createElement('span');
        span.insertAdjacentText('afterbegin', `${todo.task}`);

        li.appendChild(checked);
        li.appendChild(span);
        
        ul.appendChild(li)
    });
};







