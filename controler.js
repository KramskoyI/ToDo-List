import View from './view.js';
import Model from './model.js';

const butAdd = document.getElementById('add');
let ul = document.querySelector("ul.list");

function Controler() {
    this.todosList = [];
    this.view = new View(ul);
    // this.view = new View(listElement, {
    //     onIncrease: (function (id) { this.increase(id); }).bind(this),
    //     onDecrease: (function (id) { this.decrease(id); }).bind(this)
    //   });
    
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
// App.prototype.increase = function (id) {
//     const counter = this.counterList.find(function (counter) {
//       return counter.id === id;
//     });
//     counter.increase();
//     this.view.render(this.counterList);
//     console.log(id)
//   }
  
// div.addEventListener('click', function (event){
//     let element = event.target;
//     let data = element.getAttribute('data');;
//     switch(data){
//         case 'check':
//             checkTodo(element);
//             break;
//         case 'delete':
//             deleteTodo(element);
//             break;
//     };
// });

// function checkTodo(element) {
//     const id = element.parentElement.getAttribute('id');
//     const todoF = todosList.find(function(todo){
//         if(id == todo.id){
//             return todo;
//         }});
//     todoF.completed = !todoF.completed;
//     print();
    
// };


// function deleteTodo(element) {
//     const id = element.parentElement.getAttribute('id');
//     const index = todosList.findIndex(function(todo){
//         if(id == todo.id){
//             return todo;
//         }});
//     todosList.splice(index, 1);
//     print();
    
// };

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