import View from './view.js'

const ul = document.querySelector("ul.list");

function App() {
    this.view = new View(ul);
};

App.prototype.init() = function () {
    this.view.print();
};


export default App;