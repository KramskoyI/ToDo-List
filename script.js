let todosList = [];
let add = document.getElementById('add');
let ul = document.getElementsByClassName('list');
let li = document.getElementsByClassName('list-point');
let div = document.getElementById('list');

// add todo and push to []
function createTodo() {
    let input = document.querySelector('input');
    if(input.value != ''){
        let todo = {
        task: input.value,
        completed: false,
        id: Date.now(),
        };
        todosList.push(todo);
        print();
    }
    input.value = '';
};
add.addEventListener('click', createTodo);
document.addEventListener('keydown',function(event){
    if (event.key === 'Enter') {
        createTodo();
    }
});

// Checked todo
div.addEventListener('change', function (event) {
    // const id = event.target.parentElement.getAttribute('id');
    // todosList.find(function(todo){
    //     if(id == todo.id){
    //         todo.completed = !todo.completed;
    //     }
    // });
  console.log(event);
});

// right todo
document.addEventListener('dblclick', function(event){
    const id = event.target.getAttribute('id');
    const findT = todosList.find(function(todo){
        if(id == todo.id){
            return todo;
        }
    });
});

// delete todo
document.addEventListener('click', function (event) {
    // const id = event.target.parentElement.getAttribute('id');
    // const index = todosList.findIndex(function(todo){
    //     if(id == todo.id){
    //         return todo;
    //     }
    // });
    // todosList.splice(index, 1);
    // print();
    console.log(event);
});

    
// paint todosList
function print(){
    let ul = document.querySelector("ul.list");

    ul.innerHTML = '';

    todosList.forEach(function(todo){
        const li = document.createElement('li');
        li.classList.add('list-point');
        li.setAttribute('id', `${todo.id}`);
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        
        const span = document.createElement('span');
        span.insertAdjacentText('afterbegin', `${todo.task}`);

        const button = document.createElement('button');
        button.classList.add('style-button');
        button.insertAdjacentText('afterbegin', 'Delete');

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(button);
        
        ul.appendChild(li);
    });
};







