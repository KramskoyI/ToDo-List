import View from './view.js';
import Model from './model.js';

const butAdd = document.getElementById('add');
let ul = document.querySelector("ul.list");
const checked = document.getElementById('checked');
const active = document.getElementById('active');
const all = document.getElementById('all');


function Controler() {
    this.masCheck = [];
    this.masActive = [];
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
    if(input.value != ''){
        const todo = new Model(input.value, Date.now(), false);
        this.todosList.push(todo);
    }
    this.view.render(this.todosList);
    input.value = '';
    this.save();
}
Controler.prototype.addTodoEnter = function (){
   
    document.addEventListener('keydown',function(event){
        if (event.key === 'Enter') {
            this.addTodo();
        };
    }.bind(this));
}
Controler.prototype.input = function (id) {
    const todo = this.todosList.find(function (todo) {
      return todo.id === id;
    });
    todo.input();
    this.view.render(this.todosList);
    this.save();
}

Controler.prototype.button = function (id) {
    const index = this.todosList.findIndex(function (todo) {
        return todo.id === id;
    });

    const onFulfilled = function (){
        this.todosList.splice(index, 1);
        this.view.render(this.todosList);
        this.save();
        dialog.classList.remove("dialog");
    }.bind(this);

    const onRejected = function(){
        dialog.classList.remove("dialog");
    };

    const dialogPromis = new Promise (function(resolve, reject){
        const dialog = document.getElementById("dialog");
        dialog.classList.add("dialog");
        dialog.addEventListener('click',function(event){
            const button = event.target.getAttribute('id');
            if(button == 'yes'){
                resolve();
            } else {
                reject();
            };
        }.bind(this));
    }.bind(this));

    dialogPromis.then(onFulfilled, onRejected);
}

Controler.prototype.span = function (id) {
    
    const todo = this.todosList.find(function (todo) {
        return todo.id === id;
    });
    const elementPage = document.getElementById(id);
    const inputT = elementPage.querySelector('.inputPoint');
    inputT.classList.add('input-active');
    inputT.addEventListener('keydown',function(event){
        if (event.key === 'Enter') {
            todo.task = inputT.value;
            this.view.render(this.todosList);
        };
    }.bind(this));
}

Controler.prototype.filterCheck = function(){
    checked.addEventListener('click', this.filterChecked.bind(this));
}
Controler.prototype.filterChecked = function(){
    this.masCheck = this.todosList.filter(function(todo){
        if(todo.completed === true){
            return todo
        }
    });
    this.view.render(this.masCheck);
}

Controler.prototype.filterActive = function(){
    active.addEventListener('click', this.filterActived.bind(this));
}
Controler.prototype.filterActived = function(){
    this.masActive = this.todosList.filter(function(todo){
        if(todo.completed === false){
            return todo
        }
    });
    this.view.render(this.masActive);
    console.log(this.masActive)
}
Controler.prototype.filterAll = function(){
    all.addEventListener('click', this.showAll.bind(this));
}
Controler.prototype.showAll = function(){
    this.view.render(this.todosList);
}

Controler.prototype.save = function(){
    localStorage.setItem('todos', JSON.stringify(this.todosList))
}
Controler.prototype.getSave = function(){
    localStorage.getItem('todos', JSON.parse(this.todosList));
}
Controler.prototype.clearedSave = function(){
    localStorage.clear();
}



export default Controler;