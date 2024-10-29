const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todosList = document.querySelector('#todosList');


// FÖRSTA DELEN

// todoForm.addEventListener('submit', e => {
//   e.preventDefault()

//   if(todoInput.value.trim() === '') return

//   const todoElement = createTodoElement(todoInput.value)
//   todosList.appendChild(todoElement)

//   todoInput.value = '';
//   todoInput.focus()
// })


// const createTodoElement = (title) => {
//   const todoLi = document.createElement('li')
//   todoLi.classList.add('todo')

//   const titleP = document.createElement('p')
//   titleP.classList.add('title')
//   titleP.textContent = title;


//   titleP.addEventListener('click', () => {
//     todoLi.classList.toggle('completed')
//   })

//   todoLi.appendChild(titleP)

//   return todoLi
// }



// EXTRA DELEN

const todos = []

todoForm.addEventListener('submit', e => {
  e.preventDefault()

  if(todoInput.value.trim() === '') return

  const todo = {
    id: crypto.randomUUID(),
    title: todoInput.value,
    completed: false
  }

  todos.push(todo)

  listTodos()
  localStorage.setItem('todos', JSON.stringify(todos))

  todoInput.value = '';
  todoInput.focus()
})

const listTodos = () => {

  todosList.innerHTML = '';

  todos.forEach(todo => {
    const todoElement = createTodoElement(todo)
    todosList.appendChild(todoElement)
  })
}


const createTodoElement = (todo) => {
  const todoLi = document.createElement('li')
  todoLi.classList.add('todo')
  if(todo.completed)
    todoLi.classList.add('completed')

  const titleP = document.createElement('p')
  titleP.classList.add('title')
  titleP.textContent = todo.title;

  const button = document.createElement('button')
  button.textContent = 'X';

  titleP.addEventListener('click', () => {

    todo.completed = !todo.completed;

    if(todo.completed)
      todoLi.classList.add('completed')
    else
      todoLi.classList.remove('completed')

    localStorage.setItem('todos', JSON.stringify(todos))
  })


  button.addEventListener('click', () => {
    const index = todos.findIndex(_todo => _todo.id === todo.id)
    todos.splice(index, 1)

    listTodos()
    localStorage.setItem('todos', JSON.stringify(todos))
  })

  todoLi.append(titleP, button)

  return todoLi
}


const storedTodos = JSON.parse(localStorage.getItem('todos'))

if(storedTodos !== null) {
  storedTodos.forEach(todo => {
    todos.push(todo)
  })
  listTodos()
}