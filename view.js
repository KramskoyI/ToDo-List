// render todosList
function View(rootElement, listeners) {
    this.root = rootElement;
    this.inputListener = listeners.onInput;
    this.buttonListener = listeners.onButton;
    this.spanListener = listeners.onSpan;
}
// function View(rootElement, listeners) {
//     this.root = rootElement;
//     this.increaseListener = listeners.onIncrease;
//     this.decreasListener = listeners.onDecrease;
// }
View.prototype.render = function (todos = [] ) {
    
    this.clear();

    const fragment = document.createDocumentFragment();

    todos.forEach(function(todo){
        const li = document.createElement('li');
        li.classList.add('list-point');
        li.setAttribute('id', `${todo.id}`);
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('data', 'check');
        input.setAttribute('checked', '');
        if(todo.completed === true){
            input.checked = 'checked';
        } else{input.checked = '';}
        input.addEventListener('click', function(){
            this.inputListener(todo.id);
        }.bind(this));
        

        const span = document.createElement('span');
        span.insertAdjacentText('afterbegin', `${todo.task}`);
        span.addEventListener('dblclick', function(){
            this.spanListener(todo.id);
        }.bind(this));

    //     const incButton = document.createElement('button');
    //     incButton.insertAdjacentText('afterbegin', '+');
    //     incButton.addEventListener('click', function () {
    //     this.increaseListener(counter.id);
    //     }.bind(this));

        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.classList.add('inputPoint');

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
        button.addEventListener('click', function(){
            this.buttonListener(todo.id);
        }.bind(this));

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(inputText);
        li.appendChild(button);
        
        fragment.appendChild(li);
    }.bind(this));
    
    this.root.appendChild(fragment);
};

View.prototype.clear = function () {
    this.root.replaceChildren();
  }
export default View;