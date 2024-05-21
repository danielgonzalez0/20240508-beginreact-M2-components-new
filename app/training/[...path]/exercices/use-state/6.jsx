/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import TodoInput from "@/src/components/todoInput";
import useTodos from "@/src/hooks/useTodos";
import { cn } from "@/src/utils/cn";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

export const Todos = () => {

  const [todo, setTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { todos, removeTodo, toggleTodoCheck, addTodo, updateTodo } = useTodos();

  const handleAddTodo = (text) => {
    addTodo(text);
    setTodo("");
  }

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Todos</h2>
        <div className="flex w-full items-center gap-2">
          <TodoInput value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTodo(todo)
            }} />
          {/* 🦁 Lors du clic sur le bouton, appelle la méthode "addTodo" */}
          <button className="btn btn-primary" onClick={() => handleAddTodo(todo)}>
            <Plus size={22} />
          </button>
        </div>
        <div className="divider">List</div>
        <ul className="space-y-2">
          {/* Voici un exemple d'un élément "Todo" */}
          {/* Tu dois afficher ces éléments avec une liste en utilisant `.map` */}
          {todos?.map((todo) => <li className="flex w-full items-center gap-2" key={todo.id}>
            <div className="input input-bordered flex flex-1 items-center gap-2" >
              < input type="checkbox" className="checkbox checkbox-sm" checked={todo.completed} onChange={() => toggleTodoCheck(todo.id)} />
              {editingId !== todo.id || editingId === null ?
                <p className={cn({ "line-through text-neutral-content": todo.completed })} onClick={(e) => {
                  e.preventDefault();
                  console.log("click", todo.id);
                  setEditingId(todo.id)
                }}>{todo.text}</p>
                :
                <input type="text" className="grow" value={todo.text} onChange={(e) => updateTodo(todo.id, e.target.value)} onBlur={() => { setEditingId(null) }} autoFocus={true}
                />}
            </div>
            <button className="btn btn-ghost" onClick={() => removeTodo(todo.id)}>
              <Trash size={16} />
            </button>
          </li>)}
          {todos.length === 0 ? <p className="text-neutral-content">Empty</p> : null}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex w-full justify-center">
      <Todos />
    </div>
  );
}
