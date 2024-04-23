"use client";

import { Plus, Trash } from "lucide-react";
import { useState } from "react";

export const Todos = () => {
  const [todos, setTodos] = useState([
    {
      id: 111,
      text: "Learn React",
      completed: false,
    },
    {
      id: 222,
      text: "Learn useState",
      completed: true,
    },
  ]);
  const [todo, setTodo] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (todo.trim() === "") return;
    const newTodo = { id: Date.now(), text: todo, completed: false };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Todos</h2>
        <div className="flex w-full items-center gap-2">
          <label className="input input-bordered flex flex-1 items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Some task"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo(e);
                }
              }}
            />
          </label>
          <button className="btn btn-primary" onClick={addTodo}>
            <Plus size={22} />
          </button>
        </div>
        <div className="divider">List</div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex w-full items-center gap-2">
              <label className="input input-bordered flex flex-1 items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo.id)}
                />
                <p>{todo.text}</p>
              </label>
              <button
                className="btn btn-ghost"
                onClick={() => removeTodo(todo.id)}
              >
                <Trash size={16} />
              </button>
            </li>
          ))}
          {todos.length === 0 ? (
            <p className="text-neutral-content">Empty</p>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex justify-center">
      <Todos />
    </div>
  );
}
