'use sctrict';

// Объявление переменных
const formTodo = document.querySelector('.todo-control');
const inputTodo = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

// Создание массива для задач

const todoData = JSON.parse(localStorage.getItem('todo')) ?? [];

// Функция вывода на экран задач
const render = function() {

    // Обнуление списков
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    // Цикл для перебора объектов задач и действий с ними
    todoData.forEach(function(item, index) {
        
        // Создаем верстку для задачи
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">` + item.text + `</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`;

        // Проверяем статус задачи и помещаем в нужный список
        if (!item.completed) {
            todoList.append(li);
        } else {
            todoCompleted.append(li);
        }

        // Перенос в список Завершенные
        li.querySelector('.todo-complete').addEventListener('click', function() {
            if (item.completed === true) {
                item.completed = false;
                render();
            } else {
                item.completed = true;
                render(); //перерисовываем каждый раз список
            }
        })

        // Удаление задачи
        li.querySelector('.todo-remove').addEventListener('click', function(e) {
            todoData.splice(index, 1);
            render(); //перерисовываем каждый раз список
        })
    })

    // Сохраняем данные в локальном хранилище
    localStorage.setItem('todo', JSON.stringify(todoData))
}
render();

// Обрабатываем событие отправки формы
formTodo.addEventListener('submit', function(e){
    e.preventDefault();

    // Создаем шаблон объекта задачи
    const newData = {
        text: inputTodo.value,
        completed: false
    }

    // Проверка на пустую строку
    inputTodo.value.trim() !== '' ? todoData.push(newData) : alert('Введите дело')

    // Очищаем инпут после ввода
    inputTodo.value = '';

    // Отрисовываем верстку
    render();
})