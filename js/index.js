((d) => {
    
    const mainBlock = d.querySelector('.main-block-wrapper');
    const todoForm = d.querySelector('.todo-form');
    const todoFormInp = d.querySelector('.todo-form__input');
    const todoList = d.querySelector('.todo-list');
    
    todoFormInp.focus();
    
    function addTodoItem(event) {
        event.preventDefault();
        
        if(todoFormInp.value.trim() === '') {
            alert('Поле для добавление задачи пустое.');
            return false;
        }
        
        const todoItem = createTodoItem(todoFormInp.value);
        
        bindEvents(todoItem);
        
        if(!mainBlock.classList.contains('haveTodo')) {
            mainBlock.classList.add('haveTodo');    
        }
        
        todoList.insertBefore(todoItem, todoList.firstChild);
        todoFormInp.value = '';
    }
    
    function createTodoItem(val) {
            let spanText = createElement('span', {className: 'todo-list-item__currentToDo'}, val);
            let input = createElement('input', {className: 'todo-list-item__inp', type: 'text'});
        let label = createElement('label', {}, spanText, input);
            let rewrite_btn = createElement('i', {className: 'fa fa-pencil-square-o'});
            let check_btn = createElement('i', {className: 'fa fa-check-circle-o'});
            let delete_btn = createElement('i', {className: 'fa fa-trash-o'});
        let wrapper_btn = createElement('div', {className: 'todo-list-item-settings'}, rewrite_btn, check_btn, delete_btn);
        
        let todoItem = createElement('li', {className: 'todo-list-item'}, label, wrapper_btn);
        
        return todoItem;
    }
    
    function bindEvents(todoItem) {
        const rewrite_btn = todoItem.querySelectorAll('.fa-pencil-square-o, .todo-list-item__currentToDo');
        const check_btn = todoItem.querySelector('.fa-check-circle-o');
        const delete_btn = todoItem.querySelector('.fa-trash-o');
        
        rewrite_btn.forEach(btn => btn.addEventListener('click', handleClick_rewrite.bind(rewrite_btn, todoItem)));
        check_btn.addEventListener('click',  handleClick_check.bind(check_btn, todoItem));
        delete_btn.addEventListener('click', handleClick_delete.bind(delete_btn, todoItem));
    }
    
    function handleClick_rewrite(todoItem) {
        const todoItemInp = todoItem.querySelector('.todo-list-item__inp');
        const todoItemVal = todoItem.querySelector('.todo-list-item__currentToDo');
        
        todoItem.classList.toggle('rewrite');

        if(todoItem.classList.contains('rewrite')) {
            todoItemInp.value = todoItemVal.innerHTML;
            todoItemInp.focus();
        }else {
            todoItemVal.innerHTML = todoItemInp.value;
        }
    }
    
    function handleClick_check(todoItem) {
        todoItem.classList.toggle('complete');
    }
    
    function handleClick_delete(todoItem) {
        todoList.removeChild(todoItem);
    }
    
    function createElement(tag, props, ...childs) {
        let elem = d.createElement(tag);
        
        Object.keys(props).forEach(key => elem[key] = props[key]);
        
        if(childs.length) {
            childs.forEach(child => {
                if(typeof child == 'string' ) {
                    child = d.createTextNode(child);
                }
                
                elem.appendChild(child);
            });
        }
        
//        console.log(elem);
        return elem;
    }
    
    todoForm.addEventListener('submit', addTodoItem)
    
})(document);