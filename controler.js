import View from './view.js';
import Model from './model.js';

const butAdd = document.getElementById('add');
let ul = document.querySelector("ul.list");
const filter = document.getElementById('filter');

function Controler() {
    this.todosList = [];
    this.view = new View(ul, {
        onInput: (function (id) { this.input(id); }).bind(this),
        onButton: (function (id) { this.button(id); }).bind(this),
        onSpan: (function (id) { this.span(id); }).bind(this),
    });
}

Controler.prototype.init = function() {
    butAdd.addEventListener('click', this.addTodo.bind(this));
}

Controler.prototype.addTodo = function () {
    let input = document.querySelector('input');
    const todo = new Model(input.value, Date.now(), false);
    this.todosList.push(todo);
    this.view.render(this.todosList);
    input.value = '';
}
Controler.prototype.addTodoEnter = function (){
    document.addEventListener('keydown',function(event){
        if (event.key === 'Enter') {
            this.addTodo.bind(this);
        };
    });
}
Controler.prototype.input = function (id) {
    const todo = this.todosList.find(function (todo) {
      return todo.id === id;
    });
    todo.input();
    this.view.render(this.todosList);
    console.log(this.todosList);
}

Controler.prototype.button = function (id) {
    const index = this.todosList.findIndex(function (todo) {
        return todo.id === id;
    });
    this.todosList.splice(index, 1);
    this.view.render(this.todosList);
}

Controler.prototype.span = function (id) {
    const context = this;
    const todo = this.todosList.find(function (todo) {
        return todo.id === id;
    });
    const elementPage = document.getElementById(id);
    const inputT = elementPage.querySelector('.inputPoint');
    inputT.classList.add('input-active');
    inputT.addEventListener('keydown',function(event){
        if (event.key === 'Enter') {
            todo.task = inputT.value;
            context.view.render(context.todosList);
        };
        
    });
}

Controler.prototype.filtered = function() {
    filter.addEventListener('click', function(event){
        let status = event.target.getAttribute('data');
        console.log(status)
    });
}





// document.addEventListener('dblclick', function(event){
//     const elementPage = event.target.parentElement;
//     const inputT = elementPage.querySelector('.inputPoint');
//     inputT.classList.add('input-active')
//     const text = '';
//     const id = elementPage.getAttribute('id');
//     const element = todosList.find(function(todo){
//         if(id == todo.id){
//             return todo;
//         }
//     });
//     inputT.addEventListener('keydown',function(event){
//         if (event.key === 'Enter') {
//            element.task = inputT.value;
//         }
        
//     });
    
// });


// filter.addEventListener('click', function(event){
//     let status = event.target.getAttribute('data');
//     tabStatus(status);
//     print();
// })
export default Controler;