import View from './view.js';
import Model from './model.js';

const butAdd = document.getElementById('add');
let ul = document.querySelector("ul.list");
const checked = document.getElementById('checked');
const active = document.getElementById('active');
const all = document.getElementById('all');
const allChecked = document.getElementById('All');
const deleteAllCheced = document.getElementById('AllChecked');
let statusFilter = 'all';
let pos = 1;

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
    
    const getList = localStorage.getItem('todos', JSON.stringify(this.todosList));
    const readList = JSON.parse(getList);
    this.todosList = readList;

    if (this.todosList.length === 0) {
        butAdd.addEventListener('click', this.addTodo.bind(this));
        this.addTodoEnter.bind(this);
    } else { 
        this.view.render(this.todosList)
        butAdd.addEventListener('click', this.addTodo.bind(this));
        this.addTodoEnter.bind(this);
    };
}


Controler.prototype.addTodo = function () {
    let input = document.querySelector('input');
    if(input.value != ''){
        const todo = new Model(input.value, Date.now(), false, pos);
        this.todosList.push(todo);
    };
    switch(statusFilter){
        case 'active': 
            this.masActive = this.todosList.filter(function(todo){
                if(todo.completed === false){
                    return todo
                }
            }); 
            this.view.render(this.masActive);
            break;
        case 'all': 
            this.view.render(this.todosList);
            console.log(statusFilter, '2')
            break;
    };
    console.log(statusFilter,'3')
    input.value = '';
    pos +=1;
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
    todo.completed = !todo.completed;
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
    statusFilter = 'checked';
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
    statusFilter = 'active';
}
Controler.prototype.filterAll = function(){
    all.addEventListener('click', this.showAll.bind(this));
}
Controler.prototype.showAll = function(){
    this.view.render(this.todosList);
    statusFilter = 'all';
}

Controler.prototype.save = function(){
    localStorage.setItem('todos', JSON.stringify(this.todosList))
}

Controler.prototype.clearedSave = function(){
    localStorage.clear();
}

Controler.prototype.checkedAll = function(){
    allChecked.addEventListener( 'click', function(event){
        const button = event.target;
        if( button == allChecked){
            this.todosList.forEach( function (todo) {
                todo.completed = true;
                this.save();
                this.view.render(this.todosList)
            }.bind(this))
        };
    }.bind(this))
}
Controler.prototype.deleteCheckedAll = function(){
    deleteAllCheced.addEventListener('click', function(){
        this.todosList = this.todosList.filter(function(todo){
            if(todo.completed === false){
                return todo}
        });
        this.save();
        this.view.render(this.todosList);
    }.bind(this))
    
}




export default Controler;