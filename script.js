let todosList = [];
let add = document.getElementById('add');
let div = document.getElementById('list');
let filter = document.getElementById('filter');



function tabStatus(status){
    let tabulatedArray = [];
    switch (status) {
      case ('all'):
        tabulatedArray = todosList;
        break;

      case ('active'):
        tabulatedArray = todosList.filter(function(todo){
            if(todo.completed === false){
                return todo;
            }
        });
        break;

      case ('checked'):
        tabulatedArray = todosList.filter(function(todo){
            if(todo.completed === true){
                return todo;
            }
        });
        break;
    };
    console.log(tabulatedArray)
    return tabulatedArray;
}
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
        input.setAttribute('data', 'check');

        const span = document.createElement('span');
        span.insertAdjacentText('afterbegin', `${todo.task}`);

        if (todo.completed === false) {
            span.classList.remove('check');
        }
        else{
            span.classList.add('check');
        };

        const button = document.createElement('button');
        button.classList.add('style-button');
        button.setAttribute('data', 'delete');
        button.insertAdjacentText('afterbegin', 'Delete');

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(button);
        
        ul.appendChild(li);
    });
};

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
    }
    print();
    input.value = '';
    
};
add.addEventListener('click', createTodo());
document.addEventListener('keydown',function(event){
    if (event.key === 'Enter') {
        createTodo();
    }
});
// listener on todosList
div.addEventListener('click', function (event){
    let element = event.target;
    let data = element.getAttribute('data');;
    switch(data){
        case 'check':
            checkTodo(element);
            break;
        case 'delete':
            deleteTodo(element);
            break;
    };
});
// Checked todo
function checkTodo(element) {
    const id = element.parentElement.getAttribute('id');
    const todoF = todosList.find(function(todo){
        if(id == todo.id){
            return todo;
        }});
    todoF.completed = !todoF.completed;
    print();
    console.log(todosList);
};

// delete todo
function deleteTodo(element) {
    const id = element.parentElement.getAttribute('id');
    const index = todosList.findIndex(function(todo){
        if(id == todo.id){
            return todo;
        }});
    todosList.splice(index, 1);
    print();
    console.log(todosList);
};
// right todo
// document.addEventListener('dblclick', function(event){
//     const span = event.target;
    // const id = event.target.parentElement.getAttribute('id');
    // const element = todosList.find(function(todo){
    //     if(id == todo.id){
    //         return todo;
    //     }
    // });
    // const inputR = span.createElement('input');
    // inputR.setAttribute('type', 'text');
    
//     console.log(span)
// });

//filter
filter.addEventListener('click', function(event){
    let status = event.target.getAttribute('data');
    tabStatus(status);
    
})
    








