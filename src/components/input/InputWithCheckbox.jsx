import React from 'react';

const InputWithCheckbox = ({children, checked=false}) => {
  return (
    <div className="input input-bordered flex flex-1 items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        className="checkbox checkbox-sm"
      />
      {/* 🦁 Ajoute un état "Todo" et contrôle l'input */}
      {children}
    </div>
  );
};

export default InputWithCheckbox;