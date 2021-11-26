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
        const box = document.createElement('li');
        box.classList.add('listCaption');
        box.addEventListener('dragover', function(event){ 
            event.preventDefault();
            console.log('over')
        });
        box.addEventListener('dragenter', function(event){
            event.preventDefault();
            this.classList.add('hovered');
            console.log('enter')
        });
        box.addEventListener('dragleave', function(){
            this.classList.remove('hovered');
            console.log('leave')
        });
        box.addEventListener('drop', function(){
            this.classList.remove('hovered');
            console.log(this, 'drop');
            this.append(li)
        });

        const li = document.createElement('li');
        li.classList.add('list-point');
        li.setAttribute('id', `${todo.id}`);
        li.setAttribute('draggable', 'true')
        li.addEventListener('dragstart', function () {
            const li = document.querySelector('.list-point');
            setTimeout(function(){li.classList.add('hide'), 0});
            console.log('dragstart');
            
        });
        li.addEventListener('dragend', function () {
            const li = document.querySelector('.list-point');
            li.classList.remove('hide');
            console.log('dragend')
        });
        
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

        box.appendChild(li)
        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(inputText);
        li.appendChild(button);
        
        fragment.appendChild(box);
    }.bind(this));
    
    this.root.appendChild(fragment);
};

View.prototype.clear = function () {
    this.root.replaceChildren();
  }
export default View;