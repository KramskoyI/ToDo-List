import Controler from './controler.js';

const all = new Controler();

all.init();
all.addTodoEnter();
all.filterCheck();
all.filterActive();
all.filterAll();
all.checkedAll();
all.deleteCheckedAll();