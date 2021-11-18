// render todosList
function View(rootElement) {
    this.root = rootElement;
}
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

        const span = document.createElement('span');
        span.insertAdjacentText('afterbegin', `${todo.task}`);

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