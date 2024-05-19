import { useState } from "react";


const useTodos = () => {
  const [todos, setTodos] = useState([]);


  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    }
    setTodos([...todos, newTodo]);
  }

  const toggleTodoCheck = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return {todos, removeTodo, toggleTodoCheck, addTodo};
};

export default useTodos;