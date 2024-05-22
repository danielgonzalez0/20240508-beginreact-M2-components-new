/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import Todo from "@/src/components/input/Todo";
import TodoInput from "@/src/components/input/TodoInput";
import useTodos from "@/src/hooks/useTodos";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

// @ts-ignore
const CreateTodoInput = ({ onChangeTodo, todo, addTodo }) => {

  const handleAddTodo = (text) => {
    addTodo(text);
    onChangeTodo("");
  }

  return (
    <div className="flex w-full items-center gap-2">
      <TodoInput value={todo}
        onChange={(e) => onChangeTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAddTodo(todo)
        }} />
      <button className="btn btn-primary" onClick={() => handleAddTodo(todo)}>
        <
          // @ts-ignore
          Plus size={22} />
      </button>
    </div>
  )
}

const ListOfTodos = ({ todos, removeTodo, toggleTodoCheck, updateTodo }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="space-y-2">
      {todos?.map((todo) => <li className="flex w-full items-center gap-2" key={todo.id}>
        <Todo
          todo={todo}
          id={editingId}
          onCheckboxChange={() => toggleTodoCheck(todo.id)}
          onTextClick={() => setEditingId(todo.id)}
          onChange={(e) => updateTodo(todo.id, e.target.value)}
          onBlur={() => { setEditingId(null) }} />

        <button className="btn btn-ghost" onClick={() => removeTodo(todo.id)}>
          <
            // @ts-ignore
            Trash size={16} />
        </button>
      </li>)}
      {todos.length === 0 ? <p className="text-neutral-content">Empty</p> : null}
    </ul>
  )
}


export const Todos = () => {

  const [todo, setTodo] = useState("");
  const { todos, addTodo, removeTodo, toggleTodoCheck, updateTodo } = useTodos();

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Todos</h2>
        <CreateTodoInput todo={todo} 
        onChangeTodo={setTodo} 
        addTodo={addTodo} />

        <div className="divider">List</div>
        <ListOfTodos todos={todos} 
        removeTodo={removeTodo} 
        toggleTodoCheck={toggleTodoCheck} 
        updateTodo={updateTodo} 
        />
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
