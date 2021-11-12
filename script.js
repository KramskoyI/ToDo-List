let todosList = [];
let add = document.getElementById('add');
let ul = document.getElementsByClassName('list');
let li = document.getElementsByClassName('list-point');

// add todo and push to []
function createTodo() {
    let input = document.querySelector('input');
    let todo = {
    task: input.value,
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
// document.addEventListener('change', function (event) {
    //  = event.target.parentElement;
    // let task =  event.target.parentElement;
    // const currentId = task;
    // const currentTask = todoList.find((task) => task.id === currentId);
//     const span = event.target.nextElementSibling;
    
//     todosList.find(function(todo){
//         if ( todo.task === span.textContent){
//             todo.completed = !todo.completed;
//         };
//     });
//    console.log(todosList)
// });
// input.addEventListener('change', toggleTask(todo.id));
// function toggleTask(id){
//     todosList.find(id);
//     console.log(id)
// }
function findTodo(todo){
    if(id === todo.id){
        return todo;
    }

};


// print todo
document.addEventListener('dblclick', function(event){
    const id = event.target.getAttribute('id');
    const findT = todosList.find((todo) => todo.id === id);
        
    console.log('id html',id)
    console.log('item',findT)
    console.log('todosList',todosList)
    
})

    
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
        
        // input.addEventListener('change', toggleTask(todo.id));
        

        const span = document.createElement('span');
        span.insertAdjacentText('afterbegin', `${todo.task}`);

        li.appendChild(input);
        li.appendChild(span);
        
        ul.appendChild(li)
    });
};







