import React from 'react';
import { cn } from "@/src/utils/cn";

const Todo = ({ todo, id, onCheckboxChange, onTextClick, ...props }) => {
  return (
    <div className="input input-bordered flex flex-1 items-center gap-2" >
      < input type="checkbox" className="checkbox checkbox-sm" checked={todo.completed} onChange={onCheckboxChange} />
      {id !== todo.id || id === null ?
        <p className={cn({ "line-through text-neutral-content": todo.completed })} onClick={onTextClick}>{todo.text}</p>
        :
        <input type="text" className="grow" value={todo.text} {...props} autoFocus={true}
        />}
    </div>
  );
};

export default Todo;