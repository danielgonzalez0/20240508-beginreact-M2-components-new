"use client";

import { cn } from "@/src/utils/cn";
import clsx from "clsx";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState([
    { id: 111, text: "Learn React", completed: false },
    { id: 222, text: "Learn useState", completed: true },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const updateTodo = (id, newTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...newTodo } : todo))
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, updateTodo, removeTodo };
};

const TodoItem = ({ todo, updateTodo, removeTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li className="flex w-full items-center gap-2">
      <div
        className={clsx("input flex flex-1 items-center gap-2", {
          "input-bordered": Boolean(isEditing),
        })}
      >
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={todo.completed}
          onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
        />
        {isEditing ? (
          <input
            type="text"
            className="grow"
            value={todo.text}
            onChange={(e) => updateTodo(todo.id, { text: e.target.value })}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <p
            className={cn({
              "line-through": todo.completed,
            })}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </p>
        )}
      </div>
      <button className="btn btn-ghost" onClick={() => removeTodo(todo.id)}>
        <Trash size={16} />
      </button>
    </li>
  );
};

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todo.trim()) {
      addTodo(todo);
      setTodo("");
    }
  };

  return (
    <div className="flex w-full items-center gap-2">
      <label className="input input-bordered flex flex-1 items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Some task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo(e)}
        />
      </label>
      <button className="btn btn-primary" onClick={handleAddTodo}>
        <Plus size={22} />
      </button>
    </div>
  );
};

const Todos = () => {
  const { todos, addTodo, updateTodo, removeTodo } = useTodos();

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Todos</h2>
        <TodoForm addTodo={addTodo} />
        <div className="divider">List</div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
            />
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
