import InputWithCheckbox from "./InputWithCheckbox";


const TodoInput = ({ initialtext = "", checked = false, ...props }) => {

  return (
    <InputWithCheckbox checked={checked}>
      {/* 🦁 Ajoute un état "Todo" et contrôle l'input */}
      <input type="text" className="grow" placeholder="Some task" value={initialtext}
        {...props}
      />
    </InputWithCheckbox>
  );
};

export default TodoInput;