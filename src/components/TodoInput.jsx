

const TodoInput = ({ initialtext = "", checked = false, children, ...props }) => {


  return (
    <div className="input input-bordered flex flex-1 items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        className="checkbox checkbox-sm"
      />
      {/* 🦁 Ajoute un état "Todo" et contrôle l'input */}
      <input type="text" className="grow" placeholder="Some task" value={initialtext}
        {...props}>
        {children}
      </input>

    </div>
  );
};

export default TodoInput;