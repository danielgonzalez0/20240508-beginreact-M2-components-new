import { useState } from "react";


const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const updateTodo = (id, text) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, text: text }
        : todo
    ));
  }


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

  return {todos, removeTodo, toggleTodoCheck, addTodo, updateTodo};
};

export default useTodos;